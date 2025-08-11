<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaterialRequest;
use App\Http\Resources\MaterialResource;
use App\Import\MaterialImport;
use App\Models\Material;
use App\Models\MaterialGroup;
use App\Services\AttachmentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Material::query();

        $query->with(['createdBy', 'updatedBy', 'altUoms', 'materialGroups', 'purchasingGroups']);

        $filters = [
            'mat_code'     => fn ($value) => $query->where('mat_code', 'ilike', "%{$value}%"),
            'mat_desc'     => fn ($value) => $query->where('mat_desc', 'ilike', "%{$value}%"),
            'mat_grp_desc' => fn ($value) => $query->whereHas(
                'materialGroups',
                fn ($q) => $q->where('mat_grp_desc', 'ilike', "%{$value}%")
            ),
        ];

        foreach (request()->only(array_keys($filters)) as $field => $value) {
            if (! empty($value)) {
                $filters[$field]($value);
            }
        }

        $material = $query->orderBy('mat_desc')
            ->paginate(15)
            ->onEachSide(5)
            ->appends($request->query() ?: null);

        return Inertia::render('Admin/Material/Index', [
            'materials'      => MaterialResource::collection($material),
            'materialGroups' => MaterialGroup::select('mat_grp_code as value', 'mat_grp_desc as label')->orderBy('mat_grp_desc')->get()->toArray(),
            'queryParams'    => $request->query() ?: null,
            'message'        => ['success' => session('success'), 'error' => session('error'), 'missing' => session('missing', [])],
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
    public function store(StoreMaterialRequest $request)
    {
        Material::create($request->validated());

        return back()->with('success', 'Material created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $material = Material::with([
            'materialGroups',
            'altUoms',
            'altUoms.altUomText',
            'valuations' => fn ($query) => $query->where('plant', $request->input('plant'))
                ->where('valid_from', '<=', $request->input('doc_date'))
                ->where('valid_to', '>=', $request->input('doc_date')),
            'purchasingGroups' => fn ($query) => $query->where('plant', $request->input('plant')),
            'purchasingGroups.prCtrlGrp',
        ])
            ->where('mat_code', $request->input('material'))
            ->orWhere('mat_desc', $request->input('material'))
            ->firstOrFail();

        return new MaterialResource($material);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Material $material)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreMaterialRequest $request, Material $material)
    {
        $material->update($request->validated());

        return back()->with('success', 'Material updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        //
    }

    public function search(Request $request)
    {
        if (! $request->input('search')) {
            return;
        }

        $material = Material::with([
            'purchasingGroupsChecker',
        ])
            ->where('mat_code', 'ilike', "%{$request->input('search')}%")
            ->orWhere('mat_desc', 'ilike', "%{$request->input('search')}%")
            ->orWhere('old_mat_code', 'ilike', "%{$request->input('search')}%")
            ->get();

        return MaterialResource::collection($material);
    }

    public function import(Request $request)
    {
        try {
            $files = AttachmentService::handleImport($request);
            if (empty($files)) {
                throw ValidationException::withMessages(['error' => ['No valid files were uploaded ']]);
            }

            $importData = new MaterialImport;
            Excel::import($importData, storage_path('app/'.$files['filepath']));
            $getData = $importData->getMaterialImport();

            if (empty($getData)) {
                throw ValidationException::withMessages([
                    'error' => ['No valid material records found.'],
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
                    Material::updateOrCreate(
                        ['mat_code' => $data['mat_code']],
                        $data
                    );
                }
            });

            $route = to_route('material.index')->with('success', 'Materials uploaded.');
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
