<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePrHeaderRequest;
use App\Models\PrHeader;
use Illuminate\Http\Request;

class PrHeaderController extends Controller
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
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(PrHeader $prHeader)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PrHeader $prHeader)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePrHeaderRequest $request, PrHeader $prHeader)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PrHeader $prHeader)
    {
        //
    }
}
