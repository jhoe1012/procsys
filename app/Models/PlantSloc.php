<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlantSloc extends Model
{
    /** @use HasFactory<\Database\Factories\PlantSlocFactory> */
    use HasFactory;

    public function scopeBlocked(Builder $query)
    {
        return $query->where('is_sloc_blocked', true);
    }

    public function scopePlantSloc(Builder $query, string $plant, string $sloc): Builder
    {
        return $query->where(['plant' => $plant, 'sloc' => $sloc]);
    }
}
