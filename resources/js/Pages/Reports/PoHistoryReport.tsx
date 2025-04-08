import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import PoHistoryReportFilter from './Partials/PoHistoryReportFilter';
import { Pagination } from '@/Components';
import { DataTable, setDataTableColumns } from '@/Components/ui';

const _columns = {
  mat_code: { title: 'MATERIAL', type: 'string' },
  short_text: { title: 'SHORT TEXT', type: 'string' },
  item_text: { title: 'ITEM TEXT', type: 'string' },
  pr_number: { title: 'PR NUMBER', type: 'string' },
  po_number: { title: 'PO NUMBER', type: 'string' },
  control_no: { title: 'CONTROL NO.', type: 'string' },
  gr_number: { title: 'GR NUMBER', type: 'string' },
  pr_doc_date: { title: 'PR DOC. DATE', type: 'date' },
  pr_item_no: { title: 'PR ITEM NO.', type: 'string' },
  pr_header_stat: { title: 'PR STATUS', type: 'string' },
  pr_created_name: { title: 'PR CREATED BY', type: 'string' },
  pr_deliv_date: { title: 'PR DELIV. DATE', type: 'date' },
  pr_qty: { title: 'PR QTY', type: 'number' },
  pr_qty_open: { title: 'PR OPEN QTY', type: 'number' },
  pr_unit: { title: 'PR UOM', type: 'string' },
  pr_mat_stat: { title: 'PR MATL. STAT.', type: 'string' },
  po_doc_date: { title: 'PO DOC. DATE', type: 'date' },
  po_item_no: { title: 'PO ITEM NO.', type: 'string' },
  po_qty: { title: 'PO QTY', type: 'number' },
  net_price: { title: 'NET PRICE', type: 'currency' },
  total_net_price: { title: 'TOTAL NET PRICE', type: 'currency' },
  po_open_qty: { title: 'PO OPEN QTY', type: 'number' },
  po_unit: { title: 'PO UOM', type: 'string' },
  po_mat_stat: { title: 'PO MATL. STAT.', type: 'string' },
  gr_item_no: { title: 'GR ITEM NO.', type: 'string' },
  gr_qty: { title: 'GR QTY', type: 'number' },
  gr_total: { title: 'GR AMOUNTTOTAL', type: 'currency' },
  gr_unit: { title: 'GR UOM', type: 'string' },
  gr_mat_stat: { title: 'GR MATL. STAT.', type: 'string' },
  dci: { title: 'DELIV. COMPL. IND.', type: 'string' },
  actual_date: { title: 'ACTUAL RECEIVED DATE', type: 'date' },
  mat_grp_desc: { title: 'MATL. GRP', type: 'string' },
  supplier: { title: 'SUPPLIER CODE', type: 'string' },
  name_1: { title: 'SUPPLIER NAME', type: 'string' },
  po_header_stat: { title: 'PO STATUS', type: 'string' },
  po_created_name: { title: 'PO CREATED BY', type: 'string' },
  deliv_addr: { title: 'DELIV. ADDR.', type: 'string' },
  po_deliv_date: { title: 'PO DELIV. DATE', type: 'date' },
  gr_created_name: { title: 'GR CREATED BY', type: 'string' },
  entry_date: { title: 'GR ENTRY DATE', type: 'date' },
  delivery_note: { title: 'DELIVERY NOTE', type: 'string' },
  mfg_date: { title: 'MFG DATE', type: 'date' },
  sled_bbd: { title: 'SLED BBD', type: 'date' },
  reason_pr: { title: 'REASON FOR PR', type: 'string' },
  po_header_text: { title: 'PO HEADER TEXT', type: 'string' },
  gr_header_text: { title: 'GR HEADER TEXT', type: 'string' },
  plant_name: { title: 'PLANT NAME', type: 'string' },
};

const columns = setDataTableColumns(_columns);

export default function PoHistoryReport({ auth, poHistories, queryParams }: PageProps) {
  queryParams = queryParams || {};

  const filterReport = (queryParam) => {
    router.get(route('report.pohistory'), queryParam);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">PO History Report</h2>
          {/* <div className="flex gap-2">
            <PoHistoryReportFilter queryParams={queryParams} filterReport={filterReport} />
            <DownloadButton href={route('download.report.pohistory', { ...queryParams })} />
          </div> */}
        </div>
      }>
      <Head title="PO History Report" />

      <div className="py-2 min-h-screen-md max-h-screen-md ">
        <div className=" mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 text-black shadow-sm sm:rounded-lg ">
            <div className="">
              <DataTable columns={columns} data={poHistories.data} downloadLink={route('download.report.pohistory', { ...queryParams })}>
                <PoHistoryReportFilter queryParams={queryParams} filterReport={filterReport} />
              </DataTable>
            </div>

            <Pagination links={poHistories.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
