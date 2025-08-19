<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProdOrdHdr1 extends Model
{
    use CreatedUpdatedBy;
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'target_qty_bu'        => 'float',
            'target_qty_ou'     => 'float',
            'production_date' => 'date',
            'delivery_date' => 'date',

        ];
    }
    protected static function booted()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->order = Series::where('title', Series::PP)
                ->max('current_value') + 1;
            Series::where('title', Series::PP)
                ->increment('current_value');
        });
    }
}
