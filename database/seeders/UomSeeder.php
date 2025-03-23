<?php

namespace Database\Seeders;

use App\Models\Uom;
use Illuminate\Database\Seeder;

class UomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Uom::truncate();
        $csv       = fopen(base_path('database/csv/uom.csv'), 'r');
        $firstline = true;
        while (($data = fgetcsv($csv, 1000, ',')) !== false) {
            if (! $firstline) {
                Uom::create([
                    'uom'      => $data[0],
                    'uom_text' => $data[1],
                ]);
            }
            $firstline = false;
        }
        fclose($csv);
    }
}
