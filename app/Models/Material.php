<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Material extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = [
        'mat_code',
        'mat_desc',
        'mat_grp_code',
        'mat_type',
        'base_uom',
        'min_rem_shelf_life',
        'old_mat_code',
        'order_uom',
        'total_shelf_life',
    ];

    public function valuations(): HasMany
    {
        return $this->hasMany(MaterialValuation::class, 'mat_code', 'mat_code');
    }

    public function purchasingGroups(): HasOne
    {
        return $this->hasOne(PurchasingGroup::class, 'mat_code', 'mat_code');
    }

    public function materialGroups(): HasOne
    {
        return $this->hasOne(MaterialGroup::class, 'mat_grp_code', 'mat_grp_code');
    }

    public function altUoms(): HasMany
    {
        return $this->hasMany(AlternativeUom::class,  'mat_code', 'mat_code');
    }

    public function createdBy(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'created_by');
    }
    public function updatedBy(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'updated_by');
    }
}
