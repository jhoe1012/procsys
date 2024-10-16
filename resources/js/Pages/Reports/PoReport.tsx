import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';

import { formatNumber } from '@/lib/utils';
import Pagination from '@/Components/Pagination';
import PoReportFilter from './Partials/PoReportFilter';

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
            <a
              href={route('download.report.po', { ...queryParams })}
              target="_blank"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm p-1 text-center "
              title="Download">
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </a>
          </div>
        </div>
      }>
      <Head title="View Approvers" />

      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 text-black shadow-sm sm:rounded-lg ">
            <div className="overflow-x-auto">
              <table className=" table-auto w-[130rem]   text-xs text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-1 py-2">Pur. Doc</th>
                    <th className="px-1 py-2">GR Doc</th>
                    <th className="px-3 py-2">Item</th>
                    <th className="px-3 py-2">Doc Date</th>
                    <th className="px-3 py-2">PGr</th>
                    <th className="px-3 py-2">Supplier</th>
                    <th className="px-3 py-2">Supplier Name</th>
                    <th className="px-3 py-2">Material</th>
                    <th className="px-3 py-2">Short Text</th>
                    <th className="px-3 py-2">Matl Grp</th>
                    <th className="px-3 py-2">PO Quantity</th>
                    <th className="px-3 py-2">PO Unit</th>
                    <th className="px-3 py-2">Open PO Qty</th>
                    <th className="px-3 py-2">GR Quantity</th>
                    <th className="px-3 py-2">GR Unit</th>
                    <th className="px-3 py-2">Net Price</th>
                    <th className="px-3 py-2">Total Value</th>
                    <th className="px-3 py-2">Release Date</th>
                    <th className="px-3 py-2">Crcy</th>
                    <th className="px-3 py-2">Plant</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-black">
                  {poReport.data.length > 0 ? (
                    poReport.data.map((po, index) => (
                      <tr className="bg-white border-b" key={index}>
                        <td className="px-1 py-2">{po.po_number}</td>
                        <td className="px-1 py-2">{po.gr_number}</td>
                        <td className="px-1 py-2">{po.item_no}</td>
                        <td className="px-1 py-2">{po.doc_date}</td>
                        <td className="px-1 py-2">{po.purch_grp}</td>
                        <td className="px-1 py-2">{po.supplier}</td>
                        <td className="px-1 py-2">{po.name_1}</td>
                        <td className="px-1 py-2">{po.mat_code}</td>
                        <td className="px-1 py-2">{po.short_text}</td>
                        <td className="px-1 py-2">{po.mat_grp}</td>
                        <td className="px-1 py-2">{po.po_qty}</td>
                        <td className="px-1 py-2">{po.unit}</td>                        
                        <td className="px-1 py-2">{po.po_gr_qty}</td>
                        <td className="px-1 py-2">{po.gr_qty}</td>                        
                        <td className="px-1 py-2">{po.gr_unit}</td>                        
                        <td className="px-1 py-2">{formatNumber(po.net_price)}</td>                        
                        <td className="px-1 py-2">{formatNumber(po.total_value)}</td>                        
                        <td className="px-1 py-2">{po.release_date}</td>                        
                        <td className="px-1 py-2">{po.currency}</td>                        
                        <td className="px-1 py-2">{po.plant}</td>                        
                        <td className="px-1 py-2">{po.status}</td>                        
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
