<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class MaterialReportExport implements FromArray, WithHeadings
{
    public function __construct(private array $data) {}

    /**
     * @return \Illuminate\Support\Collection
     */
    public function array(): array
    {
        return $this->data;
    }

    public function headings(): array
    {
        return [
            'Material',
            'Material Description',
            'Base UOM',
            'Order UOM',
            'Alt. Uom',
            'Counter',
            'Denominator',
            'EAN No',
            'EAN UPC',
            'EAN Category',
            'Unit of Weight',
        ];
    }
}
