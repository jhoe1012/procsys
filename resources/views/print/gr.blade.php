<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" type="image/png" sizes="32x32" href="{{ url('/asset/favicon/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="96x96" href="{{ url('/asset/favicon/favicon-96x96.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ url('/asset/favicon/favicon-16x16.png') }}">

    <style>
        * {
            /* outline: 1px red solid; */
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
        }

        body {
            width: 8.5in;
            height: 11in;
            margin: 0;
            padding: 0;

        }

        table,
        th,
        td {
            text-align: justify;
            padding: 2px;
        }

        table {
            border: 1px solid black;
            width: 100%;

        }
    </style>
</head>

<body class="font-sans antialiased">
    <div>
        <h3>GR / GI SLIP</h3>
        <h3>Material Document: {{ $grHeader->gr_number }}</h3>
    </div>
    <div>
        <table>
            <tr>
                <th width='20%'>Goods Receipt Date: </th>
                <td width='20%'>{{ date('d.m.Y', strtotime($grHeader->actual_date)) }}</td>
                <th width='20%'>Plant: </th>
                <td width='40%'>{{ $grHeader->plants->plant }} - {{ $grHeader->plants->name1 }}</td>
            </tr>
            <tr>
                <th>Current Date: </th>
                <td>{{ date('d.m.Y') }}</td>
                <th>Storage Location: </th>
                <td></td>
            </tr>
            <tr>
                <th>Vendor: </th>
                <td>{{ $grHeader->vendors->supplier }}</td>
                <th>Vendor Name: </th>
                <td>{{ $grHeader->vendors->name_1 }}</td>
            </tr>
            <tr>
                <th>Purchase Order: </th>
                <td>{{ $grHeader->po_number }}</td>
                <th>DR # / SI # </th>
                <td>{{ $grHeader->delivery_note }} </td>
            </tr>
              <tr>
                <th>Received By: </th>
                <td>{{ $grHeader->created_name }}</td>
            </tr>
        </table>

        <table>
            <thead>
                <tr>
                    <th width='5%'>Item </th>
                    <th width='10%'> Material </th>
                    <th width='35%'>Material Description</th>
                    <th width='10%'>Strg Loc</th>
                    <th width='10%'>Quantity</th>
                    <th width='10%'>Unit</th>
                </tr>
                <tr>
                    <th colspan="2">Reason For </th>
                    <th>Manuf. Part Number</th>
                    <th>Strg Bin</th>
                    <th>Batch</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @foreach ($grHeader->grmaterials as $grmaterial)
                    <tr>
                        <td widtd='5%'>{{ $grmaterial->item_no }} </td>
                        <td widtd='10%'> {{ $grmaterial->mat_code }} </td>
                        <td widtd='35%'>
                        @if (in_array($grmaterial->mat_code, $genericMaterials))
                            {{ $grmaterial->item_text }}
                        @else 
                            {{ $grmaterial->short_text }}
                        @endif
                        </td>
                        <td widtd='10%'></td>
                        <td widtd='10%'>{{ $grmaterial->gr_qty }}</td>
                        <td widtd='10%'>{{ $grmaterial->unit }}</td>
                    </tr>
                    @if ($grmaterial->batch)
                        <tr>
                            <td colspan="2"></td>
                            <td></td>
                            <td></td>
                            <td>{{ $grmaterial->batch }}</td>
                            <td></td>
                        </tr>
                    @endif
                @endforeach
            </tbody>
        </table>
    </div>

</body>

<script>
    window.print();
</script>

</html>
