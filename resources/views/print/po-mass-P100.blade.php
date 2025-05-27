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
            font-family: Tahoma, "Trebuchet MS", sans-serif;
            font-size: 14px;
        }

        body {
            margin: 0;
            padding: 0;
        }

        .printable-area {
            width: 8.5in;
            height: 11in;
            position: relative;
        }

        table,
        tr,
        td {
            border: none
        }

        table {
            width: 100%;
        }

        .center {
            text-align: center;
        }

        .ponumber {
            text-align: right;
            font-weight: bold;
            font-size: 20px;
            padding: 60px 80px 50px 80px;
z        }

        .amount {
            position: absolute;
            bottom: 350px;
            right: 70px;
            text-align: right;
            font-size: 25px;
        }

        .addr {
            padding: 25px 40px 70px 0;
        }

        .itemcode {
            padding-left: 5px;
        }

        .align-top {
            vertical-align: top;
        }

        .text-right {
            text-align: right;
        }

        .pr {
            padding-right: 40px;
        }

        .supplier_name {
            padding: 0 0 0 50px;
        }

        .notes {
            padding-left: 10px;
            width: 90%;
            font-size: 13px;

        }

        .line_item {
            min-height: 240px;
            max-height: 240px;
            /* background-color: blue; */
        }

        .date {
            padding-top: 20px;
        }

        .buyer {
            position: absolute;
            bottom: 260px;
            left: 420px;
        }

        .approver {
            position: absolute;
            bottom: 193px;
            left: 420px;
        }

        .page-break {
            page-break-after: always;
        }
    </style>
</head>

<body class="font-sans antialiased">
    @foreach ($poHeaders as $poHeader)
        <div class="printable-area ">
            <table>

                <td colspan="5" class="ponumber"> {{ $poHeader->po_number }} </td>
                </tr>
                <tr>
                    <td class="supplier_name" width='57%'>{{ $poHeader->vendors->supplier }} -
                        {{ $poHeader->vendors->name_1 }} </td>
                    <td class='date'> {{ date('d-M-Y', strtotime($poHeader->doc_date)) }} </td>
                    @if (!$poHeader->is_mother_po)
                        <td class='date'> {{ date('d-M-Y', strtotime($poHeader->deliv_date)) }} </td>
                    @endif
                </tr>
                <tr>
                    <td> </td>
                    <td class="addr" colspan='2'>{{ $poHeader->deliv_addr }} </td>

                </tr>
            </table>
            <div class='line_item'>
                <table>
                    @php
                        $grandTotal = 0;
                    @endphp

                    @foreach ($poHeader->pomaterials as $pomaterial)
                        <tr>
                            <td width='10%' class="align-top itemcode">{{ $pomaterial->mat_code }}</td>
                            <td width='40%' class="align-top">
                                @if (in_array($pomaterial->mat_code, $genericMaterials))
                                    {{ $pomaterial->item_text }}
                                @else
                                    {{ $pomaterial->short_text }} <br>
                                    @if ($pomaterial->item_text)
                                        {{ $pomaterial->item_text }} &nbsp;&nbsp;
                                    @endif
                                @endif
                                @if ($poHeader->is_mother_po)
                                    <b> Delivery Date: </b>{{ date('d-M-Y', strtotime($pomaterial->del_date)) }}
                                @endif
                            </td>
                            <td width='6%' class="align-top text-right">{{ $pomaterial->po_qty }} </td>
                            <td width='8%' class="align-top">{{ $pomaterial->unit }} </td>
                            <td width='15%' class="align-top text-right pr">
                                {{ $pomaterial->taxClass?->tax_class == 1
                                    ? Number::currency($pomaterial->net_price * ($pomaterial->taxClass?->tax_value * 0.01 + 1), 'PHP')
                                    : Number::currency($pomaterial->net_price, 'PHP') }}
                            </td>
                            @php
                                $totalValue =
                                    $pomaterial->taxClass?->tax_class == 1
                                        ? round(
                                                $pomaterial->net_price * ($pomaterial->taxClass?->tax_value * 0.01 + 1),
                                                2,
                                            ) * $pomaterial->po_qty
                                        : round($pomaterial->net_price * $pomaterial->po_qty);
                                $grandTotal += $totalValue;
                            @endphp
                            <td width='15%' class="align-top text-right pr">
                                @php
                                    echo Number::currency($totalValue, 'PHP');
                                @endphp
                            </td>
                        </tr>
                    @endforeach
                </table>
                <p><br> </p>
            </div>
            <div class='notes'>
                {{ $poHeader->notes }} <br />
                Remarks: PR Number/s {{ $poHeader->pomaterials->pluck('pr_number')->unique()->implode('/') }}
                {{ $poHeader->header_text }}
            </div>
            <div class="amount">
                @php
                    echo Number::currency($grandTotal, 'PHP');
                @endphp
            </div>
            <div class='buyer'>
                {{ $poHeader->created_name }}
            </div>
            <div class='approver'>
                {{ $poHeader->workflows->pluck('approved_by')->unique()->implode('/') }}
                <br />
            </div>
        </div>
        <div class="page-break"></div>
    @endforeach

</body>

<script>
    window.print();
</script>

</html>
