<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                 => $this->id,
            'mat_code'           => $this->mat_code,
            'mat_desc'           => $this->mat_desc,
            'old_mat_code'       => $this->old_mat_code,
            'mat_type'           => $this->mat_type,
            'mat_grp_code'       => $this->mat_grp_code,
            'base_uom'           => $this->base_uom,
            'order_uom'          => $this->order_uom,
            'min_rem_shelf_life' => $this->min_rem_shelf_life,
            'total_shelf_life'   => $this->total_shelf_life,
            'created_by'         => new UserResource($this->whenLoaded('createdBy')),
            'updated_by'         => new UserResource($this->whenLoaded('updatedBy')),
            'created_at'         => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at'         => $this->updated_at->format('Y-m-d H:i:s'),
            'valuations'         => MaterialValuationResource::collection($this->whenLoaded('valuations')),
            'materialGroups'     => new MaterialGroupResource($this->whenLoaded('materialGroups')),
            'altUoms'            => AlternativeUomResource::collection($this->whenLoaded('altUoms')),
            'purchasingGroups'   => new PurchasingGroupResource($this->whenLoaded('purchasingGroups')),
            'mappedPlants'       =>  PurchasingGroupResource::collection($this->whenLoaded('purchasingGroupsChecker')),
        ];
    }
}
