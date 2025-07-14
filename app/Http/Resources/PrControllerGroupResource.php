<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrControllerGroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'plant_id'    => $this->plant_id,
            'prctrl_grp'  => $this->prctrl_grp,
            'prctrl_desc' => $this->prctrl_desc,
            'created_by'  => $this->created_by,
            'updated_by'  => $this->updated_by,
            'plant'       => $this->plant,
        ];
    }
}
