<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vendor extends Model
{
    use CreatedUpdatedBy, HasFactory;

    protected $fillable = [
        'supplier',
        'account_group',
        'tax_number',
        'tax_number_2',
        'name_1',
        'name_2',
        'name_3',
        'name_4',
        'search_term',
        'city',
        'country',
        'district',
        'postal_code',
        'street',
        'address',
        'city_2',
        'int_loc_1',
        'int_loc_2',
        'auth_group',
        'lang_key',
        'telephone_1',
        'telephone_2',
        'vat_reg_no',
        'email_addr',
        // 'currency',
        // 'payment_terms',
    ];

    public function poheader(): BelongsTo
    {
        return $this->belongsTo(PoHeader::class, 'vendor_id', 'supplier');
    }

    public static function getVendorsChoice(bool $active = false): array
    {
        return self::selectRaw('supplier as value , supplier || \' - \'||name_1 as label')
            ->when($active, function (Builder $query) {
                $query->active();
            })
            ->orderBy('name_1')
            ->get()
            ->toArray();
    }

     public function scopeActive(Builder $query): void
    {
        $query->where('is_active', true);
    }
}
