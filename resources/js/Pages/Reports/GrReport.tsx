import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import Pagination from '@/Components/Pagination';
import GrReportFilter from './Partials/GrReportFilter';
import DownloadButton from '@/Components/DownloadButton';
import { formatNumber } from '@/lib/utils';

export default function GrReport({ auth, grReport, queryParams }: PageProps) {
  queryParams = queryParams || {};

  const filterReport = (queryParam) => {
    router.get(route('report.gr'), queryParam);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">GR Report</h2>
          <div className="flex gap-2">
            <GrReportFilter queryParams={queryParams} filterReport={filterReport} />
            <DownloadButton href={route('download.report.gr', { ...queryParams })} />
          </div>
        </div>
      }>
      <Head title="Good Receipt Report" />

      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 text-black shadow-sm sm:rounded-lg ">
            <div className="overflow-x-auto">
              <table className=" table-auto w-[150rem]   text-xs text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-1 py-2">GR Number</th>
                    <th className="px-1 py-2">PO Number</th>
                    <th className="px-1 py-2">Control Number</th>
                    <th className="px-1 py-2">Created by</th>
                    <th className="px-1 py-2">Supplier</th>
                    <th className="px-1 py-2">Supplier Name</th>
                    <th className="px-1 py-2">Plant</th>
                    <th className="px-1 py-2">Entry Date</th>
                    <th className="px-1 py-2">Actual Recv Date</th>
                    <th className="px-1 py-2">Delivery Note</th>
                    <th className="px-1 py-2">Header Text</th>
                    <th className="px-1 py-2">Item No</th>
                    <th className="px-1 py-2">Mat Code</th>
                    <th className="px-1 py-2">Material Description</th>
                    <th className="px-1 py-2">Item Text</th>
                    <th className="px-1 py-2">Qty</th>
                    <th className="px-1 py-2">Unit</th>
                    <th className="px-1 py-2">Open PO</th>
                    <th className="px-1 py-2">Price</th>
                    <th className="px-1 py-2">Total Value</th>
                    <th className="px-1 py-2">Batch</th>
                    <th className="px-1 py-2">Mfg Date</th>
                    <th className="px-1 py-2">SLED / BBD</th>
                    <th className="px-1 py-2">Cancel Date</th>
                    <th className="px-1 py-2">Cancel by</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-black">
                  {grReport.data.length > 0 ? (
                    grReport.data.map((gr, index) => (
                      // <tr className="bg-white border-b" key={index}>
                      <tr className={'border-b ' + (index % 2 === 0 ? 'bg-gray-100' : 'bg-white')} key={index}>
                        <td className="px-3 py-2">{gr.gr_number}</td>
                        <td className="px-3 py-2">{gr.po_number}</td>
                        <td className="px-3 py-2">{gr.control_no}</td>
                        <td className="px-3 py-2">{gr.created_name}</td>
                        <td className="px-3 py-2">{gr.supplier}</td>
                        <td className="px-3 py-2">{gr.name_1}</td>
                        <td className="px-3 py-2">{gr.plant}</td>
                        <td className="px-3 py-2">{gr.entry_date}</td>
                        <td className="px-3 py-2">{gr.actual_date}</td>
                        <td className="px-3 py-2">{gr.delivery_note}</td>
                        <td className="px-3 py-2">{gr.header_text}</td>
                        <td className="px-3 py-2">{gr.item_no}</td>
                        <td className="px-3 py-2">{gr.mat_code}</td>
                        <td className="px-3 py-2">{gr.short_text}</td>
                        <td className="px-3 py-2">{gr.item_text}</td>
                        <td className="px-3 py-2">{gr.gr_qty}</td>
                        <td className="px-3 py-2">{gr.unit}</td>
                        <td className="px-3 py-2">{gr.po_gr_qty}</td>
                        <td className="px-3 py-2">{formatNumber(gr.net_price)}</td>
                        <td className="px-3 py-2">{formatNumber(gr.total_value)}</td>
                        <td className="px-3 py-2">{gr.batch}</td>
                        <td className="px-3 py-2">{gr.mfg_date}</td>
                        <td className="px-3 py-2">{gr.sled_bbd}</td>
                        <td className="px-3 py-2">{gr.cancel_datetime}</td>
                        <td className="px-3 py-2">{gr.cancel_by}</td>
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
            <Pagination links={grReport.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
