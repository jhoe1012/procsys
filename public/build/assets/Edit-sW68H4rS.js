import{r as f,W as M,j as r}from"./app-CCoq69JG.js";import{M as $}from"./Modal-B52Wk9gE.js";import{L as c,I as n}from"./input-BDfD828S.js";import{A as g}from"./react-select-async.esm-BY_WAs5O.js";import{B as O}from"./button-DoBpF-57.js";import{S as p}from"./react-select.esm-CsbqgSHr.js";import"./transition-BIm4Rmlc.js";import"./index-D6YLH5uR.js";import"./utils-B3WcY1H0.js";function W({p_plants:j,p_material:t}){var m,h,x;const[y,d]=f.useState(!1),[w,N]=f.useState([]),{data:a,setData:s,patch:b,processing:C,reset:i,errors:V}=M({id:t.id,vendor:t.vendor,vendorChoice:[{value:t.vendor,label:`${t.vendor} - ${(m=t.vendors)==null?void 0:m.name_1}`}],plant:t.plant,plantChoice:[{value:t.plant,label:`${t.plant} - ${(h=t.plants)==null?void 0:h.name1}`}],mat_code:t.mat_code,mat_codeChoice:[{value:t.mat_code,label:`${t.mat_code} - ${(x=t.materials)==null?void 0:x.mat_desc}`}],currency:t.currency,price:t.price,per_unit:t.per_unit,uom:t.uom,uomChoice:[{label:t.uom,value:t.uom}],valid_from:t.valid_from,valid_to:t.valid_to,min_order_qty:t.min_order_qty,_method:"patch"}),F=e=>{e.preventDefault(),b(route("net_price.update",t.id),{preserveScroll:!0,onSuccess:()=>u(),onFinish:()=>i()})},u=()=>{d(!1),i()},_=async e=>{if(!e)return[];try{return(await window.axios.get(route("vendor.search",{search:e}))).data.data.map(o=>({value:o.supplier,label:`${o.supplier} - ${o.name_1}`}))}catch(l){return console.log("Error fetching data:",l),[]}},S=async e=>{if(!e)return[];try{return(await window.axios.get(route("material.search",{search:e}))).data.data.map(o=>({value:o.mat_code,label:`${o.mat_code} - ${o.mat_desc}`}))}catch(l){return console.log("Error fetching data:",l),[]}},q=async e=>{if(!e)return[];try{const l=await window.axios.get(route("uom.search",{search:e}));console.log(l.data.data);const o=l.data.data.map(v=>({value:v.alt_uom,label:v.alt_uom}));N(o)}catch(l){console.log("Error fetching data:",l)}};return r.jsxs("section",{className:"space-y-6",children:[r.jsx("svg",{onClick:()=>d(!0),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6 cursor-pointer text-blue-500",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"})}),r.jsx($,{show:y,onClose:u,maxWidth:"lg",children:r.jsx("form",{onSubmit:F,children:r.jsxs("div",{className:"m-2",children:[r.jsxs("div",{className:"flex ",children:[r.jsx(c,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"vendor",children:"Vendor"}),r.jsx(g,{className:"m-2 w-full border-gray-500",cacheOptions:!0,defaultOptions:!0,loadOptions:_,value:a.vendorChoice,defaultValue:a.vendor,onChange:e=>s({...a,vendor:e==null?void 0:e.value,vendorChoice:e}),placeholder:"Select Vendor",required:!0})]}),r.jsxs("div",{className:"flex ",children:[r.jsx(c,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"plant",children:"Plant"}),r.jsx(p,{id:"plant",className:"m-2 w-full border-gray-500",value:a.plantChoice,options:j,onChange:e=>s({...a,plant:e==null?void 0:e.value,plantChoice:e}),placeholder:"Select Plant",required:!0})]}),r.jsxs("div",{className:"flex ",children:[r.jsx(c,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"material",children:"Material"}),r.jsx(g,{className:"m-2 w-full border-gray-500",cacheOptions:!0,defaultOptions:!0,loadOptions:S,value:a.mat_codeChoice,onChange:e=>{s({...a,mat_code:e==null?void 0:e.value,mat_codeChoice:e}),q(e==null?void 0:e.value)},placeholder:"Select Material",required:!0})]}),r.jsxs("div",{className:"flex ",children:[r.jsx(c,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"uom",children:"Unit of Measure"}),r.jsx(p,{id:"uom",className:"m-2 w-full border-gray-500",value:a.uomChoice,options:w,onChange:e=>s({...a,uom:e==null?void 0:e.value,uomChoice:e}),placeholder:"Select UOM",required:!0})]}),r.jsxs("div",{className:"flex ",children:[r.jsx(c,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"currency",children:"Currency"}),r.jsx(n,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",id:"currency",defaultValue:a.currency,onChange:e=>s("currency",e.target.value)})]}),r.jsxs("div",{className:"flex ",children:[r.jsx(c,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"price",children:"Price"}),r.jsx(n,{className:"m-2 w-full border-gray-300 h-10 ",type:"number",id:"price",defaultValue:a.price,onChange:e=>s("price",parseFloat(e.target.value)),required:!0})]}),r.jsxs("div",{className:"flex ",children:[r.jsx(c,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"perUnit",children:"Per Unit"}),r.jsx(n,{className:"m-2 w-full border-gray-300 h-10 ",type:"number",id:"perUnit",defaultValue:a.per_unit,onChange:e=>s("per_unit",parseFloat(e.target.value)),required:!0})]}),r.jsxs("div",{className:"flex ",children:[r.jsx(c,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"minOrderQty",children:"Min Order Qty"}),r.jsx(n,{className:"m-2 w-full border-gray-300 h-10 ",type:"number",id:"minOrderQty",defaultValue:a.min_order_qty,onChange:e=>s("min_order_qty",parseFloat(e.target.value)),required:!0})]}),r.jsxs("div",{className:"flex ",children:[r.jsx(c,{className:"p-3 w-1/5 text-sm content-center text-right",htmlFor:"validFrom",children:"Valid From"}),r.jsx(n,{className:"m-2 w-4/12 border-gray-300 h-10 ",type:"date",id:"validFrom",defaultValue:a.valid_from,onChange:e=>s("valid_from",e.target.value),required:!0})]}),r.jsxs("div",{className:"flex ",children:[r.jsx(c,{className:"p-3 w-1/5 text-sm content-center text-right",htmlFor:"validTo",children:"Valid To"}),r.jsx(n,{className:"m-2 w-4/12 border-gray-300 h-10 ",type:"date",id:"validTo",defaultValue:a.valid_to,onChange:e=>s("valid_to",e.target.value),required:!0})]}),r.jsx("div",{className:"grid justify-items-center m-3",children:r.jsx(O,{variant:"outline",disabled:C,className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-60",children:"Update"})})]})})})]})}export{W as default};
