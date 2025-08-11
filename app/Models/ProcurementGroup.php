<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProcurementGroup extends Model
{
    protected $fillable = ['purch_group', 'name1'];

     public function purchGroup(): BelongsTo
    {
        return $this->belongsTo(PurchasingGroup::class, 'purch_grp', 'purch_grp');
    }
}
