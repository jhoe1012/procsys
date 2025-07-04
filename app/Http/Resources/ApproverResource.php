<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApproverResource extends JsonResource
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
            'type'          => $this->type,
            'plant'         => $this->plant,
            'user_id'       => $this->user_id,
            'position'      => $this->position,
            'amount_from'   => $this->amount_from,
            'amount_to'     => $this->amount_to,
            'seq'           => $this->seq,
            'desc'          => $this->desc,
            'created_by'    => $this->created_by,
            'updated_by'    => $this->updated_by,
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
            'prctrl_grp_id' => $this->prctrl_grp_id,
            'plants'        => new PlantResource($this->whenLoaded('plants')),
            'user'          => new UserResource($this->whenLoaded('user')),
            'prCtrlGrps'    => new PrControllerGroupResource($this->whenLoaded('prCtrlGrp')),

        ];
    }
}
