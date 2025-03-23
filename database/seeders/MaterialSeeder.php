<?php

namespace Database\Seeders;

use App\Models\Material;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Material::truncate();
        $csv       = fopen(base_path('database/csv/material.csv'), 'r');
        $firstline = true;
        while (($data = fgetcsv($csv, 1000, ',')) !== false) {
            if (! $firstline) {
                Material::create([
                    'mat_code'           => $data[0],
                    'mat_desc'           => $data[1],
                    'old_mat_code'       => $data[2],
                    'mat_type'           => $data[3],
                    'mat_grp_code'       => $data[4],
                    'base_uom'           => $data[5],
                    'order_uom'          => $data[6],
                    'min_rem_shelf_life' => $data[7],
                    'total_shelf_life'   => $data[8],
                ]);
            }
            $firstline = false;
        }
        fclose($csv);
    }
}
