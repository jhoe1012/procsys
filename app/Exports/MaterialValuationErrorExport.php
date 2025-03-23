<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class MaterialValuationErrorExport implements FromArray, WithHeadings
{
    public function __construct(private array $data) {}

    public function array(): array
    {
        return $this->data;
    }

    public function headings(): array
    {
        return [
            'Material',
            'Plant',
            'Currency',
            'Valuation Price',
            'Per Unit',
            'Valid From',
            'Valid To',
            'Remarks',
            'Created At',
        ];
    }
}
