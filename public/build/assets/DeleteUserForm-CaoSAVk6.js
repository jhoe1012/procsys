import{j as e,r as i,W as w}from"./app-DrKxL2JF.js";import{I as g}from"./InputError-DIQa1jR5.js";import{I as j}from"./InputLabel-CKzQE_aj.js";import{M as N}from"./Modal-CO4rdEEs.js";import{S as b}from"./SecondaryButton-BUxGX97C.js";import{T as D}from"./TextInput-B76xnzVJ.js";import"./transition-FMJMOV8j.js";function d({className:o="",disabled:s,children:t,...r}){return e.jsx("button",{...r,className:`inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${s&&"opacity-25"} `+o,disabled:s,children:t})}function E({className:o=""}){const[s,t]=i.useState(!1),r=i.useRef(null),{data:u,setData:m,delete:p,processing:f,reset:l,errors:x}=w({password:""}),y=()=>{t(!0)},h=n=>{n.preventDefault(),p(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>a(),onError:()=>{var c;return(c=r.current)==null?void 0:c.focus()},onFinish:()=>l()})},a=()=>{t(!1),l()};return e.jsxs("section",{className:`space-y-6 ${o}`,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Delete Account"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."})]}),e.jsx(d,{onClick:y,children:"Delete Account"}),e.jsx(N,{show:s,onClose:a,children:e.jsxs("form",{onSubmit:h,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Are you sure you want to delete your account?"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."}),e.jsxs("div",{className:"mt-6",children:[e.jsx(j,{htmlFor:"password",value:"Password",className:"sr-only"}),e.jsx(D,{id:"password",type:"password",name:"password",ref:r,value:u.password,onChange:n=>m("password",n.target.value),className:"mt-1 block w-3/4",isFocused:!0,placeholder:"Password"}),e.jsx(g,{message:x.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(b,{onClick:a,children:"Cancel"}),e.jsx(d,{className:"ms-3",disabled:f,children:"Delete Account"})]})]})})]})}export{E as default};
