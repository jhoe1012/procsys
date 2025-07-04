<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\DeliveryAddress;
use App\Models\Plant;
use App\Models\PrctrlGrp;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();
        $query->with(['roles', 'plants', 'deliveryAddress', 'prCtrlGrp']);

        $filters = [
            'name'     => fn ($value) => $query->where('name', 'ilike', "%{$value}%"),
            'email'    => fn ($value) => $query->where('email', 'ilike', "%{$value}%"),
            'position' => fn ($value) => $query->where('position', 'ilike', "%{$value}%"),
            'role'     => fn ($value) => $query->whereHas(
                'roles',
                fn ($q) => $q->where('roles.name', $value)
            ),
            'plant' => fn ($value) => $query->whereHas(
                'plants',
                fn ($q) => $q->where('plants.plant', $value)
            ),
        ];

        foreach ($request->only(array_keys($filters)) as $field => $value) {
            if (! empty($value)) {
                $filters[$field]($value);
            }
        }

        $users = $query->orderBy('name')
            ->paginate(50)
            ->onEachSide(5)
            ->appends($request->query() ?: null);

        return Inertia::render('Admin/Users/Index', [
            'users'           => UserResource::collection($users),
            'roles'           => Role::all()->toArray(),
            'plants'          => Plant::all()->toArray(),
            'prCtrlGrps'      => PrctrlGrp::all()->toArray(),
            'deliveryAddress' => DeliveryAddress::all()->toArray(),
            'queryParams'     => $request->query() ?: null,
            'message'         => ['success' => session('success'), 'error' => session('error')],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'            => ['required', 'string', 'max:255'],
            'email'           => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password'        => ['required', Rules\Password::defaults()],
            'roles'           => ['required'],
            'plants'          => ['required'],
            'prCtrlGrps'      => ['nullable', 'array'],
            'deliveryAddress' => ['nullable', 'array'],
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'position' => $request->position,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole([$request->roles]);
        $user->plants()->sync($request->plants);
        $user->prCtrlGrp()->sync($request->prCtrlGrps);
        $user->deliveryAddress()->sync($request->deliveryAddress);
        event(new Registered($user));

        return back()->with('success', 'User Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name'   => ['required', 'string', 'max:255'],
            'roles'  => ['required'],
            'plants' => ['required'],
        ]);

        $user->update([
            'name'     => $request->name,
            'position' => $request->position,
        ]);

        DB::table('model_has_roles')->where('model_id', $user->id)->delete();
        $user->assignRole($request->roles);
        $user->plants()->sync($request->plants);
        $user->prCtrlGrp()->sync($request->prCtrlGrps);
        $user->deliveryAddress()->sync($request->deliveryAddress);

        return back()->with('success', 'User Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
