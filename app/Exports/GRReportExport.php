<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;


class GRReportExport implements FromArray, WithHeadings
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
            'GR Number',
            'PO Number',
            'Created By',
            'Supplier',
            'Supplier Name',
            'Plant',
            'Entry Date',
            'Actual Date',
            'Delivery Date',
            'Header Text',
            'Item No',
            'Material',
            'Short Text',
            'Qty',
            'Unit',
            'Open PO',
            'Batch',
            'MFG Date',
            'SLED / BBD',
            'PO Item No.',
            'Delivery Complete Ind.',
            'Cancel',
            'Cancel Date',
            'Cancel By',
        ];
    }
}
