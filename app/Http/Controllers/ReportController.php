<?php

namespace App\Http\Controllers;

use App\Exports\GRReportExport;
use App\Exports\MaterialReportExport;
use App\Exports\POHistoryExport;
use App\Exports\POReportExport;
use App\Exports\PRReportExport;
use App\Models\Vendor;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    public function prReport(Request $request)
    {
        return Inertia::render('Reports/PrReport', [
            'prReport' => $this->_getPrReport($request)
                ->paginate(perPage: 15)
                ->onEachSide(5)
                ->appends($request->query() ?: null),
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
            'poReport' => $this->_getPoReport($request)
                ->paginate(15)
                ->onEachSide(5)
                ->appends($request->query() ?: null),
            'queryParams'   => $request->query() ?: null,
            'vendorsChoice' => Vendor::getVendorsChoice(),

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
            'grReport' => $this->_getGrReport($request)
                ->paginate(15)
                ->onEachSide(5)
                ->appends($request->query() ?: null),
            'queryParams'   => $request->query() ?: null,
            'vendorsChoice' => Vendor::getVendorsChoice(),
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
        return Inertia::render('Reports/MaterialReport', [
            'materialReport' => $this->_getMaterialReport($request)
                ->paginate(15)
                ->onEachSide(5)
                ->appends($request->query() ?: null),
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

    public function poHistoryReport(Request $request)
    {
        return Inertia::render('Reports/PoHistoryReport', [
            'poHistories' => $this->_getPoHistory($request)
                ->paginate(50)
                ->onEachSide(2)
                ->appends($request->query() ?: null),
            'queryParams'   => $request->query() ?: null,
            'vendorsChoice' => Vendor::getVendorsChoice(),

        ]);
    }

    public function downloadPoHistoryReport(Request $request)
    {
        return Excel::download(
            new POHistoryExport($this->_getPoHistory($request)->get()->toArray()),
            'PO History Report.xlsx',
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
            'pr_materials.item_text',
            'pr_materials.qty',
            'pr_materials.ord_unit as unit',
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
            ->join('pr_materials', 'pr_headers.id', '=', 'pr_materials.pr_headers_id')
            ->leftJoin('po_materials', 'po_materials.pr_material_id', '=', 'pr_materials.id')
            ->leftJoin('po_headers', 'po_headers.id', '=', 'po_materials.po_header_id');
        $query->whereIn('pr_headers.plant', $this->_getUserPlant());

        // Define filterable fields and conditions
        $filters = [
            'prnumber_from' => fn ($value) => $request->input('prnumber_to')
                ? $query->whereBetween('pr_headers.pr_number', [$value, $request->input('prnumber_to')])
                : $query->where('pr_headers.pr_number', 'ilike', "%{$value}%"),
            'ponumber_from' => fn ($value) => $request->input('ponumber_to')
                ? $query->whereBetween('po_headers.po_number', values: [$value, $request->input('ponumber_to')])
                : $query->where('po_headers.po_number', 'ilike', "%{$value}%"),
            'matcode_from' => fn ($value) => $request->input('matcode_to')
                ? $query->whereBetween('pr_materials.mat_code', [$value, $request->input('matcode_to')])
                : $query->where('pr_materials.mat_code', 'ilike', "%{$value}%"),
            'request_date_from' => fn ($value) => $request->input('request_date_to')
                ? $query->whereBetween('pr_headers.doc_date', [$value, $request->input('request_date_to')])
                : $query->where('pr_headers.doc_date', 'ilike', "%{$value}%"),
            'deliv_date_from' => fn ($value) => $request->input('deliv_date_to')
                ? $query->whereBetween('pr_materials.del_date', [$value, $request->input('deliv_date_to')])
                : $query->where('pr_materials.del_date', 'ilike', "%{$value}%"),
            'release_date_from' => fn ($value) => $request->input('release_date_to')
                ? $query->whereBetween('pr_headers.release_date', [$value, $request->input('release_date_to')])
                : $query->where('pr_headers.release_date', 'ilike', "%{$value}%"),
            'created_name' => fn ($value) => $query->where('pr_headers.created_name', 'ilike', "%{$value}%"),
            'short_text'   => fn ($value) => $query->where('pr_materials.short_text', 'ilike', "%{$value}%"),
            'purch_grp'    => fn ($value) => $query->where('pr_materials.purch_grp', 'ilike', "%{$value}%"),
            'plant'        => fn ($value) => $query->where('pr_headers.plant', 'ilike', "%{$value}%"),
            'open_pr'      => fn ($value) => $query->where('pr_materials.qty_open', '>', 0),
        ];

        // Apply filters dynamically
        foreach (request()->only(array_keys($filters)) as $field => $value) {
            if (! empty($value)) {
                $filters[$field]($value);
            }
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
            // 'po_headers.deliv_date',
            DB::raw('CASE WHEN po_headers.is_mother_po = true THEN po_materials.del_date ELSE po_headers.deliv_date END AS deliv_date'),
            'po_materials.purch_grp',
            'vendors.supplier',
            'vendors.name_1',
            'po_materials.mat_code',
            'po_materials.short_text',
            'po_materials.item_text',
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
            DB::raw("CASE WHEN po_materials.status ='X' THEN 'Deleted' ELSE po_materials.status END AS status"),
            'po_headers.created_name',
            'po_headers.deliv_addr',
        )
            ->join('po_materials', 'po_materials.po_header_id', '=', 'po_headers.id')
            ->Join('vendors', 'vendors.supplier', '=', 'po_headers.vendor_id')
            ->leftJoin('gr_materials', 'gr_materials.po_material_id', '=', 'po_materials.id')
            ->leftJoin('gr_headers', 'gr_headers.id', '=', 'gr_materials.gr_header_id');

        $query->whereIn('po_headers.plant', $this->_getUserPlant());

        // Define filterable fields and conditions
        $filters = [
            'doc_date_from' => fn ($value) => $request->input('doc_date_to')
                ? $query->whereBetween('po_headers.doc_date', [$value, $request->input('doc_date_to')])
                : $query->where('po_headers.doc_date', 'ilike', "%{$value}%"),
            'deliv_date_from' => fn ($value) => $request->input('deliv_date_to')
                ? $query->whereBetween('po_materials.del_date', [$value, $request->input('deliv_date_to')])
                : $query->whereDate('po_materials.del_date', $value),
            'ponumber_from' => fn ($value) => $request->input('ponumber_to')
                ? $query->whereBetween('po_headers.po_number', [$value, $request->input('ponumber_to')])
                : $query->where('po_headers.po_number', 'ilike', "%{$value}%"),
            'controlno_from' => fn ($value) => $request->input('controlno_to')
                ? $query->whereBetween('po_headers.control_no', [$value, $request->input('controlno_to')])
                : $query->where('po_headers.control_no', 'ilike', "%{$value}%"),
            'matcode_from' => fn ($value) => $request->input('matcode_to')
                ? $query->whereBetween('po_materials.mat_code', [$value, $request->input('matcode_to')])
                : $query->where('po_materials.mat_code', 'ilike', "%{$value}%"),
            'release_date_from' => fn ($value) => $request->input('release_date_to')
                ? $query->whereBetween('po_headers.release_date', [$value, $request->input('release_date_to')])
                : $query->where('po_headers.release_date', 'ilike', "%{$value}%"),
            'purch_grp'    => fn ($value) => $query->where('po_materials.purch_grp', 'ilike', "%{$value}%"),
            'short_text'   => fn ($value) => $query->where('po_materials.short_text', 'ilike', "%{$value}%"),
            'created_name' => fn ($value) => $query->where('po_headers.created_name', 'ilike', "%{$value}%"),
            'plant'        => fn ($value) => $query->where('po_headers.plant', $value),
            'vendor'       => fn ($value) => $query->where('po_headers.vendor_id', $value),
            'open_po'      => fn ($value) => $query->where('po_materials.po_gr_qty', '>', 0),
        ];

        // Apply filters dynamically
        foreach (request()->only(array_keys($filters)) as $field => $value) {
            if (! empty($value)) {
                $filters[$field]($value);
            }
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
            'po_headers.control_no',
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
            'gr_materials.item_text',
            'gr_materials.gr_qty',
            'gr_materials.unit',
            'po_materials.po_gr_qty',
            'po_materials.net_price',
            DB::raw('po_materials.net_price * gr_materials.gr_qty AS total_value'),
            'gr_materials.batch',
            'gr_materials.mfg_date',
            'gr_materials.sled_bbd',
            'gr_materials.po_item',
            'gr_materials.dci',
            'gr_materials.is_cancel',
            'gr_materials.cancel_datetime',
            'users.name AS cancel_by'
        )
            ->join('gr_headers', 'gr_headers.id', '=', 'gr_materials.gr_header_id')
            ->Join('vendors', 'vendors.supplier', '=', 'gr_headers.vendor_id')
            ->leftJoin('po_materials', 'po_materials.id', '=', 'gr_materials.po_material_id')
            ->leftJoin('po_headers', 'po_headers.po_number', '=', 'gr_headers.po_number')
            ->leftJoin('users', 'gr_materials.cancel_by', '=', 'users.id');
        $query->whereIn('gr_headers.plant', $this->_getUserPlant());

        // Define filterable fields and conditions
        $filters = [
            'grnumber_from' => fn ($value) => $request->input('grnumber_to')
                ? $query->whereBetween('gr_headers.gr_number', [$value, $request->input('grnumber_to')])
                : $query->where('gr_headers.gr_number', 'ilike', "%{$value}%"),
            'ponumber_from' => fn ($value) => $request->input('ponumber_to')
                ? $query->whereBetween('gr_headers.po_number', [$value, $request->input('ponumber_to')])
                : $query->where('gr_headers.po_number', 'ilike', "%{$value}%"),
            'control_from' => fn ($value) => $request->input('control_to')
                ? $query->whereBetween('po_headers.control_no', [$value, $request->input('control_to')])
                : $query->where('po_headers.control_no', 'ilike', "%{$value}%"),
            'entry_date_from' => fn ($value) => $request->input('entry_date_to')
                ? $query->whereBetween('gr_headers.entry_date', [$value, $request->input('entry_date_to')])
                : $query->where('gr_headers.entry_date', 'ilike', "%{$value}%"),
            'actual_date_from' => fn ($value) => $request->input('actual_date_to')
                ? $query->whereBetween('gr_headers.actual_date', [$value, $request->input('actual_date_to')])
                : $query->where('gr_headers.actual_date', 'ilike', "%{$value}%"),
            'mat_code_from' => fn ($value) => $request->input('mat_code_to')
                ? $query->whereBetween('gr_materials.mat_code', [$value, $request->input('mat_code_to')])
                : $query->where('gr_materials.mat_code', 'ilike', "%{$value}%"),
            'supplier_code' => fn ($value) => $query->where('gr_headers.vendor_id', 'ilike', "%{$value}%"),
            'supplier_name' => fn ($value) => $query->where('vendors.name_1', 'ilike', "%{$value}%"),
            'created_name'  => fn ($value) => $query->where('gr_headers.created_name', 'ilike', "%{$value}%"),
            'delivery_note' => fn ($value) => $query->where('gr_headers.delivery_note', 'ilike', "%{$value}%"),
            'short_text'    => fn ($value) => $query->where('gr_materials.short_text', 'ilike', "%{$value}%"),
            'plant'         => fn ($value) => $query->where('gr_headers.plant', $value),
            'vendor'        => fn ($value) => $query->where('gr_headers.vendor_id', $value),
        ];

        // Apply filters dynamically
        foreach (request()->only(array_keys($filters)) as $field => $value) {
            if (! empty($value)) {
                $filters[$field]($value);
            }
        }

        $query->orderBy('gr_headers.gr_number')
            ->orderBy('gr_materials.item_no');

        return $query;
    }

    private function _getMaterialReport($request)
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
            $query->where('materials.mat_code', 'ilike', '%'.$request->input('mat_code_from').'%');
        }

        if ($request->input('mat_desc')) {
            $query->where('materials.mat_desc', 'ilike', '%'.$request->input('mat_desc').'%');
        }

        $query->orderBy('materials.mat_code')
            ->orderBy('alternative_uoms.counter');

        return $query;
    }

    private function _getPoHistory($request)
    {
        $query = DB::table('pr_headers')->select(
            'pr_headers.pr_number',
            'po_headers.po_number',
            'po_headers.control_no',
            'gr_headers.gr_number',
            'pr_headers.doc_date AS pr_doc_date',
            'po_headers.doc_date AS po_doc_date',
            'pr_materials.item_no AS pr_item_no',
            'pr_headers.status  AS pr_header_stat',
            'pr_headers.created_name AS pr_created_name',
            'pr_materials.del_date AS pr_deliv_date',
            //  DB::raw("to_char(pr_materials.del_date, 'YYYY/MM/DD') AS pr_deliv_date"),
            DB::raw("CASE WHEN pr_materials.status = 'X' THEN  pr_materials.qty * -1 ELSE pr_materials.qty END  AS pr_qty"),
            DB::raw("CASE WHEN pr_materials.status = 'X' THEN pr_materials.qty_open * -1 ELSE pr_materials.qty_open END  AS  pr_qty_open"),
            'pr_materials.ord_unit AS pr_unit',
            DB::raw("CASE WHEN pr_materials.status = 'X' THEN 'Deleted' END AS pr_mat_stat"),
            'po_materials.item_no AS po_item_no',
            DB::raw("CASE WHEN po_materials.status = 'X' THEN po_materials.po_qty *-1 ELSE  po_materials.po_qty END AS po_qty"),
            DB::raw("CASE WHEN po_materials.status = 'X' THEN po_materials.net_price *-1 ELSE po_materials.net_price END   AS net_price"),
            DB::raw("CASE WHEN po_materials.status = 'X' THEN po_materials.total_value *-1 ELSE po_materials.total_value END AS total_net_price"),
            DB::raw("CASE WHEN po_materials.status = 'X' THEN po_materials.po_gr_qty *-1 ELSE po_materials.po_gr_qty END AS po_open_qty"),
            'po_materials.unit AS po_unit',
            DB::raw("CASE WHEN po_materials.status = 'X' THEN 'Deleted' 
                                 WHEN po_materials.status = 'D' THEN 'Delivery Completed' 
                                 END  AS po_mat_stat"),
            'gr_materials.item_no AS gr_item_no',
            DB::raw('CASE WHEN gr_materials.is_cancel = TRUE THEN gr_materials.gr_qty * -1 ELSE gr_materials.gr_qty END AS gr_qty'),
            DB::raw('CASE WHEN gr_materials.is_cancel = TRUE THEN (gr_materials.gr_qty * po_materials.net_price) * -1 ELSE gr_materials.gr_qty * po_materials.net_price END AS gr_total'),
            'gr_materials.unit AS gr_unit',
            DB::raw("CASE WHEN gr_materials.is_cancel = TRUE THEN 'Deleted' END AS gr_mat_stat"),
            DB::raw("CASE WHEN  gr_materials.dci = TRUE THEN 'X' END AS dci"),
            'gr_headers.actual_date',
            'material_groups.mat_grp_desc',
            'vendors.supplier',
            'vendors.name_1',
            'po_headers.status AS po_header_stat',
            'po_headers.created_name AS po_created_name',
            DB::raw('CASE WHEN po_headers.is_mother_po = true THEN po_materials.del_date ELSE po_headers.deliv_date END AS po_deliv_date'),
            'po_headers.deliv_addr',
            DB::raw('CASE WHEN po_materials.mat_code IS NOT NULL THEN po_materials.mat_code ELSE pr_materials.mat_code END AS mat_code'),
            DB::raw('CASE WHEN po_materials.short_text IS NOT NULL THEN po_materials.short_text ELSE pr_materials.short_text END AS short_text'),
            DB::raw('CASE WHEN po_materials.item_text IS NOT NULL THEN po_materials.item_text ELSE pr_materials.item_text END AS item_text'),
            'gr_headers.created_name AS gr_created_name',
            'gr_headers.entry_date',
            'gr_headers.delivery_note',
            'gr_materials.mfg_date',
            'gr_materials.sled_bbd',
            'pr_headers.reason_pr',
            'po_headers.header_text AS po_header_text',
            'gr_headers.header_text  AS gr_header_text',
            DB::raw("plants.plant || ' - ' || plants.name1 AS plant_name"),
        )
            ->join('pr_materials', 'pr_headers.id', '=', 'pr_materials.pr_headers_id')
            ->leftJoin('po_materials', 'po_materials.pr_material_id', '=', 'pr_materials.id')
            ->leftJoin('po_headers', 'po_headers.id', '=', 'po_materials.po_header_id')
            ->leftJoin('gr_materials', 'gr_materials.po_material_id', '=', 'po_materials.id')
            ->leftJoin('gr_headers', 'gr_headers.id', '=', 'gr_materials.gr_header_id')
            ->leftJoin('vendors', 'vendors.supplier', '=', 'po_headers.vendor_id')
            ->leftJoin('plants', 'plants.plant', '=', 'pr_headers.plant')
            ->leftJoin('material_groups', 'material_groups.mat_grp_code', '=', 'pr_materials.mat_grp');
        // REMOVE DRAFT AND CANCELLED STATUS
        $query->where(fn ($q) => $q->where('pr_headers.appr_seq', '>', 0))
            ->whereIn('pr_headers.plant', $this->_getUserPlant());

        // Define filterable fields and conditions
        $filters = [
            'prnumber_from' => fn ($value) => $request->input('prnumber_to')
                ? $query->whereBetween('pr_headers.pr_number', [$value, $request->input('prnumber_to')])
                : $query->where('pr_headers.pr_number', 'ilike', "%{$value}%"),
            'ponumber_from' => fn ($value) => $request->input('ponumber_to')
                ? $query->whereBetween('po_headers.po_number', values: [$value, $request->input('ponumber_to')])
                : $query->where('po_headers.po_number', 'ilike', "%{$value}%"),
            'controlno_from' => fn ($value) => $request->input('controlno_to')
                ? $query->whereBetween('po_headers.control_no', values: [$value, $request->input('controlno_to')])
                : $query->where('po_headers.control_no', 'ilike', "%{$value}%"),
            'grnumber_from' => fn ($value) => $request->input('grnumber_to')
                ? $query->whereBetween('gr_headers.gr_number', values: [$value, $request->input('grnumber_to')])
                : $query->where('gr_headers.gr_number', 'ilike', "%{$value}%"),
            'matcode_from' => fn ($value) => $request->input('matcode_to')
                ? $query->where(fn (Builder $q) => $q->whereBetween('pr_materials.mat_code', [$value, $request->input('matcode_to')])
                    ->orWhereBetween('po_materials.mat_code', [$value, $request->input('matcode_to')]))
                : $query->where(fn (Builder $q) => $q->where('pr_materials.mat_code', 'ilike', "%{$value}%")
                    ->orWhere('po_materials.mat_code', 'ilike', "%{$value}%")),
            'short_text' => fn ($value) => $query->where(fn (Builder $q) => $q->where('pr_materials.short_text', 'ilike', "%{$value}%")
                ->orwhere('po_materials.short_text', 'ilike', "%{$value}%")),
            'deliv_date_from' => fn ($value) => $request->input('deliv_date_to')
                ? $query->whereBetween('po_materials.del_date', [$value, $request->input('deliv_date_to')])
                : $query->whereDate('po_materials.del_date', $value),
            'open_po' => fn ($value) => $query->where('po_materials.po_gr_qty', '>', 0),
            'open_pr' => fn ($value) => $query->where('pr_materials.qty_open', '>', 0),
            'plant'   => fn ($value) => $query->where('pr_headers.plant', $value),
            'vendor'  => fn ($value) => $query->where('po_headers.vendor_id', $value),
        ];
        // Apply filters dynamically
        foreach (request()->only(array_keys($filters)) as $field => $value) {
            if (! empty($value)) {
                $filters[$field]($value);
            }
        }

        $query->orderBy('pr_headers.pr_number')
            ->orderBy('pr_materials.item_no')->get();

        return $query;
    }

    private function _getUserPlant(): array
    {
        return Auth::user()->plants->pluck('plant')->toArray();
    }
}
