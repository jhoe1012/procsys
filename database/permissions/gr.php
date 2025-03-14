<?php

use App\Models\Permission;

$po              = Permission::firstOrNew(['namespace' => 'create.gr']);
$po->name        = __('Create GR');
$po->namespace   = 'create.gr';
$po->description = __('Let the user create GR');
$po->save();

$po              = Permission::firstOrNew(['namespace' => 'edit.gr']);
$po->name        = __('Edit GR');
$po->namespace   = 'edit.gr';
$po->description = __('Let the user edit GR');
$po->save();

$po              = Permission::firstOrNew(['namespace' => 'update.gr']);
$po->name        = __('Update GR');
$po->namespace   = 'update.gr';
$po->description = __('Let the user update GR');
$po->save();

$po              = Permission::firstOrNew(['namespace' => 'delete.gr']);
$po->name        = __('Delete GR');
$po->namespace   = 'delete.gr';
$po->description = __('Let the user delete GR');
$po->save();

$po              = Permission::firstOrNew(['namespace' => 'read.gr']);
$po->name        = __('Read GR');
$po->namespace   = 'read.gr';
$po->description = __('Let the user read GR');
$po->save();

$po              = Permission::firstOrNew(['namespace' => 'approve.gr']);
$po->name        = __('Approve GR');
$po->namespace   = 'approve.gr';
$po->description = __('Let the user approve GR');
$po->save();

$po              = Permission::firstOrNew(['namespace' => 'cancel.gr']);
$po->name        = __('Cancel GR');
$po->namespace   = 'cancel.gr';
$po->description = __('Let the user cancel GR');
$po->save();
