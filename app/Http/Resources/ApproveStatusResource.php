<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApproveStatusResource extends JsonResource
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
            'pr_number'     => $this->pr_number,
            'status'        => $this->status,
            'approved_by'   => $this->approved_by,
            'position'      => $this->position,
            'user_id'       => $this->user_id,
            'approved_date' => $this->approved_date ? $this->approved_date->toDayDateTimeString() : '',
            'seq'           => $this->seq,
            'message'       => $this->message,
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
        ];
    }
}
