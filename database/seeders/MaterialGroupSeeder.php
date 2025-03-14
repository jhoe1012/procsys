<?php

namespace Database\Seeders;

use App\Models\MaterialGroup;
use Illuminate\Database\Seeder;

class MaterialGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MaterialGroup::truncate();
        $csv       = fopen(base_path('database/csv/mat_grp.csv'), 'r');
        $firstline = true;
        while (($data = fgetcsv($csv, 1000, ',')) !== false) {
            if (! $firstline) {
                MaterialGroup::create([
                    'mat_grp_code'  => $data[0],
                    'mat_grp_desc'  => $data[1],
                    'mat_grp_desc2' => $data[2],
                ]);
            }
            $firstline = false;
        }
        fclose($csv);
    }
}
