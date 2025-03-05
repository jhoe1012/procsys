<?php

namespace App\Import;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Maatwebsite\Excel\Concerns\HasReferencesToOtherSheets;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeSheet;
use Illuminate\Support\Facades\Log;

use App\Import\VendorMasterlist;
use App\Import\VendorPaymentTerm;

class VendorImport implements WithMultipleSheets, SkipsUnknownSheets, HasReferencesToOtherSheets
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
        Log::warning("Skipping unknown sheet: " . $sheetName);
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
