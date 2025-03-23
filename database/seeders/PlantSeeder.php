<?php

namespace Database\Seeders;

use App\Models\Plant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plant::truncate();
        $csv       = fopen(base_path('database/csv/plant.csv'), 'r');
        $firstline = true;
        while (($data = fgetcsv($csv, 1000, ',')) !== false) {
            if (! $firstline) {
                Plant::create([
                    'plant'        => $data[0],
                    'name1'        => $data[1],
                    'lot_no'       => $data[2],
                    'street'       => $data[3],
                    'street2'      => $data[4],
                    'district'     => $data[5],
                    'postal_code'  => $data[6],
                    'city'         => $data[7],
                    'country_code' => $data[8],
                ]);
            }
            $firstline = false;
        }
        fclose($csv);

        DB::table('plant_user')->insert([
            ['user_id' => 1, 'plant_id' => 1],
            ['user_id' => 1, 'plant_id' => 5],
            ['user_id' => 2, 'plant_id' => 1],
            ['user_id' => 2, 'plant_id' => 5],
            ['user_id' => 3, 'plant_id' => 1],
            ['user_id' => 3, 'plant_id' => 5],
            ['user_id' => 4, 'plant_id' => 1],
            ['user_id' => 4, 'plant_id' => 5],
        ]);
    }
}
