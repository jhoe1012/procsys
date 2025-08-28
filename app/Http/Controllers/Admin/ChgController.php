<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\ChgResource;
use App\Models\User;
use App\Models\ChgHeader;
use App\Models\ChgDetails;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class ChgController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ChgHeader::with([
            'chgDetails' => function ($q) use ($request) {
                if ($request->filled('action')) {
                    $q->where('data_chgtyp', $request->input('action'));
                }
                if ($request->filled('short_text')) {
                    $q->where('short_text', 'ILIKE', '%' . $request->input('short_text') . '%');
                }
                if ($request->filled('new_val')) {
                    $q->where('data_newvalue', 'ILIKE', '%' . $request->input('new_val') . '%');
                }
                if ($request->filled('old_val')) {
                    $q->where('data_oldvalue', 'ILIKE', '%' . $request->input('old_val') . '%');
                }
            },
            'user'
        ]);

        if ($request->filled('chg_date')) {
            $query->whereDate('timestamp', $request->input('chg_date'));
        }
        if ($request->filled('user')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'ILIKE', '%' . $request->input('user') . '%');
            });
        }

        $chgHeaders = $query->latest()->paginate(15)->appends($request->query());

        return Inertia::render('Admin/Audit/Index', [
            'chgHeaders' => ChgResource::collection($chgHeaders),
            'queryParams' => $request->query(),
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
