import { Toaster, useToast } from '@/Components/ui';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IAlternativeUomPage, IMessage, PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { KeyboardEvent, useEffect } from 'react';
import Create from './Create';
import { Pagination, TextInput, AdminUpload } from '@/Components';
import Edit from './Edit';

export default function Index({
  auth,
  altUoms,
  queryParams,
  message,
}: PageProps<{ altUoms: IAlternativeUomPage; queryParams: any; message: IMessage }>) {
  const { toast } = useToast();
  queryParams = queryParams || {};

  useEffect(() => {
    if (message?.success) {
      toast({
        title: message.success,
      });
    }
  }, [message]);

  const searchFieldChanged = (name: string, value: string) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('altuom.index'), queryParams);
  };

  const handleKeyPress = (name: string, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, (e.target as HTMLInputElement).value);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Alternative UOM List</h2>
          <div className="flex gap-2">
            <Create />
            <AdminUpload url={route('altuom.import')} pageName={'Alternative UOM'} />
          </div>
        </div>
      }>
      <Head title="View altUom" />

      <Toaster />

      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 text-black overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-5 flex flex-wrap gap-2">
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-xs text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0 w-24"
                          defaultValue={queryParams.mat_code}
                          onBlur={(e) => searchFieldChanged('mat_code', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('mat_code', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.mat_desc}
                          onBlur={(e) => searchFieldChanged('mat_desc', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('mat_desc', e)}
                        />
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">Material Code</th>
                      <th className="px-3 py-2">Description</th>
                      <th className="px-3 py-2">UOM</th>
                      <th className="px-3 py-2">counter</th>
                      <th className="px-3 py-2">Denom.</th>
                      <th className="px-3 py-2">EAN No.</th>
                      <th className="px-3 py-2">EAN Cat.</th>
                      <th className="px-3 py-2">Unit of Weight</th>
                      <th className="px-3 py-2">Created By</th>
                      <th className="px-3 py-2">Updated By</th>
                      <th className="px-3 py-2">Created At</th>
                      <th className="px-3 py-2">Updated At</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-black">
                    {altUoms.data.length > 0 ? (
                      altUoms.data.map((altUom) => (
                        <tr className="bg-white border-b" key={altUom.id}>
                          <td className="px-3 py-2">{altUom.mat_code}</td>
                          <td className="px-3 py-2 text-nowrap">{altUom.material?.mat_desc || ''}</td>
                          <td className="px-3 py-2">{altUom.alt_uom}</td>
                          <td className="px-3 py-2">{altUom.counter}</td>
                          <td className="px-3 py-2">{altUom.denominator}</td>
                          <td className="px-3 py-2">{altUom.ean_num}</td>
                          <td className="px-3 py-2">{altUom.ean_category}</td>
                          <td className="px-3 py-2">{altUom.unit_of_weight}</td>
                          <td className="px-3 py-2">{altUom.created_by?.name || ''}</td>
                          <td className="px-3 py-2">{altUom.updated_by?.name || ''}</td>
                          <td className="px-3 py-2 text-nowrap">{altUom.created_at}</td>
                          <td className="px-3 py-2 text-nowrap">{altUom.updated_at}</td>
                          <td className="px-3 py-2">
                            <Edit altUom={altUom} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <td className="px-3 py-2 text-center" colSpan={9}>
                        No Records Found
                      </td>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-4">
              <Pagination links={altUoms.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
