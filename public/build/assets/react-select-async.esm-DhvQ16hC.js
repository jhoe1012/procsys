import{_ as ie,a as s,h as pe,b as v,c as fe,u as de,d as le,e as ce}from"./react-select.esm-Drn_uJwt.js";import{r as e}from"./app-DrKxL2JF.js";var Se=["defaultOptions","cacheOptions","loadOptions","options","isLoading","onInputChange","filterOption"];function ve(a){var f=a.defaultOptions,n=f===void 0?!1:f,d=a.cacheOptions,l=d===void 0?!1:d,O=a.loadOptions;a.options;var L=a.isLoading,z=L===void 0?!1:L,A=a.onInputChange,m=a.filterOption,B=m===void 0?null:m,P=ie(a,Se),V=P.inputValue,r=e.useRef(void 0),c=e.useRef(!1),F=e.useState(Array.isArray(n)?n:void 0),E=s(F,2),G=E[0],$=E[1],H=e.useState(typeof V<"u"?V:""),x=s(H,2),D=x[0],_=x[1],J=e.useState(n===!0),R=s(J,2),K=R[0],o=R[1],N=e.useState(void 0),b=s(N,2),h=b[0],g=b[1],Q=e.useState([]),j=s(Q,2),U=j[0],y=j[1],X=e.useState(!1),M=s(X,2),Y=M[0],S=M[1],Z=e.useState({}),q=s(Z,2),i=q[0],w=q[1],k=e.useState(void 0),T=s(k,2),ee=T[0],te=T[1],ae=e.useState(void 0),W=s(ae,2),ne=W[0],se=W[1];l!==ne&&(w({}),se(l)),n!==ee&&($(Array.isArray(n)?n:void 0),te(n)),e.useEffect(function(){return c.current=!0,function(){c.current=!1}},[]);var I=e.useCallback(function(p,u){if(!O)return u();var t=O(p,u);t&&typeof t.then=="function"&&t.then(u,function(){return u()})},[O]);e.useEffect(function(){n===!0&&I(D,function(p){c.current&&($(p||[]),o(!!r.current))})},[]);var ue=e.useCallback(function(p,u){var t=pe(p,u,A);if(!t){r.current=void 0,_(""),g(""),y([]),o(!1),S(!1);return}if(l&&i[t])_(t),g(t),y(i[t]),o(!1),S(!1);else{var oe=r.current={};_(t),o(!0),S(!h),I(t,function(C){c&&oe===r.current&&(r.current=void 0,o(!1),g(t),y(C||[]),S(!1),w(C?v(v({},i),{},fe({},t,C)):i))})}},[l,I,h,i,A]),re=Y?[]:D&&h?U:G||[];return v(v({},P),{},{options:re,isLoading:K||z,onInputChange:ue,filterOption:B})}var Oe=e.forwardRef(function(a,f){var n=ve(a),d=de(n);return e.createElement(le,ce({ref:f},d))}),ge=Oe;export{ge as A};
