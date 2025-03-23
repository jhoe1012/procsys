<?php

use App\Models\Permission;

$admin              = Permission::firstOrNew(['namespace' => 'admin']);
$admin->name        = __('Admin');
$admin->namespace   = 'admin';
$admin->description = __('Let the user access admin');
$admin->save();
