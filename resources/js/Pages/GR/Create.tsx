import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, IGRMaterials, IGRHeader } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select as CSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import Select, { CSSObjectWithLabel } from 'react-select';
import 'react-datasheet-grid/dist/style.css';
import { useState, FormEventHandler } from 'react';
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
import { Card, CardContent } from '@/Components/ui/card';
import { Operation } from 'react-datasheet-grid/dist/types';

const Create = ({ auth, ponumber }: PageProps & PageProps<{ ponumber: [] }>) => {
  const dateToday = new Date().toISOString().substring(0, 10);

  const { toast } = useToast();
  const [material, setMaterial] = useState<IGRMaterials[]>([
    {
      id: undefined,
      gr_header_id: undefined,
      po_material_id: undefined,
      item_no: undefined,
      mat_code: undefined,
      short_text: undefined,
      po_gr_qty: undefined,
      gr_qty: undefined,
      unit: undefined,
      po_deliv_date: undefined,
      batch: undefined,
      mfg_date: undefined,
      sled_bbd: undefined,
      po_number: undefined,
      po_item: undefined,
      dci: undefined,
    },
    {
      id: undefined,
      gr_header_id: undefined,
      po_material_id: undefined,
      item_no: undefined,
      mat_code: undefined,
      short_text: undefined,
      po_gr_qty: undefined,
      gr_qty: undefined,
      unit: undefined,
      po_deliv_date: undefined,
      batch: undefined,
      mfg_date: undefined,
      sled_bbd: undefined,
      po_number: undefined,
      po_item: undefined,
      dci: undefined,
    },
  ]);

  const { data, setData, post, errors, reset, transform, processing } = useForm<IGRHeader>({
    id: 0,
    gr_number: undefined,
    po_number: undefined,
    created_name: auth.user.name,
    vendor_id: undefined,
    vendor_name: '',
    plant: auth.user.plants !== undefined ? auth.user.plants[0]?.plant : '',
    entry_date: dateToday,
    posting_date: dateToday,
    actual_date: dateToday,
    delivery_note: '',
    header_text: '',
    is_cancel: false,
    grmaterials: [],
  });

  const columns = [
    { ...keyColumn('item_no', intColumn), title: 'ItmNo', maxWidth: 50, disabled: true },
    { ...keyColumn('mat_code', textColumn), title: 'Material', maxWidth: 130, disabled: true },
    { ...keyColumn('short_text', textColumn), title: 'Short Text', maxWidth: 350, disabled: true },
    { ...keyColumn('po_gr_qty', floatColumn), title: 'PO Qty', maxWidth: 130, disabled: true },
    { ...keyColumn('gr_qty', floatColumn), title: 'Qty', maxWidth: 130 },
    { ...keyColumn('unit', textColumn), title: 'Unit', maxWidth: 55 },
    { ...keyColumn('po_deliv_date', textColumn), title: 'PO Del Date', maxWidth: 130, disabled: true },
    { ...keyColumn('batch', textColumn), title: 'Batch', maxWidth: 130 },
    { ...keyColumn('mfg_date', dateColumn), title: 'Mfg Date', maxWidth: 130 },
    { ...keyColumn('sled_bbd', dateColumn), title: 'SLED/BBD', maxWidth: 130 },
    { ...keyColumn('po_item', textColumn), title: 'PO Item', maxWidth: 55, disabled: true },
    { ...keyColumn('dci', checkboxColumn), title: 'DCI', maxWidth: 55 },
  ];

  const customStyle = {
    '--dsg-header-text-color': 'rgb(10, 10, 10)',
    '--dsg-cell-disabled-background-color': 'rgb(245, 245, 245)',
    '--dsg-border-color': '#bfbdbd',
  };

  const updateMaterial = async (newValue: IGRMaterials[], operations: Operation[]) => {
    const updatedMaterial = [...newValue];
    const weight_uom = ['KG', 'G'];
    for (const operation of operations) {
      if (operation.type === 'UPDATE') {
        const value = updatedMaterial[operation.fromRowIndex];

        value.item_no = (operation.fromRowIndex + 1) * 10;
        const tolerancep = value.po_gr_qty + value.po_gr_qty * 0.1; // positive
        const tolerancen = value.po_gr_qty - value.po_gr_qty * 0.1; // negative
        if (weight_uom.includes(value.unit)) {
          value.gr_qty = value.gr_qty > tolerancep ? tolerancep : value.gr_qty;
        } else {
          value.gr_qty = value.gr_qty > value.po_gr_qty ? value.po_gr_qty : value.gr_qty;
        }
        // value.dci = value.gr_qty >= value.po_gr_qty;
      }
    }
    setMaterial(updatedMaterial);
    setData({ ...data, grmaterials: updatedMaterial });
  };

  const handleCheck = () => {
    let flag = true;
    const updatedMaterial = material
      .filter((item) => item.mat_code !== undefined)
      .map((item, index) => ({ ...item, item_no: (index + 1) * 10 }));

    setMaterial(updatedMaterial); 

    if (updatedMaterial.length <= 0) {
      toast({
        variant: 'destructive',
        description: `Please add atleast 1 item`,
      });
      return false;
    }
    for (let i = 0; i < material.length; i++) {
      if (material[i].mat_code !== undefined && material[i].mat_code !== '') {
        if (material[i].gr_qty === undefined || material[i]?.gr_qty <= 0) {
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
            description: `Please enter unit for item no ${material[i].item_no}`,
          });
          flag = false;
          break;
        }
      }
    }
    return flag;
  };

  const getPODetails = async (ponumber: number) => {
    try {
      const response = await window.axios.get(route('po.details', ponumber));  
      const updateMaterial = response.data.pomaterials.map((item) => ({
        id: undefined,
        gr_header_id: undefined,
        po_material_id: item.id,
        item_no: undefined,
        mat_code: item.mat_code,
        short_text: item.short_text,
        po_gr_qty: item.po_gr_qty,
        gr_qty: undefined,
        unit: item.unit,
        po_deliv_date: item.del_date,
        batch: undefined,
        mfg_date: null,
        sled_bbd: null,
        po_number: response.data.po_number,
        po_item: item.item_no,
        dci: false,
      }));

      setData({
        ...data,
        po_number: ponumber,
        plant: response.data.plants.plant,
        vendor_id: response.data.vendors.supplier,
        vendor_name: `${response.data.vendors.supplier} - ${response.data.vendors.name_1}`,
      });

      setMaterial(updateMaterial);
    } catch (error) {
      console.log('Error fetching po info: ', error);
    }
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (handleCheck()) {
      post(route('gr.store'));
    }
  };

  const styles = {
    control: (provided: CSSObjectWithLabel) => ({
      ...provided,
      minHeight: '1.75rem',
      height: '1.75rem',
      fontSize: '0.875rem',
      borderColor: 'hsl(var(--input))',
    }),

    valueContainer: (provided: CSSObjectWithLabel) => ({
      ...provided,
      height: '1.75rem',
      padding: '0 6px',
    }),

    input: (provided: CSSObjectWithLabel) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided: CSSObjectWithLabel) => ({
      ...provided,
      height: '1.75rem',
    }),
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Goods Receipt</h2>}>
      <Head title="PO Create" />
      <Toaster />
      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="p-5 flex flex-wrap gap-4">
                <div className="flex-none w-40">
                  <Label>&nbsp;</Label>
                  <Input type="text" defaultValue="Goods Reciept" disabled />
                </div>
                <div className="flex-none w-40">
                  <Label>&nbsp;</Label>
                  <Input type="text" defaultValue="Purchase Order" disabled />
                </div>
                <div className="flex-none w-40">
                  <Label>PO Number</Label>
                  {/* <Select
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
                </div> */}
                  {/* <Select
                    required={true}
                    placeholder="Purchase Order "
                    value={ponumber?.find(({ value }) => value === data.po_number) ?? null}
                    options={ponumber}
                    onChange={({ value }) => {
                      getPODetails(value);
                    }}
                    styles={styles}
                  /> */}
                </div>
                <div className="flex-none w-40">
                  <Label htmlFor="gr_number">Document Number</Label>
                  <Input type="text" id="gr_number" value={data.gr_number} disabled />
                </div>
                <div className="flex-none w-52">
                  <Label>Vendor</Label>
                  <Input type="text" value={data.vendor_name} disabled />
                </div>
                <div className="flex-none w-40">
                  <Label htmlFor="created_name">Entered by</Label>
                  <Input type="text" id="created_name" value={data.created_name} disabled />
                </div>
                <div className="flex-none w-60">
                  <Label htmlFor="requestingPlant">Plant</Label>
                  <CSelect value={data.plant} onValueChange={(value) => setData('plant', value)}>
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
                <Tabs defaultValue="general" className="max-w-8xl">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general">
                    <Card>
                      <CardContent>
                        <div className="p-5 flex flex-wrap gap-4">
                          <div className="flex-none w-36">
                            <Label htmlFor="entry_date">Entry entry_date</Label>
                            <Input type="date" id="entry_date" value={data.entry_date} disabled />
                          </div>
                          <div className="flex-none w-36">
                            <Label htmlFor="actual_date">Actual Date of Reciept</Label>
                            <Input
                              type="date"
                              id="actual_date"
                              defaultValue={data.actual_date}
                              onChange={(e) => setData('actual_date', e.target.value)}
                            />
                          </div> 
                          <div className="flex-none w-36">
                            <Label htmlFor="delivery_note">Delivery Note / SI #</Label>
                            <Input
                              type="text"
                              id="delivery_note"
                              defaultValue={data.delivery_note}
                              onChange={(e) => setData('delivery_note', e.target.value)}
                            />
                          </div>
                          <div className="flex-none w-96">
                            <Label htmlFor="header_text">Header Text</Label>
                            <Input
                              type="text"
                              id="header_text"
                              defaultValue={data.header_text}
                              onChange={(e) => setData('header_text', e.target.value)}
                            />
                          </div>
                        </div>
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
                  disableExpandSelection
                  rowHeight={30}
                  className="text-sm"
                />
              </div>

              <div className="p-2 pt-0">
                <div className="p-5 justify-end grid grid-cols-8 gap-4">
                  {auth.permissions.gr.create && (
                    <>
                      <Button
                        variant="outline"
                        disabled={processing}
                        className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110]">
                        Post
                      </Button>
                      <Link
                        href={route('gr.index')}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500">
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
