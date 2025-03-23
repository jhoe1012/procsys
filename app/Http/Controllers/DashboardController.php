<?php

namespace App\Http\Controllers;

use App\Enum\PermissionsEnum;
use App\Models\PoHeader;
use App\Models\PrHeader;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user       = $request->user();
        $userPlants = $user->plants->pluck('plant')->toArray();

        $prHeader['total']     = PrHeader::whereIn('plant', $userPlants)->count();
        $prHeader['approved']  = PrHeader::approved($userPlants)->count();
        $prHeader['cancelled'] = PrHeader::cancelled($userPlants)->count();

        if ($user->can(PermissionsEnum::ApproverPR)) {
            $prApprSeq = $user->approvers
                ->firstWhere('type', 'pr') ?? 0;

            $prHeader['approval'] = PrHeader::approval($userPlants)
                ->whereHas(
                    'prmaterials',
                    fn (Builder $q) => $q->where('prctrl_grp_id', $prApprSeq->prctrl_grp_id)
                )->where('appr_seq', '>=', $prApprSeq->seq)
                ->count();

        } else {
            $prHeader['approval'] = PrHeader::approval($userPlants)
                ->count();
        }

        $poHeader['total']     = PoHeader::whereIn('plant', $userPlants)->count();
        $poHeader['approved']  = PoHeader::approved($userPlants)->count();
        $poHeader['cancelled'] = PoHeader::cancelled($userPlants)->count();

        if ($user->can(PermissionsEnum::ApproverPO)) {
            $poApprSeq = $user->approvers
                ->firstWhere('type', 'po')['seq'] ?? 0;
            $poHeader['approval'] = PoHeader::approval($userPlants)
                ->where('appr_seq', '>=', $poApprSeq)
                ->count();
        } else {
            $poHeader['approval'] = PoHeader::approval($userPlants)->count();
        }

        return Inertia::render('Dashboard/Index', [
            'prHeader' => $prHeader,
            'poHeader' => $poHeader,
        ]);
    }
}
