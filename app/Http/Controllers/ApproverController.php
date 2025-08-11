<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApproverResource;
use App\Http\Resources\UserResource;
use App\Models\Approvers;
use App\Models\Plant;
use App\Models\PrctrlGrp;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApproverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Approvers::query();

        $query = $query->with(['plants', 'user', 'prCtrlGrp']);

        $filters = [
            'plant' => fn ($value) => $query->whereHas(
                'plants',
                fn ($q) => $q->where('plants.plant', $value)
            ),
            'name' => fn ($value) => $query->whereHas(
                'user',
                fn ($q) => $q->where('name', 'ilike', "%{$value}%")
            ),
            'email' => fn ($value) => $query->whereHas(
                'user',
                fn ($q) => $q->where('email', 'ilike', "%{$value}%")
            ),
            'position' => fn ($value) => $query->where('position', 'ilike', "%{$value}%"),
        ];

        foreach ($request->only(array_keys($filters)) as $field => $value) {
            if (! empty($value)) {
                $filters[$field]($value);
            }
        }

        $approvers = $query->orderBy(column: 'type', direction: 'asc')
            ->orderBy('plant', 'asc')
            ->orderBy('seq', 'asc')
            ->paginate(50)
            ->onEachSide(5);

        return Inertia::render('Admin/Approver/Index', [
            'approvers'   => ApproverResource::collection($approvers),
            'plants'      => Plant::all()->toArray(),
            'prCtrlGrps'  => PrctrlGrp::orderBy('plant_id')->orderBy('prctrl_grp')->get()->toArray(),
            'queryParams' => $request->query() ?: null,
            'message'     => ['success' => session('success'), 'error' => session('error')],
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
        $approver                = new Approvers;
        $approver->type          = $request->input('type');
        $approver->plant         = $request->input('plant');
        $approver->user_id       = $request->input('user_id');
        $approver->position      = $request->input('position');
        $approver->amount_from   = $request->input('amount_from');
        $approver->amount_to     = $request->input('amount_to');
        $approver->seq           = $request->input('seq');
        $approver->desc          = $request->input('desc');
        $approver->prctrl_grp_id = $request->input('prctrl_grp_id');
        $approver->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Approvers $approvers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Approvers $approvers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Approvers $approver)
    {
        $approver->type          = $request->input('type');
        $approver->plant         = $request->input('plant');
        $approver->user_id       = $request->input('user_id');
        $approver->position      = $request->input('position');
        $approver->amount_from   = $request->input('amount_from');
        $approver->amount_to     = $request->input('amount_to');
        $approver->seq           = $request->input('seq');
        $approver->desc          = $request->input('desc');
        $approver->prctrl_grp_id = $request->input('prctrl_grp_id');
        $approver->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Approvers $approvers)
    {
        //
    }

    public function search(Request $request)
    {

        if (! $request->input('search')) {
            return;
        }

        $user = User::where('name', 'ilike', "%{$request->input('search')}%")
            ->orderBy('name')->get();

        return UserResource::collection($user);
    }
}
