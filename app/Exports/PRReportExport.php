<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PRReportExport implements FromArray, WithHeadings
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
            'PGrp',
            'Purch. Req',
            'PO',
            'Item',
            'Material',
            'Material Description',
            'Item Text',
            'PR Quantity',
            'PR Unit',
            'Open PR Qty',
            'PO Quantity',
            'PO Unit',
            'Request Date',
            'Deliv. Date',
            'Valn Price',
            'Total Value',
            'Crcy',
            'Approved Date',
            'Created By',
            'Requisitioner',
            'Status',
            'Plant',
            'Reason For PR',
        ];
    }
}
