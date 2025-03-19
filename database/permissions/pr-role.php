<?php

use App\Models\Roles;

$requestor              = Roles::firstOrNew(['namespace' => 'pr-requestor']);
$requestor->name        = __('PR Requestor');
$requestor->namespace   = 'pr-requestor';
$requestor->description = __('Has control in PR Creation');
$requestor->save();
$requestor->addPermissions([
    'create.pr',
    'edit.pr',
    'update.pr',
    'delete.pr',
    'read.pr',
]);

$approver              = Roles::firstOrNew(['namespace' => 'pr-approver']);
$approver->name        = __('PR Approver');
$approver->namespace   = 'pr-approver';
$approver->description = __('Can approved PR');
$approver->save();
$approver->addPermissions([
    'approve.pr',
    'read.pr',
]);
