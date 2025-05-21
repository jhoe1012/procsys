<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PRHeaderResource extends JsonResource
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
            'id'             => $this->id,
            'pr_number'      => $this->pr_number,
            'created_name'   => $this->created_name,
            'doc_date'       => $this->doc_date->format('Y-m-d'),
            'requested_by'   => $this->requested_by,
            'plant'          => $this->plant,
            'reason_pr'      => $this->reason_pr,
            'header_text'    => $this->header_text,
            'total_pr_value' => $this->total_pr_value,
            'status'         => $this->status,
            'deliv_addr'     => $this->deliv_addr,
            'appr_seq'       => $this->appr_seq,
            'created_by'     => $this->created_by,
            'updated_by'     => $this->updated_by,
            'prctrl_grp_id'  => $this->prctrl_grp_id,
            'created_at'     => $this->created_at->format('Y-m-d H:m:i'),
            'updated_at'     => $this->updated_at->format('Y-m-d H:m:i'),
            'plants'         => new PlantResource($this->whenLoaded('plants')),
            'workflows'      => ApproveStatusResource::collection($this->whenLoaded('workflows')),
            'prmaterials'    => PRMaterialsResource::collection($this->whenLoaded('prmaterials')),
            'attachments'    => AttachmentResource::collection($this->whenLoaded('attachments')),
        ];
    }
}
