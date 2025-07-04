import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps, IMessage, IApproverPage, IPlants, IPrCtrlGrp, Choice } from '@/types';
import { useEffect, KeyboardEvent } from 'react';
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
  approvers,
  plants,
  prCtrlGrps,
  queryParams,
  message,
}: PageProps<{ approvers: IApproverPage; plants: IPlants[]; prCtrlGrps: IPrCtrlGrp[]; queryParams: any; message: IMessage }>) {
  const { toast } = useToast();
  const plantChoice: Choice[] = plants.map((plant) => ({ label: plant.name1, value: plant.plant }));
  const prCtrlGrpsChoice: Choice[] = prCtrlGrps.map((item) => ({
    label: `${item.plant_id} - ${item.prctrl_grp} ${item.prctrl_desc}`,
    value: item.id,
  }));

  useEffect(() => {
    if (message?.success) {
      toast({
        title: message.success,
      });
    }
  }, []);

  queryParams = queryParams || {};

  const searchFieldChanged = (name: string, value: string) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('approver.index'), queryParams);
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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Approvers List</h2>
          <Create plantChoice={plantChoice} prCtrlGrpsChoice={prCtrlGrpsChoice} />
        </div>
      }>
      <Head title="View Approvers" />

      <Toaster />

      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 text-black overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-5 flex flex-wrap gap-2">
              <div className="flex-1">
                <table className=" table-auto w-full text-xs text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <Select
                          id="plant"
                          className="m-2 max-w-32 min-w-32  border-gray-500"
                          options={plantChoice}
                          value={queryParams.plant ? { label: `${queryParams.plant} `, value: queryParams.plant } : null}
                          onChange={(option: any) => searchFieldChanged('plant', option?.value)}
                          placeholder="Plants"
                          styles={REACT_SELECT_STYLES}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.name}
                          onBlur={(e) => searchFieldChanged('name', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('name', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.email}
                          onBlur={(e) => searchFieldChanged('email', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('email', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.position}
                          onBlur={(e) => searchFieldChanged('position', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('position', e)}
                        />
                      </th>
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Plant</th>
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Position</th>
                      <th className="px-3 py-2">Amount From</th>
                      <th className="px-3 py-2">Amount To</th>
                      <th className="px-3 py-2">Seq</th>
                      <th className="px-3 py-2">Description</th>
                      <th className="px-3 py-2">Ctrl Grp</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>

                  <tbody className="text-xs text-black">
                    {approvers.data.length > 0 ? (
                      approvers.data.map((approver) => (
                        <tr className="bg-white border-b" key={approver.id}>
                          <td className="px-3 py-2">{approver.type.toUpperCase()}</td>
                          <td className="px-3 py-2">
                            {approver.plants?.plant} - {approver.plants?.name1}
                          </td>
                          <td className="px-3 py-2">{approver.user?.name}</td>
                          <td className="px-3 py-2">{approver.user?.email}</td>
                          <td className="px-3 py-2">{approver.position}</td>
                          <td className="px-3 py-2">{approver.amount_from}</td>
                          <td className="px-3 py-2">{approver.amount_to}</td>
                          <td className="px-3 py-2">{approver.seq}</td>
                          <td className="px-3 py-2">{approver.desc}</td>
                          <td className="px-3 py-2">{approver.prCtrlGrps?.prctrl_desc}</td>
                          <td className="px-3 py-2">
                            <Edit plantChoice={plantChoice} p_approver={approver} prCtrlGrpsChoice={prCtrlGrpsChoice} />
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
                <Pagination links={approvers.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
