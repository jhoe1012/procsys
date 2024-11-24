import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, IPRMaterial, IPRHeader } from '@/types';
import {
  Button,
  Textarea,
  Input,
  Label,
  Toaster,
  useToast
} from '@/Components/ui/';
import {
  DataSheetGrid, checkboxColumn,
  textColumn,
  intColumn,
  keyColumn,
  floatColumn,
  dateColumn
} from 'react-datasheet-grid';
import 'react-datasheet-grid/dist/style.css';
import { useState, useEffect, useMemo, FormEventHandler } from 'react';
import { Operation } from 'react-datasheet-grid/dist/types';
import { formatNumber, customDataSheetStyle, dateToday } from '@/Lib/utils';
import { Loading, Dropzone, selectColumn, Choice, InputField, SelectField, TabFields } from '@/Components';
import { useMaterial, usePRMaterialValidation } from '@/Hooks';


const defaultMaterial = {
  sel: false,
  item_no: undefined,
  status: undefined,
  mat_code: undefined,
  short_text: undefined,
  qty: undefined,
  ord_unit: undefined,
  qty_ordered: undefined,
  qty_open: undefined,
  price: undefined,
  per_unit: undefined,
  unit: undefined,
  total_value: undefined,
  currency: undefined,
  del_date: undefined,
  mat_grp: undefined,
  purch_grp: undefined,
};

const Create = ({
  auth,
  mat_code,
  mat_desc,
}: PageProps<{ mat_code: Choice[] }> & PageProps<{ mat_desc: Choice[] }>) => {
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const { updateMaterialPR, computeConversion, isLoading } = useMaterial();
  const { validateMaterials } = usePRMaterialValidation();
  const [material, setMaterial] = useState<IPRMaterial[]>(Array(10).fill({ ...defaultMaterial }));

  const { data, setData, post, errors, reset, processing } = useForm<IPRHeader>({
    id: 0,
    pr_number: '',
    created_name: auth.user.name,
    doc_date: dateToday,
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

  const columns = useMemo(
    () => [
      { ...keyColumn('sel', checkboxColumn), title: 'Sel', minWidth: 30 },
      { ...keyColumn('status', textColumn), title: 'Sts', disabled: true, minWidth: 35 },
      { ...keyColumn('item_no', intColumn), title: 'ItmNo', disabled: true, minWidth: 55 },
      { ...keyColumn('mat_code', selectColumn({ choices: mat_code })), title: 'Material', minWidth: 120 },
      { ...keyColumn('short_text', selectColumn({ choices: mat_desc })), title: 'Short Text', minWidth: 300 },
      { ...keyColumn('qty', floatColumn), title: 'Qty', minWidth: 70 },
      {
        ...keyColumn('altUomSelect', {
          component: ({ rowData, rowIndex }) =>
            rowData && (
              <select
                className="border-none w-full shadow-none bg-none px-1 py-0 active:border-none hover:border-none"
                defaultValue={rowData.find(({ value }) => value === material[rowIndex].ord_unit) ?? null}
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
        minWidth: 100,
      },
      { ...keyColumn('ord_unit', textColumn), title: 'Ord Unit', minWidth: 55 },
      { ...keyColumn('price', floatColumn), title: 'Price', minWidth: 90, disabled: true },
      { ...keyColumn('unit', textColumn), title: 'Unit', minWidth: 50, disabled: true },
      { ...keyColumn('total_value', floatColumn), title: 'Total Value', minWidth: 90, disabled: true },
      { ...keyColumn('currency', textColumn), title: 'Curr', minWidth: 50, disabled: true },
      { ...keyColumn('del_date', dateColumn), title: 'Del Date', minWidth: 130 },
      { ...keyColumn('mat_grp', textColumn), title: 'Mat Grp', minWidth: 90, disabled: true },
      { ...keyColumn('purch_grp', textColumn), title: 'Purch Grp', minWidth: 90, disabled: true },
    ],
    []
  );

  const tabs = [
    {
      value: 'reasonForPr',
      label: 'Reason for PR',
      content: (
        <Textarea value={data.reason_pr} onChange={(e) => setData('reason_pr', e.target.value)} required={true} />
      ),
    },
    {
      value: 'headerText',
      label: 'Header Text',
      content: <Textarea value={data.header_text} onChange={(e) => setData('header_text', e.target.value)} />,
    },
    {
      value: 'attachment',
      label: 'Attachment',
      content: <Dropzone files={files} setFiles={setFiles} />,
    },
  ];

  const updateMaterial = async (newValue: IPRMaterial[], operations: Operation[]) => {
    const updatedMaterial = await updateMaterialPR(newValue, operations, material, data.plant);
    setMaterial(updatedMaterial);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const {isValid, updatedMaterials} = validateMaterials(material)
    setMaterial(updatedMaterials)
    if ( isValid) {
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
                <InputField label="Date" id="date" defaultValue={data.doc_date} disabled={true} />
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
                  createRow={() => defaultMaterial}
                  value={material}
                  onChange={updateMaterial}
                  columns={columns}
                  style={customDataSheetStyle}
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
                  {auth.permissions.pr.create && (
                    <>
                      <Button
                        variant="outline"
                        disabled={processing}
                        className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] ">
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
