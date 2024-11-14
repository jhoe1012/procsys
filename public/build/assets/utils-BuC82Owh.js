import{r as y,j as N}from"./app-DDEFgIQ0.js";function ne(e){var r,t,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(r=0;r<s;r++)e[r]&&(t=ne(e[r]))&&(o&&(o+=" "),o+=t)}else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function pe(){for(var e,r,t=0,o="",s=arguments.length;t<s;t++)(e=arguments[t])&&(r=ne(e))&&(o&&(o+=" "),o+=r);return o}function fe(e,r){typeof e=="function"?e(r):e!=null&&(e.current=r)}function se(...e){return r=>e.forEach(t=>fe(t,r))}function De(...e){return y.useCallback(se(...e),e)}var be=y.forwardRef((e,r)=>{const{children:t,...o}=e,s=y.Children.toArray(t),n=s.find(me);if(n){const i=n.props.children,l=s.map(u=>u===n?y.Children.count(i)>1?y.Children.only(null):y.isValidElement(i)?i.props.children:null:u);return N.jsx(_,{...o,ref:r,children:y.isValidElement(i)?y.cloneElement(i,void 0,l):null})}return N.jsx(_,{...o,ref:r,children:t})});be.displayName="Slot";var _=y.forwardRef((e,r)=>{const{children:t,...o}=e;if(y.isValidElement(t)){const s=ye(t);return y.cloneElement(t,{...he(o,t.props),ref:r?se(r,s):s})}return y.Children.count(t)>1?y.Children.only(null):null});_.displayName="SlotClone";var ge=({children:e})=>N.jsx(N.Fragment,{children:e});function me(e){return y.isValidElement(e)&&e.type===ge}function he(e,r){const t={...r};for(const o in r){const s=e[o],n=r[o];/^on[A-Z]/.test(o)?s&&n?t[o]=(...l)=>{n(...l),s(...l)}:s&&(t[o]=s):o==="style"?t[o]={...s,...n}:o==="className"&&(t[o]=[s,n].filter(Boolean).join(" "))}return{...e,...t}}function ye(e){var o,s;let r=(o=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:o.get,t=r&&"isReactWarning"in r&&r.isReactWarning;return t?e.ref:(r=(s=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:s.get,t=r&&"isReactWarning"in r&&r.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}function ie(e){var r,t,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e))for(r=0;r<e.length;r++)e[r]&&(t=ie(e[r]))&&(o&&(o+=" "),o+=t);else for(r in e)e[r]&&(o&&(o+=" "),o+=r);return o}function xe(){for(var e,r,t=0,o="";t<arguments.length;)(e=arguments[t++])&&(r=ie(e))&&(o&&(o+=" "),o+=r);return o}const ee=e=>typeof e=="boolean"?"".concat(e):e===0?"0":e,re=xe,er=(e,r)=>t=>{var o;if((r==null?void 0:r.variants)==null)return re(e,t==null?void 0:t.class,t==null?void 0:t.className);const{variants:s,defaultVariants:n}=r,i=Object.keys(s).map(c=>{const d=t==null?void 0:t[c],b=n==null?void 0:n[c];if(d===null)return null;const h=ee(d)||ee(b);return s[c][h]}),l=t&&Object.entries(t).reduce((c,d)=>{let[b,h]=d;return h===void 0||(c[b]=h),c},{}),u=r==null||(o=r.compoundVariants)===null||o===void 0?void 0:o.reduce((c,d)=>{let{class:b,className:h,...x}=d;return Object.entries(x).every(C=>{let[g,m]=C;return Array.isArray(m)?m.includes({...n,...l}[g]):{...n,...l}[g]===m})?[...c,b,h]:c},[]);return re(e,i,u,t==null?void 0:t.class,t==null?void 0:t.className)},U="-";function ve(e){const r=Ce(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;function s(i){const l=i.split(U);return l[0]===""&&l.length!==1&&l.shift(),le(l,r)||we(i)}function n(i,l){const u=t[i]||[];return l&&o[i]?[...u,...o[i]]:u}return{getClassGroupId:s,getConflictingClassGroupIds:n}}function le(e,r){var i;if(e.length===0)return r.classGroupId;const t=e[0],o=r.nextPart.get(t),s=o?le(e.slice(1),o):void 0;if(s)return s;if(r.validators.length===0)return;const n=e.join(U);return(i=r.validators.find(({validator:l})=>l(n)))==null?void 0:i.classGroupId}const te=/^\[(.+)\]$/;function we(e){if(te.test(e)){const r=te.exec(e)[1],t=r==null?void 0:r.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}}function Ce(e){const{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return Se(Object.entries(e.classGroups),t).forEach(([n,i])=>{B(i,o,n,r)}),o}function B(e,r,t,o){e.forEach(s=>{if(typeof s=="string"){const n=s===""?r:oe(r,s);n.classGroupId=t;return}if(typeof s=="function"){if(ke(s)){B(s(o),r,t,o);return}r.validators.push({validator:s,classGroupId:t});return}Object.entries(s).forEach(([n,i])=>{B(i,oe(r,n),t,o)})})}function oe(e,r){let t=e;return r.split(U).forEach(o=>{t.nextPart.has(o)||t.nextPart.set(o,{nextPart:new Map,validators:[]}),t=t.nextPart.get(o)}),t}function ke(e){return e.isThemeGetter}function Se(e,r){return r?e.map(([t,o])=>{const s=o.map(n=>typeof n=="string"?r+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(([i,l])=>[r+i,l])):n);return[t,s]}):e}function ze(e){if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,o=new Map;function s(n,i){t.set(n,i),r++,r>e&&(r=0,o=t,t=new Map)}return{get(n){let i=t.get(n);if(i!==void 0)return i;if((i=o.get(n))!==void 0)return s(n,i),i},set(n,i){t.has(n)?t.set(n,i):s(n,i)}}}const ae="!";function Ae(e){const r=e.separator,t=r.length===1,o=r[0],s=r.length;return function(i){const l=[];let u=0,c=0,d;for(let g=0;g<i.length;g++){let m=i[g];if(u===0){if(m===o&&(t||i.slice(g,g+s)===r)){l.push(i.slice(c,g)),c=g+s;continue}if(m==="/"){d=g;continue}}m==="["?u++:m==="]"&&u--}const b=l.length===0?i:i.substring(c),h=b.startsWith(ae),x=h?b.substring(1):b,C=d&&d>c?d-c:void 0;return{modifiers:l,hasImportantModifier:h,baseClassName:x,maybePostfixModifierPosition:C}}}function Me(e){if(e.length<=1)return e;const r=[];let t=[];return e.forEach(o=>{o[0]==="["?(r.push(...t.sort(),o),t=[]):t.push(o)}),r.push(...t.sort()),r}function Re(e){return{cache:ze(e.cacheSize),splitModifiers:Ae(e),...ve(e)}}const je=/\s+/;function Ee(e,r){const{splitModifiers:t,getClassGroupId:o,getConflictingClassGroupIds:s}=r,n=new Set;return e.trim().split(je).map(i=>{const{modifiers:l,hasImportantModifier:u,baseClassName:c,maybePostfixModifierPosition:d}=t(i);let b=o(d?c.substring(0,d):c),h=!!d;if(!b){if(!d)return{isTailwindClass:!1,originalClassName:i};if(b=o(c),!b)return{isTailwindClass:!1,originalClassName:i};h=!1}const x=Me(l).join(":");return{isTailwindClass:!0,modifierId:u?x+ae:x,classGroupId:b,originalClassName:i,hasPostfixModifier:h}}).reverse().filter(i=>{if(!i.isTailwindClass)return!0;const{modifierId:l,classGroupId:u,hasPostfixModifier:c}=i,d=l+u;return n.has(d)?!1:(n.add(d),s(u,c).forEach(b=>n.add(l+b)),!0)}).reverse().map(i=>i.originalClassName).join(" ")}function Pe(){let e=0,r,t,o="";for(;e<arguments.length;)(r=arguments[e++])&&(t=ce(r))&&(o&&(o+=" "),o+=t);return o}function ce(e){if(typeof e=="string")return e;let r,t="";for(let o=0;o<e.length;o++)e[o]&&(r=ce(e[o]))&&(t&&(t+=" "),t+=r);return t}function Ge(e,...r){let t,o,s,n=i;function i(u){const c=r.reduce((d,b)=>b(d),e());return t=Re(c),o=t.cache.get,s=t.cache.set,n=l,l(u)}function l(u){const c=o(u);if(c)return c;const d=Ee(u,t);return s(u,d),d}return function(){return n(Pe.apply(null,arguments))}}function p(e){const r=t=>t[e]||[];return r.isThemeGetter=!0,r}const de=/^\[(?:([a-z-]+):)?(.+)\]$/i,Ie=/^\d+\/\d+$/,Te=new Set(["px","full","screen"]),Ve=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Ne=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,We=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Oe=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Le=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;function w(e){return A(e)||Te.has(e)||Ie.test(e)}function S(e){return M(e,"length",Ze)}function A(e){return!!e&&!Number.isNaN(Number(e))}function V(e){return M(e,"number",A)}function E(e){return!!e&&Number.isInteger(Number(e))}function $e(e){return e.endsWith("%")&&A(e.slice(0,-1))}function a(e){return de.test(e)}function z(e){return Ve.test(e)}const Fe=new Set(["length","size","percentage"]);function _e(e){return M(e,Fe,ue)}function Be(e){return M(e,"position",ue)}const Ue=new Set(["image","url"]);function He(e){return M(e,Ue,Ke)}function qe(e){return M(e,"",Je)}function P(){return!0}function M(e,r,t){const o=de.exec(e);return o?o[1]?typeof r=="string"?o[1]===r:r.has(o[1]):t(o[2]):!1}function Ze(e){return Ne.test(e)&&!We.test(e)}function ue(){return!1}function Je(e){return Oe.test(e)}function Ke(e){return Le.test(e)}function Xe(){const e=p("colors"),r=p("spacing"),t=p("blur"),o=p("brightness"),s=p("borderColor"),n=p("borderRadius"),i=p("borderSpacing"),l=p("borderWidth"),u=p("contrast"),c=p("grayscale"),d=p("hueRotate"),b=p("invert"),h=p("gap"),x=p("gradientColorStops"),C=p("gradientColorStopPositions"),g=p("inset"),m=p("margin"),k=p("opacity"),v=p("padding"),H=p("saturate"),W=p("scale"),q=p("sepia"),Z=p("skew"),J=p("space"),K=p("translate"),O=()=>["auto","contain","none"],L=()=>["auto","hidden","clip","visible","scroll"],$=()=>["auto",a,r],f=()=>[a,r],X=()=>["",w,S],G=()=>["auto",A,a],Q=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],I=()=>["solid","dashed","dotted","double","none"],Y=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],F=()=>["start","end","center","between","around","evenly","stretch"],R=()=>["","0",a],D=()=>["auto","avoid","all","avoid-page","page","left","right","column"],j=()=>[A,V],T=()=>[A,a];return{cacheSize:500,separator:":",theme:{colors:[P],spacing:[w,S],blur:["none","",z,a],brightness:j(),borderColor:[e],borderRadius:["none","","full",z,a],borderSpacing:f(),borderWidth:X(),contrast:j(),grayscale:R(),hueRotate:T(),invert:R(),gap:f(),gradientColorStops:[e],gradientColorStopPositions:[$e,S],inset:$(),margin:$(),opacity:j(),padding:f(),saturate:j(),scale:j(),sepia:R(),skew:T(),space:f(),translate:f()},classGroups:{aspect:[{aspect:["auto","square","video",a]}],container:["container"],columns:[{columns:[z]}],"break-after":[{"break-after":D()}],"break-before":[{"break-before":D()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...Q(),a]}],overflow:[{overflow:L()}],"overflow-x":[{"overflow-x":L()}],"overflow-y":[{"overflow-y":L()}],overscroll:[{overscroll:O()}],"overscroll-x":[{"overscroll-x":O()}],"overscroll-y":[{"overscroll-y":O()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[g]}],"inset-x":[{"inset-x":[g]}],"inset-y":[{"inset-y":[g]}],start:[{start:[g]}],end:[{end:[g]}],top:[{top:[g]}],right:[{right:[g]}],bottom:[{bottom:[g]}],left:[{left:[g]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",E,a]}],basis:[{basis:$()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",a]}],grow:[{grow:R()}],shrink:[{shrink:R()}],order:[{order:["first","last","none",E,a]}],"grid-cols":[{"grid-cols":[P]}],"col-start-end":[{col:["auto",{span:["full",E,a]},a]}],"col-start":[{"col-start":G()}],"col-end":[{"col-end":G()}],"grid-rows":[{"grid-rows":[P]}],"row-start-end":[{row:["auto",{span:[E,a]},a]}],"row-start":[{"row-start":G()}],"row-end":[{"row-end":G()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",a]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",a]}],gap:[{gap:[h]}],"gap-x":[{"gap-x":[h]}],"gap-y":[{"gap-y":[h]}],"justify-content":[{justify:["normal",...F()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...F(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...F(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[v]}],px:[{px:[v]}],py:[{py:[v]}],ps:[{ps:[v]}],pe:[{pe:[v]}],pt:[{pt:[v]}],pr:[{pr:[v]}],pb:[{pb:[v]}],pl:[{pl:[v]}],m:[{m:[m]}],mx:[{mx:[m]}],my:[{my:[m]}],ms:[{ms:[m]}],me:[{me:[m]}],mt:[{mt:[m]}],mr:[{mr:[m]}],mb:[{mb:[m]}],ml:[{ml:[m]}],"space-x":[{"space-x":[J]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[J]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",a,r]}],"min-w":[{"min-w":[a,r,"min","max","fit"]}],"max-w":[{"max-w":[a,r,"none","full","min","max","fit","prose",{screen:[z]},z]}],h:[{h:[a,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[a,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[a,r,"auto","min","max","fit"]}],"font-size":[{text:["base",z,S]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",V]}],"font-family":[{font:[P]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",a]}],"line-clamp":[{"line-clamp":["none",A,V]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",w,a]}],"list-image":[{"list-image":["none",a]}],"list-style-type":[{list:["none","disc","decimal",a]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[k]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[k]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...I(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",w,S]}],"underline-offset":[{"underline-offset":["auto",w,a]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:f()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",a]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",a]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[k]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...Q(),Be]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",_e]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},He]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[C]}],"gradient-via-pos":[{via:[C]}],"gradient-to-pos":[{to:[C]}],"gradient-from":[{from:[x]}],"gradient-via":[{via:[x]}],"gradient-to":[{to:[x]}],rounded:[{rounded:[n]}],"rounded-s":[{"rounded-s":[n]}],"rounded-e":[{"rounded-e":[n]}],"rounded-t":[{"rounded-t":[n]}],"rounded-r":[{"rounded-r":[n]}],"rounded-b":[{"rounded-b":[n]}],"rounded-l":[{"rounded-l":[n]}],"rounded-ss":[{"rounded-ss":[n]}],"rounded-se":[{"rounded-se":[n]}],"rounded-ee":[{"rounded-ee":[n]}],"rounded-es":[{"rounded-es":[n]}],"rounded-tl":[{"rounded-tl":[n]}],"rounded-tr":[{"rounded-tr":[n]}],"rounded-br":[{"rounded-br":[n]}],"rounded-bl":[{"rounded-bl":[n]}],"border-w":[{border:[l]}],"border-w-x":[{"border-x":[l]}],"border-w-y":[{"border-y":[l]}],"border-w-s":[{"border-s":[l]}],"border-w-e":[{"border-e":[l]}],"border-w-t":[{"border-t":[l]}],"border-w-r":[{"border-r":[l]}],"border-w-b":[{"border-b":[l]}],"border-w-l":[{"border-l":[l]}],"border-opacity":[{"border-opacity":[k]}],"border-style":[{border:[...I(),"hidden"]}],"divide-x":[{"divide-x":[l]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[l]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[k]}],"divide-style":[{divide:I()}],"border-color":[{border:[s]}],"border-color-x":[{"border-x":[s]}],"border-color-y":[{"border-y":[s]}],"border-color-t":[{"border-t":[s]}],"border-color-r":[{"border-r":[s]}],"border-color-b":[{"border-b":[s]}],"border-color-l":[{"border-l":[s]}],"divide-color":[{divide:[s]}],"outline-style":[{outline:["",...I()]}],"outline-offset":[{"outline-offset":[w,a]}],"outline-w":[{outline:[w,S]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:X()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[k]}],"ring-offset-w":[{"ring-offset":[w,S]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",z,qe]}],"shadow-color":[{shadow:[P]}],opacity:[{opacity:[k]}],"mix-blend":[{"mix-blend":[...Y(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":Y()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[u]}],"drop-shadow":[{"drop-shadow":["","none",z,a]}],grayscale:[{grayscale:[c]}],"hue-rotate":[{"hue-rotate":[d]}],invert:[{invert:[b]}],saturate:[{saturate:[H]}],sepia:[{sepia:[q]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[u]}],"backdrop-grayscale":[{"backdrop-grayscale":[c]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[d]}],"backdrop-invert":[{"backdrop-invert":[b]}],"backdrop-opacity":[{"backdrop-opacity":[k]}],"backdrop-saturate":[{"backdrop-saturate":[H]}],"backdrop-sepia":[{"backdrop-sepia":[q]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[i]}],"border-spacing-x":[{"border-spacing-x":[i]}],"border-spacing-y":[{"border-spacing-y":[i]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",a]}],duration:[{duration:T()}],ease:[{ease:["linear","in","out","in-out",a]}],delay:[{delay:T()}],animate:[{animate:["none","spin","ping","pulse","bounce",a]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[W]}],"scale-x":[{"scale-x":[W]}],"scale-y":[{"scale-y":[W]}],rotate:[{rotate:[E,a]}],"translate-x":[{"translate-x":[K]}],"translate-y":[{"translate-y":[K]}],"skew-x":[{"skew-x":[Z]}],"skew-y":[{"skew-y":[Z]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",a]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",a]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":f()}],"scroll-mx":[{"scroll-mx":f()}],"scroll-my":[{"scroll-my":f()}],"scroll-ms":[{"scroll-ms":f()}],"scroll-me":[{"scroll-me":f()}],"scroll-mt":[{"scroll-mt":f()}],"scroll-mr":[{"scroll-mr":f()}],"scroll-mb":[{"scroll-mb":f()}],"scroll-ml":[{"scroll-ml":f()}],"scroll-p":[{"scroll-p":f()}],"scroll-px":[{"scroll-px":f()}],"scroll-py":[{"scroll-py":f()}],"scroll-ps":[{"scroll-ps":f()}],"scroll-pe":[{"scroll-pe":f()}],"scroll-pt":[{"scroll-pt":f()}],"scroll-pr":[{"scroll-pr":f()}],"scroll-pb":[{"scroll-pb":f()}],"scroll-pl":[{"scroll-pl":f()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",a]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[w,S,V]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}const Qe=Ge(Xe);function rr(...e){return Qe(pe(e))}const tr=e=>Number(e).toLocaleString("en",{minimumFractionDigits:2,maximumFractionDigits:2}),or={control:(e,r)=>({...e,minHeight:"1.75rem",height:"1.75rem",fontSize:"0.875rem"}),valueContainer:(e,r)=>({...e,height:"1.75rem",padding:"0 6px",textTransform:"capitalize"}),input:(e,r)=>({...e,margin:"0px"}),indicatorSeparator:e=>({display:"none"}),indicatorsContainer:(e,r)=>({...e,height:"1.75rem"})};export{be as S,er as a,rr as c,tr as f,or as r,De as u};