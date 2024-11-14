import{r as f,W as J,j as e,Y as K,a as X}from"./app-DDEFgIQ0.js";import{A as Z}from"./AuthenticatedLayout-CAhfjy0K.js";import{T as E,a as R,b as x,c as h}from"./tabs-Ds5wNEnO.js";import{B as ee}from"./button-BwX_C8iK.js";import{T}from"./textarea-CaFSZuMs.js";import{L as p,I as j}from"./input-E2GEvTx_.js";import{S as k,a as w,b as S,c as q,d as P}from"./select-BGyJcZEt.js";import{S as te}from"./react-select.esm-BXpW4rXw.js";/* empty css              */import re from"./AddPrtoPo-BOXOyVfU.js";import{N as ae,D as ne,T as le,a as ie,b as V,c as d}from"./constants-DVtwkinr.js";import{D as se}from"./Dropzone-ScOuBj5j.js";import{d as r}from"./index-Dgu5UXxG.js";import{u as oe,T as de}from"./toaster-ZLvP_WFp.js";import{f as ce}from"./utils-BuC82Owh.js";import{C as me,a as ue}from"./card-DF_6yJpf.js";import"./ApplicationLogo-WA2idasH.js";import"./transition-Bb5EmCqw.js";import"./x-CpBu2b5F.js";import"./index-Frm3adN9.js";import"./index-ByOl0Zen.js";import"./Combination-D0O_qMDO.js";import"./useStateManager-7e1e8489.esm-CcX6sTzc.js";const Re=({auth:u,vendors:b})=>{var W;const F=new Date().toLocaleDateString(),{toast:v}=oe(),[y,O]=f.useState([]),[n,g]=f.useState([]),[s,C]=f.useState(),{data:o,setData:c,post:M,errors:N,reset:xe,processing:$}=J({id:0,po_number:void 0,control_no:void 0,vendor_id:void 0,vendor_name:"",created_name:u.user.name,doc_date:F,deliv_date:void 0,notes:"",plant:u.user.plants!==void 0?(W=u.user.plants[0])==null?void 0:W.plant:"",header_text:"",approver_text:"",attachment:void 0,total_po_value:0,status:"",appr_seq:0,deliv_addr:"",pomaterials:[]}),B=[{...r.keyColumn("sel",r.checkboxColumn),title:"Sel",minWidth:30},{...r.keyColumn("status",r.textColumn),title:"Sts",minWidth:35,disabled:!0},{...r.keyColumn("item_no",r.intColumn),title:"ItmNo",minWidth:55,disabled:!0},{...r.keyColumn("mat_code",r.textColumn),title:"Material",minWidth:120,disabled:!0},{...r.keyColumn("short_text",r.textColumn),title:"Short Text",minWidth:300,disabled:!0},{...r.keyColumn("po_qty",r.floatColumn),title:"PO Qty",minWidth:70},{...r.keyColumn("qty_open",r.floatColumn),title:"Open Qty",minWidth:100,disabled:!0},{...r.keyColumn("unit",r.textColumn),title:"Unit",minWidth:55},{...r.keyColumn("net_price",r.floatColumn),title:"Net Price",minWidth:80,disabled:({rowData:t})=>!!t.item_free},{...r.keyColumn("per_unit",r.intColumn),title:"Per Unit",minWidth:50,disabled:({rowData:t})=>!!t.item_free},{...r.keyColumn("total_value",r.intColumn),title:"Total Value",minWidth:120,disabled:!0},{...r.keyColumn("item_free",r.checkboxColumn),title:"Free",minWidth:70},{...r.keyColumn("currency",r.textColumn),title:"Curr",minWidth:55,disabled:!0},{...r.keyColumn("del_date",r.dateColumn),title:"Del Date",minWidth:120},{...r.keyColumn("mat_grp",r.textColumn),title:"Mat Grp",minWidth:200,disabled:!0},{...r.keyColumn("requested_by",r.textColumn),title:"Requested By",minWidth:150},{...r.keyColumn("pr_number",r.textColumn),title:"PR Number",minWidth:120,disabled:!0},{...r.keyColumn("pr_item",r.textColumn),title:"PRItm",minWidth:70,disabled:!0},{...r.keyColumn("item_text",r.textColumn),title:"Item Text",minWidth:300}],L={"--dsg-header-text-color":"rgb(10, 10, 10)","--dsg-cell-disabled-background-color":"rgb(245, 245, 245)","--dsg-border-color":"#bfbdbd"},H=t=>{g([...n,...t])},U=(t,l)=>{const m=[...t];console.log("updatedMaterial",m);for(const _ of l)if(_.type==="UPDATE"){const a=m[_.fromRowIndex];a.net_price=a.item_free?0:a.net_price,a.item_no=(_.fromRowIndex+1)*10,a.po_qty=a.po_qty<a.min_order_qty?a.min_order_qty:a.po_qty,a.po_qty=a.po_qty>a.qty_open?a.qty_open:a.po_qty,a.converted_qty=a.po_qty*(a.conversion/a.denominator),a.total_value=(a.net_price??0)/(a.per_unit??0)*(a.po_qty??0)}g(m),c({...o,pomaterials:m})};f.useEffect(()=>{const t=n.reduce((l,m)=>l+(m.total_value||0),0);c(l=>({...l,total_po_value:t,attachment:y}))},[n,y]),f.useEffect(()=>{N.hasOwnProperty("error")&&v({variant:"destructive",description:N.error})},[N]);const z=async t=>{try{C(void 0);const l=await window.axios.get(route("po.vendor",t));C(l.data.data)}catch(l){C(void 0),console.log("Error fetching vendor info: ",l)}},G=()=>{var _,a,D,I,A;const t=new Date;let l=!0;const m=n.filter(i=>i.mat_code!==void 0).map((i,Y)=>({...i,item_no:(Y+1)*10}));if(g(m),console.log("item",m),m.length<=0)return v({variant:"destructive",description:"Please add atleast 1 item"}),!1;for(let i=0;i<n.length;i++)if(n[i].mat_code!==void 0&&n[i].mat_code!==""){if(n[i].po_qty===void 0||((_=n[i])==null?void 0:_.po_qty)<=0){v({variant:"destructive",description:`Please enter quantity for item no ${n[i].item_no}`}),l=!1;break}if(n[i].unit===void 0||((a=n[i])==null?void 0:a.unit)===null){v({variant:"destructive",description:`Please enter order unit for item no ${n[i].item_no}`}),l=!1;break}if(n[i].net_price===void 0||((D=n[i])==null?void 0:D.net_price)===null){v({variant:"destructive",description:`Please enter Net Price for item no ${n[i].item_no}`}),l=!1;break}if(n[i].del_date===void 0||((I=n[i])==null?void 0:I.del_date)===null){v({variant:"destructive",description:`Please enter delivery date for item no ${n[i].item_no}`}),l=!1;break}else if(((A=n[i].del_date)==null?void 0:A.getTime())<=t.getTime()){v({variant:"destructive",description:`Please enter delivery date greater than today for item no ${n[i].item_no}`}),l=!1;break}}return l},Q=async t=>{t.preventDefault(),G()&&(console.log(o),M(route("po.store")))};return e.jsxs(Z,{user:u.user,menus:u.menu,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Create Purchase Order"}),children:[e.jsx(K,{title:"PO Create"}),e.jsx(de,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsx("div",{className:"bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("form",{onSubmit:Q,children:[e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(p,{htmlFor:"prnumber",children:"PO Number"}),e.jsx(j,{type:"text",id:"prnumber",defaultValue:o.po_number,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(p,{htmlFor:"control_no",children:"Control No."}),e.jsx(j,{type:"number",id:"control_no",defaultValue:o.control_no,onChange:t=>c("control_no",t.target.value)})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(p,{htmlFor:"created_by",children:"Created By"}),e.jsx(j,{type:"text",id:"control_no",defaultValue:o.created_name,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(p,{htmlFor:"date",children:"Doc Date"}),e.jsx(j,{type:"text",id:"date",defaultValue:o.doc_date,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(p,{htmlFor:"date",children:"Delivery Date"}),e.jsx(j,{type:"date",id:"deliv_date",defaultValue:o.deliv_date,onChange:t=>c("deliv_date",t.target.value),required:!0})]}),e.jsxs("div",{className:"flex-none w-96",children:[e.jsx(p,{children:"Vendor"}),e.jsx(te,{required:!0,value:(b==null?void 0:b.find(({value:t})=>t===o.vendor_id))??null,options:b,onChange:({value:t,label:l})=>{c({...o,vendor_id:t,vendor_name:l}),z(t)},styles:{control:(t,l)=>({...t,minHeight:"1.75rem",height:"1.75rem",fontSize:"0.875rem",borderColor:"hsl(var(--input))"}),valueContainer:(t,l)=>({...t,height:"1.75rem",padding:"0 6px"}),input:(t,l)=>({...t,margin:"0px"}),indicatorSeparator:t=>({display:"none"}),indicatorsContainer:(t,l)=>({...t,height:"1.75rem"})}})]}),e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(p,{htmlFor:"requestingPlant",children:"Requesting Plant"}),e.jsxs(k,{defaultValue:o.plant,onValueChange:t=>c("plant",t),children:[e.jsx(w,{children:e.jsx(S,{placeholder:"Plant"})}),e.jsx(q,{children:u.user.plants&&u.user.plants.map(t=>e.jsxs(P,{value:t.plant,children:[t.plant," ",t.name1]},t.plant))})]})]})]}),e.jsx("div",{className:"p-1 pt-0",children:e.jsxs(E,{defaultValue:"header_text",className:"max-w-8xl",children:[e.jsxs(R,{children:[e.jsx(x,{value:"header_text",children:"Header Text"}),e.jsx(x,{value:"approver_text",children:"Remarks"}),e.jsx(x,{value:"notes",children:"Notes"}),e.jsx(x,{value:"deliveryAddress",children:"Delivery Address"}),e.jsx(x,{value:"workflow",children:"Workflow"}),e.jsx(x,{value:"attachment",children:"Attachment"}),e.jsx(x,{value:"vendor",children:"Vendor Info"})]}),e.jsx(h,{value:"header_text",children:e.jsx(T,{value:o.header_text,onChange:t=>c("header_text",t.target.value)})}),e.jsx(h,{value:"notes",children:e.jsxs(k,{defaultValue:o.notes,onValueChange:t=>c("notes",t),children:[e.jsx(w,{children:e.jsx(S,{placeholder:"Notes"})}),e.jsx(q,{children:ae.map(t=>e.jsx(P,{value:t,children:t},t))})]})}),e.jsx(h,{value:"deliveryAddress",children:e.jsxs(k,{defaultValue:o.deliv_addr,onValueChange:t=>c("deliv_addr",t),children:[e.jsx(w,{children:e.jsx(S,{placeholder:"Address"})}),e.jsx(q,{children:ne.map(t=>e.jsx(P,{value:t,children:t},t))})]})}),e.jsx(h,{value:"approver_text",children:e.jsx(T,{value:o.approver_text,onChange:t=>c("approver_text",t.target.value)})}),e.jsx(h,{value:"workflow"}),e.jsx(h,{value:"attachment",children:e.jsx(se,{files:y,setFiles:O})}),e.jsx(h,{value:"vendor",children:e.jsx(me,{children:e.jsx(ue,{children:s&&e.jsx("div",{children:e.jsx(le,{className:"w-11/2 text-sm",children:e.jsxs(ie,{children:[e.jsxs(V,{className:"border-none h-",children:[e.jsx(d,{children:e.jsx("b",{children:"Account group: "})}),e.jsx(d,{children:s.account_group}),e.jsx(d,{children:e.jsx("b",{children:"Name : "})}),e.jsxs(d,{children:[" ",s.name_1," ",s.name_2," ",s.name_3," ",s.name_4]}),e.jsx(d,{children:e.jsx("b",{children:"Supplier : "})}),e.jsx(d,{children:s.supplier})]},s.id),e.jsxs(V,{className:"border-none",children:[e.jsx(d,{children:e.jsx("b",{children:"Address : "})}),e.jsxs(d,{children:[s.street," ",s.district," ",s.city," ",s.postal_code," ",s.country]}),e.jsx(d,{children:e.jsx("b",{children:"Tax Number : "})}),e.jsxs(d,{children:[s.tax_number," ",s.tax_number_2]})]},s.id),e.jsxs(V,{className:"border-none",children:[e.jsx(d,{children:e.jsx("b",{children:"Telephone 1 : "})}),e.jsx(d,{children:s.telephone_1}),e.jsx(d,{children:e.jsx("b",{children:"Telephone 2 : "})}),e.jsx(d,{children:s.telephone_2})]},s.id)]})})})})})})]})}),e.jsx("div",{className:"p-2",children:e.jsx(r.DataSheetGrid,{value:n,onChange:U,columns:B,style:L,disableExpandSelection:!0,rowHeight:30,className:"text-sm"})}),e.jsxs("div",{className:"p-1 flex gap-2 justify-end content-center",children:[e.jsx("div",{className:"p-1",children:e.jsx(p,{htmlFor:"total",children:"Total PO Value: "})}),e.jsx("div",{children:e.jsx(j,{type:"text",value:ce(o.total_po_value),readOnly:!0,disabled:!0})})]}),e.jsxs("div",{className:"p-2 pt-0",children:[e.jsxs(E,{defaultValue:"ItemText",className:"max-w-xl",children:[e.jsx(R,{children:e.jsx(x,{value:"ItemText",children:"Item Text"})}),e.jsx(h,{value:"ItemText",children:e.jsx(T,{})})]}),e.jsx("div",{className:"p-5 justify-end grid grid-cols-8 gap-4",children:u.permissions.po.create&&e.jsxs(e.Fragment,{children:[e.jsx(ee,{variant:"outline",disabled:$,className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110]",children:"Save"}),e.jsx(X,{href:route("po.index"),className:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500",children:"Cancel"}),e.jsx(re,{p_vendor:o.vendor_id,p_plant:o.plant,p_created_name:o.created_name,p_doc_date:o.doc_date,addToPO:H})]})})]})]})})})})]})};export{Re as default};