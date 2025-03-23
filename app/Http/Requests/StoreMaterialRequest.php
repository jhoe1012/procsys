<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaterialRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'mat_code'           => 'required',
            'mat_desc'           => 'required',
            'mat_grp_code'       => 'required',
            'mat_type'           => 'required',
            'base_uom'           => 'required',
            'min_rem_shelf_life' => 'nullable',
            'old_mat_code'       => 'nullable',
            'order_uom'          => 'nullable',
            'total_shelf_life'   => 'nullable',
        ];
    }
}
