<?php

namespace App\Http\Controllers;

use App\Exports\GRReportExport;
use App\Exports\MaterialReportExport;
use App\Exports\POReportExport;
use App\Exports\PRReportExport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    public function prReport(Request $request)
    {
        return Inertia::render('Reports/PrReport', [
            'prReport' => $this->_getPrReport($request)->paginate(50)->onEachSide(5),
            'queryParams' => $request->query() ?: null,

        ]);
    }

    public function downloadPrReport(Request $request)
    {
        return Excel::download(
            new PRReportExport($this->_getPrReport($request)->get()->toArray()),
            'PR Report.xlsx',
            \Maatwebsite\Excel\Excel::XLSX
        );
    }

    public function poReport(Request $request)
    {
        return Inertia::render('Reports/PoReport', [
            'poReport' => $this->_getPoReport($request)->paginate(50)->onEachSide(5),
            'queryParams' => $request->query() ?: null,

        ]);
    }
    public function downloadPoReport(Request $request)
    {
        return Excel::download(
            new POReportExport($this->_getPoReport($request)->get()->toArray()),
            'PO Report.xlsx',
            \Maatwebsite\Excel\Excel::XLSX
        );
    }
    public function grReport(Request $request)
    {
        return Inertia::render('Reports/GrReport', [
            'grReport' => $this->_getGrReport($request)->paginate(50)->onEachSide(5),
            'queryParams' => $request->query() ?: null,

        ]);
    }
    public function downloadGrReport(Request $request)
    {
        return Excel::download(
            new GRReportExport($this->_getGrReport($request)->get()->toArray()),
            'GR Report.xlsx',
            \Maatwebsite\Excel\Excel::XLSX
        );
    }


    public function materialReport(Request $request)
    {
        // dd($this->_getMaterialReport($request)->get());
        return Inertia::render('Reports/MaterialReport', [
            'materialReport' => $this->_getMaterialReport($request)->paginate(50)->onEachSide(5),
            'queryParams' => $request->query() ?: null,

        ]);
    }
    public function downloadMaterialReport(Request $request)
    {
        return Excel::download(
            new MaterialReportExport($this->_getMaterialReport($request)->get()->toArray()),
            'Material Report.xlsx',
            \Maatwebsite\Excel\Excel::XLSX
        );
    }
    private function _getPrReport($request)
    {
        $query = DB::table('pr_headers')->select(
            'pr_materials.purch_grp',
            'pr_headers.pr_number',
            'po_headers.po_number',
            'pr_materials.item_no',
            'pr_materials.mat_code',
            'pr_materials.short_text',
            'pr_materials.qty',
            'pr_materials.unit',
            'pr_materials.qty_open',
            'po_materials.po_qty',
            'po_materials.unit as po_unit',
            'pr_headers.doc_date',
            'pr_materials.del_date',
            'pr_materials.price',
            'pr_materials.total_value',
            'pr_materials.currency',
            'pr_headers.release_date',
            'pr_headers.created_name',
            'pr_headers.requested_by',
            'pr_materials.status',
            'pr_headers.plant',
            'pr_headers.reason_pr'
        )
            ->join('pr_materials', 'pr_headers.id',  '=', 'pr_materials.pr_headers_id')
            ->leftJoin('po_materials', 'po_materials.pr_material_id', '=', 'pr_materials.id')
            ->leftJoin('po_headers', 'po_headers.id', '=', 'po_materials.po_header_id');

        if ($request->input('purch_grp')) {
            $query->where('pr_materials.purch_grp', 'ilike', "%" . $request->input('purch_grp') . "%");
        }
        if ($request->input('prnumber_from') && $request->input('prnumber_to')) {
            $query->whereBetween('pr_headers.pr_number', [$request->input('prnumber_from'), $request->input('prnumber_to')]);
        } elseif ($request->input('prnumber_from')) {
            $query->where('pr_headers.pr_number', 'ilike', "%" . $request->input('prnumber_from') . "%");
        }

        if ($request->input('ponumber_from') && $request->input('ponumber_to')) {
            $query->whereBetween('po_headers.po_number', [$request->input('ponumber_from'), $request->input('ponumber_to')]);
        } elseif ($request->input('ponumber_from')) {
            $query->where('po_headers.po_number', 'ilike', "%" . $request->input('ponumber_from') . "%");
        }

        if ($request->input('matcode_from') && $request->input('matcode_to')) {
            $query->whereBetween('pr_materials.mat_code', [$request->input('matcode_from'), $request->input('matcode_to')]);
        } elseif ($request->input('matcode_from')) {
            $query->where('pr_materials.mat_code', 'ilike', "%" . $request->input('matcode_from') . "%");
        }

        if ($request->input('short_text')) {
            $query->where('pr_materials.short_text', 'ilike', "%" . $request->input('short_text') . "%");
        }

        if ($request->input('request_date_from') && $request->input('request_date_to')) {
            $query->whereBetween('pr_headers.doc_date', [$request->input('request_date_from'), $request->input('request_date_to')]);
        } elseif ($request->input('request_date_from')) {
            $query->whereDate('pr_headers.doc_date',  $request->input('request_date_from'));
        }

        if ($request->input('deliv_date_from') && $request->input('deliv_date_to')) {
            $query->whereBetween('pr_materials.del_date', [$request->input('deliv_date_from'), $request->input('deliv_date_to')]);
        } elseif ($request->input('deliv_date_from')) {
            $query->whereDate('pr_materials.del_date',  $request->input('deliv_date_from'));
        }

        if ($request->input('deliv_date_from') && $request->input('deliv_date_to')) {
            $query->whereBetween('pr_materials.del_date', [$request->input('deliv_date_from'), $request->input('deliv_date_to')]);
        } elseif ($request->input('deliv_date_from')) {
            $query->whereDate('pr_materials.del_date',  $request->input('deliv_date_from'));
        }

        if ($request->input('release_date_from') && $request->input('release_date_to')) {
            $query->whereBetween('pr_headers.release_date', [$request->input('release_date_from'), $request->input('release_date_to')]);
        } elseif ($request->input('release_date_from')) {
            $query->whereDate('pr_headers.release_date',  $request->input('release_date_from'));
        }

        if ($request->input('created_name')) {
            $query->where('pr_headers.created_name', 'ilike', "%" . $request->input('created_name') . "%");
        }

        if ($request->input('plant')) {
            $query->where('pr_headers.plant', 'ilike', "%" . $request->input('plant') . "%");
        }

        $query->orderBy('pr_headers.pr_number')
            ->orderBy('pr_materials.item_no');

        return $query;
    }

    private function _getPoReport($request)
    {
        $query = DB::table('po_headers')->select(
            'po_headers.po_number',
            'po_headers.control_no',
            'gr_headers.gr_number',
            'gr_headers.actual_date',
            'po_materials.item_no',
            'po_headers.doc_date',
            'po_headers.deliv_date',
            'po_materials.purch_grp',
            'vendors.supplier',
            'vendors.name_1',
            'po_materials.mat_code',
            'po_materials.short_text',
            'po_materials.mat_grp',
            'po_materials.po_qty',
            'po_materials.unit',
            'po_materials.po_gr_qty',
            'gr_materials.gr_qty',
            'gr_materials.unit AS gr_unit',
            'po_materials.net_price',
            'po_materials.total_value',
            DB::raw('po_materials.net_price * gr_materials.gr_qty AS gr_total_value'),
            'po_materials.currency',
            'po_headers.plant',
            'po_headers.release_date',
            'po_materials.status',
            'po_headers.created_name',
            'po_headers.deliv_addr',
        )
            ->join('po_materials', 'po_materials.po_header_id',  '=', 'po_headers.id')
            ->Join('vendors', 'vendors.supplier', '=', 'po_headers.vendor_id')
            ->leftJoin('gr_materials', 'gr_materials.po_material_id', '=', 'po_materials.id')
            ->leftJoin('gr_headers', 'gr_headers.id', '=', 'gr_materials.gr_header_id');

        if ($request->input('doc_date_from') && $request->input('doc_date_to')) {
            $query->whereBetween('po_headers.doc_date', [$request->input('doc_date_from'), $request->input('doc_date_to')]);
        } elseif ($request->input('doc_date_from')) {
            $query->whereDate('po_headers.doc_date',  $request->input('doc_date_from'));
        }

        if ($request->input('deliv_date_from') && $request->input('deliv_date_to')) {
            $query->whereBetween('po_headers.deliv_date', [$request->input('deliv_date_from'), $request->input('deliv_date_to')]);
        } elseif ($request->input('deliv_date_from')) {
            $query->whereDate('po_headers.deliv_date',  $request->input('deliv_date_from'));
        }

        if ($request->input('purch_grp')) {
            $query->where('po_materials.purch_grp', 'ilike', "%" . $request->input('purch_grp') . "%");
        }

        if ($request->input('supplier_code')) {
            $query->where('po_headers.vendor_id', 'ilike', "%" . $request->input('supplier_code') . "%");
        }
        if ($request->input('supplier_name')) {
            $query->where('vendors.name_1', 'ilike', "%" . $request->input('supplier_name') . "%");
        }

        if ($request->input('ponumber_from') && $request->input('ponumber_to')) {
            $query->whereBetween('po_headers.po_number', [$request->input('ponumber_from'), $request->input('ponumber_to')]);
        } elseif ($request->input('ponumber_from')) {
            $query->where('po_headers.po_number', 'ilike', "%" . $request->input('ponumber_from') . "%");
        }

        if ($request->input('controlno_from') && $request->input('controlno_to')) {
            $query->whereBetween('po_headers.control_no', [$request->input('controlno_from'), $request->input('controlno_to')]);
        } elseif ($request->input('controlno_from')) {
            $query->where('po_headers.control_no', 'ilike', "%" . $request->input('controlno_from') . "%");
        }

        if ($request->input('matcode_from') && $request->input('matcode_to')) {
            $query->whereBetween('po_materials.mat_code', [$request->input('matcode_from'), $request->input('matcode_to')]);
        } elseif ($request->input('matcode_from')) {
            $query->where('po_materials.mat_code', 'ilike', "%" . $request->input('matcode_from') . "%");
        }

        if ($request->input('short_text')) {
            $query->where('po_materials.short_text', 'ilike', "%" . $request->input('short_text') . "%");
        }

        if ($request->input('release_date_from') && $request->input('release_date_to')) {
            $query->whereBetween('po_headers.release_date', [$request->input('release_date_from'), $request->input('release_date_to')]);
        } elseif ($request->input('release_date_from')) {
            $query->whereDate('po_headers.release_date',  $request->input('release_date_from'));
        }

        if ($request->input('created_name')) {
            $query->where('pr_headers.created_name', 'ilike', "%" . $request->input('created_name') . "%");
        }

        if ($request->input('plant')) {
            $query->where('pr_headers.plant', 'ilike', "%" . $request->input('plant') . "%");
        }

        $query->orderBy('po_headers.po_number')
            ->orderBy('po_materials.item_no');

        return $query;
    }
    private function _getGrReport($request)
    {
        $query = DB::table('gr_materials')->select(
            'gr_headers.gr_number',
            'gr_headers.po_number',
            'gr_headers.created_name',
            'vendors.supplier',
            'vendors.name_1',
            'gr_headers.plant',
            'gr_headers.entry_date',
            'gr_headers.actual_date',
            'gr_headers.delivery_note',
            'gr_headers.header_text',
            'gr_materials.item_no',
            'gr_materials.mat_code',
            'gr_materials.short_text',
            'gr_materials.gr_qty',
            'gr_materials.unit',
            'po_materials.po_gr_qty',
            'gr_materials.batch',
            'gr_materials.mfg_date',
            'gr_materials.sled_bbd',
            'gr_materials.po_item',
            'gr_materials.dci',
            'gr_materials.is_cancel',
            'gr_materials.cancel_datetime',
            'gr_materials.cancel_by'
        )
            ->join('gr_headers', 'gr_headers.id',  '=', 'gr_materials.gr_header_id')
            ->Join('vendors', 'vendors.supplier', '=', 'gr_headers.vendor_id')
            ->leftJoin('po_materials', 'po_materials.id', '=', 'gr_materials.po_material_id');

        if ($request->input('grnumber_from') && $request->input('grnumber_to')) {
            $query->whereBetween('gr_headers.gr_number', [$request->input('grnumber_from'), $request->input('grnumber_to')]);
        } elseif ($request->input('grnumber_from')) {
            $query->where('gr_headers.gr_number', 'ilike', "%" . $request->input('grnumber_from') . "%");
        }

        if ($request->input('ponumber_from') && $request->input('ponumber_to')) {
            $query->whereBetween('gr_headers.po_number', [$request->input('ponumber_from'), $request->input('ponumber_to')]);
        } elseif ($request->input('ponumber_from')) {
            $query->where('gr_headers.po_number', 'ilike', "%" . $request->input('ponumber_from') . "%");
        }

        if ($request->input('supplier_code')) {
            $query->where('gr_headers.vendor_id', 'ilike', "%" . $request->input('supplier_code') . "%");
        }
        if ($request->input('supplier_name')) {
            $query->where('vendors.name_1', 'ilike', "%" . $request->input('supplier_name') . "%");
        }

        if ($request->input('created_name')) {
            $query->where('gr_headers.created_name', 'ilike', "%" . $request->input('created_name') . "%");
        }
        if ($request->input('entry_date_from') && $request->input('entry_date_to')) {
            $query->whereBetween('gr_headers.entry_date', [$request->input('entry_date_from'), $request->input('entry_date_to')]);
        } elseif ($request->input('entry_date_from')) {
            $query->whereDate('gr_headers.entry_date',  $request->input('entry_date_from'));
        }
        if ($request->input('actual_date_from') && $request->input('actual_date_to')) {
            $query->whereBetween('gr_headers.actual_date', [$request->input('actual_date_from'), $request->input('actual_date_to')]);
        } elseif ($request->input('actual_date_from')) {
            $query->whereDate('gr_headers.actual_date',  $request->input('actual_date_from'));
        }
        if ($request->input('delivery_note')) {
            $query->where('gr_headers.delivery_note', 'ilike', "%" . $request->input('delivery_note') . "%");
        }
        if ($request->input('mat_code_from') && $request->input('mat_code_to')) {
            $query->whereBetween('gr_materials.mat_code', [$request->input('mat_code_from'), $request->input('mat_code_to')]);
        } elseif ($request->input('mat_code_from')) {
            $query->where('gr_materials.mat_code', 'ilike', "%" . $request->input('mat_code_from') . "%");
        }
        if ($request->input('short_text')) {
            $query->where('gr_materials.short_text', 'ilike', "%" . $request->input('short_text') . "%");
        }

        $query->orderBy('gr_headers.gr_number')
            ->orderBy('gr_materials.item_no');

        return $query;
    }

    public function _getMaterialReport($request)
    {
        $query = DB::table('materials')->select(
            'materials.mat_code',
            'materials.mat_desc',
            'materials.base_uom',
            'materials.order_uom',
            'alternative_uoms.alt_uom',
            'alternative_uoms.counter',
            'alternative_uoms.denominator',
            'alternative_uoms.ean_num',
            'alternative_uoms.ean_upc',
            'alternative_uoms.ean_category',
            'alternative_uoms.unit_of_weight'
        )->leftJoin('alternative_uoms', 'materials.mat_code', '=', 'alternative_uoms.mat_code');

        if ($request->input('mat_code_from') && $request->input('mat_code_to')) {
            $query->whereBetween('materials.mat_code', [$request->input('mat_code_from'), $request->input('mat_code_to')]);
        } elseif ($request->input('mat_code_from')) {
            $query->where('materials.mat_code', 'ilike', "%" . $request->input('mat_code_from') . "%");
        }
 
        if ($request->input('mat_desc')) {
            $query->where('materials.mat_desc', 'ilike', "%" . $request->input('mat_desc') . "%");
        }
        
        $query->orderBy('materials.mat_code')
            ->orderBy('alternative_uoms.counter');

        return $query;
    }
}
