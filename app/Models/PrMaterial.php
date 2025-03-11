<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PrMaterial extends Model
{
    use CreatedUpdatedBy, HasFactory;

    const FLAG_DELETE = 'X';

    const FLAG_CLOSE = 'C';

    protected $fillable = [
        'status',
        'item_no',
        'mat_code',
        'short_text',
        'item_text',
        'qty',
        'ord_unit',
        'qty_ordered',
        'qty_open',
        'price',
        'per_unit',
        'unit',
        'total_value',
        'currency',
        'del_date',
        'mat_grp',
        'purch_grp',
        'conversion',
        'converted_qty',
        'valuation_price',
        'prctrl_grp_id',
    ];

    protected function casts(): array
    {
        return [
            'qty'             => 'float',
            'qty_ordered'     => 'float',
            'qty_open'        => 'float',
            'price'           => 'float',
            'per_unit'        => 'integer',
            'total_value'     => 'float',
            'del_date'        => 'datetime',
            'conversion'      => 'float',
            'converted_qty'   => 'float',
            'valuation_price' => 'float',
        ];
    }

    public function prheader(): BelongsTo
    {
        return $this->belongsTo(PrHeader::class, 'pr_headers_id', 'id');
    }

    public function pomaterials(): HasMany
    {
        return $this->hasMany(PoMaterial::class, 'po_material_id', 'id');
    }

    public function materialNetPrices(): HasMany
    {
        return $this->hasMany(MaterialNetPrice::class, 'mat_code', 'mat_code');
    }

    public function altUoms(): HasMany
    {
        return $this->hasMany(AlternativeUom::class, 'mat_code', 'mat_code');
    }

    public function materialGroups(): HasOne
    {
        return $this->hasOne(MaterialGroup::class, 'mat_grp_code', 'mat_grp');
    }
}
