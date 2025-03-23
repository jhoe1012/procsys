<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserRoleRelation;

class UserService
{
    public function setUserRole(User $user, $roles)
    {
        UserRoleRelation::where('user_id', $user->id)->delete();

        $roles = collect($roles)->unique()->toArray();

        foreach ($roles as $roleId) {
            $relation          = new UserRoleRelation;
            $relation->user_id = $user->id;
            $relation->role_id = $roleId;
            $relation->save();
        }
    }
}
