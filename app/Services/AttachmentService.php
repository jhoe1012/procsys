<?php

namespace App\Services;

use App\Models\Attachment;
use Illuminate\Http\Request;

class AttachmentService
{
    public static function handleAttachments(Request $request): array
    {
        if (!$request->hasFile('attachment')) {
            return [];
        }

        return collect($request->file('attachment'))
            ->filter(fn($file) => in_array(strtolower($file->getClientOriginalExtension()), Attachment::ALLOWED_FILES))
            ->map(function ($file) {
                $originalName = $file->getClientOriginalName();
                $timestampedName = time() . "_" . preg_replace('/[^A-Za-z0-9.]/', '', $originalName);
                $file->move(public_path('attachments'), $timestampedName);

                return new Attachment([
                    'filename' => $originalName,
                    'filepath' => 'attachments/' . $timestampedName,
                ]);
            })
            ->values()
            ->all();
    }
}
