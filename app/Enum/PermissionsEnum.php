<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case CreatePR   = 'create.pr';
    case EditPR     = 'edit.pr';
    case UpdatePR   = 'update.pr';
    case DeletePR   = 'delete.pr';
    case ReadPR     = 'read.pr';
    case ApproverPR = 'approver.pr';
    case CreatePO   = 'create.po';
    case EditPO     = 'edit.po';
    case UpdatePO   = 'update.po';
    case DeletePO   = 'delete.po';
    case ReadPO     = 'read.po';
    case ApproverPO = 'approver.po';
    case CreateGR   = 'create.gr';
    case EditGR     = 'edit.gr';
    case UpdateGR   = 'update.gr';
    case DeleteGR   = 'delete.gr';
    case ReadGR     = 'read.gr';
    case ApproverGR = 'approver.gr';
    case CancelGR   = 'cancel.gr';
    case Admin      = 'admin';
}
