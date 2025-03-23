<?php

namespace Database\Seeders;

use App\Models\Vendor;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Vendor::truncate();
        $csv       = fopen(base_path('database/csv/vendor.csv'), 'r');
        $firstline = true;
        while (($data = fgetcsv($csv, 2000, ',')) !== false) {
            if (! $firstline) {
                Vendor::create([
                    'supplier'      => $data[0],
                    'account_group' => $data[1],
                    'tax_number'    => $data[2],
                    'tax_number_2'  => $data[3],
                    'name_1'        => $data[4],
                    'name_2'        => $data[5],
                    'name_3'        => $data[6],
                    'name_4'        => $data[7],
                    'search_term'   => $data[8],
                    'city'          => $data[9],
                    'country'       => $data[10],
                    'district'      => $data[11],
                    'postal_code'   => $data[12],
                    'street'        => $data[13],
                    'address'       => $data[14],
                    'city_2'        => $data[15],
                    'int_loc_1'     => $data[16],
                    'int_loc_2'     => $data[17],
                    'auth_group'    => $data[18],
                    'lang_key'      => $data[19],
                    'telephone_1'   => $data[21],
                    'telephone_2'   => $data[22],
                    'vat_reg_no'    => $data[23],
                    'currency'      => $data[24],
                    'payment_terms' => $data[25],
                ]);
            }
            $firstline = false;
        }
        fclose($csv);
    }
}
