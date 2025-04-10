import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, IGRMaterials, IGRHeader } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import 'react-datasheet-grid/dist/style.css';
import { useState, FormEventHandler } from 'react';
import { DataSheetGrid, checkboxColumn, textColumn, intColumn, keyColumn, floatColumn } from 'react-datasheet-grid';
import { Toaster } from '@/Components/ui/toaster';
import { Card, CardContent } from '@/Components/ui/card';
import { Operation } from 'react-datasheet-grid/dist/types';
import { can } from '@/lib/helper';
import { CUSTOM_DATA_SHEET_STYLE, PermissionsEnum } from '@/lib/constants';

const Edit = ({ auth, grheader }: PageProps & PageProps<{ grheader: IGRHeader }>) => {
  const [material, setMaterial] = useState<IGRMaterials[]>(grheader.grmaterials);

  const { data, setData, post, errors, reset, transform, processing } = useForm<IGRHeader>({
    id: grheader.id,
    gr_number: grheader.gr_number,
    po_number: grheader.po_number,
    created_name: grheader.created_name,
    vendor_id: `${grheader.vendors?.supplier} - ${grheader.vendors?.name_1}`,
    vendor_name: '',
    plant: `${grheader.plants?.plant} - ${grheader.plants?.name1}`,
    entry_date: grheader.entry_date,
    posting_date: grheader.posting_date,
    actual_date: grheader.actual_date,
    delivery_note: grheader.delivery_note,
    header_text: grheader.header_text,
    is_cancel: false,
    grmaterials: grheader.grmaterials,
    _method: 'patch',
  });

  const columns = [
    { ...keyColumn('item_no', intColumn), title: 'ItmNo', minWidth: 50, disabled: true },
    { ...keyColumn('mat_code', textColumn), title: 'Material', minWidth: 130, disabled: true },
    { ...keyColumn('short_text', textColumn), title: 'Material Description', minWidth: 400, disabled: true },
    { ...keyColumn('item_text', textColumn), title: 'Item Text', minWidth: 400, disabled: true },
    { ...keyColumn('gr_qty', floatColumn), title: 'Qty', minWidth: 70, disabled: true },
    { ...keyColumn('unit', textColumn), title: 'Unit', minWidth: 55, disabled: true },
    { ...keyColumn('po_deliv_date', textColumn), title: 'PO Del Date', minWidth: 130, disabled: true },
    { ...keyColumn('batch', textColumn), title: 'Batch', minWidth: 130, disabled: true },
    { ...keyColumn('mfg_date', textColumn), title: 'Mfg Date', minWidth: 130, disabled: true },
    { ...keyColumn('sled_bbd', textColumn), title: 'SLED/BBD', minWidth: 130, disabled: true },
    { ...keyColumn('po_item', textColumn), title: 'PO Item', minWidth: 55, disabled: true },
    { ...keyColumn('dci', checkboxColumn), title: 'DCI', minWidth: 55, disabled: true },
  ];

  const updateMaterial = async (newValue: IGRMaterials[], operations: Operation[]) => {
    const updatedMaterial = [...newValue];
    setMaterial(updatedMaterial);
    setData({ ...data, grmaterials: updatedMaterial });
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    post(route('gr.cancel', grheader.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cancel Goods Receipt</h2>}>
      <Head title="PO Cancel" />
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
                  <Input type="text" defaultValue="Cancellation" disabled />
                </div>
                <div className="flex-none w-40">
                  <Label>PO Number</Label>
                  <Input type="text" id="po_number" value={data.po_number} disabled />
                </div>
                <div className="flex-none w-40">
                  <Label htmlFor="gr_number">Document Number</Label>
                  <Input type="text" id="gr_number" value={data.gr_number} disabled />
                </div>
                <div className="flex-none w-52">
                  <Label>Vendor</Label>
                  <Input type="text" value={data.vendor_id} disabled />
                </div>
                <div className="flex-none w-40">
                  <Label htmlFor="created_name">Entered by</Label>
                  <Input type="text" id="created_name" value={data.created_name} disabled />
                </div>
                <div className="flex-none w-60">
                  <Label htmlFor="requestingPlant">Plant</Label>
                  <Input type="text" id="plant" value={data.plant} disabled />
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
                            <Input type="date" id="actual_date" value={data.actual_date} disabled />
                          </div>

                          <div className="flex-none w-36">
                            <Label htmlFor="delivery_note">Delivery Note / SI #</Label>
                            <Input type="text" id="delivery_note" value={data.delivery_note} disabled />
                          </div>
                          <div className="flex-none w-96">
                            <Label htmlFor="header_text">Header Text</Label>
                            <Input type="text" id="header_text" value={data.header_text} disabled />
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
                  style={CUSTOM_DATA_SHEET_STYLE}
                  disableExpandSelection
                  rowHeight={30}
                  className="text-sm"
                />
              </div>

              <div className="p-2 pt-0">
                <div className="p-5 justify-end grid grid-cols-8 gap-4">
                  {can(auth.user, PermissionsEnum.CancelGR) && ( //auth.permissions.gr.cancel && (
                    <>
                      <Button variant="outline" disabled={processing} className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110]">
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

export default Edit;
