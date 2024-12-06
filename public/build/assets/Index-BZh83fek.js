import{r as d,j as e,Y as h,y as m}from"./app-B0xb5DNB.js";import{A as o}from"./AuthenticatedLayout-PecQUZue.js";import{P as j}from"./Pagination-CWoQfskU.js";import{T as c}from"./TextInput-CzDXQhZK.js";import{u as N,T as y}from"./toaster-CDnCc973.js";import u from"./Create-C7JNEBy_.js";import f from"./Edit-B7YlA9Vo.js";import"./ApplicationLogo-WKTOXv7I.js";import"./transition-nICMswLC.js";import"./x-DigYKOUu.js";import"./index-Cm-6xkS1.js";import"./utils-CG2i-Alp.js";import"./Modal-S2IAVDm4.js";import"./input-D1d6vgBV.js";import"./button-BU5iTi24.js";function I({auth:i,vendors:r,queryParams:t,plant:g,message:p}){const{toast:n}=N();d.useEffect(()=>{p!=null&&p.success&&n({title:p.success})},[]),t=t||{};const a=(s,x)=>{x?t[s]=x:delete t[s],m.get(route("vendor.index"),t)},l=(s,x)=>{x.key==="Enter"&&a(s,x.target.value)};return e.jsxs(o,{user:i.user,menus:i.menu,header:e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Vendor List"}),e.jsx(u,{})]}),children:[e.jsx(h,{title:"View Vendor"}),e.jsx(y,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsxs("div",{className:"bg-gray-50 text-black overflow-hidden shadow-sm sm:rounded-lg",children:[e.jsx("div",{className:"p-5 flex flex-wrap gap-2",children:e.jsx("div",{className:"flex-1 overflow-x-auto",children:e.jsxs("table",{className:"w-[130rem] text-xs text-left rtl:text-right text-gray-500 ",children:[e.jsxs("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500",children:[e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 py-2",children:e.jsx(c,{className:"h-7 text-xs p-1 m-0",defaultValue:t.supplier,onBlur:s=>a("supplier",s.target.value),onKeyDown:s=>l("supplier",s)})}),e.jsx("th",{className:"px-3 py-2"}),e.jsx("th",{className:"px-3 py-2"}),e.jsx("th",{className:"px-3 py-2"}),e.jsx("th",{className:"px-3 py-2",children:e.jsx(c,{className:"h-7 text-xs p-1 m-0",defaultValue:t.name_1,onBlur:s=>a("name_1",s.target.value),onKeyDown:s=>l("name_1",s)})}),e.jsx("th",{className:"px-3 py-2",children:e.jsx(c,{className:"h-7 text-xs p-1 m-0",defaultValue:t.city,onBlur:s=>a("city",s.target.value),onKeyDown:s=>l("city",s)})}),e.jsx("th",{className:"px-3 py-2"}),e.jsx("th",{className:"px-3 py-2"}),e.jsx("th",{className:"px-3 py-2",children:e.jsx(c,{className:"h-7 text-xs p-1 m-0",defaultValue:t.postal_code,onBlur:s=>a("postal_code",s.target.value),onKeyDown:s=>l("postal_code",s)})}),e.jsx("th",{className:"px-3 py-2",children:e.jsx(c,{className:"h-7 text-xs p-1 m-0",defaultValue:t.street,onBlur:s=>a("street",s.target.value),onKeyDown:s=>l("street",s)})})]}),e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 py-2",children:"Supplier"}),e.jsx("th",{className:"px-3 py-2",children:"Accnt Grp"}),e.jsx("th",{className:"px-3 py-2",children:"Tax Number"}),e.jsx("th",{className:"px-3 py-2",children:"Tax Number 2"}),e.jsx("th",{className:"px-3 py-2",children:"Name 1"}),e.jsx("th",{className:"px-3 py-2",children:"City"}),e.jsx("th",{className:"px-3 py-2",children:"Country"}),e.jsx("th",{className:"px-3 py-2",children:"District"}),e.jsx("th",{className:"px-3 py-2",children:"Postal Code"}),e.jsx("th",{className:"px-3 py-2",children:"Street"}),e.jsx("th",{className:"px-3 py-2",children:"Telephone 1"}),e.jsx("th",{className:"px-3 py-2",children:"Telephone 2"}),e.jsx("th",{className:"px-3 py-2",children:"Vat Reg No"}),e.jsx("th",{className:"px-3 py-2",children:"Action"})]})]}),e.jsx("tbody",{className:"text-xs text-black",children:r.data.length>0?r.data.map(s=>e.jsxs("tr",{className:"bg-white border-b",children:[e.jsx("td",{className:"px-3 py-2",children:s.supplier}),e.jsx("td",{className:"px-3 py-2",children:s.account_group}),e.jsx("td",{className:"px-3 py-2",children:s.tax_number}),e.jsx("td",{className:"px-3 py-2",children:s.tax_number_2}),e.jsx("td",{className:"px-3 py-2 text-nowrap",children:s.name_1}),e.jsx("td",{className:"px-3 py-2",children:s.city}),e.jsx("td",{className:"px-3 py-2",children:s.country}),e.jsx("td",{className:"px-3 py-2",children:s.district}),e.jsx("td",{className:"px-3 py-2",children:s.postal_code}),e.jsx("td",{className:"px-3 py-2 text-nowrap",children:s.street}),e.jsx("td",{className:"px-3 py-2",children:s.telephone_1}),e.jsx("td",{className:"px-3 py-2",children:s.telephone_2}),e.jsx("td",{className:"px-3 py-2",children:s.vat_reg_no}),e.jsx("td",{className:"px-3 py-2",children:e.jsx(f,{p_vendor:s})})]},s.id)):e.jsx("td",{className:"px-3 py-2 text-center",colSpan:9,children:"No Records Found"})})]})})}),e.jsx("div",{className:"mb-4",children:e.jsx(j,{links:r.meta.links})})]})})})]})}export{I as default};