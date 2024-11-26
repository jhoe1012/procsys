import{r as h,j as s,Y as j,y as N}from"./app-btmnkiCu.js";import{A as u}from"./AuthenticatedLayout-BWaSBkmD.js";import{P as y}from"./Pagination-DnJ4OSzT.js";import{T as o}from"./TextInput-DsT80sq8.js";import{u as f,T as g}from"./toaster-sF_rjYHh.js";import b from"./Create-Dj3p1v5r.js";import v from"./Edit-CEI8AWE_.js";import"./ApplicationLogo-Zeo8fepj.js";import"./transition-AaZFJKij.js";import"./x-DvNaT56w.js";import"./index-BaK1AVJf.js";import"./utils-BVvJlSg8.js";import"./Modal-a3_IHzSi.js";import"./input-C7E1M1yg.js";import"./react-select-async.esm-B9taeCqP.js";import"./useStateManager-7e1e8489.esm-rQyh9xtB.js";import"./button-07BvRo0M.js";import"./react-select.esm-CUGRRgrw.js";function S({auth:c,materialValuation:r,queryParams:a,plant:i,message:l}){const{toast:m}=f();h.useEffect(()=>{l!=null&&l.success&&m({title:l.success})},[]),a=a||{};const x=(e,t)=>{t?a[e]=t:delete a[e],N.get(route("val_price.index"),a)},p=(e,t)=>{t.key==="Enter"&&x(e,t.target.value)};return s.jsxs(u,{user:c.user,menus:c.menu,header:s.jsxs("div",{className:"flex flex-row justify-between",children:[s.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Valuation Price List"}),s.jsx(b,{p_plants:i})]}),children:[s.jsx(j,{title:"View Valuation Price "}),s.jsx(g,{}),s.jsx("div",{className:"py-2",children:s.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:s.jsx("div",{className:"bg-gray-50 text-black overflow-hidden shadow-sm sm:rounded-lg",children:s.jsx("div",{className:"p-5 flex flex-wrap gap-2",children:s.jsxs("div",{className:"flex-1",children:[s.jsxs("table",{className:" table-auto w-full text-xs text-left rtl:text-right text-gray-500",children:[s.jsxs("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500",children:[s.jsxs("tr",{className:"text-nowrap",children:[s.jsx("th",{className:"px-3 py-2",children:s.jsx(o,{className:"h-7 text-xs p-1 m-0",defaultValue:a.plant,onBlur:e=>x("plant",e.target.value),onKeyDown:e=>p("plant",e)})}),s.jsx("th",{className:"px-3 py-2",children:s.jsx(o,{className:"h-7 text-xs p-1 m-0",defaultValue:a.material,onBlur:e=>x("material",e.target.value),onKeyDown:e=>p("material",e)})})]}),s.jsxs("tr",{className:"text-nowrap",children:[s.jsx("th",{className:"px-3 py-2",children:"Plant"}),s.jsx("th",{className:"px-3 py-2",children:"Material"}),s.jsx("th",{className:"px-3 py-2",children:"Currency"}),s.jsx("th",{className:"px-3 py-2",children:"Valuation Price"}),s.jsx("th",{className:"px-3 py-2",children:"UOM"}),s.jsx("th",{className:"px-3 py-2",children:"Valid From"}),s.jsx("th",{className:"px-3 py-2",children:"Valid To"}),s.jsx("th",{className:"px-3 py-2",children:"Action"})]})]}),s.jsx("tbody",{className:"text-xs text-black",children:r.data.length>0?r.data.map(e=>{var t,d,n;return s.jsxs("tr",{className:"bg-white border-b",children:[s.jsxs("td",{className:"px-3 py-2",children:[e.plant," - ",(t=e.plants)==null?void 0:t.name1]}),s.jsxs("td",{className:"px-3 py-2",children:[e.mat_code," - ",(d=e.material)==null?void 0:d.mat_desc]}),s.jsx("td",{className:"px-3 py-2",children:e.currency}),s.jsx("td",{className:"px-3 py-2",children:e.valuation_price}),s.jsx("td",{className:"px-3 py-2",children:(n=e.material)==null?void 0:n.base_uom}),s.jsx("td",{className:"px-3 py-2",children:e.valid_from}),s.jsx("td",{className:"px-3 py-2",children:e.valid_to}),s.jsx("td",{className:"px-3 py-2",children:s.jsx(v,{p_plants:i,p_material:e})})]},e.id)}):s.jsx("td",{className:"px-3 py-2 text-center",colSpan:8,children:"No Records Found"})})]}),s.jsx(y,{links:r.meta.links})]})})})})})]})}export{S as default};