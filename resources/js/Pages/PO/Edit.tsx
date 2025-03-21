import { Button, Input, Label, Textarea, Toaster, useToast } from '@/Components/ui';
import { Choice, IAlternativeUom, IApprover, IMessage, IPOHeader, IPOMaterial, IVendor, IWorkflow, PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import 'react-datasheet-grid/dist/style.css';
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
import {
  CUSTOM_DATA_SHEET_STYLE,
  PermissionsEnum,
  SEQ_DRAFT,
  SEQ_REJECT,
  STATUS_APPROVED,
  STATUS_REJECTED,
  STATUS_REWORK,
} from '@/lib/constants';
import { usePOMaterial, usePOMaterialValidation } from '@/Hooks';
import {
  AltUom,
  AttachmentList,
  Checkbox,
  Discard,
  Dropzone,
  FlagForAction,
  GenericTable,
  InputField,
  PrintButton,
  ReactSelectField,
  SelectField,
  TabFields,
  VendorCard,
} from '@/Components';
import { formatNumber } from '@/lib/utils';
import Approval from './Partial/Approval';
import AddPrtoPo from './Partial/AddPrtoPo';
import { Operation } from 'react-datasheet-grid/dist/types';
import { can } from '@/lib/helper';

const Edit = ({
  auth,
  vendors,
  poheader,
  message,
  deliveryAddress,
  supplierNotes,
}: PageProps<{ vendors: []; poheader: IPOHeader; message: IMessage; deliveryAddress: Choice[]; supplierNotes: Choice[] }>) => {
  const { toast } = useToast();

  const [apprSeq, setApprSeq] = useState<IApprover>();
  const [vendor, setVendor] = useState<IVendor | undefined>(poheader.vendors);
  const [files, setFiles] = useState([]);
  const { computeConversion, updateMaterialPO, getVendorInfo } = usePOMaterial();
  const { validateMaterials } = usePOMaterialValidation();

  const [material, setMaterial] = useState<IPOMaterial[]>(
    poheader.pomaterials.map((pomaterial) => ({
      ...pomaterial,
      ...computeConversion(pomaterial, pomaterial.unit ?? '', poheader.vendor_id, true),
      altUomSelect: [...new Set([pomaterial.unit, ...pomaterial?.alt_uom?.map((uom: IAlternativeUom) => uom.alt_uom)])],
      del_date: new Date(pomaterial.del_date || ''),
      origPOQty: pomaterial.po_qty ?? 0,
      mat_grp_desc: pomaterial.materialGroups?.mat_grp_desc || '',
    }))
  );

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
    is_mother_po: poheader.is_mother_po,
  });

  const handleOnChange = (value: string, rowIndex: number) => {
    setMaterial((prevMaterial) => {
      const newMaterial = [...prevMaterial];
      newMaterial[rowIndex] = {
        ...newMaterial[rowIndex],
        ...computeConversion(newMaterial[rowIndex], value, '', true),
      };
      return newMaterial;
    });
  };

  const columns = useMemo(
    () => [
      { ...keyColumn('sel', checkboxColumn), title: 'Sel', minWidth: 30 },
      { ...keyColumn('status', textColumn), title: 'Sts', minWidth: 35, disabled: true },
      { ...keyColumn('item_no', intColumn), title: 'ItmNo', minWidth: 55, disabled: true },
      { ...keyColumn('mat_code', textColumn), title: 'Material', minWidth: 120, disabled: true },
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
      {
        ...keyColumn('po_qty', floatColumn),
        title: 'PO Qty',
        minWidth: 70,
        disabled: ({ rowData }: any) => rowData.po_gr_qty != rowData.po_qty,
      },
      { ...keyColumn('qty_open_po', floatColumn), title: 'Open Qty', minWidth: 100, disabled: true },
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
      { ...keyColumn('pr_number', textColumn), title: 'PR Number', minWidth: 120, disabled: true },
    ],
    []
  );

  const workflowColumns = useMemo(
    () => [
      { header: 'Position', accessor: (row: IWorkflow) => row.position },
      { header: 'Status', accessor: (row: IWorkflow) => row.status },
      { header: 'Approved By', accessor: (row: IWorkflow) => row.approved_by },
      { header: 'Approved Date', accessor: (row: IWorkflow) => row.approved_date },
      { header: 'Remarks', accessor: (row: IWorkflow) => row.message },
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
      content: <Textarea value={data.approver_text} onChange={(e) => setData('approver_text', e.target.value)} />,
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
      content: (
        <>
          <AttachmentList
            attachments={poheader.attachments}
            canDelete={can(auth.user, PermissionsEnum.EditPO) /* auth.permissions.po.edit */}
          />
          <Dropzone files={files} setFiles={setFiles} />,
        </>
      ),
    },
    {
      value: 'workflow',
      label: 'Workflow',
      visible: poheader.workflows && poheader.workflows?.length > 0,
      content: <GenericTable columns={workflowColumns} data={poheader.workflows} className="w-11/2 text-xs bg-white" />,
    },
    {
      value: 'vendor',
      label: 'Vendor Info',
      visible: true,
      content: <VendorCard vendor={vendor} />,
    },
  ];

  const footerTabs = [
    {
      value: 'action',
      label: 'Action',
      visible: can(auth.user, PermissionsEnum.EditPO), //auth.permissions.po.edit,
      content: (
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
      ),
    },
  ];

  const handleAddtoPo = (pomaterials) => {
    setMaterial([...material, ...pomaterials]);
  };

  const updateMaterial = (newValue: IPOMaterial[], operations: Operation[]) => {
    const updateMaterial = updateMaterialPO(newValue, operations, material, true);
    setMaterial(updateMaterial);
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
  }, [message]);

  useEffect(() => {
    const poTotal = material.filter((mat) => mat?.status != 'X').reduce((acc, mat) => acc + (mat.total_value || 0), 0);
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

  const getVendor = async (vendorId) => {
    const vendorData = await getVendorInfo(vendorId);
    setVendor(vendorData);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const { isValid, updatedMaterials } = validateMaterials(material);
    setMaterial(updatedMaterials);
    if (isValid) {
      post(route('po.update', poheader.id), {
        preserveScroll: true,
        preserveState: false,
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
          {/* Remove since we add mass prinring */}
          {/* {poheader.status == STATUS_APPROVED && <PrintButton href={route('po.print', poheader.id)} />} */}
        </div>
      }>
      <Head title="Edit PO" />
      <Toaster />
      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="p-5 flex flex-wrap gap-4">
                <InputField label="PO Number" id="prnumber" disabled={true} defaultValue={data.po_number} />
                <InputField
                  label="Control No."
                  id="control_no"
                  defaultValue={data.control_no}
                  onChange={(e) => setData('control_no', e.target.value)}
                  type="number"
                />
                <InputField label="Created By" id="created_by" defaultValue={data.created_name} disabled={true} />
                <InputField label="Doc Date By" id="doc_date" type="date" defaultValue={data.doc_date} disabled={true} />
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
                <div className="p-1">
                  <Label htmlFor="total">Total PO Value: </Label>
                </div>
                <div>
                  <Input id="total" type="text" value={formatNumber(data.total_po_value)} readOnly disabled />
                </div>
              </div>
              <div className="p-2 pt-0">
                <TabFields defaultValue="action" className="max-w-8xl" tabs={footerTabs} />

                <div className="p-5 justify-end grid grid-cols-8 gap-4">
                  {can(auth.user, PermissionsEnum.EditPO) && ( //auth.permissions.po.edit && (
                    <>
                      <Button
                        variant="outline"
                        className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100"
                        disabled={poheader.appr_seq == SEQ_REJECT || processing}>
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
                        p_title="Discard this Purchase Order ?"
                        p_url="po.discard"
                        p_disable={poheader.appr_seq == SEQ_REJECT}
                      />

                      <AddPrtoPo p_vendor={data.vendor_id} p_plant={data.plant} p_doc_date={data.doc_date} addToPO={handleAddtoPo} />
                    </>
                  )}
                </div>
              </div>
            </form>
            {can(auth.user, PermissionsEnum.ApproverPO) && ( //auth.permissions.po.approver && (
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
