<?php

use App\Models\Roles;

$admin              = Roles::firstOrNew(['namespace' => 'admin']);
$admin->name        = __('Admin');
$admin->namespace   = 'admin';
$admin->description = __('Has control in Admin Maintenance');
$admin->save();
$admin->addPermissions([
    'admin',
]);
