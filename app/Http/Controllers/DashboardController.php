<?php

namespace App\Http\Controllers;

use App\Enum\PermissionsEnum;
use App\Models\PoHeader;
use App\Models\PrHeader;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user       = $request->user();
        $userPlants = $user->plants->pluck('plant')->toArray();
        $isApproverPR = $user->can(PermissionsEnum::ApproverPR);
        $isApproverPO = $user->can(PermissionsEnum::ApproverPO);

        $prHeader['total']     = PrHeader::whereIn('plant', $userPlants)->count();
        $prHeader['cancelled'] = PrHeader::cancelled($userPlants , $user->id)->count();
        $prHeader['approved']  = PrHeader::approved($userPlants, $user->id , $isApproverPR)->count();

        if ($isApproverPR) {
            $approvers = $user->approvers->where('type', 'pr');
            if ($approvers->isNotEmpty()) {
                $combinations = $approvers->map(function ($item) {
                    return "'{$item->plant}{$item->seq}{$item->prctrl_grp_id}'";
                })->join(',');
                $prHeader['approval'] = PrHeader::where(function ($query) use ($combinations) {
                        $query->whereRaw(DB::raw("plant||appr_seq||prctrl_grp_id IN ({$combinations})"));
                    })
                    ->count();
            } else {
                $prHeader['approval'] = 0;
            }
        } else {
            $prHeader['approval'] = PrHeader::approval($userPlants ,  $user->id , $isApproverPR)->count();
        }

        $poHeader['total']     = PoHeader::whereIn('plant', $userPlants)->count();
        $poHeader['approved']  = PoHeader::approved($userPlants, $user->id , $isApproverPO)->count();
        $poHeader['cancelled'] = PoHeader::cancelled($userPlants , $user->id)->count();

        if ($isApproverPO) {
            $poApprSeq = $user->approvers
                ->firstWhere('type', 'po')['seq'] ?? 0;
            $poHeader['approval'] = PoHeader::approval($userPlants ,  $user->id , $isApproverPO)
                ->where('appr_seq', '>=', $poApprSeq)
                ->count();
        } else {
            $poHeader['approval'] = PoHeader::approval($userPlants ,  $user->id ,  $isApproverPO)->count();
        }
 
        return Inertia::render('Dashboard/Index', [
            'prHeader' => $prHeader,
            'poHeader' => $poHeader,
        ]);
    }
}
