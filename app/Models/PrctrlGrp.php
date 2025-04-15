<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class PrctrlGrp extends Model
{
    use HasFactory;

    /**
     * The user that belong to the PrctrlGrp
     */
    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Get all of the purchasingGroup for the PrctrlGrp
     */
    public function purchasingGroup(): HasMany
    {
        return $this->hasMany(PurchasingGroup::class);
    }

    public static function getUserPrController(int $id): array
    {
        return self::select('id as value', DB::raw("prctrl_grp|| ' - ' || prctrl_desc  as label"))
            ->whereHas(
                'user',
                fn (Builder $q) => $q->where('user_id', $id)
            )
            ->get()
            ->toArray();
    }
}
