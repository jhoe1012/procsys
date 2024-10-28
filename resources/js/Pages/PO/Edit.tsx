import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, IPOMaterial, IPOHeader, IMessage, IApprover, IWorkflow, IVendor } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select as CSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import 'react-datasheet-grid/dist/style.css';
import ItemDetails from './ItemDetails';
import { useState, useEffect, FormEventHandler } from 'react';
import AddPrtoPo from './Partial/AddPrtoPo';
import Dropzone from '@/Components/Dropzone';

import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  intColumn,
  keyColumn,
  floatColumn,
  dateColumn,
} from 'react-datasheet-grid';
import { Toaster } from '@/Components/ui/toaster';
import { useToast } from '@/Components/ui/use-toast';
import { Operation } from 'react-datasheet-grid/dist/types';
import { formatNumber } from '@/lib/utils';
import Select from 'react-select';
import Discard from '@/Components/Discard';
import Approval from './Partial/Approval';
import { Card, CardContent } from '@/Components/ui/card';
import { ScrollArea } from '@/Components/ui/scroll-area';
import FlagForAction from '@/Components/FlagForAction';
import { DELIVERY_ADDRESS, NOTES, SEQ_DRAFT, STATUS_APPROVED, STATUS_REJECTED, STATUS_REWORK } from '@/lib/constants';
import { XMarkIcon } from '@heroicons/react/24/solid';

const Edit = ({
  auth,
  vendors,
  poheader,
  message,
}: PageProps & PageProps<{ vendors: [] }> & PageProps<{ poheader: IPOHeader }> & PageProps<{ message: IMessage }>) => {
  const { toast } = useToast();
  const [material, setMaterial] = useState<IPOMaterial[]>(
    poheader.pomaterials.map((pomaterial) => ({
      ...pomaterial,
      del_date: new Date(pomaterial.del_date || ''),
      qty_open: pomaterial.qty_open / (pomaterial.conversion / pomaterial.denominator),
    }))
  );

  const [apprSeq, setApprSeq] = useState<IApprover>();
  const [vendor, setVendor] = useState<IVendor | undefined>(poheader.vendors);
  const [files, setFiles] = useState([]);

  const { data, setData, post, errors, reset, processing } = useForm<IPOHeader>({
    id: poheader.id,
    po_number: poheader.po_number,
    control_no: poheader.control_no,
    vendor_id: poheader.vendor_id,
    vendors: poheader.vendors,
    created_name: poheader.created_name,
    doc_date: poheader.doc_date,
    deliv_date: poheader.deliv_date,
    notes: poheader.notes,
    plant: poheader.plant,
    header_text: poheader.header_text,
    approver_text: poheader.approver_text,
    attachment: undefined,
    total_po_value: poheader.total_po_value,
    deliv_addr: poheader.deliv_addr,
    pomaterials: [],
    _method: 'patch',
  });

  const columns = [
    { ...keyColumn('sel', checkboxColumn), title: 'Sel', minWidth: 30 },
    { ...keyColumn('status', textColumn), title: 'Sts', minWidth: 35, disabled: true },
    { ...keyColumn('item_no', intColumn), title: 'ItmNo', minWidth: 55, disabled: true },
    { ...keyColumn('mat_code', textColumn), title: 'Material', minWidth: 120, disabled: true },
    { ...keyColumn('short_text', textColumn), title: 'Short Text', minWidth: 300, disabled: true },
    { ...keyColumn('po_qty', floatColumn), title: 'PO Qty', minWidth: 70 },
    { ...keyColumn('qty_open', floatColumn), title: 'Open Qty', minWidth: 80, disabled: true },
    { ...keyColumn('unit', textColumn), title: 'Unit', minWidth: 55 },
    {
      ...keyColumn('net_price', floatColumn),
      title: 'Net Price',
      minWidth: 80,
      disabled: ({ rowData }: any) => !!rowData.item_free,
    },
    {
      ...keyColumn('per_unit', intColumn),
      title: 'Per Unit',
      minWidth: 50,
      disabled: ({ rowData }: any) => !!rowData.item_free,
    },
    {
      ...keyColumn('total_value', intColumn),
      title: 'Total Value',
      minWidth: 120,
      disabled: true,
    },
    { ...keyColumn('item_free', checkboxColumn), title: 'Free', minWidth: 70 },
    { ...keyColumn('currency', textColumn), title: 'Curr', minWidth: 55, disabled: true },
    { ...keyColumn('del_date', dateColumn), title: 'Del Date', minWidth: 120 },
    { ...keyColumn('mat_grp', textColumn), title: 'Mat Grp', minWidth: 200, disabled: true },
    { ...keyColumn('requested_by', textColumn), title: 'Requested By', minWidth: 150 },
    { ...keyColumn('pr_number', textColumn), title: 'PR Number', minWidth: 120, disabled: true },
    { ...keyColumn('pr_item', textColumn), title: 'PRItm', minWidth: 70, disabled: true },
    { ...keyColumn('item_text', textColumn), title: 'Item Text', minWidth: 300 },
  ];

  const customStyle = {
    '--dsg-header-text-color': 'rgb(10, 10, 10)',
    '--dsg-cell-disabled-background-color': 'rgb(245, 245, 245)',
    '--dsg-border-color': '#bfbdbd',
  };

  const handleAddtoPo = (pomaterials) => {
    setMaterial([...material, ...pomaterials]);
  };

  const updateMaterial = (newValue: IPOMaterial[], operations: Operation[]) => {
    const updatedMaterial = [...newValue];
    console.log('updatedMaterial', updatedMaterial);
    for (const operation of operations) {
      if (operation.type === 'UPDATE') {
        const value = updatedMaterial[operation.fromRowIndex];
        value.net_price = value.item_free ? 0 : value.net_price;
        value.item_no = (operation.fromRowIndex + 1) * 10;
        // value.po_qty = value.po_qty > value.qty_open ? value.qty_open : value.po_qty;
        value.po_qty = value.po_qty < value.min_order_qty ? value.min_order_qty : value.po_qty;
        value.converted_qty = value.po_qty * (value.conversion / value.denominator);
        value.total_value = ((value.net_price ?? 0) / (value.per_unit ?? 0)) * (value.po_qty ?? 0);
      }
    }
    console.log('update', updatedMaterial);
    setMaterial(updatedMaterial);
    setData({ ...data, pomaterials: updatedMaterial });
  };
 
  useEffect(() => {
 
    if (message?.success) {
      toast({
        title: message.success,
      });
    }

    if (message?.error) {
      toast({
        variant: 'destructive',
        title: message.error,
      });
    }

    if (auth.user.approvers) {
      setApprSeq(auth.user.approvers.filter((approver) => approver.type == 'po')[0]);
    }
  }, []);

  useEffect(() => {
    const poTotal = material.reduce((acc, mat) => acc + (mat.total_value || 0), 0);
    setData((prevHeader: IPOHeader) => ({ ...prevHeader, total_po_value: poTotal, attachment: files }));
  }, [material, files]);

  
  const getVendorInfo = async (vendor_id) => {
    try {
      setVendor(undefined);
      const response = await window.axios.get(route('po.vendor', vendor_id));
      setVendor(response.data.data);
    } catch (error) {
      console.log('Error fetching vendor info: ', error);
    }
  };

  const handleCheck = () => {
    const date_today = new Date();
    let flag = true;
    const item = material
      .filter((item) => item.mat_code !== undefined)
      .map((item, index) => ({ ...item, item_no: (index + 1) * 10 }));

    setMaterial(item);
    console.log('item', item);
    if (item.length <= 0) {
      toast({
        variant: 'destructive',
        description: `Please add atleast 1 item`,
      });
      return false;
    }
    for (let i = 0; i < material.length; i++) {
      if (material[i].mat_code !== undefined && material[i].mat_code !== '') {
        if (material[i].po_qty === undefined || material[i]?.po_qty <= 0) {
          toast({
            variant: 'destructive',
            description: `Please enter quantity for item no ${material[i].item_no}`,
          });
          flag = false;
          break;
        }
        if (material[i].unit === undefined || material[i]?.unit === null) {
          toast({
            variant: 'destructive',
            description: `Please enter order unit for item no ${material[i].item_no}`,
          });
          flag = false;
          break;
        }
        if (material[i].net_price === undefined || material[i]?.net_price === null) {
          toast({
            variant: 'destructive',
            description: `Please enter Net Price for item no ${material[i].item_no}`,
          });
          flag = false;
          break;
        }
        if (material[i].del_date === undefined || material[i]?.del_date === null) {
          toast({
            variant: 'destructive',
            description: `Please enter delivery date for item no ${material[i].item_no}`,
          });
          flag = false;
          break;
        } else if (material[i].del_date?.getTime() <= date_today.getTime()) {
          toast({
            variant: 'destructive',
            description: `Please enter delivery date greater than today for item no ${material[i].item_no}`,
          });
          flag = false;
          break;
        }
      }
    }
    return flag;
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (handleCheck()) {
      console.log(data);
      post(route('po.update', poheader.id), {
        preserveScroll: true,
        onSuccess: (page) => {
          reset();
          setFiles([]);
        },
      });
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Purchase Order</h2>

          {poheader.status == STATUS_APPROVED && (
            <a
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm p-1 text-center"
              href={route('po.print', poheader.id)}
              target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                />
              </svg>
            </a>
          )}
        </div>
      }>
      <Head title="PO Create" />
      <Toaster />
      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="p-5 flex flex-wrap gap-4">
                <div className="flex-none w-52">
                  <Label htmlFor="prnumber">PO Number</Label>
                  <Input type="text" id="prnumber" defaultValue={data.po_number} disabled />
                </div>
                <div className="flex-none w-52">
                  <Label htmlFor="control_no">Control No.</Label>
                  <Input
                    type="text"
                    id="control_no"
                    defaultValue={data.control_no}
                    onChange={(e) => setData('control_no', e.target.value)}
                  />
                </div>
                <div className="flex-none w-40">
                  <Label htmlFor="created_by">Created By</Label>
                  <Input type="text" id="created_by" defaultValue={data.created_name} disabled />
                </div>
                <div className="flex-none w-40">
                  <Label htmlFor="date">Doc Date</Label>
                  <Input type="text" id="date" defaultValue={data.doc_date} disabled />
                </div>
                <div className="flex-none w-40">
                  <Label htmlFor="date">Delivery Date</Label>
                  <Input
                    type="date"
                    id="deliv_date"
                    defaultValue={data.deliv_date}
                    onChange={(e) => setData('deliv_date', e.target.value)}
                    required={true}
                  />
                </div>
                <div className="flex-none w-96">
                  <Label>Vendor</Label>
                  <Select
                    value={vendors?.find(({ value }) => value === data.vendor_id) ?? null}
                    options={vendors}
                    onChange={({ value }) => {
                      setData('vendor_id', value);
                      getVendorInfo(value);
                    }}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: '1.75rem',
                        height: '1.75rem',
                        fontSize: '0.875rem',
                        borderColor: 'hsl(var(--input))',
                      }),

                      valueContainer: (provided, state) => ({
                        ...provided,
                        height: '1.75rem',
                        padding: '0 6px',
                      }),

                      input: (provided, state) => ({
                        ...provided,
                        margin: '0px',
                      }),
                      indicatorSeparator: (state) => ({
                        display: 'none',
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        height: '1.75rem',
                      }),
                    }}
                  />
                </div>
                <div className="flex-none w-52">
                  <Label>Requesting Plant</Label>
                  <CSelect defaultValue={data.plant} onValueChange={(value) => setData('plant', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Plant" />
                    </SelectTrigger>
                    <SelectContent>
                      {auth.user.plants &&
                        auth.user.plants.map((plant) => (
                          <SelectItem value={plant.plant} key={plant.plant}>
                            {plant.plant} {plant.name1}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </CSelect>
                </div>
              </div>
              <div className="p-1 pt-0">
                <Tabs defaultValue="header_text" className="max-w-8xl">
                  <TabsList>
                    <TabsTrigger value="header_text">Header Text</TabsTrigger>
                    <TabsTrigger value="approver_text">Approver Text</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="deliv_addr">Delivery Address</TabsTrigger>
                    <TabsTrigger value="workflow">Workflow</TabsTrigger>
                    <TabsTrigger value="attachment">Attachment</TabsTrigger>
                    <TabsTrigger value="vendor">Vendor Info</TabsTrigger>
                  </TabsList>
                  <TabsContent value="header_text">
                    <Textarea
                      value={data.header_text}
                      onChange={(e) => setData('header_text', e.target.value)}
                      // required={true}
                    />
                  </TabsContent>
                  <TabsContent value="notes">
                    <CSelect defaultValue={data.notes} onValueChange={(value) => setData('notes', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Notes" />
                      </SelectTrigger>
                      <SelectContent>
                        {NOTES.map((note) => (
                          <SelectItem value={note} key={note}>
                            {note}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </CSelect>
                  </TabsContent>
                  <TabsContent value="approver_text">
                    <Textarea value={data.approver_text} onChange={(e) => setData('approver_text', e.target.value)} />
                  </TabsContent>
                  <TabsContent value="deliv_addr">
                    <CSelect defaultValue={data.deliv_addr} onValueChange={(value) => setData('deliv_addr', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Address" />
                      </SelectTrigger>
                      <SelectContent>
                        {DELIVERY_ADDRESS.map((address) => (
                          <SelectItem value={address} key={address}>
                            {address}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </CSelect>
                  </TabsContent>
                  <TabsContent value="workflow">
                    <Table className="w-11/2 text-xs">
                      <TableHeader>
                        <TableRow className="font-bold p-0">
                          <TableHead>Position</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Approved By</TableHead>
                          <TableHead>Approved Date</TableHead>
                          <TableHead>Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {poheader.workflows &&
                          poheader.workflows.map((workflow: IWorkflow) => (
                            <TableRow key={workflow.id}>
                              <TableCell>{workflow.position}</TableCell>
                              <TableCell>{workflow.status} </TableCell>
                              <TableCell> {workflow.approved_by} </TableCell>
                              <TableCell>{workflow.approved_date} </TableCell>
                              <TableCell>{workflow.message} </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  <TabsContent value="attachment">
                    <ul className="mt-3 mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 ">
                      {poheader.attachments &&
                        poheader.attachments.map((attachment) => (
                          <li key={attachment.filename} className="relative h-12 rounded-md shadow-lg p-2 bg-white">
                            {auth.permissions.po.edit && (
                              <Link
                                preserveScroll
                                href={route('attachment.delete', attachment.id)}
                                method="delete"
                                as="button"
                                className="w-7 h-7  bg-slate-100 rounded-full flex justify-center items-center absolute top-3 right-2 hover:bg-red-200 transition-colors">
                                <XMarkIcon className="w-6 h-6  text-red-600 hover:fill-red-700 transition-colors" />
                              </Link>
                            )}
                            <p className="mt-2 text-blue-600 text-sm font-medium truncate pr-7">
                              <a href={'/' + attachment.filepath} download={true}>
                                {attachment.filename}
                              </a>
                            </p>
                          </li>
                        ))}
                    </ul>
                    <Dropzone files={files} setFiles={setFiles} />
                  </TabsContent>
                  <TabsContent value="vendor">
                    <Card>
                      <CardContent>
                        {vendor && (
                          <div>
                            <Table className="w-11/2 text-xs">
                              <TableBody>
                                <TableRow key={vendor.id} className="border-none h-">
                                  <TableCell>
                                    <b>Account group: </b>
                                  </TableCell>
                                  <TableCell>{vendor.account_group}</TableCell>
                                  <TableCell>
                                    <b>Name : </b>
                                  </TableCell>
                                  <TableCell>
                                    {' '}
                                    {vendor.name_1} {vendor.name_2} {vendor.name_3} {vendor.name_4}
                                  </TableCell>
                                  <TableCell>
                                    <b>Supplier : </b>
                                  </TableCell>
                                  <TableCell>{vendor.supplier}</TableCell>
                                </TableRow>
                                <TableRow key={vendor.id} className="border-none">
                                  <TableCell>
                                    <b>Address : </b>
                                  </TableCell>
                                  <TableCell>
                                    {vendor.street} {vendor.district} {vendor.city} {vendor.postal_code}{' '}
                                    {vendor.country}
                                  </TableCell>
                                  <TableCell>
                                    <b>Tax Number : </b>
                                  </TableCell>
                                  <TableCell>
                                    {vendor.tax_number} {vendor.tax_number_2}
                                  </TableCell>
                                </TableRow>
                                <TableRow key={vendor.id} className="border-none">
                                  <TableCell>
                                    <b>Telephone 1 : </b>
                                  </TableCell>
                                  <TableCell>{vendor.telephone_1}</TableCell>
                                  <TableCell>
                                    <b>Telephone 2 : </b>
                                  </TableCell>
                                  <TableCell>{vendor.telephone_2}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="p-2">
                <DataSheetGrid
                  value={material}
                  onChange={updateMaterial}
                  columns={columns}
                  style={customStyle}
                  // autoAddRow
                  // lockRows
                  // disableContextMenu
                  disableExpandSelection
                  rowHeight={30}
                  className="text-sm"
                />
              </div>
              <div className="p-1 flex gap-2 justify-end content-center">
                <div className="p-1">
                  <Label htmlFor="total">Total PO Value: </Label>
                </div>
                <div>
                  <Input id="total" type="text" value={formatNumber(data.total_po_value)} readOnly disabled />
                </div>
              </div>
              <div className="p-2 pt-0">
                <Tabs defaultValue="itemDetails" className="max-w-xl">
                  <TabsList>
                    <TabsTrigger value="action">Action</TabsTrigger>
                  </TabsList>
                  <TabsContent value="action">
                    {auth.permissions.po.edit && (
                      <>
                        <Link
                          preserveScroll
                          href={route('po.update-controlno')}
                          data={{ id: poheader.id, control_no: data.control_no }}
                          as="button"
                          type="button"
                          className="p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-100 ">
                          Update Control No.
                        </Link>

                        <FlagForAction
                          p_description="Are you sure you want to flag delete this item(s)?"
                          p_title="Flag for Delete"
                          p_url={route('po.flag.delete')}
                          p_disable={material.filter((mat) => mat.sel == true).length == 0}
                          p_items={{ ids: material.filter((mat) => mat.sel == true).map((mat) => mat.id) }}
                        />

                        <FlagForAction
                          p_description="Are you sure you want to flag delivered this item(s)?"
                          p_title="Flag Delivered"
                          p_url={route('po.flag.deliver')}
                          p_disable={material.filter((mat) => mat.sel == true).length == 0}
                          p_items={{ ids: material.filter((mat) => mat.sel == true).map((mat) => mat.id) }}
                        />
                      </>
                    )}
                  </TabsContent>
                </Tabs>
                <div className="p-5 justify-end grid grid-cols-8 gap-4">
                  {auth.permissions.po.edit && (
                    <>
                      <Button
                        variant="outline"
                        className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100"
                        // disabled={poheader.appr_seq != SEQ_DRAFT || processing}>
                        disabled={processing}>
                        Save
                      </Button>
                      <Link
                        href={route('po.index')}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-100">
                        Cancel
                      </Link>
                      <Link
                        disabled={poheader.appr_seq != SEQ_DRAFT}
                        preserveScroll
                        href={route('po.submit', poheader.id)}
                        as="button"
                        type="button"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input bg-[#f8c110] hover:bg-[#f8c110] hover:text-accent-foreground hover:border-gray-500
                        disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100 ">
                        Submit
                      </Link>

                      <Discard
                        p_id={poheader.id}
                        // p_disable={poheader.appr_seq != SEQ_DRAFT}
                        p_title="Discard this Purchase Order ?"
                        p_url="po.discard"
                      />

                      <AddPrtoPo
                        p_vendor={data.vendor_id}
                        p_plant={data.plant}
                        p_created_name={data.created_name}
                        p_doc_date={data.doc_date}
                        addToPO={handleAddtoPo}
                      />
                    </>
                  )}
                </div>
              </div>
            </form>
            {auth.permissions.po.approver && (
              <div className="px-5 pb-5">
                <Approval
                  p_po_number={data.po_number}
                  p_type="approved"
                  p_title="approve"
                  p_disable={
                    poheader.status == STATUS_APPROVED ||
                    poheader.status == STATUS_REWORK ||
                    poheader.status == STATUS_REJECTED ||
                    apprSeq?.seq != poheader.appr_seq
                      ? true
                      : false
                  }
                />
                <Approval
                  p_po_number={data.po_number}
                  p_type="rework"
                  p_title="rework"
                  p_disable={
                    poheader.status == STATUS_APPROVED ||
                    poheader.status == STATUS_REWORK ||
                    poheader.status == STATUS_REJECTED ||
                    apprSeq?.seq != poheader.appr_seq
                      ? true
                      : false
                  }
                />
                <Approval
                  p_po_number={data.po_number}
                  p_type="rejected"
                  p_title="reject"
                  p_disable={
                    poheader.status == STATUS_APPROVED ||
                    poheader.status == STATUS_REWORK ||
                    poheader.status == STATUS_REJECTED ||
                    apprSeq?.seq != poheader.appr_seq
                      ? true
                      : false
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
