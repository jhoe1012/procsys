<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'plant'        => $this->plant,
            'name1'        => $this->name1,
            'lot_no'       => $this->lot_no,
            'street'       => $this->street,
            'street2'      => $this->street2,
            'district'     => $this->district,
            'postal_code'  => $this->postal_code,
            'city'         => $this->city,
            'country_code' => $this->country_code,
            'created_by'   => $this->created_by,
            'updated_by'   => $this->updated_by,
        ];
    }
}
