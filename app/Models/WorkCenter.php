<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkCenter extends Model
{
    protected $guarded = [];

    public function materialWorkCenters()
    {
        return $this->hasMany(MaterialWorkCenter::class, 'work_center_id');
    }
}
