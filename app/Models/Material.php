<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Material extends Model
{
    use CreatedUpdatedBy, HasFactory;

    public function valuations(): HasMany
    {
        return $this->hasMany(MaterialValuation::class, 'mat_code', 'mat_code');
    }

    public function purchasingGroups(): HasMany
    {
        return $this->hasMany(PurchasingGroup::class, 'mat_code', 'mat_code');
    }

    public function materialGroups(): HasMany
    {
        return $this->hasMany(MaterialGroup::class, 'mat_grp_code', 'mat_grp_code');
    }

    public function altUoms(): HasMany
    {
        return $this->hasMany(AlternativeUom::class,  'mat_code', 'mat_code');
    }
}
