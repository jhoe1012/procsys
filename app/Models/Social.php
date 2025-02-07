<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Social extends Model
{
    /** @use HasFactory<\Database\Factories\SocialFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'provider',
        'provider_id',
        'provider_token',
        'provider_refresh_token',
    ];

    /**
     * Get the user that owns the Social
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
