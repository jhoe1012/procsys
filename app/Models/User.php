<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'position',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function plants(): BelongsToMany
    {
        return $this->belongsToMany(Plant::class);
    }

    public function approvers(): HasMany
    {
        return $this->hasMany(Approvers::class);
    }

    public function prHeaderCreatedBy(): BelongsTo
    {
        return $this->belongsTo(PrHeader::class, 'created_by', 'id');
    }

    public function poHeaderCreatedBy(): BelongsTo
    {
        return $this->belongsTo(POHeader::class, 'created_by', 'id');
    }
    // public function roles(): HasManyThrough
    // {
    //     return $this->hasManyThrough(
    //         Roles::class,
    //         UserRoleRelation::class,
    //         'user_id',
    //         'id',
    //         'id',
    //         'role_id'
    //     );
    // }

    // public function assignRole($roleName)
    // {
    //     if ($role = Roles::namespace($roleName)) {
    //         $combinaison = new UserRoleRelation;
    //         $combinaison->user_id = $this->id;
    //         $combinaison->role_id = $role->id;
    //         $combinaison->save();

    //         return [
    //             'status' => 'success',
    //             'message' => __('The role was successfully assigned.'),
    //         ];
    //     }
    //     return [
    //         'status' => 'error',
    //         'message' => __('Unable to identifier the provided role.'),
    //     ];
    // }
}
