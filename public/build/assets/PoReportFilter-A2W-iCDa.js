import{r as p,j as t}from"./app-_4GNH0o8.js";import{M as f}from"./Modal-hx-PIZvS.js";import{L as s,I as a}from"./input-BQisfHEL.js";import{B as m}from"./button-C48SFmXx.js";import{F as g}from"./AdjustmentsHorizontalIcon-DbeCBpnE.js";import"./transition-DjUGaz8B.js";import"./index-BjmvShgX.js";import"./utils-DtDAP0nT.js";function D({queryParams:l,filterReport:c}){const[i,d]=p.useState(!1),o=(e,n)=>{n?l[e]=n:delete l[e]},r=(e,n)=>{n.key==="Enter"&&o(e,n.target.value)},u=()=>c(l),x=()=>{c({})},h=()=>{d(!1)};return t.jsxs("section",{className:"space-y-6",children:[t.jsx("button",{onClick:()=>d(!0),className:"text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm p-1 text-center",title:"Filter",children:t.jsx(g,{className:"h-6 w-6"})}),t.jsx(f,{show:i,onClose:h,maxWidth:"xl",children:t.jsxs("div",{className:"m-2",children:[t.jsxs("div",{className:"flex ",children:[t.jsx(s,{className:"p-3 w-6/12 text-sm content-center text-right",htmlFor:"type",children:"Doc Date"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10",type:"date",defaultValue:l.doc_date_from,onBlur:e=>o("doc_date_from",e.target.value),onKeyDown:e=>r("doc_date_from",e)}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10 ",type:"date",defaultValue:l.doc_date_to,onBlur:e=>o("doc_date_to",e.target.value),onKeyDown:e=>r("doc_date_to",e)})]}),t.jsxs("div",{className:"flex ",children:[t.jsx(s,{className:"p-3 w-6/12 text-sm content-center text-right",htmlFor:"type",children:"Delivery Date"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10",type:"date",defaultValue:l.deliv_date_from,onBlur:e=>o("deliv_date_from",e.target.value),onKeyDown:e=>r("deliv_date_from",e)}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10 ",type:"date",defaultValue:l.deliv_date_to,onBlur:e=>o("deliv_date_to",e.target.value),onKeyDown:e=>r("deliv_date_to",e)})]}),t.jsxs("div",{className:"flex ",children:[t.jsx(s,{className:"p-3 w-6/12 text-sm content-center text-right",htmlFor:"type",children:"Supplier"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10",type:"text",defaultValue:l.supplier_code,onBlur:e=>o("supplier_code",e.target.value),onKeyDown:e=>r("supplier_code",e),placeholder:"Code"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",defaultValue:l.supplier_name,onBlur:e=>o("supplier_name",e.target.value),onKeyDown:e=>r("supplier_name",e),placeholder:"Name"})]}),t.jsxs("div",{className:"flex ",children:[t.jsx(s,{className:"p-3 w-6/12 text-sm content-center text-right",htmlFor:"type",children:"PO Number"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10",type:"text",defaultValue:l.ponumber_from,onBlur:e=>o("ponumber_from",e.target.value),onKeyDown:e=>r("ponumber_from",e),placeholder:"From"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",defaultValue:l.ponumber_to,onBlur:e=>o("ponumber_to",e.target.value),onKeyDown:e=>r("ponumber_to",e),placeholder:"To"})]}),t.jsxs("div",{className:"flex ",children:[t.jsx(s,{className:"p-3 w-6/12 text-sm content-center text-right",htmlFor:"type",children:"Control No."}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10",type:"text",defaultValue:l.controlno_from,onBlur:e=>o("controlno_from",e.target.value),onKeyDown:e=>r("controlno_from",e),placeholder:"From"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",defaultValue:l.controlno_to,onBlur:e=>o("controlno_to",e.target.value),onKeyDown:e=>r("controlno_to",e),placeholder:"To"})]}),t.jsxs("div",{className:"flex ",children:[t.jsx(s,{className:"p-3 w-6/12 text-sm content-center text-right",htmlFor:"type",children:"Material"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10",type:"text",defaultValue:l.matcode_from,onBlur:e=>o("matcode_from",e.target.value),onKeyDown:e=>r("matcode_from",e),placeholder:"From"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",defaultValue:l.matcode_to,onBlur:e=>o("matcode_to",e.target.value),onKeyDown:e=>r("matcode_to",e),placeholder:"To"})]}),t.jsxs("div",{className:"flex ",children:[t.jsx(s,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"type",children:"Short Text"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",defaultValue:l.short_text,onBlur:e=>o("short_text",e.target.value),onKeyDown:e=>r("short_text",e)})]}),t.jsxs("div",{className:"flex ",children:[t.jsx(s,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"type",children:"Created By"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",defaultValue:l.created_name,onBlur:e=>o("created_name",e.target.value),onKeyDown:e=>r("created_name",e)})]}),t.jsxs("div",{className:"flex ",children:[t.jsx(s,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"type",children:"Plant"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",defaultValue:l.plant,onBlur:e=>o("plant",e.target.value),onKeyDown:e=>r("plant",e)})]}),t.jsxs("div",{className:"flex ",children:[t.jsx(s,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"type",children:"Purchasing Group"}),t.jsx(a,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",defaultValue:l.purch_grp,onBlur:e=>o("purch_grp",e.target.value),onKeyDown:e=>r("purch_grp",e)})]}),t.jsxs("div",{className:"flex content-center justify-center gap-4 mb-5",children:[t.jsx(m,{onClick:u,variant:"outline",className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-52",children:"Filter"}),t.jsx(m,{onClick:x,variant:"secondary",className:" w-52",children:"Clear"})]})]})})]})}export{D as default};
