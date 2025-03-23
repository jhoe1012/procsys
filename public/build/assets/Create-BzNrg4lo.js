import{r as P,W as D,j as e,Y as T,a as W}from"./app-9BfIP8Yt.js";/* empty css              */import{d as a}from"./index-f1KWvzcE.js";import{A as O}from"./react-select-async.esm-3sqDmmp1.js";import{B as I}from"./button-UluEiDe7.js";import{T as E,a as $,b as F,c as M,C as V,d as A}from"./tabs-CSAEFCKf.js";import{L as c,I as u}from"./input-B6LatCgn.js";import{S as G,a as R,b as B,c as L,d as H}from"./select-BlE8HqPq.js";import{u as Q,T as U}from"./toaster-C-nH-nj2.js";import{A as z}from"./AuthenticatedLayout-DNrtgEyS.js";import"./useStateManager-7e1e8489.esm-9tTtCMRh.js";import"./utils-BSdE8tDE.js";import"./toast-SiKyGAR4.js";import"./index-CzvjeGZW.js";import"./ApplicationLogo-BHU32V6c.js";import"./transition-6Z6DAD7I.js";const _e=({auth:m})=>{var v;const x=new Date().toISOString().substring(0,10),{toast:p}=Q(),[s,h]=P.useState([{id:void 0,gr_header_id:void 0,po_material_id:void 0,item_no:void 0,mat_code:void 0,short_text:void 0,po_gr_qty:void 0,gr_qty:void 0,unit:void 0,po_deliv_date:void 0,batch:void 0,mfg_date:void 0,sled_bbd:void 0,po_number:void 0,po_item:void 0,dci:void 0},{id:void 0,gr_header_id:void 0,po_material_id:void 0,item_no:void 0,mat_code:void 0,short_text:void 0,po_gr_qty:void 0,gr_qty:void 0,unit:void 0,po_deliv_date:void 0,batch:void 0,mfg_date:void 0,sled_bbd:void 0,po_number:void 0,po_item:void 0,dci:void 0}]),{data:d,setData:_,post:b,errors:K,reset:Y,processing:f}=D({id:0,gr_number:void 0,po_number:void 0,control_no:void 0,created_name:m.user.name,vendor_id:void 0,vendor_name:"",plant:m.user.plants!==void 0?(v=m.user.plants[0])==null?void 0:v.plant:"",entry_date:x,posting_date:x,actual_date:x,delivery_note:"",header_text:"",is_cancel:!1,grmaterials:[]}),y=[{...a.keyColumn("item_no",a.intColumn),title:"ItmNo",maxWidth:50,disabled:!0},{...a.keyColumn("mat_code",a.textColumn),title:"Material",maxWidth:130,disabled:!0},{...a.keyColumn("short_text",a.textColumn),title:"Short Text",maxWidth:350,disabled:!0},{...a.keyColumn("po_gr_qty",a.floatColumn),title:"PO Qty",maxWidth:130,disabled:!0},{...a.keyColumn("gr_qty",a.floatColumn),title:"Qty",maxWidth:130},{...a.keyColumn("unit",a.textColumn),title:"Unit",maxWidth:55},{...a.keyColumn("po_deliv_date",a.textColumn),title:"PO Del Date",maxWidth:130,disabled:!0},{...a.keyColumn("batch",a.textColumn),title:"Batch",maxWidth:130},{...a.keyColumn("mfg_date",a.dateColumn),title:"Mfg Date",maxWidth:130},{...a.keyColumn("sled_bbd",a.dateColumn),title:"SLED/BBD",maxWidth:130},{...a.keyColumn("po_item",a.textColumn),title:"PO Item",maxWidth:55,disabled:!0},{...a.keyColumn("dci",a.checkboxColumn),title:"DCI",maxWidth:55}],j={"--dsg-header-text-color":"rgb(10, 10, 10)","--dsg-cell-disabled-background-color":"rgb(245, 245, 245)","--dsg-border-color":"#bfbdbd"},C=async(t,r)=>{const n=[...t],l=["KG","G"];for(const o of r)if(o.type==="UPDATE"){const i=n[o.fromRowIndex];i.item_no=(o.fromRowIndex+1)*10;const g=i.po_gr_qty+i.po_gr_qty*.1;i.po_gr_qty-i.po_gr_qty*.1,l.includes(i.unit)?i.gr_qty=i.gr_qty>g?g:i.gr_qty:i.gr_qty=i.gr_qty>i.po_gr_qty?i.po_gr_qty:i.gr_qty}h(n),_({...d,grmaterials:n})},N=()=>{var n,l;let t=!0;const r=s.filter(o=>o.mat_code!==void 0).map((o,i)=>({...o,item_no:(i+1)*10}));if(h(r),r.length<=0)return p({variant:"destructive",description:"Please add atleast 1 item"}),!1;for(let o=0;o<s.length;o++)if(s[o].mat_code!==void 0&&s[o].mat_code!==""){if(s[o].gr_qty===void 0||((n=s[o])==null?void 0:n.gr_qty)<=0){p({variant:"destructive",description:`Please enter quantity for item no ${s[o].item_no}`}),t=!1;break}if(s[o].unit===void 0||((l=s[o])==null?void 0:l.unit)===null){p({variant:"destructive",description:`Please enter unit for item no ${s[o].item_no}`}),t=!1;break}}return t},w=async t=>{try{const r=await window.axios.get(route("po.details",t)),n=r.data.pomaterials.map(l=>({id:void 0,gr_header_id:void 0,po_material_id:l.id,item_no:void 0,mat_code:l.mat_code,short_text:l.short_text,po_gr_qty:l.po_gr_qty,gr_qty:void 0,unit:l.unit,po_deliv_date:l.del_date,batch:void 0,mfg_date:null,sled_bbd:null,po_number:r.data.po_number,po_item:l.item_no,dci:!1}));_({...d,po_number:r.data.po_number,control_no:r.data.control_no,plant:r.data.plants.plant,vendor_id:r.data.vendors.supplier,vendor_name:`${r.data.vendors.supplier} - ${r.data.vendors.name_1}`}),h(n)}catch(r){console.log("Error fetching po info: ",r)}},q=async t=>{if(!t)return[];try{return(await window.axios.get(route("po-control.search",{search:t}))).data.map(n=>({value:n.po_number,label:`${n.control_no} | ${n.po_number}`}))}catch(r){return console.log("Error fetching data:",r),[]}},S=async t=>{t.preventDefault(),N()&&b(route("gr.store"))},k={control:t=>({...t,minHeight:"1.75rem",height:"1.75rem",fontSize:"0.875rem",borderColor:"hsl(var(--input))"}),valueContainer:t=>({...t,height:"1.75rem",padding:"0 6px"}),input:t=>({...t,margin:"0px"}),indicatorSeparator:()=>({display:"none"}),indicatorsContainer:t=>({...t,height:"1.75rem"})};return e.jsxs(z,{user:m.user,menus:m.menu,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Create Goods Receipt"}),children:[e.jsx(T,{title:"PO Create"}),e.jsx(U,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsx("div",{className:"bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("form",{onSubmit:S,children:[e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(c,{children:" "}),e.jsx(u,{type:"text",defaultValue:"Goods Reciept",disabled:!0})]}),e.jsxs("div",{className:"flex-none w-60",children:[e.jsx(c,{children:"PO Number"}),e.jsx(O,{cacheOptions:!0,defaultOptions:!0,loadOptions:q,value:d.po_number?{label:`${d.control_no} | ${d.po_number}`,value:d.po_number}:null,onChange:t=>{w(t==null?void 0:t.value)},placeholder:"Select PO Number",required:!0,styles:k})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(c,{htmlFor:"gr_number",children:"Document Number"}),e.jsx(u,{type:"text",id:"gr_number",value:d.gr_number,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-72",children:[e.jsx(c,{children:"Vendor"}),e.jsx(u,{type:"text",value:d.vendor_name,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(c,{htmlFor:"created_name",children:"Entered by"}),e.jsx(u,{type:"text",id:"created_name",value:d.created_name,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-60",children:[e.jsx(c,{htmlFor:"requestingPlant",children:"Plant"}),e.jsxs(G,{value:d.plant,onValueChange:t=>_("plant",t),children:[e.jsx(R,{children:e.jsx(B,{placeholder:"Plant"})}),e.jsx(L,{children:m.user.plants&&m.user.plants.map(t=>e.jsxs(H,{value:t.plant,children:[t.plant," ",t.name1]},t.plant))})]})]})]}),e.jsx("div",{className:"p-1 pt-0",children:e.jsxs(E,{defaultValue:"general",className:"max-w-8xl",children:[e.jsx($,{children:e.jsx(F,{value:"general",children:"General"})}),e.jsx(M,{value:"general",children:e.jsx(V,{children:e.jsx(A,{children:e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsxs("div",{className:"flex-none w-36",children:[e.jsx(c,{htmlFor:"entry_date",children:"Entry entry_date"}),e.jsx(u,{type:"date",id:"entry_date",value:d.entry_date,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-36",children:[e.jsx(c,{htmlFor:"actual_date",children:"Actual Date of Reciept"}),e.jsx(u,{type:"date",id:"actual_date",defaultValue:d.actual_date,onChange:t=>_("actual_date",t.target.value)})]}),e.jsxs("div",{className:"flex-none w-36",children:[e.jsx(c,{htmlFor:"delivery_note",children:"Delivery Note / SI #"}),e.jsx(u,{type:"text",id:"delivery_note",defaultValue:d.delivery_note,onChange:t=>_("delivery_note",t.target.value)})]}),e.jsxs("div",{className:"flex-none w-96",children:[e.jsx(c,{htmlFor:"header_text",children:"Header Text"}),e.jsx(u,{type:"text",id:"header_text",defaultValue:d.header_text,onChange:t=>_("header_text",t.target.value)})]})]})})})})]})}),e.jsx("div",{className:"p-2",children:e.jsx(a.DataSheetGrid,{value:s,onChange:C,columns:y,style:j,disableExpandSelection:!0,rowHeight:30,className:"text-sm"})}),e.jsx("div",{className:"p-2 pt-0",children:e.jsx("div",{className:"p-5 justify-end grid grid-cols-8 gap-4",children:m.permissions.gr.create&&e.jsxs(e.Fragment,{children:[e.jsx(I,{variant:"outline",disabled:f,className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110]",children:"Post"}),e.jsx(W,{href:route("gr.index"),className:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500",children:"Cancel"})]})})})]})})})})]})};export{_e as default};
