<?php

namespace App\Services;

use App\Exceptions\NotEnoughPermissionException;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;

// @deprecated version
class CoreService
{
    public function registerGatePermissions(): void
    {
        /**
         * We'll define gate by using all available permissions.
         * Those will be cached to avoid unecessary db calls when testing
         * wether the user has the permission or not.
         */

        // Permission::get()->each(function ($permission) {
        //     if (! Gate::has($permission->namespace)) {
        //         Gate::define($permission->namespace, function (User $user) use ($permission) {
        //             $permissions = Cache::remember('all-permissions-' . $user->id, 3600, function () use ($user) {
        //                 return  $user->roles()
        //                     ->with('permissions')
        //                     ->get()
        //                     ->map(fn($role) => $role->permissions->map(fn($permission) => $permission->namespace))
        //                     ->flatten();
        //             })->toArray();
        //             return in_array($permission->namespace, $permissions);
        //         });
        //     }
        // });
    }

    public function restrict($permissions, $message = ''): void
    {
        // if (is_array($permissions)) {
        //     $passed = collect($permissions)->filter(function ($permission) {
        //         if (is_bool($permission)) {
        //             return $permission;
        //         } else {
        //             return $this->allowedTo($permission);
        //         }
        //     })->count() === count($permissions);
        // } elseif (is_string($permissions)) {
        //     $passed = $this->allowedTo($permissions);
        // } elseif (is_bool($permissions)) {
        //     $passed = $permissions;
        // }

        // if (! $passed) {
        //     throw new NotEnoughPermissionException(
        //         $message ?:
        //             sprintf(
        //                 __('You do not have enough permissions to perform this action.') . '<br>' . __('Required permissions: %s'),
        //                 is_string($permissions) ? $permissions : join(', ', $permissions)
        //             )
        //     );
        // }
    }

    public function allowedTo(array|string $permissions): bool
    {
        // if (is_array($permissions)) {
        //     return Gate::any($permissions);
        // }
        // return Gate::allows($permissions);
    }
}
