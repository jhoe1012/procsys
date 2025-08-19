import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps, IMessage, IPrCtrlGrpPage, IPlants } from '@/types';
import { useEffect, KeyboardEvent } from 'react';
// import { AdminUpload } from '@/Components';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import { useToast } from '@/Components/ui/use-toast';
import { Toaster } from '@/Components/ui/toaster';
import Create from './Create';
import Edit from './Edit';
import Select from 'react-select';
import { REACT_SELECT_STYLES } from '@/lib/constants';

export default function Index({
  auth,
  prctrlgrps,
  plants,
  queryParams,
  message,
}: PageProps<{ prctrlgrps: IPrCtrlGrpPage; plants: IPlants[] }> & PageProps<{ queryParams: any }> & PageProps<{ message: IMessage }>) {
  const { toast } = useToast();
  const _plants = plants.map((plant) => ({ label: `${plant.plant} - ${plant.name1}`, value: plant.plant }));
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

    router.get(route('prctrlgrp.index'), queryParams);
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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">PR Controller Group</h2>
          <div className="flex gap-2"></div>
          <Create plants={plants} />
        </div>
      }>
      <Head title="View PR Controller Group" />
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
                        <Select
                          id="type"
                          className="m-2 max-w-50 min-w-50 border-gray-500"
                          options={_plants}
                          value={queryParams.plant ? { label: `${queryParams.plant} `, value: queryParams.plant } : null}
                          onChange={(option: any) => searchFieldChanged('plant', option?.value)}
                          placeholder="Plants"
                          styles={REACT_SELECT_STYLES}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.prctrl_grp}
                          onBlur={(e) => searchFieldChanged('prctrl_grp', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('prctrl_grp', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.prctrl_desc}
                          onBlur={(e) => searchFieldChanged('prctrl_desc', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('prctrl_desc', e)}
                        />
                      </th>
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">Plant </th>
                      <th className="px-3 py-2">Controller Group</th>
                      <th className="px-3 py-2">Description </th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-black">
                    {prctrlgrps.data.length > 0 ? (
                      prctrlgrps.data.map((prctrlgrp) => (
                        <tr className="bg-white border-b" key={prctrlgrp.id}>
                          <td className="px-3 py-2">{prctrlgrp.plant}</td>
                          <td className="px-3 py-2">{prctrlgrp.prctrl_grp}</td>
                          <td className="px-3 py-2">{prctrlgrp.prctrl_desc}</td>

                          <td className="px-3 py-2">
                            <Edit prctrlgrps={prctrlgrp} plants={plants} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-3 py-2 text-center" colSpan={12}>
                          No Records Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-4">
              <Pagination links={prctrlgrps.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
