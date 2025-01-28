<?php

namespace App\Http\Controllers;

use App\Models\PoHeader;
use App\Models\PrHeader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $userPlants = $user->plants->pluck('plant')->toArray();
        $prApprSeq = $user->approvers
            ->firstWhere('type', 'pr')['seq'] ?? 0;
        $poApprSeq = $user->approvers
            ->firstWhere('type', 'po')['seq'] ?? 0;

        $prHeader['total'] = PrHeader::whereIn('plant', $userPlants)->count();
        $prHeader['approved'] = PrHeader::approved($userPlants)->count();
        $prHeader['cancelled'] = PrHeader::cancelled($userPlants)->count();
        if (Gate::allows('approve.pr')) {
            $prHeader['approval'] = PrHeader::approval($userPlants)
                ->where('appr_seq', '>=', $prApprSeq)
                ->count();
        } else {
            $prHeader['approval'] = PrHeader::approval($userPlants)
                ->count();
        }

        $poHeader['total'] = PoHeader::whereIn('plant', $userPlants)->count();
        $poHeader['approved'] = PoHeader::approved($userPlants)->count();
        $poHeader['cancelled'] = PoHeader::cancelled($userPlants)->count();
        if (Gate::allows('approve.po')) {
            $poHeader['approval'] = PoHeader::approval($userPlants)
                ->where('appr_seq', '>=', $poApprSeq)
                ->count();
        } else {
            $poHeader['approval'] = PoHeader::approval($userPlants)->count();
        }

        return Inertia::render('Dashboard/Index', [
            'prHeader' => $prHeader,
            'poHeader' => $poHeader
        ]);
    }
}
