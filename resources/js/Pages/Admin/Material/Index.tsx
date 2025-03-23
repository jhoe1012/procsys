import { Toaster, useToast } from '@/Components/ui';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Choice, IMaterialPage, IMessage, PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { KeyboardEvent, useEffect } from 'react';
import Create from './Create';
import { Pagination, TextInput , AdminUpload } from '@/Components';
import Edit from './Edit';
export default function Index({
  auth,
  materials,
  materialGroups,
  queryParams,
  message,
}: PageProps<{ materials: IMaterialPage; materialGroups: Choice[]; queryParams: any; message: IMessage }>) {
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

    router.get(route('material.index'), queryParams);
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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Material List</h2>
          <div className="flex gap-2">
            <Create materialGroups={materialGroups} />
            <AdminUpload url={route('material.import')} pageName={'Material'} />
          </div>
        </div>
      }>
      <Head title="View Material" />

      <Toaster />

      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 text-black overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-5 flex flex-wrap gap-2">
              <div className="flex-1 overflow-x-auto">
                <table className="w-[130rem] text-xs text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
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
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.mat_grp_desc}
                          onBlur={(e) => searchFieldChanged('mat_grp_desc', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('mat_grp_desc', e)}
                        />
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">Material Code</th>
                      <th className="px-3 py-2">Description</th>
                      <th className="px-3 py-2">Old Material Code</th>
                      <th className="px-3 py-2">Material Type</th>
                      <th className="px-3 py-2">Material Group Code</th>
                      <th className="px-3 py-2">Material Group</th>
                      <th className="px-3 py-2">Base UOM</th>
                      <th className="px-3 py-2">Order UOM</th>
                      <th className="px-3 py-2">Min Shelf Life</th>
                      <th className="px-3 py-2">Total Shelf Life</th>
                      <th className="px-3 py-2">Created By</th>
                      <th className="px-3 py-2">Updated By</th>
                      <th className="px-3 py-2">Created At</th>
                      <th className="px-3 py-2">Updated At</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>

                  <tbody className="text-xs text-black">
                    {materials.data.length > 0 ? (
                      materials.data.map((material) => (
                        <tr className="bg-white border-b" key={material.id}>
                          <td className="px-3 py-2">{material.mat_code}</td>
                          <td className="px-3 py-2">{material.mat_desc}</td>
                          <td className="px-3 py-2">{material.old_mat_code}</td>
                          <td className="px-3 py-2">{material.mat_type}</td>
                          <td className="px-3 py-2">{material.materialGroups?.mat_grp_code || ''}</td>
                          <td className="px-3 py-2">{material.materialGroups?.mat_grp_desc || ''}</td>
                          <td className="px-3 py-2">{material.base_uom}</td>
                          <td className="px-3 py-2">{material.order_uom}</td>
                          <td className="px-3 py-2">{material.min_rem_shelf_life}</td>
                          <td className="px-3 py-2">{material.total_shelf_life}</td>
                          <td className="px-3 py-2">{material.created_by?.name || ''}</td>
                          <td className="px-3 py-2">{material.updated_by?.name || ''}</td>
                          <td className="px-3 py-2">{material.created_at}</td>
                          <td className="px-3 py-2">{material.updated_at}</td>
                          <td className="px-3 py-2">
                            <Edit material={material} materialGroups={materialGroups} />
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
              <Pagination links={materials.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
