<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchase Requisition Approval</title>
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
        <h2>Approval Granted: Purchase Requisition {{ $pr_header->pr_number }} is {{ $pr_header->status }}</h2>
        <p>Dear {{ $requestor }},</p>
        <p>I am pleased to inform you that the Purchase Requisition (PR) you submitted has been reviewed and approved.
            Below are the details of the approved requisition.</p>
        <div class="details">
            <p><strong>PR Number:</strong> {{ $pr_header->pr_number }}</p>
            <p><strong>Created By:</strong> {{ $pr_header->created_name }}</p>
            <p><strong>Requested By:</strong> {{ $pr_header->requested_by }}</p>
            <p><strong>Doc Date:</strong> {{ date('F j, Y', strtotime($pr_header->doc_date)) }}</p>
            <p><strong>Requesting Plant:</strong> {{ $pr_header->plants->name1 }}</p>
            <table>
                <thead>
                    <tr>
                        <td>Item No</td>
                        <td>Material</td>
                        <td>Material Description</td>
                        <td>Item Text</td>
                        <td>Qty</td>
                        <td>Ord Unit</td>
                        <td>Price</td>
                        <td>Unit</td>
                        <td>Total Value</td>
                        <td>Curr</td>
                        <td>Del Date</td>
                        <td>Mat Grp</td>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($pr_header->prmaterials as $prmaterial)
                        <tr>
                            <td>{{ $prmaterial->item_no }}</td>
                            <td>{{ $prmaterial->mat_code }}</td>
                            <td>{{ $prmaterial->short_text }}</td>
                            <td>{{ $prmaterial->item_text }}</td>
                            <td>{{ $prmaterial->qty }}</td>
                            <td>{{ $prmaterial->ord_unit }}</td>
                            <td>{{ Number::currency($prmaterial->price, 'PHP') }}</td>
                            <td>{{ $prmaterial->unit }}</td>
                            <td>{{ Number::currency($prmaterial->total_value, 'PHP') }}</td>
                            <td>{{ $prmaterial->currency }}</td>
                            <td>{{ date('Y-m-d', strtotime($prmaterial->del_date)) }}</td>
                            <td>{{ $prmaterial->materialGroups->mat_grp_desc }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <p><strong>Total Amount:</strong> {{ Number::currency($pr_header->total_pr_value, 'PHP') }}</p>
            <p><strong>Reason for PR:</strong> {{ $pr_header->reason_pr }}</p>
        </div>
        <div class="button-container">
            <a href={{ route('pr.edit', $pr_header->pr_number) }} class="button">View Requisition Details</a>
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
                    @foreach ($pr_header->workflows as $workflow)
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
