<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUomRequest;
use App\Http\Requests\UpdateUomRequest;
use App\Http\Resources\UomResource;
use App\Models\Uom;
use Illuminate\Http\Request;

class UomController extends Controller
{
    public function search(Request $request)
    {
        if (! $request->input('search')) {
            return;
        }

        $uom = Uom::where('uom', 'ilike', "%{$request->input('search')}%")
            ->orWhere('uom_text', 'ilike', "%{$request->input('search')}%")
            ->get();

        return UomResource::collection($uom);
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
    public function store(StoreUomRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Uom $uom)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Uom $uom)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUomRequest $request, Uom $uom)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Uom $uom)
    {
        //
    }
}
