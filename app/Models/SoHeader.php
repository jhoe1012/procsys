<?php

namespace App\Models;

use App\Trait\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Model;

class SoHeader extends Model
{
    use CreatedUpdatedBy;

    protected $guarded = [];
}
