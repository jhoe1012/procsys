<?php

namespace App\Import;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class VendorImport implements ToCollection
{
    private $vendorImport;

    public function collection(Collection $rows)
    {
        $rows->shift(); // Remove the header row

        foreach ($rows as $row) {
            $this->vendorImport[] = [
                'supplier'      => trim(strip_tags($row[0])),
                'account_group' => trim(strip_tags($row[1])),
                'tax_number'    => trim(strip_tags($row[2])),
                'tax_number_2'  => trim(strip_tags($row[3])),
                'name_1'        => trim(strip_tags($row[4])),
                'name_2'        => trim(strip_tags($row[5])),
                'name_3'        => trim(strip_tags($row[6])),
                'name_4'        => trim(strip_tags($row[7])),
                'search_term'   => trim(strip_tags($row[8])),
                'city'          => trim(strip_tags($row[9])),
                'country'       => trim(strip_tags($row[10])),
                'district'      => trim(strip_tags($row[11])),
                'postal_code'   => trim(strip_tags($row[12])),
                'street'        => trim(strip_tags($row[13])),
                'address'       => trim(strip_tags($row[14])),
                'city_2'        => trim(strip_tags($row[15])),
                'telephone_1'   => trim(strip_tags($row[16])),
                'telephone_2'   => trim(strip_tags($row[17])),
                'vat_reg_no'    => trim(strip_tags($row[18])),
            ];
        }
    }

    public function getVendorData(): array
    {
        return $this->vendorImport ?? [];
    }
}
