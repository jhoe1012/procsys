<?php

namespace App\Http\Middleware;

use App\Http\Resources\AuthUserResource;
use App\Services\MenuService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $menus = [];
        $user  = $request->user();

        if ($user) {
            $menus = (new MenuService)->getMenus(); 
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? new AuthUserResource($user) : null,
                'menu' => $menus,
            ],
        ];
    }
}
