<?php

namespace App\Http\Controllers;

use App\Models\ProdOrdHdr1;
use App\Models\ProdOrdStatusHistory;
use App\Models\ProductionPlan;
use App\Http\Requests\StoreProductionPlanRequest;
use App\Http\Requests\UpdateProductionPlanRequest;
use App\Http\Resources\ProdOrdHdr1Resource;
use App\Import\ProductionOrderImport;
use App\Models\Material;
use App\Models\MaterialWorkCenter;
use App\Models\ProdOrdStatus;
use App\Models\SoHeader;
use App\Models\SoItem;
use App\Services\AttachmentService;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Str;

class ProductionPlanController extends Controller
{
    //  protected StoreOrderImportService $importService;

    // public function __construct(StoreOrderImportService $importService)
    // {
    //     $this->importService = $importService;
    // }

    // public function importStoreOrder(Request $request)
    // {
    //     try {
    //         $user = Auth::user();

    //         $result = $this->importService->import($request, $user);

    //         return Inertia::render('ProductionOrder/Import', $result);
    //     } catch (\Exception $e) {
    //         throw ValidationException::withMessages([
    //             'error' => $e->getMessage(),
    //         ]);
    //     }
    // }
    public function importStoreOrder(Request $request)
    {
        $dateToday = now();

        try {
            DB::beginTransaction();

            $user = Auth::user();
            $storopt = $request->stcd ? 'store' : 'batch';
            $userPlant = $user->plants()->firstOrFail();

            // First API call: get options
            $response = Http::timeout(15)->retry(2, 200)->get(config('cbb.cbb_api'), [
                'func' => 'getOptions',
                'plcd' => $userPlant->cbb_plant_code,
            ])->throw();
            $options = $response->json();

            if ($request->isMethod('get')) {
                return Inertia::render('ProductionOrder/Import', [
                    'batches' => $options['batches'] ?? [],
                    'stores' => $options['stores'] ?? [],
                ]);
            }

            // Second API call: get orders
            $response = Http::timeout(15)->retry(2, 200)->get(config('cbb.cbb_api'), [
                'func' => 'getOrders',
                'plcd' => $userPlant->cbb_plant_code,
                'del_date_from' => Carbon::parse($request->del_date_from)->format('m/d/Y'),
                'del_date_to' => Carbon::parse($request->del_date_to)->format('m/d/Y'),
                'batch_from' => $request->batch_from,
                'batch_to' => $request->batch_to,
                'storopt' => $storopt,
                'stcd' => $request->stcd,
            ])->throw();
            $orders = $response->json();

            if (empty($orders['orders'])) {
                throw new \RuntimeException('No orders found for the given criteria.');
            }

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

            SoHeader::upsert($soHeader, ['okey'], []);

            $keys = ['okey', 'old_mat_code'];

            // Collapse duplicates
            $unique = collect($soItem)->reduce(function ($carry, $row) use ($keys) {
                $k = implode(':', array_map(fn($c) => $row[$c], $keys));
                if (!isset($carry[$k])) {
                    $carry[$k] = $row;
                } else {
                    $carry[$k]['order_qty'] += $row['order_qty'];
                }
                return $carry;
            }, []);

            $payload = array_values($unique);
            SoItem::upsert($payload, $keys, []);

            DB::statement("UPDATE so_items  itm 
            SET material = mat.mat_code , material_desc = mat.mat_desc
            FROM materials mat 
            WHERE itm.old_mat_code = mat.old_mat_code AND itm.updated_at = '{$dateToday}'");

            DB::statement("UPDATE so_headers hdr 
            SET customer = bp.bp_no  
            FROM business_partners bp 
            WHERE hdr.stor = bp.external_bp_no AND hdr.updated_at = '{$dateToday}'");

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

            $errorResult = SoHeader::select(
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

            SoHeader::whereIn('okey', $errorResult->pluck('okey')->unique()->values())->delete();

            DB::commit();

            return Inertia::render('ProductionOrder/Import', [
                'batches' => $options['batches'] ?? [],
                'stores' => $options['stores'] ?? [],
                'errorResult' => $errorResult->isNotEmpty() ? $errorResult->toArray() : null,
                'message' => $errorResult->isEmpty() ? 'Data imported successfully.' : null
            ]);
        } catch (RequestException $e) {
            DB::rollBack();
            Log::error('API request failed', ['message' => $e->getMessage()]);
            throw ValidationException::withMessages([
                'error' => 'Failed to fetch data from CBB API. Please try again later.',
            ]);
        } catch (QueryException $e) {
            DB::rollBack();
            Log::error('Database query failed', ['message' => $e->getMessage()]);
            throw ValidationException::withMessages([
                'error' => 'Database error occurred during import.',
            ]);
        } catch (\RuntimeException $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'error' => $e->getMessage(),
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('Unexpected error', ['message' => $e->getMessage()]);
            throw ValidationException::withMessages([
                'error' => 'Unexpected error occurred during import.',
            ]);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $prodOrd = null;

        if ($request->input('prod_date') && $request->input('plant')) {
            $prodOrd = ProdOrdHdr1::whereDate('production_date', $request->input('prod_date'))
                ->where('plant', $request->input('plant'))
                ->get();
        }

        return Inertia::render('ProductionOrder/Index', [
            'prodOrds' => $prodOrd && !$prodOrd->isEmpty() ? ProdOrdHdr1Resource::collection($prodOrd) : null,
            'message' => ['success' => session('success'), 'error' => session('error')],
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        if (! $request->session()->get('prodOrds')) {
            $validated = $request->validate([
                'plant' => 'required|string',
                'delivDateFrom' => 'required|date',
                // 'delivDateTo' => 'required|date',
            ]);

            $productionOrder =  SoItem::select('so_items.material', 'so_items.uom', 'so_items.material_desc', DB::raw('SUM(so_items.order_qty) as total_qty'))
                ->join('so_headers', 'so_items.okey', '=', 'so_headers.okey')
                ->where('so_items.plant', $validated['plant'])
                ->whereDate('so_headers.delivery_date', [$validated['delivDateFrom']])
                ->groupBy('so_items.material', 'so_items.uom', 'so_items.material_desc')
                ->get()->toArray();

            $productionOrder = array_map(fn($item) => [
                'material' => $item['material'],
                'target_uom_ou' => $item['uom'],
                'mat_desc' => $item['material_desc'],
                'to_create_qty' => (int)$item['total_qty'],
                'delivery_date' => $validated['delivDateFrom'],
            ], $productionOrder);
        }

        return Inertia::render('ProductionOrder/Create', [
            'prodOrds' => $request->session()->get('prodOrds') ? $request->session()->get('prodOrds') : $productionOrder,
            'mat_code'               => Material::getMaterialCode(),
            'mat_desc'               => Material::getMaterialDescription(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // DB::listen(fn($q) => dump($q->toRawSql()));
        $validated =  $request->validate([
            'prodOrd' => 'required|array|min:1',
            'prodOrd.*.material' => 'required|string|max:20',
            'prodOrd.*.target_uom_ou' => 'required|string|max:10',
            'prodOrd.*.mat_desc' => 'required|string|max:255',
            'prodOrd.*.to_create_qty' => 'required|numeric|min:1',
            'prodOrd.*.delivery_date' => 'required|date',
            'prodOrd.*.production_date' => 'required|date',
            'plant' => 'required|string',
        ]);

        $materials = collect($validated['prodOrd'])->pluck('material')->unique()->toArray();

        $materialWorkCenters = MaterialWorkCenter::with('workCenter')
            ->whereIn('material', $materials)
            ->where('plant', $validated['plant'])
            ->get();



        foreach ($validated['prodOrd'] as $order) {
            $materialWorkCenter = $materialWorkCenters->firstWhere('material', $order['material']);
            $prodOrdHdr1 = ProdOrdHdr1::create([
                'material' => $order['material'],
                'mat_desc' => $order['mat_desc'],
                'target_qty_ou' => $order['to_create_qty'],
                'target_uom_ou' => $order['target_uom_ou'],
                'target_qty_bu' => $order['to_create_qty'],
                'target_uom_bu' => $order['target_uom_ou'],
                'date_created' => Carbon::parse($order['production_date'])->format('Y-m-d'),
                'basic_start' => Carbon::parse($order['production_date'])->format('Y-m-d'),
                'basic_finish' => Carbon::parse($order['production_date'])->format('Y-m-d'),
                'delivery_date' => Carbon::parse($order['delivery_date'])->format('Y-m-d'),
                'production_date' => Carbon::parse($order['production_date'])->format('Y-m-d'),
                'plant' => $validated['plant'],
                'sloc' => '',
                'work_center_id' => $materialWorkCenter->workCenter->id ?? '',
                'supply_area' => $materialWorkCenter->workCenter->supply_area,
                'receiving_area' => $materialWorkCenter->workCenter->receiving_area,
            ]);

            ProdOrdStatus::create([
                'order' => $prodOrdHdr1->order,
                'status' => 'CRTD',
                'is_active' => true,
            ]);

            ProdOrdStatusHistory::create([
                'order' => $prodOrdHdr1->order,
                'status' => 'CRTD',
                'is_active' => true,
                'date_time_stamp' => now(),
                'user_id' => Auth::id(),
                'ins_upd' => 'I'
            ]);
        }
        $prodDate = Carbon::parse($validated['prodOrd'][0]['production_date'])->format('Y-m-d');

        return  to_route('production-plan.index', ['plant' => $validated['plant'], 'prod_date' => $prodDate])->with('success', 'Production Order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductionPlan $productionPlan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductionPlan $productionPlan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductionPlan $productionPlan) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductionPlan $productionPlan)
    {
        //
    }

    public function import(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'file.*' => 'required|file|mimes:xlsx,csv',
        ]);



        try {
            $files = AttachmentService::handleImport($request);
            if (empty($files)) {
                throw ValidationException::withMessages(['error' => ['No valid files were uploaded ']]);
            }

            $productionOrder = new ProductionOrderImport;
            Excel::import($productionOrder, storage_path('app/' . $files['filepath']));
            $productionOrderData = $productionOrder->getProductionOrder();


            if (empty($productionOrderData)) {
                throw ValidationException::withMessages([
                    'error' => ['No valid production order records found.'],
                ]);
            }
            $productionOrderData = array_map(fn($item) => [
                'material' => $item['material'],
                'target_uom_ou' => $item['uom'],
                'mat_desc' => $item['mat_desc'],
                'to_create_qty' => (int)$item['total_qty'],

            ], $productionOrderData);

            return to_route('production-plan.create')->with(
                'prodOrds',
                $productionOrderData,

            );

            // return Inertia::render('ProductionOrder/Create', [
            //     'prodOrds' => $productionOrderData,
            //     'mat_code'               => Material::getMaterialCode(),
            //     'mat_desc'               => Material::getMaterialDescription(),
            // ]);
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors());
        }
    }
}
