import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Input, Label, Textarea, Toaster, useToast } from '@/Components/ui';
import { CUSTOM_DATA_SHEET_STYLE, DATE_TODAY, PermissionsEnum } from '@/lib/constants';
import { Choice, IAlternativeUom, IPOHeader, IPOMaterial, IPRHeader, IVendor, PageProps } from '@/types';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import {
  checkboxColumn,
  DataSheetGrid,
  dateColumn,
  floatColumn,
  intColumn,
  keyColumn,
  textColumn,
  createTextColumn,
} from 'react-datasheet-grid';
import 'react-datasheet-grid/dist/style.css';
import { Operation } from 'react-datasheet-grid/dist/types';
import { AltUom, Checkbox, Dropzone, InputField, ReactSelectField, SelectField, TabFields, VendorCard, PrNumberCard } from '@/Components';
import { formatNumber } from '@/lib/utils';
import AddPrtoPo from './Partial/AddPrtoPo';
import { usePOMaterial, usePOMaterialValidation } from '@/Hooks';
import { can } from '@/lib/helper';
import { LetterText, NotebookPen, Paperclip, Truck, Warehouse } from 'lucide-react';

const Create = ({
  auth,
  vendors,
  deliveryAddress,
  supplierNotes,
}: PageProps<{ vendors: Choice[]; deliveryAddress: Choice[]; supplierNotes: Choice[] }>) => {
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const [collectedAttachments, setCollectedAttachments] = useState<any[]>([]);
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
    extended_attachments: collectedAttachments,
    total_po_value: 0,
    status: '',
    appr_seq: 0,
    deliv_addr: '',
    pomaterials: [],
    is_mother_po: false,
  });

  const handleOnChange = (value: string, rowIndex: number) => {
    setMaterial((prevMaterial) => {
      const newMaterial = [...prevMaterial];
      newMaterial[rowIndex] = {
        ...newMaterial[rowIndex],
        ...computeConversion(newMaterial[rowIndex], value),
      };
      return newMaterial;
    });
  };

  const columns = useMemo(
    () => [
      // { ...keyColumn('sel', checkboxColumn), title: 'Sel', minWidth: 30 },
      // { ...keyColumn('status', textColumn), title: 'Sts', minWidth: 35, disabled: true },
      { ...keyColumn('item_no', intColumn), title: 'ItmNo', minWidth: 55, disabled: true },
      { ...keyColumn('mat_code', textColumn), title: 'Material', minWidth: 120, disabled: true  },
      { ...keyColumn('short_text', textColumn), title: 'Material Description', minWidth: 400, disabled: true },
      {
        ...keyColumn(
          'item_text',
          createTextColumn({
            continuousUpdates: true,
            parseUserInput: (value) => value?.slice(0, 40) || '',
            formatBlurredInput: (value) => value?.slice(0, 40) || '',
            formatInputOnFocus: (value) => value?.slice(0, 40) || '',
            parsePastedValue: (value) => value?.slice(0, 40) || '',
          })
        ),
        title: 'Item Text',
        minWidth: 300,
      },
      { ...keyColumn('po_qty', floatColumn), title: 'PO Qty', minWidth: 70 },
      { ...keyColumn('qty_open_po', floatColumn), title: 'Open Qty', minWidth: 90, disabled: true },
      { ...keyColumn('unit', textColumn), title: 'Ord. UOM', minWidth: 55, disabled: true },
      {
        ...keyColumn('alt_uom', {
          component: ({ rowData, rowIndex }: { rowData: IAlternativeUom[]; rowIndex: number }) =>
            rowData && rowData.length !== 0 ? <AltUom rowData={rowData} rowIndex={rowIndex} handleOnChange={handleOnChange} /> : <></>,
        }),
        disabled: true,
        title: '',
        minWidth: 20,
        maxWidth: 20,
      },
      // { ...keyColumn('pr_unit', textColumn), title: 'B. UOM', minWidth: 55, disabled: true },
      {
        ...keyColumn('net_price', floatColumn),
        title: 'Net Price',
        minWidth: 100,
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
      {
        ...keyColumn('pr_number', {
          component: ({ rowData, rowIndex, ...rest }) =>
            rowData ? (
              <PrNumberCard
                rowData={rowData}
                rowIndex={rowIndex}
                handleOnChange={handleOnChange}
                onCollectAttachments={(attachments) =>
                  setCollectedAttachments((prev) => {
                    const seen = new Set(prev.map((file) => `${file.filename}|${file.path}`));
                    const filtered = attachments.filter((file) => !seen.has(`${file.filename}|${file.path}`));
                    return [...prev, ...filtered];
                  })
                }
              />
            ) : (
              <></>
            ),
        }),
        disabled: true,
        title: 'PR Number',
        minWidth: 120,
        maxWidth: 120,
      },
    ],
    []
  );
  const headerTabs = [
    {
      value: 'header_text',
      label: 'Header Text',
      tabIcon: <LetterText size={16} strokeWidth={1} className="text-black " />,
      visible: true,
      content: (
        <div>
          <Textarea value={data.header_text} onChange={(e) => setData('header_text', e.target.value.slice(0, 500))} maxLength={500} />
          <div className="text-xs text-right text-gray-500">{data.header_text.length}/500</div>
        </div>
      ),
    },
    {
      value: 'approver_text',
      label: 'Remarks',
      tabIcon: <LetterText size={16} strokeWidth={1} className="text-black " />,
      visible: true,
      content: <Textarea value={data.approver_text} onChange={(e) => setData('approver_text', e.target.value)} />,
    },
    {
      value: 'notes',
      label: 'Notes',
      tabIcon: <NotebookPen size={16} strokeWidth={1} className="text-black " />,
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
      tabIcon: <Truck size={16} strokeWidth={1} className="text-black " />,
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
      tabIcon: <Paperclip size={16} strokeWidth={1} className="text-black " />,
      visible: true,
      content: (
        <>
          <div className="mb-4">
            <div className="font-semibold text-xs mb-1 text-blue-700">Attachments via Drag & Drop:</div>
            <div className="border border-dashed border-blue-300 rounded-md p-3 bg-gray-50">
              <Dropzone
                files={files}
                setFiles={setFiles}
                collectedAttachments={collectedAttachments}
                setCollectedAttachments={setCollectedAttachments}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      value: 'vendor',
      label: 'Vendor Info',
      tabIcon: <Warehouse size={16} strokeWidth={1} className="text-black " />,
      visible: true,
      content: <VendorCard vendor={vendor} />,
    },
  ];

  const handleAddtoPo = (pomaterials) => {
    setMaterial([...material, ...pomaterials]);
  };

  const updateMaterial = (newValue: IPOMaterial[], operations: Operation[]) => {
    const updateMaterial = updateMaterialPO(newValue, operations, material);
    setMaterial(updateMaterial);
  };

  useEffect(() => {
    const poTotal = material.reduce((acc, mat) => acc + (mat.total_value || 0), 0);
    setData((prevHeader: IPOHeader) => ({
      ...prevHeader,
      total_po_value: poTotal,
      attachment: files,
      pomaterials: material,
      extended_attachments: collectedAttachments,
    }));
  }, [material, files, collectedAttachments]);

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
                <InputField label="Doc Date" id="doc_date" type="date" defaultValue={data.doc_date} disabled={true} />
                <InputField
                  label="Delivery Date"
                  id="deliv_date"
                  defaultValue={data.deliv_date}
                  onChange={(e) => setData('deliv_date', e.target.value)}
                  required={!data.is_mother_po}
                  type="date"
                />

                <SelectField
                  label="Requesting Plant"
                  items={auth.user.plants}
                  valueKey="plant"
                  displayKey="name1"
                  onValueChange={(value) => setData('plant', value)}
                  value={data.plant}
                  displayValue={true}
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
                <div className="flex-auto">
                  <br />
                  <Checkbox
                    onChange={(e) => setData('is_mother_po', e.target.checked)}
                    checked={data.is_mother_po}
                    className="border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-xs font-medium leading-none p-2">Mother PO</span>
                </div>
              </div>
              <div className="p-5 pt-0">
                <TabFields defaultValue="header_text" className="max-w-8xl" tabs={headerTabs} />
              </div>
              <div className="p-5 pt-0">
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
              <div className="p-5 pt-0">
                <div className="justify-end grid grid-cols-8 gap-4">
                  {can(auth.user, PermissionsEnum.CreatePO) && ( //auth.permissions.po.create && (
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
