<?php

namespace App\Services;

use App\Enum\PermissionsEnum;
use Illuminate\Support\Facades\Auth;

class MenuService
{
    protected $menus;

    public function getMenus()
    {
        $this->buildMenus();

        return $this->menus;
    }

    private function buildMenus()
    {

        $user        = Auth::user();
        $this->menus = [
            [
                'label'       => 'Purchase Requisition',
                'permissions' => $user->can(PermissionsEnum::ReadPR),
                'childrens'   => [
                    [
                        'label'       => 'PR Listing',
                        'permissions' => $user->can(PermissionsEnum::ReadPR),
                        'href'        => route('pr.index'),
                    ],
                    [
                        'label'       => 'Create PR',
                        'permissions' => $user->can(PermissionsEnum::CreatePR),
                        'href'        => route('pr.create'),
                    ],

                ],
            ],
            [
                'label'       => 'Purchase Order',
                'permissions' => $user->can(PermissionsEnum::ReadPO),
                'childrens'   => [
                    [
                        'label'       => 'PO Listing',
                        'permissions' => $user->can(PermissionsEnum::ReadPO),
                        'href'        => route('po.index'),
                    ],
                    [
                        'label'       => 'Create PO',
                        'permissions' => $user->can(PermissionsEnum::CreatePO),
                        'href'        => route('po.create'),
                    ],

                ],
            ],
            [
                'label'       => 'Goods Receipt',
                'permissions' => $user->can(PermissionsEnum::ReadGR),
                'childrens'   => [
                    [
                        'label'       => 'GR Listing',
                        'permissions' => $user->can(PermissionsEnum::ReadGR),
                        'href'        => route('gr.index'),
                    ],
                    [
                        'label'       => 'Create GR',
                        'permissions' => $user->can(PermissionsEnum::CreateGR),
                        'href'        => route('gr.create'),
                    ],

                ],
            ],
            [
                'label'       => 'Reports',
                'permissions' => true,
                'childrens'   => [
                    [
                        'label'       => 'PR Report',
                        'permissions' => true,
                        'href'        => route('report.pr'),
                    ],
                    [
                        'label'       => 'PO Report',
                        'permissions' => true,
                        'href'        => route('report.po'),
                    ],
                    [
                        'label'       => 'GR Report',
                        'permissions' => true,
                        'href'        => route('report.gr'),
                    ],
                    [
                        'label'       => 'Material Report',
                        'permissions' => true,
                        'href'        => route('report.material'),
                    ],
                    [
                        'label'       => ' PO History',
                        'permissions' => true,
                        'href'        => route('report.pohistory'),
                    ],
                ],
            ],
            [
                'label'       => 'Administration',
                'permissions' => $user->can(PermissionsEnum::Admin),
                'childrens'   => [
                    [
                        'label'       => 'Audit Trail',
                        'permissions' => $user->can(PermissionsEnum::Admin),
                        'href'        => route('audit.index'),
                    ],
                    [
                        'label'       => 'Vendors',
                        'permissions' => $user->can(PermissionsEnum::Admin),
                        'href'        => route('vendor.index'),
                    ],
                    [
                        'label'       => 'Materials',
                        'permissions' => $user->can(PermissionsEnum::Admin),
                        'href'        => route('material.index'),
                    ],
                    [
                        'label'       => 'Material Alt UOM',
                        'permissions' => $user->can(PermissionsEnum::Admin),
                        'href'        => route('altuom.index'),
                    ],
                    [
                        'label'       => 'Plants',
                        'permissions' => $user->can(PermissionsEnum::Admin),
                        'href'        => '',
                    ],
                    [
                        'label'       => 'Valuation Prices',
                        'permissions' => $user->can(PermissionsEnum::Admin),
                        'href'        => route('val_price.index'),
                    ],
                    [
                        'label'       => 'Net Prices',
                        'permissions' => $user->can(PermissionsEnum::Admin),
                        'href'        => route('net_price.index'),
                    ],
                    [
                        'label'       => 'Users',
                        'permissions' => $user->can(PermissionsEnum::Admin),
                        'href'        => route('user.index'),
                    ],
                    [
                        'label'       => 'Approvers',
                        'permissions' => $user->can(PermissionsEnum::Admin),
                        'href'        => route('approver.index'),
                    ],
                    [
                        'label'       => 'Material Purchasing Groups',
                        'permissions' => $user->can(PermissionsEnum::Admin),
                        'href'        => route('purchgrp.index'),
                    ],
                    [
                        'label'       => 'PR Controller Groups',
                        'permissions' => $user->can(PermissionsEnum::Admin),
                        'href'        => route('prctrlgrp.index'),
                    ],
                ],
            ],
        ];
    }
}
