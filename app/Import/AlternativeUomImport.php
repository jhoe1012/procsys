<?php

namespace App\Import;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class AlternativeUomImport implements ToCollection
{
    private $altUomImport;

    public function collection(Collection $rows)
    {
        $rows->shift();

        $rowIndex = 2;

        foreach ($rows as $row) {
            $this->altUomImport[] = [
                'row_id'         => $rowIndex++,
                'mat_code'       => trim(strip_tags($row[0])),
                'alt_uom'        => trim(strip_tags($row[1])),
                'counter'        => trim(strip_tags($row[2])),
                'denominator'    => trim(strip_tags($row[3])),
                'ean_num'        => trim(strip_tags($row[4])),
                'ean_upc'        => trim(strip_tags($row[5])),
                'ean_category'   => trim(strip_tags($row[6])),
                'unit_of_weight' => trim(strip_tags($row[7])),
            ];
        }
    }

    public function getaltUomImport(): array
    {
        return $this->altUomImport ?? [];
    }
}
