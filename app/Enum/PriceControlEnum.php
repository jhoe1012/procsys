<?php

namespace App\Enum;

enum PriceControlEnum: string
{
    case StandardPrice  = 'S';
    case MovingAvgPrice = 'V';
}
