<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name'               => $this->name,
            'email'              => $this->email,
            'position'           => $this->position,
            'created_at'         => $this->created_at,
            'updated_at'         => $this->updated_at,
            'roles'              => RoleResource::collection($this->whenLoaded('roles')),
            'plants'             => PlantResource::collection($this->whenLoaded('plants')),
            'delivery_addresses' => DeliveryAddressResource::collection($this->whenLoaded('deliveryAddress')),
            'prCtrlGrps'         => PrControllerGroupResource::collection($this->whenLoaded('prCtrlGrp')),
        ];
    }
}
