<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use App\Http\Resources\MaterialResource;
use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreMaterialRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $material = Material::with([
            'materialGroups',
            'altUoms',
            'valuations'   => fn($query) => $query->where('plant', $request->input('plant')),
            'purchasingGroups' => fn($query) => $query->where('plant', $request->input('plant'))
        ])
            ->where('mat_code', $request->input('material'))
            ->orWhere('mat_desc', $request->input('material'))
            ->firstOrFail();

        return new MaterialResource($material);
    }

    public function getMaterialForSelect()
    {

        return Material::select('mat_code as value', 'mat_code as label')->orderBy('mat_code')->take(5)->get()->toArray();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Material $material)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaterialRequest $request, Material $material)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        //
    }
    public function search(Request $request)
    {
        if (!$request->input('search'))
            return;

        $material = Material::where('mat_code', 'ilike', "%{$request->input('search')}%")
            ->orWhere('mat_desc', 'ilike', "%{$request->input('search')}%")
            ->orWhere('old_mat_code', 'ilike', "%{$request->input('search')}%")
            ->get();

        return MaterialResource::collection($material);
    }
}
