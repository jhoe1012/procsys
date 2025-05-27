<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attachment extends Model
{
    use HasFactory;

    const ALLOWED_FILES = ['pdf', 'jpeg', 'jpg', 'png', 'docx', 'xlsx', 'txt', 'eml', 'csv', 'xls'];

    const ALLOWED_FILES_EXCEL_ONLY = ['xlsx', 'csv'];

    protected $fillable = ['filename', 'filepath'];

    public function prheader(): BelongsTo
    {
        return $this->belongsTo(PrHeader::class);
    }

    public function poheader(): BelongsTo
    {
        return $this->belongsTo(PoHeader::class);
    }
}
