<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ApproveStatus extends Model
{
    use HasFactory;

    const SAVED = 'saved';

    const DRAFT = 'Draft';

    const SUBMITTED = 'submitted';

    const APPROVED = 'Approved';

    const REWORKED = 'Rework';

    const REJECTED = 'Rejected';

    const CANCELLED = 'Cancelled';

    protected $fillable = [
        'pr_number',
        'po_number',
        'position',
        'status',
        'approved_by',
        'user_id',
        'approved_date',
        'seq',
    ];

    protected function casts(): array
    {
        return [
            'approved_date' => 'datetime',
        ];
    }

    public function prheader(): BelongsTo
    {
        return $this->belongsTo(PrHeader::class, 'pr_number', 'pr_number');
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
