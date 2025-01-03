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
}
