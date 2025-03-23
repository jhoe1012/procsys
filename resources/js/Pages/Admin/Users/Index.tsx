import { Toaster, useToast } from '@/Components/ui';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { IMessage, IUserPage, PageProps, IPlants, IRoles } from '@/types';
import { Head, router } from '@inertiajs/react';
import { KeyboardEvent, useEffect } from 'react';
import Create from './Create';
import { Pagination, TextInput } from '@/Components';
import Edit from './Edit';
import Select from 'react-select';
import { REACT_SELECT_STYLES } from '@/lib/constants';

export default function Index({
  auth,
  users,
  roles,
  plants,
  queryParams,
  message,
}: PageProps<{ users: IUserPage; roles: IRoles[]; plants: IPlants[]; queryParams: any; message: IMessage }>) {
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
          <Create roles={roles} plants={plants} />
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
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>

                  <tbody className="text-xs text-black">
                    {users.data.length > 0 ? (
                      users.data.map((user) => (
                        <tr className="bg-white border-b" key={user.id}>
                          <td className="px-3 py-2">{user.name}</td>
                          <td className="px-3 py-2">{user.email}</td>
                          <td className="px-3 py-2">{user.position}</td>
                          <td className="px-3 py-2">{user.roles && user.roles.map((role) => role.name).join(', ')}</td>
                          <td className="px-3 py-2">{user.plants && user.plants.map((plant) => plant.name1).join(', ')}</td>
                          <td className="px-3 py-2">
                            <Edit user={user} roles={roles} plants={plants} />
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
