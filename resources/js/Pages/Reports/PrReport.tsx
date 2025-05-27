import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { formatNumber } from '@/lib/utils';
import Pagination from '@/Components/Pagination';
import PrReportFilter from './Partials/PrReportFilter';
import DownloadButton from '@/Components/DownloadButton';

export default function PrReport({ auth, prReport, queryParams }: PageProps) {
  queryParams = queryParams || {};

  const filterReport = (queryParam) => {
    router.get(route('report.pr'), queryParam);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">PR Report</h2>
          <div className="flex gap-2">
            <PrReportFilter queryParams={queryParams} filterReport={filterReport} />
            <DownloadButton href={route('download.report.pr', { ...queryParams })} />
          </div>
        </div>
      }>
      <Head title="Purchase Requisition Report" />

      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 text-black shadow-sm sm:rounded-lg ">
            <div className="overflow-x-auto">
              <table className=" table-auto w-[130rem]   text-xs text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-1 py-2">PGrp</th>
                    <th className="px-3 py-2">Purch. Req.</th>
                    <th className="px-3 py-2">PO</th>
                    <th className="px-3 py-2">Item</th>
                    <th className="px-3 py-2">Material</th>
                    <th className="px-3 py-2">Material Description</th>
                    <th className="px-3 py-2">Item Text</th>
                    <th className="px-3 py-2">PR Quantity</th>
                    <th className="px-3 py-2">PR Unit</th>
                    <th className="px-3 py-2">Open PR Qty</th>
                    <th className="px-3 py-2">PO Quantity</th>
                    <th className="px-3 py-2">PO Unit</th>
                    <th className="px-3 py-2">Request Date</th>
                    <th className="px-3 py-2">Deliv. Date</th>
                    <th className="px-3 py-2">Valn Price</th>
                    <th className="px-3 py-2">Total Value</th>
                    <th className="px-3 py-2">Crcy</th>
                    <th className="px-3 py-2">Approved Date</th>
                    <th className="px-3 py-2">Created By</th>
                    <th className="px-3 py-2">Requisitioner</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Plant</th>
                    <th className="px-3 py-2">Reason For PR</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-black">
                  {prReport.data.length > 0 ? (
                    prReport.data.map((pr, index) => (
                      // <tr className="bg-white border-b" key={index}>
                      <tr className={'border-b ' + (index % 2 === 0 ? 'bg-gray-100' : 'bg-white')} key={index}>
                        <td className="px-3 py-2">{pr.purch_grp}</td>
                        <td className="px-3 py-2">{pr.pr_number}</td>
                        <td className="px-3 py-2">{pr.po_number}</td>
                        <td className="px-3 py-2">{pr.item_no}</td>
                        <td className="px-3 py-2">{pr.mat_code}</td>
                        <td className="px-3 py-2">{pr.short_text}</td>
                        <td className="px-3 py-2">{pr.item_text}</td>
                        <td className="px-3 py-2">{pr.qty}</td>
                        <td className="px-3 py-2">{pr.unit}</td>
                        <td className="px-3 py-2">{pr.qty_open}</td>
                        <td className="px-3 py-2">{pr.po_qty}</td>
                        <td className="px-3 py-2">{pr.po_unit}</td>
                        <td className="px-3 py-2">{pr.doc_date}</td>
                        <td className="px-3 py-2">{pr.del_date}</td>
                        <td className="px-3 py-2">{formatNumber(pr.price)}</td>
                        <td className="px-3 py-2">{formatNumber(pr.total_value)}</td>
                        <td className="px-3 py-2">{pr.currency}</td>
                        <td className="px-3 py-2">{pr.release_date}</td>
                        <td className="px-3 py-2">{pr.created_name}</td>
                        <td className="px-3 py-2">{pr.requested_by}</td>
                        <td className="px-3 py-2">{pr.status}</td>
                        <td className="px-3 py-2">{pr.plant}</td>
                        <td className="px-3 py-2">{pr.reason_pr}</td>
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
            <Pagination links={prReport.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
