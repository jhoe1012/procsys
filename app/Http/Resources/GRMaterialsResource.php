<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GRMaterialsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'gr_header_id'   => $this->gr_header_id,
            'po_material_id' => $this->po_material_id,
            'item_no'        => $this->item_no,
            'mat_code'       => $this->mat_code,
            'short_text'     => $this->short_text,
            'item_text'      => $this->item_text,
            'gr_qty'         => $this->gr_qty,
            'unit'           => $this->unit,
            'po_deliv_date'  => $this->po_deliv_date,
            'batch'          => $this->batch,
            'mfg_date'       => $this->mfg_date,
            'sled_bbd'       => $this->sled_bbd,
            'po_number'      => $this->po_number,
            'po_item'        => $this->po_item,
            'dci'            => $this->dci,
            'is_cancel'      => $this->is_cancel,
            'created_by'     => $this->created_by,
            'updated_by'     => $this->updated_by,
            'created_at'     => $this->created_at,
            'updated_at'     => $this->updated_at,
        ];
    }
}
