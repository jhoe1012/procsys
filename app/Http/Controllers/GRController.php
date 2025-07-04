<?php

namespace App\Http\Controllers;

use App\Http\Resources\GRHeaderResource;
use App\Http\Resources\POHeaderResource;
use App\Models\ApproveStatus;
use App\Models\GrHeader;
use App\Models\GrMaterial;
use App\Models\Material;
use App\Models\PoHeader;
use App\Models\PoMaterial;
use App\Models\Vendor;
use Carbon\Carbon;
use Illuminate\Http\Request;
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
            'gr_number_from' => fn ($value) => request('gr_number_to')
                ? $query->whereBetween('gr_number', [
                    $value,
                    request('gr_number_to'),
                ])
                : $query->where('gr_number', 'like', "%{$value}%"),
            'po_number_from' => fn ($value) => request('entry_date_to')
                ? $query->whereBetween('po_number', [
                    $value,
                    request('po_number_to'),
                ])
                : $query->where('po_number', 'like', "%{$value}%"),
            'entry_date_from' => fn ($value) => request('entry_date_to')
                ? $query->whereBetween('entry_date', [
                    $value,
                    request('entry_date_to'),
                ])
                : $query->where('entry_date', 'like', "%{$value}%"),
            'actual_date_from' => fn ($value) => request('actual_date_to')
                ? $query->whereBetween('actual_date', [
                    $value,
                    request('actual_date_to'),
                ])
                : $query->where('actual_date', 'like', "%{$value}%"),
            'plant'      => fn ($value) => $query->where('plant', 'ilike', "%{$value}%"),
            'vendor'     => fn ($value) => $query->where('vendor_id', 'ilike', "%{$value}%"),
            'entered_by' => fn ($value) => $query->where('created_name', 'ilike', "%{$value}%"),
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
            ])
        );

        $gr_materials = collect($request->input('grmaterials'))
            ->filter(fn ($item) => ! empty($item['mat_code']))
            ->values()
            ->map(fn ($item, $index) => new GrMaterial([
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
            ]));

        $gr_header->grmaterials()->saveMany($gr_materials);

        foreach ($gr_materials as $gr_material) {

            $gr_material->pomaterials->po_gr_qty = $gr_material->gr_qty <= $gr_material->pomaterials->po_gr_qty
                ? $gr_material->pomaterials->po_gr_qty - $gr_material->gr_qty
                : 0;
            $gr_material->pomaterials->status = $gr_material->dci || $gr_material->pomaterials->po_gr_qty == 0
                ? PoMaterial::FLAG_DELIVER
                : $gr_material->pomaterials->status;
            $gr_material->pomaterials->save();
        }

        return to_route('gr.index')->with('success', "GR {$gr_header->gr_number} created.");
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
            'pomaterials' => fn ($query) => $query->where('po_gr_qty', '>', 0)
                ->whereNull('status')
                ->orWhere('status', '=', ''),
        ])->where('po_number', $ponumber)
            ->first();

        return new POHeaderResource($gr_header);
    }

    public function cancel(Request $request, $id)
    {

        foreach ($request->input('grmaterials') as $grmaterial) {
            if ($grmaterial['id']) {
                $gr_material = GrMaterial::with('pomaterials')->findOrFail($grmaterial['id']);
                if ($gr_material->is_cancel) {
                    continue;
                }
                $gr_material->cancel_by       = auth()?->user()?->id;
                $gr_material->is_cancel       = true;
                $gr_material->cancel_datetime = date('Y-m-d H:i:s');

                if ($gr_material->pomaterials instanceof PoMaterial) {
                    $gr_material->pomaterials->po_gr_qty += $gr_material->gr_qty;
                    $gr_material->pomaterials->status = null;
                    $gr_material->pomaterials->save();
                }
                $gr_material->save();
            }
        }

        return to_route('gr.index')->with('success', 'GR item(s) cancelled.');
    }

    public function printGr(Request $request, $id)
    {
        $grHeader = GrHeader::with(['grmaterials', 'plants', 'vendors'])->findOrFail($id);

        return view('print.gr', ['grHeader' => $grHeader,  'genericMaterials' => Material::genericItems()->pluck('mat_code')->toArray()]);
    }

    public function searchPOControlNo(Request $request)
    {

        $poHeader = PoHeader::select('po_number', 'control_no')
            ->where('status', ApproveStatus::APPROVED)
            ->whereNotNull('control_no')
            ->where(fn ($query) => $query->where('po_number', 'ilike', "%{$request->input('search')}%")
                ->orWhere('control_no', 'ilike', "%{$request->input('search')}%"))
            ->whereHas('pomaterials', fn ($query) => $query->where('po_gr_qty', '>', 0))
            ->get()
            ->toArray();

        return $poHeader;
    }
}
