<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterialNetPriceResource extends JsonResource
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
            'vendor'        => $this->vendor,
            'plant'         => $this->plant,
            'mat_code'      => $this->mat_code,
            'currency'      => $this->currency,
            'price'         => $this->price,
            'per_unit'      => $this->per_unit,
            'uom'           => $this->uom,
            'valid_from'    => $this->valid_from,
            'valid_to'      => $this->valid_to,
            'min_order_qty' => $this->min_order_qty,
            'created_by'    => $this->created_by,
            'updated_by'    => $this->updated_by,
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
            'materials'     => new MaterialResource($this->whenLoaded('materials')),
            'plants'        => new PlantResource($this->whenLoaded('plants')),
            'vendors'       => new VendorResource($this->whenLoaded('vendors')),
            'materialUoms'  => AlternativeUomResource::collection($this->whenLoaded('materialUoms')),
        ];
    }
}
