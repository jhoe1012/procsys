<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PRMaterialsResource extends JsonResource
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
            'pr_headers_id'     => $this->pr_headers_id,
            'status'            => $this->status,
            'item_no'           => $this->item_no,
            'mat_code'          => $this->mat_code,
            'short_text'        => $this->short_text,
            'item_text'         => $this->item_text,
            'qty'               => $this->qty,
            'ord_unit'          => $this->ord_unit,
            'qty_ordered'       => $this->qty_ordered,
            'qty_open'          => $this->qty_open,
            'price'             => $this->price,
            'per_unit'          => $this->per_unit,
            'unit'              => $this->unit,
            'total_value'       => $this->total_value,
            'currency'          => $this->currency,
            'del_date'          => $this->del_date->format('Y-m-d'),
            'mat_grp'           => $this->mat_grp,
            'purch_grp'         => $this->purch_grp,
            'conversion'        => $this->conversion,
            'converted_qty'     => $this->converted_qty,
            'valuation_price'   => $this->valuation_price,
            'created_by'        => $this->created_by,
            'updated_by'        => $this->updated_by,
            'created_at'        => $this->created_at->format('Y-m-d H:m:i'),
            'updated_at'        => $this->updated_at->format('Y-m-d H:m:i'),
            'prctrl_grp_id'     => $this->prctrl_grp_id,
            'requested_by'      => $this->whenLoaded('prheader', fn () => $this->prheader->requested_by),
            'pr_number'         => $this->whenLoaded('prheader', fn () => (string) $this->prheader->pr_number),
            'materialNetPrices' => MaterialNetPriceResource::collection($this->whenLoaded('materialNetPrices')),
            'alt_uom'           => AlternativeUomResource::collection($this->whenLoaded('altUoms')),
            'materialGroups'    => new MaterialGroupResource($this->whenLoaded('materialGroups')),
            '',
        ];
    }
}
