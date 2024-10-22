import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, IPOMaterial, IPOHeader, IVendor } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select as CSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import Select from 'react-select';
import 'react-datasheet-grid/dist/style.css';
import { useState, useEffect, FormEventHandler } from 'react';
import AddPrtoPo from './Partial/AddPrtoPo';
import { Table, TableBody, TableCell, TableRow } from '@/Components/ui/table';
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
import { Card, CardContent } from '@/Components/ui/card';
import { DELIVERY_ADDRESS, NOTES } from '@/lib/constants';

const Create = ({ auth, vendors }: PageProps & PageProps<{ vendors: [] }>) => {
  const doc_date = new Date().toLocaleDateString();
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const [material, setMaterial] = useState<IPOMaterial[]>([]);

  const [vendor, setVendor] = useState<IVendor | undefined>();

  const { data, setData, post, errors, reset, processing } = useForm<IPOHeader>({
    id: 0,
    po_number: undefined,
    control_no: undefined,
    vendor_id: undefined,
    vendor_name: '',
    created_name: auth.user.name,
    doc_date: doc_date,
    deliv_date: undefined,
    notes: '',
    plant: auth.user.plants !== undefined ? auth.user.plants[0]?.plant : '',
    header_text: '',
    approver_text: '',
    attachment: undefined,
    total_po_value: 0,
    status: '',
    appr_seq: 0,
    deliv_addr: '',
    pomaterials: [],
  });

  const columns = [
    { ...keyColumn('sel', checkboxColumn), title: 'Sel', minWidth: 30 },
    { ...keyColumn('status', textColumn), title: 'Sts', minWidth: 35, disabled: true },
    { ...keyColumn('item_no', intColumn), title: 'ItmNo', minWidth: 55, disabled: true },
    { ...keyColumn('mat_code', textColumn), title: 'Material', minWidth: 120, disabled: true },
    { ...keyColumn('short_text', textColumn), title: 'Short Text', minWidth: 300, disabled: true },
    { ...keyColumn('po_qty', floatColumn), title: 'PO Qty', minWidth: 70 },
    { ...keyColumn('qty_open', floatColumn), title: 'Open Qty', minWidth: 100, disabled: true },
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
    // console.log(data);
    // const poMaterial = data.map((mat, index) => ({
    //   ...mat,
    //   item_no: 0 ,
    //   total_value: 0,/*  po_qty: 0, net_price: 0, total_value: 0  */
    // }));
    // console.log('po material', data);
    setMaterial([...material, ...pomaterials]);
    // setData({ ...data, pomaterials: [...data.pomaterials, ...pomaterials] })
  };

  const updateMaterial = (newValue: IPOMaterial[], operations: Operation[]) => {
    const updatedMaterial = [...newValue];
    // const oldMaterialValue = [...material];
    console.log('updatedMaterial', updatedMaterial);
    for (const operation of operations) {
      if (operation.type === 'UPDATE') {
        const value = updatedMaterial[operation.fromRowIndex];
        // const oldValue = oldMaterialValue[operation.fromRowIndex];

        // if (value.po_qty !== oldValue.po_qty) {
        // if (value.item_free) {
        value.net_price = value.item_free ? 0 : value.net_price;
        // }

        value.item_no = (operation.fromRowIndex + 1) * 10;
        value.po_qty = value.po_qty < value.min_order_qty ? value.min_order_qty : value.po_qty;
        value.po_qty = value.po_qty > value.qty_open ? value.qty_open : value.po_qty;
        value.converted_qty = value.po_qty * (value.conversion / value.denominator);

        value.total_value = ((value.net_price ?? 0) / (value.per_unit ?? 0)) * (value.po_qty ?? 0);

        // }
      }
    }
    console.log('update', updatedMaterial);
    setMaterial(updatedMaterial);
    setData({ ...data, pomaterials: updatedMaterial });
  };

  useEffect(() => {
    const poTotal = material.reduce((acc, mat) => acc + (mat.total_value || 0), 0);
    setData((prevHeader: IPOHeader) => ({ ...prevHeader, total_po_value: poTotal , attachment: files }));
  }, [material, files]);

  

  // useEffect(() => {
  //   if (data.plant) {
  //     console.log('usefeect');
  //     if (auth.user.plants) {
  //       const deliv_addr = auth.user.plants.filter((plant) => plant.plant === data.plant);
  //       const address = `${deliv_addr[0].street} ${deliv_addr[0].street2} ${deliv_addr[0].district} ${deliv_addr[0].city} ${deliv_addr[0].country_code} ${deliv_addr[0].postal_code}`;
  //       setData((prevHeader: IPOHeader) => ({ ...prevHeader, deliv_addr: address }));
  //     }
  //   }
  // }, [data.plant]);

  const getVendorInfo = async (vendor_id) => {
    try {
      setVendor(undefined);
      const response = await window.axios.get(route('po.vendor', vendor_id)); //`/api/vendor/${vendor_id}`);
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
      post(route('po.store'));
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Purchase Order</h2>}>
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
                    type="number"
                    id="control_no"
                    defaultValue={data.control_no}
                    onChange={(e) => setData('control_no', e.target.value)}
                  />
                </div>
                <div className="flex-none w-40">
                  <Label htmlFor="created_by">Created By</Label>
                  <Input type="text" id="control_no" defaultValue={data.created_name} disabled />
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
                    required={true}
                    value={vendors?.find(({ value }) => value === data.vendor_id) ?? null}
                    options={vendors}
                    onChange={({ value, label }) => {
                      setData({ ...data, vendor_id: value, vendor_name: label });
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
                  <Label htmlFor="requestingPlant">Requesting Plant</Label>
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
                    <TabsTrigger value="deliveryAddress">Delivery Address</TabsTrigger>
                    <TabsTrigger value="workflow">Workflow</TabsTrigger>
                    <TabsTrigger value="attachment">Attachment</TabsTrigger>
                    <TabsTrigger value="vendor">Vendor Info</TabsTrigger>
                  </TabsList>
                  <TabsContent value="header_text">
                    <Textarea value={data.header_text} onChange={(e) => setData('header_text', e.target.value)} />
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
                  <TabsContent value="deliveryAddress">
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
                  <TabsContent value="approver_text">
                    <Textarea value={data.approver_text} onChange={(e) => setData('approver_text', e.target.value)} />
                  </TabsContent>
                  <TabsContent value="workflow"></TabsContent>
                  <TabsContent value="attachment">
                    {/* <Input
                      type="file"
                      className="min-h-10"
                      multiple
                      onChange={(e) => setData('attachment', e.target.files || undefined)}
                    /> */}
                    <Dropzone files={files} setFiles={setFiles} /> 
                  </TabsContent>
                  <TabsContent value="vendor">
                    <Card>
                      <CardContent>
                        {vendor && (
                          <div>
                            <Table className="w-11/2 text-sm">
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
                  //lockRows
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
                  <Input type="text" value={formatNumber(data.total_po_value)} readOnly disabled />
                </div>
              </div>
              <div className="p-2 pt-0">
                <Tabs defaultValue="ItemText" className="max-w-xl">
                  <TabsList>
                    {/* <TabsTrigger value="itemDetails">Item Details</TabsTrigger> */}
                    <TabsTrigger value="ItemText">Item Text</TabsTrigger>
                    {/* <TabsTrigger value="deliveryAddress">Delivery Address</TabsTrigger> */}
                  </TabsList>
                  {/* <TabsContent value="itemDetails">
                    <ItemDetails />
                  </TabsContent> */}
                  <TabsContent value="ItemText">
                    <Textarea />
                  </TabsContent>
                </Tabs>
                <div className="p-5 justify-end grid grid-cols-8 gap-4">
                  {auth.permissions.po.create && (
                    <>
                      <Button
                        variant="outline"
                        disabled={processing}
                        className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110]">
                        Save
                      </Button>
                      <Link
                        href={route('po.index')}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500">
                        Cancel
                      </Link>

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
            {/* {auth.permissions.po.create && (
              
            )} */}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
