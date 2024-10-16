import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, IPRMaterial, IPRHeader } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

import 'react-datasheet-grid/dist/style.css';
import { useState, useEffect, FormEventHandler } from 'react';
import { Choice } from '@/Components/SelectComponent';
import selectColumn from '@/Components/SelectComponent';
import { Operation } from 'react-datasheet-grid/dist/types';

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
import { formatNumber } from '@/lib/utils';

const Create = ({
  auth,
  mat_code,
  mat_desc,
}: PageProps<{ mat_code: Choice[] }> & PageProps<{ mat_desc: Choice[] }>) => {
  const dateToday = new Date().toLocaleDateString();
  const { toast } = useToast();
  const [material, setMaterial] = useState<IPRMaterial[]>([
    {
      sel: false,
      item_no: undefined,
      status: undefined,
      mat_code: undefined,
      short_text: undefined,
      qty: undefined,
      ord_unit: undefined,
      qty_ordered: undefined,
      qty_open: undefined,
      price: undefined,
      per_unit: undefined,
      unit: undefined,
      total_value: undefined,
      currency: undefined,
      del_date: undefined,
      mat_grp: undefined,
      purch_grp: undefined,
    },
    {
      sel: false,
      item_no: undefined,
      status: undefined,
      mat_code: undefined,
      short_text: undefined,
      qty: undefined,
      ord_unit: undefined,
      qty_ordered: undefined,
      qty_open: undefined,
      price: undefined,
      per_unit: undefined,
      unit: undefined,
      total_value: undefined,
      currency: undefined,
      del_date: undefined,
      mat_grp: undefined,
      purch_grp: undefined,

    },
    {
      sel: false,
      item_no: undefined,
      status: undefined,
      mat_code: undefined,
      short_text: undefined,
      qty: undefined,
      ord_unit: undefined,
      qty_ordered: undefined,
      qty_open: undefined,
      price: undefined,
      per_unit: undefined,
      unit: undefined,
      currency: undefined,
      total_value: undefined,
      del_date: undefined,
      mat_grp: undefined,
      purch_grp: undefined,

    },
  ]);

  const { data, setData, post, errors, reset, processing } = useForm<IPRHeader>({
    id: 0,
    pr_number: '',
    created_name: auth.user.name,
    doc_date: dateToday,
    requested_by: auth.user.name,
    plant: auth.user.plants !== undefined ? auth.user.plants[0]?.plant : '',
    reason_pr: '',
    header_text: '',
    attachment: undefined,
    total_pr_value: 0,
    status: '',
    deliv_addr: '',
    prmaterials: [],
  });

  const columns = [
    { ...keyColumn('sel', checkboxColumn), title: 'Sel', minWidth: 30 },
    { ...keyColumn('status', textColumn), title: 'Sts', disabled: true, minWidth: 35 },
    { ...keyColumn('item_no', intColumn), title: 'ItmNo', disabled: true, minWidth: 55 },
    { ...keyColumn('mat_code', selectColumn({ choices: mat_code })), title: 'Material', minWidth: 120 },
    { ...keyColumn('short_text', selectColumn({ choices: mat_desc })), title: 'Short Text', minWidth: 300 },
    { ...keyColumn('qty', floatColumn), title: 'Qty', minWidth: 70 },
    { ...keyColumn('ord_unit', textColumn), title: 'Ord Unit', minWidth: 55 },
  //   { ...keyColumn('altUom',  {
  //     component: ({ rowData, setValue }) => (
  //          rowData &&
  //         <select
  //             value={rowData.selection}
  //             onChange={(e) => setValue(e.target.value)}
  //         >
  //             {console.log('rowData', rowData)}
  //             <option value="" disabled>Select an option</option>
  //             {rowData.map((item) => (
                 
  //                 <option key={item} value={item}>
  //                       {console.log('item', item)}
  //                     {item}
  //                 </option>
  //             ))}
  //         </select>
  
  //     ),
  // }), title: ' Unit', minWidth: 100 },
    // { ...keyColumn('qty_ordered', floatColumn), title: 'Qty Ordered', minWidth: 70, disabled: true },
    // { ...keyColumn('qty_open', floatColumn), title: 'Qty Open', minWidth: 55, disabled: true },
    { ...keyColumn('price', floatColumn), title: 'Price', minWidth: 70, disabled: true },
    { ...keyColumn('per_unit', floatColumn), title: 'Per Unit', minWidth: 30, disabled: true },
    { ...keyColumn('unit', textColumn), title: 'Unit', minWidth: 40, disabled: true },
    { ...keyColumn('total_value', floatColumn), title: 'Total Value', minWidth: 90, disabled: true },
    { ...keyColumn('currency', textColumn), title: 'Curr', minWidth: 50, disabled: true },
    { ...keyColumn('del_date', dateColumn), title: 'Del Date', minWidth: 130 },
    { ...keyColumn('mat_grp', textColumn), title: 'Mat Grp', minWidth: 150, disabled: true },
    { ...keyColumn('purch_grp', textColumn), title: 'Purch Grp', minWidth: 150, disabled: true },
  ];

  const customStyle = {
    '--dsg-header-text-color': 'rgb(10, 10, 10)',
    '--dsg-cell-disabled-background-color': 'rgb(245, 245, 245)',
    '--dsg-border-color': '#bfbdbd',
  };

  const getMaterialInfo = async (material: string) => {
    try {
      const response = await window.axios.get(route('material.details'), { params: { material: material, plant: data.plant } });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching material info:', error);
      return null;
    }
  };

  const updateMaterial = async (newValue: IPRMaterial[], operations: Operation[]) => {
    const updatedMaterial = [...newValue];
    const oldMaterialValue = [...material];

    for (const operation of operations) {
      if (operation.type === 'UPDATE') {
        // for (let i = operation.fromRowIndex; i <= operation.fromRowIndex; i++) {
        const value = updatedMaterial[operation.fromRowIndex];
        const oldValue = oldMaterialValue[operation.fromRowIndex];

        if (value.mat_code && value.mat_code !== oldValue.mat_code) {
          const materialInfo = await getMaterialInfo(value.mat_code);
          if (materialInfo) {
            // value.item_no = (operation.fromRowIndex + 1) * 10;
            value.short_text = materialInfo.mat_desc;
            value.ord_unit = materialInfo.base_uom;
            value.unit = materialInfo.base_uom;
            value.price = parseFloat(materialInfo.valuations[0]?.valuation_price || 0);
            value.currency = materialInfo.valuations[0]?.currency || '';
            value.per_unit = parseFloat(materialInfo.valuations[0]?.per_unit || 0);
            value.mat_grp = materialInfo.materialGroups[0]?.mat_grp_code || '';
            value.purch_grp = materialInfo.purchasingGroups[0]?.purch_grp || '';
            value.total_value = value.price * (value.qty || 0);
          }
        }

        if (value.short_text && value.short_text !== oldValue.short_text) {
          const materialInfo = await getMaterialInfo(value.short_text);
          if (materialInfo) {
            // value.item_no = (operation.fromRowIndex + 1) * 10;
            value.altUom = materialInfo.altUoms.map((item) => item.alt_uom)
            value.mat_code = materialInfo.mat_code;
            value.ord_unit = materialInfo.base_uom;
            value.unit = materialInfo.base_uom;
            value.price = parseFloat(materialInfo.valuations[0]?.valuation_price || 0);
            value.currency = materialInfo.valuations[0]?.currency || '';
            value.per_unit = parseFloat(materialInfo.valuations[0]?.per_unit || 0);
            value.mat_grp = materialInfo.materialGroups[0]?.mat_grp_code || '';
            value.purch_grp = materialInfo.purchasingGroups[0]?.purch_grp || '';
            value.total_value = value.price * (value.qty || 0);
          }
        }

        if (value.qty !== oldValue.qty) {
          value.total_value = ((value.price ?? 0) / (value.per_unit ?? 0)) * (value.qty ?? 0);
        }

        value.item_no = (operation.fromRowIndex + 1) * 10;
        // }
      }
    }

    setMaterial(updatedMaterial);
    setData({ ...data, prmaterials: updatedMaterial });
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (handleCheck()) {
      console.log(data);
      post(route('pr.store'));
    }
  };

  const handleCheck = () => {
    const date_today = new Date();
    let flag = true;
    const item = material
      .filter((item) => item.mat_code !== undefined)
      .map((item, index) => ({ ...item, item_no: (index + 1) * 10 }));

    setMaterial(item);
    
    if (item.length <= 0) {
      toast({
        variant: 'destructive',
        description: `Please add atleast 1 item`,
      });
      return false;
    }

    for (let i = 0; i < material.length; i++) {
      if (material[i].mat_code !== undefined && material[i].mat_code !== '') {
        if (material[i].qty === undefined || material[i]?.qty <= 0) {
          toast({
            variant: 'destructive',
            description: `Please enter quantity for item no ${material[i].item_no}`,
          });
          flag = false;
          break;
        }

        if (material[i].ord_unit === undefined || material[i]?.ord_unit === null) {
          toast({
            variant: 'destructive',
            description: `Please enter order unit for item no ${material[i].item_no}`,
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

  useEffect(() => {
    console.log(material);
    const prTotal = material.reduce((acc, mat) => acc + (mat.total_value || 0), 0);
    setData((prevHeader: IPRHeader) => ({ ...prevHeader, total_pr_value: prTotal/* , prmaterials: material  */}));
  }, [material]);

  // useEffect(() => {
  //   if (data.plant) {
  //     if (auth.user.plants) {
  //       const deliv_addr = auth.user.plants.filter((plant) => plant.plant === data.plant);
  //       const address = `${deliv_addr[0].street} ${deliv_addr[0].street2} ${deliv_addr[0].district} ${deliv_addr[0].city} ${deliv_addr[0].country_code} ${deliv_addr[0].postal_code}`;
  //       setData((prevHeader: IPRHeader) => ({ ...prevHeader, deliv_addr: address }));
  //     }
  //   }
  // }, [data.plant]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Purchase Requisition</h2>}>
      <Head title="PR Create" />
      <Toaster />
      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="p-5 flex flex-wrap gap-4">
                <div className="flex-auto">
                  <Label htmlFor="prnumber">PR Number</Label>
                  <Input type="text" id="prnumber" defaultValue={data.pr_number} disabled />
                </div>
                <div className="flex-auto">
                  <Label htmlFor="createdby">Created By</Label>
                  <Input type="text" id="createdby" defaultValue={data.created_name} disabled />
                </div>
                <div className="flex-auto">
                  <Label htmlFor="date">Date</Label>
                  <Input type="text" id="date" defaultValue={data.doc_date} disabled />
                </div>
                <div className="flex-auto">
                  <Label htmlFor="requested_by">Requested By</Label>
                  <Input
                    type="text"
                    id="requested_by"
                    value={data.requested_by}
                    required={true}
                    onChange={(e) => setData('requested_by', e.target.value)}
                  />
                </div>
                <div className="flex-auto">
                  <Label htmlFor="requestingPlant">Requesting Plant</Label>
                  <Select defaultValue={data.plant} onValueChange={(value) => setData('plant', value)}>
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
                  </Select>
                </div>
              </div>
              <div className="p-1 pt-0">
                <Tabs defaultValue="reasonForPr" className="max-w-8xl">
                  <TabsList>
                    <TabsTrigger value="reasonForPr">Reason for PR</TabsTrigger>
                    <TabsTrigger value="headerText">Header Text</TabsTrigger>
                    <TabsTrigger value="workflow">Workflow</TabsTrigger>
                    <TabsTrigger value="attachment">Attachment</TabsTrigger>
                  </TabsList>
                  <TabsContent value="reasonForPr">
                    <Textarea
                      value={data.reason_pr}
                      onChange={(e) => setData('reason_pr', e.target.value)}
                      required={true}
                    />
                  </TabsContent>
                  <TabsContent value="headerText">
                    <Textarea value={data.header_text} onChange={(e) => setData('header_text', e.target.value)} />
                  </TabsContent>
                  <TabsContent value="workflow"></TabsContent>
                  <TabsContent value="attachment">
                    <Input
                      type="file"
                      className="min-h-10"
                      multiple
                      onChange={(e) => setData('attachment', e.target.files || undefined)}
                    />
                  </TabsContent>
                </Tabs>
              </div>
              <div className="p-2">
                <DataSheetGrid
                  createRow={() => ({
                    sel: false,
                    item_no: undefined,
                    status: undefined,
                    mat_code: undefined,
                    short_text: undefined,
                    qty: undefined,
                    ord_unit: undefined,
                    qty_ordered: undefined,
                    qty_open: undefined,
                    price: undefined,
                    per_unit: undefined,
                    unit: undefined,
                    total_value: undefined,
                    currency: undefined,
                    del_date: undefined,
                    mat_grp: undefined,
                  })}
                  value={material}
                  onChange={updateMaterial}
                  columns={columns}
                  style={customStyle}
                  autoAddRow
                  // disableContextMenu
                  disableExpandSelection
                  rowHeight={30}
                  className="text-sm"
                />
              </div>
              <div className="float-right -mt-12 mr-72  flex gap-2 justify-end content-center">
                <div className="">
                  <Label htmlFor="total">Total PR Value: </Label>
                </div>
                <div>
                  <Input type="text" value={formatNumber(data.total_pr_value)} readOnly disabled />
                </div>
              </div>
              <div className="p-2 pt-0">
                {/* <Tabs defaultValue="deliveryAddress" className="max-w-xl">
                  <TabsList> */}
                    {/* <TabsTrigger value="itemDetails">Item Details</TabsTrigger> */}
                    {/* <TabsTrigger value="deliveryAddress">Delivery Address</TabsTrigger>
                  </TabsList> */}
                  {/* <TabsContent value="itemDetails">
                    <ItemDetails />
                  </TabsContent> */}
                  {/* <TabsContent value="deliveryAddress">
                    <Textarea value={data.deliv_addr} onChange={(e) => setData('deliv_addr', e.target.value)} />
                  </TabsContent>
                </Tabs> */}
                <div className="p-5 justify-end grid grid-cols-8 gap-4">
                  {auth.permissions.pr.create && (
                    <>
                      {/* <Button onClick={handleCheck} type="button" variant="outline" className="hover:border-gray-500">
                        Check
                      </Button> */}
                      <Button
                        variant="outline"
                        disabled={processing}
                        className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] ">
                        Save
                      </Button>
                      <Link
                        href={route('pr.index')}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500">
                        Cancel
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
