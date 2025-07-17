<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
        'prtl_grp_id',
    ];

    /**
     * Get the prCtrlGrp that owns the PurchasingGroup
     */
    public function prCtrlGrp(): BelongsTo
    {
        return $this->belongsTo(PrctrlGrp::class, 'prctrl_grp_id', 'id');
    }

    public function plants(): BelongsTo
    {
        return $this->belongsTo(Plant::class, 'plant', 'plant');
    }

    public function materials(): BelongsTo
    {
        return $this->belongsTo(Material::class, 'mat_code', 'mat_code');
    }
}
