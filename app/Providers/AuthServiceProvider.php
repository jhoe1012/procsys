<?php

namespace App\Providers;


use App\Models\Permission;
use App\Models\PersonalAccessToken;
use App\Models\User;
use App\Services\CoreService;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;
use Laravel\Sanctum\Sanctum;


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
        // $this->registerPolicies();

        // Gate::define('update-post', function (User $user) {
        //     dd($user);
        // });

        $coreService->registerGatePermissions();

        //   Sanctum::usePersonalAccessTokenModel( PersonalAccessToken::class );

    }
}
