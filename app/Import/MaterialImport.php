<?php

namespace App\Import;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class MaterialImport implements ToCollection
{
    private $materialImport;

    public function collection(Collection $rows)
    {
        $rows->shift();

        $rowIndex = 2;

        foreach ($rows as $row) {
            $this->materialImport[] = [
                'row_id'             => $rowIndex++,
                'mat_code'           => trim(strip_tags($row[0])),
                'mat_desc'           => trim(strip_tags($row[1])),
                'old_mat_code'       => trim(strip_tags($row[2])),
                'mat_type'           => trim(strip_tags($row[3])),
                'mat_grp_code'       => trim(strip_tags($row[4])),
                'base_uom'           => trim(strip_tags($row[5])),
                'order_uom'          => trim(strip_tags($row[6])),
                'min_rem_shelf_life' => trim(strip_tags($row[7])),
                'total_shelf_life'   => trim(strip_tags($row[8])),
            ];
        }
    }

    public function getMaterialImport(): array
    {
        return $this->materialImport ?? [];
    }
}
