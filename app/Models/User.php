<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
            'password'          => 'hashed',
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

    /**
     * Get all of the socials for the User
     */
    public function socials(): HasMany
    {
        return $this->hasMany(Social::class);
    }

    public function prCtrlGrp(): BelongsToMany
    {
        return $this->belongsToMany(PrctrlGrp::class);
    }

    public function deliveryAddress(): BelongsToMany
    {
        return $this->belongsToMany(DeliveryAddress::class);
    }
}
