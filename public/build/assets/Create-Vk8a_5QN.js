<<<<<<<< HEAD:public/build/assets/Create-D68Qak5X.js
import{r as P,W as D,j as e,Y as T,a as W}from"./app-f9e4wKpH.js";import{A as I}from"./AuthenticatedLayout-C7x3n-mw.js";import{T as O,a as V,b as E,c as F}from"./tabs-B2b0Jvv6.js";import{B as M}from"./button-DX6JiMpx.js";import{L as l,I as c}from"./input-oaH899Yu.js";import{S as G,a as R,b as B,c as $,d as A}from"./select-ifMj3xKk.js";import{S as L}from"./react-select.esm-CZxcBHQV.js";/* empty css              */import{d as a}from"./index-Mi72Froj.js";import{u as H,T as Q}from"./toaster-Ch6bswXN.js";import{C as U,a as z}from"./card-DEJbkzcz.js";import"./ApplicationLogo-pa34QAzP.js";import"./transition-BkiwkJj7.js";import"./x-D3eMvyF7.js";import"./index-XR0xjW4T.js";import"./utils-BnvPr2De.js";import"./index-DjAs8onA.js";import"./Combination-CZ50XvyL.js";const he=({auth:m,ponumber:_})=>{var g;const p=new Date().toISOString().substring(0,10),{toast:h}=H(),[s,v]=P.useState([{id:void 0,gr_header_id:void 0,po_material_id:void 0,item_no:void 0,mat_code:void 0,short_text:void 0,po_gr_qty:void 0,gr_qty:void 0,unit:void 0,po_deliv_date:void 0,batch:void 0,mfg_date:void 0,sled_bbd:void 0,po_number:void 0,po_item:void 0,dci:void 0},{id:void 0,gr_header_id:void 0,po_material_id:void 0,item_no:void 0,mat_code:void 0,short_text:void 0,po_gr_qty:void 0,gr_qty:void 0,unit:void 0,po_deliv_date:void 0,batch:void 0,mfg_date:void 0,sled_bbd:void 0,po_number:void 0,po_item:void 0,dci:void 0}]),{data:n,setData:x,post:y,errors:K,reset:Y,transform:J,processing:b}=D({id:0,gr_number:void 0,po_number:void 0,created_name:m.user.name,vendor_id:void 0,vendor_name:"",plant:m.user.plants!==void 0?(g=m.user.plants[0])==null?void 0:g.plant:"",entry_date:p,posting_date:p,actual_date:p,delivery_note:"",header_text:"",is_cancel:!1,grmaterials:[]}),j=[{...a.keyColumn("item_no",a.intColumn),title:"ItmNo",maxWidth:50,disabled:!0},{...a.keyColumn("mat_code",a.textColumn),title:"Material",maxWidth:130,disabled:!0},{...a.keyColumn("short_text",a.textColumn),title:"Short Text",maxWidth:350,disabled:!0},{...a.keyColumn("po_gr_qty",a.floatColumn),title:"PO Qty",maxWidth:130,disabled:!0},{...a.keyColumn("gr_qty",a.floatColumn),title:"Qty",maxWidth:130},{...a.keyColumn("unit",a.textColumn),title:"Unit",maxWidth:55},{...a.keyColumn("po_deliv_date",a.textColumn),title:"PO Del Date",maxWidth:130,disabled:!0},{...a.keyColumn("batch",a.textColumn),title:"Batch",maxWidth:130},{...a.keyColumn("mfg_date",a.dateColumn),title:"Mfg Date",maxWidth:130},{...a.keyColumn("sled_bbd",a.dateColumn),title:"SLED/BBD",maxWidth:130},{...a.keyColumn("po_item",a.textColumn),title:"PO Item",maxWidth:55,disabled:!0},{...a.keyColumn("dci",a.checkboxColumn),title:"DCI",maxWidth:55}],C={"--dsg-header-text-color":"rgb(10, 10, 10)","--dsg-cell-disabled-background-color":"rgb(245, 245, 245)","--dsg-border-color":"#bfbdbd"},N=async(t,d)=>{const u=[...t],o=["KG","G"];for(const r of d)if(r.type==="UPDATE"){const i=u[r.fromRowIndex];i.item_no=(r.fromRowIndex+1)*10;const f=i.po_gr_qty+i.po_gr_qty*.1;i.po_gr_qty-i.po_gr_qty*.1,o.includes(i.unit)?i.gr_qty=i.gr_qty>f?f:i.gr_qty:i.gr_qty=i.gr_qty>i.po_gr_qty?i.po_gr_qty:i.gr_qty}v(u),x({...n,grmaterials:u})},w=()=>{var u,o;let t=!0;const d=s.filter(r=>r.mat_code!==void 0).map((r,i)=>({...r,item_no:(i+1)*10}));if(v(d),d.length<=0)return h({variant:"destructive",description:"Please add atleast 1 item"}),!1;for(let r=0;r<s.length;r++)if(s[r].mat_code!==void 0&&s[r].mat_code!==""){if(s[r].gr_qty===void 0||((u=s[r])==null?void 0:u.gr_qty)<=0){h({variant:"destructive",description:`Please enter quantity for item no ${s[r].item_no}`}),t=!1;break}if(s[r].unit===void 0||((o=s[r])==null?void 0:o.unit)===null){h({variant:"destructive",description:`Please enter unit for item no ${s[r].item_no}`}),t=!1;break}}return t},q=async t=>{try{const d=await window.axios.get(route("po.details",t)),u=d.data.pomaterials.map(o=>({id:void 0,gr_header_id:void 0,po_material_id:o.id,item_no:void 0,mat_code:o.mat_code,short_text:o.short_text,po_gr_qty:o.po_gr_qty,gr_qty:void 0,unit:o.unit,po_deliv_date:o.del_date,batch:void 0,mfg_date:null,sled_bbd:null,po_number:d.data.po_number,po_item:o.item_no,dci:!1}));x({...n,po_number:t,plant:d.data.plants.plant,vendor_id:d.data.vendors.supplier,vendor_name:`${d.data.vendors.supplier} - ${d.data.vendors.name_1}`}),v(u)}catch(d){console.log("Error fetching po info: ",d)}},S=async t=>{t.preventDefault(),w()&&y(route("gr.store"))},k={control:t=>({...t,minHeight:"1.75rem",height:"1.75rem",fontSize:"0.875rem",borderColor:"hsl(var(--input))"}),valueContainer:t=>({...t,height:"1.75rem",padding:"0 6px"}),input:t=>({...t,margin:"0px"}),indicatorSeparator:()=>({display:"none"}),indicatorsContainer:t=>({...t,height:"1.75rem"})};return e.jsxs(I,{user:m.user,menus:m.menu,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Create Goods Receipt"}),children:[e.jsx(T,{title:"PO Create"}),e.jsx(Q,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsx("div",{className:"bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("form",{onSubmit:S,children:[e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(l,{children:" "}),e.jsx(c,{type:"text",defaultValue:"Goods Reciept",disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(l,{children:" "}),e.jsx(c,{type:"text",defaultValue:"Purchase Order",disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(l,{children:"PO Number"}),e.jsx(L,{required:!0,placeholder:"Purchase Order ",value:(_==null?void 0:_.find(({value:t})=>t===n.po_number))??null,options:_,onChange:({value:t})=>{q(t)},styles:k})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(l,{htmlFor:"gr_number",children:"Document Number"}),e.jsx(c,{type:"text",id:"gr_number",value:n.gr_number,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(l,{children:"Vendor"}),e.jsx(c,{type:"text",value:n.vendor_name,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(l,{htmlFor:"created_name",children:"Entered by"}),e.jsx(c,{type:"text",id:"created_name",value:n.created_name,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-60",children:[e.jsx(l,{htmlFor:"requestingPlant",children:"Plant"}),e.jsxs(G,{value:n.plant,onValueChange:t=>x("plant",t),children:[e.jsx(R,{children:e.jsx(B,{placeholder:"Plant"})}),e.jsx($,{children:m.user.plants&&m.user.plants.map(t=>e.jsxs(A,{value:t.plant,children:[t.plant," ",t.name1]},t.plant))})]})]})]}),e.jsx("div",{className:"p-1 pt-0",children:e.jsxs(O,{defaultValue:"general",className:"max-w-8xl",children:[e.jsx(V,{children:e.jsx(E,{value:"general",children:"General"})}),e.jsx(F,{value:"general",children:e.jsx(U,{children:e.jsx(z,{children:e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsxs("div",{className:"flex-none w-36",children:[e.jsx(l,{htmlFor:"entry_date",children:"Entry entry_date"}),e.jsx(c,{type:"date",id:"entry_date",value:n.entry_date,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-36",children:[e.jsx(l,{htmlFor:"actual_date",children:"Actual Date of Reciept"}),e.jsx(c,{type:"date",id:"actual_date",defaultValue:n.actual_date,onChange:t=>x("actual_date",t.target.value)})]}),e.jsxs("div",{className:"flex-none w-36",children:[e.jsx(l,{htmlFor:"delivery_note",children:"Delivery Note / SI #"}),e.jsx(c,{type:"text",id:"delivery_note",defaultValue:n.delivery_note,onChange:t=>x("delivery_note",t.target.value)})]}),e.jsxs("div",{className:"flex-none w-96",children:[e.jsx(l,{htmlFor:"header_text",children:"Header Text"}),e.jsx(c,{type:"text",id:"header_text",defaultValue:n.header_text,onChange:t=>x("header_text",t.target.value)})]})]})})})})]})}),e.jsx("div",{className:"p-2",children:e.jsx(a.DataSheetGrid,{value:s,onChange:N,columns:j,style:C,disableExpandSelection:!0,rowHeight:30,className:"text-sm"})}),e.jsx("div",{className:"p-2 pt-0",children:e.jsx("div",{className:"p-5 justify-end grid grid-cols-8 gap-4",children:m.permissions.gr.create&&e.jsxs(e.Fragment,{children:[e.jsx(M,{variant:"outline",disabled:b,className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110]",children:"Post"}),e.jsx(W,{href:route("gr.index"),className:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500",children:"Cancel"})]})})})]})})})})]})};export{he as default};
========
import{r as P,W as D,j as e,Y as T,a as W}from"./app-DrKxL2JF.js";import{A as I}from"./AuthenticatedLayout-B_AKMOtl.js";import{T as O,a as V,b as E,c as F}from"./tabs-DzpQCljZ.js";import{B as M}from"./button-ByqBGolh.js";import{L as l,I as c}from"./input--Mc1YdsG.js";import{S as G,a as R,b as B,c as $,d as A}from"./select-C_PRO1Yv.js";import{S as L}from"./react-select.esm-Drn_uJwt.js";/* empty css              */import{d as a}from"./index-BhwgxNds.js";import{u as H,T as Q}from"./toaster-BIxKQqvl.js";import{C as U,a as z}from"./card-BBHBBmQt.js";import"./ApplicationLogo-CteZKUYX.js";import"./transition-FMJMOV8j.js";import"./x-PJ_KA_w5.js";import"./index-CCQEarVx.js";import"./utils-hV7mXc9m.js";import"./index-D80COjb6.js";import"./Combination-tZivVA9J.js";const he=({auth:m,ponumber:_})=>{var g;const p=new Date().toISOString().substring(0,10),{toast:h}=H(),[s,v]=P.useState([{id:void 0,gr_header_id:void 0,po_material_id:void 0,item_no:void 0,mat_code:void 0,short_text:void 0,po_gr_qty:void 0,gr_qty:void 0,unit:void 0,po_deliv_date:void 0,batch:void 0,mfg_date:void 0,sled_bbd:void 0,po_number:void 0,po_item:void 0,dci:void 0},{id:void 0,gr_header_id:void 0,po_material_id:void 0,item_no:void 0,mat_code:void 0,short_text:void 0,po_gr_qty:void 0,gr_qty:void 0,unit:void 0,po_deliv_date:void 0,batch:void 0,mfg_date:void 0,sled_bbd:void 0,po_number:void 0,po_item:void 0,dci:void 0}]),{data:n,setData:x,post:y,errors:K,reset:Y,transform:J,processing:b}=D({id:0,gr_number:void 0,po_number:void 0,created_name:m.user.name,vendor_id:void 0,vendor_name:"",plant:m.user.plants!==void 0?(g=m.user.plants[0])==null?void 0:g.plant:"",entry_date:p,posting_date:p,actual_date:p,delivery_note:"",header_text:"",is_cancel:!1,grmaterials:[]}),j=[{...a.keyColumn("item_no",a.intColumn),title:"ItmNo",maxWidth:50,disabled:!0},{...a.keyColumn("mat_code",a.textColumn),title:"Material",maxWidth:130,disabled:!0},{...a.keyColumn("short_text",a.textColumn),title:"Short Text",maxWidth:350,disabled:!0},{...a.keyColumn("po_gr_qty",a.floatColumn),title:"PO Qty",maxWidth:130,disabled:!0},{...a.keyColumn("gr_qty",a.floatColumn),title:"Qty",maxWidth:130},{...a.keyColumn("unit",a.textColumn),title:"Unit",maxWidth:55},{...a.keyColumn("po_deliv_date",a.textColumn),title:"PO Del Date",maxWidth:130,disabled:!0},{...a.keyColumn("batch",a.textColumn),title:"Batch",maxWidth:130},{...a.keyColumn("mfg_date",a.dateColumn),title:"Mfg Date",maxWidth:130},{...a.keyColumn("sled_bbd",a.dateColumn),title:"SLED/BBD",maxWidth:130},{...a.keyColumn("po_item",a.textColumn),title:"PO Item",maxWidth:55,disabled:!0},{...a.keyColumn("dci",a.checkboxColumn),title:"DCI",maxWidth:55}],C={"--dsg-header-text-color":"rgb(10, 10, 10)","--dsg-cell-disabled-background-color":"rgb(245, 245, 245)","--dsg-border-color":"#bfbdbd"},N=async(t,d)=>{const u=[...t],o=["KG","G"];for(const r of d)if(r.type==="UPDATE"){const i=u[r.fromRowIndex];i.item_no=(r.fromRowIndex+1)*10;const f=i.po_gr_qty+i.po_gr_qty*.1;i.po_gr_qty-i.po_gr_qty*.1,o.includes(i.unit)?i.gr_qty=i.gr_qty>f?f:i.gr_qty:i.gr_qty=i.gr_qty>i.po_gr_qty?i.po_gr_qty:i.gr_qty}v(u),x({...n,grmaterials:u})},w=()=>{var u,o;let t=!0;const d=s.filter(r=>r.mat_code!==void 0).map((r,i)=>({...r,item_no:(i+1)*10}));if(v(d),d.length<=0)return h({variant:"destructive",description:"Please add atleast 1 item"}),!1;for(let r=0;r<s.length;r++)if(s[r].mat_code!==void 0&&s[r].mat_code!==""){if(s[r].gr_qty===void 0||((u=s[r])==null?void 0:u.gr_qty)<=0){h({variant:"destructive",description:`Please enter quantity for item no ${s[r].item_no}`}),t=!1;break}if(s[r].unit===void 0||((o=s[r])==null?void 0:o.unit)===null){h({variant:"destructive",description:`Please enter unit for item no ${s[r].item_no}`}),t=!1;break}}return t},q=async t=>{try{const d=await window.axios.get(route("po.details",t)),u=d.data.pomaterials.map(o=>({id:void 0,gr_header_id:void 0,po_material_id:o.id,item_no:void 0,mat_code:o.mat_code,short_text:o.short_text,po_gr_qty:o.po_gr_qty,gr_qty:void 0,unit:o.unit,po_deliv_date:o.del_date,batch:void 0,mfg_date:null,sled_bbd:null,po_number:d.data.po_number,po_item:o.item_no,dci:!1}));x({...n,po_number:t,plant:d.data.plants.plant,vendor_id:d.data.vendors.supplier,vendor_name:`${d.data.vendors.supplier} - ${d.data.vendors.name_1}`}),v(u)}catch(d){console.log("Error fetching po info: ",d)}},S=async t=>{t.preventDefault(),w()&&y(route("gr.store"))},k={control:t=>({...t,minHeight:"1.75rem",height:"1.75rem",fontSize:"0.875rem",borderColor:"hsl(var(--input))"}),valueContainer:t=>({...t,height:"1.75rem",padding:"0 6px"}),input:t=>({...t,margin:"0px"}),indicatorSeparator:()=>({display:"none"}),indicatorsContainer:t=>({...t,height:"1.75rem"})};return e.jsxs(I,{user:m.user,menus:m.menu,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Create Goods Receipt"}),children:[e.jsx(T,{title:"PO Create"}),e.jsx(Q,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsx("div",{className:"bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("form",{onSubmit:S,children:[e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(l,{children:" "}),e.jsx(c,{type:"text",defaultValue:"Goods Reciept",disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(l,{children:" "}),e.jsx(c,{type:"text",defaultValue:"Purchase Order",disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(l,{children:"PO Number"}),e.jsx(L,{required:!0,placeholder:"Purchase Order ",value:(_==null?void 0:_.find(({value:t})=>t===n.po_number))??null,options:_,onChange:({value:t})=>{q(t)},styles:k})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(l,{htmlFor:"gr_number",children:"Document Number"}),e.jsx(c,{type:"text",id:"gr_number",value:n.gr_number,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-52",children:[e.jsx(l,{children:"Vendor"}),e.jsx(c,{type:"text",value:n.vendor_name,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-40",children:[e.jsx(l,{htmlFor:"created_name",children:"Entered by"}),e.jsx(c,{type:"text",id:"created_name",value:n.created_name,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-60",children:[e.jsx(l,{htmlFor:"requestingPlant",children:"Plant"}),e.jsxs(G,{value:n.plant,onValueChange:t=>x("plant",t),children:[e.jsx(R,{children:e.jsx(B,{placeholder:"Plant"})}),e.jsx($,{children:m.user.plants&&m.user.plants.map(t=>e.jsxs(A,{value:t.plant,children:[t.plant," ",t.name1]},t.plant))})]})]})]}),e.jsx("div",{className:"p-1 pt-0",children:e.jsxs(O,{defaultValue:"general",className:"max-w-8xl",children:[e.jsx(V,{children:e.jsx(E,{value:"general",children:"General"})}),e.jsx(F,{value:"general",children:e.jsx(U,{children:e.jsx(z,{children:e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsxs("div",{className:"flex-none w-36",children:[e.jsx(l,{htmlFor:"entry_date",children:"Entry entry_date"}),e.jsx(c,{type:"date",id:"entry_date",value:n.entry_date,disabled:!0})]}),e.jsxs("div",{className:"flex-none w-36",children:[e.jsx(l,{htmlFor:"actual_date",children:"Actual Date of Reciept"}),e.jsx(c,{type:"date",id:"actual_date",defaultValue:n.actual_date,onChange:t=>x("actual_date",t.target.value)})]}),e.jsxs("div",{className:"flex-none w-36",children:[e.jsx(l,{htmlFor:"delivery_note",children:"Delivery Note / SI #"}),e.jsx(c,{type:"text",id:"delivery_note",defaultValue:n.delivery_note,onChange:t=>x("delivery_note",t.target.value)})]}),e.jsxs("div",{className:"flex-none w-96",children:[e.jsx(l,{htmlFor:"header_text",children:"Header Text"}),e.jsx(c,{type:"text",id:"header_text",defaultValue:n.header_text,onChange:t=>x("header_text",t.target.value)})]})]})})})})]})}),e.jsx("div",{className:"p-2",children:e.jsx(a.DataSheetGrid,{value:s,onChange:N,columns:j,style:C,disableExpandSelection:!0,rowHeight:30,className:"text-sm"})}),e.jsx("div",{className:"p-2 pt-0",children:e.jsx("div",{className:"p-5 justify-end grid grid-cols-8 gap-4",children:m.permissions.gr.create&&e.jsxs(e.Fragment,{children:[e.jsx(M,{variant:"outline",disabled:b,className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110]",children:"Post"}),e.jsx(W,{href:route("gr.index"),className:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500",children:"Cancel"})]})})})]})})})})]})};export{he as default};
>>>>>>>> c615eb7 (build):public/build/assets/Create-Vk8a_5QN.js