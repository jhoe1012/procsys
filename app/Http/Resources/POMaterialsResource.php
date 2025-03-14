<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class POMaterialsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'po_header_id'      => $this->po_header_id,
            'pr_material_id'    => $this->pr_material_id,
            'status'            => $this->status,
            'item_no'           => $this->item_no,
            'mat_code'          => $this->mat_code,
            'short_text'        => $this->short_text,
            'po_qty'            => $this->po_qty,
            'po_gr_qty'         => $this->po_gr_qty,
            'net_price'         => $this->net_price,
            'per_unit'          => $this->per_unit,
            'unit'              => $this->unit,
            'total_value'       => $this->total_value,
            'item_free'         => $this->item_free,
            'currency'          => $this->currency,
            'del_date'          => $this->del_date->format('Y-m-d'),
            'mat_grp'           => $this->mat_grp,
            'requested_by'      => $this->requested_by,
            'pr_number'         => $this->pr_number,
            'pr_item'           => $this->pr_item,
            'item_text'         => $this->item_text,
            'created_by'        => $this->created_by,
            'updated_by'        => $this->updated_by,
            'conversion'        => $this->conversion,
            'denominator'       => $this->denominator,
            'converted_qty'     => $this->converted_qty,
            'pr_unit'           => $this->pr_unit,
            'created_at'        => $this->created_at->format('Y-m-d H:m:i'),
            'updated_at'        => $this->updated_at->format('Y-m-d H:m:i'),
            'qty_open'          => $this->whenLoaded('prmaterials', fn () => $this->prmaterials->qty_open),
            'materialNetPrices' => MaterialNetPriceResource::collection($this->whenLoaded('materialNetPrices')),
            'alt_uom'           => AlternativeUomResource::collection($this->whenLoaded('altUoms')),
            'materialGroups'    => new MaterialGroupResource($this->whenLoaded('materialGroups')),
        ];
    }
}
