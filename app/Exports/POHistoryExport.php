<?php

namespace App\Exports;

use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class POHistoryExport implements FromArray, ShouldAutoSize, WithColumnFormatting, WithHeadings, WithMapping
{
    public function __construct(private array $data) {}

    /**
     * @return \Illuminate\Support\Collection
     */
    public function array(): array
    {
        return $this->data;
    }

    public function map($data): array
    {
        return [
            $data->mat_code,
            $data->short_text,
            $data->item_text,
            $data->pr_number,
            $data->po_number,
            $data->control_no,
            $data->gr_number,
            $data->pr_doc_date ? Date::dateTimeToExcel(Carbon::parse($data->pr_doc_date)) : null,
            $data->pr_item_no,
            $data->pr_header_stat,
            $data->pr_created_name,
            $data->pr_deliv_date ? Date::dateTimeToExcel(Carbon::parse($data->pr_deliv_date)) : null,
            $data->pr_qty,
            $data->pr_qty_open,
            $data->pr_unit,
            $data->pr_mat_stat,
            $data->po_doc_date ? Date::dateTimeToExcel(Carbon::parse($data->po_doc_date)) : null,
            $data->po_item_no,
            $data->po_qty,
            $data->net_price,
            $data->total_net_price,
            $data->po_open_qty,
            $data->po_unit,
            $data->po_mat_stat,
            $data->gr_item_no,
            $data->gr_qty,
            $data->gr_total,
            $data->gr_unit,
            $data->gr_mat_stat,
            $data->dci,
            $data->actual_date ? Date::dateTimeToExcel(Carbon::parse($data->actual_date)) : null,
            $data->mat_grp_desc,
            $data->supplier,
            $data->name_1,
            $data->po_header_stat,
            $data->po_created_name,
            $data->deliv_addr,
            $data->po_deliv_date ? Date::dateTimeToExcel(Carbon::parse($data->po_deliv_date)) : null,
            $data->gr_created_name,
            $data->entry_date ? Date::dateTimeToExcel(Carbon::parse($data->entry_date)) : null,
            $data->delivery_note,
            $data->mfg_date ? Date::dateTimeToExcel(Carbon::parse($data->mfg_date)) : null,
            $data->sled_bbd ? Date::dateTimeToExcel(Carbon::parse($data->sled_bbd)) : null,
            $data->reason_pr,
            $data->po_header_text,
            $data->gr_header_text,
            $data->plant_name,
        ];
    }

    public function columnFormats(): array
    {
        return [
            'H'  => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'L'  => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'Q'  => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'AE' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'AL' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'AN' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'AP' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'AQ' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }

    public function headings(): array
    {
        return [
            'Material',
            'Short Text',
            'Item Text',
            'PR Number',
            'PO Number',
            'Control No.',
            'GR Number',
            'PR Doc Date',
            'PR Item No.',
            'PR Status',
            'PR Created By',
            'PR Deliv. Date',
            'PR Qty',
            'PR Open Qty',
            'PR UOM',
            'PR Matl. Stat.',
            'PO Doc Date',
            'PO Item No,',
            'PO Qty',
            'Net Price',
            'Total Net Price',
            'PO Open Qty',
            'PO UOM',
            'PO Matl. Stat.',
            'GR Item No.',
            'GR Qty',
            'GR AmountTotal ',
            'GR UOM',
            'GR Matl. Stat.',
            'Deliv. Completion Ind.',
            'Actual Received Date',
            'Matl. Grp',
            'Supplier Code',
            'Supplier',
            'PO Status',
            'PO Created By',
            'Deliv. Addr.',
            'PO Deliv. Date',
            'GR Created By',
            'GR Entry Date ',
            'Delivery Note',
            'MFG Date',
            'SLED BBD',
            'Reason for PR',
            'PO Header Text',
            'GR Header Text',
        ];
    }
}
