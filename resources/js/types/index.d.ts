export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  password?: string;
  position: string;
  plants?: IPlants[];
  approvers?: IApprover[];
  roles?: IRoles[];
  prCtrlGrps?: IPrCtrlGrp[];
  delivery_addresses?: IDeliveryAddress[];
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  plants: { name1: string; plant: string }[];
  approvers: IApprover[];
  roles: string[];
  permissions: string[];
}

export interface Crud {
  create: boolean;
  read: boolean;
  edit: boolean;
  delete: boolean;
  approver: boolean;
  cancel: boolean;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: AuthUser;
    menu: any;
  };
  vendorsChoice?: Choice[];
};

export interface IPlants {
  id: number;
  plant: string;
  name1: string;
  lot_no: string;
  street: string;
  street2: string;
  district: string;
  postal_code: number;
  city: string;
  country_code: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
}

export interface IApprover {
  id?: number;
  type: string;
  typeChoice?: Choice;
  plant: string;
  plantChoice?: Choice;
  user_id: number;
  user_idChoice?: Choice;
  position: string;
  amount_from: number;
  amount_to: number;
  seq: number;
  desc: string;
  prctrl_grp_id: number;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  plants?: IPlants;
  user?: User;
  prCtrlGrps?: IPrCtrlGrp;
  prCtrlGrpsChoice?: Choice;
  _method?: string;
}

export interface IMaterial {
  id?: number;
  mat_code: string;
  mat_desc: string;
  mat_grp_code: string;
  mat_type: string;
  min_rem_shelf_life: number;
  old_mat_code: string;
  order_uom: string;
  base_uom: string;
  total_shelf_life: number;
  updated_at?: string;
  updated_by?: User;
  created_at?: string;
  created_by?: User;
  valuations?: IMaterialValuation;
  materialGroups?: IMaterialGroups;
  altUoms?: IAlternativeUom[];
  _method?: string;
  mat_groupChoice?: Choice;
  mappedPlants?: any[]; // This can be an array of strings or objects depending on your use case
}

export interface IMaterialGroups {
  id: number;
  mat_grp_code: string;
  mat_grp_desc: string;
  mat_grp_desc2: string;
}

export interface IMaterialValuation {
  id?: number;
  mat_code: string;
  mat_codeChoice?: Choice;
  plant: string;
  plantChoice?: Choice;
  currency: string;
  valuation_price: number;
  per_unit: number;
  valid_from: string;
  valid_to: string;
  updated_at?: string;
  updated_by?: string;
  created_at?: string;
  created_by?: string;
  plants?: IPlants;
  material?: IMaterial;
  _method?: string;
}

export interface IPagination {
  links: {
    first: string | undefined;
    last: string | undefined;
    prev: string | undefined;
    next: string | undefined;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: ILink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface IPRHeaderPage extends IPagination {
  data: IPRHeader[];
}

export interface IPOHeaderPage extends IPagination {
  data: IPOHeader[];
}

export interface IGRHeaderPage extends IPagination {
  data: IGRHeader[];
}

export interface IMaterialNetPricePage extends IPagination {
  data: IMaterialNetPrice[];
}

export interface IMaterialValuationPage extends IPagination {
  data: IMaterialValuation[];
}

export interface IVendorPage extends IPagination {
  data: IVendor[];
}

export interface IPurchasingGroupPage extends IPagination {
  data: IPurchasingGroup[];
}

export interface IPrCtrlGrpPage extends IPagination {
  data: IPrCtrlGrp[];
}

export interface IApproverPage extends IPagination {
  data: IApprover[];
}
export interface IMaterialPage extends IPagination {
  data: IMaterial[];
}

export interface IAlternativeUomPage extends IPagination {
  data: IAlternativeUom[];
}

export interface IUserPage extends IPagination {
  data: User[];
}

export interface ICHGHeaderPage extends IPagination {
  data: ICHGHeader[];
}

export interface ILink {
  url: string | undefined;
  label: string;
  active: boolean;
}

export interface IPRHeader {
  id: number;
  pr_number: string;
  created_name: string;
  doc_date: string;
  requested_by: string;
  plant: string;
  reason_pr: string;
  header_text: string;
  workflows?: IWorkflow[];
  attachment?: FileList;
  total_pr_value: number;
  deliv_addr: string;
  status: string;
  appr_seq?: number;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  plants?: IPlants;
  prmaterials: IPRMaterial[];
  attachments?: IPRAttachment[];
  prctrl_grp_id?: number;
  _method?: string;
}
export interface IPRAttachment {
  id: number;
  pr_header_id: number;
  po_header_id: number;
  filename: string;
  filepath: string;
  created_at: string;
  updated_at: string;
}
export interface IPRMaterial {
  sel?: boolean;
  id?: number;
  pr_headers_id?: number;
  status?: string;
  item_no?: number;
  mat_code?: string;
  short_text?: string;
  item_text?: string;
  qty?: number;
  ord_unit?: string;
  qty_ordered?: number;
  qty_open?: number;
  price?: number;
  valuation_price: number;
  per_unit?: number;
  unit?: string;
  total_value?: number;
  currency?: number;
  del_date?: Date;
  mat_grp?: string;
  mat_grp_desc?: string;
  purch_grp?: string;
  altUomSelect?: Array<string>;
  alt_uom?: IAlternativeUom[];
  conversion?: number;
  converted_qty?: number;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  requested_by?: string;
  prctrl_grp_id?: number;
}

export interface IMessage {
  success: string | undefined;
  error: string | undefined;
}

export interface IWorkflow {
  id: number;
  pr_number: string;
  status: string;
  approved_by: string;
  position: string;
  user_id: number;
  approved_date: string;
  seq: number;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface IPOHeader {
  id: number;
  po_number?: string;
  control_no?: string;
  vendor_id?: string;
  vendor_name?: string;
  vendors?: IVendor;
  created_name: string;
  doc_date: string;
  deliv_date: string;
  notes: string;
  plant: string;
  plants?: IPlants;
  header_text: string;
  approver_text: string;
  attachment?: FileList;
  attachments?: IPRAttachment[];
  total_po_value: number;
  status?: string;
  print_count?: number;
  appr_seq?: number;
  deliv_addr: string;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  pomaterials: IPOMaterial[];
  workflows?: IWorkflow[];
  _method?: string;
  is_mother_po: boolean;
}

export interface IPOMaterial {
  sel?: boolean;
  id?: number;
  po_header_id?: number;
  po_material_id?: number;
  pr_material_id?: number;
  status?: string;
  item_no?: number;
  mat_code?: string;
  short_text?: string;
  po_qty?: number;
  qty_open?: number;
  qty_open_po?: number;
  net_price?: number;
  per_unit?: number;
  unit?: string;
  total_value?: number;
  item_free?: boolean;
  currency?: string;
  del_date?: Date;
  mat_grp?: string;
  mat_grp_desc?: string;
  requested_by?: string;
  pr_number?: number;
  pr_item?: number;
  item_text?: string;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  min_order_qty?: number;
  conversion?: number;
  conversion_po?: number;
  converted_qty?: number;
  converted_qty_po?: number;
  purch_grp?: string;
  pr_unit?: string;
  denominator?: number;
  altUomSelect?: Array<string>;
  alt_uom?: IAlternativeUom[];
  materialNetPrices: IMaterialNetPrice[];
  qty?: number; // qty from PR
  origPOQty?: number; // qty from PO DB
}

export interface IVendor {
  id?: number;
  supplier: string;
  account_group: string;
  tax_number: string;
  tax_number_2: string;
  name_1: string;
  name_2?: string;
  name_3?: string;
  name_4?: string;
  search_term: string;
  city: string;
  country: string;
  district: string;
  postal_code: number;
  street: string;
  address: string;
  city_2: string;
  telephone_1: string;
  telephone_2: string;
  vat_reg_no: string;
  created_at?: string;
  updated_at?: string;
  _method?: string;
  email_1?: string;
  email_2?: string;
  payment_terms?: string;
}

export interface IPurchasingGroup {
  id?: number;
  mat_code: string;
  mat_codeChoice?: Choice;
  plant: string;
  plant_codeChoice: Choice;
  purch_grp: string;
  purch_grpChoice?: Choice;
  unit_issue: string;
  plan_deliv_time: string;
  gr_proc_time: string;
  min_lot_size: string;
  max_lot_size: string;
  fix_lot_size: string;
  rounding_value: string;
  created_by?: User;
  updated_by?: User;
  created_at?: string;
  updated_at?: string;
  prctrl_grp_id: number; 
  plants?: IPlants;
  materials?: IMaterial;
   _method?: string;
}

export interface IGRHeader {
  id: number;
  gr_number?: number;
  po_number?: number;
  control_no?: string;
  created_name: string;
  vendor_id?: string;
  vendor_name?: string;
  vendors?: IVendor;
  plant: string;
  plants?: IPlants;
  entry_date: string;
  posting_date: string;
  actual_date: string;
  delivery_note: string;
  header_text: string;
  is_cancel: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  grmaterials: IGRMaterials[];
  _method?: string;
}

export interface IGRMaterials {
  id?: number;
  gr_header_id?: number;
  po_material_id?: number;
  item_no?: number;
  mat_code?: string;
  short_text?: string;
  item_text?: string;
  po_gr_qty?: number;
  gr_qty?: number;
  unit?: string;
  po_deliv_date?: Date;
  batch?: string;
  mfg_date?: Date;
  sled_bbd?: Date;
  po_number?: string;
  po_item?: number;
  dci?: boolean;
  is_cancel?: boolean;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IMaterialNetPrice {
  id?: number;
  vendor: string;
  vendorChoice?: Choice;
  plant: string;
  plantChoice?: Choice;
  mat_code: string;
  mat_codeChoice?: Choice;
  currency: string;
  price: number;
  per_unit: number;
  uom: string;
  uomChoice?: Choice;
  valid_from: string;
  valid_to: string;
  min_order_qty: number;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  materials?: IMaterial;
  plants?: IPlants;
  vendors?: IVendor;
  materialUoms?: IAlternativeUom[];
  _method?: string;
}

export interface IAlternativeUom {
  id?: number;
  mat_code: string;
  mat_codeChoice?: Choice;
  material?: IMaterial;
  alt_uom: string;
  alt_uomChoice?: Choice;
  altUomText?: IUom;
  counter: number;
  denominator: number;
  ean_num: string;
  ean_upc: string;
  ean_category: string;
  unit_of_weight: string;
  unit_of_weightChoice?: Choice;
  unitOfWeightText?: IUom;
  created_by?: User;
  updated_by?: User;
  created_at?: string;
  updated_at?: string;
  _method?: string;
}

export type Choice = {
  label: string;
  value: string | number;
};

export interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface GenericSelectProps<T> {
  label?: string;
  items: T[] | undefined;
  valueKey: keyof T;
  displayKey: keyof T;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  displayValue?: boolean;
  required?: boolean;
}

export interface TabItem {
  value: string;
  label: string;
  visible: boolean;
  content: React.ReactNode;
  tabIcon?: React.ReactNode;
}

export interface TabsProps {
  defaultValue: string;
  tabs: TabItem[];
  className?: string;
}

export interface IitemDetails {
  id: number;
  pr_number: number;
  mat_code: string;
  doc: string;
  qty: number;
  unit: string;
  sts: string;
  itm: string;
}

export interface IUom {
  id: number;
  uom: string;
  uom_text: string;
  created_by?: User;
  updated_by?: User;
  created_at?: string;
  update_at?: string;
}

export interface IRoles {
  id: number;
  name: string;
  namespace: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface IPrCtrlGrp {
  id: number;
  plant_id: number;
  prctrl_grp: string;
  prctrl_desc: string;
  created_by: number;
  updated_by: number;
  plant : string;
}

export interface IDeliveryAddress {
  id: number;
  plant: string;
  address: string;
  is_active: boolean;
  created_by: number;
  updated_by: number;
  created_at: number;
  updated_at: number;
}

export interface IProcurementGroup {
  purch_grp: string;
  name1: string;
}

export interface ICHGHeader {
  data_chgno: number;
  chgtyp_label: string;
  data_refno: number;
  user_id: number;
  timestamp: number;
  data_chgtyp: string;
  chg_details: ICHGDetails[];
  user?: User;
}

export interface ICHGDetails {
  id: number;
  data_type: string;
  data_refno: number;
  data_table: string;
  data_field: string;
  data_chgno: number;
  data_chgtyp: string;
  data_oldvalue: string;
  data_newvalue: string;
  short_text: string;
}
