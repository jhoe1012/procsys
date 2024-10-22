import{r as d,j as e,Y as b,a as _,y as g}from"./app-DrKxL2JF.js";import{A as v}from"./AuthenticatedLayout-B_AKMOtl.js";import{M as w}from"./Modal-CO4rdEEs.js";import{P as D}from"./Pagination-Cvp7vLCN.js";import{T as r}from"./TextInput-B76xnzVJ.js";import{u as V,T as B}from"./toaster-BIxKQqvl.js";import{f as K}from"./utils-hV7mXc9m.js";import"./ApplicationLogo-CteZKUYX.js";import"./transition-FMJMOV8j.js";import"./x-PJ_KA_w5.js";import"./index-CCQEarVx.js";function Q({auth:p,po_header:o,queryParams:t={},message:n}){const[c,m]=d.useState(null),[j,u]=d.useState([]);t=t||{};const{toast:N}=V();d.useEffect(()=>{n!=null&&n.success&&N({title:n.success})},[]),d.useEffect(()=>{c&&u(c.pomaterials||[])},[c]);const a=(s,x)=>{x?t[s]=x:delete t[s],g.get(route("po.index"),t)},l=(s,x)=>{x.key==="Enter"&&a(s,x.target.value)},[y,i]=d.useState(!1),f=()=>{i(!1)};return e.jsxs(v,{user:p.user,menus:p.menu,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Purchase Order List"}),children:[e.jsx(b,{title:"View PO "}),e.jsx(B,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsx("div",{className:"bg-gray-50 text-black overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"p-5 flex flex-wrap gap-2",children:[e.jsxs("div",{className:"flex-1",children:[e.jsxs("table",{className:" table-auto w-full text-xs text-left rtl:text-right text-gray-500",children:[e.jsxs("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500",children:[e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 py-2",children:" "}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.po_number_from,onBlur:s=>a("po_number_from",s.target.value),onKeyDown:s=>l("po_number_from",s)})}),e.jsx("th",{className:"px-1 py-2"}),e.jsx("th",{className:"px-1 py-2"}),e.jsx("th",{className:"px-1 py-2"}),e.jsx("th",{className:"px-1 py-2"}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{type:"date",className:"h-7 text-xs p-1 m-0",defaultValue:t.doc_date_from,onBlur:s=>a("doc_date_from",s.target.value),onKeyDown:s=>l("doc_date_from",s)})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{type:"date",className:"h-7 text-xs p-1 m-0",defaultValue:t.deliv_date_from,onBlur:s=>a("deliv_date_from",s.target.value),onKeyDown:s=>l("deliv_date_from",s)})})]}),e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 py-2",children:" "}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.po_number_to,onBlur:s=>a("po_number_to",s.target.value),onKeyDown:s=>l("po_number_to",s)})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.control_no,onBlur:s=>a("control_no",s.target.value),onKeyDown:s=>l("control_no",s)})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.plant,onBlur:s=>a("plant",s.target.value),onKeyDown:s=>l("plant",s)})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.vendor,onBlur:s=>a("vendor",s.target.value),onKeyDown:s=>l("vendor",s)})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.created_name,onBlur:s=>a("created_name",s.target.value),onKeyDown:s=>l("created_name",s)})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{type:"date",className:"h-7 text-xs p-1 m-0",defaultValue:t.doc_date_to,onBlur:s=>a("doc_date_to",s.target.value),onKeyDown:s=>l("doc_date_to",s)})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{type:"date",className:"h-7 text-xs p-1 m-0",defaultValue:t.deliv_date_to,onBlur:s=>a("deliv_date_to",s.target.value),onKeyDown:s=>l("deliv_date_to",s)})}),e.jsx("th",{className:"px-1 py-2",children:e.jsx(r,{className:"h-7 text-xs p-1 m-0",defaultValue:t.status,onBlur:s=>a("status",s.target.value),onKeyDown:s=>l("status",s)})})]})]}),e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500",children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 py-2",children:" "}),e.jsx("th",{className:"px-3 py-2",children:" PO Number"}),e.jsx("th",{className:"px-3 py-2",children:" Control No."}),e.jsx("th",{className:"px-3 py-2",children:" Plant"}),e.jsx("th",{className:"px-3 py-2",children:" Vendor"}),e.jsx("th",{className:"px-3 py-2",children:" Created By"}),e.jsx("th",{className:"px-3 py-2",children:" Doc Date"}),e.jsx("th",{className:"px-3 py-2",children:" Deliv. Date"}),e.jsx("th",{className:"px-3 py-2",children:" Status"})]})}),e.jsx("tbody",{className:"text-xs text-black",children:o.data.length>0?o.data.map(s=>{var x,h;return e.jsxs("tr",{className:"bg-white border-b",children:[e.jsx("td",{className:"px-3 py-2",children:e.jsx("input",{type:"radio",name:"sel",onClick:()=>{m(s),i(!0)}})}),e.jsx("td",{className:"px-3 py-2",children:s.po_number}),e.jsx("td",{className:"px-3 py-2",children:s.control_no}),e.jsxs("td",{className:"px-3 py-2",children:[s.plant," - ",(x=s.plants)==null?void 0:x.name1]}),e.jsxs("td",{className:"px-3 py-2",children:[s.vendor_id," - ",(h=s.vendors)==null?void 0:h.name_1]}),e.jsx("td",{className:"px-3 py-2",children:s.created_name}),e.jsx("td",{className:"px-3 py-2",children:s.doc_date}),e.jsx("td",{className:"px-3 py-2",children:s.deliv_date}),e.jsx("td",{className:"px-3 py-2",children:s.status}),e.jsx("td",{className:"px-3 py-2"})]},s.id)}):e.jsx("td",{className:"px-3 py-2 text-center",colSpan:8,children:"No Records Found"})})]}),e.jsx(D,{links:o.meta.links})]}),e.jsxs(w,{show:y,onClose:f,maxWidth:"3xl",children:[e.jsx("div",{className:"flex-1 p-5",children:e.jsxs("table",{className:"w-full text-xs text-left rtl:text-right text-gray-500",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500",children:e.jsx("tr",{className:"text-nowrap",children:e.jsx("th",{className:"px-3 py-2",children:" "})})}),e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500",children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 py-2",children:"Stat"}),e.jsx("th",{className:"px-3 py-2",children:"itemNo"}),e.jsx("th",{className:"px-3 py-2",children:"Material "}),e.jsx("th",{className:"px-3 py-2",children:"Short Text"}),e.jsx("th",{className:"px-3 py-2",children:"Del Date"}),e.jsx("th",{className:"px-3 py-2",children:"Qty"}),e.jsx("th",{className:"px-3 py-2",children:"Unit"}),e.jsx("th",{className:"px-3 py-2",children:"Total Value"}),e.jsx("th",{className:"px-3 py-2",children:"Curr"}),e.jsx("th",{className:"px-3 py-2",children:"Requested By"})]})}),c&&e.jsx("tbody",{className:"text-xs text-black",children:j.map(s=>{var x;return e.jsxs("tr",{className:"bg-white border-b",children:[e.jsx("td",{className:"px-3 py-2",children:s.status}),e.jsx("td",{className:"px-3 py-2",children:s.item_no}),e.jsx("td",{className:"px-3 py-2",children:s.mat_code}),e.jsx("td",{className:"px-3 py-2",children:s.short_text}),e.jsx("td",{className:"px-3 py-2",children:(x=s.del_date)==null?void 0:x.toString()}),e.jsx("td",{className:"px-3 py-2",children:s.po_qty}),e.jsx("td",{className:"px-3 py-2",children:s.unit}),e.jsx("td",{className:"px-3 py-2",children:K(s.total_value??0)}),e.jsx("td",{className:"px-3 py-2",children:s.currency}),e.jsx("td",{className:"px-3 py-2",children:s.requested_by})]},s.id)})})]})}),e.jsx("div",{className:"flex flex-row-reverse pt-2",children:e.jsx("div",{children:(c==null?void 0:c.id)&&e.jsx(_,{href:route("po.edit",c.po_number),className:" p-3 m-3 bg-yellow-500 inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input  hover:bg-yellow-400 hover:text-accent-foreground hover:border-gray-500",children:"Display PO"})})})]})]})})})})]})}export{Q as default};