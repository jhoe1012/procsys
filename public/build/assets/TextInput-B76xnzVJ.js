import{r,j as c}from"./app-DrKxL2JF.js";const d=r.forwardRef(function({type:o="text",className:t="",isFocused:u=!1,...n},f){const s=r.useRef(null);return r.useImperativeHandle(f,()=>({focus:()=>{var e;return(e=s.current)==null?void 0:e.focus()}})),r.useEffect(()=>{var e;u&&((e=s.current)==null||e.focus())},[]),c.jsx("input",{...n,type:o,className:"border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "+t,ref:s})});export{d as T};
