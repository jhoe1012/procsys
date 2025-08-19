<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class ChgDetails extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = [
        'id',
        'data_type',
        'data_refno',
        'data_table',
        'data_field',
        'data_chgno',
        'data_chgtyp',
        'data_oldvalue',
        'data_newvalue',
        'short_text',
    ];

    public function chgheader(): BelongsTo
    {
        return $this->belongsTo(
            ChgHeader::class,
            'data_chgno',    
            'data_chgno'
        );
    }
}
