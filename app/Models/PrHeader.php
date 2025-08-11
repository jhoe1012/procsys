<?php

namespace App\Models;

use App\Enum\PermissionsEnum;
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

    public function scopeUserPrCtrlGrp(Builder $query, array $prctrl_grp_ids): Builder
    {
        return $query->whereIn('prctrl_grp_id', $prctrl_grp_ids);
    }

    public function scopeUserPlants(Builder $query, array $userPlants): Builder
    {
        return $query->whereIn('plant', $userPlants);
    }

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'Approved');
    }

    public function scopeCancelled(Builder $query): Builder
    {
        return $query->where('status', 'Cancelled');
    }

    public function scopeApproval(Builder $query): Builder
    {
        return $query->where('status', 'ilike', '%Approval%');
    }

    public function scopeWithApprovalAccess(Builder $query, User $user, bool $getApprove = false): Builder
    {
        if ($user->can(PermissionsEnum::ApproverPR)) {
            $approvers = $user->approvers()
                ->where('type', 'pr')
                ->orderBy('seq')
                ->get();

            if ($approvers->isNotEmpty()) {
                $combinations = $approvers->map(function ($item) {
                    return "('{$item->plant}',{$item->seq},{$item->prctrl_grp_id})";
                })->join(',');

                $query->where(function ($q) use ($combinations, $getApprove) {
                    $q->whereRaw("(plant, appr_seq, prctrl_grp_id) IN ({$combinations})")
                        // Add condition to filter approved and cancelled statuses for PR list, and show only pending approvals in the dashboard.
                        ->when(
                            $getApprove,
                            fn ($q) => $q->orWhere('status', ApproveStatus::APPROVED)
                                ->orWhere('status', ApproveStatus::CANCELLED)
                        );
                });
            }
        }

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
