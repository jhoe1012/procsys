<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        include_once dirname(__FILE__) . '/../permissions/pr-role.php';
        include_once dirname(__FILE__) . '/../permissions/po-role.php';
        include_once dirname(__FILE__) . '/../permissions/gr-role.php';
        include_once dirname(__FILE__) . '/../permissions/admin-role.php';

        DB::table('user_role_relations')->insert([
            // ['role_id' => 1, 'user_id' => 5],
            // ['role_id' => 3, 'user_id' => 1],
            // ['role_id' => 5, 'user_id' => 2],
            // ['role_id' => 6, 'user_id' => 3],

            // ['role_id' => 2, 'user_id' => 6],
            // ['role_id' => 2, 'user_id' => 7],
            // ['role_id' => 2, 'user_id' => 8],
            // ['role_id' => 2, 'user_id' => 9],

            // ['role_id' => 4, 'user_id' => 6],
            // ['role_id' => 4, 'user_id' => 7],
            // ['role_id' => 4, 'user_id' => 8],
            // ['role_id' => 4, 'user_id' => 9],

            ['role_id' => 1, 'user_id' => 1],
            ['role_id' => 2, 'user_id' => 2],
            ['role_id' => 2, 'user_id' => 3],
            ['role_id' => 2, 'user_id' => 4],
            ['role_id' => 3, 'user_id' => 1],
            ['role_id' => 4, 'user_id' => 2],
            ['role_id' => 4, 'user_id' => 3],
            ['role_id' => 4, 'user_id' => 4],
            ['role_id' => 5, 'user_id' => 1],
            ['role_id' => 6, 'user_id' => 2],
            ['role_id' => 7, 'user_id' => 1],
        ]);
    }
}
