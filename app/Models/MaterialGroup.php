<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MaterialGroup extends Model
{
    use CreatedUpdatedBy, HasFactory;

    public function material(): BelongsTo
    {
        return $this->belongsTo(Material::class, 'mat_grp_code', 'mat_grp_code');
    }

    public function scopeSupplies(Builder $query): void
    {
        $query->where('is_supplies', true);
    }
}
