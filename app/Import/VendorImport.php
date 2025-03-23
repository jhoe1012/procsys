<?php

namespace App\Import;

use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\HasReferencesToOtherSheets;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class VendorImport implements HasReferencesToOtherSheets, SkipsUnknownSheets, WithMultipleSheets
{
    private array $vendors = [];

    private array $transactions = [];

    public $sheetName; // Store the sheet name dynamically

    public function sheets(): array
    {
        return [
            'LFA1' => new VendorMasterlist($this),
            'LFM1' => new VendorPaymentTerm($this),
        ];
    }

    public function onUnknownSheet($sheetName)
    {
        Log::warning('Skipping unknown sheet: '.$sheetName);
    }

    public function addVendor(array $data): void
    {
        $this->vendors[$data['supplier']] = $data;
    }

    public function addTransaction(array $data): void
    {
        $this->transactions[] = $data;
    }

    public function getVendors(): array
    {
        return $this->vendors;
    }

    public function getTransactions(): array
    {
        return $this->transactions;
    }

    public function getData(): array
    {
        return [
            'vendors'      => $this->vendors,
            'transactions' => $this->transactions,
        ];
    }
}
