<?php

namespace Database\Seeders;

use App\Models\PrctrlGrp;
use Illuminate\Database\Seeder;

class PrctrlGrpSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PrctrlGrp::truncate();
        PrctrlGrp::create([
            'plant_id'    => 5,
            'prctrl_grp'  => 'PO1',
            'prctrl_desc' => 'RM/PM',
        ]);
        PrctrlGrp::create([
            'plant_id'    => 5,
            'prctrl_grp'  => 'PO2',
            'prctrl_desc' => 'All Non RM/PM except IT & Engineering',
        ]);
        PrctrlGrp::create([
            'plant_id'    => 5,
            'prctrl_grp'  => 'HO1',
            'prctrl_desc' => 'IT Equipment & Services',
        ]);
        PrctrlGrp::create([
            'plant_id'    => 5,
            'prctrl_grp'  => 'HO2',
            'prctrl_desc' => 'Engineering',
        ]);
        PrctrlGrp::create([
            'plant_id'    => 5,
            'prctrl_grp'  => 'PO3',
            'prctrl_desc' => 'HR',
        ]);
        PrctrlGrp::create([
            'plant_id'    => 5,
            'prctrl_grp'  => 'P04',
            'prctrl_desc' => 'LOGISTICS',
        ]);
        PrctrlGrp::create([
            'plant_id'    => 5,
            'prctrl_grp'  => 'P05',
            'prctrl_desc' => 'FINANCE',
        ]);
        PrctrlGrp::create([
            'plant_id'    => 5,
            'prctrl_grp'  => 'P06',
            'prctrl_desc' => 'ADMIN',
        ]);
    }
}
