<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthUserResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'email'       => $this->email,
            'roles'       => $this->getRoleNames(),
            'permissions' => $this->getAllPermissions()->map(fn ($permission) => $permission->name),
            'plants'      => $this->plants->map(fn ($plant) => ['plant' => $plant->plant, 'name1' => $plant->name1]),
            'approvers'   => $this->approvers,
        ];
    }
}
