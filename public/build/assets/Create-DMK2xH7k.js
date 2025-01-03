import{r as d,W as F,j as e,Y as R,a as B}from"./app-9BfIP8Yt.js";import{A as I}from"./AuthenticatedLayout-DNrtgEyS.js";import"./tabs-CSAEFCKf.js";import{B as K}from"./button-UluEiDe7.js";import{T as y}from"./textarea-WPr4wz2o.js";import{L as U,I as H}from"./input-B6LatCgn.js";import{u as L,T as Y}from"./toaster-C-nH-nj2.js";import"./select-BlE8HqPq.js";import{I as m}from"./InputField-BbCt2qk6.js";import{D as G,C as Q}from"./constants-Co51-129.js";import{d as t}from"./index-f1KWvzcE.js";/* empty css              */import{S as h,D as z,T as J}from"./TabFields-CC_gKAQi.js";import{f as X}from"./utils-BSdE8tDE.js";import{u as Z,V as $,R as ee}from"./usePOMaterialValidation-CjORHRXk.js";import{A as te,u as ae}from"./AddPrtoPo-BTcz5ecg.js";import"./ApplicationLogo-BHU32V6c.js";import"./transition-6Z6DAD7I.js";import"./toast-SiKyGAR4.js";import"./index-CzvjeGZW.js";import"./useStateManager-7e1e8489.esm-9tTtCMRh.js";import"./react-select.esm-R1G1BB6e.js";const Te=({auth:i,vendors:b,deliveryAddress:C,supplierNotes:g})=>{var f;const{toast:j}=L(),[p,k]=d.useState([]),[s,u]=d.useState([]),[N,T]=d.useState(),{computeConversion:_,updateMaterialPO:W,getVendorInfo:V}=ae(),{validateMaterials:O}=Z(),{data:n,setData:o,post:S,errors:v,reset:le,processing:P}=F({id:0,po_number:void 0,control_no:void 0,vendor_id:void 0,vendor_name:"",created_name:i.user.name,doc_date:G,deliv_date:"",notes:"",plant:i.user.plants!==void 0?(f=i.user.plants[0])==null?void 0:f.plant:"",header_text:"",approver_text:"",attachment:void 0,total_po_value:0,status:"",appr_seq:0,deliv_addr:"",pomaterials:[]}),D=d.useMemo(()=>[{...t.keyColumn("sel",t.checkboxColumn),title:"Sel",minWidth:30},{...t.keyColumn("status",t.textColumn),title:"Sts",minWidth:35,disabled:!0},{...t.keyColumn("item_no",t.intColumn),title:"ItmNo",minWidth:55,disabled:!0},{...t.keyColumn("mat_code",t.textColumn),title:"Material",minWidth:120,disabled:!0},{...t.keyColumn("short_text",t.textColumn),title:"Short Text",minWidth:300,disabled:!0},{...t.keyColumn("item_text",t.textColumn),title:"Item Text",minWidth:300},{...t.keyColumn("po_qty",t.floatColumn),title:"PO Qty",minWidth:70},{...t.keyColumn("qty_open_po",t.floatColumn),title:"Open Qty",minWidth:100,disabled:!0},{...t.keyColumn("altUomSelect",{component:({rowData:a,rowIndex:l})=>a&&e.jsx("select",{className:"border-none w-full shadow-none bg-none px-1 py-0 active:border-none hover:border-none",onChange:r=>{u(x=>{const c=[...x];return c[l]={...c[l],..._(c[l],r.target.value)},c})},children:a.map((r,x)=>e.jsx("option",{value:r,children:r},x))})}),title:"Alt UOM"},{...t.keyColumn("unit",t.textColumn),title:"Ord. UOM",minWidth:55,disabled:!0},{...t.keyColumn("pr_unit",t.textColumn),title:"B. UOM",minWidth:55,disabled:!0},{...t.keyColumn("net_price",t.floatColumn),title:"Net Price",minWidth:80,disabled:({rowData:a})=>!!a.item_free},{...t.keyColumn("per_unit",t.intColumn),title:"Per Unit",minWidth:50,disabled:({rowData:a})=>!!a.item_free},{...t.keyColumn("total_value",t.intColumn),title:"Total Value",minWidth:120,disabled:!0},{...t.keyColumn("item_free",t.checkboxColumn),title:"Free",minWidth:70},{...t.keyColumn("currency",t.textColumn),title:"Curr",minWidth:55,disabled:!0},{...t.keyColumn("del_date",t.dateColumn),title:"Del Date",minWidth:120},{...t.keyColumn("mat_grp_desc",t.textColumn),title:"Mat Grp",minWidth:200,disabled:!0},{...t.keyColumn("requested_by",t.textColumn),title:"Requested By",minWidth:150},{...t.keyColumn("pr_number",t.textColumn),title:"PR Number",minWidth:120,disabled:!0}],[]),M=[{value:"header_text",label:"Header Text",visible:!0,content:e.jsx(y,{value:n.header_text,onChange:a=>o("header_text",a.target.value)})},{value:"approver_text",label:"Remarks",visible:!0,content:e.jsx(y,{value:n.header_text,onChange:a=>o("header_text",a.target.value)})},{value:"notes",label:"Notes",visible:!0,content:e.jsx(h,{items:g,valueKey:"value",displayKey:"label",onValueChange:a=>o("notes",a),value:n.notes})},{value:"deliveryAddress",label:"Delivery Address",visible:!0,content:e.jsx(h,{items:C,valueKey:"value",displayKey:"label",onValueChange:a=>o("deliv_addr",a),value:n.deliv_addr})},{value:"attachment",label:"Attachment",visible:!0,content:e.jsx(z,{files:p,setFiles:k})},{value:"vendor",label:"Vendor Info",visible:!0,content:e.jsx($,{vendor:N})}],A=a=>{u([...s,...a])},w=(a,l)=>{const r=W(a,l);u(r)};d.useEffect(()=>{const a=s.reduce((l,r)=>l+(r.total_value||0),0);o(l=>({...l,total_po_value:a,attachment:p,pomaterials:s}))},[s,p]),d.useEffect(()=>{v.hasOwnProperty("error")&&j({variant:"destructive",description:v.error})},[v]),d.useEffect(()=>{n.vendor_id&&s.length>0&&u(a=>a.map(l=>({...l,..._(l,l.unit??"",n.vendor_id)})))},[n.vendor_id]);const E=async a=>{const l=await V(a);T(l)},q=async a=>{a.preventDefault();const{isValid:l,updatedMaterials:r}=O(s);u(r),l&&S(route("po.store"))};return e.jsxs(I,{user:i.user,menus:i.menu,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Create Purchase Order"}),children:[e.jsx(R,{title:"Create PO "}),e.jsx(Y,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsx("div",{className:"bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("form",{onSubmit:q,children:[e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsx(m,{label:"PO Number",id:"prnumber",disabled:!0}),e.jsx(m,{label:"Control No.",id:"control_no",defaultValue:n.control_no,onChange:a=>o("control_no",a.target.value),type:"number"}),e.jsx(m,{label:"Created By",id:"created_by",defaultValue:n.created_name,disabled:!0}),e.jsx(m,{label:"Doc Date By",id:"doc_date",defaultValue:n.doc_date,disabled:!0}),e.jsx(m,{label:"Delivery Date",id:"deliv_date",defaultValue:n.deliv_date,onChange:a=>o("deliv_date",a.target.value),required:!0,type:"date",className:"w-40"}),e.jsx(h,{label:"Requesting Plant",items:i.user.plants,valueKey:"plant",displayKey:"name1",onValueChange:a=>o("plant",a),value:n.plant}),e.jsx(ee,{label:"Vendor",value:b.find(({value:a})=>a===n.vendor_id)??null,options:b,required:!0,className:"flex-none w-96",onChange:({value:a,label:l})=>{o({...n,vendor_id:a,vendor_name:l}),E(a)}})]}),e.jsx("div",{className:"p-1 pt-0",children:e.jsx(J,{defaultValue:"header_text",className:"max-w-8xl",tabs:M})}),e.jsx("div",{className:"p-2",children:e.jsx(t.DataSheetGrid,{value:s,onChange:w,columns:D,style:Q,disableExpandSelection:!0,rowHeight:30,className:"text-sm"})}),e.jsxs("div",{className:"p-1 flex gap-2 justify-end content-center",children:[e.jsx("div",{className:"p-",children:e.jsx(U,{htmlFor:"total",children:"Total PO Value: "})}),e.jsx("div",{children:e.jsx(H,{type:"text",value:X(n.total_po_value),readOnly:!0,disabled:!0})})]}),e.jsx("div",{className:"p-2 pt-0",children:e.jsx("div",{className:"p-5 justify-end grid grid-cols-8 gap-4",children:i.permissions.po.create&&e.jsxs(e.Fragment,{children:[e.jsx(K,{variant:"outline",disabled:P,className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110]",children:"Save"}),e.jsx(B,{href:route("po.index"),className:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500",children:"Cancel"}),e.jsx(te,{p_vendor:n.vendor_id,p_plant:n.plant,p_doc_date:n.doc_date,addToPO:A})]})})})]})})})})]})};export{Te as default};
