import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { IPRMaterial, PageProps, IPRHeader, IPRHeaderPage, IMessage, Choice } from '@/types';
import Modal from '@/Components/Modal';

import { useState, useEffect, KeyboardEvent } from 'react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import { useToast } from '@/Components/ui/use-toast';
import { Toaster } from '@/Components/ui/toaster';
import { formatLongDate, formatNumber, formatShortDate } from '@/lib/utils';
import { can } from '@/lib/helper';
import { PermissionsEnum, REACT_SELECT_STYLES } from '@/lib/constants';
import { badgeVariants } from '@/Components/ui';
import Select from 'react-select';

export default function Index({
  auth,
  pr_header,
  queryParams = {},
  message,
}: PageProps<{ pr_header: IPRHeaderPage; queryParams: any; message: IMessage }>) {
  const [selectedPR, setSelectedPR] = useState<IPRHeader | null>(null);
  const [prMaterial, setPrMaterial] = useState<IPRMaterial[]>([]);
  const plantsChoice: Choice[] = auth.user.plants.map(({ plant, name1 }) => ({ value: plant, label: name1 }));

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
    if (selectedPR) {
      // fetchItems(selectedPR.pr_number);
      setPrMaterial(selectedPR.prmaterials || []);
    }
  }, [selectedPR]);

  const searchFieldChanged = (name: string, value: string) => {
    if (value) {
      queryParams[name] = value;
      if (queryParams['page']) delete queryParams['page'];
    } else {
      delete queryParams[name];
    }

    router.get(route('pr.index'), queryParams);
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
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Purchase Requisition List</h2>}>
      <Head title="View PR " />

      <Toaster />

      <div className="py-2 ">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-5 flex flex-wrap gap-2 overflow-x-auto">
              <div className="flex-1">
                <table className=" table-auto w-full text- text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"> </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.pr_number_from}
                          onBlur={(e) => searchFieldChanged('pr_number_from', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('pr_number_from', e)}
                          placeholder="PR No. From"
                        />
                      </th>
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
                          defaultValue={queryParams.updated_at_from}
                          onBlur={(e) => searchFieldChanged('updated_at_from', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('updated_at_from', e)}
                        />
                      </th>
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"> </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.pr_number_to}
                          onBlur={(e) => searchFieldChanged('pr_number_to', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('pr_number_to', e)}
                          placeholder="PR No. To"
                        />
                      </th>
                      <th className="px-1 py-2">
                        <Select
                          placeholder="Plant"
                          value={plantsChoice.find(({ value }) => value === queryParams.plant)}
                          options={plantsChoice}
                          onChange={(option: any) => searchFieldChanged('plant', option?.value)}
                          styles={REACT_SELECT_STYLES}
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.created_name}
                          onBlur={(e) => searchFieldChanged('created_name', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('created_name', e)}
                          placeholder="Created By"
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.requested_by}
                          onBlur={(e) => searchFieldChanged('requested_by', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('requested_by', e)}
                          placeholder="Requested By"
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
                          defaultValue={queryParams.updated_at_to}
                          onBlur={(e) => searchFieldChanged('updated_at_to', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('updated_at_to', e)}
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.status}
                          onBlur={(e) => searchFieldChanged('status', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('status', e)}
                          placeholder="Status"
                        />
                      </th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"> </th>
                      <th className="px-3 py-2"> PR Number</th>
                      <th className="px-3 py-2"> Plant</th>
                      <th className="px-3 py-2"> Created By</th>
                      <th className="px-3 py-2"> Requested By</th>
                      <th className="px-3 py-2"> Doc Date</th>
                      <th className="px-3 py-2"> Last Update</th>
                      <th className="px-3 py-2"> Status</th>
                      {/* <th className="px-3 py-2"> Plant Name</th> */}
                    </tr>
                  </thead>

                  <tbody className="text-xs text-black">
                    {pr_header.data.length > 0 ? (
                      pr_header.data.map((pr, index) => (
                        // <tr className="bg-white border-b" key={pr.id}>
                        <tr className={'border-b ' + (index % 2 === 0 ? 'bg-gray-100' : 'bg-white')} key={pr.id}>
                          <td className="px-3 py-2">
                            <input
                              type="radio"
                              name="sel"
                              onClick={() => {
                                setSelectedPR(pr);
                                setModalOpen(true);
                              }}
                            />
                          </td>
                          <td className="px-3 py-2">{pr.pr_number}</td>
                          <td className="px-3 py-2">
                            {pr.plant} - {pr?.plants?.name1}
                          </td>
                          <td className="px-3 py-2">{pr.created_name}</td>
                          <td className="px-3 py-2">{pr.requested_by}</td>
                          <td className="px-3 py-2">{formatShortDate(pr.doc_date)}</td>
                          <td className="px-3 py-2">{formatLongDate(pr.updated_at!)}</td>
                          <td className="px-3 py-2">
                            <span className={badgeVariants({ variant: pr.status.includes('Approval') ? 'Approval' : pr.status })}>
                              {pr.status}
                            </span>
                          </td>
                          {/* <td className="px-3 py-2">{pr?.plants?.name1}</td> */}
                        </tr>
                      ))
                    ) : (
                      <td className="px-3 py-2 text-center" colSpan={8}>
                        No Records Found
                      </td>
                    )}
                  </tbody>
                </table>
                <Pagination links={pr_header.meta.links} />

                {/* <DataTable
                  columns={columnsHeader}
                  data={prheader}
                  
                  //  onRowClick={(row) => setSelectedPR(row.original)}
                /> */}
              </div>
              <Modal show={modalOpen} onClose={closeModal} maxWidth="3xl">
                <div className="flex-1 p-5 ">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                      <tr className="text-nowrap">
                        <th className="px-3 py-2"> </th>
                      </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                      <tr className="text-nowrap">
                        <th className="px-3 py-2">Stat </th>
                        <th className="px-3 py-2">itemNo</th>
                        <th className="px-3 py-2">Material</th>
                        <th className="px-3 py-2">Material Description</th>
                        <th className="px-3 py-2">Item Text </th>
                        <th className="px-3 py-2">Del Date</th>
                        <th className="px-3 py-2">Quantity</th>
                        <th className="px-3 py-2">Open Qty</th>
                        <th className="px-3 py-2">Ord. Unit</th>
                        <th className="px-3 py-2">Total Value</th>
                        <th className="px-3 py-2">Curr</th>
                      </tr>
                    </thead>

                    <tbody className="text-xs text-black  ">
                      {prMaterial.map((prmaterial) => (
                        <tr className="bg-white border-b" key={prmaterial.id}>
                          <td className="px-3 py-2">{prmaterial.status}</td>
                          <td className="px-3 py-2">{prmaterial.item_no}</td>
                          <td className="px-3 py-2">{prmaterial.mat_code}</td>
                          <td className="px-3 py-2">{prmaterial.short_text}</td>
                          <td className="px-3 py-2">{prmaterial.item_text}</td>
                          <td className="px-3 py-2">{formatShortDate(String(prmaterial.del_date))}</td>
                          <td className="px-3 py-2">{prmaterial.qty}</td>
                          <td className="px-3 py-2">{prmaterial.qty_open}</td>
                          <td className="px-3 py-2">{prmaterial.ord_unit}</td>
                          <td className="px-3 py-2">{formatNumber(prmaterial.total_value ?? 0)}</td>
                          <td className="px-3 py-2">{prmaterial.currency}</td>
                        </tr>
                      ))}
                    </tbody>

                    {/* // <div className="flex-1">
                      //   <DataTable columns={columnsItem} data={dataItem} />
                      // </div> */}
                  </table>
                  <div className="flex flex-row-reverse pt-2">
                    <div>
                      {selectedPR?.id &&
                        can(auth.user, PermissionsEnum.CreatePR) && ( //auth.permissions.pr.create && (
                          <Link
                            href={route('pr.copy', selectedPR.pr_number)}
                            className=" p-3 m-3 bg-blue-500 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:bg-blue-400 hover:text-accent-foreground hover:border-gray-500">
                            Copy PR
                          </Link>
                        )}
                      {selectedPR?.id && (
                        <>
                          <Link
                            href={route('pr.edit', selectedPR.pr_number)}
                            className=" p-3 m-3 bg-yellow-500 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:bg-yellow-400 hover:text-accent-foreground hover:border-gray-500">
                            Display PR
                          </Link>
                        </>
                      )}
                    </div>
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
