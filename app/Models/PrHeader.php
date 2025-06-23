<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PrHeader extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = [
        'created_name',
        'doc_date',
        'requested_by',
        'plant',
        'reason_pr',
        'header_text',
        'total_pr_value',
        'status',
        'appr_seq',
        'deliv_addr',
        'seq',
        'prctrl_grp_id',
    ];

    protected function casts(): array
    {
        return [
            'doc_date'       => 'date',
            'release_date'   => 'date',
            'total_pr_value' => 'float',
            'created_at'     => 'datetime',
            'updated_at'     => 'datetime',
        ];
    }

    public function prmaterials(): HasMany
    {
        return $this->hasMany(PrMaterial::class, 'pr_headers_id', 'id')->orderBy('item_no');
    }

    public function workflows(): HasMany
    {
        return $this->hasMany(ApproveStatus::class, 'pr_number', 'pr_number')
            ->oldest('approved_date')
            ->orderBy('seq');
    }

    public function plants(): HasOne
    {
        return $this->hasOne(Plant::class, 'plant', 'plant');
    }

    public function attachments(): HasMany
    {
        // return $this->hasMany(Attachment::class, 'pr_header_id', 'id');
        return $this->hasMany(Attachment::class);
    }

    public function createdBy(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'created_by');
    }

    public function scopeApproved(Builder $query, $userPlants, $userId , $isApprover): Builder
    {
        $query->where('status', 'Approved')
            ->whereIn('plant', $userPlants);

        if ($isApprover) {
            $query->whereHas('workflows', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            });
        }else{
            $query->where('created_by', $userId);
        }
        
        return $query;
    }
    public function scopeCancelled(Builder $query, $userPlants , $userId): Builder
    {
        return $query->where('status', 'Cancelled')
            ->whereIn('plant', $userPlants)
            ->whereHas('workflows', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            });
    }

    public function scopeApproval(Builder $query, $userPlants , $userId): Builder
    {
        $query->where('status', 'ilike', '%approval%')
            ->where('created_by', $userId)
            ->whereIn('plant', $userPlants);

        return $query;
    }

    protected static function booted()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->pr_number = Series::where('title', Series::PR)
                ->where('plant', $model->plant)
                ->max('current_value') + 1;
            Series::where('title', Series::PR)
                ->where('plant', $model->plant)
                ->increment('current_value');
        });
    }
}
