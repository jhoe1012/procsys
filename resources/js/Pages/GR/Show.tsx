import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, IGRMaterials, IGRHeader } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import 'react-datasheet-grid/dist/style.css';
import { useState } from 'react';
import { DataSheetGrid, checkboxColumn, textColumn, intColumn, keyColumn, floatColumn } from 'react-datasheet-grid';
import { Toaster } from '@/Components/ui/toaster';
import { Card, CardContent } from '@/Components/ui/card';
import { CUSTOM_DATA_SHEET_STYLE } from '@/lib/constants';

const Show = ({ auth, grheader }: PageProps & PageProps<{ grheader: IGRHeader }>) => {
  const [material, setMaterial] = useState<IGRMaterials[]>(grheader.grmaterials);

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

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Display Goods Receipt</h2>}>
      <Head title="GR Display" />
      <Toaster />
      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
            {/* <form onSubmit={handleSubmit}> */}
            <div className="p-5 flex flex-wrap gap-4">
              <div className="flex-none w-40">
                <Label>&nbsp;</Label>
                <Input type="text" defaultValue="Goods Reciept" disabled />
              </div>
              <div className="flex-none w-60">
                <Label>PO Number</Label>
                <Input type="text" id="gr_number" value={grheader.po_number} disabled />
              </div>
              <div className="flex-none w-40">
                <Label htmlFor="gr_number">Document Number</Label>
                <Input type="text" id="gr_number" value={grheader.gr_number} disabled />
              </div>
              <div className="flex-none w-72">
                <Label>Vendor</Label>
                <Input type="text" value={grheader.vendors?.supplier + '-' + grheader.vendors?.name_1} disabled />
              </div>
              <div className="flex-none w-40">
                <Label htmlFor="created_name">Entered by</Label>
                <Input type="text" id="created_name" value={grheader.created_name} disabled />
              </div>
              <div className="flex-none w-60">
                <Label htmlFor="requestingPlant">Plant</Label>
                <Input type="text" value={grheader.plants?.plant + '-' + grheader.plants?.name1} disabled />
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
                          <Input type="date" id="entry_date" defaultValue={grheader.entry_date} disabled />
                        </div>
                        <div className="flex-none w-36">
                          <Label htmlFor="posting_date">Posting Date</Label>
                          <Input type="date" id="posting_date" defaultValue={grheader.posting_date} disabled />
                        </div>
                        <div className="flex-none w-36">
                          <Label htmlFor="actual_date">Actual Date of Reciept</Label>
                          <Input type="date" id="actual_date" defaultValue={grheader.actual_date} disabled />
                        </div>

                        <div className="flex-none w-36">
                          <Label htmlFor="delivery_note">Delivery Note / SI #</Label>
                          <Input id="delivery_note" defaultValue={grheader.delivery_note} disabled />
                        </div>
                        <div className="flex-none w-96">
                          <Label htmlFor="header_text">Header Text</Label>
                          <Input id="header_text" defaultValue={grheader.header_text} disabled />
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
                onChange={setMaterial}
                columns={columns}
                style={CUSTOM_DATA_SHEET_STYLE}
                disableExpandSelection
                rowHeight={30}
                className="text-sm"
              />
            </div>

            <div className="p-2 pt-0">
              <div className="p-5 justify-end grid grid-cols-8 gap-4">
                <Link
                  href={route('gr.index')}
                  className="h-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
