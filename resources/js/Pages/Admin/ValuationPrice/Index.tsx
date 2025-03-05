import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps, IMessage, IMaterialValuationPage, Choice } from '@/types';
import { useEffect, KeyboardEvent } from 'react';
import { AdminUpload, Pagination, TextInput } from '@/Components';
import { Toaster, useToast } from '@/Components/ui';
import Create from './Create';
import Edit from './Edit';

export default function Index({
  auth,
  materialValuation,
  queryParams,
  plant,
  message,
}: PageProps<{ materialValuation: IMaterialValuationPage; queryParams: any; plant: Choice; message: IMessage }>) {
  const { toast } = useToast();

  useEffect(() => {
    if (message?.success) {
      toast({
        title: message.success,
      });
    }
  }, [message]);

  queryParams = queryParams || {};

  const searchFieldChanged = (name: string, value: string) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('val_price.index'), queryParams);
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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Valuation Price List</h2>
          <div className="flex gap-2">
            <Create p_plants={plant} />
            <AdminUpload url={route('val_price.import')} pageName={'Valuation Price List'} />
          </div>
        </div>
      }>
      <Head title="View Valuation Price " />

      <Toaster />

      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 text-black overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-5 flex flex-wrap gap-2">
              <div className="flex-1">
                <table className=" table-auto w-full text-xs text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.plant}
                          onBlur={(e) => searchFieldChanged('plant', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('plant', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.material}
                          onBlur={(e) => searchFieldChanged('material', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('material', e)}
                        />
                      </th>
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">Plant</th>
                      <th className="px-3 py-2">Material</th>
                      <th className="px-3 py-2">Currency</th>
                      <th className="px-3 py-2">Valuation Price</th>
                      <th className="px-3 py-2">UOM</th>
                      <th className="px-3 py-2">Valid From</th>
                      <th className="px-3 py-2">Valid To</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>

                  <tbody className="text-xs text-black">
                    {materialValuation.data.length > 0 ? (
                      materialValuation.data.map((material) => (
                        <tr className="bg-white border-b" key={material.id}>
                          <td className="px-3 py-2">
                            {material.plant} - {material.plants?.name1}
                          </td>
                          <td className="px-3 py-2">
                            {material.mat_code} - {material.material?.mat_desc}
                          </td>
                          <td className="px-3 py-2">{material.currency}</td>
                          <td className="px-3 py-2">{material.valuation_price}</td>
                          <td className="px-3 py-2">{material.material?.base_uom}</td>
                          <td className="px-3 py-2">{material.valid_from}</td>
                          <td className="px-3 py-2">{material.valid_to}</td>
                          <td className="px-3 py-2">
                            <Edit p_plants={plant} p_material={material} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <td className="px-3 py-2 text-center" colSpan={8}>
                        No Records Found
                      </td>
                    )}
                  </tbody>
                </table>
                <Pagination links={materialValuation.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
