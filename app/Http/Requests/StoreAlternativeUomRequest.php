<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAlternativeUomRequest extends FormRequest
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
            'mat_code'       => 'required',
            'alt_uom'        => 'required',
            'counter'        => 'required',
            'denominator'    => 'required',
            'ean_num'        => 'nullable',
            'ean_upc'        => 'nullable',
            'ean_category'   => 'nullable',
            'unit_of_weight' => 'nullable',
        ];
    }
}
