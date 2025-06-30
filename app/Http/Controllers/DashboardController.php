<?php

namespace App\Http\Controllers;

use App\Enum\PermissionsEnum;
use App\Models\PoHeader;
use App\Models\PrHeader;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user          = $request->user();
        $userPlants    = $user->plants->pluck('plant')->toArray();
        $userPrCtrlGrp = $user->prCtrlGrp->pluck('id')->toArray();
        $prHeader      = [];
        $poHeader      = [];

        if ($user->hasAnyPermission([PermissionsEnum::CreatePR, PermissionsEnum::ApproverPR])) {
            $prHeader['total'] = PrHeader::userPlants($userPlants)
                ->userPrCtrlGrp($userPrCtrlGrp)
                ->count();
            $prHeader['approved'] = PrHeader::approved()
                ->userPlants($userPlants)
                ->userPrCtrlGrp($userPrCtrlGrp)
                ->count();
            $prHeader['cancelled'] = PrHeader::cancelled()
                ->userPlants($userPlants)
                ->userPrCtrlGrp($userPrCtrlGrp)
                ->count();
            $prHeader['approval'] = PrHeader::approval()
                ->userPlants($userPlants)
                ->userPrCtrlGrp($userPrCtrlGrp)
                ->withApprovalAccess($user)
                ->count();
        }

        if ($user->hasAnyPermission([PermissionsEnum::CreatePO, PermissionsEnum::ApproverPO])) {
            $poHeader['total']    = PoHeader::userPlants($userPlants)->count();
            $poHeader['approved'] = PoHeader::approved()
                ->userPlants($userPlants)
                ->count();
            $poHeader['cancelled'] = PoHeader::cancelled()
                ->userPlants($userPlants)
                ->count();
            $poHeader['approval'] = PoHeader::approval()
                ->userPlants($userPlants)
                ->withApprovalAccess($user)
                ->count();
        }

        return Inertia::render('Dashboard/Index', [
            'prHeader' => $prHeader,
            'poHeader' => $poHeader,
        ]);
    }
}
