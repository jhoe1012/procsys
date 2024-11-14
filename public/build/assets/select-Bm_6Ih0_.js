import{r,b as Ne,j as l}from"./app-MU4G-Byx.js";import{g as Ie,f as G,c as Le,e as He,a as V,D as kt,u as je,d as Lt}from"./x-BMg8NCoc.js";import{c as Ht,V as Bt}from"./toaster-CFkZYlIR.js";import{u as K,S as Vt,c as Q}from"./utils-4iQOYLYF.js";import{u as $t}from"./tabs-C1pHHI9R.js";import{h as Wt,u as Ft,R as Ut,F as zt}from"./Combination-CIgJlBpF.js";import{u as Ee}from"./index-GDLwQRUD.js";import{e as Kt,o as Yt,s as Gt,f as Xt,g as qt,i as Zt,j as Me,l as Jt,k as Qt}from"./useStateManager-7e1e8489.esm-nzldimRY.js";import{P as $}from"./index-BOSww_VN.js";var he=typeof document<"u"?r.useLayoutEffect:r.useEffect;function ge(e,o){if(e===o)return!0;if(typeof e!=typeof o)return!1;if(typeof e=="function"&&e.toString()===o.toString())return!0;let t,n,s;if(e&&o&&typeof e=="object"){if(Array.isArray(e)){if(t=e.length,t!==o.length)return!1;for(n=t;n--!==0;)if(!ge(e[n],o[n]))return!1;return!0}if(s=Object.keys(e),t=s.length,t!==Object.keys(o).length)return!1;for(n=t;n--!==0;)if(!{}.hasOwnProperty.call(o,s[n]))return!1;for(n=t;n--!==0;){const d=s[n];if(!(d==="_owner"&&e.$$typeof)&&!ge(e[d],o[d]))return!1}return!0}return e!==e&&o!==o}function Be(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function Oe(e,o){const t=Be(e);return Math.round(o*t)/t}function De(e){const o=r.useRef(e);return he(()=>{o.current=e}),o}function eo(e){e===void 0&&(e={});const{placement:o="bottom",strategy:t="absolute",middleware:n=[],platform:s,elements:{reference:d,floating:a}={},transform:c=!0,whileElementsMounted:i,open:u}=e,[g,x]=r.useState({x:0,y:0,strategy:t,placement:o,middlewareData:{},isPositioned:!1}),[b,R]=r.useState(n);ge(b,n)||R(n);const[f,v]=r.useState(null),[y,h]=r.useState(null),p=r.useCallback(S=>{S!==M.current&&(M.current=S,v(S))},[]),w=r.useCallback(S=>{S!==T.current&&(T.current=S,h(S))},[]),_=d||f,A=a||y,M=r.useRef(null),T=r.useRef(null),j=r.useRef(g),Y=i!=null,z=De(i),W=De(s),O=r.useCallback(()=>{if(!M.current||!T.current)return;const S={placement:o,strategy:t,middleware:b};W.current&&(S.platform=W.current),Kt(M.current,T.current,S).then(D=>{const k={...D,isPositioned:!0};L.current&&!ge(j.current,k)&&(j.current=k,Ne.flushSync(()=>{x(k)}))})},[b,o,t,W]);he(()=>{u===!1&&j.current.isPositioned&&(j.current.isPositioned=!1,x(S=>({...S,isPositioned:!1})))},[u]);const L=r.useRef(!1);he(()=>(L.current=!0,()=>{L.current=!1}),[]),he(()=>{if(_&&(M.current=_),A&&(T.current=A),_&&A){if(z.current)return z.current(_,A,O);O()}},[_,A,O,z,Y]);const F=r.useMemo(()=>({reference:M,floating:T,setReference:p,setFloating:w}),[p,w]),N=r.useMemo(()=>({reference:_,floating:A}),[_,A]),B=r.useMemo(()=>{const S={position:t,left:0,top:0};if(!N.floating)return S;const D=Oe(N.floating,g.x),k=Oe(N.floating,g.y);return c?{...S,transform:"translate("+D+"px, "+k+"px)",...Be(N.floating)>=1.5&&{willChange:"transform"}}:{position:t,left:D,top:k}},[t,c,N.floating,g.x,g.y]);return r.useMemo(()=>({...g,update:O,refs:F,elements:N,floatingStyles:B}),[g,O,F,N,B])}const to=e=>{function o(t){return{}.hasOwnProperty.call(t,"current")}return{name:"arrow",options:e,fn(t){const{element:n,padding:s}=typeof e=="function"?e(t):e;return n&&o(n)?n.current!=null?Me({element:n.current,padding:s}).fn(t):{}:n?Me({element:n,padding:s}).fn(t):{}}}},oo=(e,o)=>({...Yt(e),options:[e,o]}),ro=(e,o)=>({...Gt(e),options:[e,o]}),no=(e,o)=>({...Jt(e),options:[e,o]}),so=(e,o)=>({...Xt(e),options:[e,o]}),ao=(e,o)=>({...qt(e),options:[e,o]}),io=(e,o)=>({...Zt(e),options:[e,o]}),lo=(e,o)=>({...to(e),options:[e,o]});/**
 * @license lucide-react v0.397.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const co=Ie("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.397.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=Ie("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.397.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uo=Ie("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);function ke(e,[o,t]){return Math.min(t,Math.max(o,e))}var po="Arrow",$e=r.forwardRef((e,o)=>{const{children:t,width:n=10,height:s=5,...d}=e;return l.jsx($.svg,{...d,ref:o,width:n,height:s,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?t:l.jsx("polygon",{points:"0,0 30,0 15,10"})})});$e.displayName=po;var fo=$e;function mo(e){const[o,t]=r.useState(void 0);return G(()=>{if(e){t({width:e.offsetWidth,height:e.offsetHeight});const n=new ResizeObserver(s=>{if(!Array.isArray(s)||!s.length)return;const d=s[0];let a,c;if("borderBoxSize"in d){const i=d.borderBoxSize,u=Array.isArray(i)?i[0]:i;a=u.inlineSize,c=u.blockSize}else a=e.offsetWidth,c=e.offsetHeight;t({width:a,height:c})});return n.observe(e,{box:"border-box"}),()=>n.unobserve(e)}else t(void 0)},[e]),o}var Te="Popper",[We,Fe]=Le(Te),[ho,Ue]=We(Te),ze=e=>{const{__scopePopper:o,children:t}=e,[n,s]=r.useState(null);return l.jsx(ho,{scope:o,anchor:n,onAnchorChange:s,children:t})};ze.displayName=Te;var Ke="PopperAnchor",Ye=r.forwardRef((e,o)=>{const{__scopePopper:t,virtualRef:n,...s}=e,d=Ue(Ke,t),a=r.useRef(null),c=K(o,a);return r.useEffect(()=>{d.onAnchorChange((n==null?void 0:n.current)||a.current)}),n?null:l.jsx($.div,{...s,ref:c})});Ye.displayName=Ke;var Ae="PopperContent",[go,vo]=We(Ae),Ge=r.forwardRef((e,o)=>{var m,E,H,I,C,P;const{__scopePopper:t,side:n="bottom",sideOffset:s=0,align:d="center",alignOffset:a=0,arrowPadding:c=0,avoidCollisions:i=!0,collisionBoundary:u=[],collisionPadding:g=0,sticky:x="partial",hideWhenDetached:b=!1,updatePositionStrategy:R="optimized",onPlaced:f,...v}=e,y=Ue(Ae,t),[h,p]=r.useState(null),w=K(o,U=>p(U)),[_,A]=r.useState(null),M=mo(_),T=(M==null?void 0:M.width)??0,j=(M==null?void 0:M.height)??0,Y=n+(d!=="center"?"-"+d:""),z=typeof g=="number"?g:{top:0,right:0,bottom:0,left:0,...g},W=Array.isArray(u)?u:[u],O=W.length>0,L={padding:z,boundary:W.filter(wo),altBoundary:O},{refs:F,floatingStyles:N,placement:B,isPositioned:S,middlewareData:D}=eo({strategy:"fixed",placement:Y,whileElementsMounted:(...U)=>Qt(...U,{animationFrame:R==="always"}),elements:{reference:y.anchor},middleware:[oo({mainAxis:s+j,alignmentAxis:a}),i&&ro({mainAxis:!0,crossAxis:!1,limiter:x==="partial"?no():void 0,...L}),i&&so({...L}),ao({...L,apply:({elements:U,rects:X,availableWidth:ce,availableHeight:de})=>{const{width:ue,height:Dt}=X.reference,me=U.floating.style;me.setProperty("--radix-popper-available-width",`${ce}px`),me.setProperty("--radix-popper-available-height",`${de}px`),me.setProperty("--radix-popper-anchor-width",`${ue}px`),me.setProperty("--radix-popper-anchor-height",`${Dt}px`)}}),_&&lo({element:_,padding:c}),So({arrowWidth:T,arrowHeight:j}),b&&io({strategy:"referenceHidden",...L})]}),[k,ae]=Ze(B),q=He(f);G(()=>{S&&(q==null||q())},[S,q]);const ie=(m=D.arrow)==null?void 0:m.x,le=(E=D.arrow)==null?void 0:E.y,J=((H=D.arrow)==null?void 0:H.centerOffset)!==0,[ne,oe]=r.useState();return G(()=>{h&&oe(window.getComputedStyle(h).zIndex)},[h]),l.jsx("div",{ref:F.setFloating,"data-radix-popper-content-wrapper":"",style:{...N,transform:S?N.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:ne,"--radix-popper-transform-origin":[(I=D.transformOrigin)==null?void 0:I.x,(C=D.transformOrigin)==null?void 0:C.y].join(" "),...((P=D.hide)==null?void 0:P.referenceHidden)&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:l.jsx(go,{scope:t,placedSide:k,onArrowChange:A,arrowX:ie,arrowY:le,shouldHideArrow:J,children:l.jsx($.div,{"data-side":k,"data-align":ae,...v,ref:w,style:{...v.style,animation:S?void 0:"none"}})})})});Ge.displayName=Ae;var Xe="PopperArrow",xo={top:"bottom",right:"left",bottom:"top",left:"right"},qe=r.forwardRef(function(o,t){const{__scopePopper:n,...s}=o,d=vo(Xe,n),a=xo[d.placedSide];return l.jsx("span",{ref:d.onArrowChange,style:{position:"absolute",left:d.arrowX,top:d.arrowY,[a]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[d.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[d.placedSide],visibility:d.shouldHideArrow?"hidden":void 0},children:l.jsx(fo,{...s,ref:t,style:{...s.style,display:"block"}})})});qe.displayName=Xe;function wo(e){return e!==null}var So=e=>({name:"transformOrigin",options:e,fn(o){var y,h,p;const{placement:t,rects:n,middlewareData:s}=o,a=((y=s.arrow)==null?void 0:y.centerOffset)!==0,c=a?0:e.arrowWidth,i=a?0:e.arrowHeight,[u,g]=Ze(t),x={start:"0%",center:"50%",end:"100%"}[g],b=(((h=s.arrow)==null?void 0:h.x)??0)+c/2,R=(((p=s.arrow)==null?void 0:p.y)??0)+i/2;let f="",v="";return u==="bottom"?(f=a?x:`${b}px`,v=`${-i}px`):u==="top"?(f=a?x:`${b}px`,v=`${n.floating.height+i}px`):u==="right"?(f=`${-i}px`,v=a?x:`${R}px`):u==="left"&&(f=`${n.floating.width+i}px`,v=a?x:`${R}px`),{data:{x:f,y:v}}}});function Ze(e){const[o,t="center"]=e.split("-");return[o,t]}var yo=ze,Co=Ye,Po=Ge,bo=qe;function Ro(e){const o=r.useRef({value:e,previous:e});return r.useMemo(()=>(o.current.value!==e&&(o.current.previous=o.current.value,o.current.value=e),o.current.previous),[e])}var No=[" ","Enter","ArrowUp","ArrowDown"],Io=[" ","Enter"],fe="Select",[xe,we,Eo]=Ht(fe),[se,pr]=Le(fe,[Eo,Fe]),Se=Fe(),[To,ee]=se(fe),[Ao,_o]=se(fe),Je=e=>{const{__scopeSelect:o,children:t,open:n,defaultOpen:s,onOpenChange:d,value:a,defaultValue:c,onValueChange:i,dir:u,name:g,autoComplete:x,disabled:b,required:R}=e,f=Se(o),[v,y]=r.useState(null),[h,p]=r.useState(null),[w,_]=r.useState(!1),A=$t(u),[M=!1,T]=je({prop:n,defaultProp:s,onChange:d}),[j,Y]=je({prop:a,defaultProp:c,onChange:i}),z=r.useRef(null),W=v?!!v.closest("form"):!0,[O,L]=r.useState(new Set),F=Array.from(O).map(N=>N.props.value).join(";");return l.jsx(yo,{...f,children:l.jsxs(To,{required:R,scope:o,trigger:v,onTriggerChange:y,valueNode:h,onValueNodeChange:p,valueNodeHasChildren:w,onValueNodeHasChildrenChange:_,contentId:Ee(),value:j,onValueChange:Y,open:M,onOpenChange:T,dir:A,triggerPointerDownPosRef:z,disabled:b,children:[l.jsx(xe.Provider,{scope:o,children:l.jsx(Ao,{scope:e.__scopeSelect,onNativeOptionAdd:r.useCallback(N=>{L(B=>new Set(B).add(N))},[]),onNativeOptionRemove:r.useCallback(N=>{L(B=>{const S=new Set(B);return S.delete(N),S})},[]),children:t})}),W?l.jsxs(Pt,{"aria-hidden":!0,required:R,tabIndex:-1,name:g,autoComplete:x,value:j,onChange:N=>Y(N.target.value),disabled:b,children:[j===void 0?l.jsx("option",{value:""}):null,Array.from(O)]},F):null]})})};Je.displayName=fe;var Qe="SelectTrigger",et=r.forwardRef((e,o)=>{const{__scopeSelect:t,disabled:n=!1,...s}=e,d=Se(t),a=ee(Qe,t),c=a.disabled||n,i=K(o,a.onTriggerChange),u=we(t),[g,x,b]=bt(f=>{const v=u().filter(p=>!p.disabled),y=v.find(p=>p.value===a.value),h=Rt(v,f,y);h!==void 0&&a.onValueChange(h.value)}),R=()=>{c||(a.onOpenChange(!0),b())};return l.jsx(Co,{asChild:!0,...d,children:l.jsx($.button,{type:"button",role:"combobox","aria-controls":a.contentId,"aria-expanded":a.open,"aria-required":a.required,"aria-autocomplete":"none",dir:a.dir,"data-state":a.open?"open":"closed",disabled:c,"data-disabled":c?"":void 0,"data-placeholder":Ct(a.value)?"":void 0,...s,ref:i,onClick:V(s.onClick,f=>{f.currentTarget.focus()}),onPointerDown:V(s.onPointerDown,f=>{const v=f.target;v.hasPointerCapture(f.pointerId)&&v.releasePointerCapture(f.pointerId),f.button===0&&f.ctrlKey===!1&&(R(),a.triggerPointerDownPosRef.current={x:Math.round(f.pageX),y:Math.round(f.pageY)},f.preventDefault())}),onKeyDown:V(s.onKeyDown,f=>{const v=g.current!=="";!(f.ctrlKey||f.altKey||f.metaKey)&&f.key.length===1&&x(f.key),!(v&&f.key===" ")&&No.includes(f.key)&&(R(),f.preventDefault())})})})});et.displayName=Qe;var tt="SelectValue",ot=r.forwardRef((e,o)=>{const{__scopeSelect:t,className:n,style:s,children:d,placeholder:a="",...c}=e,i=ee(tt,t),{onValueNodeHasChildrenChange:u}=i,g=d!==void 0,x=K(o,i.onValueNodeChange);return G(()=>{u(g)},[u,g]),l.jsx($.span,{...c,ref:x,style:{pointerEvents:"none"},children:Ct(i.value)?l.jsx(l.Fragment,{children:a}):d})});ot.displayName=tt;var jo="SelectIcon",rt=r.forwardRef((e,o)=>{const{__scopeSelect:t,children:n,...s}=e;return l.jsx($.span,{"aria-hidden":!0,...s,ref:o,children:n||"▼"})});rt.displayName=jo;var Mo="SelectPortal",nt=e=>l.jsx(Lt,{asChild:!0,...e});nt.displayName=Mo;var re="SelectContent",st=r.forwardRef((e,o)=>{const t=ee(re,e.__scopeSelect),[n,s]=r.useState();if(G(()=>{s(new DocumentFragment)},[]),!t.open){const d=n;return d?Ne.createPortal(l.jsx(at,{scope:e.__scopeSelect,children:l.jsx(xe.Slot,{scope:e.__scopeSelect,children:l.jsx("div",{children:e.children})})}),d):null}return l.jsx(it,{...e,ref:o})});st.displayName=re;var Z=10,[at,te]=se(re),Oo="SelectContentImpl",it=r.forwardRef((e,o)=>{const{__scopeSelect:t,position:n="item-aligned",onCloseAutoFocus:s,onEscapeKeyDown:d,onPointerDownOutside:a,side:c,sideOffset:i,align:u,alignOffset:g,arrowPadding:x,collisionBoundary:b,collisionPadding:R,sticky:f,hideWhenDetached:v,avoidCollisions:y,...h}=e,p=ee(re,t),[w,_]=r.useState(null),[A,M]=r.useState(null),T=K(o,m=>_(m)),[j,Y]=r.useState(null),[z,W]=r.useState(null),O=we(t),[L,F]=r.useState(!1),N=r.useRef(!1);r.useEffect(()=>{if(w)return Wt(w)},[w]),Ft();const B=r.useCallback(m=>{const[E,...H]=O().map(P=>P.ref.current),[I]=H.slice(-1),C=document.activeElement;for(const P of m)if(P===C||(P==null||P.scrollIntoView({block:"nearest"}),P===E&&A&&(A.scrollTop=0),P===I&&A&&(A.scrollTop=A.scrollHeight),P==null||P.focus(),document.activeElement!==C))return},[O,A]),S=r.useCallback(()=>B([j,w]),[B,j,w]);r.useEffect(()=>{L&&S()},[L,S]);const{onOpenChange:D,triggerPointerDownPosRef:k}=p;r.useEffect(()=>{if(w){let m={x:0,y:0};const E=I=>{var C,P;m={x:Math.abs(Math.round(I.pageX)-(((C=k.current)==null?void 0:C.x)??0)),y:Math.abs(Math.round(I.pageY)-(((P=k.current)==null?void 0:P.y)??0))}},H=I=>{m.x<=10&&m.y<=10?I.preventDefault():w.contains(I.target)||D(!1),document.removeEventListener("pointermove",E),k.current=null};return k.current!==null&&(document.addEventListener("pointermove",E),document.addEventListener("pointerup",H,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",E),document.removeEventListener("pointerup",H,{capture:!0})}}},[w,D,k]),r.useEffect(()=>{const m=()=>D(!1);return window.addEventListener("blur",m),window.addEventListener("resize",m),()=>{window.removeEventListener("blur",m),window.removeEventListener("resize",m)}},[D]);const[ae,q]=bt(m=>{const E=O().filter(C=>!C.disabled),H=E.find(C=>C.ref.current===document.activeElement),I=Rt(E,m,H);I&&setTimeout(()=>I.ref.current.focus())}),ie=r.useCallback((m,E,H)=>{const I=!N.current&&!H;(p.value!==void 0&&p.value===E||I)&&(Y(m),I&&(N.current=!0))},[p.value]),le=r.useCallback(()=>w==null?void 0:w.focus(),[w]),J=r.useCallback((m,E,H)=>{const I=!N.current&&!H;(p.value!==void 0&&p.value===E||I)&&W(m)},[p.value]),ne=n==="popper"?ye:lt,oe=ne===ye?{side:c,sideOffset:i,align:u,alignOffset:g,arrowPadding:x,collisionBoundary:b,collisionPadding:R,sticky:f,hideWhenDetached:v,avoidCollisions:y}:{};return l.jsx(at,{scope:t,content:w,viewport:A,onViewportChange:M,itemRefCallback:ie,selectedItem:j,onItemLeave:le,itemTextRefCallback:J,focusSelectedItem:S,selectedItemText:z,position:n,isPositioned:L,searchRef:ae,children:l.jsx(Ut,{as:Vt,allowPinchZoom:!0,children:l.jsx(zt,{asChild:!0,trapped:p.open,onMountAutoFocus:m=>{m.preventDefault()},onUnmountAutoFocus:V(s,m=>{var E;(E=p.trigger)==null||E.focus({preventScroll:!0}),m.preventDefault()}),children:l.jsx(kt,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:d,onPointerDownOutside:a,onFocusOutside:m=>m.preventDefault(),onDismiss:()=>p.onOpenChange(!1),children:l.jsx(ne,{role:"listbox",id:p.contentId,"data-state":p.open?"open":"closed",dir:p.dir,onContextMenu:m=>m.preventDefault(),...h,...oe,onPlaced:()=>F(!0),ref:T,style:{display:"flex",flexDirection:"column",outline:"none",...h.style},onKeyDown:V(h.onKeyDown,m=>{const E=m.ctrlKey||m.altKey||m.metaKey;if(m.key==="Tab"&&m.preventDefault(),!E&&m.key.length===1&&q(m.key),["ArrowUp","ArrowDown","Home","End"].includes(m.key)){let I=O().filter(C=>!C.disabled).map(C=>C.ref.current);if(["ArrowUp","End"].includes(m.key)&&(I=I.slice().reverse()),["ArrowUp","ArrowDown"].includes(m.key)){const C=m.target,P=I.indexOf(C);I=I.slice(P+1)}setTimeout(()=>B(I)),m.preventDefault()}})})})})})})});it.displayName=Oo;var Do="SelectItemAlignedPosition",lt=r.forwardRef((e,o)=>{const{__scopeSelect:t,onPlaced:n,...s}=e,d=ee(re,t),a=te(re,t),[c,i]=r.useState(null),[u,g]=r.useState(null),x=K(o,T=>g(T)),b=we(t),R=r.useRef(!1),f=r.useRef(!0),{viewport:v,selectedItem:y,selectedItemText:h,focusSelectedItem:p}=a,w=r.useCallback(()=>{if(d.trigger&&d.valueNode&&c&&u&&v&&y&&h){const T=d.trigger.getBoundingClientRect(),j=u.getBoundingClientRect(),Y=d.valueNode.getBoundingClientRect(),z=h.getBoundingClientRect();if(d.dir!=="rtl"){const C=z.left-j.left,P=Y.left-C,U=T.left-P,X=T.width+U,ce=Math.max(X,j.width),de=window.innerWidth-Z,ue=ke(P,[Z,de-ce]);c.style.minWidth=X+"px",c.style.left=ue+"px"}else{const C=j.right-z.right,P=window.innerWidth-Y.right-C,U=window.innerWidth-T.right-P,X=T.width+U,ce=Math.max(X,j.width),de=window.innerWidth-Z,ue=ke(P,[Z,de-ce]);c.style.minWidth=X+"px",c.style.right=ue+"px"}const W=b(),O=window.innerHeight-Z*2,L=v.scrollHeight,F=window.getComputedStyle(u),N=parseInt(F.borderTopWidth,10),B=parseInt(F.paddingTop,10),S=parseInt(F.borderBottomWidth,10),D=parseInt(F.paddingBottom,10),k=N+B+L+D+S,ae=Math.min(y.offsetHeight*5,k),q=window.getComputedStyle(v),ie=parseInt(q.paddingTop,10),le=parseInt(q.paddingBottom,10),J=T.top+T.height/2-Z,ne=O-J,oe=y.offsetHeight/2,m=y.offsetTop+oe,E=N+B+m,H=k-E;if(E<=J){const C=y===W[W.length-1].ref.current;c.style.bottom="0px";const P=u.clientHeight-v.offsetTop-v.offsetHeight,U=Math.max(ne,oe+(C?le:0)+P+S),X=E+U;c.style.height=X+"px"}else{const C=y===W[0].ref.current;c.style.top="0px";const U=Math.max(J,N+v.offsetTop+(C?ie:0)+oe)+H;c.style.height=U+"px",v.scrollTop=E-J+v.offsetTop}c.style.margin=`${Z}px 0`,c.style.minHeight=ae+"px",c.style.maxHeight=O+"px",n==null||n(),requestAnimationFrame(()=>R.current=!0)}},[b,d.trigger,d.valueNode,c,u,v,y,h,d.dir,n]);G(()=>w(),[w]);const[_,A]=r.useState();G(()=>{u&&A(window.getComputedStyle(u).zIndex)},[u]);const M=r.useCallback(T=>{T&&f.current===!0&&(w(),p==null||p(),f.current=!1)},[w,p]);return l.jsx(Lo,{scope:t,contentWrapper:c,shouldExpandOnScrollRef:R,onScrollButtonChange:M,children:l.jsx("div",{ref:i,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:_},children:l.jsx($.div,{...s,ref:x,style:{boxSizing:"border-box",maxHeight:"100%",...s.style}})})})});lt.displayName=Do;var ko="SelectPopperPosition",ye=r.forwardRef((e,o)=>{const{__scopeSelect:t,align:n="start",collisionPadding:s=Z,...d}=e,a=Se(t);return l.jsx(Po,{...a,...d,ref:o,align:n,collisionPadding:s,style:{boxSizing:"border-box",...d.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});ye.displayName=ko;var[Lo,_e]=se(re,{}),Ce="SelectViewport",ct=r.forwardRef((e,o)=>{const{__scopeSelect:t,nonce:n,...s}=e,d=te(Ce,t),a=_e(Ce,t),c=K(o,d.onViewportChange),i=r.useRef(0);return l.jsxs(l.Fragment,{children:[l.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:n}),l.jsx(xe.Slot,{scope:t,children:l.jsx($.div,{"data-radix-select-viewport":"",role:"presentation",...s,ref:c,style:{position:"relative",flex:1,overflow:"auto",...s.style},onScroll:V(s.onScroll,u=>{const g=u.currentTarget,{contentWrapper:x,shouldExpandOnScrollRef:b}=a;if(b!=null&&b.current&&x){const R=Math.abs(i.current-g.scrollTop);if(R>0){const f=window.innerHeight-Z*2,v=parseFloat(x.style.minHeight),y=parseFloat(x.style.height),h=Math.max(v,y);if(h<f){const p=h+R,w=Math.min(f,p),_=p-w;x.style.height=w+"px",x.style.bottom==="0px"&&(g.scrollTop=_>0?_:0,x.style.justifyContent="flex-end")}}}i.current=g.scrollTop})})})]})});ct.displayName=Ce;var dt="SelectGroup",[Ho,Bo]=se(dt),Vo=r.forwardRef((e,o)=>{const{__scopeSelect:t,...n}=e,s=Ee();return l.jsx(Ho,{scope:t,id:s,children:l.jsx($.div,{role:"group","aria-labelledby":s,...n,ref:o})})});Vo.displayName=dt;var ut="SelectLabel",pt=r.forwardRef((e,o)=>{const{__scopeSelect:t,...n}=e,s=Bo(ut,t);return l.jsx($.div,{id:s.id,...n,ref:o})});pt.displayName=ut;var ve="SelectItem",[$o,ft]=se(ve),mt=r.forwardRef((e,o)=>{const{__scopeSelect:t,value:n,disabled:s=!1,textValue:d,...a}=e,c=ee(ve,t),i=te(ve,t),u=c.value===n,[g,x]=r.useState(d??""),[b,R]=r.useState(!1),f=K(o,h=>{var p;return(p=i.itemRefCallback)==null?void 0:p.call(i,h,n,s)}),v=Ee(),y=()=>{s||(c.onValueChange(n),c.onOpenChange(!1))};if(n==="")throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return l.jsx($o,{scope:t,value:n,disabled:s,textId:v,isSelected:u,onItemTextChange:r.useCallback(h=>{x(p=>p||((h==null?void 0:h.textContent)??"").trim())},[]),children:l.jsx(xe.ItemSlot,{scope:t,value:n,disabled:s,textValue:g,children:l.jsx($.div,{role:"option","aria-labelledby":v,"data-highlighted":b?"":void 0,"aria-selected":u&&b,"data-state":u?"checked":"unchecked","aria-disabled":s||void 0,"data-disabled":s?"":void 0,tabIndex:s?void 0:-1,...a,ref:f,onFocus:V(a.onFocus,()=>R(!0)),onBlur:V(a.onBlur,()=>R(!1)),onPointerUp:V(a.onPointerUp,y),onPointerMove:V(a.onPointerMove,h=>{var p;s?(p=i.onItemLeave)==null||p.call(i):h.currentTarget.focus({preventScroll:!0})}),onPointerLeave:V(a.onPointerLeave,h=>{var p;h.currentTarget===document.activeElement&&((p=i.onItemLeave)==null||p.call(i))}),onKeyDown:V(a.onKeyDown,h=>{var w;((w=i.searchRef)==null?void 0:w.current)!==""&&h.key===" "||(Io.includes(h.key)&&y(),h.key===" "&&h.preventDefault())})})})})});mt.displayName=ve;var pe="SelectItemText",ht=r.forwardRef((e,o)=>{const{__scopeSelect:t,className:n,style:s,...d}=e,a=ee(pe,t),c=te(pe,t),i=ft(pe,t),u=_o(pe,t),[g,x]=r.useState(null),b=K(o,h=>x(h),i.onItemTextChange,h=>{var p;return(p=c.itemTextRefCallback)==null?void 0:p.call(c,h,i.value,i.disabled)}),R=g==null?void 0:g.textContent,f=r.useMemo(()=>l.jsx("option",{value:i.value,disabled:i.disabled,children:R},i.value),[i.disabled,i.value,R]),{onNativeOptionAdd:v,onNativeOptionRemove:y}=u;return G(()=>(v(f),()=>y(f)),[v,y,f]),l.jsxs(l.Fragment,{children:[l.jsx($.span,{id:i.textId,...d,ref:b}),i.isSelected&&a.valueNode&&!a.valueNodeHasChildren?Ne.createPortal(d.children,a.valueNode):null]})});ht.displayName=pe;var gt="SelectItemIndicator",vt=r.forwardRef((e,o)=>{const{__scopeSelect:t,...n}=e;return ft(gt,t).isSelected?l.jsx($.span,{"aria-hidden":!0,...n,ref:o}):null});vt.displayName=gt;var Pe="SelectScrollUpButton",xt=r.forwardRef((e,o)=>{const t=te(Pe,e.__scopeSelect),n=_e(Pe,e.__scopeSelect),[s,d]=r.useState(!1),a=K(o,n.onScrollButtonChange);return G(()=>{if(t.viewport&&t.isPositioned){let c=function(){const u=i.scrollTop>0;d(u)};const i=t.viewport;return c(),i.addEventListener("scroll",c),()=>i.removeEventListener("scroll",c)}},[t.viewport,t.isPositioned]),s?l.jsx(St,{...e,ref:a,onAutoScroll:()=>{const{viewport:c,selectedItem:i}=t;c&&i&&(c.scrollTop=c.scrollTop-i.offsetHeight)}}):null});xt.displayName=Pe;var be="SelectScrollDownButton",wt=r.forwardRef((e,o)=>{const t=te(be,e.__scopeSelect),n=_e(be,e.__scopeSelect),[s,d]=r.useState(!1),a=K(o,n.onScrollButtonChange);return G(()=>{if(t.viewport&&t.isPositioned){let c=function(){const u=i.scrollHeight-i.clientHeight,g=Math.ceil(i.scrollTop)<u;d(g)};const i=t.viewport;return c(),i.addEventListener("scroll",c),()=>i.removeEventListener("scroll",c)}},[t.viewport,t.isPositioned]),s?l.jsx(St,{...e,ref:a,onAutoScroll:()=>{const{viewport:c,selectedItem:i}=t;c&&i&&(c.scrollTop=c.scrollTop+i.offsetHeight)}}):null});wt.displayName=be;var St=r.forwardRef((e,o)=>{const{__scopeSelect:t,onAutoScroll:n,...s}=e,d=te("SelectScrollButton",t),a=r.useRef(null),c=we(t),i=r.useCallback(()=>{a.current!==null&&(window.clearInterval(a.current),a.current=null)},[]);return r.useEffect(()=>()=>i(),[i]),G(()=>{var g;const u=c().find(x=>x.ref.current===document.activeElement);(g=u==null?void 0:u.ref.current)==null||g.scrollIntoView({block:"nearest"})},[c]),l.jsx($.div,{"aria-hidden":!0,...s,ref:o,style:{flexShrink:0,...s.style},onPointerDown:V(s.onPointerDown,()=>{a.current===null&&(a.current=window.setInterval(n,50))}),onPointerMove:V(s.onPointerMove,()=>{var u;(u=d.onItemLeave)==null||u.call(d),a.current===null&&(a.current=window.setInterval(n,50))}),onPointerLeave:V(s.onPointerLeave,()=>{i()})})}),Wo="SelectSeparator",yt=r.forwardRef((e,o)=>{const{__scopeSelect:t,...n}=e;return l.jsx($.div,{"aria-hidden":!0,...n,ref:o})});yt.displayName=Wo;var Re="SelectArrow",Fo=r.forwardRef((e,o)=>{const{__scopeSelect:t,...n}=e,s=Se(t),d=ee(Re,t),a=te(Re,t);return d.open&&a.position==="popper"?l.jsx(bo,{...s,...n,ref:o}):null});Fo.displayName=Re;function Ct(e){return e===""||e===void 0}var Pt=r.forwardRef((e,o)=>{const{value:t,...n}=e,s=r.useRef(null),d=K(o,s),a=Ro(t);return r.useEffect(()=>{const c=s.current,i=window.HTMLSelectElement.prototype,g=Object.getOwnPropertyDescriptor(i,"value").set;if(a!==t&&g){const x=new Event("change",{bubbles:!0});g.call(c,t),c.dispatchEvent(x)}},[a,t]),l.jsx(Bt,{asChild:!0,children:l.jsx("select",{...n,ref:d,defaultValue:t})})});Pt.displayName="BubbleSelect";function bt(e){const o=He(e),t=r.useRef(""),n=r.useRef(0),s=r.useCallback(a=>{const c=t.current+a;o(c),function i(u){t.current=u,window.clearTimeout(n.current),u!==""&&(n.current=window.setTimeout(()=>i(""),1e3))}(c)},[o]),d=r.useCallback(()=>{t.current="",window.clearTimeout(n.current)},[]);return r.useEffect(()=>()=>window.clearTimeout(n.current),[]),[t,s,d]}function Rt(e,o,t){const s=o.length>1&&Array.from(o).every(u=>u===o[0])?o[0]:o,d=t?e.indexOf(t):-1;let a=Uo(e,Math.max(d,0));s.length===1&&(a=a.filter(u=>u!==t));const i=a.find(u=>u.textValue.toLowerCase().startsWith(s.toLowerCase()));return i!==t?i:void 0}function Uo(e,o){return e.map((t,n)=>e[(o+n)%e.length])}var zo=Je,Nt=et,Ko=ot,Yo=rt,Go=nt,It=st,Xo=ct,Et=pt,Tt=mt,qo=ht,Zo=vt,At=xt,_t=wt,jt=yt;const fr=zo,mr=Ko,Jo=r.forwardRef(({className:e,children:o,...t},n)=>l.jsxs(Nt,{ref:n,className:Q("flex h-7 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",e),...t,children:[o,l.jsx(Yo,{asChild:!0,children:l.jsx(Ve,{className:"h-4 w-4 opacity-50"})})]}));Jo.displayName=Nt.displayName;const Mt=r.forwardRef(({className:e,...o},t)=>l.jsx(At,{ref:t,className:Q("flex cursor-default items-center justify-center py-1",e),...o,children:l.jsx(uo,{className:"h-4 w-4"})}));Mt.displayName=At.displayName;const Ot=r.forwardRef(({className:e,...o},t)=>l.jsx(_t,{ref:t,className:Q("flex cursor-default items-center justify-center py-1",e),...o,children:l.jsx(Ve,{className:"h-4 w-4"})}));Ot.displayName=_t.displayName;const Qo=r.forwardRef(({className:e,children:o,position:t="popper",...n},s)=>l.jsx(Go,{children:l.jsxs(It,{ref:s,className:Q("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",e),position:t,...n,children:[l.jsx(Mt,{}),l.jsx(Xo,{className:Q("p-1",t==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:o}),l.jsx(Ot,{})]})}));Qo.displayName=It.displayName;const er=r.forwardRef(({className:e,...o},t)=>l.jsx(Et,{ref:t,className:Q("py-1.5 pl-8 pr-2 text-sm font-semibold",e),...o}));er.displayName=Et.displayName;const tr=r.forwardRef(({className:e,children:o,...t},n)=>l.jsxs(Tt,{ref:n,className:Q("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),...t,children:[l.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:l.jsx(Zo,{children:l.jsx(co,{className:"h-4 w-4"})})}),l.jsx(qo,{children:o})]}));tr.displayName=Tt.displayName;const or=r.forwardRef(({className:e,...o},t)=>l.jsx(jt,{ref:t,className:Q("-mx-1 my-1 h-px bg-muted",e),...o}));or.displayName=jt.displayName;export{fr as S,Jo as a,mr as b,Qo as c,tr as d};