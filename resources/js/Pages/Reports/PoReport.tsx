import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { formatNumber } from '@/lib/utils';
import Pagination from '@/Components/Pagination';
import PoReportFilter from './Partials/PoReportFilter';
import DownloadButton from '@/Components/DownloadButton';

export default function PoReport({ auth, poReport, queryParams }: PageProps) {
  queryParams = queryParams || {};

  const filterReport = (queryParam) => {
    router.get(route('report.po'), queryParam);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">PO Report</h2>
          <div className="flex gap-2">
            <PoReportFilter queryParams={queryParams} filterReport={filterReport} />
            <DownloadButton href={route('download.report.po', { ...queryParams })} />
          </div>
        </div>
      }>
      <Head title="Purchase Order Report" />

      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 text-black shadow-sm sm:rounded-lg ">
            <div className="overflow-x-auto">
              <table className=" table-auto w-[200rem]   text-xs text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-1 py-2">Pur. Doc</th>
                    <th className="px-1 py-2">Control No.</th>
                    <th className="px-1 py-2">GR Doc</th>
                    <th className="px-1 py-2">Actual Date Recv</th>
                    <th className="px-3 py-2">Item</th>
                    <th className="px-3 py-2">Doc Date</th>
                    <th className="px-1 py-2">Delivery Date</th>
                    <th className="px-3 py-2">PGr</th>
                    <th className="px-3 py-2">Supplier</th>
                    <th className="px-3 py-2">Supplier Name</th>
                    <th className="px-3 py-2">Material</th>
                    <th className="px-3 py-2">Material Description</th>
                    <th className="px-3 py-2">Item Text</th>
                    <th className="px-3 py-2">Matl Grp</th>
                    <th className="px-3 py-2">PO Qty</th>
                    <th className="px-3 py-2">PO Unit</th>
                    <th className="px-3 py-2">Open PO Qty</th>
                    <th className="px-3 py-2">GR Qty</th>
                    <th className="px-3 py-2">GR Unit</th>
                    <th className="px-3 py-2">PO Net Price</th>
                    <th className="px-3 py-2">PO Total Value</th>
                    <th className="px-3 py-2">GR Total Value</th>
                    <th className="px-3 py-2">Crcy</th>
                    <th className="px-3 py-2">Plant</th>
                    <th className="px-3 py-2">Release Date</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Created By</th>
                    <th className="px-3 py-2">Devlivery Address</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-black ">
                  {poReport.data.length > 0 ? (
                    poReport.data.map((po, index) => (
                      <tr className={'border-b ' + (index % 2 === 0 ? 'bg-gray-100' : 'bg-white')} key={index}>
                        <td className="px-1 py-2">{po.po_number}</td>
                        <td className="px-1 py-2">{po.control_no}</td>
                        <td className="px-1 py-2">{po.gr_number}</td>
                        <td className="px-1 py-2">{po.actual_date}</td>
                        <td className="px-1 py-2">{po.item_no}</td>
                        <td className="px-1 py-2">{po.doc_date}</td>
                        <td className="px-1 py-2">{po.deliv_date}</td>
                        <td className="px-1 py-2">{po.purch_grp}</td>
                        <td className="px-1 py-2">{po.supplier}</td>
                        <td className="px-1 py-2">{po.name_1}</td>
                        <td className="px-1 py-2">{po.mat_code}</td>
                        <td className="px-1 py-2">{po.short_text}</td>
                        <td className="px-1 py-2">{po.item_text}</td>
                        <td className="px-1 py-2">{po.mat_grp}</td>
                        <td className="px-1 py-2">{po.po_qty}</td>
                        <td className="px-1 py-2">{po.unit}</td>
                        <td className="px-1 py-2">{po.po_gr_qty}</td>
                        <td className="px-1 py-2">{po.gr_qty}</td>
                        <td className="px-1 py-2">{po.gr_unit}</td>
                        <td className="px-1 py-2">{formatNumber(po.net_price)}</td>
                        <td className="px-1 py-2">{formatNumber(po.total_value)}</td>
                        <td className="px-1 py-2">{formatNumber(po.gr_total_value)}</td>
                        <td className="px-1 py-2">{po.currency}</td>
                        <td className="px-1 py-2">{po.plant}</td>
                        <td className="px-1 py-2">{po.release_date}</td>
                        <td className="px-1 py-2">{po.status}</td>
                        <td className="px-1 py-2">{po.created_name}</td>
                        <td className="px-1 py-2">{po.deliv_addr}</td>
                      </tr>
                    ))
                  ) : (
                    <td className="px-3 py-2 text-center" colSpan={17}>
                      No Records Found
                    </td>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination links={poReport.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
