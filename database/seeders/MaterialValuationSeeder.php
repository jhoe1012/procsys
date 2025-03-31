<?php

namespace Database\Seeders;

use App\Models\MaterialValuation;
use Illuminate\Database\Seeder;

class MaterialValuationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MaterialValuation::truncate();
        $csv       = fopen(base_path('database/csv/valuation.csv'), 'r');
        $firstline = true;
        while (($data = fgetcsv($csv, 1000, ',')) !== false) {
            if (! $firstline) {
                MaterialValuation::create([
                    'mat_code'        => $data[0],
                    'plant'           => $data[1],
                    'valuation_price' => $data[2],
                    'valid_from'      => $data[3],
                    'valid_to'        => $data[4],
                ]);
            }
            $firstline = false;
        }
        fclose($csv);
    }
}
