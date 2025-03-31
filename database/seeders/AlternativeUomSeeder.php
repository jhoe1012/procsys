<?php

namespace Database\Seeders;

use App\Models\AlternativeUom;
use Illuminate\Database\Seeder;

class AlternativeUomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AlternativeUom::truncate();
        $csv       = fopen(base_path('database/csv/alt_uom.csv'), 'r');
        $firstline = true;
        while (($data = fgetcsv($csv, 1000, ',')) !== false) {
            if (! $firstline) {
                AlternativeUom::create([
                    'mat_code'    => $data[0],
                    'alt_uom'     => $data[1],
                    'counter'     => $data[2],
                    'denominator' => $data[3],
                    // "ean_num" => $data[4],
                    'ean_upc'        => $data[5],
                    'ean_category'   => $data[6],
                    'unit_of_weight' => $data[7],
                ]);
            }
            $firstline = false;
        }
        fclose($csv);
    }
}
