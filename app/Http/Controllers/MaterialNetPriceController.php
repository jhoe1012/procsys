<?php

namespace App\Http\Controllers;

use App\Http\Resources\MaterialNetPriceResource;
use App\Models\MaterialNetPrice;
use App\Models\Plant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterialNetPriceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MaterialNetPrice::query();

        $query = $query->with(['vendors', 'plants', 'materials']);

        if (request('vendor')) {
            $query->where('vendor', 'like', '%'.request('vendor').'%');
        }
        if (request('plant')) {
            $query->where('plant', 'like', '%'.request('plant').'%');
        }
        if (request('material')) {
            $query->where('mat_code', 'like', '%'.request('material').'%');
        }

        $materialNetPrice = $query->orderBy('mat_code', 'desc')
            ->orderBy('valid_from', 'desc')
            ->paginate(50)
            ->onEachSide(5);

        //   dd($materialNetPrice_price);
        $plant = Plant::select('plant', 'name1')
            ->orderBy('plant')
            ->get()
            ->map(fn ($item) => [
                'value' => $item->plant,
                'label' => $item->plant.'-'.$item->name1,
            ])->toArray();

        return Inertia::render('Admin/NetPrice/Index', [
            'materialNetPrice' => MaterialNetPriceResource::collection($materialNetPrice),
            'plant'            => $plant,
            'queryParams'      => $request->query() ?: null,
            'message'          => ['success' => session('success'), 'error' => session('error')],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $materialNetPrice                = new MaterialNetPrice;
        $materialNetPrice->vendor        = $request->input('vendor');
        $materialNetPrice->plant         = $request->input('plant');
        $materialNetPrice->mat_code      = $request->input('mat_code');
        $materialNetPrice->currency      = $request->input('currency');
        $materialNetPrice->price         = $request->input('price');
        $materialNetPrice->per_unit      = $request->input('per_unit');
        $materialNetPrice->uom           = $request->input('uom');
        $materialNetPrice->valid_from    = $request->input('valid_from');
        $materialNetPrice->valid_to      = $request->input('valid_to');
        $materialNetPrice->min_order_qty = $request->input('min_order_qty');
        $materialNetPrice->save();

        return to_route('net_price.index')->with('success', 'Net price created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(MaterialNetPrice $materialNetPrice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MaterialNetPrice $materialNetPrice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MaterialNetPrice $materialNetPrice)
    {

        $materialNetPrice->vendor        = $request->input('vendor');
        $materialNetPrice->plant         = $request->input('plant');
        $materialNetPrice->mat_code      = $request->input('mat_code');
        $materialNetPrice->currency      = $request->input('currency');
        $materialNetPrice->price         = $request->input('price');
        $materialNetPrice->per_unit      = $request->input('per_unit');
        $materialNetPrice->uom           = $request->input('uom');
        $materialNetPrice->valid_from    = $request->input('valid_from');
        $materialNetPrice->valid_to      = $request->input('valid_to');
        $materialNetPrice->min_order_qty = $request->input('min_order_qty');
        $materialNetPrice->save();

        return to_route('net_price.index')->with('success', 'Net price updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MaterialNetPrice $materialNetPrice)
    {
        //
    }
}
