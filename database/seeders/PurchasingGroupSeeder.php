<?php

namespace Database\Seeders;

use App\Models\PurchasingGroup;
use Illuminate\Database\Seeder;

class PurchasingGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PurchasingGroup::truncate();
        $csv       = fopen(base_path('database/csv/purch_group.csv'), 'r');
        $firstline = true;
        while (($data = fgetcsv($csv, 1000, ',')) !== false) {
            if (! $firstline) {
                PurchasingGroup::create([
                    'mat_code'        => $data[0],
                    'plant'           => $data[1],
                    'purch_grp'       => $data[2],
                    'unit_issue'      => $data[3],
                    'plan_deliv_time' => $data[4],
                    'gr_proc_time'    => $data[5],
                    'min_lot_size'    => $data[6],
                    'max_lot_size'    => $data[7],
                    'fix_lot_size'    => $data[8],
                    'rounding_value'  => $data[9],
                ]);
            }
            $firstline = false;
        }
        fclose($csv);
    }
}
