import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps, IMessage, IPlants, IPurchasingGroupPage, IProcurementGroup, IMaterial, IPrCtrlGrp } from '@/types';
import { useEffect, KeyboardEvent } from 'react';
// import { AdminUpload } from '@/Components';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import { useToast } from '@/Components/ui/use-toast';
import { Toaster } from '@/Components/ui/toaster';
import Create from './Create';
import Edit from './Edit';
// import { Choice } from '@/Components/SelectComponent';
import Select from 'react-select';
import { REACT_SELECT_STYLES } from '@/lib/constants';

export default function Index({
  auth,
  purchgrps,
  queryParams,
  plants,
  message,
  procgrps,
  prctrlgrp,
}: PageProps<{ purchgrps: IPurchasingGroupPage; procgrps: IProcurementGroup[]; plants: IPlants[]; prctrlgrp: IPrCtrlGrp[] }> &
  PageProps<{ queryParams: any }> &
  PageProps<{ message: IMessage }>) {
  const { toast } = useToast();
  const _procgrps = procgrps.map((procgrp) => ({ label: `${procgrp.purch_grp} (${procgrp.name1})`, value: procgrp.purch_grp }));
  const _plants = plants.map((plant) => ({ label: plant.name1, value: plant.plant }));
  const allOption = { label: 'Show All', value: '' };
  const _procgrpsWithAll = [allOption, ..._procgrps];

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

    router.get(route('purchgrp.index'), queryParams);
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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Material Purchasing Groups</h2>
          <div className="flex gap-2"></div>
          <Create procgrps={procgrps} prctrlgrp={prctrlgrp} plants={plants} />
        </div>
      }>
      <Head title="View purchgrp" />

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
                      <th className="px-3 py-2">
                        <Select
                          id="type"
                          className="m-2 max-w-50 min-w-50 border-gray-500 text-xs"
                          options={_procgrpsWithAll}
                          value={queryParams.purch_grp ? { label: `${queryParams.purch_grp} `, value: queryParams.purch_grp } : null}
                          onChange={(option: any) => searchFieldChanged('purch_grp', option?.value)}
                          placeholder="Purchase Group"
                          styles={REACT_SELECT_STYLES}
                        />
                      </th>
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
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">Material Code</th>
                      <th className="px-3 py-2">Material</th>
                      <th className="px-3 py-2">Purchase Group</th>
                      <th className="px-3 py-2">Plant</th>
                      <th className="px-3 py-2">Unit Issue</th>
                      <th className="px-3 py-2">Planned Delivery Time</th>
                      <th className="px-3 py-2">GR Proc. Time</th>
                      <th className="px-3 py-2">Min Lot Size</th>
                      <th className="px-3 py-2">Max Lot Size</th>
                      <th className="px-3 py-2">Fix Lot Size</th>
                      <th className="px-3 py-2">Rounding Value</th>
                      {/* <th className="px-3 py-2">PR Control Group</th> */}
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-black">
                    {purchgrps.data.length > 0 ? (
                      purchgrps.data.map((purchgrp) => (
                        <tr className="bg-white border-b" key={purchgrp.id}>
                          <td className="px-3 py-2">{purchgrp.materials?.mat_code}</td>
                          <td className="px-3 py-2">{purchgrp.materials?.mat_desc}</td>
                          <td className="px-3 py-2">{purchgrp.purch_grp}</td>
                          <td className="px-3 py-2">{purchgrp.plants?.name1}</td>
                          <td className="px-3 py-2 text-nowrap">{purchgrp.unit_issue}</td>
                          <td className="px-3 py-2">{purchgrp.plan_deliv_time}</td>
                          <td className="px-3 py-2">{purchgrp.gr_proc_time}</td>
                          <td className="px-3 py-2">{purchgrp.min_lot_size}</td>
                          <td className="px-3 py-2">{purchgrp.max_lot_size}</td>
                          <td className="px-3 py-2">{purchgrp.fix_lot_size}</td>
                          <td className="px-3 py-2 text-nowrap">{purchgrp.rounding_value}</td>
                          <td className="px-3 py-2">
                            <Edit p_purchgrp={purchgrp}  procgrps={procgrps} prctrlgrp={prctrlgrp} plants={plants}/>
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
              <Pagination links={purchgrps.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
