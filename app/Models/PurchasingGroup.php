<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchasingGroup extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = [
        'mat_code',
        'plant',
        'purch_grp',
        'unit_issue',
        'plan_deliv_time',
        'gr_proc_time',
        'min_lot_size',
        'max_lot_size',
        'fix_lot_size',
        'rounding_value',
    ];
}
