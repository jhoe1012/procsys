import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, IMessage, IGRHeader, IGRMaterials, IGRHeaderPage, Choice } from '@/types';
import { useState, useEffect, KeyboardEvent } from 'react';
import { PrinterIcon } from '@heroicons/react/24/solid';
import { can } from '@/lib/helper';
import { PermissionsEnum, REACT_SELECT_STYLES } from '@/lib/constants';
import { Toaster, useToast } from '@/Components/ui';
import { Modal, Pagination, TextInput } from '@/Components';
import { formatShortDate } from '@/lib/utils';
import Select from 'react-select';

const Index = ({
  auth,
  gr_header,
  queryParams = {},
  message,
  vendorsChoice,
}: PageProps<{ gr_header: IGRHeaderPage; queryParams: any; message: IMessage; vendorsChoice: Choice[] }>) => {
  const [selectedGr, setSelectedGr] = useState<IGRHeader | null>(null);
  const [grmaterials, setGrmaterials] = useState<IGRMaterials[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const plantsChoice: Choice[] = auth.user.plants.map(({ plant, name1 }) => ({ value: plant, label: name1 }));

  const { toast } = useToast();

  queryParams = queryParams || {};

  useEffect(() => {
    if (message?.success) {
      toast({
        title: message.success,
      });
    }
  }, []);

  useEffect(() => {
    if (selectedGr) {
      setGrmaterials(selectedGr.grmaterials || []);
    }
  }, [selectedGr]);

  const searchFieldChanged = (name: string, value: string) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('gr.index'), queryParams);
  };

  const handleKeyPress = (name: string, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, (e.target as HTMLInputElement).value);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Goods Receipt List</h2>}>
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
                          defaultValue={queryParams.gr_number_from}
                          onBlur={(e) => searchFieldChanged('gr_number_from', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('gr_number_from', e)}
                          placeholder="GR No. From"
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.po_number_from}
                          onBlur={(e) => searchFieldChanged('po_number_from', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('po_number_from', e)}
                          placeholder="PO No. From"
                        />
                      </th>
                      <th className="px-1 py-2"></th>
                      <th className="px-1 py-2"></th>
                      <th className="px-1 py-2"></th>
                      <th className="px-1 py-2">
                        <TextInput
                          type="date"
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.entry_date_from}
                          onBlur={(e) => searchFieldChanged('entry_date_from', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('entry_date_from', e)}
                        />
                      </th>
                      {/* <th className="px-1 py-2">
                        <TextInput
                          type="date"
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.posting_date_from}
                          onBlur={(e) => searchFieldChanged('posting_date_from', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('posting_date_from', e)}
                        />
                      </th> */}
                      <th className="px-1 py-2">
                        <TextInput
                          type="date"
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.actual_date_from}
                          onBlur={(e) => searchFieldChanged('actual_date_from', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('actual_date_from', e)}
                        />
                      </th>
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"> </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.gr_number_to}
                          onBlur={(e) => searchFieldChanged('gr_number_to', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('gr_number_to', e)}
                          placeholder="GR No. To"
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.po_number_to}
                          onBlur={(e) => searchFieldChanged('po_number_to', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('po_number_to', e)}
                          placeholder="PO No. To"
                        />
                      </th>
                      <th className="px-1 py-2 w-40">
                        <Select
                          placeholder="Plant"
                          value={plantsChoice.find(({ value }) => value === queryParams.plant)}
                          options={plantsChoice}
                          onChange={(option: any) => searchFieldChanged('plant', option?.value)}
                          styles={REACT_SELECT_STYLES}
                        />
                      </th>
                      <th className="px-1 py-2">
                        <Select
                          placeholder="Vendor"
                          value={vendorsChoice.find(({ value }) => value === queryParams.vendor)}
                          options={vendorsChoice}
                          onChange={(option: any) => searchFieldChanged('vendor', option?.value)}
                          styles={REACT_SELECT_STYLES}
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.entered_by}
                          onBlur={(e) => searchFieldChanged('entered_by', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('entered_by', e)}
                          placeholder="Entered By"
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          type="date"
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.entry_date_to}
                          onBlur={(e) => searchFieldChanged('entry_date_to', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('entry_date_to', e)}
                        />
                      </th>
                      {/* <th className="px-1 py-2">
                        <TextInput
                          type="date"
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.posting_date_to}
                          onBlur={(e) => searchFieldChanged('posting_date_to', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('posting_date_to', e)}
                        />
                      </th> */}
                      <th className="px-1 py-2">
                        <TextInput
                          type="date"
                          className="h-7 text-xs p-1 m-0"
                          defaultValue={queryParams.actual_date_to}
                          onBlur={(e) => searchFieldChanged('actual_date_to', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('actual_date_to', e)}
                        />
                      </th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"> </th>
                      <th className="px-3 py-2 w-[5%]"> Document Number</th>
                      <th className="px-3 py-2 w-[5%]"> PO Number</th>
                      <th className="px-3 py-2 w-[10%]"> Plant</th>
                      <th className="px-3 py-2 w-[30%]"> Vendor</th>
                      <th className="px-3 py-2"> Entered By</th>
                      <th className="px-3 py-2"> Entry Date</th>
                      <th className="px-3 py-2"> Actual Date of Receipt</th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>

                  <tbody className="text-xs text-black">
                    {gr_header.data.length > 0 ? (
                      gr_header.data.map((gr, index) => (
                        // <tr className="bg-white border-b" key={gr.id}>
                        <tr className={'border-b ' + (index % 2 === 0 ? 'bg-gray-100' : 'bg-white')} key={gr.id}>
                          <td className="px-3 py-2">
                            <input
                              type="radio"
                              name="sel"
                              onClick={() => {
                                setSelectedGr(gr);
                                setModalOpen(true);
                              }}
                            />
                          </td>
                          <td className="px-3 py-2">{gr.gr_number}</td>
                          <td className="px-3 py-2">{gr.po_number}</td>
                          <td className="px-3 py-2">
                            {gr.plant} - {gr.plants?.name1}
                          </td>
                          <td className="px-3 py-2">
                            {gr.vendor_id} - {gr.vendors?.name_1}
                          </td>
                          <td className="px-3 py-2">{gr.created_name}</td>
                          <td className="px-3 py-2">{formatShortDate(gr.entry_date)}</td>
                          {/* <td className="px-3 py-2">{gr.posting_date}</td> */}
                          <td className="px-3 py-2">{formatShortDate(gr.actual_date)}</td>
                          <td className="px-3 py-2">
                            <a className="" href={route('gr.print', gr.id)} target="_blank" rel="noopener">
                              <PrinterIcon className="w-6 h-6  text-green-600 hover:fill-green-300 transition-colors" />
                            </a>
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
                <Pagination links={gr_header.meta.links} />
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
                        <th className="px-3 py-2">ItemNo</th>
                        <th className="px-3 py-2">Material</th>
                        <th className="px-3 py-2">Material Description</th>
                        <th className="px-3 py-2">Item Text</th>
                        <th className="px-3 py-2">Qty</th>
                        <th className="px-3 py-2">Unit</th>
                        <th className="px-3 py-2">PO Del Date</th>
                        <th className="px-3 py-2">Batch</th>
                        <th className="px-3 py-2">Mfg Date</th>
                        <th className="px-3 py-2">SLED/BBD</th>
                        <th className="px-3 py-2">POItem</th>
                      </tr>
                    </thead>
                    {selectedGr && (
                      <tbody className="text-xs text-black">
                        {grmaterials.map((grMaterial) => (
                          <tr className="bg-white border-b" key={grMaterial.id}>
                            <td className="px-3 py-2">
                              {grMaterial.is_cancel ? (
                                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                  Cancelled
                                </span>
                              ) : (
                                ''
                              )}
                            </td>
                            <td className="px-3 py-2">{grMaterial.item_no}</td>
                            <td className="px-3 py-2">{grMaterial.mat_code}</td>
                            <td className="px-3 py-2">{grMaterial.short_text}</td>
                            <td className="px-3 py-2">{grMaterial.item_text}</td>
                            <td className="px-3 py-2">{grMaterial.gr_qty}</td>
                            <td className="px-3 py-2">{grMaterial.unit}</td>
                            <td className="px-3 py-2">{grMaterial.po_deliv_date?.toString()}</td>
                            <td className="px-3 py-2">{grMaterial.batch}</td>
                            <td className="px-3 py-2">{grMaterial.mfg_date?.toString()}</td>
                            <td className="px-3 py-2">{grMaterial.sled_bbd?.toString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
                <div className="flex flex-row-reverse pt-2">
                  <div>
                    {selectedGr?.id && (
                      <>
                        {can(auth.user, PermissionsEnum.CancelGR) && ( //auth.permissions.gr.cancel && (
                          <Link
                            href={route('gr.edit', selectedGr.gr_number)}
                            className=" p-3 m-3 bg-gray-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:bg-gray-400 hover:text-accent-foreground hover:border-gray-500">
                            Cancel GR
                          </Link>
                        )}
                        <Link
                          href={route('gr.show', selectedGr.gr_number)}
                          className=" p-3 m-3 bg-yellow-500 inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:bg-yellow-400 hover:text-accent-foreground hover:border-gray-500">
                          Display GR
                        </Link>
                      </>
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
};

export default Index;
