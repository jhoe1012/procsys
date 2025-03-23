<?php

namespace App\Enum;

enum RolesEnum: string
{
    case PRRequestor = 'PR Requestor';
    case PRApprover  = 'PR Approver';
    case PORequestor = 'PO Requestor';
    case POApprover  = 'PO Approver';
    case GRCreator   = 'GR Creator';
    case GRManager   = 'GR Manager';
    case Admin       = 'Admin';
    case PRViewer    = 'PR Viewer';
    case POViewer    = 'PO Viewer';
    case GRViewer    = 'GR Viewer';
}
