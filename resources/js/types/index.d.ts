export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  position: string;
  plants: IPlants[] | undefined;
  approvers: IApprover[] | undefined;
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
    user: User;
    permissions: {
      pr: Crud;
      po: Crud;
      gr: Crud;
      admin: Crud;
    };
    menu: any;
  };
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
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  plants?: IPlants;
  user?: User;
  _method: string;
}
export interface IMaterial {
  base_uom: string;
  created_at: string;
  created_by: string;
  id: number;
  mat_code: string;
  mat_desc: string;
  mat_grp_code: string;
  mat_type: string;
  min_rem_shelf_life: number;
  old_mat_code: string;
  order_uom: string;
  total_shelf_life: number;
  updated_at: string;
  updated_by: string;
  valuations: IMaterialValuation;
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

export interface IApproverPage extends IPagination {
  data: IApprover[];
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
  qty?: number;
  ord_unit?: string;
  qty_ordered?: number;
  qty_open?: number;
  price?: number;
  per_unit?: number;
  unit?: string;
  total_value?: number;
  currency?: number;
  del_date?: Date;
  mat_grp?: string;
  purch_grp?: string;
  altUom?: Array<string>;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  requested_by?: string;
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
  po_number?: number;
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
  appr_seq?: number;
  deliv_addr: string;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  pomaterials: IPOMaterial[];
  workflows?: IWorkflow[];
  _method?: string;
}

export interface IPOMaterial {
  sel?: boolean;
  id?: number;
  po_header_id?: number;
  po_material_id?: number;
  pr_material_id?:number;
  status?: string;
  item_no?: number;
  mat_code?: string;
  short_text?: string;
  po_qty?: number;
  qty_open?: number;
  net_price?: number;
  per_unit?: number;
  unit?: string;
  total_value?: number;
  item_free?: boolean;
  currency?: string;
  del_date?: Date;
  mat_grp?: string;
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
  converted_qty?: number;
  purch_grp?: string;
  pr_unit?: string;
  denominator?: number;
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
  id: number;
  mat_code: string;
  alt_uom: string;
  counter: number;
  denominator: number;
  ean_num: string;
  ean_upc: string;
  ean_category: string;
  unit_of_weight: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export type Choice = {
  label: string;
  value: string;
};
