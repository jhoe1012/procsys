<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlternativeUomRequest;
use App\Http\Resources\AlternativeUomResource;
use App\Import\AlternativeUomImport;
use App\Models\AlternativeUom;
use App\Services\AttachmentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class AlternativeUomController extends Controller
{
    public function search(Request $request)
    {
        if (! $request->input('search')) {
            return;
        }

        $alt_uom = AlternativeUom::where('mat_code', "{$request->input('search')}")->get();

        return AlternativeUomResource::collection($alt_uom);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = AlternativeUom::query();
        $query->with(['material', 'altUomText', 'unitOfWeightText', 'createdBy', 'updatedBy']);

        $filters = [
            'mat_code' => fn ($value) => $query->where('mat_code', 'ilike', "%{$value}%"),
            'mat_desc' => fn ($value) => $query->whereHas(
                'material',
                fn ($q) => $q->where('mat_desc', 'ilike', "%{$value}%")
            ),
        ];

        foreach (request()->only(array_keys($filters)) as $field => $value) {
            if (! empty($value)) {
                $filters[$field]($value);
            }
        }
        $altuom = $query->orderBy('mat_code')
            ->paginate(50)
            ->onEachSide(5);

        return Inertia::render('Admin/AltUom/Index', [
            'altUoms'     => AlternativeUomResource::collection($altuom),
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
    public function store(StoreAlternativeUomRequest $request)
    {
        AlternativeUom::create($request->validated());

        return back()->with('success', 'Alternative UOM is created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(AlternativeUom $alternativeUom)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AlternativeUom $alternativeUom)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreAlternativeUomRequest $request, AlternativeUom $altuom)
    {
        $altuom->update($request->validated());

        return back()->with('success', 'Material updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AlternativeUom $alternativeUom)
    {
        //
    }

    public function import(Request $request)
    {
        try {
            $files = AttachmentService::handleImport($request);
            if (empty($files)) {
                throw ValidationException::withMessages(['error' => ['No valid files were uploaded ']]);
            }

            $importData = new AlternativeUomImport;
            Excel::import($importData, storage_path('app/'.$files['filepath']));
            $getData = $importData->getaltUomImport();

            if (empty($getData)) {
                throw ValidationException::withMessages([
                    'error' => ['No valid vendor records found.'],
                ]);
            }

            $emptyData = [];
            DB::transaction(function () use ($getData, &$emptyData) {

                $validData = collect($getData)
                    ->filter(fn ($row) => ! empty($row['mat_code'] ?? null))
                    ->all();

                $emptyData = collect($getData)
                    ->filter(fn ($row) => empty($row['mat_code'] ?? null))
                    ->map(fn ($row) => $row['row_id'] ?? null)
                    ->values()
                    ->all();

                foreach ($validData as $data) {
                    AlternativeUom::updateOrCreate(
                        ['mat_code' => $data['mat_code']],
                        $data
                    );
                }
            });

            $route = to_route('altuom.index')->with('success', 'Alternative UOM uploaded.');
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
