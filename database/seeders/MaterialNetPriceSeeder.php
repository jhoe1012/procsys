<?php

namespace Database\Seeders;

use App\Models\MaterialNetPrice;
use Illuminate\Database\Seeder;

class MaterialNetPriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MaterialNetPrice::truncate();
        MaterialNetPrice::create([
            'vendor'        => '100761',
            'plant'         => '1200',
            'mat_code'      => '3000001',
            'currency'      => 'PHP',
            'price'         => 1000.00,
            'per_unit'      => 1.00,
            'uom'           => 'BOX',
            'valid_from'    => '2024-08-01',
            'valid_to'      => '9999-12-31',
            'min_order_qty' => 50.00,
        ]);
        MaterialNetPrice::create([
            'vendor'        => '100761',
            'plant'         => 'P100',
            'mat_code'      => '3000001',
            'currency'      => 'PHP',
            'price'         => 1000.00,
            'per_unit'      => 1.00,
            'uom'           => 'BOX',
            'valid_from'    => '2024-08-01',
            'valid_to'      => '9999-12-31',
            'min_order_qty' => 50.00,
        ]);
    }
}
