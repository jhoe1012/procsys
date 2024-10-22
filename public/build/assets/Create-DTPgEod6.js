import{r as b,W as Y,j as e,Y as J,a as K}from"./app-f9e4wKpH.js";import{A as X}from"./AuthenticatedLayout-C7x3n-mw.js";import{T as A,a as E,b as x,c as h}from"./tabs-B2b0Jvv6.js";import{B as Z}from"./button-DX6JiMpx.js";import{T as C}from"./textarea-Pla2gzjr.js";import{L as p,I as j}from"./input-oaH899Yu.js";import{S as N,a as T,b as k,c as w,d as S}from"./select-ifMj3xKk.js";import{S as ee}from"./react-select.esm-CZxcBHQV.js";/* empty css              */import te from"./AddPrtoPo-GuBuW1Y2.js";import{N as re,D as ne,T as ae,a as le,b as q,c as d}from"./constants-DroAfbwh.js";import{D as ie}from"./Dropzone-84bgJEQb.js";import{d as r}from"./index-Mi72Froj.js";import{u as oe,T as se}from"./toaster-Ch6bswXN.js";import{f as de}from"./utils-BnvPr2De.js";import{C as ce,a as me}from"./card-DEJbkzcz.js";import"./ApplicationLogo-pa34QAzP.js";import"./transition-BkiwkJj7.js";import"./x-D3eMvyF7.js";import"./index-XR0xjW4T.js";import"./index-DjAs8onA.js";import"./Combination-CZ50XvyL.js";const Ee=({auth:u,vendors:f})=>{var V;const F=new Date().toLocaleDateString(),{toast:v}=oe(),[g,R]=b.useState([]),[a,y]=b.useState([]),[o,P]=b.useState(),{data:s,setData:m,post:O,errors:ue,reset:xe,processing:M}=Y({id:0,po_number:void 0,control_no:void 0,vendor_id:void 0,vendor_name:"",created_name:u.user.name,doc_date:F,deliv_date:void 0,notes:"",plant:u.user.plants!==void 0?(V=u.user.plants[0])==null?void 0:V.plant:"",header_text:"",approver_text:"",attachment:void 0,total_po_value:0,status:"",appr_seq:0,deliv_addr:"",pomaterials:[]}),$=[{...r.keyColumn("sel",r.checkboxColumn),title:"Sel",minWidth:30},{...r.keyColumn("status",r.textColumn),title:"Sts",minWidth:35,disabled:!0},{...r.keyColumn("item_no",r.intColumn),title:"ItmNo",minWidth:55,disabled:!0},{...r.keyColumn("mat_code",r.textColumn),title:"Material",minWidth:120,disabled:!0},{...r.keyColumn("short_text",r.textColumn),title:"Short Text",minWidth:300,disabled:!0},{...r.keyColumn("po_qty",r.floatColumn),title:"PO Qty",minWidth:70},{...r.keyColumn("qty_open",r.floatColumn),title:"Open Qty",minWidth:100,disabled:!0},{...r.keyColumn("unit",r.textColumn),title:"Unit",minWidth:55},{...r.keyColumn("net_price",r.floatColumn),title:"Net Price",minWidth:80,disabled:({rowData:t})=>!!t.item_free},{...r.keyColumn("per_unit",r.intColumn),title:"Per Unit",minWidth:50,disabled:({rowData:t})=>!!t.item_free},{...r.keyColumn("total_value",r.intColumn),title:"Total Value",minWidth:120,disabled:!0},{...r.keyColumn("item_free",r.checkboxColumn),title:"Free",minWidth:70},{...r.keyColumn("currency",r.textColumn),title:"Curr",minWidth:55,disabled:!0},{...r.keyColumn("del_date",r.dateColumn),title:"Del Date",minWidth:120},{...r.keyColumn("mat_grp",r.textColumn),title:"Mat Grp",minWidth:200,disabled:!0},{...r.keyColumn("requested_by",r.textColumn),title:"Requested By",minWidth:150},{...r.keyColumn("pr_number",r.textColumn),title:"PR Number",minWidth:120,disabled:!0},{...r.keyColumn("pr_item",r.textColumn),title:"PRItm",minWidth:70,disabled:!0},{...r.keyColumn("item_text",r.textColumn),title:"Item Text",minWidth:300}],B={"--dsg-header-text-color":"rgb(10, 10, 10)","--dsg-cell-disabled-background-color":"rgb(245, 245, 245)","--dsg-border-color":"#bfbdbd"},L=t=>{y([...a,...t])},H=(t,l)=>{const c=[...t];console.log("updatedMaterial",c);for(const _ of l)if(_.type==="UPDATE"){const n=c[_.fromRowIndex];n.net_price=n.item_free?0:n.net_price,n.item_no=(_.fromRowIndex+1)*10,n.po_qty=n.po_qty<n.min_order_qty?n.min_order_qty:n.po_qty,n.po_qty=n.po_qty>n.qty_open?n.qty_open:n.po_qty,n.converted_qty=n.po_qty*(n.conversion/n.denominator),n.total_value=(n.net_price??0)/(n.per_unit??0)*(n.po_qty??0)}console.log("update",c),y(c),m({...s,pomaterials:c})};b.useEffect(()=>{const t=a.reduce((l,c)=>l+(c.total_value||0),0);m(l=>({...l,total_po_value:t,attachment:g}))},[a,g]);const U=async t=>{try{P(void 0);const l=await window.axios.get(route("po.vendor",t));P(l.data.data)}catch(l){console.log("Error fetching vendor info: ",l)}},z=()=>{var _,n,W,D,I;const t=new Date;let l=!0;const c=a.filter(i=>i.mat_code!==void 0).map((i,Q)=>({...i,item_no:(Q+1)*10}));if(y(c),console.log("item",c),c.length<=0)return v({variant:"destructive",description:"Please add atleast 1 item"}),!1;for(let i=0;i<a.length;i++)if(a[i].mat_code!==void 0&&a[i].mat_code!==""){if(a[i].po_qty===void 0||((_=a[i])==null?void 0:_.po_qty)<=0){v({variant:"destructive",description:`Please enter quantity for item no ${a[i].item_no}`}),l=!1;break}if(a[i].unit===void 0||((n=a[i])==null?void 0:n.unit)===null){v({variant:"destructive",description:`Please enter order unit for item no ${a[i].item_no}`}),l=!1;break}if(a[i].net_price===void 0||((W=a[i])==null?void 0:W.net_price)===null){v({variant:"destructive",description:`Please enter Net Price for item no ${a[i].item_no}`}),l=!1;break}if(a[i].del_date===void 0||((D=a[i])==null?void 0:D.del_date)===null){v({variant:"destructive",description:`Please enter delivery date for item no ${a[i].item_no}`}),l=!1;break}else if(((I=a[i].del_date)==null?void 0:I.getTime())<=t.getTime()){v({variant:"destructive",description:`Please enter delivery date greater than today for item no ${a[i].item_no}`}),l=!1;break}}return l},G=async t=>{t.preventDefault(),z()&&(console.log(s),O(route("po.store")))};return e.jsxs(X,{user:u.user,menus:u.menu,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Create Purchase Order"}),children:[e.jsx(J,{title:"PO Create"}),e.jsx(se,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsx("div",{className:"bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("form",{onSubmit:G,children:[e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(p,{htmlFor:"prnumber",children:"PO Number"}),e.jsx(j,{type:"text",id:"prnumber",defaultValue:s.po_number,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(p,{htmlFor:"control_no",children:"Control No."}),e.jsx(j,{type:"number",id:"control_no",defaultValue:s.control_no,onChange:t=>m("control_no",t.target.value)})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(p,{htmlFor:"created_by",children:"Created By"}),e.jsx(j,{type:"text",id:"control_no",defaultValue:s.created_name,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(p,{htmlFor:"date",children:"Doc Date"}),e.jsx(j,{type:"text",id:"date",defaultValue:s.doc_date,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(p,{htmlFor:"date",children:"Delivery Date"}),e.jsx(j,{type:"date",id:"deliv_date",defaultValue:s.deliv_date,onChange:t=>m("deliv_date",t.target.value),required:!0})]}),e.jsxs("div",{className:"flex-none w-96",children:[e.jsx(p,{children:"Vendor"}),e.jsx(ee,{required:!0,value:(f==null?void 0:f.find(({value:t})=>t===s.vendor_id))??null,options:f,onChange:({value:t,label:l})=>{m({...s,vendor_id:t,vendor_name:l}),U(t)},styles:{control:(t,l)=>({...t,minHeight:"1.75rem",height:"1.75rem",fontSize:"0.875rem",borderColor:"hsl(var(--input))"}),valueContainer:(t,l)=>({...t,height:"1.75rem",padding:"0 6px"}),input:(t,l)=>({...t,margin:"0px"}),indicatorSeparator:t=>({display:"none"}),indicatorsContainer:(t,l)=>({...t,height:"1.75rem"})}})]}),e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(p,{htmlFor:"requestingPlant",children:"Requesting Plant"}),e.jsxs(N,{defaultValue:s.plant,onValueChange:t=>m("plant",t),children:[e.jsx(T,{children:e.jsx(k,{placeholder:"Plant"})}),e.jsx(w,{children:u.user.plants&&u.user.plants.map(t=>e.jsxs(S,{value:t.plant,children:[t.plant," ",t.name1]},t.plant))})]})]})]}),e.jsx("div",{className:"p-1 pt-0",children:e.jsxs(A,{defaultValue:"header_text",className:"max-w-8xl",children:[e.jsxs(E,{children:[e.jsx(x,{value:"header_text",children:"Header Text"}),e.jsx(x,{value:"approver_text",children:"Approver Text"}),e.jsx(x,{value:"notes",children:"Notes"}),e.jsx(x,{value:"deliveryAddress",children:"Delivery Address"}),e.jsx(x,{value:"workflow",children:"Workflow"}),e.jsx(x,{value:"attachment",children:"Attachment"}),e.jsx(x,{value:"vendor",children:"Vendor Info"})]}),e.jsx(h,{value:"header_text",children:e.jsx(C,{value:s.header_text,onChange:t=>m("header_text",t.target.value)})}),e.jsx(h,{value:"notes",children:e.jsxs(N,{defaultValue:s.notes,onValueChange:t=>m("notes",t),children:[e.jsx(T,{children:e.jsx(k,{placeholder:"Notes"})}),e.jsx(w,{children:re.map(t=>e.jsx(S,{value:t,children:t},t))})]})}),e.jsx(h,{value:"deliveryAddress",children:e.jsxs(N,{defaultValue:s.deliv_addr,onValueChange:t=>m("deliv_addr",t),children:[e.jsx(T,{children:e.jsx(k,{placeholder:"Address"})}),e.jsx(w,{children:ne.map(t=>e.jsx(S,{value:t,children:t},t))})]})}),e.jsx(h,{value:"approver_text",children:e.jsx(C,{value:s.approver_text,onChange:t=>m("approver_text",t.target.value)})}),e.jsx(h,{value:"workflow"}),e.jsx(h,{value:"attachment",children:e.jsx(ie,{files:g,setFiles:R})}),e.jsx(h,{value:"vendor",children:e.jsx(ce,{children:e.jsx(me,{children:o&&e.jsx("div",{children:e.jsx(ae,{className:"w-11/2 text-sm",children:e.jsxs(le,{children:[e.jsxs(q,{className:"border-none h-",children:[e.jsx(d,{children:e.jsx("b",{children:"Account group: "})}),e.jsx(d,{children:o.account_group}),e.jsx(d,{children:e.jsx("b",{children:"Name : "})}),e.jsxs(d,{children:[" ",o.name_1," ",o.name_2," ",o.name_3," ",o.name_4]}),e.jsx(d,{children:e.jsx("b",{children:"Supplier : "})}),e.jsx(d,{children:o.supplier})]},o.id),e.jsxs(q,{className:"border-none",children:[e.jsx(d,{children:e.jsx("b",{children:"Address : "})}),e.jsxs(d,{children:[o.street," ",o.district," ",o.city," ",o.postal_code," ",o.country]}),e.jsx(d,{children:e.jsx("b",{children:"Tax Number : "})}),e.jsxs(d,{children:[o.tax_number," ",o.tax_number_2]})]},o.id),e.jsxs(q,{className:"border-none",children:[e.jsx(d,{children:e.jsx("b",{children:"Telephone 1 : "})}),e.jsx(d,{children:o.telephone_1}),e.jsx(d,{children:e.jsx("b",{children:"Telephone 2 : "})}),e.jsx(d,{children:o.telephone_2})]},o.id)]})})})})})})]})}),e.jsx("div",{className:"p-2",children:e.jsx(r.DataSheetGrid,{value:a,onChange:H,columns:$,style:B,disableExpandSelection:!0,rowHeight:30,className:"text-sm"})}),e.jsxs("div",{className:"p-1 flex gap-2 justify-end content-center",children:[e.jsx("div",{className:"p-1",children:e.jsx(p,{htmlFor:"total",children:"Total PO Value: "})}),e.jsx("div",{children:e.jsx(j,{type:"text",value:de(s.total_po_value),readOnly:!0,disabled:!0})})]}),e.jsxs("div",{className:"p-2 pt-0",children:[e.jsxs(A,{defaultValue:"ItemText",className:"max-w-xl",children:[e.jsx(E,{children:e.jsx(x,{value:"ItemText",children:"Item Text"})}),e.jsx(h,{value:"ItemText",children:e.jsx(C,{})})]}),e.jsx("div",{className:"p-5 justify-end grid grid-cols-8 gap-4",children:u.permissions.po.create&&e.jsxs(e.Fragment,{children:[e.jsx(Z,{variant:"outline",disabled:M,className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110]",children:"Save"}),e.jsx(K,{href:route("po.index"),className:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500",children:"Cancel"}),e.jsx(te,{p_vendor:s.vendor_id,p_plant:s.plant,p_created_name:s.created_name,p_doc_date:s.doc_date,addToPO:L})]})})]})]})})})})]})};export{Ee as default};
