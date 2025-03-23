<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRoleRelation extends Model
{
    use HasFactory;

    public function scopeCombinaison($query, $user, $role)
    {
        return $query->where('user_id', $user->id)
            ->where('role_id', $role->id);
    }
}
