<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // include_once dirname(__FILE__) . '/../permissions/pr-role.php';
        // include_once dirname(__FILE__) . '/../permissions/po-role.php';
        // include_once dirname(__FILE__) . '/../permissions/gr-role.php';
        // include_once dirname(__FILE__) . '/../permissions/admin-role.php';

        // DB::table('user_role_relations')->insert([
        //     // ['role_id' => 1, 'user_id' => 5],
        //     // ['role_id' => 3, 'user_id' => 1],
        //     // ['role_id' => 5, 'user_id' => 2],
        //     // ['role_id' => 6, 'user_id' => 3],

        //     // ['role_id' => 2, 'user_id' => 6],
        //     // ['role_id' => 2, 'user_id' => 7],
        //     // ['role_id' => 2, 'user_id' => 8],
        //     // ['role_id' => 2, 'user_id' => 9],

        //     // ['role_id' => 4, 'user_id' => 6],
        //     // ['role_id' => 4, 'user_id' => 7],
        //     // ['role_id' => 4, 'user_id' => 8],
        //     // ['role_id' => 4, 'user_id' => 9],

        //     ['role_id' => 1, 'user_id' => 1],
        //     ['role_id' => 2, 'user_id' => 2],
        //     ['role_id' => 2, 'user_id' => 3],
        //     ['role_id' => 2, 'user_id' => 4],
        //     ['role_id' => 3, 'user_id' => 1],
        //     ['role_id' => 4, 'user_id' => 2],
        //     ['role_id' => 4, 'user_id' => 3],
        //     ['role_id' => 4, 'user_id' => 4],
        //     ['role_id' => 5, 'user_id' => 1],
        //     ['role_id' => 6, 'user_id' => 2],
        //     ['role_id' => 7, 'user_id' => 1],
        // ]);

        Role::truncate();
        Permission::truncate();

        $prRequestorRole = Role::create(['name' => RolesEnum::PRRequestor->value]);
        $prApproverRole  = Role::create(['name' => RolesEnum::PRApprover->value]);
        $poRequestorRole = Role::create(['name' => RolesEnum::PORequestor->value]);
        $poApproverRole  = Role::create(['name' => RolesEnum::POApprover->value]);
        $grCreatorRole   = Role::create(['name' => RolesEnum::GRCreator->value]);
        $grManagerRole   = Role::create(['name' => RolesEnum::GRManager->value]);
        $adminRole       = Role::create(['name' => RolesEnum::Admin->value]);
        $prViewerRole    = Role::create(['name' => RolesEnum::PRViewer->value]);
        $poViewerRole    = Role::create(['name' => RolesEnum::POViewer->value]);
        $grViewerRole    = Role::create(['name' => RolesEnum::GRViewer->value]);

        $createPrPermission  = Permission::create(['name' => PermissionsEnum::CreatePR->value]);
        $editPrPermission    = Permission::create(['name' => PermissionsEnum::EditPR->value]);
        $updatePrPermission  = Permission::create(['name' => PermissionsEnum::UpdatePR->value]);
        $deletePrPermission  = Permission::create(['name' => PermissionsEnum::DeletePR->value]);
        $readPrPermission    = Permission::create(['name' => PermissionsEnum::ReadPR->value]);
        $approvePrPermission = Permission::create(['name' => PermissionsEnum::ApproverPR->value]);
        $createPoPermission  = Permission::create(['name' => PermissionsEnum::CreatePO->value]);
        $editPoPermission    = Permission::create(['name' => PermissionsEnum::EditPO->value]);
        $updatePoPermission  = Permission::create(['name' => PermissionsEnum::UpdatePO->value]);
        $deletePoPermission  = Permission::create(['name' => PermissionsEnum::DeletePO->value]);
        $readPoPermission    = Permission::create(['name' => PermissionsEnum::ReadPO->value]);
        $approvePoPermission = Permission::create(['name' => PermissionsEnum::ApproverPO->value]);
        $createGrPermission  = Permission::create(['name' => PermissionsEnum::CreateGR->value]);
        $editGrPermission    = Permission::create(['name' => PermissionsEnum::EditGR->value]);
        $updateGrPermission  = Permission::create(['name' => PermissionsEnum::UpdateGR->value]);
        $deletePermission    = Permission::create(['name' => PermissionsEnum::DeleteGR->value]);
        $readGrPermission    = Permission::create(['name' => PermissionsEnum::ReadGR->value]);
        $approveGrPermission = Permission::create(['name' => PermissionsEnum::ApproverGR->value]);
        $cancelGrPermission  = Permission::create(['name' => PermissionsEnum::CancelGR->value]);
        $adminPermission     = Permission::create(['name' => PermissionsEnum::Admin->value]);

        $prRequestorRole->syncPermissions([$createPrPermission, $editPrPermission, $updatePrPermission, $deletePrPermission, $readPrPermission]);
        $prApproverRole->syncPermissions([$approvePrPermission,  $readPrPermission]);
        $poRequestorRole->syncPermissions([$createPoPermission, $editPoPermission, $updatePoPermission, $deletePoPermission, $readPoPermission]);
        $poApproverRole->syncPermissions([$approvePoPermission, $readPoPermission]);
        $grCreatorRole->syncPermissions([$createGrPermission, $editGrPermission, $updateGrPermission, $deletePermission, $readGrPermission]);
        $grManagerRole->syncPermissions([$readGrPermission, $cancelGrPermission]);
        $adminRole->syncPermissions([$adminPermission]);
        $prViewerRole->syncPermissions([$readPrPermission]);
        $poViewerRole->syncPermissions([$readPoPermission]);
        $grViewerRole->syncPermissions([$readGrPermission]);

        User::find(1)->assignRole([$prRequestorRole, $poRequestorRole, $grCreatorRole, $adminRole]);
        User::find(2)->assignRole([$prApproverRole]);
        User::find(3)->assignRole([$poRequestorRole]);
        User::find(4)->assignRole([$grCreatorRole]);
        User::find(5)->assignRole([$prRequestorRole, $poRequestorRole, $grCreatorRole, $adminRole]);
        User::find(8)->assignRole([$prApproverRole]);
        User::find(10)->assignRole([$prRequestorRole]);
        User::find(11)->assignRole([$prApproverRole]);
        User::find(12)->assignRole([$adminRole]);
        User::find(13)->assignRole([$grCreatorRole]);
        User::find(14)->assignRole([$prViewerRole, $poRequestorRole]);
        User::find(15)->assignRole([$grCreatorRole]);
        User::find(16)->assignRole([$prApproverRole, $grManagerRole]);
        User::find(17)->assignRole([$poApproverRole, $prViewerRole]);
        User::find(21)->assignRole([$poApproverRole]);
        User::find(22)->assignRole([$prViewerRole, $poRequestorRole]);
        User::find(23)->assignRole([$grCreatorRole]);
        User::find(24)->assignRole([$poApproverRole]);
        User::find(25)->assignRole([$grCreatorRole]);
        User::find(26)->assignRole([$grCreatorRole]);
        User::find(27)->assignRole([$grViewerRole, $poViewerRole]);
        User::find(28)->assignRole([$grViewerRole, $poViewerRole]);
        User::find(29)->assignRole([$grViewerRole, $poViewerRole]);
        User::find(30)->assignRole([$grCreatorRole, $grManagerRole]);
        User::find(31)->assignRole([$grCreatorRole]);
        User::find(32)->assignRole([$grCreatorRole]);
        User::find(33)->assignRole([$grViewerRole]);
    }
}
