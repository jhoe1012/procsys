<?php

namespace App\Http\Controllers;

use App\Enum\ItemCategoryEnum;
use App\Enum\MovementTypeEnum;
use App\Enum\PriceControlEnum;
use App\Exceptions\MaterialException;
use App\Http\Resources\GRHeaderResource;
use App\Http\Resources\POHeaderResource;
use App\Models\ApproveStatus;
use App\Models\GrHeader;
use App\Models\GrMaterial;
use App\Models\Material;
use App\Models\PlantSloc;
use App\Models\PoHeader;
use App\Models\PoMaterial;
use App\Models\SlocMat;
use App\Models\Vendor;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class GRController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Fetch user plants
        $userPlants = $user->plants->pluck('plant')->toArray();

        $query = GrHeader::with(['grmaterials', 'plants', 'vendors'])
            ->whereIn('plant', $userPlants);

        $filters = [
            'gr_number_from' => fn($value) => request('gr_number_to')
                ? $query->whereBetween('gr_number', [
                    $value,
                    request('gr_number_to'),
                ])
                : $query->where('gr_number', 'like', "%{$value}%"),
            'po_number_from' => fn($value) => request('entry_date_to')
                ? $query->whereBetween('po_number', [
                    $value,
                    request('po_number_to'),
                ])
                : $query->where('po_number', 'like', "%{$value}%"),
            'entry_date_from' => fn($value) => request('entry_date_to')
                ? $query->whereBetween('entry_date', [
                    $value,
                    request('entry_date_to'),
                ])
                : $query->where('entry_date', 'like', "%{$value}%"),
            'actual_date_from' => fn($value) => request('actual_date_to')
                ? $query->whereBetween('actual_date', [
                    $value,
                    request('actual_date_to'),
                ])
                : $query->where('actual_date', 'like', "%{$value}%"),
            'plant'      => fn($value) => $query->where('plant', 'ilike', "%{$value}%"),
            'vendor'     => fn($value) => $query->where('vendor_id', 'ilike', "%{$value}%"),
            'entered_by' => fn($value) => $query->where('created_name', 'ilike', "%{$value}%"),
        ];

        // Apply filters dynamically
        foreach (request()->only(array_keys($filters)) as $field => $value) {
            if (! empty($value)) {
                $filters[$field]($value);
            }
        }

        $gr_header = $query->orderBy('entry_date', 'desc')
            ->orderBy('gr_number', 'desc')
            ->paginate(50)
            ->onEachSide(5);

        return Inertia::render('GR/Index', [
            'gr_header'     => GRHeaderResource::collection($gr_header),
            'queryParams'   => $request->query() ?: null,
            'message'       => ['success' => session('success'), 'error' => session('error')],
            'vendorsChoice' => Vendor::getVendorsChoice(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('GR/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $docNumber = '';
        try {
            DB::transaction(function () use ($request, &$docNumber) {
                $gr_header = GrHeader::create(
                    $request->only([
                        'po_number',
                        'created_name',
                        'vendor_id',
                        'plant',
                        'entry_date',
                        'posting_date',
                        'actual_date',
                        'delivery_note',
                        'header_text',
                        'transaction',
                    ])
                );

                $gr_materials = collect($request->input('grmaterials'))
                    ->filter(fn($item) => ! empty($item['mat_code']))
                    ->values()
                    ->map(fn($item, $index) => new GrMaterial([
                        'po_material_id' => $item['po_material_id'],
                        'item_no'        => ($index + 1) * 10,
                        'mat_code'       => $item['mat_code'],
                        'short_text'     => $item['short_text'],
                        'item_text'      => $item['item_text'],
                        'gr_qty'         => $item['gr_qty'],
                        'unit'           => $item['unit'],
                        'po_deliv_date'  => $item['po_deliv_date'],
                        'batch'          => $item['batch'] ?? null,
                        'mfg_date'       => $item['mfg_date'] ? Carbon::parse($item['mfg_date'])->format('Y-m-d') : null,
                        'sled_bbd'       => $item['mfg_date'] ? Carbon::parse($item['sled_bbd'])->format('Y-m-d') : null,
                        'po_number'      => $item['po_number'],
                        'po_item'        => $item['po_item'],
                        'dci'            => $item['gr_qty'] >= $item['po_gr_qty'] ?: $item['dci'],
                        'sloc'           => $item['sloc'],
                        'movement_type'  => MovementTypeEnum::GoodsReceipt,
                        'plant'          => $request->input('plant'),
                    ]));

                $gr_header->grmaterials()->saveMany($gr_materials);
                $docNumber = $gr_header->gr_number;

                $gr_header->load([
                    'grmaterials',
                    'grmaterials.altUoms',
                    'grmaterials.material',
                    'grmaterials.valuations',
                    'grmaterials.pomaterials',
                    'grmaterials.purchasingGroups' => fn($q) => $q->where('plant', $gr_header->plant),
                ]);

                foreach ($gr_header->grmaterials as $gr_material) {
                    $is_sloc_blocked = PlantSloc::plantSloc($gr_material->plant, $gr_material->sloc)->value('is_sloc_blocked');

                    if ($gr_material->purchasingGroups->item_cat === ItemCategoryEnum::Stock->value && $is_sloc_blocked) {
                        throw new MaterialException("Storage Location is currently blocked for material {$gr_material->mat_code}");
                    }

                    $gr_material->pomaterials->po_gr_qty = $gr_material->gr_qty <= $gr_material->pomaterials->po_gr_qty
                        ? $gr_material->pomaterials->po_gr_qty - $gr_material->gr_qty
                        : 0;
                    $gr_material->pomaterials->status = $gr_material->dci || $gr_material->pomaterials->po_gr_qty == 0
                        ? PoMaterial::FLAG_DELIVER
                        : $gr_material->pomaterials->status;
                    $gr_material->pomaterials->save();

                    // Filter the altenative UOM equals to the unit of the GR material
                    $altUom             = $gr_material->altUoms->where('alt_uom', $gr_material->unit)->first();
                    $valuation          = $gr_material->valuations->where('plant', $gr_material->plant)->first();
                    $conversion         = $altUom ? $altUom->counter / $altUom->denominator : 1;
                    $material_inventory = SlocMat::where('plant', $gr_material->plant)
                        ->where('sloc', $gr_material->sloc)
                        ->where('material', $gr_material->mat_code)
                        ->first();

                    $gr_material->base_qty  = $gr_material->gr_qty * $conversion;
                    $gr_material->base_uom  = $gr_material->material->base_uom ?? null;
                    $gr_material->prior_qty = $material_inventory ? $material_inventory->qty_avail : 0;
                    $gr_material->prior_val = $valuation ? $valuation->valuation_price : 0;

                    // Net price in base UOM
                    $base_net_price = ($gr_material->pomaterials->net_price / $gr_material->pomaterials->per_unit) / $gr_material->pomaterials->conversion;

                    // Update valuation price if the valuation process is moving standard price.
                    if ($valuation->val_proc === PriceControlEnum::MovingAvgPrice->value) {
                        $new_valuation              = ($gr_material->prior_qty * ($valuation->valuation_price / $valuation->per_unit)) + ($gr_material->base_qty * ($base_net_price));
                        $new_valuation              = $new_valuation / ($gr_material->prior_qty + $gr_material->base_qty);
                        $valuation->valuation_price = $new_valuation;
                        $valuation->save();
                    }
                    $gr_material->base_amount = $base_net_price * $gr_material->base_qty;
                    $gr_material->save();

                    // Update or insert inventory
                    if ($gr_material->purchasingGroups->item_cat === ItemCategoryEnum::Stock->value) {
                        SlocMat::upsert([
                            'plant'     => $gr_material->plant,
                            'sloc'      => $gr_material->sloc,
                            'material'  => $gr_material->mat_code,
                            'qty_avail' => $gr_material->prior_qty + $gr_material->base_qty,
                            'base_uom'  => $gr_material->base_uom,
                        ], ['plant', 'sloc', 'material'], ['qty_avail']);
                    }
                }
            });
        } catch (MaterialException $exception) {
            throw ValidationException::withMessages([
                'error' => $exception->getMessage(),
            ]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            throw ValidationException::withMessages([
                'error' => 'An error occurred while creating the Goods Receipt. Please contact administrator.',
            ]);
        }

        return to_route('gr.index')->with('success', "GR {$docNumber} is created.");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $grnumber)
    {
        $gr_header = GrHeader::with(['grmaterials', 'vendors', 'plants'])
            ->where('gr_number', $grnumber)
            ->firstOrFail();

        return Inertia::render('GR/Show', [
            'grheader' => new GRHeaderResource($gr_header),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $grnumber)
    {
        $gr_header = GrHeader::with(['grmaterials', 'vendors', 'plants'])
            ->where('gr_number', $grnumber)
            ->firstOrFail();

        return Inertia::render('GR/Edit', [
            'grheader' => new GRHeaderResource($gr_header),
        ]);
    }

    public function getPoDetails($ponumber)
    {

        $gr_header = PoHeader::with([
            'plants',
            'vendors',
            'pomaterials.purchasingGroups' => function ($query) use ($ponumber) {
                $query->where('plant', function ($subQuery) use ($ponumber) {
                    $subQuery->select('plant')
                        ->from('po_headers')
                        ->where('po_number', $ponumber);
                });
            },
            'pomaterials' => fn($query) => $query->where('po_gr_qty', '>', 0)
                ->where(
                    fn(Builder $query) => $query->whereNull('status')
                        ->orWhere('status', '=', '')
                ),
        ])->where('po_number', $ponumber)
            ->first();

        return new POHeaderResource($gr_header);
    }

    public function cancel(Request $request, $id)
    {
        $docNum = '';
        try {
            DB::transaction(function () use ($id, $request, &$docNum) {
                $orig_gr = GrHeader::findOrFail($id);
                $orig_gr->load([
                    'grmaterials',
                    'grmaterials.altUoms',
                    'grmaterials.material',
                    'grmaterials.valuations',
                    'grmaterials.pomaterials',
                    'grmaterials.purchasingGroups' => fn($q) => $q->where('plant', $orig_gr->plant),
                ]);

                $orig_gr->update([
                    'is_reversal' => true,
                ]);
                $cancelled_gr = $orig_gr->replicate([
                    'created_by',
                    'updated_by',
                    'gr_number',
                ]);

                $cancelled_gr->transaction = $request->input('transaction');
                $cancelled_gr->is_reversal = true;
                $cancelled_gr->entry_date  = Carbon::now()->toDateString();
                $cancelled_gr->save();

                $docNum = $cancelled_gr->gr_number;

                foreach ($orig_gr->grmaterials as $grmaterial) {
                    $inventory = SlocMat::materialInventory(
                        $grmaterial->plant,
                        $grmaterial->sloc,
                        $grmaterial->mat_code
                    )->first();

                    if (! $inventory instanceof SlocMat) {
                        throw new MaterialException(sprintf('No available inventory for material %s', $grmaterial->mat_code));
                    }

                    $is_sloc_blocked = PlantSloc::plantSloc($grmaterial->plant, $grmaterial->sloc)->value('is_sloc_blocked');

                    if ($grmaterial->purchasingGroups->item_cat === ItemCategoryEnum::Stock->value && $is_sloc_blocked) {
                        throw new MaterialException(sprintf('Storage Location is currently blocked for material %s', $grmaterial->mat_code));
                    }

                    if ($inventory->qty_avail < $grmaterial->base_qty) {
                        throw new MaterialException(sprintf(
                            'Cancel quantity (%.2f %s) exceeds available stock (%.2f %s) for material %s',
                            $grmaterial->base_qty,
                            $grmaterial->base_uom,
                            $inventory->qty_avail,
                            $inventory->base_uom,
                            $grmaterial->mat_code
                        ));
                    }

                    $x_grmaterial = $grmaterial->replicate([
                        'created_by',
                        'updated_by',
                    ]);

                    $valuation = $grmaterial->valuations->where('plant', $cancelled_gr->plant)->first();

                    $x_grmaterial->gr_header_id  = $cancelled_gr->id;
                    $x_grmaterial->movement_type = MovementTypeEnum::ReversalGoodsReceipt;
                    $x_grmaterial->prior_qty     = $inventory->qty_avail;
                    $x_grmaterial->prior_val     = $valuation->valuation_price ?? 0;
                    $x_grmaterial->gr_number_ref = $orig_gr->gr_number;
                    $x_grmaterial->item_no_ref   = $grmaterial->item_no;
                    $x_grmaterial->save();

                    // Update inventory
                    if ($grmaterial->purchasingGroups->item_cat === ItemCategoryEnum::Stock->value) {
                        $inventory->decrement('qty_avail', $x_grmaterial->base_qty);
                    }

                    // Update valuation price if the valuation process is moving standard price.
                    if ($valuation && $valuation->val_proc === PriceControlEnum::MovingAvgPrice->value && $inventory->qty_avail) {
                        if ($inventory->qty_avail) {
                            $prior_value                = $x_grmaterial->prior_val * $x_grmaterial->prior_qty;
                            $valuation->valuation_price = ($prior_value - $x_grmaterial->base_amount) / $inventory->qty_avail;
                            $valuation->save();
                        }
                    }

                    if ($grmaterial->pomaterials instanceof PoMaterial) {
                        $grmaterial->pomaterials->update([
                            'po_gr_qty' => $grmaterial->pomaterials->po_gr_qty + $grmaterial->gr_qty,
                            'status'    => null,
                        ]);
                    }
                }
            });
        } catch (MaterialException $exception) {
            throw ValidationException::withMessages([
                'error' => $exception->getMessage(),
            ]);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            throw ValidationException::withMessages([
                'error' => 'An error occurred while cancelling the Goods Receipt. Please contact administrator.',
            ]);
        }

        return to_route('gr.index')->with('success', "GR Reversal document {$docNum}");
    }

    public function printGr(Request $request, $id)
    {
        $grHeader = GrHeader::with(['grmaterials', 'plants', 'vendors'])->findOrFail($id);

        return view('print.gr', ['grHeader' => $grHeader,  'genericMaterials' => Material::genericItems()->pluck('mat_code')->toArray()]);
    }

    public function searchPOControlNo(Request $request)
    {
        // TODO ADD PLANT FILTER
        $poHeader = PoHeader::select('po_number', 'control_no')
            ->where('status', ApproveStatus::APPROVED)
            ->whereNotNull('control_no')
            ->where(fn($query) => $query->where('po_number', 'ilike', "%{$request->input('search')}%")
                ->orWhere('control_no', 'ilike', "%{$request->input('search')}%"))
            ->whereHas('pomaterials', fn($query) => $query->where('po_gr_qty', '>', 0))
            ->get()
            ->toArray();

        return $poHeader;
    }
}
