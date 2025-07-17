<?php

namespace App\Http\Controllers;

use App\Http\Resources\PrControllerGroupResource;
use App\Http\Requests\StorePrCtrlGrpRequest;
use App\Http\Requests\UpdatePrCtrlGrpRequest;
use App\Models\Plant;
use App\Models\PrctrlGrp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrctrlGrpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PrctrlGrp::query();

        if (request('plant')) {
            $query->where('plant', '=', request('plant'));
        }
        if (request('prctrl_desc')) {
            $query->where('prctrl_desc', 'ilike', '%'.request('prctrl_desc').'%');
        }
        if (request('prctrl_grp')) {
            $query->where('prctrl_grp', 'ilike', '%'.request('prctrl_grp').'%');
        }

        $prctrlgrps = $query->orderBy('plant_id', 'asc')
            ->paginate(15)
            ->onEachSide(5)
            ->appends($request->query() ?: null);

        return Inertia::render('Admin/PrCtrlGrp/Index', [
            'prctrlgrps' => PrControllerGroupResource::collection($prctrlgrps),
            'plants'      => Plant::all()->toArray(),
            'queryParams' => $request->query() ?: null,
            'message'     => ['success' => session('success'), 'error' => session('error'), 'missing' => session('missing', [])],
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
    public function store(StorePrCtrlGrpRequest $request)
    {
         PrctrlGrp::create($request->validated());
        return back()->with('success', 'Controller Group created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
       public function update(UpdatePrCtrlGrpRequest $request, PrctrlGrp $prctrlgrp)
    {
        $prctrlgrp->update($request->validated());

        return back()->with('success', 'PR Controller Group updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function search(Request $request)
    {  
        if (! $request->input('search')) {
            return;
        }
        $plant = Plant::with('prctrlgrps')
            ->where('plant', $request->input('search'))
            ->first();

        // Handle null response (plant not found)
        if (! $plant) {
            return response()->json(['controllerGroups' => []]);
        } 

        return PrControllerGroupResource::collection($plant->prctrlgrps);

    }

}
