<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialWorkCenter extends Model
{
    protected $guarded = [];

    public function workCenter()
    {
        return $this->belongsTo(WorkCenter::class, 'work_center_id');
    }
}
