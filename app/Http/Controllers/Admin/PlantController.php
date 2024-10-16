<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePlantRequest;
use App\Http\Requests\UpdatePlantRequest;
use App\Models\Plant;

class PlantController extends Controller
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
    public function store(StorePlantRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Plant $plant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Plant $plant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlantRequest $request, Plant $plant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plant $plant)
    {
        //
    }
}
