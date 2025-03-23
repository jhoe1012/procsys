<?php

namespace App\Import;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class VendorMasterlist implements ToCollection
{
    private VendorImport $parent;

    public function __construct(VendorImport $parent)
    {
        $this->parent = $parent;
    }

    public function collection(Collection $rows): void
    {
        $rows->shift(); // Remove the header row
        $rowIndex = 2;

        foreach ($rows as $row) {
            $this->parent->addVendor([
                'row_id'        => $rowIndex++,
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
                'int_loc_1'     => trim(strip_tags($row[16])),
                'int_loc_2'     => trim(strip_tags($row[17])),
                'auth_group'    => trim(strip_tags($row[18])),
                'lang_key'      => trim(strip_tags($row[19])),
                'telephone_1'   => trim(strip_tags($row[20])),
                'telephone_2'   => trim(strip_tags($row[21])),
                'vat_reg_no'    => trim(strip_tags($row[22])),
            ]);
        }
    }
}
