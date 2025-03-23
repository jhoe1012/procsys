<?php

use App\Models\Permission;

$pr              = Permission::firstOrNew(['namespace' => 'create.pr']);
$pr->name        = __('Create PR');
$pr->namespace   = 'create.pr';
$pr->description = __('Let the user create PR');
$pr->save();

$pr              = Permission::firstOrNew(['namespace' => 'edit.pr']);
$pr->name        = __('Edit PR');
$pr->namespace   = 'edit.pr';
$pr->description = __('Let the user edit PR');
$pr->save();

$pr              = Permission::firstOrNew(['namespace' => 'update.pr']);
$pr->name        = __('Update PR');
$pr->namespace   = 'update.pr';
$pr->description = __('Let the user update PR');
$pr->save();

$pr              = Permission::firstOrNew(['namespace' => 'delete.pr']);
$pr->name        = __('Delete PR');
$pr->namespace   = 'delete.pr';
$pr->description = __('Let the user delete PR');
$pr->save();

$pr              = Permission::firstOrNew(['namespace' => 'read.pr']);
$pr->name        = __('Read PR');
$pr->namespace   = 'read.pr';
$pr->description = __('Let the user read PR');
$pr->save();

$pr              = Permission::firstOrNew(['namespace' => 'approve.pr']);
$pr->name        = __('Approve PR');
$pr->namespace   = 'approve.pr';
$pr->description = __('Let the user approve PR');
$pr->save();
