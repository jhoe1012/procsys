import{r as g,W as h,j as e}from"./app-lph7DMHm.js";import{P as v}from"./PrimaryButton-Blv17_dW.js";import{M as j}from"./Modal-DbvRjVZS.js";import{S as b}from"./SecondaryButton-DJ4CFcxs.js";import{B as y}from"./button-ChWVvjJW.js";import{T as C}from"./textarea-BW3f6LZR.js";import"./transition-COqQaIw7.js";import"./utils-3WfyHtJO.js";function U({p_po_number:n,p_type:r="",p_title:s="",p_disable:l=!1}){const[c,t]=g.useState(!1),{data:p,setData:i,post:m,processing:d,reset:N,errors:S}=h({po_number:n,type:r,message:""}),u=()=>{t(!0)},f=a=>{a.preventDefault(),m(route("po.approve"),{preserveScroll:!0,onSuccess:()=>o()})},o=()=>{t(!1)},x={approved:"bg-green-500 hover:bg-green-600",rejected:"bg-red-500 hover:bg-red-600",rework:""}[r]||"";return e.jsxs(e.Fragment,{children:[e.jsx(y,{onClick:u,variant:"outline",className:x+" mx-3 disabled:opacity-100 disabled:bg-gray-100 ",disabled:l,children:s.toUpperCase()}),e.jsx(j,{show:c,onClose:o,children:e.jsxs("form",{onSubmit:f,className:"p-6",children:[e.jsxs("h2",{className:"text-lg font-medium text-gray-900",children:["Are you sure you want to ",s," this Purchase Order ?"]}),e.jsx(C,{placeholder:"Notes",value:p.message,onChange:a=>i("message",a.target.value),required:r!="approved"}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(b,{onClick:o,children:"Cancel"}),e.jsx(v,{className:"ms-3",disabled:d,children:s.toUpperCase()})]})]})})]})}export{U as default};