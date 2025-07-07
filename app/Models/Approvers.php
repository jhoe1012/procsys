<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Approvers extends Model
{
    use CreatedUpdatedBy, HasFactory;

    const TYPE_PR = 'pr';

    const TYPE_PO = 'po';

    protected $fillable = [
        'type',
        'plant',
        'user_id',
        'amount_from',
        'amount_to',
        'desc',
        'seq',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plants(): BelongsTo
    {
        return $this->belongsTo(Plant::class, 'plant', 'plant');
    }

    public function prCtrlGrp(): BelongsTo
    {
        return $this->belongsTo(PrctrlGrp::class, 'prctrl_grp_id', 'id');
    }
}
