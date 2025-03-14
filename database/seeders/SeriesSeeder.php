<?php

namespace Database\Seeders;

use App\Models\Series;
use Illuminate\Database\Seeder;

class SeriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Series::truncate();
        Series::create([
            'title'         => Series::PR,
            'plant'         => 'P100',
            'from'          => 2010000001,
            'to'            => 2019999999,
            'current_value' => 2010000000,
        ]);
        Series::create([
            'title'         => Series::PO,
            'plant'         => 'P100',
            'from'          => 4501000001,
            'to'            => 4501999999,
            'current_value' => 4501000000,
        ]);
        Series::create([
            'title'         => Series::GR,
            'plant'         => 'P100',
            'from'          => 5010000001,
            'to'            => 5019999999,
            'current_value' => 5010000000,
        ]);
    }
}
