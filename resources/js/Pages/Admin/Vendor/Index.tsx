import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps, IMessage, IVendorPage } from '@/types';
import { useEffect, KeyboardEvent } from 'react';
import { AdminUpload } from '@/Components';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import { useToast } from '@/Components/ui/use-toast';
import { Toaster } from '@/Components/ui/toaster';
import Create from './Create';
import Edit from './Edit';
import { Choice } from '@/Components/SelectComponent';

export default function Index({
  auth,
  vendors,
  queryParams,
  plant,
  message,
}: PageProps<{ vendors: IVendorPage }> &
  PageProps<{ queryParams: any }> &
  PageProps<{ plant: Choice }> &
  PageProps<{ message: IMessage }>) {


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

    router.get(route('vendor.index'), queryParams);
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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Vendor List</h2>
          <div className="flex gap-2">
            <Create />
            <AdminUpload url={route('vendor.import')} pageName={'Vendor'} />
          </div>
        </div>
      }>
      <Head title="View Vendor" />

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
                          defaultValue={queryParams.supplier}
                          onBlur={(e) => searchFieldChanged('supplier', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('supplier', e)}
                        />
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.name_1}
                          onBlur={(e) => searchFieldChanged('name_1', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('name_1', e)}
                        />
                      </th>
                      {/* <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th> */}
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.city}
                          onBlur={(e) => searchFieldChanged('city', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('city', e)}
                        />
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.postal_code}
                          onBlur={(e) => searchFieldChanged('postal_code', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('postal_code', e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.street}
                          onBlur={(e) => searchFieldChanged('street', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('street', e)}
                        />
                      </th>
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">Supplier</th>
                      <th className="px-3 py-2">Accnt Grp</th>
                      <th className="px-3 py-2">Tax Number</th>
                      <th className="px-3 py-2">Tax Number 2</th>
                      <th className="px-3 py-2">Name 1</th>
                      {/* <th className="px-3 py-2">Name 2</th>
                      <th className="px-3 py-2">Name 3</th>
                      <th className="px-3 py-2">Name 4</th> */}
                      <th className="px-3 py-2">City</th>
                      <th className="px-3 py-2">Country</th>
                      <th className="px-3 py-2">District</th>
                      <th className="px-3 py-2">Postal Code</th>
                      <th className="px-3 py-2">Street</th>
                      <th className="px-3 py-2">Telephone 1</th>
                      {/* <th className="px-3 py-2">Telephone 2</th> */}
                      <th className="px-3 py-2">Vat Reg No</th>
                      <th className="px-3 py-2">Email Address</th>
                      <th className="px-3 py-2">Payment Terms </th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>

                  <tbody className="text-xs text-black">
                    {vendors.data.length > 0 ? (
                      vendors.data.map((vendor) => (
                        <tr className="bg-white border-b" key={vendor.id}>
                          <td className="px-3 py-2">{vendor.supplier}</td>
                          <td className="px-3 py-2">{vendor.account_group}</td>
                          <td className="px-3 py-2">{vendor.tax_number}</td>
                          <td className="px-3 py-2">{vendor.tax_number_2}</td>
                          <td className="px-3 py-2 text-nowrap">{vendor.name_1}</td>
                          {/* <td className="px-3 py-2">{vendor.name_2}</td>
                          <td className="px-3 py-2">{vendor.name_3}</td>
                          <td className="px-3 py-2">{vendor.name_4}</td> */}
                          <td className="px-3 py-2">{vendor.city}</td>
                          <td className="px-3 py-2">{vendor.country}</td>
                          <td className="px-3 py-2">{vendor.district}</td>
                          <td className="px-3 py-2">{vendor.postal_code}</td>
                          <td className="px-3 py-2 text-nowrap">{vendor.street}</td>
                          <td className="px-3 py-2">{vendor.telephone_1}</td>
                          {/* <td className="px-3 py-2">{vendor.telephone_2}</td> */}
                          <td className="px-3 py-2">{vendor.vat_reg_no}</td>

                          <td className="px-3 py-2">{vendor.email_1}</td>
                          <td className="px-3 py-2">{vendor.payment_terms}</td>
                          <td className="px-3 py-2">
                            <Edit p_vendor={vendor} />
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
              <Pagination links={vendors.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
