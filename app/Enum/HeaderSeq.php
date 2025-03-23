<?php

namespace App\Enum;

enum HeaderSeq: int
{
    case Draft       = 0;
    case ForApproval = 1;
    case Approved    = 2;
    case Cancelled   = 3;
}
