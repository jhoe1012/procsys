<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlternativeUomRequest;
use App\Http\Requests\UpdateAlternativeUomRequest;
use App\Http\Resources\AlternativeUomResource;
use App\Models\AlternativeUom;
use Illuminate\Http\Request;

class AlternativeUomController extends Controller
{
    public function search(Request $request)
    {
        if (!$request->input('search'))
            return;
        
        $alt_uom = AlternativeUom::where('mat_code', "{$request->input('search')}")->get();

        return AlternativeUomResource::collection($alt_uom);
    }

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
    public function store(StoreAlternativeUomRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AlternativeUom $alternativeUom)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AlternativeUom $alternativeUom)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAlternativeUomRequest $request, AlternativeUom $alternativeUom)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AlternativeUom $alternativeUom)
    {
        //
    }
}
