<?php

namespace App\Http\Controllers\Admin;

use App\Exports\MaterialValuationErrorExport;
use App\Http\Controllers\Controller;
use App\Http\Resources\MaterialValuationResource;
use App\Import\MaterialValuationImport;
use App\Models\MaterialValuation;
use App\Models\Plant;
use App\Services\AttachmentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class MaterialValuationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MaterialValuation::query();

        $query = $query->with(['plants', 'material']);

        if (request('plant')) {
            $query->where('plant', 'like', '%'.request('plant').'%');
        }

        if (request('material')) {
            $query->where('mat_code', 'like', '%'.request('material').'%');
        }

        $materialValuation = $query->orderBy('mat_code')
            ->orderBy('valid_from', 'desc')
            ->paginate(50)
            ->onEachSide(5)
            ->appends($request->query() ?: null);

        $plant = Plant::select('plant', 'name1')
            ->orderBy('plant')
            ->get()
            ->map(fn ($item) => [
                'value' => $item->plant,
                'label' => $item->plant.'-'.$item->name1,
            ])->toArray();

        return Inertia::render('Admin/ValuationPrice/Index', [
            'materialValuation' => MaterialValuationResource::collection($materialValuation),
            'plant'             => $plant,
            'queryParams'       => $request->query() ?: null,
            'message'           => ['success' => session('success'), 'error' => session('error')],
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
        $materialValuation                  = new MaterialValuation;
        $materialValuation->plant           = $request->input('plant');
        $materialValuation->mat_code        = $request->input('mat_code');
        $materialValuation->currency        = $request->input('currency');
        $materialValuation->valuation_price = $request->input('valuation_price');
        $materialValuation->per_unit        = $request->input('per_unit');
        $materialValuation->valid_from      = $request->input('valid_from');
        $materialValuation->valid_to        = $request->input('valid_to');
        $materialValuation->save();

        return to_route('val_price.index')->with('success', 'Net price created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(MaterialValuation $materialValuation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MaterialValuation $materialValuation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MaterialValuation $materialValuation)
    {
        $materialValuation->plant           = $request->input('plant');
        $materialValuation->mat_code        = $request->input('mat_code');
        $materialValuation->currency        = $request->input('currency');
        $materialValuation->valuation_price = $request->input('valuation_price');
        $materialValuation->per_unit        = $request->input('per_unit');
        $materialValuation->valid_from      = $request->input('valid_from');
        $materialValuation->valid_to        = $request->input('valid_to');
        $materialValuation->save();

        return to_route('val_price.index')->with('success', 'Net price created.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MaterialValuation $materialValuation)
    {
        //
    }

    public function import(Request $request)
    {
        $files             = AttachmentService::handleImport($request);
        $materialValuation = new MaterialValuationImport;

        Excel::import($materialValuation, storage_path('app/'.$files['filepath']));

        try {
            DB::statement('TRUNCATE  temp_material_valuations');

            DB::table('temp_material_valuations')->insert($materialValuation->getMaterialValuation());

            DB::unprepared("UPDATE temp_material_valuations 
            SET stat='E', remarks= CONCAT( remarks, 'Plant Code is not valid. ' )
            WHERE plant NOT IN (SELECT plant FROM plants);

            UPDATE temp_material_valuations 
            SET stat='E', remarks= CONCAT( remarks,'Material does not exist. ' )
            WHERE mat_code NOT IN (SELECT mat_code FROM materials);

            UPDATE temp_material_valuations 
            SET stat='E', remarks= CONCAT( remarks, 'Currency is not valid. ' )
            WHERE currency NOT IN ('PHP', 'USD');

            UPDATE temp_material_valuations 
            SET stat='E', remarks= CONCAT( remarks, 'Valuation Price should be greater than zero. ' )
            WHERE valuation_price <= 0 ;

            UPDATE temp_material_valuations 
            SET stat='E', remarks= CONCAT( remarks, 'The Validity Dates are incorrect. ' )
            WHERE valid_from  <= '2024-01-01' OR valid_to <= '2024-01-01' ;

            UPDATE temp_material_valuations 
            SET stat='E', remarks= CONCAT( remarks, 'Valid To should be greater than or equal to the Valid From. ' )
            WHERE valid_from  > valid_to ;

            UPDATE temp_material_valuations 
            SET stat='E', remarks= CONCAT( remarks, 'Validity date cannot be in the past. ' )
            WHERE valid_to < CURRENT_DATE OR valid_from < CURRENT_DATE ;

            UPDATE temp_material_valuations 
            SET stat ='X', remarks='Updated Successfully'
            WHERE mat_code IN (SELECT mat_code FROM material_valuations) AND  stat IS NULL;

            UPDATE temp_material_valuations 
            SET stat='S' , remarks='Created Successfully'
            WHERE stat IS NULL  ;

            INSERT INTO history_material_valuations(mat_code,plant,currency,valuation_price,per_unit,valid_from,valid_to,created_by,updated_by,created_at,updated_at)
            SELECT mat_code,plant,currency,valuation_price,per_unit,valid_from,valid_to,created_by,updated_by,created_at,updated_at FROM material_valuations WHERE mat_code IN (SELECT mat_code FROM temp_material_valuations WHERE stat='X');

            UPDATE material_valuations 
            SET valid_to = temp_material_valuations.valid_from 
            FROM temp_material_valuations 
            WHERE  material_valuations.mat_code =  temp_material_valuations.mat_code
            AND stat='X' 
            AND material_valuations.valid_to  > temp_material_valuations.valid_from ;

            INSERT INTO material_valuations(mat_code,plant,currency,valuation_price,per_unit,valid_from,valid_to,created_by, created_at)
            SELECT mat_code,plant,currency,valuation_price,per_unit,valid_from,valid_to,created_by,created_at FROM temp_material_valuations WHERE stat IN ('X','S');
            ");

            return to_route('val_price.index')->with('success', 'Valuation uploaded.');
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            throw ValidationException::withMessages([
                'error' => 'An error occurred. Please contact administrator',
            ]);
        }
    }

    public function export(Request $request)
    {
        $result = DB::table('temp_material_valuations')
            ->select('mat_code', 'plant', 'currency', 'valuation_price', 'per_unit', 'valid_from', 'valid_to', 'remarks', 'created_at')
            ->orderBy('stat', 'asc')
            ->orderBy('id', 'asc')
            ->get()
            ->toArray();

        return Excel::download(
            new MaterialValuationErrorExport($result),
            'IMPORT ERROR LOG.xlsx',
            \Maatwebsite\Excel\Excel::XLSX
        );
    }
}
