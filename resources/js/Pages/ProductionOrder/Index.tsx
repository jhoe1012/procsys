import { AdminUpload, SelectField } from '@/Components';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CUSTOM_DATA_SHEET_STYLE, DEFAULT_PROD_ORDER, PermissionsEnum } from '@/lib/constants';
import { can } from '@/lib/helper';
import { IProductionOrder, PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { DataSheetGrid, dateColumn, floatColumn, keyColumn, textColumn } from 'react-datasheet-grid';
import 'react-datasheet-grid/dist/style.css';

import { Input, Label } from '@/Components/ui';
import CreateProdOrdSO from './Partial/CreateProdOrdSO';

export default function Index({ auth, prodOrds }: PageProps<{ prodOrds: IProductionOrder[] }>) {
  const initialMaterial = prodOrds
    ? prodOrds.map((prodOrd) => ({
        ...prodOrd,
        production_date: prodOrd.production_date ? new Date(prodOrd.production_date) : null,
        delivery_date: prodOrd.delivery_date ? new Date(prodOrd.delivery_date) : null,
      }))
    : Array(10).fill({ ...DEFAULT_PROD_ORDER });

  const [prodOrd, setProdOrd] = useState<IProductionOrder[]>(initialMaterial);
  const [prodDate, setProdDate] = useState<Date | null>(null);
  const [plant, setPlant] = useState<string | null>(null);

  const columns = useMemo(
    () => [
      // { ...keyColumn('sel', checkboxColumn), title: 'Sel', minWidth: 40, maxWidth: 40 },
      { ...keyColumn('order', textColumn), title: 'Order No.', minWidth: 100 },
      { ...keyColumn('material', textColumn), title: 'Material Number', minWidth: 100 },
      { ...keyColumn('mat_desc', textColumn), title: '  Description', minWidth: 450 },
      { ...keyColumn('target_uom_ou', textColumn), title: 'UOM', minWidth: 150, maxWidth: 150 },
      { ...keyColumn('production_date', dateColumn), title: 'Production Date', minWidth: 130, maxWidth: 130 },
      { ...keyColumn('delivery_date', dateColumn), title: 'Delivery Date', minWidth: 130, maxWidth: 130, disabled: true },
      { ...keyColumn('to_create_qty', floatColumn), title: 'To Create Qty', minWidth: 90 },
      { ...keyColumn('target_qty_ou', floatColumn), title: 'Created Qty', minWidth: 90, disabled: true },
      { ...keyColumn('released_qty', floatColumn), title: 'Released Qty', minWidth: 90, disabled: true },
      { ...keyColumn('total_qty', floatColumn), title: 'Total Qty', minWidth: 90, disabled: true },
    ],
    []
  );

  const handleChange = () => {
    if (prodDate && plant) {
      router.visit(
        `/production-plan?prod_date=${encodeURIComponent(prodDate.toISOString().substring(0, 10))}&plant=${encodeURIComponent(plant)}`
      );
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Production Order</h2>
          <div className="flex flex-row justify-between gap-2">
            {can(auth.user, PermissionsEnum.CreateProdOrd) && <CreateProdOrdSO plants={auth.user.plants} />}
            {can(auth.user, PermissionsEnum.CreateProdOrd) && (
              <AdminUpload url={route('production.order.import')} pageName={'Production Order'} />
            )}
          </div>
        </div>
      }>
      <Head title="Create Production Order " />

      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-5 flex flex-wrap gap-4 w-1/2">
              <SelectField
                label="Requesting Plant"
                items={auth.user.plants}
                valueKey="plant"
                displayKey="name1"
                onValueChange={(value) => setPlant(value)}
                value={undefined}
                displayValue={true}
              />

              <div className="flex-auto w-28 max-w-40 ">
                <Label htmlFor="prod_date">Production Date</Label>
                <Input
                  type="date"
                  id="prod_date"
                  onChange={(e) => setProdDate(e.target.value ? new Date(e.target.value) : null)}
                  onBlur={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleChange();
                    }
                  }}
                />
              </div>
            </div>
            <div className="p-2">
              <DataSheetGrid
                createRow={() => DEFAULT_PROD_ORDER}
                value={prodOrd}
                onChange={setProdOrd}
                columns={columns}
                style={CUSTOM_DATA_SHEET_STYLE}
                autoAddRow
                disableExpandSelection
                rowHeight={30}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
