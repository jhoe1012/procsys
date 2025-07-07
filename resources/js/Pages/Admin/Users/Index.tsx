import { Toaster, useToast } from '@/Components/ui';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IMessage, IUserPage, PageProps, IPlants, IRoles, IDeliveryAddress, IPrCtrlGrp } from '@/types';
import { Head, router } from '@inertiajs/react';
import { KeyboardEvent, useEffect } from 'react';
import Create from './Create';
import { Pagination, TextInput } from '@/Components';
import Edit from './Edit';
import Select from 'react-select';
import { REACT_SELECT_STYLES } from '@/lib/constants';
import AttributeDetails from './AttributeDetails';

export default function Index({
  auth,
  users,
  roles,
  plants,
  queryParams,
  message,
  prCtrlGrps,
  deliveryAddress,
}: PageProps<{
  users: IUserPage;
  roles: IRoles[];
  plants: IPlants[];
  queryParams: any;
  message: IMessage;
  prCtrlGrps: IPrCtrlGrp[];
  deliveryAddress: IDeliveryAddress[];
}>) {
  const { toast } = useToast();
  const _roles = roles.map((role) => ({ label: role.name, value: role.name }));
  const _plants = plants.map((plant) => ({ label: plant.name1, value: plant.plant }));

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

    router.get(route('user.index'), queryParams);
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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">User List</h2>
          <Create roles={roles} plants={plants} prCtrlGrp={prCtrlGrps} deliveryAddress={deliveryAddress} />
        </div>
      }>
      <Head title="View user" />

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
                      <th className="px-3 py-2">
                        <Select
                          id="type"
                          className="m-2 max-w-50 min-w-50 border-gray-500"
                          options={_roles}
                          value={queryParams.role ? { label: `${queryParams.role} `, value: queryParams.role } : null}
                          onChange={(option: any) => searchFieldChanged('role', option?.value)}
                          placeholder="Roles"
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
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Position</th>
                      <th className="px-3 py-2 ">Role</th>
                      <th className="px-3 py-2">Plant</th>
                      <th className="px-3 py-2">Ctrl Grp</th>
                      <th className="px-3 py-2">For Fin. CC addr.</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>

                  <tbody className="text-xs text-black">
                    {users.data.length > 0 ? (
                      users.data.map((user) => (
                        <tr className="bg-white border-b" key={user.id}>
                          <td className="px-3 py-2 max- w-[15%]">{user.name}</td>
                          <td className="px-3 py-2 max- w-[10%]">{user.email}</td>
                          <td className="px-3 py-2 max- w-[10%]">{user.position}</td>
                          <td className="px-3 py-2 max- w-[10%]">{user.roles && user.roles.map((role) => role.name).join(', ')}</td>
                          <td className="px-3 py-2 max- w-[10%]">
                            {user.plants && (
                              <AttributeDetails
                                columns={[
                                  { header: 'Plant', key: 'plant' },
                                  { header: 'Plant Name', key: 'name1' },
                                ]}
                                data={user.plants}
                                label={user.plants.map((plant) => plant.plant).join(', ')}
                              />
                            )}
                          </td>
                          <td className="px-3 py-2 max- w-[5%]">
                            {user.prCtrlGrps && (
                              <AttributeDetails
                                columns={[
                                  { header: 'ID', key: 'id' },
                                  { header: 'Plant ID', key: 'plant_id' },
                                  { header: 'Controller Group', key: 'prctrl_grp' },
                                  { header: 'Controller Description', key: 'prctrl_desc' },
                                ]}
                                data={user.prCtrlGrps}
                                label={user.prCtrlGrps
                                  .map((prCtrlGrp) => prCtrlGrp.id)
                                  .join(', ')
                                  .substring(0, 10)}
                              />
                            )}
                          </td>
                          <td className="px-3 py-2 max- w-[5%]">
                            {user.delivery_addresses && (
                              <AttributeDetails
                                columns={[
                                  { header: 'ID', key: 'id' },
                                  { header: 'Plant', key: 'plant' },
                                  { header: 'Address', key: 'address' },
                                ]}
                                data={user.delivery_addresses}
                                label={user.delivery_addresses
                                  .map((del_addr) => del_addr.id)
                                  .join(', ')
                                  .substring(0, 10)}
                              />
                            )}
                          </td>
                          <td className="px-3 py-2 max- w-[5%]">
                            <Edit user={user} roles={roles} plants={plants} prCtrlGrp={prCtrlGrps} deliveryAddress={deliveryAddress} />
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
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
