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
        $importCbbRole  = Role::create(['name' => RolesEnum::ImportCBB->value]);
        $prodOrdCreatorRole = Role::create(['name' => RolesEnum::ProdOrdCreator->value]);
        $prodOrdViewerRole = Role::create(['name' => RolesEnum::ProdOrdViewer->value]);

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
        $readImportCbbPermission = Permission::create(['name' => PermissionsEnum::ReadImportCBB->value]);
        $createImportCbbPermission = Permission::create(['name' => PermissionsEnum::CreateImportCBB->value]);
        $updateImportCbbPermission = Permission::create(['name' => PermissionsEnum::UpdateImportCBB->value]);
        $deleteImportCbbPermission = Permission::create(['name' => PermissionsEnum::DeleteImportCBB->value]);
        $createProdOrdPermission = Permission::create(['name' => PermissionsEnum::CreateProdOrd->value]);
        $readProdOrdPermission = Permission::create(['name' => PermissionsEnum::ReadProdOrd->value]);
        $updateProdOrdPermission = Permission::create(['name' => PermissionsEnum::UpdateProdOrd->value]);
        $deleteProdOrdPermission = Permission::create(['name' => PermissionsEnum::DeleteProdOrd->value]);

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
        $importCbbRole->syncPermissions([$readImportCbbPermission, $createImportCbbPermission, $updateImportCbbPermission, $deleteImportCbbPermission]);
        $prodOrdCreatorRole->syncPermissions([$createProdOrdPermission, $readProdOrdPermission, $updateProdOrdPermission, $deleteProdOrdPermission]);
        $prodOrdViewerRole->syncPermissions([$readProdOrdPermission]);

        User::find(1)->assignRole([$prRequestorRole, $poRequestorRole, $grCreatorRole, $adminRole, $importCbbRole, $prodOrdCreatorRole]);
    }
}
