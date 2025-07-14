<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePurchasingGroupRequest extends FormRequest
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
            'unit_issue' => 'required',
            'plan_deliv_time' => 'required',
            'gr_proc_time' => 'required',
            'min_lot_size' => 'required',
            'max_lot_size' => 'required',
            'fix_lot_size' => 'required',
            'rounding_value' => 'required',
            'prctrl_grp_id' => 'required',
        ];
    }
}
