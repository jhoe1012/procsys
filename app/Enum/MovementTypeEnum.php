<?php

namespace App\Enum;

enum MovementTypeEnum: int
{
    case GoodsReceipt         = 101;
    case ReversalGoodsReceipt = 102;
}
