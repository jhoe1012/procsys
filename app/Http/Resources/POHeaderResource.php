<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class POHeaderResource extends JsonResource
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
            'po_number'      => $this->po_number,
            'control_no'     => $this->control_no,
            'vendor_id'      => $this->vendor_id,
            'created_name'   => $this->created_name,
            'doc_date'       => $this->doc_date->format('Y-m-d'),
            'plant'          => $this->plant,
            'header_text'    => $this->header_text,
            'approver_text'  => $this->approver_text,
            'total_po_value' => $this->total_po_value,
            'status'         => $this->status,
            'appr_seq'       => $this->appr_seq,
            'deliv_addr'     => $this->deliv_addr,
            'deliv_date'     => $this->deliv_date ? $this->deliv_date->format('Y-m-d') : null,
            'notes'          => $this->notes,
            'print_count'    => $this->print_count,
            'created_by'     => $this->created_by,
            'updated_by'     => $this->updated_by,
            'created_at'     => $this->created_at->format('Y-m-d H:m:i'),
            'updated_at'     => $this->updated_at->format('Y-m-d H:m:i'),
            'plants'         => new PlantResource($this->whenLoaded('plants')),
            'vendors'        => new VendorResource($this->whenLoaded('vendors')),
            'workflows'      => ApproveStatusResource::collection($this->whenLoaded('workflows')),
            'pomaterials'    => POMaterialsResource::collection($this->whenLoaded('pomaterials')),
            'attachments'    => AttachmentResource::collection($this->whenLoaded('attachments')),
            'is_mother_po'   => $this->is_mother_po,
        ];
    }
}
