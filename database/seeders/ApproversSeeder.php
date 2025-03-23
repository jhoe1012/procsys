<?php

namespace Database\Seeders;

use App\Models\Approvers;
use Illuminate\Database\Seeder;

class ApproversSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Approvers::truncate();
        Approvers::insert([
            [
                'type'        => 'pr',
                'plant'       => 'P100',
                'user_id'     => 2,
                'position'    => 'Functional Head (M2)',
                'amount_from' => 0,
                'amount_to'   => 29999,
                'desc'        => 'For M2 Approval',
                'seq'         => 1,
            ],
            [
                'type'        => 'pr',
                'plant'       => 'P100',
                'user_id'     => 3,
                'position'    => 'Plant Manager',
                'amount_from' => 30000,
                'amount_to'   => 499999,
                'desc'        => 'For PM Approval',
                'seq'         => 2,
            ],
            [
                'type'        => 'pr',
                'plant'       => 'P100',
                'user_id'     => 4,
                'position'    => 'Dept Head/AVP',
                'amount_from' => 500000,
                'amount_to'   => 10000000,
                'desc'        => 'For DepHd/AVP Approval',
                'seq'         => 3,
            ],
            [
                'type'        => 'po',
                'plant'       => 'P100',
                'user_id'     => 2,
                'position'    => 'Procurement Manager',
                'amount_from' => 0,
                'amount_to'   => 99999,
                'desc'        => 'For ProcMgr1 Approval',
                'seq'         => 1,
            ],
            [
                'type'        => 'po',
                'plant'       => 'P100',
                'user_id'     => 3,
                'position'    => 'Senior Manager',
                'amount_from' => 100000,
                'amount_to'   => 499999,
                'desc'        => 'For Senior Manager Approval',
                'seq'         => 2,
            ],
            [
                'type'        => 'po',
                'plant'       => 'P100',
                'user_id'     => 4,
                'position'    => 'Dept. Head',
                'amount_from' => 500000,
                'amount_to'   => 999999,
                'desc'        => 'For Dept. Head Approval',
                'seq'         => 3,
            ],
            [
                'type'        => 'po',
                'plant'       => 'P100',
                'user_id'     => 4,
                'position'    => 'Chairman',
                'amount_from' => 100000,
                'amount_to'   => 100000000,
                'desc'        => 'For Chairman Approval',
                'seq'         => 4,
            ],
        ]);
    }
}
