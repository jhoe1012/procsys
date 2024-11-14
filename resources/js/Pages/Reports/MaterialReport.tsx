import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { formatNumber } from '@/lib/utils';
import Pagination from '@/Components/Pagination';
import MaterialReportFilter from './Partials/MaterialReportFilter';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import DownloadButton from '@/Components/DownloadButton';

export default function MaterialReport({ auth, materialReport, queryParams }: PageProps) {
  queryParams = queryParams || {};

  const filterReport = (queryParam) => {
    router.get(route('report.material'), queryParam);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Material Report</h2>
          <div className="flex gap-2">
            <MaterialReportFilter queryParams={queryParams} filterReport={filterReport} />
            <DownloadButton href={route('download.report.material', { ...queryParams })} />
          </div>
        </div>
      }>
      <Head title="Material Report" />

      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 text-black shadow-sm sm:rounded-lg ">
            <div className="overflow-x-auto">
              <table className=" table-auto w-full   text-xs text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-1 py-2">Material</th>
                    <th className="px-3 py-2">Material Description</th>
                    <th className="px-3 py-2">Base UOM</th>
                    <th className="px-3 py-2">Order UOM</th>
                    <th className="px-3 py-2">Alt. Uom</th>
                    <th className="px-3 py-2">Counter</th>
                    <th className="px-3 py-2">Denominator</th>
                    <th className="px-3 py-2">EAN No.</th>
                    <th className="px-3 py-2">EAN UPC</th>
                    <th className="px-3 py-2">EAN Category</th>
                    <th className="px-3 py-2">Unit of Weight</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-black">
                  {materialReport.data.length > 0 ? (
                    materialReport.data.map((material, index) => (
                      // <tr className="bg-white border-b" key={index}>
                      <tr className={'border-b ' + (index % 2 === 0 ? 'bg-gray-100' : 'bg-white')} key={index}>
                        <td className="px-3 py-2">{material.mat_code}</td>
                        <td className="px-3 py-2">{material.mat_desc}</td>
                        <td className="px-3 py-2">{material.base_uom}</td>
                        <td className="px-3 py-2">{material.order_uom}</td>
                        <td className="px-3 py-2">{material.alt_uom}</td>
                        <td className="px-3 py-2">{material.counter}</td>
                        <td className="px-3 py-2">{material.denominator}</td>
                        <td className="px-3 py-2">{material.ean_num}</td>
                        <td className="px-3 py-2">{material.ean_upc}</td>
                        <td className="px-3 py-2">{material.ean_category}</td>
                        <td className="px-3 py-2">{material.unit_of_weight}</td>
                      </tr>
                    ))
                  ) : (
                    <td className="px-3 py-2 text-center" colSpan={11}>
                      No Records Found
                    </td>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination links={materialReport.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
