import{r as x,W as h,j as e}from"./app-DrKxL2JF.js";import{P as v}from"./PrimaryButton-bE9grA7p.js";import{M as j}from"./Modal-CO4rdEEs.js";import{S as b}from"./SecondaryButton-BUxGX97C.js";import{B as y}from"./button-ByqBGolh.js";import{T as C}from"./textarea-BhhGCQu7.js";import"./transition-FMJMOV8j.js";import"./utils-hV7mXc9m.js";function U({p_po_number:n,p_type:r="",p_title:s="",p_disable:l=!1}){const[c,t]=x.useState(!1),{data:m,setData:p,post:i,processing:d,reset:S,errors:A}=h({po_number:n,type:r,message:""}),u=()=>{t(!0)},f=a=>{a.preventDefault(),i(route("po.approve"),{preserveScroll:!0,onSuccess:()=>o()})},o=()=>{t(!1)},g={approved:"bg-green-500 hover:bg-green-600",rejected:"bg-red-500 hover:bg-red-600",rework:""}[r]||"";return e.jsxs(e.Fragment,{children:[e.jsx(y,{onClick:u,variant:"outline",className:g+" mx-3 disabled:opacity-100 disabled:bg-gray-100 ",disabled:l,children:s.toUpperCase()}),e.jsx(j,{show:c,onClose:o,children:e.jsxs("form",{onSubmit:f,className:"p-6",children:[e.jsxs("h2",{className:"text-lg font-medium text-gray-900",children:["Are you sure you want to ",s," this Purchase Order ?"]}),r!="approved"?e.jsx(C,{placeholder:"message",value:m.message,onChange:a=>p("message",a.target.value),required:!0}):"",e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(b,{onClick:o,children:"Cancel"}),e.jsx(v,{className:"ms-3",disabled:d,children:s.toUpperCase()})]})]})})]})}export{U as default};
