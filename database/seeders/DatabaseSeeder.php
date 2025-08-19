<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(PlantSeeder::class);
        $this->call(UomSeeder::class);
        $this->call(MaterialGroupSeeder::class);
        $this->call(MaterialValuationSeeder::class);
        $this->call(AlternativeUomSeeder::class);
        $this->call(MaterialSeeder::class);
        $this->call(SeriesSeeder::class);
        $this->call(ApproversSeeder::class);
        $this->call(VendorSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(MaterialNetPriceSeeder::class);
        $this->call(PurchasingGroupSeeder::class);
    }
}
