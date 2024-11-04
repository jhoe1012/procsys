import{r as N,W as y,j as e}from"./app-lph7DMHm.js";import{M as w}from"./Modal-DbvRjVZS.js";import{L as r,I as l}from"./input-BUqrT3tp.js";import{A as b}from"./react-select-async.esm-CQrfQfwx.js";import{B as d}from"./button-ChWVvjJW.js";import{S as u}from"./react-select.esm-CuOhGoD8.js";import"./transition-COqQaIw7.js";import"./index-C-8tPshn.js";import"./utils-3WfyHtJO.js";import"./useStateManager-7e1e8489.esm-am5GhQpP.js";function E({p_plants:h}){const[x,n]=N.useState(!1),{data:s,setData:a,post:p,processing:f,reset:c,errors:C}=y({type:"",plant:"",user_id:0,position:"",amount_from:0,amount_to:0,seq:0,desc:""}),g=[{label:"PO",value:"PO"},{label:"PR",value:"PR"}],j=t=>{t.preventDefault(),p(route("approver.store"),{preserveScroll:!0,onSuccess:()=>i(),onFinish:()=>c()})},i=()=>{n(!1),c()},v=async t=>{if(!t)return[];try{return(await window.axios.get(route("user.search",{search:t}))).data.data.map(o=>({value:o.id,label:o.name,position:o.position}))}catch(m){return console.log("Error fetching data:",m),[]}};return e.jsxs("section",{className:"space-y-6",children:[e.jsx(d,{onClick:()=>n(!0),children:"Add"}),e.jsx(w,{show:x,onClose:i,maxWidth:"lg",children:e.jsx("form",{onSubmit:j,children:e.jsxs("div",{className:"m-2",children:[e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"type",children:"Type"}),e.jsx(u,{id:"type",className:"m-2 w-full border-gray-500",value:s.typeChoice,options:g,onChange:t=>a({...s,type:t==null?void 0:t.value}),placeholder:"Select Type",required:!0})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"plant",children:"Plant"}),e.jsx(u,{id:"plant",className:"m-2 w-full border-gray-500",value:s.plantChoice,options:h,onChange:t=>a({...s,plant:t==null?void 0:t.value,plantChoice:t}),placeholder:"Select Plant",required:!0})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"user",children:"User"}),e.jsx(b,{id:"user",className:"m-2 w-full border-gray-500",cacheOptions:!0,defaultOptions:!0,loadOptions:v,value:s.user_idChoice,onChange:t=>{a({...s,user_id:t.value,user_idChoice:t,position:t.position})},placeholder:"Select User",required:!0})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"position",children:"Position"}),e.jsx(l,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",id:"position",defaultValue:s.position,onChange:t=>a("position",t.target.value)})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"amount_from",children:"Amount From"}),e.jsx(l,{className:"m-2 w-full border-gray-300 h-10 ",type:"number",id:"amount_from",defaultValue:s.amount_from,onChange:t=>a("amount_from",parseFloat(t.target.value))})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"amount_to",children:"Amount To"}),e.jsx(l,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",id:"amount_to",defaultValue:s.amount_to,onChange:t=>a("amount_to",parseFloat(t.target.value))})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"seq",children:"Sequence"}),e.jsx(l,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",id:"seq",defaultValue:s.seq,onChange:t=>a("seq",parseFloat(t.target.value))})]}),e.jsxs("div",{className:"flex ",children:[e.jsx(r,{className:"p-3 w-3/12 text-sm content-center text-right",htmlFor:"desc",children:"Description"}),e.jsx(l,{className:"m-2 w-full border-gray-300 h-10 ",type:"text",id:"desc",defaultValue:s.desc,onChange:t=>a("desc",t.target.value)})]}),e.jsx("div",{className:"grid justify-items-center m-3",children:e.jsx(d,{variant:"outline",disabled:f,className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] w-60",children:"Save"})})]})})})]})}export{E as default};
