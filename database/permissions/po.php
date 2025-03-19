<?php

use App\Models\Permission;

$po              = Permission::firstOrNew(['namespace' => 'create.po']);
$po->name        = __('Create PO');
$po->namespace   = 'create.po';
$po->description = __('Let the user create PO');
$po->save();

$po              = Permission::firstOrNew(['namespace' => 'edit.po']);
$po->name        = __('Edit PO');
$po->namespace   = 'edit.po';
$po->description = __('Let the user edit PO');
$po->save();

$po              = Permission::firstOrNew(['namespace' => 'update.po']);
$po->name        = __('Update PO');
$po->namespace   = 'update.po';
$po->description = __('Let the user update PO');
$po->save();

$po              = Permission::firstOrNew(['namespace' => 'delete.po']);
$po->name        = __('Delete PO');
$po->namespace   = 'delete.po';
$po->description = __('Let the user delete PO');
$po->save();

$po              = Permission::firstOrNew(['namespace' => 'read.po']);
$po->name        = __('Read PO');
$po->namespace   = 'read.po';
$po->description = __('Let the user read PO');
$po->save();

$po              = Permission::firstOrNew(['namespace' => 'approve.po']);
$po->name        = __('Approve PO');
$po->namespace   = 'approve.po';
$po->description = __('Let the user approve PO');
$po->save();
