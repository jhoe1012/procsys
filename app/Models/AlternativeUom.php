<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AlternativeUom extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = [
        'mat_code',
        'alt_uom',
        'counter',
        'denominator',
        'ean_num',
        'ean_upc',
        'ean_category',
        'unit_of_weight',
    ];

    /**
     * Get the material associated with the AlternativeUom
     */
    public function material(): HasOne
    {
        return $this->hasOne(Material::class, 'mat_code', 'mat_code');
    }

    /**
     * Get the uom associated with the AlternativeUom
     */
    public function altUomText(): HasOne
    {
        return $this->hasOne(Uom::class, 'uom', 'alt_uom');
    }

    /**
     * Get the unitOfWeight associated with the AlternativeUom
     */
    public function unitOfWeightText(): HasOne
    {
        return $this->hasOne(Uom::class, 'uom', 'unit_of_weight');
    }

    /**
     * Get the createdBy associated with the AlternativeUom
     */
    public function createdBy(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'created_by');
    }

    /**
     * Get the updatedBy associated with the AlternativeUom
     */
    public function updatedBy(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'updated_by');
    }
}
