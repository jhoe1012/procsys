import{r as d,W as w,j as e,Y as V,a as D}from"./app-9BfIP8Yt.js";import{A as F}from"./AuthenticatedLayout-DNrtgEyS.js";import"./tabs-CSAEFCKf.js";import{B as L}from"./button-UluEiDe7.js";import{T as v}from"./textarea-WPr4wz2o.js";import{L as O,I as B}from"./input-B6LatCgn.js";import{u as I,T as G}from"./toaster-C-nH-nj2.js";import"./select-BlE8HqPq.js";import{s as _,I as u}from"./InputField-BbCt2qk6.js";import{d as t}from"./index-f1KWvzcE.js";/* empty css              */import{f as H}from"./utils-BSdE8tDE.js";import{D as Y,S as K,T as z}from"./TabFields-CC_gKAQi.js";import{u as Q,a as J,L as X}from"./usePRMaterialValidation-BCeaZwQX.js";import{f as C,D as Z,C as $}from"./constants-Co51-129.js";import"./ApplicationLogo-BHU32V6c.js";import"./transition-6Z6DAD7I.js";import"./toast-SiKyGAR4.js";import"./index-CzvjeGZW.js";import"./useStateManager-7e1e8489.esm-9tTtCMRh.js";import"./react-select.esm-R1G1BB6e.js";const ye=({auth:i,mat_code:g,mat_desc:y,prheader:b})=>{var f;const j=b?b.prmaterials.map(a=>{var r;return{...a,mat_grp_desc:((r=a.materialGroups)==null?void 0:r.mat_grp_desc)??"",del_date:void 0,qty:void 0,altUomSelect:[...new Set([a.ord_unit,...a.alt_uom?a.alt_uom.map(l=>l.alt_uom):[]])]}}):Array(10).fill({...C}),[o,c]=d.useState(j),{toast:T}=I(),[p,S]=d.useState([]),{updateMaterialPR:k,computeConversion:N,isLoading:M}=Q(),{validateMaterials:W}=J(),{data:s,setData:n,post:P,errors:x,reset:ee,processing:R}=w({id:0,pr_number:"",created_name:i.user.name,doc_date:Z,requested_by:i.user.name,plant:i.user.plants!==void 0?(f=i.user.plants[0])==null?void 0:f.plant:"",reason_pr:"",header_text:"",attachment:void 0,total_pr_value:0,status:"",deliv_addr:"",prmaterials:[]}),A=d.useMemo(()=>[{...t.keyColumn("sel",t.checkboxColumn),title:"Sel",minWidth:30},{...t.keyColumn("status",t.textColumn),title:"Sts",disabled:!0,minWidth:35},{...t.keyColumn("item_no",t.intColumn),title:"ItmNo",disabled:!0,minWidth:55},{...t.keyColumn("mat_code",_({choices:g})),title:"Material",minWidth:120},{...t.keyColumn("short_text",_({choices:y})),title:"Short Text",minWidth:300},{...t.keyColumn("item_text",t.textColumn),title:"Item Text",minWidth:300},{...t.keyColumn("qty",t.floatColumn),title:"Qty",minWidth:70},{...t.keyColumn("altUomSelect",{component:({rowData:a,rowIndex:r})=>a&&e.jsx("select",{className:"border-none w-full shadow-none bg-none px-1 py-0 active:border-none hover:border-none",onChange:l=>{c(h=>{const m=[...h];return m[r]={...m[r],...N(m[r],l.target.value)},m})},children:a.map((l,h)=>e.jsx("option",{value:l,children:l},h))})}),title:"Alt UOM",minWidth:100},{...t.keyColumn("ord_unit",t.textColumn),title:"Ord UOM",minWidth:55,disabled:({rowData:a})=>a.mat_code&&a.mat_code[0].toUpperCase()!=="S"},{...t.keyColumn("price",t.floatColumn),title:"Price",minWidth:90,disabled:({rowData:a})=>a.mat_code&&a.mat_code[0].toUpperCase()!=="S"},{...t.keyColumn("per_unit",t.floatColumn),title:"Per Unit",minWidth:50,disabled:({rowData:a})=>a.mat_code&&a.mat_code[0].toUpperCase()!=="S"},{...t.keyColumn("unit",t.textColumn),title:"B.UOM",minWidth:60,disabled:!0},{...t.keyColumn("total_value",t.floatColumn),title:"Total Value",minWidth:90,disabled:!0},{...t.keyColumn("currency",t.textColumn),title:"Curr",minWidth:50,disabled:!0},{...t.keyColumn("del_date",t.dateColumn),title:"Del Date",minWidth:130},{...t.keyColumn("mat_grp_desc",t.textColumn),title:"Mat Grp",minWidth:90,disabled:!0},{...t.keyColumn("purch_grp",t.textColumn),title:"Purch Grp",minWidth:90,disabled:!0}],[]),q=[{value:"reasonForPr",label:"Reason for PR",visible:!0,content:e.jsx(v,{value:s.reason_pr,onChange:a=>n("reason_pr",a.target.value),required:!0})},{value:"headerText",label:"Header Text",visible:!0,content:e.jsx(v,{value:s.header_text,onChange:a=>n("header_text",a.target.value)})},{value:"attachment",label:"Attachment",visible:!0,content:e.jsx(Y,{files:p,setFiles:S})}],E=async(a,r)=>{const l=await k(a,r,o,s.plant);c(l)},U=async a=>{a.preventDefault();const{isValid:r,updatedMaterials:l}=W(o);c(l),r&&P(route("pr.store"))};return d.useEffect(()=>{const a=o.reduce((r,l)=>r+(l.total_value||0),0);n(r=>({...r,total_pr_value:a,attachment:p,prmaterials:o}))},[o,p]),d.useEffect(()=>{x.hasOwnProperty("error")&&T({variant:"destructive",description:x.error})},[x]),e.jsxs(F,{user:i.user,menus:i.menu,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Create Purchase Requisition"}),children:[e.jsx(V,{title:"PR Create"}),M&&e.jsx(X,{}),e.jsx(G,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsx("div",{className:"bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("form",{onSubmit:U,children:[e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsx(u,{label:"PR Number",id:"prnumber",defaultValue:s.pr_number,disabled:!0}),e.jsx(u,{label:"Created By",id:"createdby",defaultValue:s.created_name,disabled:!0}),e.jsx(u,{label:"Date",id:"date",defaultValue:s.doc_date,disabled:!0}),e.jsx(u,{label:"Requested By",id:"requested_by",defaultValue:s.requested_by,required:!0,onChange:a=>n("requested_by",a.target.value)}),e.jsx(K,{label:"Requesting Plant",items:i.user.plants,valueKey:"plant",displayKey:"name1",onValueChange:a=>n("plant",a),value:s.plant})]}),e.jsx("div",{className:"p-1 pt-0",children:e.jsx(z,{defaultValue:"reasonForPr",className:"max-w-8xl",tabs:q})}),e.jsx("div",{className:"p-2",children:e.jsx(t.DataSheetGrid,{createRow:()=>C,value:o,onChange:E,columns:A,style:$,autoAddRow:!0,disableExpandSelection:!0,rowHeight:30,className:"text-sm"})}),e.jsxs("div",{className:"float-right -mt-12 mr-72  flex gap-2 justify-end content-center",children:[e.jsx("div",{className:"",children:e.jsx(O,{htmlFor:"total",children:"Total PR Value: "})}),e.jsx("div",{children:e.jsx(B,{type:"text",value:H(s.total_pr_value),readOnly:!0,disabled:!0})})]}),e.jsx("div",{className:"p-2 pt-0",children:e.jsx("div",{className:"p-5 justify-end grid grid-cols-8 gap-4",children:i.permissions.pr.create&&e.jsxs(e.Fragment,{children:[e.jsx(L,{variant:"outline",disabled:R,className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] ",children:"Save"}),e.jsx(D,{href:route("pr.index"),className:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500",children:"Cancel"})]})})})]})})})})]})};export{ye as default};
