import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Input, Label, Textarea, Toaster, useToast } from '@/Components/ui';
import { CUSTOM_DATA_SHEET_STYLE, DATE_TODAY } from '@/lib/constants';
import { Choice, IPOHeader, IPOMaterial, IVendor, PageProps } from '@/types';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { checkboxColumn, DataSheetGrid, dateColumn, floatColumn, intColumn, keyColumn, textColumn } from 'react-datasheet-grid';
import 'react-datasheet-grid/dist/style.css';
import { Operation } from 'react-datasheet-grid/dist/types';
import { Dropzone, InputField, ReactSelectField, SelectField, TabFields, VendorCard } from '@/Components';
import { formatNumber } from '@/lib/utils';
import AddPrtoPo from './Partial/AddPrtoPo';
import { usePOMaterial, usePOMaterialValidation } from '@/Hooks';

const Create = ({
  auth,
  vendors,
  deliveryAddress,
  supplierNotes,
}: PageProps<{ vendors: Choice[]; deliveryAddress: Choice[]; supplierNotes: Choice[] }>) => {
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const [material, setMaterial] = useState<IPOMaterial[]>([]);
  const [vendor, setVendor] = useState<IVendor | undefined>();
  const { computeConversion, updateMaterialPO, getVendorInfo } = usePOMaterial();
  const { validateMaterials } = usePOMaterialValidation();

  const { data, setData, post, errors, reset, processing } = useForm<IPOHeader>({
    id: 0,
    po_number: undefined,
    control_no: undefined,
    vendor_id: undefined,
    vendor_name: '',
    created_name: auth.user.name,
    doc_date: DATE_TODAY,
    deliv_date: '',
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

  const columns = useMemo(
    () => [
      { ...keyColumn('sel', checkboxColumn), title: 'Sel', minWidth: 30 },
      { ...keyColumn('status', textColumn), title: 'Sts', minWidth: 35, disabled: true },
      { ...keyColumn('item_no', intColumn), title: 'ItmNo', minWidth: 55, disabled: true },
      { ...keyColumn('mat_code', textColumn), title: 'Material', minWidth: 120, disabled: true },
      { ...keyColumn('short_text', textColumn), title: 'Short Text', minWidth: 300, disabled: true },
      { ...keyColumn('item_text', textColumn), title: 'Item Text', minWidth: 300 },
      { ...keyColumn('po_qty', floatColumn), title: 'PO Qty', minWidth: 70 },
      { ...keyColumn('qty_open_po', floatColumn), title: 'Open Qty', minWidth: 100, disabled: true },
      {
        ...keyColumn('altUomSelect', {
          component: ({ rowData, rowIndex }) =>
            rowData && (
              <select
                className="border-none w-full shadow-none bg-none px-1 py-0 active:border-none hover:border-none"
                onChange={(e) => {
                  setMaterial((prevMaterial) => {
                    const newMaterial = [...prevMaterial];
                    newMaterial[rowIndex] = {
                      ...newMaterial[rowIndex],
                      ...computeConversion(newMaterial[rowIndex], e.target.value),
                    };
                    return newMaterial;
                  });
                }}>
                {rowData.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            ),
        }),
        title: 'Alt UOM',
      },
      { ...keyColumn('unit', textColumn), title: 'Ord. UOM', minWidth: 55, disabled: true },
      { ...keyColumn('pr_unit', textColumn), title: 'B. UOM', minWidth: 55, disabled: true },
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
      { ...keyColumn('mat_grp_desc', textColumn), title: 'Mat Grp', minWidth: 200, disabled: true },
      { ...keyColumn('requested_by', textColumn), title: 'Requested By', minWidth: 150 },
      { ...keyColumn('pr_number', textColumn), title: 'PR Number', minWidth: 120, disabled: true },
    ],
    []
  );

  const headerTabs = [
    {
      value: 'header_text',
      label: 'Header Text',
      visible: true,
      content: <Textarea value={data.header_text} onChange={(e) => setData('header_text', e.target.value)} />,
    },
    {
      value: 'approver_text',
      label: 'Remarks',
      visible: true,
      content: <Textarea value={data.header_text} onChange={(e) => setData('header_text', e.target.value)} />,
    },
    {
      value: 'notes',
      label: 'Notes',
      visible: true,
      content: (
        <SelectField
          items={supplierNotes}
          valueKey="value"
          displayKey="label"
          onValueChange={(value) => setData('notes', value)}
          value={data.notes}
        />
      ),
    },
    {
      value: 'deliveryAddress',
      label: 'Delivery Address',
      visible: true,
      content: (
        <SelectField
          items={deliveryAddress}
          valueKey="value"
          displayKey="label"
          onValueChange={(value) => setData('deliv_addr', value)}
          value={data.deliv_addr}
        />
      ),
    },
    {
      value: 'attachment',
      label: 'Attachment',
      visible: true,
      content: <Dropzone files={files} setFiles={setFiles} />,
    },
    {
      value: 'vendor',
      label: 'Vendor Info',
      visible: true,
      content: <VendorCard vendor={vendor} />,
    },
  ];

  const handleAddtoPo = (pomaterials) => {
    setMaterial([...material, ...pomaterials]);
  };

  const updateMaterial = (newValue: IPOMaterial[], operations: Operation[]) => {
    const updateMaterial = updateMaterialPO(newValue, operations);
    setMaterial(updateMaterial);
  };

  useEffect(() => {
    const poTotal = material.reduce((acc, mat) => acc + (mat.total_value || 0), 0);
    setData((prevHeader: IPOHeader) => ({ ...prevHeader, total_po_value: poTotal, attachment: files, pomaterials: material }));
  }, [material, files]);

  useEffect(() => {
    if (errors.hasOwnProperty('error')) {
      toast({
        variant: 'destructive',
        description: errors.error,
      });
    }
  }, [errors]);

  useEffect(() => {
    if (data.vendor_id && material.length > 0) {
      setMaterial((prevMaterial) => {
        return prevMaterial.map((item) => {
          return { ...item, ...computeConversion(item, item.unit ?? '', data.vendor_id) };
        });
      });
    }
  }, [data.vendor_id]);

  const getVendor = async (vendorId) => {
    const vendorData = await getVendorInfo(vendorId);
    setVendor(vendorData);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const { isValid, updatedMaterials } = validateMaterials(material);
    setMaterial(updatedMaterials);
    if (isValid) {
      post(route('po.store'));
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Purchase Order</h2>}>
      <Head title="Create PO " />
      <Toaster />
      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="p-5 flex flex-wrap gap-4">
                <InputField label="PO Number" id="prnumber" disabled={true} />
                <InputField
                  label="Control No."
                  id="control_no"
                  defaultValue={data.control_no}
                  onChange={(e) => setData('control_no', e.target.value)}
                  type="number"
                />
                <InputField label="Created By" id="created_by" defaultValue={data.created_name} disabled={true} />
                <InputField label="Doc Date By" id="doc_date" defaultValue={data.doc_date} disabled={true} />
                <InputField
                  label="Delivery Date"
                  id="deliv_date"
                  defaultValue={data.deliv_date}
                  onChange={(e) => setData('deliv_date', e.target.value)}
                  required={true}
                  type="date"
                  className="w-40"
                />

                <SelectField
                  label="Requesting Plant"
                  items={auth.user.plants}
                  valueKey="plant"
                  displayKey="name1"
                  onValueChange={(value) => setData('plant', value)}
                  value={data.plant}
                />
                <ReactSelectField
                  label="Vendor"
                  value={vendors.find(({ value }) => value === data.vendor_id) ?? null}
                  options={vendors}
                  required={true}
                  className="flex-none w-96"
                  onChange={({ value, label }: { value: string; label: string }) => {
                    setData({ ...data, vendor_id: value, vendor_name: label });
                    getVendor(value);
                  }}
                />
              </div>
              <div className="p-1 pt-0">
                <TabFields defaultValue="header_text" className="max-w-8xl" tabs={headerTabs} />
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
              <div className="p-1 flex gap-2 justify-end content-center">
                <div className="p-">
                  <Label htmlFor="total">Total PO Value: </Label>
                </div>
                <div>
                  <Input type="text" value={formatNumber(data.total_po_value)} readOnly disabled />
                </div>
              </div>
              <div className="p-2 pt-0">
                <div className="p-5 justify-end grid grid-cols-8 gap-4">
                  {auth.permissions.po.create && (
                    <>
                      <Button variant="outline" disabled={processing} className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110]">
                        Save
                      </Button>
                      <Link
                        href={route('po.index')}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500">
                        Cancel
                      </Link>

                      <AddPrtoPo p_vendor={data.vendor_id} p_plant={data.plant} p_doc_date={data.doc_date} addToPO={handleAddtoPo} />
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
