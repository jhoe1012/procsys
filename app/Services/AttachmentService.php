<?php

namespace App\Services;

use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AttachmentService
{
    public static function handleAttachments(Request $request): array
    {
        if (! $request->hasFile('attachment')) {
            return [];
        }

        return collect($request->file('attachment'))
            ->filter(fn ($file) => in_array(strtolower($file->getClientOriginalExtension()), Attachment::ALLOWED_FILES))
            ->map(function ($file) {
                $originalName = $file->getClientOriginalName();
                $timestampedName = time().'_'.preg_replace('/[^A-Za-z0-9.]/', '', $originalName);
                $file->move(public_path('attachments'), $timestampedName);

                return new Attachment([
                    'filename' => $originalName,
                    'filepath' => 'attachments/'.$timestampedName,
                ]);
            })
            ->values()
            ->all();
    }

    // public static function handleImport(Request $request): array
    // {
    //     if (! $request->hasFile('file')) {
    //         throw ValidationException::withMessages(['file' => ['file is required']]);
    //     }

    //     return collect($request->file('file'))
    //         ->filter(fn ($file) => in_array(strtolower($file->getClientOriginalExtension()), Attachment::ALLOWED_FILES))
    //         ->map(function ($file) {
    //             $originalName = $file->getClientOriginalName();
    //             $timestampedName = time().'_'.preg_replace('/[^A-Za-z0-9.]/', '', $originalName);
    //             $filepath = $file->storeAs('imports', $timestampedName);

    //             return ['filepath' => $filepath];
    //         })
    //         ->values()
    //         ->all();
    // }

    public static function handleImport(Request $request): array
    {
        if (! $request->hasFile('file')) {
            throw ValidationException::withMessages(['error' => ['File is required']]);
        }
    
        $file = $request->file('file');
        
        if (!in_array(strtolower($file->getClientOriginalExtension()), Attachment::ALLOWED_FILES_EXCEL_ONLY)) {
            throw ValidationException::withMessages(['error' => ['File type not supported']]);
        }
    
        $originalName = $file->getClientOriginalName();
        $timestampedName = time().'_'.Str::slug(pathinfo($originalName, PATHINFO_FILENAME), '_').'.'.$file->getClientOriginalExtension();
        $filepath = $file->storeAs('imports', $timestampedName);
    
        return ['filepath' => $filepath];
    }
    
}
