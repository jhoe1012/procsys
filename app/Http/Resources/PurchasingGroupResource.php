<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchasingGroupResource extends JsonResource
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
            'purch_grp'       => $this->purch_grp,
            'unit_issue'      => $this->unit_issue,
            'plan_deliv_time' => $this->plan_deliv_time,
            'gr_proc_time'    => $this->gr_proc_time, 
            'min_lot_size'    => $this->min_lot_size,
            'max_lot_size'    => $this->max_lot_size,
            'fix_lot_size'    => $this->fix_lot_size,
            'rounding_value'  => $this->rounding_value,
            'prctrl_grp_id'   => $this->prctrl_grp_id,
            'created_by'      => new UserResource($this->whenLoaded('createdBy')),
            'updated_by'      => new UserResource($this->whenLoaded('updatedBy')),
            'created_at'      => $this->created_at,
            'updated_at'      => $this->updated_at,
            'prCtrlGrp'       => new PrControllerGroupResource($this->whenLoaded('prCtrlGrp')),
            'materials'     => new MaterialResource($this->whenLoaded('materials')),
            'plants'        => new PlantResource($this->whenLoaded('plants')),

        ];
    }
}
