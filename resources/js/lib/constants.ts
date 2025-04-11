import { CSSObjectWithLabel } from 'react-select';

export const SEQ_DRAFT = 0;
export const SEQ_REJECT = -1;

export const STATUS_APPROVED = 'Approved';
export const STATUS_REWORK = 'Rework';
export const STATUS_REJECTED = 'Rejected';

export const DATE_TODAY = new Date().toISOString().slice(0, 10); //.toLocaleDateString('en-US');

export const DEFAULT_PR_MATERIAL = {
  sel: false,
  item_no: undefined,
  status: undefined,
  mat_code: undefined,
  short_text: undefined,
  item_text: undefined,
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
  prctrl_grp: undefined,
};

export const DEFAULT_GR_MATERIAL = {
  id: undefined,
  gr_header_id: undefined,
  po_material_id: undefined,
  item_no: undefined,
  mat_code: undefined,
  short_text: undefined,
  item_text: undefined,
  po_gr_qty: undefined,
  gr_qty: undefined,
  unit: undefined,
  po_deliv_date: undefined,
  batch: undefined,
  mfg_date: undefined,
  sled_bbd: undefined,
  po_number: undefined,
  po_item: undefined,
  dci: undefined,
};

// Custom style for react select for index
export const REACT_SELECT_STYLES = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    minHeight: '1.75rem',
    height: '1.75rem',
    fontSize: '0.875rem',
  }),

  valueContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: '1.75rem',
    padding: '0 6px',
    textTransform: 'capitalize',
  }),

  input: (provided: CSSObjectWithLabel) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: '1.75rem',
  }),
};

// Custom style for react select for PO
export const REACT_SELECT_STYLE = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    minHeight: '1.75rem',
    height: '1.75rem',
    fontSize: '0.875rem',
    borderColor: 'hsl(var(--input))',
  }),
  valueContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: '1.75rem',
    padding: '0 6px',
  }),
  input: (provided: CSSObjectWithLabel) => ({
    ...provided,
    margin: '0px',
    opacity: '100%',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: '1.75rem',
  }),
};

// custom style for Data Sheet Grid
export const CUSTOM_DATA_SHEET_STYLE = {
  '--dsg-header-text-color': 'rgb(10, 10, 10)',
  '--dsg-cell-disabled-background-color': 'rgb(245, 245, 245)',
  '--dsg-border-color': '#bfbdbd',
};

// export const NOTES = [
//   'NOTE: PLEASE PROVIDE COA/COI/LOG WITH MICROBIOLOGY & PHYSICO-CHEM ANALYSIS IN EVERY DELIVERY.  FOR MEAT PRODUCTS, PLEASE ALSO PROVIDE MEAT INSPECTION CERTIFICATE. *** PLEASE PROVIDE COPY OF PO REFERENCE/S DURING DELIVERIES',
//   '*** PLEASE PROVIDE COPY OF PO REFERENCE/S DURING DELIVERIES. FOR SERVICES, PLEASE PROVIDE SERVICE REPORT AFTER THE SERVICE.',
// ];

// export const DELIVERY_ADDRESS = [
//   'BLOCK 6 LOT 8, PSD II, DIVERSION ROAD, BUHANGIN, DAVAO CITY',
//   'DOOR 2 PLUG HOLDING BLDG, DIHO ROAD CABANTIAN, DAVAO CITY',
//   '#76 ANACONDA COMPOUND F. MARIANO AVE., DELA PAZ, PASIG CITY',
// ];

export enum PermissionsEnum {
  CreatePR = 'create.pr',
  EditPR = 'edit.pr',
  UpdatePR = 'update.pr',
  DeletePR = 'delete.pr',
  ReadPR = 'read.pr',
  ApproverPR = 'approver.pr',
  CreatePO = 'create.po',
  EditPO = 'edit.po',
  UpdatePO = 'update.po',
  DeletePO = 'delete.po',
  ReadPO = 'read.po',
  ApproverPO = 'approver.po',
  CreateGR = 'create.gr',
  EditGR = 'edit.gr',
  UpdateGR = 'update.gr',
  DeleteGR = 'delete.gr',
  ReadGR = 'read.gr',
  ApproverGR = 'approver.gr',
  CancelGR = 'cancel.gr',
  Admin = 'admin',
}
