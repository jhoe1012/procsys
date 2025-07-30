<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SlocMat extends Model
{
    /** @use HasFactory<\Database\Factories\SlocMatFactory> */
    use HasFactory;

    protected $fillable = [
        'plant',
        'sloc',
        'material',
        'qty_avail',
        'qty_inxfer',
        'qty_blocked',
        'base_uom',
    ];

    public function scopeMaterialInventory(Builder $query, string $plant, string $sloc, string $material): Builder
    {
        return $query->where([
            'plant'    => $plant,
            'sloc'     => $sloc,
            'material' => $material,
        ]);
    }
}
