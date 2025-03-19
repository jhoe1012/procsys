<?php

use App\Models\Roles;

$requestor              = Roles::firstOrNew(['namespace' => 'po-requestor']);
$requestor->name        = __('PO Requestor');
$requestor->namespace   = 'po-requestor';
$requestor->description = __('Has control in PO Creation');
$requestor->save();
$requestor->addPermissions([
    'create.po',
    'edit.po',
    'update.po',
    'delete.po',
    'read.po',
]);

$approver              = Roles::firstOrNew(['namespace' => 'po-approver']);
$approver->name        = __('PO Approver');
$approver->namespace   = 'po-approver';
$approver->description = __('Can approved PO');
$approver->save();
$approver->addPermissions([
    'approve.po',
    'read.po',
]);
