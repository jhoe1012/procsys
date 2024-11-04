<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PrHeader extends Model
{
    use HasFactory, CreatedUpdatedBy;

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
    ];

    protected function casts(): array
    {
        return [
            'doc_date' => 'date',
            'release_date' => 'date',
            'total_pr_value' => 'float',
            "created_at" => 'datetime',
            "updated_at" => 'datetime',
        ];
    }

    public function prmaterials(): HasMany
    {
        return $this->hasMany(PrMaterial::class, 'pr_headers_id', 'id')->orderBy('item_no');
    }
    public function workflows(): HasMany
    {
        return $this->hasMany(ApproveStatus::class, 'pr_number', 'pr_number')
            ->oldest('created_at')
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
