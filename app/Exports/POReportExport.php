<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;


class POReportExport implements FromArray, WithHeadings
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
            'Pur. Doc',
            'GR Doc',
            'Control No',
            'Item',
            'Doc Date',
            'PGr',
            'Supplier',
            'Supplier Name',
            'Material',
            'Short Text',
            'Matl Grp',
            'PO Quantity',
            'PO Unit',
            'Open PO Qty',
            'GR Quantity',
            'GR Unit',
            'Net Price',
            'Total Value',
            'Crcy',
            'Plant',
            'Release Date',
            'Status',
            'Created By',
        ];
    }
}
