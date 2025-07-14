<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VendorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'supplier'      => $this->supplier,
            'account_group' => $this->account_group,
            'tax_number'    => $this->tax_number,
            'tax_number_2'  => $this->tax_number_2,
            'name_1'        => $this->name_1,
            'name_2'        => $this->name_2,
            'name_3'        => $this->name_3,
            'name_4'        => $this->name_4,
            'search_term'   => $this->search_term,
            'city'          => $this->city,
            'country'       => $this->country,
            'district'      => $this->district,
            'postal_code'   => $this->postal_code,
            'street'        => $this->street,
            'address'       => $this->address,
            'city_2'        => $this->city_2,
            'telephone_1'   => $this->telephone_1,
            // 'telephone_2'   => $this->telephone_2,
            'vat_reg_no'    => $this->vat_reg_no,
            'email_1'       => $this->email_1,
            // 'email_2'       => $this->email_2,
            'payment_terms' => $this->payment_terms,
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
        ];
    }
}
