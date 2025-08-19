import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps, IMessage, ICHGHeaderPage } from '@/types';
import { useEffect, KeyboardEvent, useState } from 'react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import { useToast } from '@/Components/ui/use-toast';
import { Toaster } from '@/Components/ui/toaster';
// import Create from './Create';
// import Edit from './Edit';
import Select from 'react-select';
import { REACT_SELECT_STYLES } from '@/lib/constants';

const ACTION_OPTIONS = [
  { value: '', label: 'All Actions' },
  { value: 'I', label: 'Insert' },
  { value: 'U', label: 'Update' },
];

const ACTION_LABELS: Record<string, string> = {
  I: 'Insert',
  U: 'Update',
  D: 'Delete',
};

export default function Index({
  auth,
  chgHeaders,
  queryParams,
}: PageProps<{ chgHeaders: ICHGHeaderPage }> & PageProps<{ queryParams: any }>) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name: string, value: string) => {
    const newParams = { ...queryParams };

    if (value) {
      newParams[name] = value;
    } else {
      delete newParams[name];
    }

    router.get(route('audit.index'), newParams);
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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Audit Trail</h2>
          <div className="flex gap-2"></div>
        </div>
      }>
      <Head title="View Audit Trail" />
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
                          defaultValue={queryParams.short_text}
                          onBlur={(e) => searchFieldChanged('short_text', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('short_text', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <Select
                          id="action"
                          className="m-2 max-w-50 min-w-50 border-gray-500"
                          options={ACTION_OPTIONS}
                          value={queryParams.action ? ACTION_OPTIONS.find((opt) => opt.value === queryParams.action) : null}
                          onChange={(option: any) => searchFieldChanged('action', option?.value)}
                          placeholder="Action"
                          styles={REACT_SELECT_STYLES}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.new_val}
                          onBlur={(e) => searchFieldChanged('new_val', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('new_val', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.old_val}
                          onBlur={(e) => searchFieldChanged('old_val', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('old_val', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.user}
                          onBlur={(e) => searchFieldChanged('user', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('user', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          type="date"
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.chg_date}
                          onChange={(e) => searchFieldChanged('chg_date', e.target.value)}
                        />
                      </th>
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">Short Text </th>
                      <th className="px-3 py-2">Action</th>
                      <th className="px-3 py-2">New Value</th>
                      <th className="px-3 py-2">Old Value</th>
                      <th className="px-3 py-2">User</th>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-black">
                    {chgHeaders.data && chgHeaders.data.length > 0 ? (
                      chgHeaders.data.map((header) =>
                        header.chg_details.map((detail) => (
                          <tr key={detail.id}>
                            <td className="px-3 py-2">{detail.short_text}</td>
                            <td className="px-3 py-2">{ACTION_LABELS[detail.data_chgtyp] ?? detail.data_chgtyp}</td>
                            <td className="px-3 py-2">{detail.data_newvalue}</td>
                            <td className="px-3 py-2">{detail.data_oldvalue}</td>
                            <td className="px-3 py-2">{header.user?.name ?? '-'}</td>
                            <td className="px-3 py-2">{new Date(header.timestamp).toLocaleDateString()}</td>
                            <td className="px-3 py-2">{new Date(header.timestamp).toLocaleTimeString()}</td>
                          </tr>
                        ))
                      )
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          No data found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-4">
              <Pagination links={chgHeaders.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
