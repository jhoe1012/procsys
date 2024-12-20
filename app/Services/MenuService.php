<?php

namespace App\Services;

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
        // dd(Auth::user()->can('approve.po'));
        $this->menus = [
            [
                'label' => 'Purchase Requisition',
                'permissions' => Auth::user()->can('read.pr'),
                'childrens' => [
                    [
                        'label' => 'PR Listing',
                        'permissions' => Auth::user()->can('read.pr'),
                        'href' => route('pr.index'),
                    ],
                    [
                        'label' => 'Create PR',
                        'permissions' => Auth::user()->can('create.pr'),
                        'href' => route('pr.create'),
                    ],

                ]
            ],
            [
                'label' => 'Purchase Order',
                'permissions' => Auth::user()->can('read.po'),
                'childrens' => [
                    [
                        'label' => 'PO Listing',
                        'permissions' => Auth::user()->can('read.po'),
                        'href' => route('po.index'),
                    ],
                    [
                        'label' => 'Create PO',
                        'permissions' => Auth::user()->can('create.po'),
                        'href' => route('po.create'),
                    ],

                ]
            ],
            [
                'label' => 'Goods Receipt',
                'permissions' => Auth::user()->can('read.gr'),
                'childrens' => [
                    [
                        'label' => 'GR Listing',
                        'permissions' => Auth::user()->can('read.gr'),
                        'href' => route('gr.index'),
                    ],
                    [
                        'label' => 'Create GR',
                        'permissions' => Auth::user()->can('create.gr'),
                        'href' => route('gr.create'),
                    ],

                ]
            ],
            [
                'label' => 'Reports',
                'permissions' => true,
                'childrens' => [
                    [
                        'label' => 'PR Report',
                        'permissions' =>true,
                        'href' => route('report.pr'),
                    ],
                    [
                        'label' => 'PO Report',
                        'permissions' =>true,
                        'href' => route('report.po'),
                    ],
                    [
                        'label' => 'GR Report',
                        'permissions' =>true,
                        'href' => route('report.gr'),
                    ],
                    [
                        'label' => 'Material Report',
                        'permissions' =>true,
                        'href' => route('report.material'),
                    ]
                ]
            ],
            [
                'label' => 'Administration',
                'permissions' => Auth::user()->can('admin'),
                'childrens' => [
                    [
                        'label' => 'Vendor',
                        'permissions' => Auth::user()->can('admin'),
                        'href' => route('vendor.index'),
                    ],
                    [
                        'label' => 'Material',
                        'permissions' => Auth::user()->can('admin'),
                        'href' => '',
                    ],
                    [
                        'label' => 'Valuation Price',
                        'permissions' => Auth::user()->can('admin'),
                        'href' => route('val_price.index'),
                    ],
                    [
                        'label' => 'Net Price',
                        'permissions' => Auth::user()->can('admin'),
                        'href' => route('net_price.index'),
                    ],
                    [
                        'label' => 'User and Access',
                        'permissions' => Auth::user()->can('admin'),
                        'href' => '',
                    ],
                    [
                        'label' => 'Approvers',
                        'permissions' => Auth::user()->can('admin'),
                        'href' => route('approver.index'),
                    ],
                ]
            ],
        ];
    }
}
