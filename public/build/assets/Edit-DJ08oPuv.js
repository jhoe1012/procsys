import{r as w,W as v,j as e}from"./app-CCoq69JG.js";import{M as b}from"./Modal-B52Wk9gE.js";import{L as r,I as o}from"./input-BDfD828S.js";import{A as C}from"./react-select-async.esm-BY_WAs5O.js";import{B as S}from"./button-DoBpF-57.js";import{S as h}from"./react-select.esm-CsbqgSHr.js";import"./transition-BIm4Rmlc.js";import"./index-D6YLH5uR.js";import"./utils-B3WcY1H0.js";function V({p_plants:x,p_approver:s}){var d;const[f,c]=w.useState(!1),{data:a,setData:l,patch:g,processing:p,reset:i,errors:F}=v({type:s.type,typeChoice:[{label:s.type.toUpperCase(),value:s.type.toUpperCase()}],plant:s.plant,plantChoice:[{value:s.plant,label:`${s.plant}-${(d=s.plants)==null?void 0:d.name1}`}],user_id:s.user_id,user_idChoice:[{value:s.user_id,label:s.user.name}],position:s.position,amount_from:s.amount_from,amount_to:s.amount_to,seq:s.seq,desc:s.desc,_method:"patch"}),j=[{label:"PO",value:"PO"},{label:"PR",value:"PR"}],y=t=>{t.preventDefault(),g(route("approver.update",s.id),{preserveScroll:!0,onSuccess:()=>m(),onFinish:()=>i()})},m=()=>{c(!1),i()},N=async t=>{if(!t)return[];try{return(await window.axios.get(route("user.search",{search:t}))).data.data.map(n=>({value:n.id,label:n.name,position:n.position}))}catch(u){return console.log("Error fetching data:",u),[]}};return e.jsxs("section",{className:"space-y-6",children:[e.jsx("svg",{onClick:()=>c(!0),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6 cursor-pointer text-blue-500",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"})}),e.jsx(b,{show:f,onClose:m,maxWidth:"lg",children:e.jsx("form",{onSubmit:y,children:e.jsxs("div",{className:"m-2",children:[e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"type",children:"Type"}),e.jsx(h,{id:"type",className:"m-2 w-full border-gray-500",value:a.typeChoice,options:j,onChange:t=>l({...a,type:t==null?void 0:t.value}),placeholder:"Select Type",required:!0})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"plant",children:"Plant"}),e.jsx(h,{id:"plant",className:"m-2 w-full border-gray-500",value:a.plantChoice,options:x,onChange:t=>l({...a,plant:t==null?void 0:t.value,plantChoice:t}),placeholder:"Select Plant",required:!0})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"user",children:"User"}),e.jsx(C,{id:"user",className:"m-2 w-full border-gray-500",cacheOptions:!0,defaultOptions:!0,loadOptions:N,value:a.user_idChoice,onChange:t=>{l({...a,user_id:t.value,user_idChoice:t,position:t.position})},placeholder:"Select User",required:!0})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"position",children:"Position"}),e.jsx(o,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",id:"position",defaultValue:a.position,value:a.position,onChange:t=>l("position",t.target.value)})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"amount_from",children:"Amount From"}),e.jsx(o,{className:"m-2 w-full border-gray-300 h-10 ",type:"number",id:"amount_from",defaultValue:a.amount_from,onChange:t=>l("amount_from",parseFloat(t.target.value))})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"amount_to",children:"Amount To"}),e.jsx(o,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",id:"amount_to",defaultValue:a.amount_to,onChange:t=>l("amount_to",parseFloat(t.target.value))})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"seq",children:"Sequence"}),e.jsx(o,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",id:"seq",defaultValue:a.seq,onChange:t=>l("seq",parseFloat(t.target.value))})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"desc",children:"Description"}),e.jsx(o,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",id:"desc",defaultValue:a.desc,onChange:t=>l("desc",t.target.value)})]}),e.jsx("div",{className:"grid justify-items-center m-3",children:e.jsx(S,{variant:"outline",disabled:p,className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-60",children:"Save"})})]})})})]})}export{V as default};
