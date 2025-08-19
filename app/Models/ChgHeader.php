<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;


class ChgHeader extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = [
        'data_chgno',
        'data_type',
        'data_refno',
        'user_id',
        'timestamp',
        'data_chgtyp',
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function chgDetails(): HasMany
    {
        return $this->hasMany(ChgDetails::class, 'data_chgno', 'data_chgno')->orderBy('id', 'desc');
    }
      
}
