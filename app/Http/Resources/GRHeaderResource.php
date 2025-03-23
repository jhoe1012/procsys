<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GRHeaderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        parent::wrap(null);

        return [
            'id'            => $this->id,
            'gr_number'     => $this->gr_number,
            'po_number'     => $this->po_number,
            'created_name'  => $this->created_name,
            'vendor_id'     => $this->vendor_id,
            'plant'         => $this->plant,
            'entry_date'    => $this->entry_date,
            'posting_date'  => $this->posting_date,
            'actual_date'   => $this->actual_date,
            'delivery_note' => $this->delivery_note,
            'header_text'   => $this->header_text,
            // 'is_cancel' => $this->is_cancel,
            'created_by'  => $this->created_by,
            'updated_by'  => $this->updated_by,
            'created_at'  => $this->created_at,
            'updated_at'  => $this->updated_at,
            'plants'      => new PlantResource($this->whenLoaded('plants')),
            'vendors'     => new VendorResource($this->whenLoaded('vendors')),
            'grmaterials' => GRMaterialsResource::collection($this->whenLoaded('grmaterials')),
        ];
    }
}
