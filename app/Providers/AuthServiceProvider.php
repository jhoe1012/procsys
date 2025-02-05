<?php

namespace App\Providers;

use App\Services\CoreService;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // ...
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */

    //  CoreService $coreService
    public function boot(CoreService $coreService)
    {
        // $coreService->registerGatePermissions();
    }
}
