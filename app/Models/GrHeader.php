<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class GrHeader extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = ['po_number',
        'created_name',
        'vendor_id',
        'plant',
        'entry_date',
        'posting_date',
        'actual_date',
        'delivery_note',
        'header_text', ];

    public function grmaterials(): HasMany
    {
        return $this->hasMany(GrMaterial::class)->orderBy('item_no', 'asc');
    }

    public function plants(): HasOne
    {
        return $this->hasOne(Plant::class, 'plant', 'plant');
    }

    public function vendors(): HasOne
    {
        return $this->hasOne(Vendor::class, 'supplier', 'vendor_id');
    }

    protected static function booted()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->gr_number = Series::where('title', Series::GR)
                ->where('plant', $model->plant)
                ->max('current_value') + 1;
            Series::where('title', Series::GR)
                ->where('plant', $model->plant)
                ->increment('current_value');
        });
    }
}
