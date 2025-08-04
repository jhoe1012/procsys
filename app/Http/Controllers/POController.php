<?php

namespace App\Http\Controllers;

use App\Enum\CrudActionEnum;
use App\Enum\HeaderSeq;
use App\Http\Resources\POHeaderResource;
use App\Http\Resources\PRMaterialsResource;
use App\Mail\PoApprovedEmail;
use App\Mail\PoForApprovalEmail;
use App\Mail\PoRejectedReworkEmail;
use App\Models\Approvers;
use App\Models\ApproveStatus;
use App\Models\DeliveryAddress;
use App\Models\Material;
use App\Models\MaterialNetPrice;
use App\Models\PoHeader;
use App\Models\PoMaterial;
use App\Models\PrMaterial;
use App\Models\SupplierNote;
use App\Models\User;
use App\Models\Vendor;
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

class POController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Fetch user plants
        $userPlants = $user->plants()->pluck('plant')->toArray();

        // Initialize query with relationships
        $query = PoHeader::with(['pomaterials', 'plants', 'vendors'])
            ->userPlants($userPlants)
            ->withApprovalAccess($user, true);

        // Define filterable fields and conditions
        $filters = [
            'po_number_from' => fn ($value) => request('po_number_to')
                ? $query->whereBetween('po_number', [
                    $value,
                    request('po_number_to'),
                ])
                : $query->where('po_number', 'like', "%{$value}%"),
            'plant'         => fn ($value) => $query->where('plant', 'ilike', "%{$value}%"),
            'vendor'        => fn ($value) => $query->where('vendor_id', 'ilike', "%{$value}%"),
            'created_name'  => fn ($value) => $query->where('created_name', 'ilike', "%{$value}%"),
            'doc_date_from' => fn ($value) => request('doc_date_to')
                ? $query->whereBetween('doc_date', [$value, request('doc_date_to')])
                : $query->whereDate('doc_date', $value),
            'deliv_date_from' => fn ($value) => request('deliv_date_to')
                ? $query->whereHas('pomaterials', function ($q) use ($value) {
                    $to = request('deliv_date_to');
                    $q->whereBetween('del_date', [$value, $to]);
                })
                : $query->whereHas('pomaterials', function ($q) use ($value) {
                    $q->whereDate('del_date', $value);
                }),
            'status'     => fn ($value) => $query->where('status', 'ilike', "%{$value}%"),
            'control_no' => fn ($value) => $value === 'blank'
                ? $query->whereNull('control_no')
                : $query->where('control_no', 'ilike', "%{$value}%"),
        ];

        // Apply filters dynamically
        foreach (request()->only(array_keys($filters)) as $field => $value) {
            if (! empty($value)) {
                $filters[$field]($value);
            }
        }

        $poHeader = $query->orderBy('seq', 'asc')
            ->orderBy('status', 'asc')
            ->orderBy('po_number', 'desc')
            ->paginate(50)
            ->onEachSide(5);

        return Inertia::render('PO/Index', [
            'po_header'     => POHeaderResource::collection($poHeader),
            'queryParams'   => $request->query() ?: null,
            'message'       => ['success' => session('success'), 'error' => session('error')],
            'vendorsChoice' => Vendor::getVendorsChoice(),
        ]);
    }

    public function create(): Response
    {

        $user_plants = auth()->user()->plants->map(function ($items) {
            return $items->plant;
        })->toArray();

        return Inertia::render('PO/Create', [
            'vendors'         => Vendor::getVendorsChoice(true),
            'deliveryAddress' => DeliveryAddress::selectRaw('address as value, address as label')
                ->whereIn('plant', $user_plants)
                ->where('is_active', 'true')
                ->orderBy('address')
                ->get()
                ->toArray(),
            'supplierNotes' => SupplierNote::selectRaw('note as value, note as label')
                ->whereIn('plant', $user_plants)
                ->where('is_active', 'true')
                ->orderBy('note')
                ->get()
                ->toArray(),
        ]);
    }

    public function store(Request $request)
    {
        try {
            return DB::transaction(function () use ($request) {

                $header_deliv_date = $request->input('deliv_date');
                $is_mother_po = $request->input('is_mother_po', false);
                
                $po_materials = collect($request->input('pomaterials'))
                    ->filter(fn ($item) => ! empty($item['mat_code']))
                    ->map(fn ($item, $index) => new PoMaterial($this->_mapPoMaterialData($item, $index, $header_deliv_date, $is_mother_po)))
                    ->values();
                $total_po_value = $po_materials->sum('total_value');
                $po_header      = PoHeader::create(array_merge(
                    $request->only([
                        'control_no',
                        'vendor_id',
                        'created_name',
                        'plant',
                        'header_text',
                        'approver_text',
                        'deliv_addr',
                        'deliv_date',
                        'notes',
                        'is_mother_po',
                    ]),
                    [
                        'doc_date'       => Carbon::parse($request->input('doc_date'))->format('Y-m-d'),
                        'total_po_value' => $total_po_value,
                        'appr_seq'       => 0,
                        'status'         => ApproveStatus::DRAFT,
                    ]
                ));

                $po_header->pomaterials()->saveMany($po_materials->all());
                foreach ($po_materials->all() as $pomaterial) {
                    $this->_updatePrMaterial($pomaterial, 0, CrudActionEnum::CREATE);
                }
                if ($attachments = AttachmentService::handleAttachments($request)) {
                    $po_header->attachments()->saveMany($attachments);
                }

                $extendedAttachments = $request->input('extended_attachments', []);
                foreach ($extendedAttachments as $attachment) {
                    $po_header->attachments()->create([
                        'filename' => $attachment['filename'] ?? null,
                        'filepath' => $attachment['path'] ?? null,
                    ]);
                }


                return to_route('po.edit', $po_header->po_number)->with('success', "PO {$po_header->po_number} created.");
            }, 2);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            throw ValidationException::withMessages([
                'error' => 'An error occurred while creating the PO. Please try again.',
            ]);
        }
    }

    public function edit(Request $request, $ponumber)
    {
        $po_header = PoHeader::with([
            'workflows',
            'attachments',
            'pomaterials',
            'pomaterials.prmaterials',
            'pomaterials.materialNetPrices',
            'pomaterials.altUoms',
            'pomaterials.altUoms.altUomText',
            'pomaterials.materialGroups',
            'plants',
            'vendors',
        ])
            ->where('po_number', $ponumber)
            ->firstOrFail();
        $user_plants = auth()->user()->plants->map(function ($items) {
            return $items->plant;
        })->toArray();

        return Inertia::render('PO/Edit', [
            'vendors' => Vendor::selectRaw('supplier as value , supplier || \' - \'||name_1 as label')
                ->where('supplier', $po_header->vendor_id)
                ->orderBy('name_1')->get()->toArray(),
            'poheader'        => new POHeaderResource($po_header),
            'message'         => ['success' => session('success'), 'error' => session('error')],
            'deliveryAddress' => DeliveryAddress::selectRaw('address as value, address as label')
                ->whereIn('plant', $user_plants)
                ->where('is_active', 'true')
                ->orderBy('address')
                ->get()
                ->toArray(),
            'supplierNotes' => SupplierNote::selectRaw('note as value, note as label')
                ->whereIn('plant', $user_plants)
                ->where('is_active', 'true')
                ->orderBy('note')
                ->get()
                ->toArray(),
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            return DB::transaction(function () use ($request, $id) {
                $po_header      = PoHeader::findOrFail($id);
                $header_deliv_date = $request->input('deliv_date');
                $is_mother_po      = $request->input('is_mother_po', false);

                $po_materials = collect($request->input('pomaterials'))
                    ->filter(fn ($item) => ! empty($item['mat_code']) || $item['status'] !== 'X')
                    ->map(fn ($item, $index) => $this->_mapOrUpdatePoMaterial($item, $index, $po_header->id, $header_deliv_date, $is_mother_po))
                    ->map(function ($item) {
                        $converted_qty_old_value = 0;
                        if (isset($item['id'])) {
                            $po_material             = POMaterial::find($item['id']);
                            $converted_qty_old_value = $po_material->converted_qty;
                        } else {
                            $po_material = new POMaterial;
                        }
                        $po_material->po_header_id   = $item['po_header_id'];
                        $po_material->pr_material_id = $item['pr_material_id'];
                        $po_material->item_no        = $item['item_no'];
                        $po_material->mat_code       = $item['mat_code'];
                        $po_material->short_text     = $item['short_text'];
                        $po_material->po_qty         = $item['po_qty'];
                        $po_material->po_gr_qty      = $item['po_gr_qty'];
                        $po_material->net_price      = $item['net_price'];
                        $po_material->per_unit       = $item['per_unit'];
                        $po_material->unit           = $item['unit'];
                        $po_material->total_value    = $item['total_value'];
                        $po_material->item_free      = $item['item_free'];
                        $po_material->currency       = $item['currency'];
                        $po_material->del_date       = $item['del_date'];
                        $po_material->mat_grp        = $item['mat_grp'];
                        $po_material->requested_by   = $item['requested_by'];
                        $po_material->pr_number      = $item['pr_number'];
                        $po_material->pr_item        = $item['pr_item'];
                        $po_material->item_text      = $item['item_text'];
                        $po_material->conversion     = $item['conversion'];
                        $po_material->denominator    = $item['denominator'];
                        $po_material->converted_qty  = $item['converted_qty'];
                        $po_material->pr_unit        = $item['pr_unit'];
                        $po_material->purch_grp      = $item['purch_grp'];
                        $po_material->save();

                        $this->_updatePrMaterial($po_material, $converted_qty_old_value, CrudActionEnum::UPDATE);

                        // if ($po_material->prmaterials instanceof PrMaterial) {
                        //     $po_material->prmaterials->qty_open  = ($converted_qty_old_value + $po_material->prmaterials->qty_open) - $po_material->converted_qty;
                        //     $po_material->prmaterials->qty_ordered = ($converted_qty_old_value - $po_material->prmaterials->qty_ordered) + $po_material->converted_qty;
                        //     $po_material->prmaterials->save();
                        // }
                        // $this->_updateNetPrice($po_material);
                        return $item;
                    })->values();

                $total_po_value = $po_materials->filter(fn ($item) => $item['status'] != 'X')->sum('total_value');
                $total_po_value = $total_po_value != 0 ? $total_po_value : $po_header->total_po_value;
                $po_header->update(array_merge(
                    $request->only([
                        'control_no',
                        'vendor_id',
                        'created_name',
                        'plant',
                        'header_text',
                        'approver_text',
                        'deliv_addr',
                        'deliv_date',
                        'notes',
                        'is_mother_po',
                    ]),
                    [
                        'doc_date'       => Carbon::parse($request->input('doc_date'))->format('Y-m-d'),
                        'total_po_value' => $total_po_value,
                        'appr_seq'       => 0,
                        'seq'            => HeaderSeq::Draft->value,
                        'status'         => ApproveStatus::DRAFT,
                    ]
                ));

                $extendedAttachments = $request->input('extended_attachments', []);
               foreach ($extendedAttachments as $attachment) {
                    $exists = $po_header->attachments()
                        ->where('filename', $attachment['filename'] ?? null)
                        ->where('filepath', $attachment['path'] ?? null)
                        ->where('po_header_id', $po_header->id) // Use the current header's id
                        ->exists();

                    if (! $exists) {
                        $po_header->attachments()->create([
                            'filename' => $attachment['filename'] ?? null,
                            'filepath' => $attachment['path'] ?? null,
                        ]);
                    }
                }
                if ($attachments = AttachmentService::handleAttachments($request)) {
                    $po_header->attachments()->saveMany($attachments);
                }

                return to_route('po.edit', $po_header->po_number)->with('success', "PO {$po_header->po_number} updated.");
            });
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            throw ValidationException::withMessages([
                'error' => 'An error occurred while creating the PO. Please try again.',
            ]);
        }
    }

    public function submit($id)
    {
        $po_header = POHeader::with([
            'createdBy',
            'plants',
            'vendors',
            'workflows',
            'pomaterials' => fn ($query) => $query->whereNull('status')->orWhere('status', ''),
        ])->findOrFail($id);

        $approvers = Approvers::where('amount_from', '<=', $po_header->total_po_value)
            ->where('plant', $po_header->plant)
            ->where('type', Approvers::TYPE_PO)
            ->orderBy('seq')
            ->get();

        if ($approvers->isEmpty()) {
            return to_route('po.edit', $po_header->po_number)->with('error', 'No Approver Found.');
        }
        // delete approve status where user id is null to keep the status clean
        ApproveStatus::where('po_number', $po_header->po_number)->whereNull('user_id')->delete();

        $approvers->each(function ($approver) use ($po_header) {
            ApproveStatus::create([
                'po_number' => $po_header->po_number,
                'status'    => $approver->desc,
                'position'  => $approver->position,
                'seq'       => $approver->seq,
            ]);
        });

        $firstApprover = $approvers->first();
        $po_header->update([
            'status'   => $firstApprover->desc,
            'appr_seq' => $firstApprover->seq,
            'seq'      => HeaderSeq::ForApproval->value,
        ]);

        $po_header->load('workflows');
        if ($firstApprover->user) {
            Mail::to($firstApprover->user->email)
                ->send(new PoForApprovalEmail(
                    $firstApprover->user->name,
                    $po_header,
                    $po_header->attachments
                        ->pluck('filepath', 'filename')
                        ->toArray()
                ));
        }

        return to_route('po.index')->with('success', "PO {$po_header->po_number} sent for approval.");
    }

    public function discard($id)
    {
        $po_header = PoHeader::with([
            'pomaterials' => fn ($query) => $query->where('status', '!=', 'X')
                ->where('po_qty', '=', DB::raw('po_gr_qty')),
            'pomaterials.prmaterials',
        ])->findOrFail($id);

        foreach ($po_header->pomaterials as $pomaterial) {
            $pomaterial->status = PoMaterial::FLAG_DELETE;
            $pomaterial->save();
            // update open and order qty in pr
            $this->_updatePrMaterial($pomaterial, 0, CrudActionEnum::DELETE);
        }

        $po_header = PoHeader::with(['pomaterials' => fn ($query) => $query->whereNull('status')
            ->orWhere('status', '')])->findOrFail($id);
        if ($po_header->pomaterials->isEmpty()) {
            $po_header->status   = ApproveStatus::CANCELLED;
            $po_header->appr_seq = -1;
            $po_header->seq      = HeaderSeq::Cancelled->value;
            $po_header->save();
        }

        return to_route('po.edit', $po_header->po_number)->with('success', 'Purchase order Cancelled.');
    }

    public function approve(Request $request)
    {
        $po_header = PoHeader::with([
            'pomaterials.prmaterials',
            'pomaterials' => fn ($query) => $query->whereNull('status')->orWhere('status', ''),
            'plants',
            'vendors',
            'workflows',
            'attachments',
            'pomaterials.materialGroups',
        ])->where('po_number', $request->input('po_number'))
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
                $po_header->seq    = HeaderSeq::ForApproval->value;
                $email_status      = 1;
            } elseif ($po_header->total_po_value <= $approver->amount_to) {
                $po_header->status       = ApproveStatus::APPROVED;
                $po_header->release_date = Carbon::now()->format('Y-m-d H:i:s');
                $po_header->seq          = HeaderSeq::Approved->value;
                $this->_updateNetPrice($po_header);
                $email_status = 2;
            }
        } else {
            $po_header->status   = Str::ucfirst($request->input('type'));
            $po_header->appr_seq = $request->input('type') == ApproveStatus::REWORKED ? HeaderSeq::Draft->value : HeaderSeq::Rejected->value;
            $po_header->seq      = $request->input('type') == ApproveStatus::REWORKED ? HeaderSeq::Draft->value : HeaderSeq::Cancelled->value;
            $approver_status     = ApproveStatus::where('seq', '!=', $approver->seq)
                ->where('po_number', operator: $po_header->po_number)
                ->whereNull('user_id')
                ->delete();

            if ($request->input('type') == ApproveStatus::REJECTED) {
                foreach ($po_header->pomaterials as $pomaterial) {
                    $pomaterial->status = PoMaterial::FLAG_DELETE;
                    $pomaterial->save();
                    // update open and order qty in pr
                    $this->_updatePrMaterial($pomaterial, 0, CrudActionEnum::DELETE);
                }
            }
            $email_status = 3;
        }

        $po_header->save();

        $approver_status = ApproveStatus::where('seq', $approver->seq)
            ->where('po_number', $po_header->po_number)
            ->whereNull('user_id')
            ->first();

        $approver_status->status        = Str::ucfirst($request->input('type'));
        $approver_status->approved_by   = Auth::user()->name;
        $approver_status->user_id       = Auth::user()->id;
        $approver_status->message       = $request->message;
        $approver_status->approved_date = now();
        $approver_status->save();

        $po_header->load('workflows');
        /**
         * Send email notification
         */
        switch ($email_status) {
            case 1:
                Mail::to($approver_2nd->user->email)
                    ->send(new PoForApprovalEmail(
                        $approver_2nd->user->name,
                        $po_header,
                        $po_header->attachments
                            ->pluck('filepath', 'filename')
                            ->toArray()
                    ));
                break;
            case 2:
                $finance = User::whereHas(
                    'deliveryAddress',
                    fn ($query) => $query->where('address', $po_header->deliv_addr)
                        ->where('plant', $po_header->plant)
                )->pluck('email')->toArray();

                $approved_cc = [$approver->user->email, ...$finance];
                Mail::to($po_header->createdBy->email)
                    ->cc($approved_cc)
                    ->send(new PoApprovedEmail(
                        $po_header->createdBy->name,
                        $po_header,
                        $po_header->attachments
                            ->pluck('filepath', 'filename')
                            ->toArray()
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
                break;
        }

        return to_route('po.index')->with(
            'success',
            sprintf('PO %s is %s', $po_header->po_number, Str::ucfirst($request->input('type')))
        );
    }

    public function getApprovedPr(Request $request)
    {
        $doc_date = date('Y-m-d', strtotime($request->input('doc_date')));

        $pr_material = PrMaterial::with([
            'materialGroups',
            'prheader',
            'altUoms',
            'altUoms.altUomText',
            'materialNetPrices' => fn ($query) => $query->where('plant', $request->input('plant'))
                ->whereDate('valid_from', '<=', $doc_date)
                ->whereDate('valid_to', '>=', $doc_date)
                ->orderBy('valid_from', 'desc'),
        ])
            ->whereHas('prheader', fn ($query) => $query->where('plant', $request->input('plant'))
                ->where('status', ApproveStatus::APPROVED))
            ->where('qty_open', '>', 0)
            ->whereNull('status')
            ->orderBy('pr_headers_id', 'desc')
            ->get();

        return PRMaterialsResource::collection($pr_material);
    }

    public function flagDelete(Request $request)
    {
        foreach ($request->input('ids') as $id) {
            $pomaterial         = PoMaterial::findOrFail($id);
            $pomaterial->status = PoMaterial::FLAG_DELETE;
            $pomaterial->save();
            $this->_updatePrMaterial($pomaterial, 0, CrudActionEnum::DELETE);
        }

        return to_route('po.edit', $pomaterial->poheader->po_number)->with('success', 'Mark id(s) for deletion.');
    }

    public function flagComplete(Request $request)
    {
        foreach ($request->input('ids') as $id) {
            $po_material         = PoMaterial::findOrFail($id);
            $po_material->status = PoMaterial::FLAG_DELIVER;
            $po_material->save();
        }

        return to_route('po.edit', $po_material->poheader->po_number)->with('success', 'Mark item(s) for delivered.');
    }

    /* Remove since we add mass prinring */
    public function printPo(Request $request, $id)
    {
        $poHeader = PoHeader::with([
            'plants',
            'vendors',
            'pomaterials.taxClass',
            'workflows'   => fn ($query) => $query->where('status', ApproveStatus::APPROVED),
            'pomaterials' => fn ($query) => $query->whereNull('status')->orWhere('status', ''),
        ])->findOrFail($id);

        $prNumbers = $poHeader->pomaterials->pluck('pr_number')->unique()->implode('/');
        $approvers = $poHeader->workflows->pluck('approved_by')->implode('/');

        return view('print.po', ['poHeader' => $poHeader, 'prNumbers' => $prNumbers, 'approvers' => $approvers]);
    }

    public function recall($id)
    {
        $poHeader           = PoHeader::findOrFail($id);
        $poHeader->status   = ApproveStatus::DRAFT;
        $poHeader->appr_seq = 0;
        $poHeader->seq      = HeaderSeq::Draft->value;
        $poHeader->save();

        return to_route('po.edit', $poHeader->po_number)->with('success', 'PO Recalled');
    }

    public function updateControlNo(Request $request)
    {

        $po_header             = PoHeader::findOrFail($request->input('id'));
        $po_header->control_no = $request->input('control_no');
        $po_header->save();

        return to_route('po.index')->with(
            'success',
            sprintf('PO %s control has been updated to %s.', $po_header->po_number, $po_header->control_no)
        );
    }

    public function massPrint(Request $request)
    {
        $poHeaders = PoHeader::with([
            'plants',
            'vendors',
            'pomaterials.taxClass',
            'workflows'   => fn ($query) => $query->where('status', ApproveStatus::APPROVED),
            'pomaterials' => fn ($query) => $query->whereNull('status')->orWhere('status', ''),
        ])->whereIn('id', $request->input('checkboxPo'))->orderBy('id')->get();

        $controlNo = $request->input('controlNumber');

        foreach ($poHeaders as $poHeader) {
            $poHeader->control_no = $controlNo;
            $poHeader->print_count += 1;
            $poHeader->save();
            $controlNo++;
        }
        $data = [
            'poHeaders'        => $poHeaders,
            'genericMaterials' => Material::genericItems()->pluck('mat_code')->toArray(),
        ];

        if ($request->input('poform') === 'smbi') {
            return view('print.po-mass-store', $data);
        }

        return view("print.po-mass-{$poHeaders->first()->plant}", $data);
    }

    private function _updatePrMaterial($pomaterial, $converted_qty_old_value, CrudActionEnum $action): void
    {
        if ($pomaterial->prmaterials instanceof PrMaterial) {
            $conversion    = $pomaterial->prmaterials->conversion;
            $converted_qty = $pomaterial->converted_qty;

            $qty_open    = $pomaterial->prmaterials->qty_open * $conversion;
            $qty_ordered = $pomaterial->prmaterials->qty_ordered * $conversion;

            switch ($action) {
                case CrudActionEnum::CREATE:
                    $qty_open -= $converted_qty;
                    $qty_ordered += $converted_qty;
                    break;

                case CrudActionEnum::UPDATE:
                    $qty_open += $converted_qty_old_value - $converted_qty;
                    $qty_ordered = $qty_ordered - $converted_qty_old_value + $converted_qty;
                    break;

                case CrudActionEnum::DELETE:
                    $qty_open += $converted_qty;
                    $qty_ordered -= $converted_qty;
                    break;

                default:
                    return;
            }

            $pomaterial->prmaterials->qty_open    = $qty_open / $conversion;
            $pomaterial->prmaterials->qty_ordered = $qty_ordered / $conversion;

            $pomaterial->prmaterials->save();
        }
    }

    private function _mapPoMaterialData(array $item, int $index, $header_deliv_date = null, $is_mother_po = false)
    {
        // If regular PO, use header delivery date; if mother PO, use line item delivery date
        $del_date = $is_mother_po ? $item['del_date'] : $header_deliv_date;
        return [
            'pr_material_id' => $item['pr_material_id'],
            'item_no'        => ($index + 1) * 10,
            'mat_code'       => $item['mat_code'],
            'short_text'     => $item['short_text'],
            'po_qty'         => $item['po_qty'],
            'po_gr_qty'      => $item['po_qty'],
            'net_price'      => $item['net_price'],
            'per_unit'       => $item['per_unit'],
            'unit'           => $item['unit'],
            'total_value'    => $item['po_qty'] * $item['net_price'],
            'item_free'      => $item['item_free'] ?? false,
            'currency'       => $item['currency'],
            'del_date'       => Carbon::parse($del_date)->format('Y-m-d'),
            'mat_grp'        => $item['mat_grp'],
            'requested_by'   => $item['requested_by'],
            'pr_number'      => $item['pr_number'],
            'pr_item'        => $item['pr_item'],
            'item_text'      => Str::limit(strtoupper($item['item_text'] ?? ''), 40, ''),
            'conversion'     => $item['conversion_po'],
            'denominator'    => 1,
            'converted_qty'  => $item['converted_qty_po'],
            'pr_unit'        => $item['pr_unit'],
            'purch_grp'      => $item['purch_grp'] ?? '',
            'status'         => $item['status'] ?? '',
        ];
    }

    private function _mapOrUpdatePoMaterial(array $item, int $index, int $po_header_id, $header_deliv_date = null, $is_mother_po = false)
    {
        return array_merge(
            $this->_mapPoMaterialData($item, $index, $header_deliv_date, $is_mother_po),
            ['po_header_id' => $po_header_id, 'id' => $item['id'] ?? null]
        );
    }

    private function _updateNetPrice($poHeader)
    {
        $genericItems = Material::genericItems()->pluck('mat_code')->toArray();
        foreach ($poHeader->pomaterials as $poMaterial) {
            if (in_array($poMaterial->mat_code, $genericItems)) {
                continue;
            }
            MaterialNetPrice::updateOrCreate(
                [
                    'vendor'        => $poHeader->vendor_id,
                    'plant'         => $poHeader->plant,
                    'mat_code'      => $poMaterial->mat_code,
                    'currency'      => $poMaterial->currency,
                    'uom'           => $poMaterial->unit,
                    'per_unit'      => $poMaterial->per_unit,
                ],
                [
                    'valid_from'    => $poHeader->doc_date->format('Y-m-d'),
                    'min_order_qty' => 0,
                    'price'    => $poMaterial->net_price,
                    'valid_to' => Carbon::parse($poHeader->doc_date)->addMonths(5)->format('Y-m-d'),

                ]
            );
        }
    }

}
