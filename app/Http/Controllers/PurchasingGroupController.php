<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchasingGroupResource;
use App\Http\Requests\StorePurchasingGroupRequest;
use App\Http\Requests\UpdatePurchasingGroupRequest;
use App\Models\PurchasingGroup;
use App\Models\ProcurementGroup;
use App\Models\Plant;
use App\Models\PrctrlGrp;
use App\Models\Material;
use Illuminate\Http\Request; 
use Inertia\Inertia;

class PurchasingGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
        //
   public function index(Request $request)
    { 
        $query = PurchasingGroup::query();
        $query = $query->with(['plants', 'materials', 'prCtrlGrp' ]);

        if (request('mat_code')) {
            $query->where('mat_code', 'ilike', '%'.request('mat_code').'%');
        }
        if (request('mat_desc')) {
            $query->whereHas('materials', function ($q) {
                $q->where('mat_desc', 'ilike', '%' . request('mat_desc') . '%');
            });
        }
        if (request('purch_grp')) {
            $query->where('purch_grp', '=', request('purch_grp'));
        }
        if (request('plant')) {
            $query->where('plant', '=', request('plant'));
        }

        $query->whereHas('materials', function ($q) {
            $q->whereNotNull('mat_code');
        });

        $purchasingGroups = $query->orderBy('mat_code', 'asc')
            ->paginate(15)
            ->onEachSide(5)
            ->appends($request->query() ?: null);

        return Inertia::render('Admin/PurchGroup/Index', [
            'purchgrps' => PurchasingGroupResource::collection($purchasingGroups),
            'procgrps'  => ProcurementGroup::all()->toArray(),
            'plants'      => Plant::all()->toArray(),
            'materials'   => Material::all()->toArray(),
            'prctrlgrp'   => PrCtrlGrp::all()->toArray(),
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
    public function store(StorePurchasingGroupRequest $request)
    {
        //
        PurchasingGroup::create($request->validated());
        return back()->with('success', 'Purchasing Group created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(PurchasingGroup $purchasingGroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PurchasingGroup $purchasingGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePurchasingGroupRequest $request, PurchasingGroup $purchgrp)
    {   

        $purchgrp->update($request->validated());

        return back()->with('success', 'Purchase Group updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PurchasingGroup $purchasingGroup)
    {
        //
    } 
}
