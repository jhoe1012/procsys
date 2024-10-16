<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApproveStatusResource;
use App\Http\Resources\POHeaderResource;
use App\Http\Resources\PRMaterialsResource;
use App\Http\Resources\PRPOMaterialsResource;
use App\Http\Resources\VendorResource;
use App\Mail\PoApprovedEmail;
use App\Mail\PoForApprovalEmail;
use App\Mail\PoRejectedReworkEmail;
use App\Mail\PrForApprovalEmail;
use App\Models\Approvers;
use App\Models\ApproveStatus;
use App\Models\Attachment;
use App\Models\PoHeader;
use App\Models\PoMaterial;
use App\Models\PrHeader;
use App\Models\PrMaterial;
use App\Models\Vendor;
use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;


class POController extends Controller
{

    public function index(Request $request)
    {

        $query = PoHeader::query();
        $query = $query->with(['workflows', 'attachments', 'pomaterials', 'plants', 'vendors']);

        $user_plants = $request->user()->plants->map(function ($items) {
            return $items->plant;
        })->toArray();

        $query->whereIn('plant', $user_plants);

        if (Gate::allows('approve.po')) {
            $seq = auth()->user()->approvers->filter(fn($item) => $item['type'] == 'po')->values()[0]->seq ?? 0;
            $query->where('appr_seq', '>=', $seq);
        }

        if (request('po_number_from') && !request('po_number_to')) {
            $query->where('po_number', 'like', "%" . request('po_number_from') . "%");
        }
        if (request('po_number_from') &&  request('po_number_to')) {
            $query->whereBetween('po_number', [request('po_number_from'), request('po_number_to')]);
        }
        if (request('plant')) {
            $query->where('plant', 'ilike', "%" . request('plant') . "%");
        }
        if (request('vendor')) {
            $query->where('vendor_id', 'ilike', "%" . request('vendor') . "%");
        }
        if (request('created_name')) {
            $query->where('created_name', 'ilike', "%" . request('created_name') . "%");
        }
        if (request('doc_date_from') && !request('doc_date_to')) {
            $query->whereDate('doc_date', request('doc_date_from'));
        }
        if (request('doc_date_from') && request('doc_date_to')) {
            $query->whereBetween('doc_date', [request('doc_date_from'), request('doc_date_to')]);
        }
        if (request('status')) {
            $query->where('status', 'ilike', "%" . request('status') . "%");
        }


        $po_header = $query->orderBy('doc_date', 'desc')
            ->orderBy('po_number', 'desc')
            ->paginate(20)
            ->onEachSide(5);

        // dd($po_header);
        // echo "<pre>";
        // print_r(POHeaderResource::collection($po_header));
        // echo "</pre>";

        return Inertia::render('PO/Index', [
            'po_header' => POHeaderResource::collection($po_header),
            'queryParams' => $request->query() ?: null,
            'message' => ['success' => session('success'), 'error' => session('error')],
        ]);
    }
    public function create(): Response
    {
        // $vendors = ;
        // dd();
        return Inertia::render('PO/Create', [
            'vendors' => Vendor::selectRaw('supplier as value , supplier || \' - \'||name_1 as label')->orderBy('name_1')->get()->toArray()
        ]);
    }

    public function store(Request $request)
    {


        // $po_header_request = $request->all();
        $po_header = new PoHeader();
        $po_header->control_no = $request->input('control_no');
        $po_header->vendor_id = $request->input('vendor_id');
        $po_header->created_name = $request->input('created_name');
        $po_header->doc_date = $request->input('doc_date');
        $po_header->plant = $request->input('plant');
        $po_header->header_text = $request->input('header_text');
        $po_header->approver_text = $request->input('approver_text');
        $po_header->total_po_value = $request->input('total_po_value');
        $po_header->deliv_addr = $request->input('deliv_addr');
        $po_header->deliv_date = $request->input('deliv_date');
        $po_header->notes = $request->input('notes');
        $po_header->status = Str::ucfirst(ApproveStatus::DRAFT);
        $po_header->appr_seq = 0;
        $po_header->save();

        $po_materials = [];

        $po_materials = collect($request->input('pomaterials'))
            ->filter(fn($item) => ! empty($item['mat_code']))
            ->values()
            ->map(
                fn($item, $index) => new PoMaterial([
                    'pr_material_id' => $item['pr_material_id'],
                    'item_no' => ($index + 1) * 10,
                    'mat_code' => $item['mat_code'],
                    'short_text' => $item['short_text'],
                    'po_qty' => $item['po_qty'],
                    'po_gr_qty' => $item['po_qty'],
                    'net_price' => $item['net_price'],
                    'per_unit' => $item['per_unit'],
                    'unit' => $item['unit'],
                    'total_value' => $item['total_value'],
                    'item_free' => $item['item_free'] ?? false,
                    'currency' => $item['currency'],
                    'del_date' => Carbon::parse($item['del_date'])->format('Y-m-d'),
                    'mat_grp' => $item['mat_grp'],
                    'requested_by' => $item['requested_by'],
                    'pr_number' => $item['pr_number'],
                    'pr_item' => $item['pr_item'],
                    'item_text' => $item['item_text'] ?? '',
                    'conversion' => $item['conversion'],
                    'denominator' => $item['denominator'],
                    'converted_qty' => $item['converted_qty'],
                    'pr_unit' => $item['pr_unit'],
                    'purch_grp' => $item['purch_grp'] ?? '',

                ])
            );

        // if (!empty($request->input('pomaterials'))) {
        //     foreach ($request->input('pomaterials') as $item) {
        //         if (isset($item['mat_code'])) {
        //             $po_materials[] = new PoMaterial([
        //                 'pr_material_id' => $item['pr_material_id'],
        //                 'item_no' => $item['item_no'],
        //                 'mat_code' => $item['mat_code'],
        //                 'short_text' => $item['short_text'],
        //                 'po_qty' => $item['po_qty'],
        //                 'po_gr_qty' => $item['po_qty'],
        //                 'net_price' => $item['net_price'],
        //                 'per_unit' => $item['per_unit'],
        //                 'unit' => $item['unit'],
        //                 'total_value' => $item['total_value'],
        //                 'item_free' => $item['item_free'] ?? false,
        //                 'currency' => $item['currency'],
        //                 'del_date' => Carbon::parse($item['del_date'])->format('Y-m-d'),
        //                 'mat_grp' => $item['mat_grp'],
        //                 'requested_by' => $item['requested_by'],
        //                 'pr_number' => $item['pr_number'],
        //                 'pr_item' => $item['pr_item'],
        //                 'item_text' => $item['item_text'] ?? '',
        //                 'conversion' => $item['conversion'],
        //                 'denominator' => $item['denominator'],
        //                 'converted_qty' => $item['converted_qty'],
        //                 'pr_unit' => $item['pr_unit'],
        //             ]);
        //         }
        //     }
        // }

        $po_header->refresh();

        $po_header->pomaterials()->saveMany($po_materials);
        // update PR Materials
        $this->_updatePrMaterial($po_materials);

        if ($request->hasFile('attachment')) {
            $files = [];
            // $allowedfileExtension = ['pdf', 'jpg', 'png', 'docx', 'xlsx'];
            foreach ($request->file('attachment') as $file) {
                $filename = $file->getClientOriginalName();
                $filepath = time() . "_" . $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $check = in_array(strtolower($extension), Attachment::ALLOWED_FILES);
                if ($check) {
                    $file->move(public_path('attachments'), $filepath);
                    $files[] = new Attachment([
                        'filename' => $filename,
                        'filepath' => 'attachments/' . $filepath,
                    ]);
                }
            }
            $po_header->attachments()->saveMany($files);
        }


        return to_route("po.edit",  $po_header->po_number)->with('success', "PO {$po_header->po_number} created.");
    }
    public function edit(Request $request, $ponumber)
    {
        $po_header = PoHeader::with(['workflows', 'attachments', 'pomaterials', 'pomaterials.prmaterials', 'plants', 'vendors'])
            ->where('po_number', $ponumber)
            ->firstOrFail();
        return Inertia::render('PO/Edit', [
            'vendors' => Vendor::selectRaw('supplier as value , supplier || \' - \'||name_1 as label')->orderBy('name_1')->get()->toArray(),
            'poheader' => new POHeaderResource($po_header),
            'message' => ['success' => session('success'), 'error' => session('error')]
        ]);
    }
    public function update(Request $request, $id)
    {

        // $po_header = new PoHeader();
        $po_header = PoHeader::findOrFail($id);
        $po_header->control_no = $request->input('control_no');
        $po_header->vendor_id = $request->input('vendor_id');
        $po_header->created_name = $request->input('created_name');
        $po_header->doc_date = $request->input('doc_date');
        $po_header->plant = $request->input('plant');
        $po_header->header_text = $request->input('header_text');
        $po_header->approver_text = $request->input('approver_text');
        $po_header->total_po_value = $request->input('total_po_value');
        $po_header->deliv_addr = $request->input('deliv_addr');
        $po_header->deliv_date = $request->input('deliv_date');
        $po_header->notes = $request->input('notes');
        $po_header->status = Str::ucfirst(ApproveStatus::DRAFT);
        $po_header->appr_seq = 0;
        $po_header->save();
        //   dd($request->input('pomaterials'));
        // $po_materials = [];

        $po_materials = collect($request->input('pomaterials'))
            ->filter(fn($item) => ! empty($item['mat_code']))
            ->values();


        // if (!empty($request->input('pomaterials'))) {
        foreach ($po_materials as $key => $item) {
            // if (isset($item['mat_code'])) {
            $converted_qty_old_value = 0;
            if (isset($item['id'])) {
                $po_material = POMaterial::find($item['id']);
                $converted_qty_old_value = $po_material->converted_qty;
            } else {
                $po_material = new POMaterial();
                $po_material->po_header_id = $po_header->id;
            }

            if ($po_material instanceof PoMaterial) {
                $po_material->pr_material_id = $item['pr_material_id'] ?? $po_material->pr_material_id;
                $po_material->item_no = ($key + 1) * 10; // $item['item_no'];
                $po_material->mat_code = $item['mat_code'];
                $po_material->short_text = $item['short_text'];
                $po_material->po_qty = $item['po_qty'];
                $po_material->po_gr_qty = $item['po_qty'];
                $po_material->net_price = $item['net_price'];
                $po_material->per_unit = $item['per_unit'];
                $po_material->unit = $item['unit'];
                $po_material->total_value = $item['total_value'];
                $po_material->item_free = $item['item_free'] ?? false;
                $po_material->currency = $item['currency'];
                $po_material->del_date = $item['del_date'];
                $po_material->mat_grp = $item['mat_grp'];
                $po_material->requested_by = $item['requested_by'];
                $po_material->pr_number = $item['pr_number'];
                $po_material->pr_item = $item['pr_item'];
                $po_material->item_text = $item['item_text'] ?? null;
                $po_material->conversion = $item['conversion'];
                $po_material->denominator = $item['denominator'];
                $po_material->converted_qty = $item['converted_qty'];
                $po_material->pr_unit = $item['pr_unit'];
                $po_material->purch_grp = $item['purch_grp'] ?? null;
                $po_material->save();

                if ($po_material->prmaterials instanceof PrMaterial) {

                    $po_material->prmaterials->qty_open  = ($converted_qty_old_value + $po_material->prmaterials->qty_open) - $po_material->converted_qty;
                    $po_material->prmaterials->qty_ordered = ($converted_qty_old_value - $po_material->prmaterials->qty_ordered) + $po_material->converted_qty;
                    $po_material->prmaterials->save();
                }
            }

            // }
        }
        // }


        $po_header->refresh();
        // $po_header->pomaterials()->saveMany($po_materials);

        if ($request->hasFile('attachment')) {
            $files = [];
            // $allowedfileExtension = ['pdf', 'jpg', 'png', 'docx', 'xlsx'];
            foreach ($request->file('attachment') as $file) {
                $filename = $file->getClientOriginalName();
                $filepath = time() . "_" . $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                if (in_array(strtolower($extension), Attachment::ALLOWED_FILES)) {
                    $file->move(public_path('attachments'), $filepath);
                    $files[] = new Attachment([
                        'filename' => $filename,
                        'filepath' => 'attachments/' . $filepath,
                    ]);
                }
            }
            $po_header->attachments()->saveMany($files);
        }

        return to_route("po.edit", $po_header->po_number)->with('success', "PO {$po_header->po_number} updated.");
    }
    public function submit($id)
    {

        $po_header = POHeader::with('createdBy')->findOrFail($id);

        $approvers = Approvers::where('amount_from', '<=', $po_header->total_po_value)
            ->where('plant', $po_header->plant)
            ->where('type', Approvers::TYPE_PO)->orderBy('seq')->get();

        if ($approvers->count() > 0) {
            foreach ($approvers as $approver) {
                $approver_status = new ApproveStatus();
                $approver_status->po_number = $po_header->po_number;
                $approver_status->status = $approver->desc;
                $approver_status->position = $approver->position;
                $approver_status->seq = $approver->seq;
                $approver_status->save();
            }

            $po_header->status = $approvers[0]->desc;
            $po_header->appr_seq = $approvers[0]->seq;
            $po_header->save();

            $approvers = Approvers::with('user')
                ->where('plant', $po_header->plant)
                ->where('type', Approvers::TYPE_PO)
                ->where('seq', 1)
                ->first();




            Mail::to($approvers->user->email)
                ->send(new PoForApprovalEmail(
                    $approvers->user->name,
                    $po_header
                ));
            // Mail::to($approvers->user->email)
            //     ->send(new PrForApprovalEmail(
            //         $approvers->user->name,
            //         $po_header
            //     ));

            return to_route("po.index")->with('success', "PR {$po_header->po_number} sent for approval.");
        }

        return to_route("po.index")->with('error', "No Approver Found.");
    }
    public function discard($id)
    {
        $po_header = PoHeader::with(['pomaterials', 'pomaterials.prmaterials'])->findOrFail($id);


        foreach ($po_header->pomaterials as $pomaterial) {
            $pomaterial->status = PoMaterial::FLAG_DELETE;
            $pomaterial->save();
            //update open and order qty in pr
            $pomaterial->prmaterials->qty_open +=  $pomaterial->converted_qty;
            $pomaterial->prmaterials->qty_ordered -= $pomaterial->converted_qty;
            $pomaterial->prmaterials->save();
        }
        $po_header->status = Str::ucfirst(ApproveStatus::CANCELLED);
        $po_header->appr_seq = -1;

        $po_header->save();


        // $update_po_material = PoMaterial::where('po_header_id', $id)->update(['status' => 'X']);
        // $po_materials = PoMaterial::with('prmaterials')->where()

        // if ($po_material->prmaterials instanceof PrMaterial) {

        //     $po_material->prmaterials->qty_open  = ($converted_qty_old_value + $po_material->prmaterials->qty_open) - $po_material->converted_qty;
        //     $po_material->prmaterials->qty_ordered = ($converted_qty_old_value - $po_material->prmaterials->qty_ordered) + $po_material->converted_qty;
        //     $po_material->prmaterials->save();
        // }

        return to_route("po.edit", $po_header->po_number)->with('success', "Purchase order discarded.");
    }
    public function approve(Request $request)
    {

        // $type = [
        //     'approve' => ApproveStatus::APPROVED,
        //     'rework' => ApproveStatus::REWORKED,
        //     'reject' => ApproveStatus::REJECTED
        // ];

        $po_header = PoHeader::with('pomaterials.prmaterials')
            ->where('po_number', $request->input('po_number'))
            ->first();

        $approver = Approvers::where('user_id', Auth::user()->id)
            ->where('plant', $po_header->plant)
            ->where('type', Approvers::TYPE_PO)->first();
        $email_status = 0;
        if ($request->input('type') == ApproveStatus::APPROVED) {
            if ($po_header->total_po_value > $approver->amount_to) {
                $po_header->appr_seq += 1;
                $approver_2nd = Approvers::where('seq', $po_header->appr_seq)
                    ->where('plant', $po_header->plant)
                    ->where('type', Approvers::TYPE_PO)->first();
                $po_header->status = $approver_2nd->desc;
                $email_status = 1;
            } elseif (
                $po_header->total_po_value  >= $approver->amount_from
                && $po_header->total_po_value  <= $approver->amount_to
            ) {
                $po_header->status = Str::ucfirst(ApproveStatus::APPROVED);
                $po_header->release_date = Carbon::now()->format('Y-m-d H:i:s');
                $email_status = 2;
            }
        } else {
            $po_header->status = Str::ucfirst($request->input('type'));
            $po_header->appr_seq = $request->input('type') == ApproveStatus::REWORKED ? 0 : -1;
            $approver_status =  ApproveStatus::where('seq', '!=',  $approver->seq)
                ->where('po_number',  $po_header->po_number)
                ->whereNull('user_id')
                ->delete();
            $email_status = 3;
        }

        $po_header->save();
        $approver_status =  ApproveStatus::where('seq', $approver->seq)
            ->where('po_number',  $po_header->po_number)
            ->whereNull('user_id')
            ->first();

        $approver_status->status = Str::ucfirst($request->input('type'));
        $approver_status->approved_by = Auth::user()->name;
        $approver_status->user_id = Auth::user()->id;
        $approver_status->message = $request->message;
        $approver_status->approved_date = now();
        $approver_status->save();

        $po_header->refresh();
        /**
         * Send email notification
         */
        switch ($email_status) {
            case 1:
                Mail::to($approver_2nd->user->email)
                    ->send(new PoForApprovalEmail(
                        $approver_2nd->user->name,
                        $po_header
                    ));
                break;
            case 2:
                Mail::to($po_header->createdBy->email)
                    ->send(new PoApprovedEmail(
                        $po_header->createdBy->name,
                        $approver->user->email,
                        $po_header
                    ));
                break;
            case 3:
                Mail::to($po_header->createdBy->email)
                    ->send(new PoRejectedReworkEmail(
                        $po_header->createdBy->name,
                        $approver->user->email,
                        $po_header
                    ));
                break;
            default:
                # code...
                break;
        }

        return to_route("po.index")->with(
            'success',
            sprintf("PO %s is %s", $po_header->po_number, Str::ucfirst($request->input('type')))
        );
    }
    public function getApprovedPr(Request $request)
    {
        $doc_date = date('Y-m-d', strtotime($request->input('doc_date')));

        $pr_material = PrMaterial::with([
            'prheader',
            'altUoms',
            'materialNetPrices' => fn($query) =>
            $query->where('plant', $request->input('plant'))
                // ->where('vendor', $request->input('vendor'))
                ->whereDate('valid_from', '<=',  $doc_date)
                ->whereDate('valid_to', '>=', $doc_date)
        ])
            ->whereHas('prheader', fn($query) => $query->where('plant', $request->input('plant'))
                ->where('status', Str::ucfirst(ApproveStatus::APPROVED)))
            ->where('qty_open', '>', 0)
            ->whereNull('status')
            ->get();

        return PRMaterialsResource::collection($pr_material);

        // dd(PRMaterialsResource::collection($prs));
    }

    public function flagDelete(Request $request)
    {
        foreach ($request->input('ids') as $id) {
            $po_material = PoMaterial::findOrFail($id);
            $po_material->status = PoMaterial::FLAG_DELETE;
            $po_material->save();
        }
        return to_route("po.edit", $po_material->poheader->po_number)->with('success', "Mark id(s) for deletion.");
    }
    public function flagComplete(Request $request)
    {
        foreach ($request->input('ids') as $id) {
            $po_material = PoMaterial::findOrFail($id);
            $po_material->status = PoMaterial::FLAG_DELIVER;
            $po_material->save();
        }
        return to_route("po.edit", $po_material->poheader->po_number)->with('success', "Mark item(s) for delivered.");
    }
    public function printPo(Request $request, $id)
    {
        $poHeader = PoHeader::with([
            'plants',
            'vendors',
            'pomaterials.taxClass',
            'workflows' => fn($query) => $query->where('status', Str::ucfirst(ApproveStatus::APPROVED)),
            'pomaterials' => fn($query) => $query->whereNull('status')
        ])->findOrFail($id);

        //   dd($poHeader);

        $prNumbers = $poHeader->pomaterials->pluck('pr_number')->unique()->implode('/');
        $approvers = $poHeader->workflows->pluck('approved_by')->implode('/');

        return view('print.po', ['poHeader' => $poHeader, 'prNumbers' => $prNumbers, 'approvers' => $approvers]);
    }

    public function recall($id)
    {
        $poHeader = PoHeader::findOrFail($id);
        $poHeader->status = Str::ucfirst(ApproveStatus::DRAFT);
        $poHeader->appr_seq = 0;
        $poHeader->save();

        return to_route("po.edit", $poHeader->po_number)->with('success', "PO Recalled");
    }
    function updateControlNo(Request $request)
    {

        $po_header = PoHeader::findOrFail($request->input('id'));
        $po_header->control_no = $request->input('control_no');
        $po_header->save();

        return to_route("po.index")->with(
            'success',
            sprintf("PO %s control has been updated to %s.", $po_header->po_number,  $po_header->control_no)
        );
    }
    private function _updatePrMaterial($pomaterials): void
    {

        foreach ($pomaterials as $pomaterial) {
            if ($pomaterial->prmaterials instanceof PrMaterial) {
                $pomaterial->prmaterials->qty_open -= $pomaterial->converted_qty;
                $pomaterial->prmaterials->qty_ordered += $pomaterial->converted_qty;
                $pomaterial->prmaterials->save();
            }
        }
    }
}
