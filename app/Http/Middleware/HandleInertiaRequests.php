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
            // $menus = $menu;
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? new AuthUserResource($user) : null,
                // 'permissions' => [
                //     'pr' => [
                //         'create' => $request->user()?->can('create.pr'),
                //         'read' => $request->user()?->can('read.pr'),
                //         'edit' => $request->user()?->can('edit.pr'),
                //         'delete' => $request->user()?->can('delete.pr'),
                //         'approver' => $request->user()?->can('approve.pr'),
                //     ],
                //     'po' => [
                //         'create' => $request->user()?->can('create.po'),
                //         'read' => $request->user()?->can('read.po'),
                //         'edit' => $request->user()?->can('edit.po'),
                //         'delete' => $request->user()?->can('delete.po'),
                //         'approver' => $request->user()?->can('approve.po'),
                //     ],
                //     'gr' =>
                //     [
                //         'create' => $request->user()?->can('create.gr'),
                //         'read' => $request->user()?->can('read.gr'),
                //         'edit' => $request->user()?->can('edit.gr'),
                //         'delete' => $request->user()?->can('delete.gr'),
                //         'approver' => $request->user()?->can('approve.gr'),
                //         'cancel' =>  $request->user()?->can('cancel.gr'),
                //     ],
                //     'admin' =>
                //     [
                //         'read' => $request->user()?->can('admin'),
                //     ]
                // ],
                'menu' => $menus,
            ],
        ];
    }
}
