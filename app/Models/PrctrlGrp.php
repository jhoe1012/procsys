<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PrctrlGrp extends Model
{
    use HasFactory;

    /**
     * The user that belong to the PrctrlGrp
     */
    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Get all of the purchasingGroup for the PrctrlGrp
     */
    public function purchasingGroup(): HasMany
    {
        return $this->hasMany(PurchasingGroup::class);
    }
}
