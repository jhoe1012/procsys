import{r as d,j as e,Y as _,a as u,y as v}from"./app-btmnkiCu.js";import{A as w}from"./AuthenticatedLayout-BWaSBkmD.js";import{P as D}from"./Pagination-DnJ4OSzT.js";import{T as r}from"./TextInput-DsT80sq8.js";import{u as V,T as B}from"./toaster-sF_rjYHh.js";import{M as E}from"./Modal-a3_IHzSi.js";import"./ApplicationLogo-Zeo8fepj.js";import"./transition-AaZFJKij.js";import"./x-DvNaT56w.js";import"./index-BaK1AVJf.js";import"./utils-BVvJlSg8.js";function K({title:x,titleId:o,...t},i){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":o},t),x?d.createElement("title",{id:o},x):null,d.createElement("path",{fillRule:"evenodd",d:"M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z",clipRule:"evenodd"}))}const R=d.forwardRef(K),L=({auth:x,gr_header:o,queryParams:t={},message:i})=>{const[c,y]=d.useState(null),[j,N]=d.useState([]),[f,h]=d.useState(!1),{toast:b}=V();t=t||{},d.useEffect(()=>{i!=null&&i.success&&b({title:i.success})},[]),d.useEffect(()=>{c&&N(c.grmaterials||[])},[c]);const a=(s,n)=>{n?t[s]=n:delete t[s],v.get(route("gr.index"),t)},l=(s,n)=>{n.key==="Enter"&&a(s,n.target.value)},g=()=>{h(!1)};return e.jsxs(w,{user:x.user,menus:x.menu,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Goods Receipt List"}),children:[e.jsx(_,{title:"View PO "}),e.jsx(B,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsx("div",{className:"bg-gray-50 text-black overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"p-5 flex flex-wrap gap-2",children:[e.jsxs("div",{className:"flex-1",children:[e.jsxs("table",{className:" table-auto w-full text-xs text-left rtl:text-right text-gray-500",children:[e.jsxs("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500",children:[e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 py-2",children:" "}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.gr_number_from,onBlur:s=>a("gr_number_from",s.target.value),onKeyDown:s=>l("gr_number_from",s),placeholder:"GR No. From"})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.po_number_from,onBlur:s=>a("po_number_from",s.target.value),onKeyDown:s=>l("po_number_from",s),placeholder:"PO No. From"})}),e.jsx("th",{className:"px-1 py-2"}),e.jsx("th",{className:"px-1 py-2"}),e.jsx("th",{className:"px-1 py-2"}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{type:"date",className:"h-7 text-xs p-1 m-0",defaultValue:t.entry_date_from,onBlur:s=>a("entry_date_from",s.target.value),onKeyDown:s=>l("entry_date_from",s)})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{type:"date",className:"h-7 text-xs p-1 m-0",defaultValue:t.actual_date_from,onBlur:s=>a("actual_date_from",s.target.value),onKeyDown:s=>l("actual_date_from",s)})})]}),e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 py-2",children:" "}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.gr_number_to,onBlur:s=>a("gr_number_to",s.target.value),onKeyDown:s=>l("gr_number_to",s),placeholder:"GR No. To"})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.po_number_to,onBlur:s=>a("po_number_to",s.target.value),onKeyDown:s=>l("po_number_to",s),placeholder:"PO No. To"})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.plant,onBlur:s=>a("plant",s.target.value),onKeyDown:s=>l("plant",s),placeholder:"Plant"})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 w-full text-xs p-1 m-0",defaultValue:t.vendor,onBlur:s=>a("vendor",s.target.value),onKeyDown:s=>l("vendor",s),placeholder:"Vendor"})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.entered_by,onBlur:s=>a("entered_by",s.target.value),onKeyDown:s=>l("entered_by",s),placeholder:"Entered By"})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{type:"date",className:"h-7 text-xs p-1 m-0",defaultValue:t.entry_date_to,onBlur:s=>a("entry_date_to",s.target.value),onKeyDown:s=>l("entry_date_to",s)})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{type:"date",className:"h-7 text-xs p-1 m-0",defaultValue:t.actual_date_to,onBlur:s=>a("actual_date_to",s.target.value),onKeyDown:s=>l("actual_date_to",s)})})]})]}),e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500",children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 py-2",children:" "}),e.jsx("th",{className:"px-3 py-2 w-[5%]",children:" Document Number"}),e.jsx("th",{className:"px-3 py-2 w-[5%]",children:" PO Number"}),e.jsx("th",{className:"px-3 py-2 w-[5%]",children:" Plant"}),e.jsx("th",{className:"px-3 py-2 w-[30%]",children:" Vendor"}),e.jsx("th",{className:"px-3 py-2",children:" Entered By"}),e.jsx("th",{className:"px-3 py-2",children:" Entry Date"}),e.jsx("th",{className:"px-3 py-2",children:" Actual Date of Receipt"}),e.jsx("th",{className:"px-3 py-2"})]})}),e.jsx("tbody",{className:"text-xs text-black",children:o.data.length>0?o.data.map((s,n)=>{var p,m;return e.jsxs("tr",{className:"border-b "+(n%2===0?"bg-gray-100":"bg-white"),children:[e.jsx("td",{className:"px-3 py-2",children:e.jsx("input",{type:"radio",name:"sel",onClick:()=>{y(s),h(!0)}})}),e.jsx("td",{className:"px-3 py-2",children:s.gr_number}),e.jsx("td",{className:"px-3 py-2",children:s.po_number}),e.jsxs("td",{className:"px-3 py-2",children:[s.plant," - ",(p=s.plants)==null?void 0:p.name1]}),e.jsxs("td",{className:"px-3 py-2",children:[s.vendor_id," - ",(m=s.vendors)==null?void 0:m.name_1]}),e.jsx("td",{className:"px-3 py-2",children:s.created_name}),e.jsx("td",{className:"px-3 py-2",children:s.entry_date}),e.jsx("td",{className:"px-3 py-2",children:s.actual_date}),e.jsx("td",{className:"px-3 py-2",children:e.jsx("a",{className:"",href:route("gr.print",s.id),target:"_blank",children:e.jsx(R,{className:"w-6 h-6  text-green-600 hover:fill-green-300 transition-colors"})})})]},s.id)}):e.jsx("td",{className:"px-3 py-2 text-center",colSpan:8,children:"No Records Found"})})]}),e.jsx(D,{links:o.meta.links})]}),e.jsxs(E,{show:f,onClose:g,maxWidth:"3xl",children:[e.jsx("div",{className:"flex-1 p-5",children:e.jsxs("table",{className:"w-full text-xs text-left rtl:text-right text-gray-500",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500",children:e.jsx("tr",{className:"text-nowrap",children:e.jsx("th",{className:"px-3 py-2",children:" "})})}),e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500",children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 py-2",children:"Stat"}),e.jsx("th",{className:"px-3 py-2",children:"ItemNo"}),e.jsx("th",{className:"px-3 py-2",children:"Material"}),e.jsx("th",{className:"px-3 py-2",children:"Short Text"}),e.jsx("th",{className:"px-3 py-2",children:"Qty"}),e.jsx("th",{className:"px-3 py-2",children:"Unit"}),e.jsx("th",{className:"px-3 py-2",children:"PO Del Date"}),e.jsx("th",{className:"px-3 py-2",children:"Batch"}),e.jsx("th",{className:"px-3 py-2",children:"Mfg Date"}),e.jsx("th",{className:"px-3 py-2",children:"SLED/BBD"}),e.jsx("th",{className:"px-3 py-2",children:"POItem"})]})}),c&&e.jsx("tbody",{className:"text-xs text-black",children:j.map(s=>{var n,p,m;return e.jsxs("tr",{className:"bg-white border-b",children:[e.jsx("td",{className:"px-3 py-2",children:s.is_cancel?e.jsx("span",{className:"inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10",children:"Cancelled"}):""}),e.jsx("td",{className:"px-3 py-2",children:s.item_no}),e.jsx("td",{className:"px-3 py-2",children:s.mat_code}),e.jsx("td",{className:"px-3 py-2",children:s.short_text}),e.jsx("td",{className:"px-3 py-2",children:s.gr_qty}),e.jsx("td",{className:"px-3 py-2",children:s.unit}),e.jsx("td",{className:"px-3 py-2",children:(n=s.po_deliv_date)==null?void 0:n.toString()}),e.jsx("td",{className:"px-3 py-2",children:s.batch}),e.jsx("td",{className:"px-3 py-2",children:(p=s.mfg_date)==null?void 0:p.toString()}),e.jsx("td",{className:"px-3 py-2",children:(m=s.sled_bbd)==null?void 0:m.toString()})]},s.id)})})]})}),e.jsx("div",{className:"flex flex-row-reverse pt-2",children:e.jsx("div",{children:(c==null?void 0:c.id)&&e.jsxs(e.Fragment,{children:[x.permissions.gr.cancel&&e.jsx(u,{href:route("gr.edit",c.gr_number),className:" p-3 m-3 bg-gray-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:bg-gray-400 hover:text-accent-foreground hover:border-gray-500",children:"Cancel GR"}),e.jsx(u,{href:route("gr.show",c.gr_number),className:" p-3 m-3 bg-yellow-500 inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:bg-yellow-400 hover:text-accent-foreground hover:border-gray-500",children:"Display GR"})]})})})]})]})})})})]})};export{L as default};