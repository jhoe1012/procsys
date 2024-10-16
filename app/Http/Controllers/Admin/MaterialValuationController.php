<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaterialValuationRequest;
use App\Http\Requests\UpdateMaterialValuationRequest;
use App\Http\Resources\MaterialValuationResource;
use App\Models\MaterialValuation;
use App\Models\Plant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterialValuationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MaterialValuation::query();

        $query =  $query->with(['plants', 'material']);

        if (request('plant')) {
            $query->where('plant', 'like', "%" . request('plant') . "%");
        }
        if (request('material')) {
            $query->where('mat_code', 'like', "%" . request('material') . "%");
        }

        $materialValuation = $query->orderBy('mat_code', 'desc')
            ->orderBy('valid_from', 'desc')
            ->paginate(20)
            ->onEachSide(5);
            
        $plant =  Plant::select('plant', "name1")
            ->orderBy('plant')
            ->get()
            ->map(fn($item) =>  [
                
                'value' => $item->plant,
                'label' => $item->plant . '-' . $item->name1
            ])->toArray();

        return Inertia::render('Admin/ValuationPrice/Index', [
            'materialValuation' => MaterialValuationResource::collection($materialValuation),
            'plant' => $plant,
            'queryParams' => $request->query() ?: null,
            'message' => ['success' => session('success'), 'error' => session('error')],
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
        $materialValuation = new MaterialValuation();
        $materialValuation->plant =  $request->input('plant');
        $materialValuation->mat_code =  $request->input('mat_code');
        $materialValuation->currency =  $request->input('currency');
        $materialValuation->valuation_price =  $request->input('valuation_price');
        $materialValuation->per_unit =  $request->input('per_unit');
        $materialValuation->valid_from =  $request->input('valid_from');
        $materialValuation->valid_to =  $request->input('valid_to');
        $materialValuation->save();

        return to_route("val_price.index")->with('success', "Net price created.");
    }

    /**
     * Display the specified resource.
     */
    public function show(MaterialValuation $materialValuation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MaterialValuation $materialValuation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MaterialValuation $materialValuation)
    {
        $materialValuation->plant =  $request->input('plant');
        $materialValuation->mat_code =  $request->input('mat_code');
        $materialValuation->currency =  $request->input('currency');
        $materialValuation->valuation_price =  $request->input('valuation_price');
        $materialValuation->per_unit =  $request->input('per_unit');
        $materialValuation->valid_from =  $request->input('valid_from');
        $materialValuation->valid_to =  $request->input('valid_to');
        $materialValuation->save();

        return to_route("val_price.index")->with('success', "Net price created.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MaterialValuation $materialValuation)
    {
        //
    }
}
