<?php

namespace App\Import;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Facades\Log;

class VendorPaymentTerm implements ToCollection
{
    private VendorImport $parent;

    public function __construct(VendorImport $parent)
    {
        $this->parent = $parent;
    }

    public function collection(Collection $rows): void
    {
        $rows->shift(); 
        $rowIndex = 2;
        $vendors = $this->parent->getVendors();
        foreach ($rows as $row) {
            $supplierId = $row[0];

            if (isset($vendors[$supplierId])) {
                $this->parent->addTransaction([
                    'row_id'        => $rowIndex++,
                    'supplier'      => $supplierId,
                    'currency'      => trim(strip_tags($row[2])) ?? '',
                    'payment_terms' => trim(strip_tags($row[3])) ?? '',
                ]);
            } else {
                Log::warning("Skipping transaction: Unknown supplier ID " . $supplierId);
            }
        }
    }
}
