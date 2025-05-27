<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchase order Approval</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            /* font-size: 13px; */
        }

        .container {
            margin: 0 auto;
            padding: 20px;
            max-width: 1000px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        h2 {
            color: #0056b3;
        }

        p {
            margin: 10px 0;
        }

        .details {
            margin: 20px 0;
        }

        .details p {
            margin: 5px 0;
        }

        .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #777;
        }

        table,
        th,
        td {
            border: 1px solid black;
            border-collapse: collapse;
            line-height: 1;
            /* font-size: 11px; */
            padding: 5px;
        }

        thead {
            font-weight: bold;
        }

        .button-container {
            margin: 20px 0;
            text-align: center;
        }

        .button {
            background-color: #0056b3;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            display: inline-block;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Approval Required: Purchase Order {{ $po_header->po_number }}</h2>
        <p>Dear {{ $approver_name }},</p>
        <p>I am writing to seek your approval for a purchase order that has been submitted for review. Below are
            the details of the order:</p>
        <div class="details">
            <p><strong>PO Number:</strong> {{ $po_header->po_number }}</p>
            <p><strong>Created By:</strong> {{ $po_header->created_name }}</p>
            <p><strong>Vendor: </strong> {{ $po_header->vendors->supplier }}-{{ $po_header->vendors->name_1 }}</p>
            <p><strong>Doc Date:</strong> {{ date('F j, Y', strtotime($po_header->doc_date)) }}</p>
            @if (!$po_header->is_mother_po)
                <p><strong>Del Date:</strong> {{ date('F j, Y', strtotime($po_header->deliv_date)) }}</p>
            @endif
            <p><strong>Requesting Plant:</strong> {{ $po_header->plants->name1 }}</p>
            <table>
                <thead>
                    <tr>
                        <td>Item No</td>
                        <td>Material</td>
                        <td>Material Description</td>
                        <td>Item Text</td>
                        <td>PO Qty</td>
                        <td>Net Price</td>
                        <td>Unit</td>
                        <td>Total Value</td>
                        <td>Curr</td>
                        {{-- @if ($po_header->is_mother_po) --}}
                        <td>Del Date</td>
                        {{-- @endif --}}
                        <td>Mat Grp</td>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($po_header->pomaterials as $pomaterial)
                        <tr>
                            <td>{{ $pomaterial->item_no }}</td>
                            <td>{{ $pomaterial->mat_code }}</td>
                            <td>{{ $pomaterial->short_text }}</td>
                            <td>{{ $pomaterial->item_text }}</td>
                            <td>{{ $pomaterial->po_qty }}</td>
                            <td>{{ Number::currency($pomaterial->net_price, 'PHP') }}</td>
                            <td>{{ $pomaterial->unit }}</td>
                            <td>{{ Number::currency($pomaterial->total_value, 'PHP') }}</td>
                            <td>{{ $pomaterial->currency }}</td>
                            {{-- @if ($po_header->is_mother_po) --}}
                            <td>{{ date('Y-m-d', strtotime($pomaterial->del_date)) }}</td>
                            {{-- @endif --}}
                            <td>{{ $pomaterial->materialGroups->mat_grp_desc }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <p><strong>Total Amount:</strong> {{ Number::currency($po_header->total_po_value, 'PHP') }}</p>
        </div>
        <div class="button-container">
            <a href={{ route('po.edit', $po_header->po_number) }} class="button">View order Details</a>
        </div>
        <div class="footer">
            <p><strong>Workflow:</strong></p>

            <table>
                <thead>
                    <tr>
                        <td>Position</td>
                        <td>Status</td>
                        <td>Approved By</td>
                        <td>Approved Date</td>
                        <td>Comment</td>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($po_header->workflows as $workflow)
                        <tr>
                            <td>{{ $workflow->position }}</td>
                            <td>{{ $workflow->status }}</td>
                            <td>{{ $workflow->approved_by }}</td>
                            <td>{{ $workflow->approved_date }}</td>
                            <td>{{ $workflow->message }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

        </div>
    </div>
</body>

</html>
