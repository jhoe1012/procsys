<<<<<<<< HEAD:public/build/assets/Edit-D6hubwRM.js
import{r as j,W as xe,j as e,Y as _e,a as D}from"./app-f9e4wKpH.js";import{A as fe}from"./AuthenticatedLayout-C7x3n-mw.js";import{T as L,a as $,b as g,c as y}from"./tabs-B2b0Jvv6.js";import{B as he}from"./button-DX6JiMpx.js";import{T as z}from"./textarea-Pla2gzjr.js";import{L as C,I as q}from"./input-oaH899Yu.js";import{S as be,a as ve,b as je,c as ge,d as ye}from"./select-ifMj3xKk.js";import E from"./Approval-DZSVofhd.js";import{T as J,d as K,b as F,e as m,a as Y,c as p,f as N,S as P,g as I,h as V}from"./constants-DroAfbwh.js";/* empty css              */import{s as X}from"./SelectComponent-BOO-dy_H.js";import{d as i}from"./index-Mi72Froj.js";import{u as Ce,T as we}from"./toaster-Ch6bswXN.js";import{F as Z,D as Te}from"./FlagForAction-a0NzUSqF.js";import{f as qe}from"./utils-BnvPr2De.js";import{F as Ne,D as ke}from"./Dropzone-84bgJEQb.js";import"./ApplicationLogo-pa34QAzP.js";import"./transition-BkiwkJj7.js";import"./x-D3eMvyF7.js";import"./index-XR0xjW4T.js";import"./index-DjAs8onA.js";import"./Combination-CZ50XvyL.js";import"./react-select.esm-CZxcBHQV.js";import"./PrimaryButton-TD38pIrs.js";import"./Modal-CW043s60.js";import"./SecondaryButton-BJF-mDVT.js";const st=({auth:u,prheader:s,mat_code:ee,mat_desc:te,message:_,item_details:se})=>{new Date().toLocaleDateString();const[a,R]=j.useState([]),[U,re]=j.useState([]),[W,ie]=j.useState([]),{data:c,setData:v,post:ae,errors:Se,reset:le,processing:oe}=xe({id:s.id,pr_number:s.pr_number,created_name:s.created_name,doc_date:s.doc_date,attachment:void 0,requested_by:s.requested_by,plant:s.plant,reason_pr:s.reason_pr,header_text:s.header_text,total_pr_value:s.total_pr_value,status:s.status||"",deliv_addr:s.deliv_addr,prmaterials:[],attachments:[],_method:"patch"}),[x,ne]=j.useState(),{toast:h}=Ce(),de=[{...i.keyColumn("sel",i.checkboxColumn),title:"Sel",minWidth:30},{...i.keyColumn("status",i.textColumn),title:"Sts",disabled:!0,minWidth:35},{...i.keyColumn("item_no",i.intColumn),title:"ItmNo",disabled:!0,minWidth:55},{...i.keyColumn("mat_code",X({choices:ee})),title:"Material",minWidth:120},{...i.keyColumn("short_text",X({choices:te})),title:"Short Text",minWidth:300},{...i.keyColumn("qty",i.floatColumn),title:"Qty",minWidth:70},{...i.keyColumn("ord_unit",i.textColumn),title:"Ord Unit",minWidth:55},{...i.keyColumn("qty_ordered",i.floatColumn),title:"Qty Ordered",minWidth:70,disabled:!0},{...i.keyColumn("qty_open",i.floatColumn),title:"Qty Open",minWidth:70,disabled:!0},{...i.keyColumn("price",i.floatColumn),title:"Price",minWidth:70,disabled:!0},{...i.keyColumn("per_unit",i.floatColumn),title:"Per Unit",minWidth:40,disabled:!0},{...i.keyColumn("unit",i.textColumn),title:"Unit",minWidth:40,disabled:!0},{...i.keyColumn("total_value",i.floatColumn),title:"Total Value",minWidth:90,disabled:!0},{...i.keyColumn("currency",i.textColumn),title:"Curr",minWidth:40,disabled:!0},{...i.keyColumn("del_date",i.dateColumn),title:"Del Date",minWidth:130},{...i.keyColumn("mat_grp",i.textColumn),title:"Mat Grp",minWidth:100,disabled:!0},{...i.keyColumn("purch_grp",i.textColumn),title:"Purch Grp",minWidth:90,disabled:!0}],ce={"--dsg-header-text-color":"rgb(10, 10, 10)","--dsg-cell-disabled-background-color":"rgb(245, 245, 245)","--dsg-border-color":"#bfbdbd"},G=async t=>{try{return(await window.axios.get(route("material.details"),{params:{material:t,plant:c.plant}})).data.data}catch(n){return console.error("Error fetching material info:",n),null}},ue=async(t,n)=>{var b,w,T,l,k,M,B,O,Q,H;const f=[...t],d=[...a];for(const S of n)if(S.type==="UPDATE"){const r=f[S.fromRowIndex],A=d[S.fromRowIndex];if(r.mat_code&&r.mat_code!==A.mat_code){const o=await G(r.mat_code);o&&(r.short_text=o.mat_desc,r.ord_unit=o.base_uom,r.unit=o.base_uom,r.price=parseFloat(((b=o.valuations[0])==null?void 0:b.valuation_price)||0),r.currency=((w=o.valuations[0])==null?void 0:w.currency)||"",r.per_unit=parseFloat(((T=o.valuations[0])==null?void 0:T.per_unit)||0),r.mat_grp=((l=o.materialGroups[0])==null?void 0:l.mat_grp_code)||"",r.purch_grp=((k=o.purchasingGroups[0])==null?void 0:k.purch_grp)||"",r.total_value=r.price*(r.qty||0))}if(r.short_text&&r.short_text!==A.short_text){const o=await G(r.short_text);o&&(r.mat_code=o.mat_code,r.ord_unit=o.base_uom,r.unit=o.base_uom,r.price=parseFloat(((M=o.valuations[0])==null?void 0:M.valuation_price)||0),r.currency=((B=o.valuations[0])==null?void 0:B.currency)||"",r.per_unit=parseFloat(((O=o.valuations[0])==null?void 0:O.per_unit)||0),r.mat_grp=((Q=o.materialGroups[0])==null?void 0:Q.mat_grp_code)||"",r.purch_grp=((H=o.purchasingGroups[0])==null?void 0:H.purch_grp)||"",r.total_value=r.price*(r.qty||0))}r.qty!==A.qty&&(r.total_value=(r.price??0)/(r.per_unit??0)*(r.qty??0)),r.item_no=(S.fromRowIndex+1)*10}R(f),v({...c,prmaterials:f})},me=async t=>{t.preventDefault(),pe()&&ae(route("pr.update",s.id),{preserveScroll:!0,onSuccess:n=>{le()}})},pe=()=>{var d,b,w,T;const t=new Date;let n=!0;const f=a.filter(l=>l.mat_code!==void 0).map((l,k)=>({...l,item_no:(k+1)*10}));if(R(f),f.length<=0)return h({variant:"destructive",title:"Please add atleast 1 item"}),!1;for(let l=0;l<a.length;l++)if(a[l].mat_code!==void 0&&a[l].mat_code!==""){if(a[l].qty===void 0||((d=a[l])==null?void 0:d.qty)<=0){h({variant:"destructive",title:`Please enter quantity for item no ${a[l].item_no}`}),n=!1;break}if(a[l].ord_unit===void 0||((b=a[l])==null?void 0:b.ord_unit)===null){h({variant:"destructive",title:`Please enter order unit for item no ${a[l].item_no}`}),n=!1;break}if(a[l].del_date===void 0||((w=a[l])==null?void 0:w.del_date)===null){h({variant:"destructive",description:`Please enter delivery date for item no ${a[l].item_no}`}),n=!1;break}else if(((T=a[l].del_date)==null?void 0:T.getTime())<=t.getTime()){h({variant:"destructive",description:`Please enter delivery date greater than today for item no ${a[l].item_no}`}),n=!1;break}}return n};return j.useEffect(()=>{const t=s.prmaterials.map(n=>({...n,del_date:new Date(n.del_date||"")}));R(t||[]),_!=null&&_.success&&h({title:_.success}),_!=null&&_.error&&h({variant:"destructive",title:_.error}),u.user.approvers&&ne(u.user.approvers.filter(n=>n.type=="pr")[0])},[]),j.useEffect(()=>{const t=a.reduce((d,b)=>d+(b.total_value||0),0),n=a.filter(d=>d.sel==!0).map(d=>d.mat_code)[0];v(d=>({...d,total_pr_value:t,attachment:W}));const f=se.filter(d=>d.mat_code==n);re(f)},[a,W]),e.jsxs(fe,{user:u.user,menus:u.menu,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Edit Purchase Requisition"}),children:[e.jsx(_e,{title:"PR Create"}),e.jsx(we,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsxs("div",{className:"bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg",children:[e.jsxs("form",{onSubmit:me,children:[e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsxs("div",{className:"flex-auto",children:[e.jsx(C,{htmlFor:"prnumber",children:"PR Number"}),e.jsx(q,{type:"text",id:"prnumber",value:c.pr_number,disabled:!0})]}),e.jsxs("div",{className:"flex-auto",children:[e.jsx(C,{htmlFor:"createdby",children:"Created By"}),e.jsx(q,{type:"text",id:"createdby",defaultValue:c.created_name,disabled:!0})]}),e.jsxs("div",{className:"flex-auto",children:[e.jsx(C,{htmlFor:"date",children:"Date"}),e.jsx(q,{type:"text",id:"date",defaultValue:c.doc_date,disabled:!0})]}),e.jsxs("div",{className:"flex-auto",children:[e.jsx(C,{htmlFor:"requested_by",children:"Requested By"}),e.jsx(q,{type:"text",id:"requested_by",value:c.requested_by,required:!0,onChange:t=>v("requested_by",t.target.value)})]}),e.jsxs("div",{className:"flex-auto",children:[e.jsx(C,{htmlFor:"requestingPlant",children:"Requesting Plant"}),e.jsxs(be,{defaultValue:c.plant,onValueChange:t=>v("plant",t),children:[e.jsx(ve,{children:e.jsx(je,{placeholder:"Plant"})}),e.jsx(ge,{children:u.user.plants&&u.user.plants.map(t=>e.jsxs(ye,{value:t.plant,children:[t.plant," ",t.name1]},t.plant))})]})]})]}),e.jsx("div",{className:"p-5",children:e.jsxs(L,{defaultValue:"reasonForPr",className:"max-w-8xl",children:[e.jsxs($,{children:[e.jsx(g,{value:"reasonForPr",children:"Reason for PR"}),e.jsx(g,{value:"headerText",children:"Header Text"}),e.jsx(g,{value:"workflow",children:"Workflow"}),e.jsx(g,{value:"attachment",children:"Attachment"})]}),e.jsx(y,{value:"reasonForPr",children:e.jsx(z,{value:c.reason_pr,onChange:t=>v("reason_pr",t.target.value),required:!0})}),e.jsx(y,{value:"headerText",children:e.jsx(z,{value:c.header_text,onChange:t=>v("header_text",t.target.value)})}),e.jsx(y,{value:"workflow",children:e.jsxs(J,{className:"w-11/2 text-xs",children:[e.jsx(K,{children:e.jsxs(F,{children:[e.jsx(m,{children:"Position"}),e.jsx(m,{children:"Status"}),e.jsx(m,{children:"Approved By"}),e.jsx(m,{children:"Approved Date"}),e.jsx(m,{children:"Remarks"})]})}),e.jsx(Y,{children:s.workflows&&s.workflows.map(t=>e.jsxs(F,{children:[e.jsx(p,{children:t.position}),e.jsxs(p,{children:[t.status," "]}),e.jsxs(p,{children:[" ",t.approved_by," "]}),e.jsxs(p,{children:[t.approved_date," "]}),e.jsxs(p,{children:[t.message," "]})]},t.id))})]})}),e.jsxs(y,{value:"attachment",children:[e.jsx("ul",{className:"mt-3 mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 ",children:s.attachments&&s.attachments.map(t=>e.jsxs("li",{className:"relative h-12 rounded-md shadow-lg p-2 bg-white",children:[u.permissions.pr.edit&&e.jsx(D,{preserveScroll:!0,href:route("attachment.delete",t.id),method:"delete",as:"button",className:"w-7 h-7  bg-slate-100 rounded-full flex justify-center items-center absolute top-3 right-2 hover:bg-red-200 transition-colors",children:e.jsx(Ne,{className:"w-6 h-6  text-red-600 hover:fill-red-700 transition-colors"})}),e.jsx("p",{className:"mt-2 text-blue-600 text-sm font-medium truncate pr-7",children:e.jsx("a",{href:"/"+t.filepath,download:!0,children:t.filename})})]},t.filename))}),e.jsx(ke,{files:W,setFiles:ie})]})]})}),e.jsx("div",{className:"p-2",children:e.jsx(i.DataSheetGrid,{createRow:()=>({sel:!1,item_no:void 0,status:void 0,mat_code:void 0,short_text:void 0,qty:void 0,ord_unit:void 0,qty_ordered:void 0,qty_open:void 0,price:void 0,per_unit:void 0,unit:void 0,total_value:void 0,del_date:void 0,mat_grp:void 0}),value:a,onChange:ue,columns:de,style:ce,disableExpandSelection:!0,rowHeight:30,className:"text-sm"})}),e.jsxs("div",{className:"float-right -mt-12 mr-72  flex gap-2 justify-end content-center",children:[e.jsx("div",{className:"",children:e.jsx(C,{htmlFor:"total",children:"Total PR Value: "})}),e.jsx("div",{children:e.jsx(q,{type:"text",value:qe(c.total_pr_value),readOnly:!0,disabled:!0})})]}),e.jsxs("div",{className:"p-2 pt-0",children:[e.jsxs(L,{defaultValue:"itemDetails",className:"max-w-xl",children:[e.jsxs($,{children:[e.jsx(g,{value:"itemDetails",children:"Item Details"}),e.jsx(g,{value:"action",children:"Action"})]}),e.jsx(y,{value:"itemDetails",children:e.jsxs(J,{className:"w-11/2 text-sm ml-5 border border-collapse",children:[e.jsx(K,{children:e.jsxs(F,{children:[e.jsx(m,{children:"Document"}),e.jsx(m,{children:"Item"}),e.jsx(m,{children:"Status"}),e.jsx(m,{children:"Quantity"}),e.jsx(m,{children:"Unit"})]})}),e.jsx(Y,{className:"",children:U&&U.map(t=>e.jsxs(F,{children:[e.jsx(p,{children:t.doc}),e.jsxs(p,{children:[t.itm," "]}),e.jsxs(p,{children:[" ",t.sts," "]}),e.jsxs(p,{children:[t.qty," "]}),e.jsxs(p,{children:[t.unit," "]})]},t.doc))})]})}),e.jsx(y,{value:"action",children:u.permissions.pr.edit&&e.jsxs(e.Fragment,{children:[e.jsx(Z,{p_description:"Are you sure you want to flag delete this item(s)?",p_title:"Flag for Delete",p_url:route("pr.flag.delete"),p_disable:a.filter(t=>t.sel==!0).length==0||s.appr_seq!=N,p_items:{ids:a.filter(t=>t.sel==!0).map(t=>t.id)}}),e.jsx(Z,{p_description:"Are you sure you want to flag close this item(s)?",p_title:"Flag Close",p_url:route("pr.flag.close"),p_disable:a.filter(t=>t.sel==!0).length==0||s.appr_seq!=N,p_items:{ids:a.filter(t=>t.sel==!0).map(t=>t.id)}})]})})]}),e.jsx("div",{className:"p-5 justify-end grid grid-cols-8 gap-4",children:u.permissions.pr.edit&&e.jsxs(e.Fragment,{children:[e.jsx(he,{type:"submit",variant:"outline",className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100",disabled:s.appr_seq!=N||oe,children:"Save"}),e.jsx(D,{href:route("pr.index"),className:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500 disabled:cursor-not-allowed disabled:opacity-100",children:"Cancel"}),e.jsx(D,{disabled:s.appr_seq!=N,preserveScroll:!0,href:route("pr.submit",s.id),as:"button",type:"button",className:`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input bg-[#f8c110] hover:bg-[#f8c110] hover:text-accent-foreground hover:border-gray-500
========
import{r as j,W as xe,j as e,Y as _e,a as D}from"./app-DrKxL2JF.js";import{A as fe}from"./AuthenticatedLayout-B_AKMOtl.js";import{T as L,a as $,b as g,c as y}from"./tabs-DzpQCljZ.js";import{B as he}from"./button-ByqBGolh.js";import{T as z}from"./textarea-BhhGCQu7.js";import{L as C,I as q}from"./input--Mc1YdsG.js";import{S as be,a as ve,b as je,c as ge,d as ye}from"./select-C_PRO1Yv.js";import E from"./Approval-C-c3LhvG.js";import{T as J,d as K,b as F,e as m,a as Y,c as p,f as N,S as P,g as I,h as V}from"./constants-B3mkEWZv.js";/* empty css              */import{s as X}from"./SelectComponent-D-egVIbt.js";import{d as i}from"./index-BhwgxNds.js";import{u as Ce,T as we}from"./toaster-BIxKQqvl.js";import{F as Z,D as Te}from"./FlagForAction-BaK-JquW.js";import{f as qe}from"./utils-hV7mXc9m.js";import{F as Ne,D as ke}from"./Dropzone-Di36OoJ4.js";import"./ApplicationLogo-CteZKUYX.js";import"./transition-FMJMOV8j.js";import"./x-PJ_KA_w5.js";import"./index-CCQEarVx.js";import"./index-D80COjb6.js";import"./Combination-tZivVA9J.js";import"./react-select.esm-Drn_uJwt.js";import"./PrimaryButton-bE9grA7p.js";import"./Modal-CO4rdEEs.js";import"./SecondaryButton-BUxGX97C.js";const st=({auth:u,prheader:s,mat_code:ee,mat_desc:te,message:_,item_details:se})=>{new Date().toLocaleDateString();const[a,R]=j.useState([]),[U,re]=j.useState([]),[W,ie]=j.useState([]),{data:c,setData:v,post:ae,errors:Se,reset:le,processing:oe}=xe({id:s.id,pr_number:s.pr_number,created_name:s.created_name,doc_date:s.doc_date,attachment:void 0,requested_by:s.requested_by,plant:s.plant,reason_pr:s.reason_pr,header_text:s.header_text,total_pr_value:s.total_pr_value,status:s.status||"",deliv_addr:s.deliv_addr,prmaterials:[],attachments:[],_method:"patch"}),[x,ne]=j.useState(),{toast:h}=Ce(),de=[{...i.keyColumn("sel",i.checkboxColumn),title:"Sel",minWidth:30},{...i.keyColumn("status",i.textColumn),title:"Sts",disabled:!0,minWidth:35},{...i.keyColumn("item_no",i.intColumn),title:"ItmNo",disabled:!0,minWidth:55},{...i.keyColumn("mat_code",X({choices:ee})),title:"Material",minWidth:120},{...i.keyColumn("short_text",X({choices:te})),title:"Short Text",minWidth:300},{...i.keyColumn("qty",i.floatColumn),title:"Qty",minWidth:70},{...i.keyColumn("ord_unit",i.textColumn),title:"Ord Unit",minWidth:55},{...i.keyColumn("qty_ordered",i.floatColumn),title:"Qty Ordered",minWidth:70,disabled:!0},{...i.keyColumn("qty_open",i.floatColumn),title:"Qty Open",minWidth:70,disabled:!0},{...i.keyColumn("price",i.floatColumn),title:"Price",minWidth:70,disabled:!0},{...i.keyColumn("per_unit",i.floatColumn),title:"Per Unit",minWidth:40,disabled:!0},{...i.keyColumn("unit",i.textColumn),title:"Unit",minWidth:40,disabled:!0},{...i.keyColumn("total_value",i.floatColumn),title:"Total Value",minWidth:90,disabled:!0},{...i.keyColumn("currency",i.textColumn),title:"Curr",minWidth:40,disabled:!0},{...i.keyColumn("del_date",i.dateColumn),title:"Del Date",minWidth:130},{...i.keyColumn("mat_grp",i.textColumn),title:"Mat Grp",minWidth:100,disabled:!0},{...i.keyColumn("purch_grp",i.textColumn),title:"Purch Grp",minWidth:90,disabled:!0}],ce={"--dsg-header-text-color":"rgb(10, 10, 10)","--dsg-cell-disabled-background-color":"rgb(245, 245, 245)","--dsg-border-color":"#bfbdbd"},G=async t=>{try{return(await window.axios.get(route("material.details"),{params:{material:t,plant:c.plant}})).data.data}catch(n){return console.error("Error fetching material info:",n),null}},ue=async(t,n)=>{var b,w,T,l,k,M,B,O,Q,H;const f=[...t],d=[...a];for(const S of n)if(S.type==="UPDATE"){const r=f[S.fromRowIndex],A=d[S.fromRowIndex];if(r.mat_code&&r.mat_code!==A.mat_code){const o=await G(r.mat_code);o&&(r.short_text=o.mat_desc,r.ord_unit=o.base_uom,r.unit=o.base_uom,r.price=parseFloat(((b=o.valuations[0])==null?void 0:b.valuation_price)||0),r.currency=((w=o.valuations[0])==null?void 0:w.currency)||"",r.per_unit=parseFloat(((T=o.valuations[0])==null?void 0:T.per_unit)||0),r.mat_grp=((l=o.materialGroups[0])==null?void 0:l.mat_grp_code)||"",r.purch_grp=((k=o.purchasingGroups[0])==null?void 0:k.purch_grp)||"",r.total_value=r.price*(r.qty||0))}if(r.short_text&&r.short_text!==A.short_text){const o=await G(r.short_text);o&&(r.mat_code=o.mat_code,r.ord_unit=o.base_uom,r.unit=o.base_uom,r.price=parseFloat(((M=o.valuations[0])==null?void 0:M.valuation_price)||0),r.currency=((B=o.valuations[0])==null?void 0:B.currency)||"",r.per_unit=parseFloat(((O=o.valuations[0])==null?void 0:O.per_unit)||0),r.mat_grp=((Q=o.materialGroups[0])==null?void 0:Q.mat_grp_code)||"",r.purch_grp=((H=o.purchasingGroups[0])==null?void 0:H.purch_grp)||"",r.total_value=r.price*(r.qty||0))}r.qty!==A.qty&&(r.total_value=(r.price??0)/(r.per_unit??0)*(r.qty??0)),r.item_no=(S.fromRowIndex+1)*10}R(f),v({...c,prmaterials:f})},me=async t=>{t.preventDefault(),pe()&&ae(route("pr.update",s.id),{preserveScroll:!0,onSuccess:n=>{le()}})},pe=()=>{var d,b,w,T;const t=new Date;let n=!0;const f=a.filter(l=>l.mat_code!==void 0).map((l,k)=>({...l,item_no:(k+1)*10}));if(R(f),f.length<=0)return h({variant:"destructive",title:"Please add atleast 1 item"}),!1;for(let l=0;l<a.length;l++)if(a[l].mat_code!==void 0&&a[l].mat_code!==""){if(a[l].qty===void 0||((d=a[l])==null?void 0:d.qty)<=0){h({variant:"destructive",title:`Please enter quantity for item no ${a[l].item_no}`}),n=!1;break}if(a[l].ord_unit===void 0||((b=a[l])==null?void 0:b.ord_unit)===null){h({variant:"destructive",title:`Please enter order unit for item no ${a[l].item_no}`}),n=!1;break}if(a[l].del_date===void 0||((w=a[l])==null?void 0:w.del_date)===null){h({variant:"destructive",description:`Please enter delivery date for item no ${a[l].item_no}`}),n=!1;break}else if(((T=a[l].del_date)==null?void 0:T.getTime())<=t.getTime()){h({variant:"destructive",description:`Please enter delivery date greater than today for item no ${a[l].item_no}`}),n=!1;break}}return n};return j.useEffect(()=>{const t=s.prmaterials.map(n=>({...n,del_date:new Date(n.del_date||"")}));R(t||[]),_!=null&&_.success&&h({title:_.success}),_!=null&&_.error&&h({variant:"destructive",title:_.error}),u.user.approvers&&ne(u.user.approvers.filter(n=>n.type=="pr")[0])},[]),j.useEffect(()=>{const t=a.reduce((d,b)=>d+(b.total_value||0),0),n=a.filter(d=>d.sel==!0).map(d=>d.mat_code)[0];v(d=>({...d,total_pr_value:t,attachment:W}));const f=se.filter(d=>d.mat_code==n);re(f)},[a,W]),e.jsxs(fe,{user:u.user,menus:u.menu,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Edit Purchase Requisition"}),children:[e.jsx(_e,{title:"PR Create"}),e.jsx(we,{}),e.jsx("div",{className:"py-2",children:e.jsx("div",{className:"max-w-8xl mx-auto sm:px-6 lg:px-2",children:e.jsxs("div",{className:"bg-gray-50 overflow-hidden shadow-sm sm:rounded-lg",children:[e.jsxs("form",{onSubmit:me,children:[e.jsxs("div",{className:"p-5 flex flex-wrap gap-4",children:[e.jsxs("div",{className:"flex-auto",children:[e.jsx(C,{htmlFor:"prnumber",children:"PR Number"}),e.jsx(q,{type:"text",id:"prnumber",value:c.pr_number,disabled:!0})]}),e.jsxs("div",{className:"flex-auto",children:[e.jsx(C,{htmlFor:"createdby",children:"Created By"}),e.jsx(q,{type:"text",id:"createdby",defaultValue:c.created_name,disabled:!0})]}),e.jsxs("div",{className:"flex-auto",children:[e.jsx(C,{htmlFor:"date",children:"Date"}),e.jsx(q,{type:"text",id:"date",defaultValue:c.doc_date,disabled:!0})]}),e.jsxs("div",{className:"flex-auto",children:[e.jsx(C,{htmlFor:"requested_by",children:"Requested By"}),e.jsx(q,{type:"text",id:"requested_by",value:c.requested_by,required:!0,onChange:t=>v("requested_by",t.target.value)})]}),e.jsxs("div",{className:"flex-auto",children:[e.jsx(C,{htmlFor:"requestingPlant",children:"Requesting Plant"}),e.jsxs(be,{defaultValue:c.plant,onValueChange:t=>v("plant",t),children:[e.jsx(ve,{children:e.jsx(je,{placeholder:"Plant"})}),e.jsx(ge,{children:u.user.plants&&u.user.plants.map(t=>e.jsxs(ye,{value:t.plant,children:[t.plant," ",t.name1]},t.plant))})]})]})]}),e.jsx("div",{className:"p-5",children:e.jsxs(L,{defaultValue:"reasonForPr",className:"max-w-8xl",children:[e.jsxs($,{children:[e.jsx(g,{value:"reasonForPr",children:"Reason for PR"}),e.jsx(g,{value:"headerText",children:"Header Text"}),e.jsx(g,{value:"workflow",children:"Workflow"}),e.jsx(g,{value:"attachment",children:"Attachment"})]}),e.jsx(y,{value:"reasonForPr",children:e.jsx(z,{value:c.reason_pr,onChange:t=>v("reason_pr",t.target.value),required:!0})}),e.jsx(y,{value:"headerText",children:e.jsx(z,{value:c.header_text,onChange:t=>v("header_text",t.target.value)})}),e.jsx(y,{value:"workflow",children:e.jsxs(J,{className:"w-11/2 text-xs",children:[e.jsx(K,{children:e.jsxs(F,{children:[e.jsx(m,{children:"Position"}),e.jsx(m,{children:"Status"}),e.jsx(m,{children:"Approved By"}),e.jsx(m,{children:"Approved Date"}),e.jsx(m,{children:"Remarks"})]})}),e.jsx(Y,{children:s.workflows&&s.workflows.map(t=>e.jsxs(F,{children:[e.jsx(p,{children:t.position}),e.jsxs(p,{children:[t.status," "]}),e.jsxs(p,{children:[" ",t.approved_by," "]}),e.jsxs(p,{children:[t.approved_date," "]}),e.jsxs(p,{children:[t.message," "]})]},t.id))})]})}),e.jsxs(y,{value:"attachment",children:[e.jsx("ul",{className:"mt-3 mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 ",children:s.attachments&&s.attachments.map(t=>e.jsxs("li",{className:"relative h-12 rounded-md shadow-lg p-2 bg-white",children:[u.permissions.pr.edit&&e.jsx(D,{preserveScroll:!0,href:route("attachment.delete",t.id),method:"delete",as:"button",className:"w-7 h-7  bg-slate-100 rounded-full flex justify-center items-center absolute top-3 right-2 hover:bg-red-200 transition-colors",children:e.jsx(Ne,{className:"w-6 h-6  text-red-600 hover:fill-red-700 transition-colors"})}),e.jsx("p",{className:"mt-2 text-blue-600 text-sm font-medium truncate pr-7",children:e.jsx("a",{href:"/"+t.filepath,download:!0,children:t.filename})})]},t.filename))}),e.jsx(ke,{files:W,setFiles:ie})]})]})}),e.jsx("div",{className:"p-2",children:e.jsx(i.DataSheetGrid,{createRow:()=>({sel:!1,item_no:void 0,status:void 0,mat_code:void 0,short_text:void 0,qty:void 0,ord_unit:void 0,qty_ordered:void 0,qty_open:void 0,price:void 0,per_unit:void 0,unit:void 0,total_value:void 0,del_date:void 0,mat_grp:void 0}),value:a,onChange:ue,columns:de,style:ce,disableExpandSelection:!0,rowHeight:30,className:"text-sm"})}),e.jsxs("div",{className:"float-right -mt-12 mr-72  flex gap-2 justify-end content-center",children:[e.jsx("div",{className:"",children:e.jsx(C,{htmlFor:"total",children:"Total PR Value: "})}),e.jsx("div",{children:e.jsx(q,{type:"text",value:qe(c.total_pr_value),readOnly:!0,disabled:!0})})]}),e.jsxs("div",{className:"p-2 pt-0",children:[e.jsxs(L,{defaultValue:"itemDetails",className:"max-w-xl",children:[e.jsxs($,{children:[e.jsx(g,{value:"itemDetails",children:"Item Details"}),e.jsx(g,{value:"action",children:"Action"})]}),e.jsx(y,{value:"itemDetails",children:e.jsxs(J,{className:"w-11/2 text-sm ml-5 border border-collapse",children:[e.jsx(K,{children:e.jsxs(F,{children:[e.jsx(m,{children:"Document"}),e.jsx(m,{children:"Item"}),e.jsx(m,{children:"Status"}),e.jsx(m,{children:"Quantity"}),e.jsx(m,{children:"Unit"})]})}),e.jsx(Y,{className:"",children:U&&U.map(t=>e.jsxs(F,{children:[e.jsx(p,{children:t.doc}),e.jsxs(p,{children:[t.itm," "]}),e.jsxs(p,{children:[" ",t.sts," "]}),e.jsxs(p,{children:[t.qty," "]}),e.jsxs(p,{children:[t.unit," "]})]},t.doc))})]})}),e.jsx(y,{value:"action",children:u.permissions.pr.edit&&e.jsxs(e.Fragment,{children:[e.jsx(Z,{p_description:"Are you sure you want to flag delete this item(s)?",p_title:"Flag for Delete",p_url:route("pr.flag.delete"),p_disable:a.filter(t=>t.sel==!0).length==0||s.appr_seq!=N,p_items:{ids:a.filter(t=>t.sel==!0).map(t=>t.id)}}),e.jsx(Z,{p_description:"Are you sure you want to flag close this item(s)?",p_title:"Flag Close",p_url:route("pr.flag.close"),p_disable:a.filter(t=>t.sel==!0).length==0||s.appr_seq!=N,p_items:{ids:a.filter(t=>t.sel==!0).map(t=>t.id)}})]})})]}),e.jsx("div",{className:"p-5 justify-end grid grid-cols-8 gap-4",children:u.permissions.pr.edit&&e.jsxs(e.Fragment,{children:[e.jsx(he,{type:"submit",variant:"outline",className:"bg-[#f8c110]  hover:border-gray-500 hover:bg-[#f8c110] disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100",disabled:s.appr_seq!=N||oe,children:"Save"}),e.jsx(D,{href:route("pr.index"),className:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500 disabled:cursor-not-allowed disabled:opacity-100",children:"Cancel"}),e.jsx(D,{disabled:s.appr_seq!=N,preserveScroll:!0,href:route("pr.submit",s.id),as:"button",type:"button",className:`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input bg-[#f8c110] hover:bg-[#f8c110] hover:text-accent-foreground hover:border-gray-500
>>>>>>>> c615eb7 (build):public/build/assets/Edit-QV1R5mgb.js
                        disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100 `,children:"Submit"}),e.jsx(Te,{p_id:s.id,p_disable:s.appr_seq!=N,p_title:"Discard this Purchase Requisition ?",p_url:"pr.discard"}),e.jsx(D,{disabled:s.status==P,preserveScroll:!0,href:route("pr.recall",s.id),as:"button",type:"button",className:"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-500 disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-gray-100",children:"Recall"})]})})]})]}),u.permissions.pr.approver&&e.jsxs("div",{className:"px-5 pb-5",children:[e.jsx(E,{p_pr_number:c.pr_number,p_type:"approved",p_title:"approve",p_disable:s.status==P||s.status==I||s.status==V||(x==null?void 0:x.seq)!=s.appr_seq}),e.jsx(E,{p_pr_number:c.pr_number,p_type:"rework",p_title:"rework",p_disable:s.status==P||s.status==I||s.status==V||(x==null?void 0:x.seq)!=s.appr_seq}),e.jsx(E,{p_pr_number:c.pr_number,p_type:"rejected",p_title:"reject",p_disable:s.status==P||s.status==I||s.status==V||(x==null?void 0:x.seq)!=s.appr_seq})]})]})})})]})};export{st as default};