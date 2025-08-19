<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\ProdOrdStatusMaster;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ProdOrdStatusMasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        ProdOrdStatusMaster::truncate();
        ProdOrdStatusMaster::insert([
            ['status' => 'CRTD', 'description' => 'Created'],
            ['status' => 'REL', 'description' => 'Released'],
            ['status' => 'GMPS', 'description' => 'Goods Movement Posted '],
            ['status' => 'DLV', 'description' => 'Delivered'],
            ['status' => 'TECO', 'description' => 'Technical Completion'],
            ['status' => 'CLSD', 'description' => 'Closed'],
        ]);
    }
}
