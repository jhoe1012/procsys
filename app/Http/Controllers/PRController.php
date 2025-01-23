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
use App\Models\MaterialGroup;
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
        $user = $request->user();

        // Fetch user plants and approver sequence
        $userPlants = $user->plants->pluck('plant')->toArray();
        $approverSeq = $user->approvers
            ->firstWhere('type', 'pr')['seq'] ?? 0;

        // Initialize query with relationships
        $query = PrHeader::with(['prmaterials', 'plants'])
            ->whereIn('plant', $userPlants);

        // Check approval permission and filter
        if (Gate::allows('approve.pr')) {
            $query->where('appr_seq', '>=', $approverSeq);
        }

        $filters = [
            'pr_number_from' => fn($value) => request('pr_number_to')
                ? $query->whereBetween('pr_number', [
                    $value,
                    request('pr_number_to')
                ])
                : $query->where('pr_number', 'like', "%{$value}%"),
            'plant' => fn($value) => $query->where('plant', 'ilike', "%{$value}%"),
            'created_name' => fn($value) => $query->where('created_name', 'ilike', "%{$value}%"),
            'requested_by' => fn($value) => $query->where('requested_by', 'ilike', "%{$value}%"),
            'doc_date_from' => fn($value) => request('doc_date_to')
                ? $query->whereBetween('doc_date', [$value, request('doc_date_to')])
                : $query->whereDate('doc_date', $value),
            'updated_at_from' => fn($value) => request('updated_at_to')
                ? $query->whereBetween('updated_at', [$value, request('updated_at_to')])
                : $query->whereDate('updated_at', $value),
            'status' => fn($value) => $query->where('status', 'ilike', "%{$value}%"),

        ];

        // Apply filters dynamically
        foreach (request()->only(array_keys($filters)) as $field => $value) {
            if (!empty($value)) {
                $filters[$field]($value);
            }
        }

        $pr_header = $query->orderBy('status', 'desc')
            ->orderBy('doc_date', 'desc')
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
            'materialGroupsSupplies' => MaterialGroup::supplies()->pluck('mat_grp_code')->toArray(),
        ]);
    }

    public function copy(Request $request, $prnumber): Response
    {

        $pr_header = PrHeader::with('plants', 'prmaterials', 'prmaterials.altUoms', 'prmaterials.materialGroups', 'workflows', 'attachments')
            ->where('pr_number', $prnumber)
            ->firstOrFail();

        return Inertia::render('PR/Create', [
            'mat_code' => Material::select('mat_code as value', 'mat_code as label')->orderBy('mat_code')->get()->toArray(),
            'mat_desc' => Material::select('mat_desc as value', 'mat_desc as label')->orderBy('mat_desc')->get()->toArray(),
            'materialGroupsSupplies' =>  MaterialGroup::supplies()->pluck('mat_grp_code')->toArray(),
            'prheader' => new PRHeaderResource($pr_header),
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
            ->where('type', operator: Approvers::TYPE_PR)->orderBy('seq')->get();

        if ($approvers->isEmpty()) {
            return to_route("pr.edit", $pr_header->pr_number)->with('error', "No Approver Found.");
        }

        // delete approve status where user id is null to keep the status clean
        ApproveStatus::where('pr_number', $pr_header->pr_number)->whereNull('user_id')->delete();

        $approvers->each(function ($approver) use ($pr_header) {
            ApproveStatus::create([
                'pr_number' => $pr_header->pr_number,
                'status'    => $approver->desc,
                'position'  => $approver->position,
                'seq'       => $approver->seq,
            ]);
        });

        $firstApprover = $approvers->first();
        $pr_header->update([
            'status'   => $firstApprover->desc,
            'appr_seq' => $firstApprover->seq,
        ]);

        Mail::to($firstApprover->user->email)
            ->send(new PrForApprovalEmail(
                $firstApprover->user->name,
                $pr_header
            ));

        return to_route("pr.index")->with('success', "PR {$pr_header->pr_number} sent for approval.");
    }

    public function edit(Request $request, $prnumber)
    {

        $pr_header = PrHeader::with(
            'plants',
            'prmaterials',
            'prmaterials.altUoms',
            'prmaterials.materialGroups',
            'workflows',
            'attachments'
        )->where('pr_number', $prnumber)
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
            'materialGroupsSupplies' => MaterialGroup::select('mat_grp_code')->where('is_supplies', true)->pluck('mat_grp_code')->toArray(),
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            return  DB::transaction(function () use ($request, $id) {
                $pr_header = PrHeader::findOrFail($id);
                $pr_materials = collect($request->input('prmaterials'))
                    ->filter(fn($item) => !empty($item['mat_code'])
                        && ($item['qty_ordered'] === null || $item['qty_ordered'] === 0))
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
                        $pr_material->valuation_price = $item['valuation_price'];
                        $pr_material->conversion = $item['conversion'];
                        $pr_material->converted_qty = $item['converted_qty'];
                        $pr_material->item_text = $item['item_text'];
                        $pr_material->save();

                        return $item;
                    })->values();

                $total_pr_value = $pr_materials->filter(fn($item) => $item['status'] != 'X')->sum('total_value');
                $total_pr_value  = $total_pr_value != 0 ? $total_pr_value : $pr_header->total_pr_value;
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
        $pr_material = PrMaterial::where('pr_headers_id', $id)
            ->where('qty_ordered', '<=', 0)
            ->update(['status' => PrMaterial::FLAG_DELETE]);
        $pr_header->status = Str::ucfirst(ApproveStatus::CANCELLED);
        $pr_header->appr_seq = -1;
        $pr_header->save();
        return to_route("pr.edit", $pr_header->pr_number)->with('success', "{$pr_material} items discarded.");
    }
    public function flagDelete(Request $request)
    {
        $prMaterials = PrMaterial::whereIn('id', $request->input('ids'))->get();

        $toFlag = $prMaterials->filter(fn($material) => $material->qty_ordered === null || $material->qty_ordered === 0);
        $withOpenQty = $prMaterials->filter(fn($material) => $material->qty_ordered !== null && $material->qty_ordered > 0);

        DB::transaction(function () use ($toFlag) {
            foreach ($toFlag as $material) {
                $material->status = PrMaterial::FLAG_DELETE;
                $material->save();
            }

            if ($toFlag->isNotEmpty()) {
                $prHeader = $toFlag->first()->prheader;
                $prHeader->total_pr_value = PrMaterial::where('pr_headers_id', $prHeader->id)
                    ->where('status', '<>', 'X')
                    ->sum('total_value');
                $prHeader->save();
            }
        });

        if ($withOpenQty->isNotEmpty()) {
            return to_route("pr.edit", $prMaterials->first()->prheader->pr_number)
                ->with('error', "Item(s) with ordered quantities cannot be flagged for deletion.");
        }

        return to_route("pr.edit", $prMaterials->first()->prheader->pr_number)
            ->with('success', "Flagged item(s) for deletion.");
    }
    public function flagClose(Request $request)
    {
        $prMaterials = PrMaterial::whereIn('id', $request->input('ids'))->get();
        if ($prMaterials->isEmpty()) {
            return back()->with('error', 'No valid materials found to update.');
        }
        PrMaterial::whereIn('id', $prMaterials->pluck('id'))->update(['status' => PrMaterial::FLAG_CLOSE]);
        $prHeader = $prMaterials->first()->prheader;

        return to_route("pr.edit", $prHeader->pr_number)
            ->with('success', "Flagged item(s) for close.");
    }

    public function flagRemove(Request $request)
    {
        $prMaterials = PrMaterial::whereIn('id', $request->input('ids'))->get();
        if ($prMaterials->isEmpty()) {
            return back()->with('error', 'No valid materials found to update.');
        }
        PrMaterial::whereIn('id', $prMaterials->pluck('id'))->update(['status' => null]);
        $prHeader = $prMaterials->first()->prheader;

        return to_route("pr.edit", $prHeader->pr_number)
            ->with('success', "Cancelled flag for item(s).");
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
            'item_text' => strtoupper($item['item_text'])  ?? '',
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
            'valuation_price' => $item['valuation_price'],
            'conversion' => $item['conversion'],
            'converted_qty' => $item['converted_qty'],
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
