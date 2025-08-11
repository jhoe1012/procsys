<?php

use App\Enum\PermissionsEnum;
use App\Http\Controllers\Admin\MaterialController;
use App\Http\Controllers\Admin\MaterialValuationController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AlternativeUomController;
use App\Http\Controllers\ApproverController;
use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GRController;
use App\Http\Controllers\MaterialNetPriceController;
use App\Http\Controllers\POController;
use App\Http\Controllers\PRController;
use App\Http\Controllers\PrctrlGrpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\PurchasingGroupController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/auth/{provider}/redirect', [SocialController::class, 'redirect'])
    ->where('provider', 'azure|google')
    ->name('oauth.microsoft');
Route::get('/auth/{provider}/callback', [SocialController::class, 'callback'])
    ->where('provider', 'azure|google');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/pr', [PRController::class, 'index'])->name('pr.index');
    Route::get('/pr-create', [PRController::class, 'create'])->name('pr.create');
    Route::post('/pr-store', [PRController::class, 'store'])->name('pr.store');
    Route::get('/pr-edit/{prnumber}', [PRController::class, 'edit'])->name('pr.edit');
    Route::patch('/pr-update/{id}', [PRController::class, 'update'])->name('pr.update');
    Route::get('/pr-submit/{id}', [PRController::class, 'submit'])->name('pr.submit');
    Route::post('/pr-approve', [PRController::class, 'approve'])->name('pr.approve');
    Route::get('/pr-discard/{id}', [PRController::class, 'discard'])->name('pr.discard');
    Route::get('/pr-flag-delete', [PRController::class, 'flagDelete'])->name('pr.flag.delete');
    Route::get('/pr-flag-close', [PRController::class, 'flagClose'])->name('pr.flag.close');
    Route::get('/pr-flag-remove', [PRController::class, 'flagRemove'])->name('pr.flag.remove');
    Route::get('/pr-recall/{id}', [PRController::class, 'recall'])->name('pr.recall');
    Route::get('/pr-copy/{prnumber}', [PRController::class, 'copy'])->name('pr.copy');

    Route::get('/po', [POController::class, 'index'])->name('po.index');
    Route::get('/po-create', [POController::class, 'create'])->name('po.create');
    Route::post('/po-store', [POController::class, 'store'])->name('po.store');
    Route::get('/po-edit/{ponumber}', [POController::class, 'edit'])->name('po.edit');
    Route::patch('/po-update/{id}', [POController::class, 'update'])->name('po.update');
    Route::get('/po-submit/{id}', [POController::class, 'submit'])->name('po.submit');
    Route::post('/po-approve', [POController::class, 'approve'])->name('po.approve');
    Route::get('/po-discard/{id}', [POController::class, 'discard'])->name('po.discard');
    Route::get('/po-flag-delete', [POController::class, 'flagDelete'])->name('po.flag.delete');
    Route::get('/po-flag-deliver', [POController::class, 'flagComplete'])->name('po.flag.deliver');
    Route::get('/po-print/{id}', [POController::class, 'printPo'])->name('po.print');
    Route::get('/po-recall/{id}', [POController::class, 'recall'])->name('po.recall');
    Route::get('/po-control', [POController::class, 'updateControlNo'])->name('po.update-controlno');
    Route::get('/po-mass-print', [POController::class, 'massPrint'])->name('po.mass-print');

    Route::get('/gr', [GRController::class, 'index'])->name('gr.index');
    Route::get('/gr-create', [GRController::class, 'create'])->name('gr.create');
    Route::get('/gr-show/{grnumber}', [GRController::class, 'show'])->name('gr.show');
    Route::get('/gr-edit/{grnumber}', [GRController::class, 'edit'])->name('gr.edit');
    Route::patch('/gr-cancel/{id}', [GRController::class, 'cancel'])->name('gr.cancel');
    Route::get('/gr-print/{id}', [GRController::class, 'printGr'])->name('gr.print');
    Route::post('/gr-store', [GRController::class, 'store'])->name('gr.store');

    Route::delete('/attachment/{attachment}', [AttachmentController::class, 'destroy'])->name('attachment.delete');

    Route::get('/net-price', [MaterialNetPriceController::class, 'index'])->name('net_price.index');
    Route::post('/net-price-store', [MaterialNetPriceController::class, 'store'])->name('net_price.store');
    Route::patch('/net-price-update/{materialNetPrice}', [MaterialNetPriceController::class, 'update'])->name('net_price.update');

    Route::get('/val-price', [MaterialValuationController::class, 'index'])->name('val_price.index');
    Route::post('/val-price-store', [MaterialValuationController::class, 'store'])->name('val_price.store');
    Route::patch('/val-price-update/{materialValuation}', [MaterialValuationController::class, 'update'])->name('val_price.update');
    Route::post('/val-price-import', [MaterialValuationController::class, 'import'])->name('val_price.import');
    Route::get('/val-price-download-error', [MaterialValuationController::class, 'export'])->name('val_price.download.error');

    // Route::middleware(['can:'.PermissionsEnum::Admin->value])->group(function () {
    Route::get('/vendors', [VendorController::class, 'index'])->name('vendor.index');
    Route::post('/vendor-store', [VendorController::class, 'store'])->name('vendor.store');
    Route::patch('/vendor-update/{vendor}', [VendorController::class, 'update'])->name('vendor.update');
    Route::post('/vendor-import', [VendorController::class, 'import'])->name('vendor.import');
    // });

    Route::get('/approver', [ApproverController::class, 'index'])->name('approver.index');
    Route::post('/approver-store', [ApproverController::class, 'store'])->name('approver.store');
    Route::patch('/approver-update/{approver}', [ApproverController::class, 'update'])->name('approver.update');

    Route::resource('material', MaterialController::class)->only(['index', 'store', 'update']);
    Route::post('/material-import', [MaterialController::class, 'import'])->name('material.import');

    Route::resource('altuom', AlternativeUomController::class)->only(['index', 'store', 'update']);
    Route::post('/altuom-import', [AlternativeUomController::class, 'import'])->name('altuom.import');

    Route::resource('user', UserController::class)->only(['index', 'store', 'update']);

    Route::resource('purchgrp', PurchasingGroupController::class)->only(['index', 'store', 'update']);
     Route::resource('prctrlgrp', PrctrlGrpController::class)->only(['index', 'store', 'update']);
   
    Route::get('/report-pr', [ReportController::class, 'prReport'])->name('report.pr');
    Route::get('/report-pr-download', [ReportController::class, 'downloadPrReport'])->name('download.report.pr');
    Route::get('/report-po', [ReportController::class, 'poReport'])->name('report.po');
    Route::get('/report-po-download', [ReportController::class, 'downloadPoReport'])->name('download.report.po');
    Route::get('/report-gr', [ReportController::class, 'grReport'])->name('report.gr');
    Route::get('/report-gr-download', [ReportController::class, 'downloadGrReport'])->name('download.report.gr');
    Route::get('/report-material', [ReportController::class, 'materialReport'])->name('report.material');
    Route::get('/report-material-download', [ReportController::class, 'downloadMaterialReport'])->name('download.report.material');

    Route::get('/report-pohistory', [ReportController::class, 'poHistoryReport'])->name('report.pohistory');
    Route::get('/report-pohistory-download', [ReportController::class, 'downloadPoHistoryReport'])->name('download.report.pohistory');
});

require __DIR__.'/auth.php';