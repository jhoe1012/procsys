<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PoHeader extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = [
        'control_no',
        'vendor_id',
        'created_name',
        'doc_date',
        'plant',
        'header_text',
        'approver_text',
        'total_po_value',
        'status',
        'appr_seq',
        'deliv_addr',
        'deliv_date',
        'notes',
        'is_mother_po',
    ];

    protected function casts(): array
    {
        return [
            'doc_date'       => 'datetime',
            'deliv_date'     => 'datetime',
            'total_po_value' => 'float',
            'created_at'     => 'datetime',
            'updated_at'     => 'datetime',
        ];
    }

    public function plants(): HasOne
    {
        return $this->hasOne(Plant::class, 'plant', 'plant');
    }

    public function vendors(): HasOne
    {
        return $this->hasOne(Vendor::class, 'supplier', 'vendor_id');
    }

    public function pomaterials(): HasMany
    {
        // return $this->hasMany(PoMaterial::class, 'po_header_id', 'id');
        return $this->hasMany(PoMaterial::class)->orderBy('item_no', 'asc');
    }

    public function workflows(): HasMany
    {
        return $this->hasMany(ApproveStatus::class, 'po_number', 'po_number')
            ->oldest('approved_date')
            ->orderBy('seq');
    }

    public function attachments(): HasMany
    {
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
    
    public function scopeApproval(Builder $query, $userPlants , $userId , $isApprover): Builder
    {
        $query->where('status' , 'ilike', '%approval%')
            ->whereIn('plant', $userPlants);

            if($isApprover){
                $query->whereHas('workflows', function ($q) use ($userId) {
                    $q->where('user_id', $userId);
                });
            }else{
                 $query->where('created_by', $userId);
            }
         return $query;
    }

    protected static function booted()
    {
        parent::boot();
                              
        static::creating(function ($model) {
            $model->po_number = Series::where('title', Series::PO)
                ->where('plant', $model->plant)
                ->max('current_value') + 1;
            Series::where('title', Series::PO)
                ->where('plant', $model->plant)
                ->increment('current_value');
        });
    }
}
