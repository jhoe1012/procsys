import{r as s,R as m,b as ge,j as R}from"./app-DrKxL2JF.js";import{s as te,I as b,H as y,o as g,y as M,n as A,a as ne,u as Y,b as X,t as re,T as Ke,l as oe,p as qe,f as we,O as fe,c as be,i as B,m as ze,d as Je,X as ye,e as V}from"./transition-FMJMOV8j.js";function le(e){return te.isServer?null:e instanceof Node?e.ownerDocument:e!=null&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}let Ze=s.createContext(void 0);function Qe(){return s.useContext(Ze)}let et="div";var G=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(G||{});function tt(e,t){var n;let{features:r=1,...o}=e,l={ref:t,"aria-hidden":(r&2)===2?!0:(n=o["aria-hidden"])!=null?n:void 0,hidden:(r&4)===4?!0:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(r&4)===4&&(r&2)!==2&&{display:"none"}}};return y({ourProps:l,theirProps:o,slot:{},defaultTag:et,name:"Hidden"})}let z=b(tt),nt=s.createContext(null);function rt({children:e}){let t=s.useContext(nt);if(!t)return m.createElement(m.Fragment,null,e);let{target:n}=t;return n?ge.createPortal(m.createElement(m.Fragment,null,e),n):null}let ae=s.createContext(null);ae.displayName="DescriptionContext";function $e(){let e=s.useContext(ae);if(e===null){let t=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,$e),t}return e}function ot(){let[e,t]=s.useState([]);return[e.length>0?e.join(" "):void 0,s.useMemo(()=>function(n){let r=g(l=>(t(a=>[...a,l]),()=>t(a=>{let u=a.slice(),i=u.indexOf(l);return i!==-1&&u.splice(i,1),u}))),o=s.useMemo(()=>({register:r,slot:n.slot,name:n.name,props:n.props,value:n.value}),[r,n.slot,n.name,n.props,n.value]);return m.createElement(ae.Provider,{value:o},n.children)},[t])]}let lt="p";function at(e,t){let n=s.useId(),r=Qe(),{id:o=`headlessui-description-${n}`,...l}=e,a=$e(),u=M(t);A(()=>a.register(o),[o,a.register]);let i=r||!1,d=s.useMemo(()=>({...a.slot,disabled:i}),[a.slot,i]),c={ref:u,...a.props,id:o};return y({ourProps:c,theirProps:l,slot:d,defaultTag:lt,name:a.name||"Description"})}let it=b(at),ut=Object.assign(it,{});var xe=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(xe||{});let st=s.createContext(()=>{});function ct({value:e,children:t}){return m.createElement(st.Provider,{value:e},t)}let dt=class extends Map{constructor(t){super(),this.factory=t}get(t){let n=super.get(t);return n===void 0&&(n=this.factory(t),this.set(t,n)),n}};function Te(e,t){let n=e(),r=new Set;return{getSnapshot(){return n},subscribe(o){return r.add(o),()=>r.delete(o)},dispatch(o,...l){let a=t[o].call(n,...l);a&&(n=a,r.forEach(u=>u()))}}}function Fe(e){return s.useSyncExternalStore(e.subscribe,e.getSnapshot,e.getSnapshot)}let ft=new dt(()=>Te(()=>[],{ADD(e){return this.includes(e)?this:[...this,e]},REMOVE(e){let t=this.indexOf(e);if(t===-1)return this;let n=this.slice();return n.splice(t,1),n}}));function O(e,t){let n=ft.get(t),r=s.useId(),o=Fe(n);if(A(()=>{if(e)return n.dispatch("ADD",r),()=>n.dispatch("REMOVE",r)},[n,e]),!e)return!1;let l=o.indexOf(r),a=o.length;return l===-1&&(l=a,a+=1),l===a-1}let J=new Map,j=new Map;function me(e){var t;let n=(t=j.get(e))!=null?t:0;return j.set(e,n+1),n!==0?()=>pe(e):(J.set(e,{"aria-hidden":e.getAttribute("aria-hidden"),inert:e.inert}),e.setAttribute("aria-hidden","true"),e.inert=!0,()=>pe(e))}function pe(e){var t;let n=(t=j.get(e))!=null?t:1;if(n===1?j.delete(e):j.set(e,n-1),n!==1)return;let r=J.get(e);r&&(r["aria-hidden"]===null?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",r["aria-hidden"]),e.inert=r.inert,J.delete(e))}function mt(e,{allowed:t,disallowed:n}={}){let r=O(e,"inert-others");A(()=>{var o,l;if(!r)return;let a=ne();for(let i of(o=n==null?void 0:n())!=null?o:[])i&&a.add(me(i));let u=(l=t==null?void 0:t())!=null?l:[];for(let i of u){if(!i)continue;let d=le(i);if(!d)continue;let c=i.parentElement;for(;c&&c!==d.body;){for(let f of c.children)u.some(v=>f.contains(v))||a.add(me(f));c=c.parentElement}}return a.dispose},[r,t,n])}let Z=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(","),pt=["[data-autofocus]"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var T=(e=>(e[e.First=1]="First",e[e.Previous=2]="Previous",e[e.Next=4]="Next",e[e.Last=8]="Last",e[e.WrapAround=16]="WrapAround",e[e.NoScroll=32]="NoScroll",e[e.AutoFocus=64]="AutoFocus",e))(T||{}),Q=(e=>(e[e.Error=0]="Error",e[e.Overflow=1]="Overflow",e[e.Success=2]="Success",e[e.Underflow=3]="Underflow",e))(Q||{}),vt=(e=>(e[e.Previous=-1]="Previous",e[e.Next=1]="Next",e))(vt||{});function ht(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(Z)).sort((t,n)=>Math.sign((t.tabIndex||Number.MAX_SAFE_INTEGER)-(n.tabIndex||Number.MAX_SAFE_INTEGER)))}function Et(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(pt)).sort((t,n)=>Math.sign((t.tabIndex||Number.MAX_SAFE_INTEGER)-(n.tabIndex||Number.MAX_SAFE_INTEGER)))}var Pe=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(Pe||{});function gt(e,t=0){var n;return e===((n=le(e))==null?void 0:n.body)?!1:Y(t,{0(){return e.matches(Z)},1(){let r=e;for(;r!==null;){if(r.matches(Z))return!0;r=r.parentElement}return!1}})}var wt=(e=>(e[e.Keyboard=0]="Keyboard",e[e.Mouse=1]="Mouse",e))(wt||{});typeof window<"u"&&typeof document<"u"&&(document.addEventListener("keydown",e=>{e.metaKey||e.altKey||e.ctrlKey||(document.documentElement.dataset.headlessuiFocusVisible="")},!0),document.addEventListener("click",e=>{e.detail===1?delete document.documentElement.dataset.headlessuiFocusVisible:e.detail===0&&(document.documentElement.dataset.headlessuiFocusVisible="")},!0));function F(e){e==null||e.focus({preventScroll:!0})}let bt=["textarea","input"].join(",");function yt(e){var t,n;return(n=(t=e==null?void 0:e.matches)==null?void 0:t.call(e,bt))!=null?n:!1}function $t(e,t=n=>n){return e.slice().sort((n,r)=>{let o=t(n),l=t(r);if(o===null||l===null)return 0;let a=o.compareDocumentPosition(l);return a&Node.DOCUMENT_POSITION_FOLLOWING?-1:a&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function W(e,t,{sorted:n=!0,relativeTo:r=null,skipElements:o=[]}={}){let l=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,a=Array.isArray(e)?n?$t(e):e:t&64?Et(e):ht(e);o.length>0&&a.length>1&&(a=a.filter(p=>!o.some($=>$!=null&&"current"in $?($==null?void 0:$.current)===p:$===p))),r=r??l.activeElement;let u=(()=>{if(t&5)return 1;if(t&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),i=(()=>{if(t&1)return 0;if(t&2)return Math.max(0,a.indexOf(r))-1;if(t&4)return Math.max(0,a.indexOf(r))+1;if(t&8)return a.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),d=t&32?{preventScroll:!0}:{},c=0,f=a.length,v;do{if(c>=f||c+f<=0)return 0;let p=i+c;if(t&16)p=(p+f)%f;else{if(p<0)return 3;if(p>=f)return 1}v=a[p],v==null||v.focus(d),c+=u}while(v!==l.activeElement);return t&6&&yt(v)&&v.select(),2}function Le(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function xt(){return/Android/gi.test(window.navigator.userAgent)}function Tt(){return Le()||xt()}function H(e,t,n,r){let o=X(n);s.useEffect(()=>{if(!e)return;function l(a){o.current(a)}return document.addEventListener(t,l,r),()=>document.removeEventListener(t,l,r)},[e,t,r])}function Me(e,t,n,r){let o=X(n);s.useEffect(()=>{if(!e)return;function l(a){o.current(a)}return window.addEventListener(t,l,r),()=>window.removeEventListener(t,l,r)},[e,t,r])}const ve=30;function Ft(e,t,n){let r=O(e,"outside-click"),o=X(n),l=s.useCallback(function(i,d){if(i.defaultPrevented)return;let c=d(i);if(c===null||!c.getRootNode().contains(c)||!c.isConnected)return;let f=function v(p){return typeof p=="function"?v(p()):Array.isArray(p)||p instanceof Set?p:[p]}(t);for(let v of f){if(v===null)continue;let p=v instanceof HTMLElement?v:v.current;if(p!=null&&p.contains(c)||i.composed&&i.composedPath().includes(p))return}return!gt(c,Pe.Loose)&&c.tabIndex!==-1&&i.preventDefault(),o.current(i,c)},[o]),a=s.useRef(null);H(r,"pointerdown",i=>{var d,c;a.current=((c=(d=i.composedPath)==null?void 0:d.call(i))==null?void 0:c[0])||i.target},!0),H(r,"mousedown",i=>{var d,c;a.current=((c=(d=i.composedPath)==null?void 0:d.call(i))==null?void 0:c[0])||i.target},!0),H(r,"click",i=>{Tt()||a.current&&(l(i,()=>a.current),a.current=null)},!0);let u=s.useRef({x:0,y:0});H(r,"touchstart",i=>{u.current.x=i.touches[0].clientX,u.current.y=i.touches[0].clientY},!0),H(r,"touchend",i=>{let d={x:i.changedTouches[0].clientX,y:i.changedTouches[0].clientY};if(!(Math.abs(d.x-u.current.x)>=ve||Math.abs(d.y-u.current.y)>=ve))return l(i,()=>i.target instanceof HTMLElement?i.target:null)},!0),Me(r,"blur",i=>l(i,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}function U(...e){return s.useMemo(()=>le(...e),[...e])}function Se(e,t,n,r){let o=X(n);s.useEffect(()=>{e=e??window;function l(a){o.current(a)}return e.addEventListener(t,l,r),()=>e.removeEventListener(t,l,r)},[e,t,r])}function Pt(){let e;return{before({doc:t}){var n;let r=t.documentElement,o=(n=t.defaultView)!=null?n:window;e=Math.max(0,o.innerWidth-r.clientWidth)},after({doc:t,d:n}){let r=t.documentElement,o=Math.max(0,r.clientWidth-r.offsetWidth),l=Math.max(0,e-o);n.style(r,"paddingRight",`${l}px`)}}}function Lt(){return Le()?{before({doc:e,d:t,meta:n}){function r(o){return n.containers.flatMap(l=>l()).some(l=>l.contains(o))}t.microTask(()=>{var o;if(window.getComputedStyle(e.documentElement).scrollBehavior!=="auto"){let u=ne();u.style(e.documentElement,"scrollBehavior","auto"),t.add(()=>t.microTask(()=>u.dispose()))}let l=(o=window.scrollY)!=null?o:window.pageYOffset,a=null;t.addEventListener(e,"click",u=>{if(u.target instanceof HTMLElement)try{let i=u.target.closest("a");if(!i)return;let{hash:d}=new URL(i.href),c=e.querySelector(d);c&&!r(c)&&(a=c)}catch{}},!0),t.addEventListener(e,"touchstart",u=>{if(u.target instanceof HTMLElement)if(r(u.target)){let i=u.target;for(;i.parentElement&&r(i.parentElement);)i=i.parentElement;t.style(i,"overscrollBehavior","contain")}else t.style(u.target,"touchAction","none")}),t.addEventListener(e,"touchmove",u=>{if(u.target instanceof HTMLElement){if(u.target.tagName==="INPUT")return;if(r(u.target)){let i=u.target;for(;i.parentElement&&i.dataset.headlessuiPortal!==""&&!(i.scrollHeight>i.clientHeight||i.scrollWidth>i.clientWidth);)i=i.parentElement;i.dataset.headlessuiPortal===""&&u.preventDefault()}else u.preventDefault()}},{passive:!1}),t.add(()=>{var u;let i=(u=window.scrollY)!=null?u:window.pageYOffset;l!==i&&window.scrollTo(0,l),a&&a.isConnected&&(a.scrollIntoView({block:"nearest"}),a=null)})})}}:{}}function Mt(){return{before({doc:e,d:t}){t.style(e.documentElement,"overflow","hidden")}}}function St(e){let t={};for(let n of e)Object.assign(t,n(t));return t}let D=Te(()=>new Map,{PUSH(e,t){var n;let r=(n=this.get(e))!=null?n:{doc:e,count:0,d:ne(),meta:new Set};return r.count++,r.meta.add(t),this.set(e,r),this},POP(e,t){let n=this.get(e);return n&&(n.count--,n.meta.delete(t)),this},SCROLL_PREVENT({doc:e,d:t,meta:n}){let r={doc:e,d:t,meta:St(n)},o=[Lt(),Pt(),Mt()];o.forEach(({before:l})=>l==null?void 0:l(r)),o.forEach(({after:l})=>l==null?void 0:l(r))},SCROLL_ALLOW({d:e}){e.dispose()},TEARDOWN({doc:e}){this.delete(e)}});D.subscribe(()=>{let e=D.getSnapshot(),t=new Map;for(let[n]of e)t.set(n,n.documentElement.style.overflow);for(let n of e.values()){let r=t.get(n.doc)==="hidden",o=n.count!==0;(o&&!r||!o&&r)&&D.dispatch(n.count>0?"SCROLL_PREVENT":"SCROLL_ALLOW",n),n.count===0&&D.dispatch("TEARDOWN",n)}});function Ct(e,t,n=()=>({containers:[]})){let r=Fe(D),o=t?r.get(t):void 0,l=o?o.count>0:!1;return A(()=>{if(!(!t||!e))return D.dispatch("PUSH",t,n),()=>D.dispatch("POP",t,n)},[e,t]),l}function Dt(e,t,n=()=>[document.body]){let r=O(e,"scroll-lock");Ct(r,t,o=>{var l;return{containers:[...(l=o.containers)!=null?l:[],n]}})}function ie(e,t){let n=s.useRef([]),r=g(e);s.useEffect(()=>{let o=[...n.current];for(let[l,a]of t.entries())if(n.current[l]!==a){let u=r(t,o);return n.current=t,u}},[r,...t])}function At(e){function t(){document.readyState!=="loading"&&(e(),document.removeEventListener("DOMContentLoaded",t))}typeof window<"u"&&typeof document<"u"&&(document.addEventListener("DOMContentLoaded",t),t())}let L=[];At(()=>{function e(t){t.target instanceof HTMLElement&&t.target!==document.body&&L[0]!==t.target&&(L.unshift(t.target),L=L.filter(n=>n!=null&&n.isConnected),L.splice(10))}window.addEventListener("click",e,{capture:!0}),window.addEventListener("mousedown",e,{capture:!0}),window.addEventListener("focus",e,{capture:!0}),document.body.addEventListener("click",e,{capture:!0}),document.body.addEventListener("mousedown",e,{capture:!0}),document.body.addEventListener("focus",e,{capture:!0})});function Ce(e){let t=g(e),n=s.useRef(!1);s.useEffect(()=>(n.current=!1,()=>{n.current=!0,re(()=>{n.current&&t()})}),[t])}let De=s.createContext(!1);function Nt(){return s.useContext(De)}function he(e){return m.createElement(De.Provider,{value:e.force},e.children)}function Rt(e){let t=Nt(),n=s.useContext(Ne),r=U(e),[o,l]=s.useState(()=>{var a;if(!t&&n!==null)return(a=n.current)!=null?a:null;if(te.isServer)return null;let u=r==null?void 0:r.getElementById("headlessui-portal-root");if(u)return u;if(r===null)return null;let i=r.createElement("div");return i.setAttribute("id","headlessui-portal-root"),r.body.appendChild(i)});return s.useEffect(()=>{o!==null&&(r!=null&&r.body.contains(o)||r==null||r.body.appendChild(o))},[o,r]),s.useEffect(()=>{t||n!==null&&l(n.current)},[n,l,t]),o}let Ae=s.Fragment,Ot=b(function(e,t){let n=e,r=s.useRef(null),o=M(Ke(c=>{r.current=c}),t),l=U(r),a=Rt(r),[u]=s.useState(()=>{var c;return te.isServer?null:(c=l==null?void 0:l.createElement("div"))!=null?c:null}),i=s.useContext(ee),d=oe();return A(()=>{!a||!u||a.contains(u)||(u.setAttribute("data-headlessui-portal",""),a.appendChild(u))},[a,u]),A(()=>{if(u&&i)return i.register(u)},[i,u]),Ce(()=>{var c;!a||!u||(u instanceof Node&&a.contains(u)&&a.removeChild(u),a.childNodes.length<=0&&((c=a.parentElement)==null||c.removeChild(a)))}),d?!a||!u?null:ge.createPortal(y({ourProps:{ref:o},theirProps:n,slot:{},defaultTag:Ae,name:"Portal"}),u):null});function kt(e,t){let n=M(t),{enabled:r=!0,...o}=e;return r?m.createElement(Ot,{...o,ref:n}):y({ourProps:{ref:n},theirProps:o,slot:{},defaultTag:Ae,name:"Portal"})}let It=s.Fragment,Ne=s.createContext(null);function Ht(e,t){let{target:n,...r}=e,o={ref:M(t)};return m.createElement(Ne.Provider,{value:n},y({ourProps:o,theirProps:r,defaultTag:It,name:"Popover.Group"}))}let ee=s.createContext(null);function _t(){let e=s.useContext(ee),t=s.useRef([]),n=g(l=>(t.current.push(l),e&&e.register(l),()=>r(l))),r=g(l=>{let a=t.current.indexOf(l);a!==-1&&t.current.splice(a,1),e&&e.unregister(l)}),o=s.useMemo(()=>({register:n,unregister:r,portals:t}),[n,r,t]);return[t,s.useMemo(()=>function({children:l}){return m.createElement(ee.Provider,{value:o},l)},[o])]}let jt=b(kt),Re=b(Ht),Wt=Object.assign(jt,{Group:Re});function Ut(e,t=typeof document<"u"?document.defaultView:null,n){let r=O(e,"escape");Se(t,"keydown",o=>{r&&(o.defaultPrevented||o.key===xe.Escape&&n(o))})}function Bt(){var e;let[t]=s.useState(()=>typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(pointer: coarse)"):null),[n,r]=s.useState((e=t==null?void 0:t.matches)!=null?e:!1);return A(()=>{if(!t)return;function o(l){r(l.matches)}return t.addEventListener("change",o),()=>t.removeEventListener("change",o)},[t]),n}function Yt({defaultContainers:e=[],portals:t,mainTreeNodeRef:n}={}){var r;let o=s.useRef((r=n==null?void 0:n.current)!=null?r:null),l=U(o),a=g(()=>{var u,i,d;let c=[];for(let f of e)f!==null&&(f instanceof HTMLElement?c.push(f):"current"in f&&f.current instanceof HTMLElement&&c.push(f.current));if(t!=null&&t.current)for(let f of t.current)c.push(f);for(let f of(u=l==null?void 0:l.querySelectorAll("html > *, body > *"))!=null?u:[])f!==document.body&&f!==document.head&&f instanceof HTMLElement&&f.id!=="headlessui-portal-root"&&(f.contains(o.current)||f.contains((d=(i=o.current)==null?void 0:i.getRootNode())==null?void 0:d.host)||c.some(v=>f.contains(v))||c.push(f));return c});return{resolveContainers:a,contains:g(u=>a().some(i=>i.contains(u))),mainTreeNodeRef:o,MainTreeNode:s.useMemo(()=>function(){return n!=null?null:m.createElement(z,{features:G.Hidden,ref:o})},[o,n])}}var _=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(_||{});function Vt(){let e=s.useRef(0);return Me(!0,"keydown",t=>{t.key==="Tab"&&(e.current=t.shiftKey?1:0)},!0),e}function Oe(e){if(!e)return new Set;if(typeof e=="function")return new Set(e());let t=new Set;for(let n of e.current)n.current instanceof HTMLElement&&t.add(n.current);return t}let Gt="div";var C=(e=>(e[e.None=0]="None",e[e.InitialFocus=1]="InitialFocus",e[e.TabLock=2]="TabLock",e[e.FocusLock=4]="FocusLock",e[e.RestoreFocus=8]="RestoreFocus",e[e.AutoFocus=16]="AutoFocus",e))(C||{});function Xt(e,t){let n=s.useRef(null),r=M(n,t),{initialFocus:o,initialFocusFallback:l,containers:a,features:u=15,...i}=e;oe()||(u=0);let d=U(n);Jt(u,{ownerDocument:d});let c=Zt(u,{ownerDocument:d,container:n,initialFocus:o,initialFocusFallback:l});Qt(u,{ownerDocument:d,container:n,containers:a,previousActiveElement:c});let f=Vt(),v=g(E=>{let P=n.current;P&&(w=>w())(()=>{Y(f.current,{[_.Forwards]:()=>{W(P,T.First,{skipElements:[E.relatedTarget,l]})},[_.Backwards]:()=>{W(P,T.Last,{skipElements:[E.relatedTarget,l]})}})})}),p=O(!!(u&2),"focus-trap#tab-lock"),$=qe(),S=s.useRef(!1),x={ref:r,onKeyDown(E){E.key=="Tab"&&(S.current=!0,$.requestAnimationFrame(()=>{S.current=!1}))},onBlur(E){if(!(u&4))return;let P=Oe(a);n.current instanceof HTMLElement&&P.add(n.current);let w=E.relatedTarget;w instanceof HTMLElement&&w.dataset.headlessuiFocusGuard!=="true"&&(ke(P,w)||(S.current?W(n.current,Y(f.current,{[_.Forwards]:()=>T.Next,[_.Backwards]:()=>T.Previous})|T.WrapAround,{relativeTo:E.target}):E.target instanceof HTMLElement&&F(E.target)))}};return m.createElement(m.Fragment,null,p&&m.createElement(z,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:v,features:G.Focusable}),y({ourProps:x,theirProps:i,defaultTag:Gt,name:"FocusTrap"}),p&&m.createElement(z,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:v,features:G.Focusable}))}let Kt=b(Xt),qt=Object.assign(Kt,{features:C});function zt(e=!0){let t=s.useRef(L.slice());return ie(([n],[r])=>{r===!0&&n===!1&&re(()=>{t.current.splice(0)}),r===!1&&n===!0&&(t.current=L.slice())},[e,L,t]),g(()=>{var n;return(n=t.current.find(r=>r!=null&&r.isConnected))!=null?n:null})}function Jt(e,{ownerDocument:t}){let n=!!(e&8),r=zt(n);ie(()=>{n||(t==null?void 0:t.activeElement)===(t==null?void 0:t.body)&&F(r())},[n]),Ce(()=>{n&&F(r())})}function Zt(e,{ownerDocument:t,container:n,initialFocus:r,initialFocusFallback:o}){let l=s.useRef(null),a=O(!!(e&1),"focus-trap#initial-focus"),u=we();return ie(()=>{if(e===0)return;if(!a){o!=null&&o.current&&F(o.current);return}let i=n.current;i&&re(()=>{if(!u.current)return;let d=t==null?void 0:t.activeElement;if(r!=null&&r.current){if((r==null?void 0:r.current)===d){l.current=d;return}}else if(i.contains(d)){l.current=d;return}if(r!=null&&r.current)F(r.current);else{if(e&16){if(W(i,T.First|T.AutoFocus)!==Q.Error)return}else if(W(i,T.First)!==Q.Error)return;if(o!=null&&o.current&&(F(o.current),(t==null?void 0:t.activeElement)===o.current))return;console.warn("There are no focusable elements inside the <FocusTrap />")}l.current=t==null?void 0:t.activeElement})},[o,a,e]),l}function Qt(e,{ownerDocument:t,container:n,containers:r,previousActiveElement:o}){let l=we(),a=!!(e&4);Se(t==null?void 0:t.defaultView,"focus",u=>{if(!a||!l.current)return;let i=Oe(r);n.current instanceof HTMLElement&&i.add(n.current);let d=o.current;if(!d)return;let c=u.target;c&&c instanceof HTMLElement?ke(i,c)?(o.current=c,F(c)):(u.preventDefault(),u.stopPropagation(),F(d)):F(o.current)},!0)}function ke(e,t){for(let n of e)if(n.contains(t))return!0;return!1}var en=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(en||{}),tn=(e=>(e[e.SetTitleId=0]="SetTitleId",e))(tn||{});let nn={0(e,t){return e.titleId===t.id?e:{...e,titleId:t.id}}},ue=s.createContext(null);ue.displayName="DialogContext";function K(e){let t=s.useContext(ue);if(t===null){let n=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,K),n}return t}function rn(e,t){return Y(t.type,nn,e,t)}let Ee=b(function(e,t){let n=s.useId(),{id:r=`headlessui-dialog-${n}`,open:o,onClose:l,initialFocus:a,role:u="dialog",autoFocus:i=!0,__demoMode:d=!1,...c}=e,f=s.useRef(!1);u=function(){return u==="dialog"||u==="alertdialog"?u:(f.current||(f.current=!0,console.warn(`Invalid role [${u}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)),"dialog")}();let v=be();o===void 0&&v!==null&&(o=(v&B.Open)===B.Open);let p=s.useRef(null),$=M(p,t),S=U(p),x=o?0:1,[E,P]=s.useReducer(rn,{titleId:null,descriptionId:null,panelRef:s.createRef()}),w=g(()=>l(!1)),se=g(h=>P({type:0,id:h})),N=oe()?x===0:!1,[He,_e]=_t(),je={get current(){var h;return(h=E.panelRef.current)!=null?h:p.current}},{resolveContainers:q,mainTreeNodeRef:We,MainTreeNode:Ue}=Yt({portals:He,defaultContainers:[je]}),ce=v!==null?(v&B.Closing)===B.Closing:!1;mt(d||ce?!1:N,{allowed:g(()=>{var h,I;return[(I=(h=p.current)==null?void 0:h.closest("[data-headlessui-portal]"))!=null?I:null]}),disallowed:g(()=>{var h,I;return[(I=(h=We.current)==null?void 0:h.closest("body > *:not(#headlessui-portal-root)"))!=null?I:null]})}),Ft(N,q,h=>{h.preventDefault(),w()}),Ut(N,S==null?void 0:S.defaultView,h=>{h.preventDefault(),h.stopPropagation(),document.activeElement&&"blur"in document.activeElement&&typeof document.activeElement.blur=="function"&&document.activeElement.blur(),w()}),Dt(d||ce?!1:N,S,q),ze(N,p,w);let[Be,Ye]=ot(),Ve=s.useMemo(()=>[{dialogState:x,close:w,setTitleId:se},E],[x,E,w,se]),de=s.useMemo(()=>({open:x===0}),[x]),Ge={ref:$,id:r,role:u,tabIndex:-1,"aria-modal":d?void 0:x===0?!0:void 0,"aria-labelledby":E.titleId,"aria-describedby":Be},Xe=!Bt(),k=C.None;return N&&!d&&(k|=C.RestoreFocus,k|=C.TabLock,i&&(k|=C.AutoFocus),Xe&&(k|=C.InitialFocus)),m.createElement(Je,null,m.createElement(he,{force:!0},m.createElement(Wt,null,m.createElement(ue.Provider,{value:Ve},m.createElement(Re,{target:p},m.createElement(he,{force:!1},m.createElement(Ye,{slot:de},m.createElement(_e,null,m.createElement(qt,{initialFocus:a,initialFocusFallback:p,containers:q,features:k},m.createElement(ct,{value:w},y({ourProps:Ge,theirProps:c,slot:de,defaultTag:on,features:ln,visible:x===0,name:"Dialog"})))))))))),m.createElement(rt,null,m.createElement(Ue,null)))}),on="div",ln=fe.RenderStrategy|fe.Static;function an(e,t){let{transition:n=!1,open:r,...o}=e,l=be(),a=e.hasOwnProperty("open")||l!==null,u=e.hasOwnProperty("onClose");if(!a&&!u)throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");if(!a)throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");if(!u)throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");if(!l&&typeof e.open!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);if(typeof e.onClose!="function")throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);return l===null&&r!==void 0&&!o.static?m.createElement(ye,{show:r,transition:n,unmount:o.unmount},m.createElement(Ee,{ref:t,...o})):m.createElement(Ee,{ref:t,open:r,...o})}let un="div";function sn(e,t){let n=s.useId(),{id:r=`headlessui-dialog-panel-${n}`,transition:o=!1,...l}=e,[{dialogState:a},u]=K("Dialog.Panel"),i=M(t,u.panelRef),d=s.useMemo(()=>({open:a===0}),[a]),c=g(f=>{f.stopPropagation()});return m.createElement(o?V:s.Fragment,null,y({ourProps:{ref:i,id:r,onClick:c},theirProps:l,slot:d,defaultTag:un,name:"Dialog.Panel"}))}let cn="div";function dn(e,t){let{transition:n=!1,...r}=e,[{dialogState:o}]=K("Dialog.Backdrop"),l=s.useMemo(()=>({open:o===0}),[o]);return m.createElement(n?V:s.Fragment,null,y({ourProps:{ref:t,"aria-hidden":!0},theirProps:r,slot:l,defaultTag:cn,name:"Dialog.Backdrop"}))}let fn="h2";function mn(e,t){let n=s.useId(),{id:r=`headlessui-dialog-title-${n}`,...o}=e,[{dialogState:l,setTitleId:a}]=K("Dialog.Title"),u=M(t);s.useEffect(()=>(a(r),()=>a(null)),[r,a]);let i=s.useMemo(()=>({open:l===0}),[l]);return y({ourProps:{ref:u,id:r},theirProps:o,slot:i,defaultTag:fn,name:"Dialog.Title"})}let pn=b(an),Ie=b(sn);b(dn);let vn=b(mn),hn=Object.assign(pn,{Panel:Ie,Title:vn,Description:ut});function bn({children:e,show:t=!1,maxWidth:n="2xl",closeable:r=!0,onClose:o=()=>{}}){const l=()=>{r&&o()},a={sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl","3xl":"max-w-max max-h-full overflow-y-auto"}[n];return R.jsx(ye,{show:t,leave:"duration-200",children:R.jsxs(hn,{as:"div",id:"modal",className:"fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all h-",onClose:l,children:[R.jsx(V,{enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:R.jsx("div",{className:"absolute inset-0 bg-gray-500/75"})}),R.jsx(V,{enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:R.jsx(Ie,{className:`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${a} `,children:e})})]})})}export{bn as M};
