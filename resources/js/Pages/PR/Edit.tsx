import {
  AltUom,
  AttachmentList,
  Discard,
  Dropzone,
  FlagForAction,
  GenericTable,
  InputField,
  Loading,
  selectColumn,
  SelectField,
  TabFields,
} from '@/Components';
import { Button, Input, Label, Textarea, Toaster, useToast } from '@/Components/ui';
import { usePRMaterial, usePRMaterialValidation } from '@/Hooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
  CUSTOM_DATA_SHEET_STYLE,
  DEFAULT_PR_MATERIAL,
  PermissionsEnum,
  SEQ_DRAFT,
  SEQ_REJECT,
  STATUS_APPROVED,
  STATUS_REJECTED,
  STATUS_REWORK,
} from '@/lib/constants';
import { formatNumber } from '@/lib/utils';
import { Choice, IAlternativeUom, IitemDetails, IMessage, IPRHeader, IPRMaterial, IWorkflow, PageProps } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler, useEffect, useMemo, useRef, useState } from 'react';
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
import Approval from './Partial/Approval';
import { can } from '@/lib/helper';
import { LetterText, List, Paperclip, Pointer, Workflow } from 'lucide-react';
import isEqual from 'lodash.isequal';

const Edit = ({
  auth,
  prheader,
  mat_code,
  mat_desc,
  message,
  item_details,
  materialGroupsSupplies,
  prCtrlGrp,
  materialGeneric,
}: PageProps<{
  prheader: IPRHeader;
  mat_code: Choice[];
  mat_desc: Choice[];
  message: IMessage;
  item_details: IitemDetails[];
  materialGroupsSupplies: string[];
  prCtrlGrp: Choice[];
  materialGeneric: string[];
}>) => {
  const { toast } = useToast();
  const [material, setMaterial] = useState<IPRMaterial[]>(
    prheader.prmaterials.map((prmaterial) => ({
      ...prmaterial,
      mat_grp_desc: prmaterial.materialGroups?.mat_grp_desc || '',
      del_date: new Date(prmaterial.del_date || ''),
      altUomSelect: [
        ...new Set([prmaterial.ord_unit, ...(prmaterial.alt_uom ? prmaterial.alt_uom.map((item: IAlternativeUom) => item.alt_uom) : [])]),
      ],
    }))
  );
  const [itemDetails, setItemDetails] = useState([]);
  const [files, setFiles] = useState([]);
  const [isMaterialRefreshing, setIsMaterialRefreshing] = useState(false);
  const approverGrpId = auth.user.approvers
    .filter((approver) => approver.type === 'pr')
    .map((approver) => approver.plant + approver.seq + approver.prctrl_grp_id);
  const headerGrpId = prheader.plant + prheader.appr_seq + prheader.prctrl_grp_id;
  const disableButton =
    prheader.status == STATUS_APPROVED ||
    prheader.status == STATUS_REWORK ||
    prheader.status == STATUS_REJECTED ||
    !approverGrpId.includes(headerGrpId);

  const { updateMaterialPR, computeConversion, isLoading, getMaterialInfo } = usePRMaterial();
  const { validateMaterials } = usePRMaterialValidation();
  const { data, setData, post, errors, reset, processing } = useForm<IPRHeader>({
    id: prheader.id,
    pr_number: prheader.pr_number,
    created_name: prheader.created_name,
    doc_date: prheader.doc_date,
    attachment: undefined,
    requested_by: prheader.requested_by,
    plant: prheader.plant,
    reason_pr: prheader.reason_pr,
    header_text: prheader.header_text ?? '',
    total_pr_value: prheader.total_pr_value,
    status: prheader.status || '',
    deliv_addr: prheader.deliv_addr,
    prmaterials: [],
    attachments: [],
    _method: 'patch',
  });

  const handleOnChangeUom = (value: string, rowIndex: number) => {
    setMaterial((prevMaterial) => {
      const newMaterial = [...prevMaterial];
      if (materialGeneric.includes(newMaterial[rowIndex].mat_code)) {
        newMaterial[rowIndex] = {
          ...newMaterial[rowIndex],
          ...computeConversion(newMaterial[rowIndex], value, true),
        };
      } else {
        newMaterial[rowIndex] = {
          ...newMaterial[rowIndex],
          ...computeConversion(newMaterial[rowIndex], value),
        };
      }
      return newMaterial;
    });
  };

  /** Check if any material item has a quantity already ordered (i.e., linked to a purchase order) */
  const hasAnyPO = material.some((mat) => (mat.qty_ordered || 0) > 0);

  const columns = useMemo(
    () => [
      { ...keyColumn('sel', checkboxColumn), title: 'Sel', minWidth: 30 },
      { ...keyColumn('status', textColumn), title: 'Sts', disabled: true, minWidth: 35 },
      { ...keyColumn('item_no', intColumn), title: 'ItmNo', disabled: true, minWidth: 55 },
      {
        ...keyColumn('mat_code', selectColumn({ choices: mat_code })),
        title: 'Material',
        minWidth: 120,
        disabled: hasAnyPO,
      },
      {
        ...keyColumn('short_text', selectColumn({ choices: mat_desc })),
        title: 'Material Description',
        minWidth: 400,
        disabled: hasAnyPO,
      },
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
        disabled: hasAnyPO,
      },
      { ...keyColumn('qty', floatColumn), title: 'Qty', minWidth: 70, disabled: hasAnyPO },
      {
        ...keyColumn('ord_unit', textColumn),
        title: 'Ord UOM',
        minWidth: 55,
        disabled: true,
      },
      {
        ...keyColumn('alt_uom', {
          component: ({ rowData, rowIndex }: { rowData: IAlternativeUom[]; rowIndex: number }) =>
            rowData && rowData.length !== 0 ? <AltUom rowData={rowData} rowIndex={rowIndex} handleOnChange={handleOnChangeUom} /> : <></>,
        }),
        disabled: true,
        title: '',
        minWidth: 20,
        maxWidth: 20,
      },
      {
        ...keyColumn('price', floatColumn),
        title: 'Price',
        minWidth: 90,
        disabled: hasAnyPO || (({ rowData }: any) => rowData.mat_grp && !materialGroupsSupplies.includes(rowData.mat_grp)),
      },
      {
        ...keyColumn('per_unit', floatColumn),
        title: 'Per Unit',
        minWidth: 50,
        disabled: hasAnyPO || (({ rowData }: any) => rowData.mat_grp && !materialGroupsSupplies.includes(rowData.mat_grp)),
      },
      { ...keyColumn('total_value', floatColumn), title: 'Total Value', minWidth: 120, disabled: true },
      { ...keyColumn('currency', textColumn), title: 'Curr', minWidth: 40, disabled: true },
      { ...keyColumn('del_date', dateColumn), title: 'Del Date', minWidth: 130, disabled: hasAnyPO },
      {
        ...keyColumn('prctrl_grp_id', selectColumn({ choices: prCtrlGrp })),
        title: 'PR Controller',
        minWidth: 200,
        disabled: hasAnyPO || (({ rowData }: any) => rowData.mat_grp && !materialGroupsSupplies.includes(rowData.mat_grp)),
      },
      { ...keyColumn('mat_grp_desc', textColumn), title: 'Mat Grp', minWidth: 100, disabled: true },
      { ...keyColumn('purch_grp', textColumn), title: 'Purch Grp', minWidth: 90, disabled: true },
    ],
    [hasAnyPO, material]
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
      value: 'reasonForPr',
      label: 'Reason for PR',
      tabIcon: <LetterText size={16} strokeWidth={1} className="text-black " />,
      visible: true,
      content: <Textarea value={data.reason_pr} onChange={(e) => setData('reason_pr', e.target.value)} required={true} />,
    },
    {
      value: 'headerText',
      label: 'Header Text',
      tabIcon: <LetterText size={16} strokeWidth={1} className="text-black " />,
      visible: true,
      content: <Textarea value={data.header_text} onChange={(e) => setData('header_text', e.target.value)} />,
    },
    {
      value: 'workflow',
      label: 'Workflow',
      tabIcon: <Workflow size={16} strokeWidth={1} className="text-black " />,
      visible: prheader.workflows && prheader.workflows?.length > 0,
      content: <GenericTable columns={workflowColumns} data={prheader.workflows} className="w-11/2 text-xs bg-white" />,
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
              <Dropzone files={files} setFiles={setFiles} />
            </div>
            {prheader.attachments && prheader.attachments.length > 0 && (
              <div className="mt-6">
                <div className="font-semibold text-xs mb-1 text-green-700">Uploaded Attachments:</div>
                <div className="border border-dashed border-green-500 rounded-md p-3">
                  <AttachmentList attachments={prheader.attachments} canDelete={can(auth.user, PermissionsEnum.EditPR)} />
                </div>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];

  const itemDetailsColumns = [
    { header: 'Document', accessor: (row: IitemDetails) => row.doc },
    { header: 'Item', accessor: (row: IitemDetails) => row.itm },
    { header: 'Status', accessor: (row: IitemDetails) => row.sts },
    { header: 'Quantity', accessor: (row: IitemDetails) => row.qty },
    { header: 'Unit', accessor: (row: IitemDetails) => row.unit },
  ];

  const footerTabs = [
    {
      value: 'itemDetails',
      label: 'Item Details',
      tabIcon: <List size={16} strokeWidth={1} className="text-black " />,
      visible: itemDetails.length > 0,
      content: <GenericTable columns={itemDetailsColumns} data={itemDetails} className="w-11/2 text-xs bg-white" />,
    },
    {
      value: 'action',
      label: 'Action',
      tabIcon: <Pointer size={16} strokeWidth={1} className="text-black " />,
      visible: can(auth.user, PermissionsEnum.EditPR), //auth.permissions.pr.edit,
      content: (
        <div>
          <FlagForAction
            p_description="Remove flag for this item(s)?"
            p_title="Remove Flag"
            p_url={route('pr.flag.remove')}
            p_disable={material.filter((mat) => mat.sel == true).length == 0}
            p_items={{ ids: material.filter((mat) => mat.sel == true).map((mat) => mat.id) }}
          />

          <FlagForAction
            p_description="Flag delete this item(s)?"
            p_title="Flag Delete"
            p_url={route('pr.flag.delete')}
            p_disable={material.filter((mat) => mat.sel == true).length == 0 || hasAnyPO}
            p_items={{ ids: material.filter((mat) => mat.sel == true).map((mat) => mat.id) }}
          />

          <FlagForAction
            p_description="Flag close this item(s)?"
            p_title="Flag Close"
            p_url={route('pr.flag.close')}
            p_disable={material.filter((mat) => mat.sel == true).length == 0}
            p_items={{ ids: material.filter((mat) => mat.sel == true).map((mat) => mat.id) }}
          />
        </div>
      ),
    },
  ];

  const updateMaterial = async (newValue: IPRMaterial[], operations: Operation[]) => {
    const updatedMaterial = await updateMaterialPR(newValue, operations, material, data.plant, data.doc_date, materialGeneric, prCtrlGrp);
    setMaterial(updatedMaterial);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const { isValid, updatedMaterials } = validateMaterials(material, materialGeneric, prCtrlGrp);
    setMaterial(updatedMaterials);
    if (isValid) {
      post(route('pr.update', prheader.id), {
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
          reset();
          setFiles([]);
        },
      });
    }
  };

  const initialDataRef = useRef<{
    data: Partial<IPRHeader>;
    material: IPRMaterial[];
    files: any[];
  }>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (
      prheader &&
      prheader.prmaterials &&
      prheader.attachments &&
      material.length === prheader.prmaterials.length &&
      !initialDataRef.current
    ) {
      initialDataRef.current = {
        data: {
          requested_by: data.requested_by,
          plant: data.plant,
          reason_pr: data.reason_pr,
          header_text: data.header_text,
        },
        material: material, // direct reference
        files: [],
      };
      setIsReady(true);
    }
  }, [prheader, material.length]);

  const hasChanges = () => {
    if (!initialDataRef.current) return false;
    const dataChanged = !isEqual(
      {
        requested_by: data.requested_by,
        plant: data.plant,
        reason_pr: data.reason_pr,
        header_text: data.header_text,
      },
      initialDataRef.current.data
    );
    const materialChanged = !isEqual(material, initialDataRef.current.material);
    const filesChanged = !isEqual(files, initialDataRef.current.files);

    return dataChanged || materialChanged || filesChanged;
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
  }, [message]);

  useEffect(() => {
    const prTotal = material.filter((mat) => mat?.status != 'X').reduce((acc, mat) => acc + (mat.total_value || 0), 0);
    const m_checked = material.filter((item) => item.sel == true).map((item) => item.id)[0];
    const m_item_details = item_details.filter((item) => item.id == m_checked);
    setData((prevHeader: IPRHeader) => ({
      ...prevHeader,
      total_pr_value: prTotal,
      attachment: files,
      prmaterials: material,
    }));
    setItemDetails(m_item_details);
  }, [material, files]);

  useEffect(() => {
    if (errors.hasOwnProperty('error')) {
      toast({
        variant: 'destructive',
        description: errors.error,
      });
    }
  }, [errors]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Purchase Requisition</h2>}>
      <Head title="PR Edit" />
      {isLoading && <Loading />}
      <Toaster />
      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="p-5 flex flex-wrap gap-4">
                <InputField label="PR Number" id="prnumber" defaultValue={data.pr_number} disabled={true} />
                <InputField label="Created By" id="createdby" defaultValue={data.created_name} disabled={true} />
                <InputField label="Date" id="date" type="date" defaultValue={data.doc_date} disabled={true} />
                <InputField
                  label="Requested By"
                  id="requested_by"
                  value={data.requested_by}
                  required={true}
                  onChange={(e) => setData('requested_by', e.target.value)}
                />
                <SelectField
                  label="Requesting Plant"
                  items={auth.user.plants}
                  valueKey="plant"
                  displayKey="name1"
                  onValueChange={async (value) => {
                    setIsMaterialRefreshing(true);
                    setData('plant', value);
                    const refreshedMaterial = await Promise.all(
                      material.map(async (mat) => {
                        if (mat.mat_code) {
                          const info = await getMaterialInfo(mat.mat_code, value, data.doc_date);
                          if (info) {
                            return {
                              ...mat,
                              plant: value,
                              prctrl_grp_id: info.purchasingGroups?.prCtrlGrp?.id || prCtrlGrp[0]?.value || undefined,
                              prctrl_grp: info.purchasingGroups?.prCtrlGrp?.prctrl_grp || null,
                            };
                          }
                        }
                        return { ...mat, plant: value, prctrl_grp: null };
                      })
                    );
                    setMaterial(refreshedMaterial);
                    setIsMaterialRefreshing(false);
                  }}
                  value={data.plant}
                  displayValue={true}
                />
              </div>
              <div className="p-5">
                <TabFields defaultValue="reasonForPr" className="max-w-8xl" tabs={headerTabs} />
              </div>
              <div className="p-5 pt-0">
                <DataSheetGrid
                  createRow={() => DEFAULT_PR_MATERIAL}
                  value={material}
                  onChange={updateMaterial}
                  columns={columns}
                  style={CUSTOM_DATA_SHEET_STYLE}
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
              <div className="p-5 pt-0">
                <TabFields defaultValue="itemDetails" className="max-w-8xl" tabs={footerTabs} />
                <div className="p-5 justify-end grid grid-cols-8 gap-4">
                  {can(auth.user, PermissionsEnum.EditPR) && ( //auth.permissions.pr.edit && (
                    <>
                      <Button
                        type="submit"
                        variant="outline"
                        className="bg-[#f8c110] hover:border-gray-500 hover:bg-[#f8c110] disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100"
                        disabled={
                          prheader.appr_seq === SEQ_REJECT || processing || hasAnyPO || !isReady || !hasChanges() || isMaterialRefreshing
                        }>
                        Save
                      </Button>
                      <Link
                        href={route('pr.index')}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500 disabled:cursor-not-allowed disabled:opacity-100">
                        Cancel
                      </Link>
                      <Link
                        disabled={prheader.appr_seq != SEQ_DRAFT || hasAnyPO}
                        preserveScroll
                        href={route('pr.submit', prheader.id)}
                        as="button"
                        type="button"
                        className="bg-[#f8c110] hover:border-gray-500 hover:bg-[#f8c110] disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input">
                        Submit
                      </Link>
                      <Discard
                        p_id={prheader.id}
                        p_disable={prheader.appr_seq != SEQ_DRAFT || hasAnyPO}
                        p_title="Discard this Purchase Requisition ?"
                        p_url="pr.discard"
                      />

                      <Link
                        preserveScroll
                        href={route('pr.recall', prheader.id)}
                        as="button"
                        type="button"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500 disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100"
                        disabled={hasAnyPO}>
                        Recall
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </form>
            {can(auth.user, PermissionsEnum.ApproverPR) && ( //auth.permissions.pr.approver && (
              <div className="px-5 pb-5">
                <Approval p_pr_number={data.pr_number} p_type={STATUS_APPROVED} p_title="approve" p_disable={disableButton} />
                <Approval p_pr_number={data.pr_number} p_type={STATUS_REWORK} p_title="rework" p_disable={disableButton} />
                <Approval p_pr_number={data.pr_number} p_type={STATUS_REJECTED} p_title="reject" p_disable={disableButton} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
