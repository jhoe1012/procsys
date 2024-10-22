import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { PageProps, IPRMaterial, IPRHeader, IMessage, IWorkflow, IApprover } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import Approval from './Partial/Approval';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import 'react-datasheet-grid/dist/style.css';
import { useState, useEffect, FormEventHandler } from 'react';
import { Choice } from '@/Components/SelectComponent';
import selectColumn from '@/Components/SelectComponent';
import { ScrollArea } from '@/Components/ui/scroll-area';
import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  intColumn,
  keyColumn,
  floatColumn,
  dateColumn,
} from 'react-datasheet-grid';
import { Operation } from 'react-datasheet-grid/dist/types';
import { Toaster } from '@/Components/ui/toaster';
import { useToast } from '@/Components/ui/use-toast';
import Discard from '@/Components/Discard';
import { formatNumber } from '@/lib/utils';
import FlagForAction from '@/Components/FlagForAction';
import { SEQ_DRAFT, STATUS_APPROVED, STATUS_REJECTED, STATUS_REWORK } from '@/lib/constants';
import Dropzone from '@/Components/Dropzone';
import { XMarkIcon } from '@heroicons/react/24/solid';

const Edit = ({
  auth,
  prheader,
  mat_code,
  mat_desc,
  message,
  item_details,
}: PageProps<{ prheader: IPRHeader }> &
  PageProps<{ mat_code: Choice[] }> &
  PageProps<{ mat_desc: Choice[] }> &
  PageProps<{ message: IMessage }>) => {
  const dateToday = new Date().toLocaleDateString();

  const [material, setMaterial] = useState<IPRMaterial[]>([]);

  const [itemDetails, setItemDetails] = useState([]);
  const [files, setFiles] = useState([]);

  // const [data, setData] = useState<IPRHeader>(prheader1);

  const { data, setData, post, errors, reset, processing } = useForm<IPRHeader>({
    id: prheader.id,
    pr_number: prheader.pr_number,
    created_name: prheader.created_name,
    doc_date: prheader.doc_date,
    attachment: undefined,
    requested_by: prheader.requested_by,
    plant: prheader.plant,
    reason_pr: prheader.reason_pr,
    header_text: prheader.header_text,
    // workflows: prheader.workflows,
    total_pr_value: prheader.total_pr_value,
    status: prheader.status || '',
    deliv_addr: prheader.deliv_addr,
    prmaterials: [],
    attachments: [],
    _method: 'patch',
  });

  const [apprSeq, setApprSeq] = useState<IApprover>();

  //TODO USE DRY METHOD
  const approvalStatus = { approve: 'approved', rework: 'rework', reject: 'rejected' };

  const { toast } = useToast();

  const columns = [
    { ...keyColumn('sel', checkboxColumn), title: 'Sel', minWidth: 30 },
    { ...keyColumn('status', textColumn), title: 'Sts', disabled: true, minWidth: 35 },
    { ...keyColumn('item_no', intColumn), title: 'ItmNo', disabled: true, minWidth: 55 },
    { ...keyColumn('mat_code', selectColumn({ choices: mat_code })), title: 'Material', minWidth: 120 },
    { ...keyColumn('short_text', selectColumn({ choices: mat_desc })), title: 'Short Text', minWidth: 300 },
    { ...keyColumn('qty', floatColumn), title: 'Qty', minWidth: 70 },
    { ...keyColumn('ord_unit', textColumn), title: 'Ord Unit', minWidth: 55 },
    { ...keyColumn('qty_ordered', floatColumn), title: 'Qty Ordered', minWidth: 70, disabled: true },
    { ...keyColumn('qty_open', floatColumn), title: 'Qty Open', minWidth: 70, disabled: true },
    { ...keyColumn('price', floatColumn), title: 'Price', minWidth: 70, disabled: true },
    { ...keyColumn('per_unit', floatColumn), title: 'Per Unit', minWidth: 40, disabled: true },
    { ...keyColumn('unit', textColumn), title: 'Unit', minWidth: 40, disabled: true },
    { ...keyColumn('total_value', floatColumn), title: 'Total Value', minWidth: 90, disabled: true },
    { ...keyColumn('currency', textColumn), title: 'Curr', minWidth: 40, disabled: true },
    { ...keyColumn('del_date', dateColumn), title: 'Del Date', minWidth: 130 },
    { ...keyColumn('mat_grp', textColumn), title: 'Mat Grp', minWidth: 100, disabled: true },
    { ...keyColumn('purch_grp', textColumn), title: 'Purch Grp', minWidth: 90, disabled: true },
  ];

  const customStyle = {
    '--dsg-header-text-color': 'rgb(10, 10, 10)',
    '--dsg-cell-disabled-background-color': 'rgb(245, 245, 245)',
    '--dsg-border-color': '#bfbdbd',
  };

  const getMaterialInfo = async (material: string) => {
    try {
      const response = await window.axios.get(route('material.details'), {
        params: { material: material, plant: data.plant },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching material info:', error);
      return null;
    }
  };

  const updateMaterial = async (newValue: IPRMaterial[], operations: Operation[]) => {
    const updatedMaterial = [...newValue];
    const oldMaterialValue = [...material];

    for (const operation of operations) {
      if (operation.type === 'UPDATE') {
        // for (let i = operation.fromRowIndex; i <= operation.fromRowIndex; i++) {
        const value = updatedMaterial[operation.fromRowIndex];
        const oldValue = oldMaterialValue[operation.fromRowIndex];

        if (value.mat_code && value.mat_code !== oldValue.mat_code) {
          const materialInfo = await getMaterialInfo(value.mat_code);
          if (materialInfo) {
            // value.item_no = (operation.fromRowIndex + 1) * 10;
            value.short_text = materialInfo.mat_desc;
            value.ord_unit = materialInfo.base_uom;
            value.unit = materialInfo.base_uom;
            value.price = parseFloat(materialInfo.valuations[0]?.valuation_price || 0);
            value.currency = materialInfo.valuations[0]?.currency || '';
            value.per_unit = parseFloat(materialInfo.valuations[0]?.per_unit || 0);
            value.mat_grp = materialInfo.materialGroups[0]?.mat_grp_code || '';
            value.purch_grp = materialInfo.purchasingGroups[0]?.purch_grp || '';
            value.total_value = value.price * (value.qty || 0);
          }
        }

        if (value.short_text && value.short_text !== oldValue.short_text) {
          const materialInfo = await getMaterialInfo(value.short_text);
          if (materialInfo) {
            // value.item_no = (operation.fromRowIndex + 1) * 10;
            value.mat_code = materialInfo.mat_code;
            value.ord_unit = materialInfo.base_uom;
            value.unit = materialInfo.base_uom;
            value.price = parseFloat(materialInfo.valuations[0]?.valuation_price || 0);
            value.currency = materialInfo.valuations[0]?.currency || '';
            value.per_unit = parseFloat(materialInfo.valuations[0]?.per_unit || 0);
            value.mat_grp = materialInfo.materialGroups[0]?.mat_grp_code || '';
            value.purch_grp = materialInfo.purchasingGroups[0]?.purch_grp || '';
            value.total_value = value.price * (value.qty || 0);
          }
        }

        if (value.qty !== oldValue.qty) {
          value.total_value = ((value.price ?? 0) / (value.per_unit ?? 0)) * (value.qty ?? 0);
        }

        value.item_no = (operation.fromRowIndex + 1) * 10;
        // }
      }
    }

    setMaterial(updatedMaterial);
    setData({ ...data, prmaterials: updatedMaterial });
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (handleCheck()) {
      post(route('pr.update', prheader.id), {
        preserveScroll: true,
        onSuccess: (page) => {
          reset();
        },
      });
    }
  };

  const handleCheck = () => {
    const date_today = new Date();
    let flag = true;
    const item = material
      .filter((item) => item.mat_code !== undefined)
      .map((item, index) => ({ ...item, item_no: (index + 1) * 10 }));
    setMaterial(item);
    if (item.length <= 0) {
      toast({
        variant: 'destructive',
        title: `Please add atleast 1 item`,
      });
      return false;
    }

    for (let i = 0; i < material.length; i++) {
      if (material[i].mat_code !== undefined && material[i].mat_code !== '') {
        if (material[i].qty === undefined || material[i]?.qty <= 0) {
          toast({
            variant: 'destructive',
            title: `Please enter quantity for item no ${material[i].item_no}`,
          });
          flag = false;
          break;
        }

        if (material[i].ord_unit === undefined || material[i]?.ord_unit === null) {
          toast({
            variant: 'destructive',
            title: `Please enter order unit for item no ${material[i].item_no}`,
          });
          flag = false;
          break;
        }

        if (material[i].del_date === undefined || material[i]?.del_date === null) {
          toast({
            variant: 'destructive',
            description: `Please enter delivery date for item no ${material[i].item_no}`,
          });
          flag = false;
          break;
        } else if (material[i].del_date?.getTime() <= date_today.getTime()) {
          toast({
            variant: 'destructive',
            description: `Please enter delivery date greater than today for item no ${material[i].item_no}`,
          });
          flag = false;
          break;
        }
      }
    }
    return flag;
  };

  useEffect(() => {
    const updateDeldate = prheader.prmaterials.map((prmaterial) => ({
      ...prmaterial,
      del_date: new Date(prmaterial.del_date || ''),
    }));

    setMaterial(updateDeldate || []);
    // setData({...data, prmaterials: updateDeldate });
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
      setApprSeq(auth.user.approvers.filter((approver) => approver.type == 'pr')[0]);

      // let appr_seq = auth.user.approvers.filter((approver) => approver.type == 'pr');
      // console.log(auth.user.approvers.filter((approver) => approver.type == 'pr')[0]);
    }
  }, []);

  useEffect(() => {
    const prTotal = material.reduce((acc, mat) => acc + (mat.total_value || 0), 0);
    const m_checked = material.filter((item) => item.sel == true).map((item) => item.mat_code)[0];
    // console.log(m_checked);
    setData((prevHeader: IPRHeader) => ({ ...prevHeader, total_pr_value: prTotal , attachment: files }));
    const m_item_details = item_details.filter((item) => item.mat_code == m_checked);
    setItemDetails(m_item_details);
  }, [material, files]);

  // useEffect(() => {
  //   if (data.plant) {
  //     if (auth.user.plants) {
  //       const deliv_addr = auth.user.plants.filter((plant) => plant.plant === data.plant);
  //       const address = `${deliv_addr[0].street} ${deliv_addr[0].street2} ${deliv_addr[0].district} ${deliv_addr[0].city} ${deliv_addr[0].country_code} ${deliv_addr[0].postal_code}`;
  //       setData((prevHeader: IPRHeader) => ({ ...prevHeader, deliv_addr: address }));
  //     }
  //   }
  // }, [data.plant]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      menus={auth.menu}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Purchase Requisition</h2>}>
      <Head title="PR Create" />

      <Toaster />

      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-2">
          <div className="bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="p-5 flex flex-wrap gap-4">
                <div className="flex-auto">
                  <Label htmlFor="prnumber">PR Number</Label>
                  <Input type="text" id="prnumber" value={data.pr_number} disabled />
                </div>
                <div className="flex-auto">
                  <Label htmlFor="createdby">Created By</Label>
                  <Input type="text" id="createdby" defaultValue={data.created_name} disabled />
                </div>
                <div className="flex-auto">
                  <Label htmlFor="date">Date</Label>
                  <Input type="text" id="date" defaultValue={data.doc_date} disabled />
                </div>
                <div className="flex-auto">
                  <Label htmlFor="requested_by">Requested By</Label>
                  <Input
                    type="text"
                    id="requested_by"
                    value={data.requested_by}
                    required={true}
                    onChange={(e) => setData('requested_by', e.target.value)}
                  />
                </div>
                <div className="flex-auto">
                  <Label htmlFor="requestingPlant">Requesting Plant</Label>
                  <Select defaultValue={data.plant} onValueChange={(value) => setData('plant', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Plant" />
                    </SelectTrigger>
                    <SelectContent>
                      {auth.user.plants &&
                        auth.user.plants.map((plant) => (
                          <SelectItem value={plant.plant} key={plant.plant}>
                            {plant.plant} {plant.name1}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="p-5">
                <Tabs defaultValue="reasonForPr" className="max-w-8xl">
                  <TabsList>
                    <TabsTrigger value="reasonForPr">Reason for PR</TabsTrigger>
                    <TabsTrigger value="headerText">Header Text</TabsTrigger>
                    <TabsTrigger value="workflow">Workflow</TabsTrigger>
                    <TabsTrigger value="attachment">Attachment</TabsTrigger>
                  </TabsList>
                  <TabsContent value="reasonForPr">
                    <Textarea
                      value={data.reason_pr}
                      onChange={(e) => setData('reason_pr', e.target.value)}
                      required={true}
                    />
                  </TabsContent>
                  <TabsContent value="headerText">
                    <Textarea value={data.header_text} onChange={(e) => setData('header_text', e.target.value)} />
                  </TabsContent>
                  <TabsContent value="workflow">
                    <Table className="w-11/2 text-xs">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Position</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Approved By</TableHead>
                          <TableHead>Approved Date</TableHead>
                          <TableHead>Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prheader.workflows &&
                          prheader.workflows.map((workflow: IWorkflow) => (
                            <TableRow key={workflow.id}>
                              <TableCell>{workflow.position}</TableCell>
                              <TableCell>{workflow.status} </TableCell>
                              <TableCell> {workflow.approved_by} </TableCell>
                              <TableCell>{workflow.approved_date} </TableCell>
                              <TableCell>{workflow.message} </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  <TabsContent value="attachment">
                    <ul className="mt-3 mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 ">
                      {prheader.attachments &&
                        prheader.attachments.map((attachment) => (
                          <li key={attachment.filename} className="relative h-12 rounded-md shadow-lg p-2 bg-white">
                            {auth.permissions.pr.edit && (
                              <Link
                                preserveScroll
                                href={route('attachment.delete', attachment.id)}
                                method="delete"
                                as="button"
                                className="w-7 h-7  bg-slate-100 rounded-full flex justify-center items-center absolute top-3 right-2 hover:bg-red-200 transition-colors">
                                <XMarkIcon className="w-6 h-6  text-red-600 hover:fill-red-700 transition-colors" />
                              </Link>
                            )}
                            <p className="mt-2 text-blue-600 text-sm font-medium truncate pr-7">
                              <a href={'/' + attachment.filepath} download={true}>{attachment.filename}</a>
                            </p>
                          </li>
                        ))}
                    </ul>
                    <Dropzone files={files} setFiles={setFiles} />
                  </TabsContent>
                </Tabs>
              </div>
              <div className="p-2">
                <DataSheetGrid
                  createRow={() => ({
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
                    del_date: undefined,
                    mat_grp: undefined,
                  })}
                  value={material}
                  onChange={updateMaterial}
                  columns={columns}
                  style={customStyle}
                  // autoAddRow
                  // disableContextMenu
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
                <Tabs defaultValue="itemDetails" className="max-w-xl">
                  <TabsList>
                    <TabsTrigger value="itemDetails">Item Details</TabsTrigger>
                    {/* <TabsTrigger value="deliveryAddress">Delivery Address</TabsTrigger> */}
                    <TabsTrigger value="action">Action</TabsTrigger>
                  </TabsList>
                  <TabsContent value="itemDetails">
                    {/* <ItemDetails item_details={itemDetails} /> */}
                    <Table className="w-11/2 text-sm ml-5 border border-collapse">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Document</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Unit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="">
                        {itemDetails &&
                          itemDetails.map((item) => (
                            <TableRow key={item.doc}>
                              <TableCell>{item.doc}</TableCell>
                              <TableCell>{item.itm} </TableCell>
                              <TableCell> {item.sts} </TableCell>
                              <TableCell>{item.qty} </TableCell>
                              <TableCell>{item.unit} </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  {/* <TabsContent value="deliveryAddress">
                    <Textarea value={data.deliv_addr} onChange={(e) => setData('deliv_addr', e.target.value)} />
                  </TabsContent> */}
                  <TabsContent value="action">
                    {auth.permissions.pr.edit && (
                      <>
                        <FlagForAction
                          p_description="Are you sure you want to flag delete this item(s)?"
                          p_title="Flag for Delete"
                          p_url={route('pr.flag.delete')}
                          p_disable={
                            material.filter((mat) => mat.sel == true).length == 0 || prheader.appr_seq != SEQ_DRAFT
                          }
                          p_items={{ ids: material.filter((mat) => mat.sel == true).map((mat) => mat.id) }}
                        />

                        <FlagForAction
                          p_description="Are you sure you want to flag close this item(s)?"
                          p_title="Flag Close"
                          p_url={route('pr.flag.close')}
                          p_disable={
                            material.filter((mat) => mat.sel == true).length == 0 || prheader.appr_seq != SEQ_DRAFT
                          }
                          p_items={{ ids: material.filter((mat) => mat.sel == true).map((mat) => mat.id) }}
                        />
                      </>
                    )}
                  </TabsContent>
                </Tabs>
                <div className="p-5 justify-end grid grid-cols-8 gap-4">
                  {auth.permissions.pr.edit && (
                    <>
                      {/* <Button onClick={()=>handleCheck()} type="button" variant="outline" className="hover:border-gray-500">
                        Check
                      </Button> */}

                      <Button
                        type="submit"
                        variant="outline"
                        className="bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100"
                        disabled={prheader.appr_seq != SEQ_DRAFT || processing}>
                        Save
                      </Button>
                      <Link
                        href={route('pr.index')}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500 disabled:cursor-not-allowed disabled:opacity-100">
                        Cancel
                      </Link>
                      <Link
                        disabled={prheader.appr_seq != SEQ_DRAFT}
                        preserveScroll
                        href={route('pr.submit', prheader.id)}
                        as="button"
                        type="button"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input bg-[#f8c110] hover:bg-[#f8c110] hover:text-accent-foreground hover:border-gray-500
                        disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100 ">
                        Submit
                      </Link>

                      <Discard
                        p_id={prheader.id}
                        p_disable={prheader.appr_seq != SEQ_DRAFT}
                        p_title="Discard this Purchase Requisition ?"
                        p_url="pr.discard"
                      />

                      <Link
                        disabled={prheader.status == STATUS_APPROVED}
                        preserveScroll
                        href={route('pr.recall', prheader.id)}
                        as="button"
                        type="button"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500 disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100">
                        Recall
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </form>
            {auth.permissions.pr.approver && (
              <div className="px-5 pb-5">
                <Approval
                  p_pr_number={data.pr_number}
                  p_type="approved"
                  p_title="approve"
                  p_disable={
                    prheader.status == STATUS_APPROVED ||
                    prheader.status == STATUS_REWORK ||
                    prheader.status == STATUS_REJECTED ||
                    apprSeq?.seq != prheader.appr_seq
                      ? true
                      : false
                  }
                />
                <Approval
                  p_pr_number={data.pr_number}
                  p_type="rework"
                  p_title="rework"
                  p_disable={
                    prheader.status == STATUS_APPROVED ||
                    prheader.status == STATUS_REWORK ||
                    prheader.status == STATUS_REJECTED ||
                    apprSeq?.seq != prheader.appr_seq
                      ? true
                      : false
                  }
                />
                <Approval
                  p_pr_number={data.pr_number}
                  p_type="rejected"
                  p_title="reject"
                  p_disable={
                    prheader.status == STATUS_APPROVED ||
                    prheader.status == STATUS_REWORK ||
                    prheader.status == STATUS_REJECTED ||
                    apprSeq?.seq != prheader.appr_seq
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
