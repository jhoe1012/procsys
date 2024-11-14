<?php

use App\Http\Controllers\Admin\MaterialController;
use App\Http\Controllers\AlternativeUomController;
use App\Http\Controllers\ApproverController;
use App\Http\Controllers\GRController;
use App\Http\Controllers\POController;
use App\Http\Controllers\VendorController;
use Illuminate\Support\Facades\Route;

Route::get('/material', [MaterialController::class, 'show'])->name('material.details');

Route::get('/po-plant', [POController::class, 'getApprovedPr'])->name('po.plant');
Route::get('/po-details/{ponumber}', [GRController::class, 'getPoDetails'])->name('po.details');
Route::get('/po-vendor/{vendor}', [VendorController::class, 'show'])->name('po.vendor');

Route::get('/vendor-search', [VendorController::class, 'search'])->name('vendor.search');
Route::get('/material-search', [MaterialController::class, 'search'])->name('material.search');
Route::get('/uom-search', [AlternativeUomController::class, 'search'])->name('uom.search');
Route::get('/user-search', [ApproverController::class, 'search'])->name('user.search');
Route::get('/po-control', [GRController::class, 'searchPOControlNo'])->name('po-control.search');
