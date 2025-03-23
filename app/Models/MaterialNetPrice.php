<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class MaterialNetPrice extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = [
        'vendor',
        'plant',
        'mat_code',
        'currency',
        'price',
        'per_unit',
        'uom',
        'valid_from',
        'valid_to',
        'min_order_qty',
    ];

    protected function casts(): array
    {
        return [
            'price'         => 'float',
            'per_unit'      => 'float',
            'min_order_qty' => 'float',
        ];
    }

    public function vendors(): HasOne
    {
        return $this->hasOne(Vendor::class, 'supplier', 'vendor');
    }

    public function plants(): HasOne
    {
        return $this->hasOne(Plant::class, 'plant', 'plant');
    }

    public function materials(): HasOne
    {
        return $this->hasOne(Material::class, 'mat_code', 'mat_code');
    }

    public function materialUoms(): HasMany
    {
        return $this->hasMany(AlternativeUom::class, 'mat_code', 'mat_code');
    }
}
