<<<<<<<< HEAD:public/build/assets/Edit-BjNyfGAs.js
import{r as g,W as oe,j as e,Y as ae,a as k}from"./app-f9e4wKpH.js";import{A as de}from"./AuthenticatedLayout-C7x3n-mw.js";import{T as L,a as U,b as _,c as v}from"./tabs-B2b0Jvv6.js";import{B as ce}from"./button-DX6JiMpx.js";import{T as $}from"./textarea-Pla2gzjr.js";import{L as b,I as y}from"./input-oaH899Yu.js";import{S as A,a as P,b as V,c as q,d as W}from"./select-ifMj3xKk.js";import{S as T,N as ue,D as me,T as z,d as xe,b as C,e as w,a as Q,c,f as pe,g as E,h as F}from"./constants-DroAfbwh.js";/* empty css              */import he from"./AddPrtoPo-GuBuW1Y2.js";import{F as fe,D as _e}from"./Dropzone-84bgJEQb.js";import{d as s}from"./index-Mi72Froj.js";import{u as ve,T as be}from"./toaster-Ch6bswXN.js";import{f as je}from"./utils-BnvPr2De.js";import{S as ge}from"./react-select.esm-CZxcBHQV.js";import{F as G,D as ye}from"./FlagForAction-a0NzUSqF.js";import R from"./Approval-DOjbKfCI.js";import{C as Ce,a as we}from"./card-DEJbkzcz.js";import"./ApplicationLogo-pa34QAzP.js";import"./transition-BkiwkJj7.js";import"./x-D3eMvyF7.js";import"./index-XR0xjW4T.js";import"./index-DjAs8onA.js";import"./Combination-CZ50XvyL.js";import"./Modal-CW043s60.js";import"./SecondaryButton-BJF-mDVT.js";import"./PrimaryButton-TD38pIrs.js";const Xe=({auth:m,vendors:N,poheader:r,message:h})=>{const{toast:f}=ve(),[i,S]=g.useState(r.pomaterials.map(t=>({...t,del_date:new Date(t.del_date||""),qty_open:t.qty_open/(t.conversion/t.denominator)}))),[p,Y]=g.useState(),[d,O]=g.useState(r.vendors),[D,I]=g.useState([]),{data:n,setData:x,post:Z,errors:Ne,reset:J,processing:K}=oe({id:r.id,po_number:r.po_number,control_no:r.control_no,vendor_id:r.vendor_id,vendors:r.vendors,created_name:r.created_name,doc_date:r.doc_date,deliv_date:r.deliv_date,notes:r.notes,plant:r.plant,header_text:r.header_text,approver_text:r.approver_text,attachment:void 0,total_po_value:r.total_po_value,deliv_addr:r.deliv_addr,pomaterials:[],_method:"patch"}),X=[{...s.keyColumn("sel",s.checkboxColumn),title:"Sel",minWidth:30},{...s.keyColumn("status",s.textColumn),title:"Sts",minWidth:35,disabled:!0},{...s.keyColumn("item_no",s.intColumn),title:"ItmNo",minWidth:55,disabled:!0},{...s.keyColumn("mat_code",s.textColumn),title:"Material",minWidth:120,disabled:!0},{...s.keyColumn("short_text",s.textColumn),title:"Short Text",minWidth:300,disabled:!0},{...s.keyColumn("po_qty",s.floatColumn),title:"PO Qty",minWidth:70},{...s.keyColumn("qty_open",s.floatColumn),title:"Open Qty",minWidth:80,disabled:!0},{...s.keyColumn("unit",s.textColumn),title:"Unit",minWidth:55},{...s.keyColumn("net_price",s.floatColumn),title:"Net Price",minWidth:80,disabled:({rowData:t})=>!!t.item_free},{...s.keyColumn("per_unit",s.intColumn),title:"Per Unit",minWidth:50,disabled:({rowData:t})=>!!t.item_free},{...s.keyColumn("total_value",s.intColumn),title:"Total Value",minWidth:120,disabled:!0},{...s.keyColumn("item_free",s.checkboxColumn),title:"Free",minWidth:70},{...s.keyColumn("currency",s.textColumn),title:"Curr",minWidth:55,disabled:!0},{...s.keyColumn("del_date",s.dateColumn),title:"Del Date",minWidth:120},{...s.keyColumn("mat_grp",s.textColumn),title:"Mat Grp",minWidth:200,disabled:!0},{...s.keyColumn("requested_by",s.textColumn),title:"Requested By",minWidth:150},{...s.keyColumn("pr_number",s.textColumn),title:"PR Number",minWidth:120,disabled:!0},{...s.keyColumn("pr_item",s.textColumn),title:"PRItm",minWidth:70,disabled:!0},{...s.keyColumn("item_text",s.textColumn),title:"Item Text",minWidth:300}],ee={"--dsg-header-text-color":"rgb(10, 10, 10)","--dsg-cell-disabled-background-color":"rgb(245, 245, 245)","--dsg-border-color":"#bfbdbd"},te=t=>{S([...i,...t])},re=(t,o)=>{const u=[...t];console.log("updatedMaterial",u);for(const j of o)if(j.type==="UPDATE"){const a=u[j.fromRowIndex];a.net_price=a.item_free?0:a.net_price,a.item_no=(j.fromRowIndex+1)*10,a.po_qty=a.po_qty<a.min_order_qty?a.min_order_qty:a.po_qty,a.converted_qty=a.po_qty*(a.conversion/a.denominator),a.total_value=(a.net_price??0)/(a.per_unit??0)*(a.po_qty??0)}console.log("update",u),S(u),x({...n,pomaterials:u})};g.useEffect(()=>{h!=null&&h.success&&f({title:h.success}),h!=null&&h.error&&f({variant:"destructive",title:h.error}),m.user.approvers&&Y(m.user.approvers.filter(t=>t.type=="po")[0])},[]),g.useEffect(()=>{const t=i.reduce((o,u)=>o+(u.total_value||0),0);x(o=>({...o,total_po_value:t,attachment:D}))},[i,D]);const se=async t=>{try{O(void 0);const o=await window.axios.get(route("po.vendor",t));O(o.data.data)}catch(o){console.log("Error fetching vendor info: ",o)}},ie=()=>{var j,a,M,H,B;const t=new Date;let o=!0;const u=i.filter(l=>l.mat_code!==void 0).map((l,le)=>({...l,item_no:(le+1)*10}));if(S(u),console.log("item",u),u.length<=0)return f({variant:"destructive",description:"Please add atleast 1 item"}),!1;for(let l=0;l<i.length;l++)if(i[l].mat_code!==void 0&&i[l].mat_code!==""){if(i[l].po_qty===void 0||((j=i[l])==null?void 0:j.po_qty)<=0){f({variant:"destructive",description:`Please enter quantity for item no ${i[l].item_no}`}),o=!1;break}if(i[l].unit===void 0||((a=i[l])==null?void 0:a.unit)===null){f({variant:"destructive",description:`Please enter order unit for item no ${i[l].item_no}`}),o=!1;break}if(i[l].net_price===void 0||((M=i[l])==null?void 0:M.net_price)===null){f({variant:"destructive",description:`Please enter Net Price for item no ${i[l].item_no}`}),o=!1;break}if(i[l].del_date===void 0||((H=i[l])==null?void 0:H.del_date)===null){f({variant:"destructive",description:`Please enter delivery date for item no ${i[l].item_no}`}),o=!1;break}else if(((B=i[l].del_date)==null?void 0:B.getTime())<=t.getTime()){f({variant:"destructive",description:`Please enter delivery date greater than today for item no ${i[l].item_no}`}),o=!1;break}}return o},ne=async t=>{t.preventDefault(),ie()&&(console.log(n),Z(route("po.update",r.id),{preserveScroll:!0,onSuccess:o=>{J(),I([])}}))};return e.jsxs(de,{user:m.user,menus:m.menu,header:e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Edit Purchase Order"}),r.status==T&&e.jsx("a",{className:"text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm p-1 text-center",href:route("po.print",r.id),target:"_blank",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"size-6",children:e.jsx("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"})})})]}),children:[e.jsx(ae,{title:"PO Create"}),e.jsx(be,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsxs("div",{className:"bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg",children:[e.jsxs("form",{onSubmit:ne,children:[e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(b,{htmlFor:"prnumber",children:"PO Number"}),e.jsx(y,{type:"text",id:"prnumber",defaultValue:n.po_number,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(b,{htmlFor:"control_no",children:"Control No."}),e.jsx(y,{type:"text",id:"control_no",defaultValue:n.control_no,onChange:t=>x("control_no",t.target.value)})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(b,{htmlFor:"created_by",children:"Created By"}),e.jsx(y,{type:"text",id:"created_by",defaultValue:n.created_name,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(b,{htmlFor:"date",children:"Doc Date"}),e.jsx(y,{type:"text",id:"date",defaultValue:n.doc_date,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(b,{htmlFor:"date",children:"Delivery Date"}),e.jsx(y,{type:"date",id:"deliv_date",defaultValue:n.deliv_date,onChange:t=>x("deliv_date",t.target.value),required:!0})]}),e.jsxs("div",{className:"flex-none w-96",children:[e.jsx(b,{children:"Vendor"}),e.jsx(ge,{value:(N==null?void 0:N.find(({value:t})=>t===n.vendor_id))??null,options:N,onChange:({value:t})=>{x("vendor_id",t),se(t)},styles:{control:(t,o)=>({...t,minHeight:"1.75rem",height:"1.75rem",fontSize:"0.875rem",borderColor:"hsl(var(--input))"}),valueContainer:(t,o)=>({...t,height:"1.75rem",padding:"0 6px"}),input:(t,o)=>({...t,margin:"0px"}),indicatorSeparator:t=>({display:"none"}),indicatorsContainer:(t,o)=>({...t,height:"1.75rem"})}})]}),e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(b,{children:"Requesting Plant"}),e.jsxs(A,{defaultValue:n.plant,onValueChange:t=>x("plant",t),children:[e.jsx(P,{children:e.jsx(V,{placeholder:"Plant"})}),e.jsx(q,{children:m.user.plants&&m.user.plants.map(t=>e.jsxs(W,{value:t.plant,children:[t.plant," ",t.name1]},t.plant))})]})]})]}),e.jsx("div",{className:"p-1 pt-0",children:e.jsxs(L,{defaultValue:"header_text",className:"max-w-8xl",children:[e.jsxs(U,{children:[e.jsx(_,{value:"header_text",children:"Header Text"}),e.jsx(_,{value:"approver_text",children:"Approver Text"}),e.jsx(_,{value:"notes",children:"Notes"}),e.jsx(_,{value:"deliv_addr",children:"Delivery Address"}),e.jsx(_,{value:"workflow",children:"Workflow"}),e.jsx(_,{value:"attachment",children:"Attachment"}),e.jsx(_,{value:"vendor",children:"Vendor Info"})]}),e.jsx(v,{value:"header_text",children:e.jsx($,{value:n.header_text,onChange:t=>x("header_text",t.target.value)})}),e.jsx(v,{value:"notes",children:e.jsxs(A,{defaultValue:n.notes,onValueChange:t=>x("notes",t),children:[e.jsx(P,{children:e.jsx(V,{placeholder:"Notes"})}),e.jsx(q,{children:ue.map(t=>e.jsx(W,{value:t,children:t},t))})]})}),e.jsx(v,{value:"approver_text",children:e.jsx($,{value:n.approver_text,onChange:t=>x("approver_text",t.target.value)})}),e.jsx(v,{value:"deliv_addr",children:e.jsxs(A,{defaultValue:n.deliv_addr,onValueChange:t=>x("deliv_addr",t),children:[e.jsx(P,{children:e.jsx(V,{placeholder:"Address"})}),e.jsx(q,{children:me.map(t=>e.jsx(W,{value:t,children:t},t))})]})}),e.jsx(v,{value:"workflow",children:e.jsxs(z,{className:"w-11/2 text-xs",children:[e.jsx(xe,{children:e.jsxs(C,{className:"font-bold p-0",children:[e.jsx(w,{children:"Position"}),e.jsx(w,{children:"Status"}),e.jsx(w,{children:"Approved By"}),e.jsx(w,{children:"Approved Date"}),e.jsx(w,{children:"Remarks"})]})}),e.jsx(Q,{children:r.workflows&&r.workflows.map(t=>e.jsxs(C,{children:[e.jsx(c,{children:t.position}),e.jsxs(c,{children:[t.status," "]}),e.jsxs(c,{children:[" ",t.approved_by," "]}),e.jsxs(c,{children:[t.approved_date," "]}),e.jsxs(c,{children:[t.message," "]})]},t.id))})]})}),e.jsxs(v,{value:"attachment",children:[e.jsx("ul",{className:"mt-3 mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 ",children:r.attachments&&r.attachments.map(t=>e.jsxs("li",{className:"relative h-12 rounded-md shadow-lg p-2 bg-white",children:[m.permissions.po.edit&&e.jsx(k,{preserveScroll:!0,href:route("attachment.delete",t.id),method:"delete",as:"button",className:"w-7 h-7  bg-slate-100 rounded-full flex justify-center items-center absolute top-3 right-2 hover:bg-red-200 transition-colors",children:e.jsx(fe,{className:"w-6 h-6  text-red-600 hover:fill-red-700 transition-colors"})}),e.jsx("p",{className:"mt-2 text-blue-600 text-sm font-medium truncate pr-7",children:e.jsx("a",{href:"/"+t.filepath,download:!0,children:t.filename})})]},t.filename))}),e.jsx(_e,{files:D,setFiles:I})]}),e.jsx(v,{value:"vendor",children:e.jsx(Ce,{children:e.jsx(we,{children:d&&e.jsx("div",{children:e.jsx(z,{className:"w-11/2 text-xs",children:e.jsxs(Q,{children:[e.jsxs(C,{className:"border-none h-",children:[e.jsx(c,{children:e.jsx("b",{children:"Account group: "})}),e.jsx(c,{children:d.account_group}),e.jsx(c,{children:e.jsx("b",{children:"Name : "})}),e.jsxs(c,{children:[" ",d.name_1," ",d.name_2," ",d.name_3," ",d.name_4]}),e.jsx(c,{children:e.jsx("b",{children:"Supplier : "})}),e.jsx(c,{children:d.supplier})]},d.id),e.jsxs(C,{className:"border-none",children:[e.jsx(c,{children:e.jsx("b",{children:"Address : "})}),e.jsxs(c,{children:[d.street," ",d.district," ",d.city," ",d.postal_code," ",d.country]}),e.jsx(c,{children:e.jsx("b",{children:"Tax Number : "})}),e.jsxs(c,{children:[d.tax_number," ",d.tax_number_2]})]},d.id),e.jsxs(C,{className:"border-none",children:[e.jsx(c,{children:e.jsx("b",{children:"Telephone 1 : "})}),e.jsx(c,{children:d.telephone_1}),e.jsx(c,{children:e.jsx("b",{children:"Telephone 2 : "})}),e.jsx(c,{children:d.telephone_2})]},d.id)]})})})})})})]})}),e.jsx("div",{className:"p-2",children:e.jsx(s.DataSheetGrid,{value:i,onChange:re,columns:X,style:ee,disableExpandSelection:!0,rowHeight:30,className:"text-sm"})}),e.jsxs("div",{className:"p-1 flex gap-2 justify-end content-center",children:[e.jsx("div",{className:"p-1",children:e.jsx(b,{htmlFor:"total",children:"Total PO Value: "})}),e.jsx("div",{children:e.jsx(y,{id:"total",type:"text",value:je(n.total_po_value),readOnly:!0,disabled:!0})})]}),e.jsxs("div",{className:"p-2 pt-0",children:[e.jsxs(L,{defaultValue:"itemDetails",className:"max-w-xl",children:[e.jsx(U,{children:e.jsx(_,{value:"action",children:"Action"})}),e.jsx(v,{value:"action",children:m.permissions.po.edit&&e.jsxs(e.Fragment,{children:[e.jsx(k,{preserveScroll:!0,href:route("po.update-controlno"),data:{id:r.id,control_no:n.control_no},as:"button",type:"button",className:"p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-100 ",children:"Update Control No."}),e.jsx(G,{p_description:"Are you sure you want to flag delete this item(s)?",p_title:"Flag for Delete",p_url:route("po.flag.delete"),p_disable:i.filter(t=>t.sel==!0).length==0,p_items:{ids:i.filter(t=>t.sel==!0).map(t=>t.id)}}),e.jsx(G,{p_description:"Are you sure you want to flag delivered this item(s)?",p_title:"Flag Delivered",p_url:route("po.flag.deliver"),p_disable:i.filter(t=>t.sel==!0).length==0,p_items:{ids:i.filter(t=>t.sel==!0).map(t=>t.id)}})]})})]}),e.jsx("div",{className:"p-5 justify-end grid grid-cols-8 gap-4",children:m.permissions.po.edit&&e.jsxs(e.Fragment,{children:[e.jsx(ce,{variant:"outline",className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100",disabled:K,children:"Save"}),e.jsx(k,{href:route("po.index"),className:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-100",children:"Cancel"}),e.jsx(k,{disabled:r.appr_seq!=pe,preserveScroll:!0,href:route("po.submit",r.id),as:"button",type:"button",className:`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input bg-[#f8c110] hover:bg-[#f8c110] hover:text-accent-foreground hover:border-gray-500
========
import{r as g,W as oe,j as e,Y as ae,a as k}from"./app-DrKxL2JF.js";import{A as de}from"./AuthenticatedLayout-B_AKMOtl.js";import{T as L,a as U,b as _,c as v}from"./tabs-DzpQCljZ.js";import{B as ce}from"./button-ByqBGolh.js";import{T as $}from"./textarea-BhhGCQu7.js";import{L as b,I as y}from"./input--Mc1YdsG.js";import{S as A,a as P,b as V,c as q,d as W}from"./select-C_PRO1Yv.js";import{S as T,N as ue,D as me,T as z,d as xe,b as C,e as w,a as Q,c,f as pe,g as E,h as F}from"./constants-B3mkEWZv.js";/* empty css              */import he from"./AddPrtoPo-BhhscA5y.js";import{F as fe,D as _e}from"./Dropzone-Di36OoJ4.js";import{d as s}from"./index-BhwgxNds.js";import{u as ve,T as be}from"./toaster-BIxKQqvl.js";import{f as je}from"./utils-hV7mXc9m.js";import{S as ge}from"./react-select.esm-Drn_uJwt.js";import{F as G,D as ye}from"./FlagForAction-BaK-JquW.js";import R from"./Approval-W-NyeEQo.js";import{C as Ce,a as we}from"./card-BBHBBmQt.js";import"./ApplicationLogo-CteZKUYX.js";import"./transition-FMJMOV8j.js";import"./x-PJ_KA_w5.js";import"./index-CCQEarVx.js";import"./index-D80COjb6.js";import"./Combination-tZivVA9J.js";import"./Modal-CO4rdEEs.js";import"./SecondaryButton-BUxGX97C.js";import"./PrimaryButton-bE9grA7p.js";const Xe=({auth:m,vendors:N,poheader:r,message:h})=>{const{toast:f}=ve(),[i,S]=g.useState(r.pomaterials.map(t=>({...t,del_date:new Date(t.del_date||""),qty_open:t.qty_open/(t.conversion/t.denominator)}))),[p,Y]=g.useState(),[d,O]=g.useState(r.vendors),[D,I]=g.useState([]),{data:n,setData:x,post:Z,errors:Ne,reset:J,processing:K}=oe({id:r.id,po_number:r.po_number,control_no:r.control_no,vendor_id:r.vendor_id,vendors:r.vendors,created_name:r.created_name,doc_date:r.doc_date,deliv_date:r.deliv_date,notes:r.notes,plant:r.plant,header_text:r.header_text,approver_text:r.approver_text,attachment:void 0,total_po_value:r.total_po_value,deliv_addr:r.deliv_addr,pomaterials:[],_method:"patch"}),X=[{...s.keyColumn("sel",s.checkboxColumn),title:"Sel",minWidth:30},{...s.keyColumn("status",s.textColumn),title:"Sts",minWidth:35,disabled:!0},{...s.keyColumn("item_no",s.intColumn),title:"ItmNo",minWidth:55,disabled:!0},{...s.keyColumn("mat_code",s.textColumn),title:"Material",minWidth:120,disabled:!0},{...s.keyColumn("short_text",s.textColumn),title:"Short Text",minWidth:300,disabled:!0},{...s.keyColumn("po_qty",s.floatColumn),title:"PO Qty",minWidth:70},{...s.keyColumn("qty_open",s.floatColumn),title:"Open Qty",minWidth:80,disabled:!0},{...s.keyColumn("unit",s.textColumn),title:"Unit",minWidth:55},{...s.keyColumn("net_price",s.floatColumn),title:"Net Price",minWidth:80,disabled:({rowData:t})=>!!t.item_free},{...s.keyColumn("per_unit",s.intColumn),title:"Per Unit",minWidth:50,disabled:({rowData:t})=>!!t.item_free},{...s.keyColumn("total_value",s.intColumn),title:"Total Value",minWidth:120,disabled:!0},{...s.keyColumn("item_free",s.checkboxColumn),title:"Free",minWidth:70},{...s.keyColumn("currency",s.textColumn),title:"Curr",minWidth:55,disabled:!0},{...s.keyColumn("del_date",s.dateColumn),title:"Del Date",minWidth:120},{...s.keyColumn("mat_grp",s.textColumn),title:"Mat Grp",minWidth:200,disabled:!0},{...s.keyColumn("requested_by",s.textColumn),title:"Requested By",minWidth:150},{...s.keyColumn("pr_number",s.textColumn),title:"PR Number",minWidth:120,disabled:!0},{...s.keyColumn("pr_item",s.textColumn),title:"PRItm",minWidth:70,disabled:!0},{...s.keyColumn("item_text",s.textColumn),title:"Item Text",minWidth:300}],ee={"--dsg-header-text-color":"rgb(10, 10, 10)","--dsg-cell-disabled-background-color":"rgb(245, 245, 245)","--dsg-border-color":"#bfbdbd"},te=t=>{S([...i,...t])},re=(t,o)=>{const u=[...t];console.log("updatedMaterial",u);for(const j of o)if(j.type==="UPDATE"){const a=u[j.fromRowIndex];a.net_price=a.item_free?0:a.net_price,a.item_no=(j.fromRowIndex+1)*10,a.po_qty=a.po_qty<a.min_order_qty?a.min_order_qty:a.po_qty,a.converted_qty=a.po_qty*(a.conversion/a.denominator),a.total_value=(a.net_price??0)/(a.per_unit??0)*(a.po_qty??0)}console.log("update",u),S(u),x({...n,pomaterials:u})};g.useEffect(()=>{h!=null&&h.success&&f({title:h.success}),h!=null&&h.error&&f({variant:"destructive",title:h.error}),m.user.approvers&&Y(m.user.approvers.filter(t=>t.type=="po")[0])},[]),g.useEffect(()=>{const t=i.reduce((o,u)=>o+(u.total_value||0),0);x(o=>({...o,total_po_value:t,attachment:D}))},[i,D]);const se=async t=>{try{O(void 0);const o=await window.axios.get(route("po.vendor",t));O(o.data.data)}catch(o){console.log("Error fetching vendor info: ",o)}},ie=()=>{var j,a,M,H,B;const t=new Date;let o=!0;const u=i.filter(l=>l.mat_code!==void 0).map((l,le)=>({...l,item_no:(le+1)*10}));if(S(u),console.log("item",u),u.length<=0)return f({variant:"destructive",description:"Please add atleast 1 item"}),!1;for(let l=0;l<i.length;l++)if(i[l].mat_code!==void 0&&i[l].mat_code!==""){if(i[l].po_qty===void 0||((j=i[l])==null?void 0:j.po_qty)<=0){f({variant:"destructive",description:`Please enter quantity for item no ${i[l].item_no}`}),o=!1;break}if(i[l].unit===void 0||((a=i[l])==null?void 0:a.unit)===null){f({variant:"destructive",description:`Please enter order unit for item no ${i[l].item_no}`}),o=!1;break}if(i[l].net_price===void 0||((M=i[l])==null?void 0:M.net_price)===null){f({variant:"destructive",description:`Please enter Net Price for item no ${i[l].item_no}`}),o=!1;break}if(i[l].del_date===void 0||((H=i[l])==null?void 0:H.del_date)===null){f({variant:"destructive",description:`Please enter delivery date for item no ${i[l].item_no}`}),o=!1;break}else if(((B=i[l].del_date)==null?void 0:B.getTime())<=t.getTime()){f({variant:"destructive",description:`Please enter delivery date greater than today for item no ${i[l].item_no}`}),o=!1;break}}return o},ne=async t=>{t.preventDefault(),ie()&&(console.log(n),Z(route("po.update",r.id),{preserveScroll:!0,onSuccess:o=>{J(),I([])}}))};return e.jsxs(de,{user:m.user,menus:m.menu,header:e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Edit Purchase Order"}),r.status==T&&e.jsx("a",{className:"text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm p-1 text-center",href:route("po.print",r.id),target:"_blank",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"size-6",children:e.jsx("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"})})})]}),children:[e.jsx(ae,{title:"PO Create"}),e.jsx(be,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsxs("div",{className:"bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg",children:[e.jsxs("form",{onSubmit:ne,children:[e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(b,{htmlFor:"prnumber",children:"PO Number"}),e.jsx(y,{type:"text",id:"prnumber",defaultValue:n.po_number,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(b,{htmlFor:"control_no",children:"Control No."}),e.jsx(y,{type:"text",id:"control_no",defaultValue:n.control_no,onChange:t=>x("control_no",t.target.value)})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(b,{htmlFor:"created_by",children:"Created By"}),e.jsx(y,{type:"text",id:"created_by",defaultValue:n.created_name,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(b,{htmlFor:"date",children:"Doc Date"}),e.jsx(y,{type:"text",id:"date",defaultValue:n.doc_date,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(b,{htmlFor:"date",children:"Delivery Date"}),e.jsx(y,{type:"date",id:"deliv_date",defaultValue:n.deliv_date,onChange:t=>x("deliv_date",t.target.value),required:!0})]}),e.jsxs("div",{className:"flex-none w-96",children:[e.jsx(b,{children:"Vendor"}),e.jsx(ge,{value:(N==null?void 0:N.find(({value:t})=>t===n.vendor_id))??null,options:N,onChange:({value:t})=>{x("vendor_id",t),se(t)},styles:{control:(t,o)=>({...t,minHeight:"1.75rem",height:"1.75rem",fontSize:"0.875rem",borderColor:"hsl(var(--input))"}),valueContainer:(t,o)=>({...t,height:"1.75rem",padding:"0 6px"}),input:(t,o)=>({...t,margin:"0px"}),indicatorSeparator:t=>({display:"none"}),indicatorsContainer:(t,o)=>({...t,height:"1.75rem"})}})]}),e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(b,{children:"Requesting Plant"}),e.jsxs(A,{defaultValue:n.plant,onValueChange:t=>x("plant",t),children:[e.jsx(P,{children:e.jsx(V,{placeholder:"Plant"})}),e.jsx(q,{children:m.user.plants&&m.user.plants.map(t=>e.jsxs(W,{value:t.plant,children:[t.plant," ",t.name1]},t.plant))})]})]})]}),e.jsx("div",{className:"p-1 pt-0",children:e.jsxs(L,{defaultValue:"header_text",className:"max-w-8xl",children:[e.jsxs(U,{children:[e.jsx(_,{value:"header_text",children:"Header Text"}),e.jsx(_,{value:"approver_text",children:"Approver Text"}),e.jsx(_,{value:"notes",children:"Notes"}),e.jsx(_,{value:"deliv_addr",children:"Delivery Address"}),e.jsx(_,{value:"workflow",children:"Workflow"}),e.jsx(_,{value:"attachment",children:"Attachment"}),e.jsx(_,{value:"vendor",children:"Vendor Info"})]}),e.jsx(v,{value:"header_text",children:e.jsx($,{value:n.header_text,onChange:t=>x("header_text",t.target.value)})}),e.jsx(v,{value:"notes",children:e.jsxs(A,{defaultValue:n.notes,onValueChange:t=>x("notes",t),children:[e.jsx(P,{children:e.jsx(V,{placeholder:"Notes"})}),e.jsx(q,{children:ue.map(t=>e.jsx(W,{value:t,children:t},t))})]})}),e.jsx(v,{value:"approver_text",children:e.jsx($,{value:n.approver_text,onChange:t=>x("approver_text",t.target.value)})}),e.jsx(v,{value:"deliv_addr",children:e.jsxs(A,{defaultValue:n.deliv_addr,onValueChange:t=>x("deliv_addr",t),children:[e.jsx(P,{children:e.jsx(V,{placeholder:"Address"})}),e.jsx(q,{children:me.map(t=>e.jsx(W,{value:t,children:t},t))})]})}),e.jsx(v,{value:"workflow",children:e.jsxs(z,{className:"w-11/2 text-xs",children:[e.jsx(xe,{children:e.jsxs(C,{className:"font-bold p-0",children:[e.jsx(w,{children:"Position"}),e.jsx(w,{children:"Status"}),e.jsx(w,{children:"Approved By"}),e.jsx(w,{children:"Approved Date"}),e.jsx(w,{children:"Remarks"})]})}),e.jsx(Q,{children:r.workflows&&r.workflows.map(t=>e.jsxs(C,{children:[e.jsx(c,{children:t.position}),e.jsxs(c,{children:[t.status," "]}),e.jsxs(c,{children:[" ",t.approved_by," "]}),e.jsxs(c,{children:[t.approved_date," "]}),e.jsxs(c,{children:[t.message," "]})]},t.id))})]})}),e.jsxs(v,{value:"attachment",children:[e.jsx("ul",{className:"mt-3 mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 ",children:r.attachments&&r.attachments.map(t=>e.jsxs("li",{className:"relative h-12 rounded-md shadow-lg p-2 bg-white",children:[m.permissions.po.edit&&e.jsx(k,{preserveScroll:!0,href:route("attachment.delete",t.id),method:"delete",as:"button",className:"w-7 h-7  bg-slate-100 rounded-full flex justify-center items-center absolute top-3 right-2 hover:bg-red-200 transition-colors",children:e.jsx(fe,{className:"w-6 h-6  text-red-600 hover:fill-red-700 transition-colors"})}),e.jsx("p",{className:"mt-2 text-blue-600 text-sm font-medium truncate pr-7",children:e.jsx("a",{href:"/"+t.filepath,download:!0,children:t.filename})})]},t.filename))}),e.jsx(_e,{files:D,setFiles:I})]}),e.jsx(v,{value:"vendor",children:e.jsx(Ce,{children:e.jsx(we,{children:d&&e.jsx("div",{children:e.jsx(z,{className:"w-11/2 text-xs",children:e.jsxs(Q,{children:[e.jsxs(C,{className:"border-none h-",children:[e.jsx(c,{children:e.jsx("b",{children:"Account group: "})}),e.jsx(c,{children:d.account_group}),e.jsx(c,{children:e.jsx("b",{children:"Name : "})}),e.jsxs(c,{children:[" ",d.name_1," ",d.name_2," ",d.name_3," ",d.name_4]}),e.jsx(c,{children:e.jsx("b",{children:"Supplier : "})}),e.jsx(c,{children:d.supplier})]},d.id),e.jsxs(C,{className:"border-none",children:[e.jsx(c,{children:e.jsx("b",{children:"Address : "})}),e.jsxs(c,{children:[d.street," ",d.district," ",d.city," ",d.postal_code," ",d.country]}),e.jsx(c,{children:e.jsx("b",{children:"Tax Number : "})}),e.jsxs(c,{children:[d.tax_number," ",d.tax_number_2]})]},d.id),e.jsxs(C,{className:"border-none",children:[e.jsx(c,{children:e.jsx("b",{children:"Telephone 1 : "})}),e.jsx(c,{children:d.telephone_1}),e.jsx(c,{children:e.jsx("b",{children:"Telephone 2 : "})}),e.jsx(c,{children:d.telephone_2})]},d.id)]})})})})})})]})}),e.jsx("div",{className:"p-2",children:e.jsx(s.DataSheetGrid,{value:i,onChange:re,columns:X,style:ee,disableExpandSelection:!0,rowHeight:30,className:"text-sm"})}),e.jsxs("div",{className:"p-1 flex gap-2 justify-end content-center",children:[e.jsx("div",{className:"p-1",children:e.jsx(b,{htmlFor:"total",children:"Total PO Value: "})}),e.jsx("div",{children:e.jsx(y,{id:"total",type:"text",value:je(n.total_po_value),readOnly:!0,disabled:!0})})]}),e.jsxs("div",{className:"p-2 pt-0",children:[e.jsxs(L,{defaultValue:"itemDetails",className:"max-w-xl",children:[e.jsx(U,{children:e.jsx(_,{value:"action",children:"Action"})}),e.jsx(v,{value:"action",children:m.permissions.po.edit&&e.jsxs(e.Fragment,{children:[e.jsx(k,{preserveScroll:!0,href:route("po.update-controlno"),data:{id:r.id,control_no:n.control_no},as:"button",type:"button",className:"p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-100 ",children:"Update Control No."}),e.jsx(G,{p_description:"Are you sure you want to flag delete this item(s)?",p_title:"Flag for Delete",p_url:route("po.flag.delete"),p_disable:i.filter(t=>t.sel==!0).length==0,p_items:{ids:i.filter(t=>t.sel==!0).map(t=>t.id)}}),e.jsx(G,{p_description:"Are you sure you want to flag delivered this item(s)?",p_title:"Flag Delivered",p_url:route("po.flag.deliver"),p_disable:i.filter(t=>t.sel==!0).length==0,p_items:{ids:i.filter(t=>t.sel==!0).map(t=>t.id)}})]})})]}),e.jsx("div",{className:"p-5 justify-end grid grid-cols-8 gap-4",children:m.permissions.po.edit&&e.jsxs(e.Fragment,{children:[e.jsx(ce,{variant:"outline",className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100",disabled:K,children:"Save"}),e.jsx(k,{href:route("po.index"),className:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-100",children:"Cancel"}),e.jsx(k,{disabled:r.appr_seq!=pe,preserveScroll:!0,href:route("po.submit",r.id),as:"button",type:"button",className:`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input bg-[#f8c110] hover:bg-[#f8c110] hover:text-accent-foreground hover:border-gray-500
>>>>>>>> c615eb7 (build):public/build/assets/Edit-CNV89oWB.js
                        disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100 `,children:"Submit"}),e.jsx(ye,{p_id:r.id,p_title:"Discard this Purchase Order ?",p_url:"po.discard"}),e.jsx(he,{p_vendor:n.vendor_id,p_plant:n.plant,p_created_name:n.created_name,p_doc_date:n.doc_date,addToPO:te})]})})]})]}),m.permissions.po.approver&&e.jsxs("div",{className:"px-5 pb-5",children:[e.jsx(R,{p_po_number:n.po_number,p_type:"approved",p_title:"approve",p_disable:r.status==T||r.status==E||r.status==F||(p==null?void 0:p.seq)!=r.appr_seq}),e.jsx(R,{p_po_number:n.po_number,p_type:"rework",p_title:"rework",p_disable:r.status==T||r.status==E||r.status==F||(p==null?void 0:p.seq)!=r.appr_seq}),e.jsx(R,{p_po_number:n.po_number,p_type:"rejected",p_title:"reject",p_disable:r.status==T||r.status==E||r.status==F||(p==null?void 0:p.seq)!=r.appr_seq})]})]})})})]})};export{Xe as default};