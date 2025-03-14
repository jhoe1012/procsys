import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, IPRMaterial, IPRHeader, Choice, IAlternativeUom } from '@/types';
import { Button, Textarea, Input, Label, Toaster, useToast } from '@/Components/ui/';
import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  intColumn,
  keyColumn,
  floatColumn,
  dateColumn,
  createTextColumn,
} from 'react-datasheet-grid';
import 'react-datasheet-grid/dist/style.css';
import { useState, useEffect, useMemo, FormEventHandler } from 'react';
import { Operation } from 'react-datasheet-grid/dist/types';
import { formatNumber } from '@/lib/utils';
import { Loading, Dropzone, selectColumn, InputField, SelectField, TabFields, AltUom } from '@/Components';
import { usePRMaterial, usePRMaterialValidation } from '@/Hooks';
import { CUSTOM_DATA_SHEET_STYLE, DATE_TODAY, DEFAULT_PR_MATERIAL, PermissionsEnum } from '@/lib/constants';
import { can } from '@/lib/helper';
import { Item } from '@radix-ui/react-select';
import { text } from 'node:stream/consumers';
import { components } from 'react-select';

const Create = ({
  auth,
  mat_code,
  mat_desc,
  prheader,
  materialGroupsSupplies,
  prCtrlGrp,
}: PageProps<{ mat_code: Choice[]; mat_desc: Choice[]; prheader: IPRHeader; materialGroupsSupplies: string[]; prCtrlGrp: Choice[] }>) => {
  const initialMaterial = prheader
    ? prheader.prmaterials.map((prmaterial) => ({
        ...prmaterial,
        mat_grp_desc: prmaterial.materialGroups?.mat_grp_desc ?? '',
        del_date: undefined,
        qty: undefined,
        altUomSelect: [
          ...new Set([prmaterial.ord_unit, ...(prmaterial.alt_uom ? prmaterial.alt_uom.map((item: IAlternativeUom) => item.alt_uom) : [])]),
        ],
      }))
    : Array(10).fill({ ...DEFAULT_PR_MATERIAL });

  const [material, setMaterial] = useState<IPRMaterial[]>(initialMaterial);
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const { updateMaterialPR, computeConversion, isLoading } = usePRMaterial();
  const { validateMaterials } = usePRMaterialValidation();
  const { data, setData, post, errors, reset, processing } = useForm<IPRHeader>({
    id: 0,
    pr_number: '',
    created_name: auth.user.name,
    doc_date: DATE_TODAY,
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

  const handleOnChangeUom = (value: string, rowIndex: number) => {
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
      { ...keyColumn('sel', checkboxColumn), title: 'Sel', minWidth: 30 },
      { ...keyColumn('status', textColumn), title: 'Sts', disabled: true, minWidth: 35 },
      { ...keyColumn('item_no', intColumn), title: 'ItmNo', disabled: true, minWidth: 55 },
      { ...keyColumn('mat_code', selectColumn({ choices: mat_code })), title: 'Material', minWidth: 120 },
      { ...keyColumn('short_text', selectColumn({ choices: mat_desc })), title: 'Material Description', minWidth: 300 },
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
      { ...keyColumn('qty', floatColumn), title: 'Qty', minWidth: 70 },
      {
        ...keyColumn('ord_unit', textColumn),
        title: 'Ord UOM',
        minWidth: 55,
        disabled: true,
      },
      // {
      //   ...keyColumn('altUomSelect', {
      //     component: ({ rowData, rowIndex }) => rowData && <AltUom rowData={rowData} rowIndex={rowIndex} handleOnChange={handleOnChange} />,
      //   }),
      //   disabled: true,
      //   title: '',
      //   minWidth: 20,
      //   maxWidth: 20,
      // },
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
      {
        ...keyColumn('price', floatColumn),
        title: 'Price',
        minWidth: 90,
        disabled: ({ rowData }: any) => rowData.mat_grp && !materialGroupsSupplies.includes(rowData.mat_grp),
      },
      {
        ...keyColumn('per_unit', floatColumn),
        title: 'Per Unit',
        minWidth: 50,
        disabled: ({ rowData }: any) => rowData.mat_grp && !materialGroupsSupplies.includes(rowData.mat_grp),
      },
      // { ...keyColumn('unit', textColumn), title: 'B.UOM', minWidth: 60, disabled: true },
      { ...keyColumn('total_value', floatColumn), title: 'Total Value', minWidth: 90, disabled: true },
      { ...keyColumn('currency', textColumn), title: 'Curr', minWidth: 50, disabled: true },
      { ...keyColumn('del_date', dateColumn), title: 'Del Date', minWidth: 130 },
      { ...keyColumn('mat_grp_desc', textColumn), title: 'Mat Grp', minWidth: 100, disabled: true },
      { ...keyColumn('purch_grp', textColumn), title: 'Purch Grp', minWidth: 90, disabled: true },
      {
        ...keyColumn('prctrl_grp_id', selectColumn({ choices: prCtrlGrp })),
        title: 'PR Controller',
        minWidth: 200,
        disabled: ({ rowData }: any) => rowData.mat_grp && !materialGroupsSupplies.includes(rowData.mat_grp),
      },
    ],
    []
  );

  const tabs = [
    {
      value: 'reasonForPr',
      label: 'Reason for PR',
      visible: true,
      content: <Textarea value={data.reason_pr} onChange={(e) => setData('reason_pr', e.target.value)} required={true} />,
    },
    {
      value: 'headerText',
      label: 'Header Text',
      visible: true,
      content: <Textarea value={data.header_text} onChange={(e) => setData('header_text', e.target.value)} />,
    },
    {
      value: 'attachment',
      label: 'Attachment',
      visible: true,
      content: <Dropzone files={files} setFiles={setFiles} />,
    },
  ];

  const updateMaterial = async (newValue: IPRMaterial[], operations: Operation[]) => {
    const updatedMaterial = await updateMaterialPR(newValue, operations, material, data.plant, data.doc_date, materialGroupsSupplies);
    setMaterial(updatedMaterial);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const { isValid, updatedMaterials } = validateMaterials(material, materialGroupsSupplies);
    setMaterial(updatedMaterials);
    if (isValid) {
      post(route('pr.store'));
    }
  };

  useEffect(() => {
    const prTotal = material.reduce((acc, mat) => acc + (mat.total_value || 0), 0);
    setData((prevHeader: IPRHeader) => ({
      ...prevHeader,
      total_pr_value: prTotal,
      attachment: files,
      prmaterials: material,
    }));
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
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Purchase Requisition</h2>}>
      <Head title="PR Create" />
      {isLoading && <Loading />}
      <Toaster />
      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="p-5 flex flex-wrap gap-4">
                <InputField label="PR Number" id="prnumber" defaultValue={data.pr_number} disabled={true} />
                <InputField label="Created By" id="createdby" defaultValue={data.created_name} disabled={true} />
                <InputField label="Doc Date" id="doc_date" type="date" defaultValue={data.doc_date} disabled={true} />
                <InputField
                  label="Requested By"
                  id="requested_by"
                  defaultValue={data.requested_by}
                  required={true}
                  onChange={(e) => setData('requested_by', e.target.value)}
                />
                <SelectField
                  label="Requesting Plant"
                  items={auth.user.plants}
                  valueKey="plant"
                  displayKey="name1"
                  onValueChange={(value) => setData('plant', value)}
                  value={data.plant}
                />
              </div>
              <div className="p-1 pt-0">
                <TabFields defaultValue="reasonForPr" className="max-w-8xl" tabs={tabs} />
              </div>
              <div className="p-2">
                <DataSheetGrid
                  createRow={() => DEFAULT_PR_MATERIAL}
                  value={material}
                  onChange={updateMaterial}
                  columns={columns}
                  style={CUSTOM_DATA_SHEET_STYLE}
                  autoAddRow
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
                <div className="p-5 justify-end grid grid-cols-8 gap-4">
                  {can(auth.user, PermissionsEnum.CreatePR) && ( //auth.permissions.pr.create && (
                    <>
                      <Button variant="outline" disabled={processing} className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] ">
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
