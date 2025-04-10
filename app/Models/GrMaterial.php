<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GrMaterial extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = [
        'po_material_id',
        'item_no',
        'mat_code',
        'short_text',
        'item_text',
        'gr_qty',
        'unit',
        'po_deliv_date',
        'batch',
        'mfg_date',
        'sled_bbd',
        'po_number',
        'po_item',
        'dci',
    ];

    protected function casts(): array
    {
        return [
            'gr_qty' => 'float',
        ];
    }

    public function grheader(): BelongsTo
    {
        return $this->belongsTo(GrHeader::class);
    }

    public function pomaterials(): BelongsTo
    {
        return $this->belongsTo(PoMaterial::class, 'po_material_id', 'id');
    }
}
