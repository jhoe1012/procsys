<?php
<?php

namespace App\Services;

use App\Models\SoHeader;
use App\Models\SoItem;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class StoreOrderImportService
{

    
    public function import(Request $request, $user): array
    {
        $dateToday = now();

        DB::beginTransaction();

        try {
            $storopt = $request->stcd ? 'store' : 'batch';
            $userPlant = $user->plants()->firstOrFail();

            $options = $this->fetchOptions($userPlant->cbb_plant_code);

            if ($request->isMethod('get')) {
                DB::commit();
                return [
                    'batches' => $options['batches'] ?? [],
                    'stores' => $options['stores'] ?? [],
                ];
            }

            $orders = $this->fetchOrders($request, $userPlant->cbb_plant_code, $storopt);

            if (empty($orders['orders'])) {
                throw new \RuntimeException('No orders found for the given criteria.');
            }

            [$soHeader, $soItem] = $this->prepareOrderData($orders, $user, $userPlant, $dateToday);

            SoHeader::upsert($soHeader, ['okey'], []);
            $payload = $this->collapseDuplicates($soItem);
            SoItem::upsert($payload, ['okey', 'old_mat_code'], []);

            $this->updateMaterialAndCustomer($dateToday);
            $this->updateRemarks($dateToday);

            $errorResult = $this->getErrorResult($dateToday);

            SoHeader::whereIn('okey', $errorResult->pluck('okey')->unique()->values())->delete();

            DB::commit();

            return [
                'batches' => $options['batches'] ?? [],
                'stores' => $options['stores'] ?? [],
                'errorResult' => $errorResult->isNotEmpty() ? $errorResult->toArray() : null,
                'message' => $errorResult->isEmpty() ? 'Data imported successfully.' : null
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('StoreOrderImportService error', ['message' => $e->getMessage()]);
            throw $e;
        }
    }

    protected function fetchOptions($plantCode)
    {
        $response = Http::timeout(15)->retry(2, 200)->get(config('cbb.cbb_api'), [
            'func' => 'getOptions',
            'plcd' => $plantCode,
        ])->throw();
        return $response->json();
    }

    protected function fetchOrders(Request $request, $plantCode, $storopt)
    {
        $response = Http::timeout(15)->retry(2, 200)->get(config('cbb.cbb_api'), [
            'func' => 'getOrders',
            'plcd' => $plantCode,
            'del_date_from' => Carbon::parse($request->del_date_from)->format('m/d/Y'),
            'del_date_to' => Carbon::parse($request->del_date_to)->format('m/d/Y'),
            'batch_from' => $request->batch_from,
            'batch_to' => $request->batch_to,
            'storopt' => $storopt,
            'stcd' => $request->stcd,
        ])->throw();
        return $response->json();
    }

    protected function prepareOrderData($orders, $user, $userPlant, $dateToday)
    {
        $soHeader = [];
        $soItem = [];

        foreach ($orders['orders'] as $order) {
            $soHeader[] = [
                'okey' => $order['header']['okey'],
                'stor' => $order['header']['stor'],
                'order_date' => Carbon::parse($order['header']['odat'])->format("Y-m-d"),
                'delivery_date' => Carbon::parse($order['header']['pldt'])->format("Y-m-d"),
                'order_type' => $order['header']['ttyp'],
                'order_number' => $order['header']['tdoc'],
                'created_at' => $dateToday,
                'updated_at' => $dateToday,
                'updated_by' => $user->id,
                'created_by' => $user->id
            ];

            foreach ($order['details'] as $detail) {
                $soItem[] = [
                    'okey' => $detail['okey'],
                    'supa' => $detail['supa'],
                    'plant' => $userPlant->plant,
                    'item_no' => $detail['olin'],
                    'old_mat_code' => $detail['itcd'],
                    'material_desc' => $detail['idsc'],
                    'uom' => $detail['sunt'],
                    'order_qty' => $detail['oqty'] === '' ? 0 : $detail['oqty'],
                    'alloc_qty' => $detail['aqty'] === '' ? 0 : $detail['aqty'],
                    'is_obc' => $detail['iobc'] == 1,
                    'created_at' => $dateToday,
                    'updated_at' => $dateToday,
                    'updated_by' => $user->id,
                    'created_by' => $user->id
                ];
            }
        }

        return [$soHeader, $soItem];
    }

    protected function collapseDuplicates($soItem)
    {
        $keys = ['okey', 'old_mat_code'];
        $unique = collect($soItem)->reduce(function ($carry, $row) use ($keys) {
            $k = implode(':', array_map(fn($c) => $row[$c], $keys));
            if (!isset($carry[$k])) {
                $carry[$k] = $row;
            } else {
                $carry[$k]['order_qty'] += $row['order_qty'];
            }
            return $carry;
        }, []);
        return array_values($unique);
    }

    protected function updateMaterialAndCustomer($dateToday)
    {
        DB::statement("UPDATE so_items  itm 
            SET material = mat.mat_code , material_desc = mat.mat_desc
            FROM materials mat 
            WHERE itm.old_mat_code = mat.old_mat_code AND itm.updated_at = '{$dateToday}'");

        DB::statement("UPDATE so_headers hdr 
            SET customer = bp.bp_no  
            FROM business_partners bp 
            WHERE hdr.stor = bp.external_bp_no AND hdr.updated_at = '{$dateToday}'");
    }

    protected function updateRemarks($dateToday)
    {
        DB::table('so_items as so')
            ->leftJoin('alternative_uoms as alt', function ($join) {
                $join->on('so.material', '=', 'alt.mat_code')
                    ->on('so.uom', '=', 'alt.alt_uom');
            })
            ->whereNull('alt.mat_code')
            ->whereDate('so.updated_at', $dateToday)
            ->update(['remarks' => ' UOM does not exists.']);

        DB::table('so_items as so')
            ->leftJoin('materials as mat', function ($join) {
                $join->on('so.material', '=', 'mat.mat_code');
            })
            ->whereNull('mat.mat_code')
            ->whereDate('so.updated_at', $dateToday)
            ->update(['remarks' => ' Material does not exists.']);

        SoHeader::whereNull('customer')
            ->whereDate('updated_at', $dateToday)
            ->update(['remarks' => ' Customer does not exists.']);
    }

    protected function getErrorResult($dateToday)
    {
        return SoHeader::select(
            'so_headers.okey',
            'so_headers.stor',
            'so_headers.delivery_date',
            'so_headers.order_type',
            'so_headers.order_number',
            'so_items.old_mat_code',
            'so_items.uom',
            DB::raw('CONCAT(so_headers.remarks, so_items.remarks) as remarks')
        )
            ->join('so_items', 'so_headers.okey', '=', 'so_items.okey')
            ->where(function ($query) {
                $query->whereNotNull('so_headers.remarks')
                    ->orWhereNotNull('so_items.remarks');
            })
            ->whereDate('so_headers.created_at', $dateToday)
            ->orderBy('so_headers.stor')
            ->orderBy('so_headers.delivery_date')
            ->orderBy('so_headers.order_type')
            ->orderBy('so_headers.order_number')
            ->orderBy('so_items.old_mat_code')
            ->get();
    }
}