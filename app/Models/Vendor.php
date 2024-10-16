<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vendor extends Model
{
    use HasFactory;

    public function poheader(): BelongsTo
    {
        return $this->belongsTo(PoHeader::class, 'vendor_id', 'supplier');
    }
}
