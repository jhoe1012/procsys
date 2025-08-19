<?php

namespace App\Import;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class ProductionOrderImport implements ToCollection
{
    private $productionOrder;

    public function collection(Collection $rows)
    {
        $rows->shift();
        $rowIndex = 1;

        foreach ($rows as $row) {
            $this->productionOrder[] = [
                'row_id'             => $rowIndex++,
                'material'           => trim(strip_tags($row[0])),
                'mat_desc'           => trim(strip_tags($row[1])),
                'uom'       => trim(strip_tags($row[2])),
                'total_qty'           => trim(strip_tags($row[3])),
            ];
        }
    }

    public function getProductionOrder(): array
    {
        return $this->productionOrder ?? [];
    }
}
