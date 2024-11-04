import{j as e,Y as p,y as d}from"./app-lph7DMHm.js";import{A as r}from"./AuthenticatedLayout-DhqJictr.js";import{P as i}from"./Pagination-DnBptapK.js";import n from"./GrReportFilter-DdhaFUIj.js";import{D as m}from"./DownloadButton-CF5kst3Z.js";import"./ApplicationLogo-BGTFa63i.js";import"./transition-COqQaIw7.js";import"./Modal-DbvRjVZS.js";import"./input-BUqrT3tp.js";import"./index-C-8tPshn.js";import"./utils-3WfyHtJO.js";import"./button-ChWVvjJW.js";import"./AdjustmentsHorizontalIcon-Bkf5lNRF.js";function G({auth:l,grReport:t,queryParams:a}){a=a||{};const x=s=>{d.get(route("report.gr"),s)};return e.jsxs(r,{user:l.user,menus:l.menu,header:e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"GR Report"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(n,{queryParams:a,filterReport:x}),e.jsx(m,{href:route("download.report.gr",{...a})})]})]}),children:[e.jsx(p,{title:"Good Receipt Report"}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsxs("div",{className:"bg-gray-50 text-black shadow-sm sm:rounded-lg ",children:[e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:" table-auto w-[130rem]   text-xs text-left rtl:text-right text-gray-500",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500",children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-1 py-2",children:"GR Number"}),e.jsx("th",{className:"px-1 py-2",children:"PO Number"}),e.jsx("th",{className:"px-1 py-2",children:"Created by"}),e.jsx("th",{className:"px-1 py-2",children:"Supplier"}),e.jsx("th",{className:"px-1 py-2",children:"Supplier Name"}),e.jsx("th",{className:"px-1 py-2",children:"Plant"}),e.jsx("th",{className:"px-1 py-2",children:"Entry Date"}),e.jsx("th",{className:"px-1 py-2",children:"Actual Receive Date "}),e.jsx("th",{className:"px-1 py-2",children:"Delivery Note"}),e.jsx("th",{className:"px-1 py-2",children:"Header Text"}),e.jsx("th",{className:"px-1 py-2",children:"Item No"}),e.jsx("th",{className:"px-1 py-2",children:"Mat Code"}),e.jsx("th",{className:"px-1 py-2",children:"Short Text"}),e.jsx("th",{className:"px-1 py-2",children:"Qty"}),e.jsx("th",{className:"px-1 py-2",children:"Unit"}),e.jsx("th",{className:"px-1 py-2",children:"Open PO"}),e.jsx("th",{className:"px-1 py-2",children:"Batch"}),e.jsx("th",{className:"px-1 py-2",children:"Mfg Date"}),e.jsx("th",{className:"px-1 py-2",children:"SLED / BBD"}),e.jsx("th",{className:"px-1 py-2",children:"Cancel Date"}),e.jsx("th",{className:"px-1 py-2",children:"Cancel by"})]})}),e.jsx("tbody",{className:"text-xs text-black",children:t.data.length>0?t.data.map((s,c)=>e.jsxs("tr",{className:"bg-white border-b",children:[e.jsx("td",{className:"px-3 py-2",children:s.gr_number}),e.jsx("td",{className:"px-3 py-2",children:s.po_number}),e.jsx("td",{className:"px-3 py-2",children:s.created_name}),e.jsx("td",{className:"px-3 py-2",children:s.supplier}),e.jsx("td",{className:"px-3 py-2",children:s.name_1}),e.jsx("td",{className:"px-3 py-2",children:s.plant}),e.jsx("td",{className:"px-3 py-2",children:s.entry_date}),e.jsx("td",{className:"px-3 py-2",children:s.actual_date}),e.jsx("td",{className:"px-3 py-2",children:s.delivery_note}),e.jsx("td",{className:"px-3 py-2",children:s.header_text}),e.jsx("td",{className:"px-3 py-2",children:s.item_no}),e.jsx("td",{className:"px-3 py-2",children:s.mat_code}),e.jsx("td",{className:"px-3 py-2",children:s.short_text}),e.jsx("td",{className:"px-3 py-2",children:s.gr_qty}),e.jsx("td",{className:"px-3 py-2",children:s.unit}),e.jsx("td",{className:"px-3 py-2",children:s.po_gr_qty}),e.jsx("td",{className:"px-3 py-2",children:s.batch}),e.jsx("td",{className:"px-3 py-2",children:s.mfg_date}),e.jsx("td",{className:"px-3 py-2",children:s.sled_bbd}),e.jsx("td",{className:"px-3 py-2",children:s.cancel_datetime}),e.jsx("td",{className:"px-3 py-2",children:s.cancel_by})]},c)):e.jsx("td",{className:"px-3 py-2 text-center",colSpan:17,children:"No Records Found"})})]})}),e.jsx(i,{links:t.links})]})})})]})}export{G as default};
