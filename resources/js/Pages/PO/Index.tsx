import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, IMessage, IPOHeaderPage, IPOHeader, IPOMaterial, Choice } from '@/types';
import { useState, useEffect, KeyboardEvent } from 'react';
import { formatNumber, formatShortDate } from '@/lib/utils';
import { PermissionsEnum, REACT_SELECT_STYLES, STATUS_APPROVED } from '@/lib/constants';
import { badgeVariants, Button, Label, RadioGroup, RadioGroupItem, Toaster, useToast } from '@/Components/ui';
import { Checkbox, InputField, Modal, Pagination, TextInput } from '@/Components';
import { PrinterIcon } from 'lucide-react';
import { can } from '@/lib/helper';
import Select from 'react-select';

export default function Index({
  auth,
  po_header,
  queryParams = {},
  message,
  vendorsChoice,
}: PageProps<{ po_header: IPOHeaderPage; queryParams: any; message: IMessage; vendorsChoice: Choice[] }>) {
  const [selectedPO, setSelectedPO] = useState<IPOHeader | null>(null);
  const [poMaterials, setPoMaterials] = useState<IPOMaterial[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [checkboxPo, setCheckboxPo] = useState<number[]>([]);
  const [controlNumberModal, setControlNumberModal] = useState(false);
  const [controlNumber, setControlNumber] = useState('');
  const [poform, setPoForm] = useState('egi');

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
    if (selectedPO) {
      setPoMaterials(selectedPO.pomaterials || []);
    }
  }, [selectedPO]);

  const searchFieldChanged = (name: string, value: string) => {
    if (value) {
      queryParams[name] = value;
      if (queryParams['page']) delete queryParams['page'];
    } else {
      delete queryParams[name];
    }

    router.get(route('po.index'), queryParams);
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
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Purchase Order List</h2>
          {can(auth.user, PermissionsEnum.EditPO) && (
            <Button onClick={() => setControlNumberModal(true)} className="h-8" disabled={checkboxPo.length <= 0}>
              <PrinterIcon />
            </Button>
          )}
        </div>
      }>
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
                      <th className="px-1 py-2"> </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0 w-28"
                          defaultValue={queryParams.po_number_from}
                          onBlur={(e) => searchFieldChanged('po_number_from', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('po_number_from', e)}
                          placeholder="PO No. From"
                        />
                      </th>
                      <th className="px-1 py-2"></th>
                      <th className="px-1 py-2"></th>
                      <th className="px-1 py-2"></th>
                      <th className="px-1 py-2"></th>
                      <th className="px-1 py-2">
                        <TextInput
                          type="date"
                          className="h-7 text-xs p-1 m-0 "
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
                          className="h-7 text-xs p-1 m-0 w-28"
                          defaultValue={queryParams.po_number_to}
                          onBlur={(e) => searchFieldChanged('po_number_to', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('po_number_to', e)}
                          placeholder="PO No. To"
                        />
                      </th>
                      <th className="px-1 py-2">
                        <TextInput
                          className="h-7 text-xs p-1 m-0 w-28"
                          defaultValue={queryParams.control_no}
                          onBlur={(e) => searchFieldChanged('control_no', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('control_no', e)}
                          placeholder="Control No."
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
                          defaultValue={queryParams.created_name}
                          onBlur={(e) => searchFieldChanged('created_name', e.target.value)}
                          onKeyDown={(e) => handleKeyPress('created_name', e)}
                          placeholder="Created By"
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
                          className="h-7 text-xs p-1 m-0 w-28"
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
                      <th className="px-3 py-2"> PO Number</th>
                      <th className="px-3 py-2"> Control No.</th>
                      <th className="px-3 py-2"> Plant</th>
                      <th className="px-3 py-2"> Vendor</th>
                      <th className="px-3 py-2"> Created By</th>
                      <th className="px-3 py-2"> Doc Date</th>
                      <th className="px-3 py-2"> Deliv. Date</th>
                      <th className="px-3 py-2"> Status</th>
                      <th className="px-3 py-2"> Print</th>
                      <th className="px-3 py-2"> </th>
                    </tr>
                  </thead>

                  <tbody className="text-xs text-black">
                    {po_header.data.length > 0 ? (
                      po_header.data.map((po, index) => (
                        // <tr className="bg-white border-b" key={po.id}>
                        <tr className={'border-b ' + (index % 2 === 0 ? 'bg-gray-100' : 'bg-white')} key={po.id}>
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
                          <td className="px-3 py-2">{formatShortDate(po.doc_date)}</td>
                          <td className="px-3 py-2">{po.deliv_date ? formatShortDate(po.deliv_date) : ''}</td>
                          {/* <td className="px-3 py-2">{po.status}</td> */}
                          <td className="px-3 py-2">
                            <span className={badgeVariants({ variant: po.status.includes('Approval') ? 'Approval' : po.status })}>
                              {po.status}
                            </span>
                          </td>

                          <td className="px-3 py-2 text-center">{po.print_count}</td>
                          <td className="px-3 py-2">
                            {can(auth.user, PermissionsEnum.EditPO) && po.status === STATUS_APPROVED && (
                              <Checkbox
                                className="border-blue-500"
                                onChange={(e) =>
                                  setCheckboxPo((prev) => (e.target.checked ? [...prev, po.id] : prev?.filter((id) => id !== po.id)))
                                }
                              />
                            )}
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
                <Pagination links={po_header.meta.links} />
              </div>
              <Modal
                show={modalOpen}
                onClose={() => {
                  setModalOpen(false);
                }}
                maxWidth="3xl">
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
                        <th className="px-3 py-2">Material Description</th>
                        <th className="px-3 py-2">Item Text </th>
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
                            <td className="px-3 py-2">{poMaterial.item_text}</td>
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
              <Modal
                show={controlNumberModal}
                onClose={() => {
                  setControlNumberModal(false);
                  setControlNumber('');
                  setPoForm('egi');
                }}
                maxWidth="3xl">
                <div className="p-5 flex flex-col">
                  <InputField
                    label="Control No."
                    id="controlNumber"
                    defaultValue={controlNumber}
                    onChange={(e) => setControlNumber(e.target.value)}
                    type="number"
                    required={true}
                    className="text-center"
                  />

                  {/* <RadioGroup defaultValue="egi" className="mt-3" onValueChange={setPoForm}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="egi" id="egi" />
                      <Label htmlFor="egi">EGI/DBI PO Form</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="smbi" id="smbi" />
                      <Label htmlFor="smbi">SMBI PO Form</Label>
                    </div>
                  </RadioGroup> */}

                  <a
                    target="_blank"
                    href={route('po.mass-print', { controlNumber: controlNumber, checkboxPo: checkboxPo, poform: poform })}
                    onClick={() => setControlNumberModal(false)}
                    className="flex items-center justify-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center  mt-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                    <PrinterIcon /> Print
                  </a>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
