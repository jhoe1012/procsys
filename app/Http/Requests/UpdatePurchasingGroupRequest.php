<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\StorePurchasingGroupRequest;

class UpdatePurchasingGroupRequest extends FormRequest
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
            'mat_code' => 'required',
            'plant' => 'required',
            'purch_grp' => 'required',
            'unit_issue' => 'nullable',
            'plan_deliv_time' => 'nullable',
            'gr_proc_time' => 'nullable',
            'min_lot_size' => 'nullable',
            'max_lot_size' => 'nullable',
            'fix_lot_size' => 'nullable',
            'rounding_value' => 'nullable',
            'prctrl_grp_id' => 'required',
        ];
    }
}
