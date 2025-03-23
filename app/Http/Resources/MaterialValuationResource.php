<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterialValuationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'mat_code'        => $this->mat_code,
            'plant'           => $this->plant,
            'currency'        => $this->currency,
            'valuation_price' => $this->valuation_price,
            'per_unit'        => $this->per_unit,
            'valid_from'      => $this->valid_from,
            'valid_to'        => $this->valid_to,
            'created_by'      => $this->created_by,
            'updated_by'      => $this->updated_by,
            'created_at'      => $this->created_at,
            'updated_at'      => $this->updated_at,
            'material'        => new MaterialResource($this->whenLoaded('material')),
            'plants'          => new PlantResource($this->whenLoaded('plants')),
        ];
    }
}
