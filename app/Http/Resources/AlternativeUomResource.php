<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlternativeUomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'mat_code'         => $this->mat_code,
            'alt_uom'          => $this->alt_uom,
            'counter'          => $this->counter,
            'denominator'      => $this->denominator,
            'ean_num'          => $this->ean_num,
            'ean_upc'          => $this->ean_upc,
            'ean_category'     => $this->ean_category,
            'unit_of_weight'   => $this->unit_of_weight,
            'created_by'       => new UserResource($this->whenLoaded('createdBy')),
            'updated_by'       => new UserResource($this->whenLoaded('updatedBy')),
            'created_at'       => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at'       => $this->updated_at->format('Y-m-d H:i:s'),
            'material'         => new MaterialResource($this->whenLoaded('material')),
            'altUomText'       => new UomResource($this->whenLoaded('altUomText')),
            'unitOfWeightText' => new UomResource($this->whenLoaded('unitOfWeightText')),
        ];
    }
}
