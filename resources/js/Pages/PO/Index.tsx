import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
  PageProps, IMessage,
  IPOHeaderPage,
  IPOHeader,
  IPOMaterial
} from '@/types';
import Modal from '@/Components/Modal';

import { useState, useEffect, KeyboardEvent } from 'react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import { useToast } from '@/Components/ui/use-toast';
import { Toaster } from '@/Components/ui/toaster';
import { formatNumber } from '@/lib/utils';

export default function Index({
  auth,
  po_header,
  queryParams = {},
  message,
}: PageProps<{ po_header: IPOHeaderPage }> & PageProps<{ queryParams: any }> & PageProps<{ message: IMessage }>) {
  const [selectedPO, setSelectedPO] = useState<IPOHeader | null>(null);
  const [poMaterials, setPoMaterials] = useState<IPOMaterial[]>([]);

  queryParams = queryParams || {};

  const { toast } = useToast();

  useEffect(() => {
    if (message?.success) {
      toast({
        title: message.success,
      });
    }
  }, []);

  useEffect(() => {
    if (selectedPO) {
      setPoMaterials(selectedPO.pomaterials || []);
    }
  }, [selectedPO]);

  const searchFieldChanged = (name: string, value: string) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('po.index'), queryParams);
  };

  const handleKeyPress = (name: string, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, (e.target as HTMLInputElement).value);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Purchase Order List</h2>}>
      <Head title="View PO " />

      <Toaster />

      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 text-black overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-5 flex flex-wrap gap-2">
              <div className="flex-1">
                <table className=" table-auto w-full text-xs text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"> </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.po_number_from}
                          onBlur={(e) => searchFieldChanged('po_number_from', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('po_number_from', e)}
                        />
                      </th>
                      <th className="px-1 py-2"></th>
                      <th className="px-1 py-2"></th>
                      <th className="px-1 py-2"></th>
                      <th className="px-1 py-2"></th>
                      <th className="px-1 py-2">
                        <TextInput
                          type="date"
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.doc_date_from}
                          onBlur={(e) => searchFieldChanged('doc_date_from', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('doc_date_from', e)}
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          type="date"
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.deliv_date_from}
                          onBlur={(e) => searchFieldChanged('deliv_date_from', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('deliv_date_from', e)}
                        />
                      </th>
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"> </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.po_number_to}
                          onBlur={(e) => searchFieldChanged('po_number_to', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('po_number_to', e)}
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.control_no}
                          onBlur={(e) => searchFieldChanged('control_no', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('control_no', e)}
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.plant}
                          onBlur={(e) => searchFieldChanged('plant', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('plant', e)}
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.vendor}
                          onBlur={(e) => searchFieldChanged('vendor', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('vendor', e)}
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.created_name}
                          onBlur={(e) => searchFieldChanged('created_name', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('created_name', e)}
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          type="date"
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.doc_date_to}
                          onBlur={(e) => searchFieldChanged('doc_date_to', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('doc_date_to', e)}
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          type="date"
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.deliv_date_to}
                          onBlur={(e) => searchFieldChanged('deliv_date_to', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('deliv_date_to', e)}
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.status}
                          onBlur={(e) => searchFieldChanged('status', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('status', e)}
                        />
                      </th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"> </th>
                      <th className="px-3 py-2"> PO Number</th>
                      <th className="px-3 py-2"> Control No.</th>
                      <th className="px-3 py-2"> Plant</th>
                      <th className="px-3 py-2"> Vendor</th>
                      <th className="px-3 py-2"> Created By</th>
                      <th className="px-3 py-2"> Doc Date</th>
                      <th className="px-3 py-2"> Deliv. Date</th>
                      <th className="px-3 py-2"> Status</th>
                      
                    </tr>
                  </thead>

                  <tbody className="text-xs text-black">
                    {po_header.data.length > 0 ? (
                      po_header.data.map((po) => (
                        <tr className="bg-white border-b" key={po.id}>
                          <td className="px-3 py-2">
                            <input
                              type="radio"
                              name="sel"
                              onClick={() => {
                                setSelectedPO(po);
                                setModalOpen(true);
                              }}
                            />
                          </td>
                          <td className="px-3 py-2">{po.po_number}</td>
                          <td className="px-3 py-2">{po.control_no}</td>
                          <td className="px-3 py-2">
                            {po.plant} - {po.plants?.name1}
                          </td>
                          <td className="px-3 py-2">
                            {po.vendor_id} - {po.vendors?.name_1}
                          </td>
                          <td className="px-3 py-2">{po.created_name}</td>
                          <td className="px-3 py-2">{po.doc_date}</td>
                          <td className="px-3 py-2">{po.deliv_date}</td>
                          <td className="px-3 py-2">{po.status}</td>
                          <td className="px-3 py-2"></td>
                        </tr>
                      ))
                    ) : (
                      <td className="px-3 py-2 text-center" colSpan={8}>
                        No Records Found
                      </td>
                    )}
                  </tbody>
                </table>
                <Pagination links={po_header.meta.links} />
              </div>
              <Modal show={modalOpen} onClose={closeModal} maxWidth="3xl">
                <div className="flex-1 p-5">
                  <table className="w-full text-xs text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                      <tr className="text-nowrap">
                        <th className="px-3 py-2"> </th>
                      </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                      <tr className="text-nowrap">
                        <th className="px-3 py-2">Stat</th>
                        <th className="px-3 py-2">itemNo</th>
                        <th className="px-3 py-2">Material </th>
                        <th className="px-3 py-2">Short Text</th>
                        <th className="px-3 py-2">Del Date</th>
                        <th className="px-3 py-2">Qty</th>
                        <th className="px-3 py-2">Unit</th>
                        <th className="px-3 py-2">Total Value</th>
                        <th className="px-3 py-2">Curr</th>
                        <th className="px-3 py-2">Requested By</th>
                      </tr>
                    </thead>
                    {selectedPO && (
                      <tbody className="text-xs text-black">
                        {poMaterials.map((poMaterial) => (
                          <tr className="bg-white border-b" key={poMaterial.id}>
                            <td className="px-3 py-2">{poMaterial.status}</td>
                            <td className="px-3 py-2">{poMaterial.item_no}</td>
                            <td className="px-3 py-2">{poMaterial.mat_code}</td>
                            <td className="px-3 py-2">{poMaterial.short_text}</td>
                            <td className="px-3 py-2">{poMaterial.del_date?.toString()}</td>
                            <td className="px-3 py-2">{poMaterial.po_qty}</td>
                            <td className="px-3 py-2">{poMaterial.unit}</td>
                            <td className="px-3 py-2">{formatNumber(poMaterial.total_value ?? 0)}</td>
                            <td className="px-3 py-2">{poMaterial.currency}</td>
                            <td className="px-3 py-2">{poMaterial.requested_by}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
                <div className="flex flex-row-reverse pt-2">
                  <div>
                    {selectedPO?.id && (
                      <Link
                        href={route('po.edit', selectedPO.po_number)}
                        className=" p-3 m-3 bg-yellow-500 inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:bg-yellow-400 hover:text-accent-foreground hover:border-gray-500">
                        Display PO
                      </Link>
                    )}
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
