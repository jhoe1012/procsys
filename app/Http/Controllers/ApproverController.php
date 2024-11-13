<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApproverResource;
use App\Http\Resources\UserResource;
use App\Models\Approvers;
use App\Models\Plant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;


class ApproverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Approvers::query();

        $query =  $query->with(['plants', 'user']);

        if (request('plant')) {
            $query->where('plant', 'ilike', "%" . request('plant') . "%");
        }
        if (request('name')) {
            $query->whereHas('user', fn($query) => $query->where('name', 'ilike', "%" . request('name') . "%"));
        }
        if (request('email')) {
            $query->whereHas('user', fn($query) => $query->where('email', 'ilike', "%" . request('email') . "%"));
        }
        if (request('position')) {
            $query->where('position', 'ilike', "%" . request('position') . "%");
        }

        $vendor = $query->orderBy(column: 'type', direction: 'asc')
            ->orderBy('plant', 'asc')
            ->orderBy('seq', 'asc')
            ->paginate(50)
            ->onEachSide(5);

        $plants =  Plant::select('plant', "name1")
            ->orderBy('plant')
            ->get()
            ->map(fn($item) =>  [
                'value' => $item->plant,
                'label' => $item->plant . '-' . $item->name1
            ])->toArray();

        // return ApproverResource::collection($vendor);
        return Inertia::render('Admin/Approver/Index', [
            'approvers' => ApproverResource::collection($vendor),
            'plants' => $plants,
            'queryParams' => $request->query() ?: null,
            'message' => ['success' => session('success'), 'error' => session('error')],
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
        $approver = new Approvers();
        $approver->type = Str::lower($request->input('type'));
        $approver->plant = $request->input('plant');
        $approver->user_id = $request->input('user_id');
        $approver->position = $request->input('position');
        $approver->amount_from = $request->input('amount_from');
        $approver->amount_to = $request->input('amount_to');
        $approver->seq = $request->input('seq');
        $approver->desc = $request->input('desc');
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
        $approver->type = Str::lower($request->input('type'));
        $approver->plant = $request->input('plant');
        $approver->user_id = $request->input('user_id');
        $approver->position = $request->input('position');
        $approver->amount_from = $request->input('amount_from');
        $approver->amount_to = $request->input('amount_to');
        $approver->seq = $request->input('seq');
        $approver->desc = $request->input('desc');
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

        if (!$request->input('search'))
            return;

        $user = User::where('name', 'ilike' , "%{$request->input('search')}%")
        ->orderBy('name')->get();

        return UserResource::collection($user);
    }
}
