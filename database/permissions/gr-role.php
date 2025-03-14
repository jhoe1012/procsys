<?php

use App\Models\Roles;

$requestor              = Roles::firstOrNew(['namespace' => 'gr-creator']);
$requestor->name        = __('GR Creator');
$requestor->namespace   = 'gr-creator';
$requestor->description = __('Has control in GR Creation');
$requestor->save();
$requestor->addPermissions([
    'create.gr',
    'read.gr',
]);

$approver              = Roles::firstOrNew(['namespace' => 'gr-manager']);
$approver->name        = __('GR Manager');
$approver->namespace   = 'gr-manager';
$approver->description = __('Can Cancel a GR');
$approver->save();
$approver->addPermissions([
    'cancel.gr',
    'read.gr',
]);
