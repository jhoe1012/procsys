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
        User::truncate();
        User::insert(
            [
                [
                    'name'              => 'Dev One',
                    'email'             => 'dev.one@goldilocks.com',
                    'email_verified_at' => now(),
                    'password'          => Hash::make('Pa$$w0rd!'),
                    'remember_token'    => Str::random(10),
                ],
                [
                    'name'              => 'Dev two',
                    'email'             => 'dev.two@goldilocks.com',
                    'email_verified_at' => now(),
                    'password'          => Hash::make('Pa$$w0rd!'),
                    'remember_token'    => Str::random(10),
                ],
                [
                    'name'              => 'Dev three',
                    'email'             => 'dev.three@goldilocks.com',
                    'email_verified_at' => now(),
                    'password'          => Hash::make('Pa$$w0rd!'),
                    'remember_token'    => Str::random(10),

                ],
                [
                    'name'              => 'Dev four',
                    'email'             => 'dev.four@goldilocks.com',
                    'email_verified_at' => now(),
                    'password'          => Hash::make('Pa$$w0rd!'),
                    'remember_token'    => Str::random(10),
                ],
                [
                    'name'              => 'Vincent Agunod',
                    'email'             => 'vincent.agunod@goldilocks.com',
                    'email_verified_at' => now(),
                    'password'          => Hash::make('Pa$$w0rd!'),
                    'remember_token'    => Str::random(10),
                ],
                [
                    'name'              => 'Gerald Santi Paraiso',
                    'email'             => 'gerald.paraiso@goldilocks.com',
                    'email_verified_at' => now(),
                    'password'          => Hash::make('Pa$$w0rd!'),
                    'remember_token'    => Str::random(10),
                ],
                [
                    'name'              => 'LOLITO B. CABORNAY',
                    'email'             => 'lolito.cabornay@goldilocks.com',
                    'email_verified_at' => now(),
                    'password'          => Hash::make('Pa$$w0rd!'),
                    'remember_token'    => Str::random(10),
                ],
                [
                    'name'              => 'Dennis Gabonada',
                    'email'             => 'dennis.gabonada@goldilocks.com',
                    'email_verified_at' => now(),
                    'password'          => Hash::make('Pa$$w0rd!'),
                    'remember_token'    => Str::random(10),
                ],
                [
                    'name'              => 'Glenn Zozobrado',
                    'email'             => 'glenn.zozobrado@goldilocks.com',
                    'email_verified_at' => now(),
                    'password'          => Hash::make('Pa$$w0rd!'),
                    'remember_token'    => Str::random(10),
                ],

            ]
        );

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
