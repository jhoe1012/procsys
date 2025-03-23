<?php

namespace App\Import;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToCollection;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class MaterialValuationImport implements ToCollection
{
    private $materialValuation;

    public function collection(Collection $rows)
    {
        $rows->shift(); // remove the header row
        foreach ($rows as $row) {
            $this->materialValuation[] = [
                'mat_code'        => $row[0],
                'plant'           => $row[1],
                'currency'        => $row[2],
                'valuation_price' => $row[3],
                'per_unit'        => $row[4],
                'valid_from'      => Carbon::parse(Date::excelToTimestamp((int) $row[5]))->format('Y-m-d'),
                'valid_to'        => Carbon::parse(Date::excelToTimestamp((int) $row[6]))->format('Y-m-d'),
                'created_by'      => Auth::id(),
                'created_at'      => now(),
            ];
        }
    }

    public function getMaterialValuation(): array
    {
        return $this->materialValuation;
    }
}
