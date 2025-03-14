<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PoMaterial extends Model
{
    use CreatedUpdatedBy, HasFactory;

    const FLAG_DELETE = 'X';

    const FLAG_DELIVER = 'D';

    protected $fillable = [
        'pr_material_id',
        'status',
        'item_no',
        'mat_code',
        'short_text',
        'po_qty',
        'po_gr_qty',
        'net_price',
        'per_unit',
        'unit',
        'total_value',
        'item_free',
        'currency',
        'del_date',
        'mat_grp',
        'requested_by',
        'pr_number',
        'pr_item',
        'item_text',
        'conversion',
        'denominator',
        'converted_qty',
        'pr_unit',
        'purch_grp',
    ];

    protected function casts(): array
    {
        return [
            'po_qty'        => 'float',
            'po_gr_qty'     => 'float',
            'net_price'     => 'float',
            'per_unit'      => 'integer',
            'total_value'   => 'float',
            'del_date'      => 'datetime',
            'created_at'    => 'datetime',
            'updated_at'    => 'datetime',
            'conversion'    => 'float',
            'denominator'   => 'float',
            'converted_qty' => 'float',
        ];
    }

    public function poheader(): BelongsTo
    {
        return $this->belongsTo(PoHeader::class, 'po_header_id', 'id');
    }

    public function prmaterials(): BelongsTo
    {
        return $this->belongsTo(PrMaterial::class, 'pr_material_id', 'id');
    }

    public function taxClass(): HasOne
    {
        return $this->hasOne(TaxClassification::class, 'mat_code', 'mat_code');
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
