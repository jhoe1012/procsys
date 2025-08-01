<?php

namespace App\Http\Controllers;

use App\Enum\HeaderSeq;
use App\Enum\RolesEnum;
use App\Http\Resources\PRHeaderResource;
use App\Mail\PrApprovedEmail;
use App\Mail\PrForApprovalEmail;
use App\Mail\PrRejectedReworkEmail;
use App\Models\Approvers;
use App\Models\ApproveStatus;
use App\Models\Material;
use App\Models\MaterialGroup;
use App\Models\Plant;
use App\Models\PrctrlGrp;
use App\Models\PrHeader;
use App\Models\PrMaterial;
use App\Models\User;
use App\Services\AttachmentService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

        // Fetch user plants
        $userPlants    = $user->plants()->pluck('plant')->toArray();
        $userPrCtrlGrp = $user->prCtrlGrp()->pluck('id')->toArray();

        // Initialize query with relationships
        $query = PrHeader::with(['prmaterials', 'plants'])
            ->userPrCtrlGrp($userPrCtrlGrp)
            ->userPlants($userPlants)
            ->withApprovalAccess($user, true);

        $filters = [
            'pr_number_from' => fn ($value) => request('pr_number_to')
                ? $query->whereBetween('pr_number', [
                    $value,
                    request('pr_number_to'),
                ])
                : $query->where('pr_number', 'like', "%{$value}%"),
            'plant'         => fn ($value) => $query->where('plant', 'ilike', "%{$value}%"),
            'created_name'  => fn ($value) => $query->where('created_name', 'ilike', "%{$value}%"),
            'requested_by'  => fn ($value) => $query->where('requested_by', 'ilike', "%{$value}%"),
            'doc_date_from' => fn ($value) => request('doc_date_to')
                ? $query->whereBetween('doc_date', [$value, request('doc_date_to')])
                : $query->whereDate('doc_date', $value),
            'updated_at_from' => fn ($value) => request('updated_at_to')
                ? $query->whereBetween('updated_at', [$value, request('updated_at_to')])
                : $query->whereDate('updated_at', $value),
            'status' => fn ($value) => $query->where('status', 'ilike', "%{$value}%"),

        ];

        // Apply filters dynamically
        foreach (request()->only(array_keys($filters)) as $field => $value) {
            if (! empty($value)) {
                $filters[$field]($value);
            }
        }

        $pr_header = $query->orderBy('seq', 'asc')
            ->orderBy('pr_number', 'desc')
            ->orderBy('status', 'asc')
            ->paginate(50)
            ->onEachSide(5);

        return Inertia::render('PR/Index', [
            'pr_header'   => PRHeaderResource::collection($pr_header),
            'queryParams' => $request->query() ?: null,
            'message'     => ['success' => session('success'), 'error' => session('error')],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('PR/Create', [
            'mat_code'               => Material::getMaterialCode(),
            'mat_desc'               => Material::getMaterialDescription(),
            'materialGroupsSupplies' => MaterialGroup::supplies()->pluck('mat_grp_code')->toArray(),
            'prCtrlGrp'              => PrctrlGrp::getUserPrController(Auth::id()),
            'materialGeneric'        => Material::genericItems()->pluck('mat_code')->toArray(),
        ]);
    }

    public function copy(Request $request, $prnumber): Response
    {

        $pr_header = PrHeader::with(
            'plants',
            'prmaterials',
            'prmaterials.altUoms',
            'prmaterials.altUoms.altUomText',
            'prmaterials.materialGroups',
            'workflows',
            'attachments'
        )
            ->where('pr_number', $prnumber)
            ->firstOrFail();

        return Inertia::render('PR/Create', [
            'mat_code'               => Material::getMaterialCode(),
            'mat_desc'               => Material::getMaterialDescription(),
            'materialGroupsSupplies' => MaterialGroup::supplies()->pluck('mat_grp_code')->toArray(),
            'prCtrlGrp'              => PrctrlGrp::getUserPrController(Auth::id()),
            'materialGeneric'        => Material::genericItems()->pluck('mat_code')->toArray(),
            'prheader'               => new PRHeaderResource($pr_header),
        ]);
    }

    public function store(Request $request)
    {
        try {
            return DB::transaction(function () use ($request) {
                $pr_materials = collect($request->input('prmaterials'))
                    ->filter(fn ($item) => ! empty($item['mat_code']))
                    ->map(fn ($item, $index) => new PrMaterial($this->_mapPrMaterialData($item, $index)))
                    ->values();
                $total_pr_value = $pr_materials->sum('total_value');
                $pr_header      = PrHeader::create(array_merge(
                    $request->only([
                        'created_name',
                        'requested_by',
                        'plant',
                        'reason_pr',
                        'header_text',
                        'deliv_addr',
                    ]),
                    [
                        'doc_date'       => Carbon::parse($request->input('doc_date'))->format('Y-m-d'),
                        'total_pr_value' => $total_pr_value,
                        'appr_seq'       => 0,
                        'status'         => ApproveStatus::DRAFT,
                        'prctrl_grp_id'  => $pr_materials->first()['prctrl_grp_id'] ?? null,
                    ]
                ));
                $pr_header->prmaterials()->saveMany($pr_materials->all());

                if ($attachments = AttachmentService::handleAttachments($request)) {
                    $pr_header->attachments()->saveMany($attachments);
                }

                return to_route('pr.edit', $pr_header->pr_number)->with('success', "PR {$pr_header->pr_number} created.");
            }, 2);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            throw ValidationException::withMessages([
                'error' => 'An error occurred while creating the PR. Please try again.',
            ]);
        }
    }

    public function submit($id)
    {
        $pr_header = PrHeader::with([
            'createdBy',
            'workflows',
            'attachments',
            'prmaterials' => fn ($query) => $query->whereNull('status')->orWhere('status', ''),
            'plants',
        ])->findOrFail($id);

        $approvers = Approvers::where('amount_from', '<=', $pr_header->total_pr_value)
            ->where('plant', $pr_header->plant)
            ->where('type', Approvers::TYPE_PR)
            ->where('prctrl_grp_id', $pr_header->prmaterials->first()->prctrl_grp_id)
            ->orderBy('seq')->get();

        if ($approvers->isEmpty()) {
            return to_route('pr.edit', $pr_header->pr_number)->with('error', 'No Approver Found.');
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
            'seq'      => HeaderSeq::ForApproval->value,
        ]);

        $pr_header->load('workflows');
        Mail::to($firstApprover->user->email)
            ->send(new PrForApprovalEmail(
                $firstApprover->user->name,
                $pr_header,
                $pr_header->attachments
                    ->pluck('filepath', 'filename')
                    ->toArray()
            ));

        return to_route('pr.index')->with('success', "PR {$pr_header->pr_number} sent for approval.");
    }

    public function edit(Request $request, $prnumber)
    {

        $pr_header = PrHeader::with(
            'plants',
            'prmaterials',
            'prmaterials.altUoms',
            'prmaterials.altUoms.altUomText',
            'prmaterials.materialGroups',
            'workflows',
            'attachments'
        )->where('pr_number', $prnumber)
            ->firstOrFail();

        $item_details = DB::select('SELECT * FROM view_item_details WHERE pr_number = ? AND doc IS NOT NULL ', [$pr_header->pr_number]);

        return Inertia::render('PR/Edit', [
            'prheader'               => new PRHeaderResource($pr_header),
            'mat_code'               => Material::getMaterialCode(),
            'mat_desc'               => Material::getMaterialDescription(),
            'message'                => ['success' => session('success'), 'error' => session('error')],
            'item_details'           => $item_details,
            'materialGroupsSupplies' => MaterialGroup::supplies()->pluck('mat_grp_code')->toArray(),
            'prCtrlGrp'              => PrctrlGrp::getUserPrController(Auth::id()),
            'materialGeneric'        => Material::genericItems()->pluck('mat_code')->toArray(),
        ]);
    }

    public function update(Request $request, $id)
    {

        try {
            return DB::transaction(function () use ($request, $id) {
                $pr_header = PrHeader::with('prmaterials')->findOrFail($id);
                $pr_materials = collect($request->input('prmaterials'))
                    ->filter(fn ($item) => ! empty($item['mat_code']))
                    ->map(fn ($item, $index) => $this->_mapOrUpdatePrMaterial($item, $index, $pr_header->id))
                    ->map(function ($item) {

                        if (isset($item['id'])) {
                            $pr_material = PrMaterial::find($item['id']);
                        } else {
                            $pr_material                = new PrMaterial;
                            $pr_material->pr_headers_id = $item['pr_headers_id'];
                        }
                        $pr_material->item_no         = $item['item_no'];
                        $pr_material->mat_code        = $item['mat_code'];
                        $pr_material->short_text      = $item['short_text'];
                        $pr_material->qty             = $item['qty'];
                        $pr_material->qty_open        = $item['qty_open'];
                        $pr_material->price           = $item['price'];
                        $pr_material->ord_unit        = $item['ord_unit'];
                        $pr_material->per_unit        = $item['per_unit'];
                        $pr_material->unit            = $item['unit'];
                        $pr_material->total_value     = $item['total_value'];
                        $pr_material->currency        = $item['currency'];
                        $pr_material->del_date        = $item['del_date'];
                        $pr_material->mat_grp         = $item['mat_grp'];
                        $pr_material->purch_grp       = $item['purch_grp'];
                        $pr_material->valuation_price = $item['valuation_price'];
                        $pr_material->conversion      = $item['conversion'];
                        $pr_material->converted_qty   = $item['converted_qty'];
                        $pr_material->item_text       = $item['item_text'];
                        $pr_material->prctrl_grp_id   = $item['prctrl_grp_id'];
                        if (($pr_material->qty_ordered === null || $pr_material->qty_ordered == 0) && $pr_material->status === null) {
                            $pr_material->save();
                        }

                        return $item;
                    })->values();

                $pr_materials_from_user_request = $pr_materials->filter(fn ($mat) => $mat['id'] > 0)
                    ->map(fn ($mat) => $mat['id'])
                    ->toArray();

                if (! empty($pr_materials_from_user_request)) {
                    $pr_materials_tag_delete = $pr_header->prmaterials->filter(function ($item) use ($pr_materials_from_user_request) {
                        return ! in_array($item->id, $pr_materials_from_user_request);
                    });

                    if (! empty($pr_materials_tag_delete)) {
                        $pr_materials_tag_delete->each(function ($item) {
                            $item->status = PrMaterial::FLAG_DELETE;
                            $item->save();
                        });
                    }
                }
                $total_pr_value = $pr_materials->filter(fn ($item) => $item['status'] === null)->sum('total_value');
                $total_pr_value = $total_pr_value != 0 ? $total_pr_value : $pr_header->total_pr_value;
                $pr_header->update(
                    array_merge(
                        $request->only([
                            'created_name',
                            'requested_by',
                            'plant',
                            'reason_pr',
                            'header_text',
                            'deliv_addr',
                        ]),
                        [
                            'doc_date'       => Carbon::parse($request->input('doc_date'))->format('Y-m-d'),
                            'total_pr_value' => $total_pr_value,
                            'appr_seq'       => 0,
                            'seq'            => HeaderSeq::Draft->value,
                            'status'         => ApproveStatus::DRAFT,
                            'prctrl_grp_id'  => $pr_materials->first()['prctrl_grp_id'] ?? null,
                        ]
                    )
                );

                if ($attachments = AttachmentService::handleAttachments($request)) {
                    $pr_header->attachments()->saveMany($attachments);
                }

                return to_route('pr.edit', $pr_header->pr_number)->with('success', 'PR updated successfully');
            });
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            throw ValidationException::withMessages([
                'error' => 'An error occurred while creating the PR. Please try again.',
            ]);
        }
    }

    public function approve(Request $request)
    {
        $pr_header = PrHeader::with([
            'createdBy',
            'workflows',
            'attachments',
            'prmaterials' => fn ($query) => $query->whereNull('status')->orWhere('status', ''),
            'plants',
            'prmaterials.materialGroups',
        ])
            ->where('pr_number', $request->pr_number)
            ->first();

        $approver = Approvers::with('user')
            ->where('user_id', Auth::user()->id)
            ->where('plant', $pr_header->plant)
            ->where('type', Approvers::TYPE_PR)
            ->where('prctrl_grp_id', $pr_header->prmaterials->first()->prctrl_grp_id)
            ->first();

        $email_status = 0;
        if ($request->input('type') == ApproveStatus::APPROVED) {

            if ($pr_header->total_pr_value > $approver->amount_to) {
                $pr_header->appr_seq += 1;
                $approver_2nd = Approvers::with('user')
                    ->where('seq', $pr_header->appr_seq)
                    ->where('plant', $pr_header->plant)
                    ->where('type', Approvers::TYPE_PR)
                    ->where('prctrl_grp_id', $pr_header->prmaterials->first()->prctrl_grp_id)
                    ->first();
                $pr_header->status = $approver_2nd->desc;
                $pr_header->seq    = HeaderSeq::ForApproval->value;
                $email_status      = 1;
            } elseif (
                $pr_header->total_pr_value >= $approver->amount_from
                && $pr_header->total_pr_value <= $approver->amount_to
            ) {
                $pr_header->status       = ApproveStatus::APPROVED;
                $pr_header->release_date = Carbon::now()->format('Y-m-d H:i:s');
                $pr_header->seq          = HeaderSeq::Approved->value;
                $email_status            = 2;
            }
        } else {
            $pr_header->status   = Str::ucfirst($request->input('type'));
            $pr_header->appr_seq = $request->input('type') == ApproveStatus::REWORKED ? 0 : -1;
            $pr_header->seq      = $request->input('type') == ApproveStatus::REWORKED ? HeaderSeq::Draft->value : HeaderSeq::Cancelled->value;
            $approver_status     = ApproveStatus::where('seq', '!=', $approver->seq)
                ->where('pr_number', $pr_header->pr_number)
                ->whereNull('user_id')
                ->delete();
            $email_status = 3;
        }

        $pr_header->save();
        $approver_status = ApproveStatus::where('seq', $approver->seq)
            ->where('pr_number', $pr_header->pr_number)
            ->whereNull('user_id')
            ->first();
        $approver_status->status        = Str::ucfirst($request->input('type'));
        $approver_status->approved_by   = Auth::user()->name;
        $approver_status->user_id       = Auth::user()->id;
        $approver_status->message       = $request->input('message');
        $approver_status->approved_date = now();
        $approver_status->save();

        $pr_header->load('workflows');
        /**
         * Send email notification
         */
        switch ($email_status) {
            case 1:
                Mail::to($approver_2nd->user->email)
                    ->send(new PrForApprovalEmail(
                        $approver_2nd->user->name,
                        $pr_header,
                        $pr_header->attachments
                            ->pluck('filepath', 'filename')
                            ->toArray()
                    ));
                break;
            case 2:
                $plant_id   = Plant::where('plant', $pr_header->plant)->value('id');
                $recipients = User::whereHas('plants', function ($query) use ($plant_id) {
                    $query->where('id', $plant_id);
                })
                    ->role(RolesEnum::PORequestor)
                    ->pluck('email')
                    ->unique()
                    ->toArray();
                $recipients[] = $approver->user->email;
                Mail::to($pr_header->createdBy->email)
                    ->cc($recipients)
                    ->send(new PrApprovedEmail(
                        $pr_header->createdBy->name,
                        $pr_header,
                        $pr_header->attachments
                            ->pluck('filepath', 'filename')
                            ->toArray()
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
                // code...
                break;
        }

        return to_route('pr.index')->with(
            'success',
            sprintf('PR %s is %s', $pr_header->pr_number, Str::ucfirst($request->input('type')))
        );
    }

    public function discard($id)
    {

        $pr_material = PrMaterial::where('pr_headers_id', $id)
            ->where(fn ($query) => $query->where('qty_ordered', '<=', 0)
                ->orWhereNull('qty_ordered'))
            ->update(['status' => PrMaterial::FLAG_DELETE]);

        $pr_header = PrHeader::with(['prmaterials' => fn ($query) => $query->whereNull('status')->orWhere('status', '')])
            ->findOrFail($id);
        if ($pr_header->prmaterials->isEmpty()) {
            $pr_header->status   = ApproveStatus::CANCELLED;
            $pr_header->appr_seq = -1;
            $pr_header->seq      = HeaderSeq::Cancelled->value;
            $pr_header->save();
        }

        return to_route('pr.edit', $pr_header->pr_number)->with('success', "{$pr_material} items discarded.");
    }

    public function flagDelete(Request $request)
    {
        $prMaterials = PrMaterial::whereIn('id', $request->input('ids'))->get();

        $toFlag      = $prMaterials->filter(fn ($material) => $material->qty_ordered === null || $material->qty_ordered == 0);
        $withOpenQty = $prMaterials->filter(fn ($material) => $material->qty_ordered !== null && $material->qty_ordered > 0);

        DB::transaction(function () use ($toFlag) {
            if ($toFlag->isNotEmpty()) {
                foreach ($toFlag as $material) {
                    $material->status = PrMaterial::FLAG_DELETE;
                    $material->save();
                }
                
                $prHeader                 = $toFlag->first()->prheader;
                $prHeader->total_pr_value = PrMaterial::where('pr_headers_id', $prHeader->id)
                    ->where(fn ($query) => $query->where('status', '<>', 'X')->orWhereNull('status'))
                    ->sum('total_value');
                $prHeader->save();
            }
        });

        if ($withOpenQty->isNotEmpty()) {
            return to_route('pr.edit', $prMaterials->first()->prheader->pr_number)
                ->with('error', 'Item(s) with ordered quantities cannot be flagged for deletion.');
        }

        return to_route('pr.edit', $prMaterials->first()->prheader->pr_number)
            ->with('success', 'Flagged item(s) for deletion.');
    }

    public function flagClose(Request $request)
    {
        $prMaterials = PrMaterial::whereIn('id', $request->input('ids'))->get();
        if ($prMaterials->isEmpty()) {
            return back()->with('error', 'No valid materials found to update.');
        }
        PrMaterial::whereIn('id', $prMaterials->pluck('id'))->update(['status' => PrMaterial::FLAG_CLOSE]);
        $prHeader = $prMaterials->first()->prheader;

        return to_route('pr.edit', $prHeader->pr_number)
            ->with('success', 'Flagged item(s) for close.');
    }

    public function flagRemove(Request $request)
    {
        $prMaterials = PrMaterial::whereIn('id', $request->input('ids'))->get();
        if ($prMaterials->isEmpty()) {
            return back()->with('error', 'No valid materials found to update.');
        }
        PrMaterial::whereIn('id', $prMaterials->pluck('id'))->update(['status' => null]);
        $prHeader = $prMaterials->first()->prheader;

        return to_route('pr.edit', $prHeader->pr_number)
            ->with('success', 'Cancelled flag for item(s).');
    }

    public function recall($id)
    {
        $prHeader           = PrHeader::findOrFail($id);
        $prHeader->status   = ApproveStatus::DRAFT;
        $prHeader->appr_seq = 0;
        $prHeader->seq      = HeaderSeq::Draft->value;
        $prHeader->save();

        return to_route('pr.edit', $prHeader->pr_number)->with('success', 'PR Recalled');
    }

    private function _mapPrMaterialData(array $item, int $index)
    {
        return [
            'item_no'         => ($index + 1) * 10,
            'mat_code'        => $item['mat_code'],
            'short_text'      => $item['short_text'],
            'item_text'       => Str::limit(strtoupper($item['item_text'] ?? ''), 40, ''),
            'qty'             => $item['qty'],
            'qty_open'        => $item['qty'],
            'price'           => $item['price'],
            'ord_unit'        => $item['ord_unit'],
            'per_unit'        => $item['per_unit'],
            'unit'            => $item['unit'],
            'total_value'     => $item['qty'] * $item['price'],
            'currency'        => $item['currency'],
            'del_date'        => Carbon::parse($item['del_date'])->format('Y-m-d'),
            'mat_grp'         => $item['mat_grp'],
            'purch_grp'       => $item['purch_grp'],
            'status'          => $item['status'] ?? null,
            'valuation_price' => $item['valuation_price'],
            'conversion'      => $item['conversion'],
            'converted_qty'   => $item['converted_qty'],
            'prctrl_grp_id'   => $item['prctrl_grp_id'] ?? null,
        ];
    }

    private function _mapOrUpdatePrMaterial(array $item, int $index, int $pr_header_id)
    {
        return array_merge(
            $this->_mapPrMaterialData($item, $index),
            ['pr_headers_id' => $pr_header_id, 'id' => $item['id'] ?? null]
        );
    }
    public function showPrDetails($prnumber)
    {
        $pr_header = PrHeader::with([
            'prmaterials',
            'workflows',
            'attachments',
            'plants',
        ])
        ->where('pr_number', $prnumber)
        ->firstOrFail();

        return new PRHeaderResource($pr_header);
    }
}
