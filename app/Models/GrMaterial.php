<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class GrMaterial extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = [
        'po_material_id',
        'item_no',
        'mat_code',
        'short_text',
        'item_text',
        'gr_qty',
        'unit',
        'po_deliv_date',
        'batch',
        'mfg_date',
        'sled_bbd',
        'po_number',
        'po_item',
        'dci',
        'base_qty',
        'base_uom',
        'base_amount,',
        'plant',
        'prior_qty',
        'prior_val',
        'sloc',
        'movement_type',
        'gr_number_ref',
        'item_no_ref',
    ];

    protected function casts(): array
    {
        return [
            'gr_qty'   => 'float',
            'base_qty' => 'float',
        ];
    }

    public function grheader(): BelongsTo
    {
        return $this->belongsTo(GrHeader::class);
    }

    public function pomaterials(): BelongsTo
    {
        return $this->belongsTo(PoMaterial::class, 'po_material_id', 'id');
    }

    public function altUoms(): HasMany
    {
        return $this->hasMany(AlternativeUom::class, 'mat_code', 'mat_code');
    }

    public function material(): HasOne
    {
        return $this->hasOne(Material::class, 'mat_code', 'mat_code');
    }

    public function valuations(): HasMany
    {
        return $this->hasMany(MaterialValuation::class, 'mat_code', 'mat_code');
    }

    public function purchasingGroups(): HasOne
    {
        return $this->hasOne(PurchasingGroup::class, 'mat_code', 'mat_code');
    }
}
