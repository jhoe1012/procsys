<?php

namespace App\Http\Controllers;

use App\Http\Resources\VendorResource;
use App\Import\VendorImport;
use App\Models\Vendor;
use App\Services\AttachmentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Vendor::query();

        // $query =  $query->with(['plants', 'material']);

        if (request('supplier')) {
            $query->where('supplier', 'ilike', '%'.request('supplier').'%');
        }
        if (request('name_1')) {
            $query->where('name_1', 'ilike', '%'.request('name_1').'%');
        }
        if (request('city')) {
            $query->where('city', 'ilike', '%'.request('city').'%');
        }
        if (request('postal_code')) {
            $query->where('postal_code', 'ilike', '%'.request('postal_code').'%');
        }
        if (request('street')) {
            $query->where('street', 'ilike', '%'.request('street').'%');
        }

        $vendor = $query->orderBy('name_1', 'desc')
            ->paginate(15)
            ->onEachSide(5)
            ->appends($request->query() ?: null);

        return Inertia::render('Admin/Vendor/Index', [
            'vendors'     => VendorResource::collection($vendor),
            'queryParams' => $request->query() ?: null,
            'message'     => ['success' => session('success'), 'error' => session('error'), 'missing' => session('missing', [])],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $vendor                = new Vendor;
        $vendor->supplier      = $request->input('supplier');
        $vendor->account_group = $request->input('account_group');
        $vendor->tax_number    = $request->input('tax_number');
        $vendor->tax_number_2  = $request->input('tax_number_2');
        $vendor->name_1        = $request->input('name_1');
        $vendor->search_term   = $request->input('search_term');
        $vendor->city          = $request->input('city');
        $vendor->country       = $request->input('country');
        $vendor->district      = $request->input('district');
        $vendor->postal_code   = $request->input('postal_code');
        $vendor->street        = $request->input('street');
        $vendor->telephone_1   = $request->input('telephone_1');
        $vendor->telephone_2   = $request->input('telephone_2');
        $vendor->vat_reg_no    = $request->input('vat_reg_no');        
        $vendor->email_1       = $request->input('email_1');
        $vendor->email_2       = $request->input('email_2');
        $vendor->payment_terms = $request->input('payment_terms');
        $vendor->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($vendor)
    {
        $vendor = Vendor::where('supplier', $vendor)->firstOrFail();

        return new VendorResource($vendor); //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vendor $vendor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vendor $vendor)
    {
        $vendor->supplier      = $request->input('supplier');
        $vendor->account_group = $request->input('account_group');
        $vendor->tax_number    = $request->input('tax_number');
        $vendor->tax_number_2  = $request->input('tax_number_2');
        $vendor->name_1        = $request->input('name_1');
        $vendor->search_term   = $request->input('search_term');
        $vendor->city          = $request->input('city');
        $vendor->country       = $request->input('country');
        $vendor->district      = $request->input('district');
        $vendor->postal_code   = $request->input('postal_code');
        $vendor->street        = $request->input('street');
        $vendor->telephone_1   = $request->input('telephone_1');
        $vendor->telephone_2   = $request->input('telephone_2');
        $vendor->vat_reg_no    = $request->input('vat_reg_no');
        $vendor->email_1       = $request->input('email_1');
        $vendor->email_2       = $request->input('email_2');
        $vendor->payment_terms = $request->input('payment_terms');
        $vendor->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vendor $vendor)
    {
        //
    }

    public function search(Request $request)
    {

        $vendor = Vendor::where('supplier', 'ilike', "%{$request->input('search')}%")
            ->orWhere('name_1', 'ilike', "%{$request->input('search')}%")
            ->get();

        return VendorResource::collection($vendor);
    }

    public function import(Request $request)
    {
        try {
            $files = AttachmentService::handleImport($request);
            if (empty($files)) {
                throw ValidationException::withMessages(['error' => ['No valid files were uploaded ']]);
            }
            $importData = new VendorImport;
            Excel::import($importData, storage_path('app/'.$files['filepath']));
            $getData = $importData->getVendorData();

            if (empty($getData)) {
                throw ValidationException::withMessages([
                    'error' => ['No valid vendor records found.'],
                ]);
            }

            $emptyData = [];

            DB::transaction(function () use ($getData, &$emptyData) {

                $validData = collect($getData)
                    ->filter(fn ($row) => ! empty($row['supplier'] ?? null))
                    ->all();

                $emptyData = collect($getData)
                    ->filter(fn ($row) => empty($row['supplier'] ?? null))
                    ->map(fn ($row) => $row['row_id'] ?? null)
                    ->values()
                    ->all();

                foreach ($validData as $data) {
                    Vendor::updateOrCreate(
                        ['supplier' => $data['supplier']],
                        $data
                    );
                }
            });

            $route = to_route('vendor.index')->with('success', 'Vendors uploaded.');
            if (! empty($emptyData)) {
                $route->with('missing', array_values($emptyData));
            }

            return $route;

        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return back()->withErrors(['error' => 'An error occurred. Please contact administrator.'])->withInput();
        }

    }
}
