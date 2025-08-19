import { selectColumn, SelectField } from '@/Components';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CUSTOM_DATA_SHEET_STYLE, DEFAULT_PROD_ORDER } from '@/lib/constants';
import { Choice, IProductionOrder, PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { DataSheetGrid, dateColumn, floatColumn, keyColumn, textColumn } from 'react-datasheet-grid';
import 'react-datasheet-grid/dist/style.css';

import { Button } from '@/Components/ui';

export default function Create({
  auth,
  prodOrds,
  mat_code,
  mat_desc,
}: PageProps<{ prodOrds: IProductionOrder[]; mat_code: Choice[]; mat_desc: Choice[] }>) {
  const initialMaterial = prodOrds
    ? prodOrds.map((prodOrd) => ({
        ...prodOrd,
        production_date: prodOrd.production_date ? new Date(prodOrd.production_date) : null,
        delivery_date: prodOrd.delivery_date ? new Date(prodOrd.delivery_date) : null,
      }))
    : Array(10).fill({ ...DEFAULT_PROD_ORDER });

  const [prodOrd, setProdOrd] = useState<IProductionOrder[]>(initialMaterial);

  const { data, setData, post, processing, reset, errors } = useForm({
    prodOrd: prodOrd,
    plant: '',
  });

  const columns = useMemo(
    () => [
      // { ...keyColumn('sel', checkboxColumn), title: 'Sel', minWidth: 40, maxWidth: 40 },
      { ...keyColumn('order', textColumn), title: 'Order No.', minWidth: 100, disabled: true },
      { ...keyColumn('material', selectColumn({ choices: mat_code })), title: 'Material Number', minWidth: 120 },
      { ...keyColumn('mat_desc', selectColumn({ choices: mat_desc })), title: '  Description', minWidth: 450 },
      { ...keyColumn('target_uom_ou', textColumn), title: 'UOM', minWidth: 150, maxWidth: 150 },
      { ...keyColumn('production_date', dateColumn), title: 'Production Date', minWidth: 130, maxWidth: 130 },
      { ...keyColumn('delivery_date', dateColumn), title: 'Delivery Date', minWidth: 130, maxWidth: 130 },
      { ...keyColumn('to_create_qty', floatColumn), title: 'To Create Qty', minWidth: 90 },
      { ...keyColumn('target_qty_ou', floatColumn), title: 'Created Qty', minWidth: 90, disabled: true },
      { ...keyColumn('released_qty', floatColumn), title: 'Released Qty', minWidth: 90, disabled: true },
      { ...keyColumn('total_qty', floatColumn), title: 'Total Qty', minWidth: 90, disabled: true },
    ],
    []
  );

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('production-plan.store'), {
      preserveScroll: true,
      onSuccess: () => {},
      onFinish: () => {},
    });
  };

  useEffect(() => {
    setData('prodOrd', prodOrd);
  }, [prodOrd]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Production Order</h2>
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
                onValueChange={(value) => setData('plant', value)}
                value={undefined}
                displayValue={true}
              />
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
            <form onSubmit={handleSubmit}>
              <div className="grid  m-3">
                <Button variant="outline" disabled={processing} className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-60">
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
