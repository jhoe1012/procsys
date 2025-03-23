<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Plant extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = [];

    protected $guarded = [];

    public function prheader(): BelongsTo
    {
        return $this->belongsTo(PrHeader::class, 'plant', 'plant');
    }

    public function poheader(): BelongsTo
    {
        return $this->belongsTo(PoHeader::class, 'plant', 'plant');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
