<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProdOrdHdr1Resource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        parent::wrap(null);
        return  [
            'id' => $this->id,
            'order' => $this->order,
            'material' => $this->material,
            'mat_desc' => $this->mat_desc,
            'target_qty_ou' => $this->target_qty_ou,
            'target_uom_ou' => $this->target_uom_ou,
            'target_qty_bu' => $this->target_qty_bu,
            'target_uom_bu' => $this->target_uom_bu,
            'date_created' => $this->date_created,
            'basic_start' => $this->basic_start,
            'basic_finish' => $this->basic_finish,
            'date_released' => $this->date_released,
            'date_started_actual' => $this->date_started_actual,
            'date_finished_actual' => $this->date_finished_actual,
            'production_date' => $this->production_date,
            'delivery_date' => $this->delivery_date,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
