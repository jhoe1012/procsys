<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\PRHeaderResource;
use App\Mail\PrApprovedEmail;
use App\Mail\PrForApprovalEmail;
use App\Mail\PrRejectedReworkEmail;
use App\Models\Approvers;
use App\Models\ApproveStatus;
use App\Models\Material;
use App\Models\PrHeader;
use App\Models\PrMaterial;
use App\Services\AttachmentService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PRController extends Controller
{
    public function index(Request $request)
    {
        $query = PrHeader::query();

        $query = $query->with(['prmaterials', 'plants']);

        $user_plants = $request->user()->plants->map(function ($items) {
            return $items->plant;
        })->toArray();

        $query->whereIn('plant', $user_plants);

        if (Gate::allows('approve.pr')) {
            $seq = auth()->user()->approvers->filter(fn($item) => $item['type'] == 'pr')->values()[0]->seq;
            $query->where('appr_seq', '>=', $seq);
        }
        if (request('pr_number_from') && !request('pr_number_to')) {
            $query->where('pr_number', 'like', "%" . request('pr_number_from') . "%");
        }
        if (request('pr_number_from') &&  request('pr_number_to')) {
            $query->whereBetween('pr_number', [request('pr_number_from'), request('pr_number_to')]);
        }
        if (request('plant')) {
            $query->where('plant', 'ilike', "%" . request('plant') . "%");
        }
        if (request('requested_by')) {
            $query->where('requested_by', 'ilike', "%" . request('requested_by') . "%");
        }
        if (request('doc_date_from') && !request('doc_date_to')) {
            $query->whereDate('doc_date', request('doc_date_from'));
        }
        if (request('doc_date_from') && request('doc_date_to')) {
            $query->whereBetween('doc_date', [request('doc_date_from'), request('doc_date_to')]);
        }
        if (request('updated_at_from') && !request('updated_at_to')) {
            $query->whereDate('updated_at', request('updated_at_from'));
        }
        if (request('updated_at_from') && request('updated_at_to')) {
            $query->whereDate('updated_at',  '>=', request('updated_at_from'))
                ->whereDate('updated_at', '<=', request('updated_at_to'));
        }
        if (request('status')) {
            $query->where('status', 'ilike', "%" . request('status') . "%");
        }

        $pr_header = $query->orderBy('doc_date', 'desc')
            ->orderBy('pr_number', 'desc')
            ->paginate(50)
            ->onEachSide(5);

        return Inertia::render('PR/Index', [
            'pr_header' => PRHeaderResource::collection($pr_header),
            'queryParams' => $request->query() ?: null,
            'message' => ['success' => session('success'), 'error' => session('error')],
        ]);
    }

    public function create(): Response
    {

        return Inertia::render('PR/Create', [
            'mat_code' => Material::select('mat_code as value', 'mat_code as label')->orderBy('mat_code')->get()->toArray(),
            'mat_desc' => Material::select('mat_desc as value', 'mat_desc as label')->orderBy('mat_desc')->get()->toArray(),
        ]);
    }

    public function store(Request $request)
    {
        try {
            return DB::transaction(function () use ($request) {
                $pr_materials = collect($request->input('prmaterials'))
                    ->filter(fn($item) => !empty($item['mat_code']))
                    ->map(fn($item, $index) => new PrMaterial($this->_mapPrMaterialData($item, $index)))
                    ->values();
                $total_pr_value = $pr_materials->sum('total_value');
                $pr_header = PrHeader::create(array_merge(
                    $request->only([
                        'created_name',
                        'requested_by',
                        'plant',
                        'reason_pr',
                        'header_text',
                        'deliv_addr'
                    ]),
                    [
                        'doc_date' => Carbon::parse($request->input('doc_date'))->format('Y-m-d'),
                        'total_pr_value' => $total_pr_value,
                        'appr_seq' => 0,
                        'status' => Str::ucfirst(ApproveStatus::DRAFT),
                    ]
                ));
                $pr_header->prmaterials()->saveMany($pr_materials->all());

                if ($attachments = AttachmentService::handleAttachments($request)) {
                    $pr_header->attachments()->saveMany($attachments);
                }

                return to_route("pr.edit", $pr_header->pr_number)->with('success', "PR {$pr_header->pr_number} created.");
            }, 2);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            throw ValidationException::withMessages([
                'error' => 'An error occurred while creating the PR. Please try again.'
            ]);
        }
    }

    public function submit($id)
    {
        $pr_header = PrHeader::with('createdBy', 'workflows', 'attachments', 'prmaterials', 'plants')->findOrFail($id);

        $approvers = Approvers::where('amount_from', '<=', $pr_header->total_pr_value)
            ->where('plant', $pr_header->plant)
            ->where('type', Approvers::TYPE_PR)->orderBy('seq')->get();
        if ($approvers->count() > 0) {
            foreach ($approvers as $approver) {
                $approver_status = new ApproveStatus();
                $approver_status->pr_number = $pr_header->pr_number;
                $approver_status->status = $approver->desc;
                $approver_status->position = $approver->position;
                $approver_status->seq = $approver->seq;
                $approver_status->save();
            }

            $pr_header->status = $approvers[0]->desc;
            $pr_header->appr_seq = $approvers[0]->seq;
            $pr_header->save();

            $approvers = Approvers::with('user')
                ->where('plant', $pr_header->plant)
                ->where('type', Approvers::TYPE_PR)
                ->where('seq', 1)
                ->first();
            $pr_header->refresh();
            Mail::to($approvers->user->email)
                ->send(new PrForApprovalEmail(
                    $approvers->user->name,
                    $pr_header
                ));

            return to_route("pr.index")->with('success', "PR {$pr_header->pr_number} sent for approval.");
        }

        return to_route("pr.edit", $pr_header->pr_number)->with('error', "No Approver Found.");
    }

    public function edit(Request $request, $prnumber)
    {

        $pr_header = PrHeader::with('plants', 'prmaterials', 'workflows', 'attachments')
            ->where('pr_number', $prnumber)
            ->firstOrFail();

        $item_details = DB::select("SELECT b.mat_code , d.po_number AS doc , c.po_qty AS qty , c.unit AS unit, 'Ordered' AS sts, c.item_no AS itm
                                    FROM pr_headers a
                                    INNER JOIN pr_materials b ON
                                        b.pr_headers_id = a.id
                                    INNER JOIN po_materials c ON
                                        c.pr_material_id = b.id
                                    INNER JOIN po_headers d ON
                                        d.id = c.po_header_id
                                    LEFT JOIN gr_materials e ON
                                        e.po_material_id = c.id
                                    LEFT JOIN gr_headers f ON
                                        f.id = e.gr_header_id
                                    WHERE a.pr_number = {$pr_header->pr_number}
                                    AND ( c.status <> 'X'
                                        OR c.status IS NULL )
                                    UNION 
                                    SELECT b.mat_code , f.gr_number AS doc, e.gr_qty AS qty , e.unit AS unit, 'Received' AS sts, e.item_no AS itm
                                    FROM pr_headers a
                                    INNER JOIN pr_materials b ON
                                        b.pr_headers_id = a.id
                                    INNER JOIN po_materials c ON
                                        c.pr_material_id = b.id
                                    INNER JOIN po_headers d ON
                                        d.id = c.po_header_id
                                    LEFT JOIN gr_materials e ON
                                        e.po_material_id = c.id
                                    LEFT JOIN gr_headers f ON
                                        f.id = e.gr_header_id
                                    WHERE a.pr_number = {$pr_header->pr_number}
                                    AND ( c.status <> 'X'
                                    OR c.status IS NULL )
                                    ORDER BY
                                        doc, itm");
        $item_details = collect($item_details)
            ->filter(fn($item) => ! empty($item->doc))->values();

        return Inertia::render('PR/Edit', [
            'prheader' => new PRHeaderResource($pr_header),
            'mat_code' => Material::select('mat_code as value', 'mat_code as label')->get()->toArray(),
            'mat_desc' => Material::select('mat_desc as value', 'mat_desc as label')->get()->toArray(),
            'message' => ['success' => session('success'), 'error' => session('error')],
            'item_details' => $item_details,
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            return  DB::transaction(function () use ($request, $id) {
                $pr_header = PrHeader::findOrFail($id);
                $pr_materials = collect($request->input('prmaterials'))
                    ->filter(fn($item) => !empty($item['mat_code']))
                    ->map(fn($item, $index) => $this->_mapOrUpdatePrMaterial($item, $index, $pr_header->id))
                    ->map(function ($item) {
                        if (isset($item['id'])) {
                            $pr_material = PrMaterial::find($item['id']);
                        } else {
                            $pr_material = new PrMaterial();
                            $pr_material->pr_headers_id = $item['pr_headers_id'];
                        }
                        $pr_material->item_no = $item['item_no'];
                        $pr_material->mat_code = $item['mat_code'];
                        $pr_material->short_text = $item['short_text'];
                        $pr_material->qty = $item['qty'];
                        $pr_material->qty_open = $item['qty_open'];
                        $pr_material->price = $item['price'];
                        $pr_material->ord_unit = $item['ord_unit'];
                        $pr_material->per_unit = $item['per_unit'];
                        $pr_material->unit = $item['unit'];
                        $pr_material->total_value = $item['total_value'];
                        $pr_material->currency = $item['currency'];
                        $pr_material->del_date = $item['del_date'];
                        $pr_material->mat_grp = $item['mat_grp'];
                        $pr_material->purch_grp = $item['purch_grp'];
                        $pr_material->save();

                        return $item;
                    })->values();

                $total_pr_value = $pr_materials->filter(fn($item) => $item['status'] != 'X')->sum('total_value');
                $total_pr_value  = $total_pr_value != 0 ? $total_pr_value : $pr_header->total_pr_value ;
                $pr_header->update(
                    array_merge(
                        $request->only([
                            'created_name',
                            'requested_by',
                            'plant',
                            'reason_pr',
                            'header_text',
                            'deliv_addr'
                        ]),
                        [
                            'doc_date' => Carbon::parse($request->input('doc_date'))->format('Y-m-d'),
                            'total_pr_value' =>  $total_pr_value,
                            'appr_seq' => 0,
                            'status' => Str::ucfirst(ApproveStatus::DRAFT),
                        ]
                    )
                );

                if ($attachments = AttachmentService::handleAttachments($request)) {
                    $pr_header->attachments()->saveMany($attachments);
                }
                
                 return to_route("pr.edit", $pr_header->pr_number)->with('success', 'PR updated successfully');
            });
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            throw ValidationException::withMessages([
                'error' => 'An error occurred while creating the PR. Please try again.'
            ]);
        }
    }

    public function approve(Request $request)
    {
        // $type = [
        //     'approve' => ApproveStatus::APPROVED,
        //     'rework' => ApproveStatus::REWORKED,
        //     'reject' => ApproveStatus::REJECTED
        // ];

        $pr_header = PrHeader::with('createdBy', 'workflows', 'attachments', 'prmaterials', 'plants')
            ->where('pr_number', $request->pr_number)
            ->first();

        $approver = Approvers::with('user')
            ->where('user_id', Auth::user()->id)
            ->where('plant', $pr_header->plant)
            ->where('type', Approvers::TYPE_PR)
            ->first();

        $email_status = 0;
        if ($request->input('type') == ApproveStatus::APPROVED) {

            if ($pr_header->total_pr_value > $approver->amount_to) {
                $pr_header->appr_seq += 1;
                $approver_2nd = Approvers::with('user')
                    ->where('seq', $pr_header->appr_seq)
                    ->where('plant', $pr_header->plant)
                    ->where('type', Approvers::TYPE_PR)
                    ->first();
                $pr_header->status = $approver_2nd->desc;


                $email_status = 1;
            } elseif (
                $pr_header->total_pr_value  >= $approver->amount_from
                && $pr_header->total_pr_value  <= $approver->amount_to
            ) {
                $pr_header->status = Str::ucfirst(ApproveStatus::APPROVED);
                $pr_header->release_date = Carbon::now()->format('Y-m-d H:i:s');
                $email_status = 2;
            }
        } else {
            $pr_header->status = Str::ucfirst($request->input('type'));
            $pr_header->appr_seq = $request->input('type') == ApproveStatus::REWORKED ? 0 : -1;
            $approver_status =  ApproveStatus::where('seq', '!=',  $approver->seq)
                ->where('pr_number',  $pr_header->pr_number)
                ->whereNull('user_id')
                ->delete();
            $email_status = 3;
        }

        $pr_header->save();
        $approver_status =  ApproveStatus::where('seq', $approver->seq)
            ->where('pr_number',  $pr_header->pr_number)
            ->whereNull('user_id')
            ->first();
        $approver_status->status = Str::ucfirst($request->input('type'));
        $approver_status->approved_by = Auth::user()->name;
        $approver_status->user_id = Auth::user()->id;
        $approver_status->message = $request->message;
        $approver_status->approved_date = now();
        $approver_status->save();


        $pr_header->refresh();
        /**
         * Send email notification
         */
        switch ($email_status) {
            case 1:
                Mail::to($approver_2nd->user->email)
                    ->send(new PrForApprovalEmail(
                        $approver_2nd->user->name,
                        $pr_header
                    ));
                break;
            case 2:
                Mail::to($pr_header->createdBy->email)
                    ->send(new PrApprovedEmail(
                        $pr_header->createdBy->name,
                        $approver->user->email,
                        $pr_header
                    ));
                break;
            case 3:
                Mail::to($pr_header->createdBy->email)
                    ->send(new PrRejectedReworkEmail(
                        $pr_header->createdBy->name,
                        $approver->user->email,
                        $pr_header
                    ));
                break;
            default:
                # code...
                break;
        }


        return to_route("pr.index")->with(
            'success',
            sprintf("PR %s is %s", $pr_header->pr_number, Str::ucfirst($request->input('type')))
        );
    }

    public function discard($id)
    {
        $pr_header = PrHeader::findOrFail($id);
        $pr_material = PrMaterial::where('pr_headers_id', $id)->update(['status' => PrMaterial::FLAG_DELETE]);
        $pr_header->status = Str::ucfirst(ApproveStatus::CANCELLED);
        $pr_header->appr_seq = -1;
        return to_route("pr.edit", $pr_header->pr_number)->with('success', "{$pr_material} items discarded.");
    }
    public function flagDelete(Request $request)
    {
        foreach ($request->input('ids') as $id) {
            $pr_material = PrMaterial::findOrFail($id);
            $pr_material->status = PrMaterial::FLAG_DELETE;
            $pr_material->save();
        }

        $pr_header = PrHeader::findOrFail($pr_material->prheader->id);
        $pr_header->total_pr_value = PrMaterial::where('pr_headers_id', $pr_header->id)->where('status', '<>', 'X')->sum('total_value');
        $pr_header->save();

        // dd($pr_material->prheader->pr_number);
        return to_route("pr.edit", $pr_material->prheader->pr_number)->with('success', "Mark item(s) for deletion.");
    }
    public function flagComplete(Request $request)
    {

        foreach ($request->input('ids') as $id) {
            $pr_material = PrMaterial::findOrFail($id);
            $pr_material->status = PrMaterial::FLAG_CLOSE;
            $pr_material->save();
        }
        // dd($pr_material->prheader->pr_number);
        return to_route("pr.edit", $pr_material->prheader->pr_number)->with('success', "Mark item(s) for close.");
    }

    public function recall($id)
    {
        $prHeader = PrHeader::findOrFail($id);
        $prHeader->status = Str::ucfirst(ApproveStatus::DRAFT);
        $prHeader->appr_seq = 0;
        $prHeader->save();

        return to_route("pr.edit", $prHeader->pr_number)->with('success', "PR Recalled");
    }

    private function _mapPrMaterialData(array $item, int $index)
    {
        return [
            'item_no' => ($index + 1) * 10,
            'mat_code' => $item['mat_code'],
            'short_text' => $item['short_text'],
            'qty' => $item['qty'],
            'qty_open' => $item['qty'],
            'price' => $item['price'],
            'ord_unit' => $item['ord_unit'],
            'per_unit' => $item['per_unit'],
            'unit' => $item['unit'],
            'total_value' => $item['qty'] * $item['price'],
            'currency' => $item['currency'],
            'del_date' => Carbon::parse($item['del_date'])->format('Y-m-d'),
            'mat_grp' => $item['mat_grp'],
            'purch_grp' => $item['purch_grp'],
            'status' => $item['status'] ?? null,
        ];
    }

    private function _mapOrUpdatePrMaterial(array $item, int $index, int $pr_header_id)
    {
        return array_merge(
            $this->_mapPrMaterialData($item, $index),
            ['pr_headers_id' => $pr_header_id, 'id' => $item['id'] ?? null]
        );
    }
}
