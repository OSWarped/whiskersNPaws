"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[536],{3536:(e,t,n)=>{n.d(t,{A:()=>J});var r=n(2115),o=n(3463),i=n(7123),l=n(9063),s=n(6239),a=n(8245),u=n(5155);function d(e){let t=[],n=[];return Array.from(e.querySelectorAll('input,select,textarea,a[href],button,[tabindex],audio[controls],video[controls],[contenteditable]:not([contenteditable="false"])')).forEach((e,r)=>{let o=function(e){let t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?"true"===e.contentEditable||("AUDIO"===e.nodeName||"VIDEO"===e.nodeName||"DETAILS"===e.nodeName)&&null===e.getAttribute("tabindex")?0:e.tabIndex:t}(e);-1===o||e.disabled||"INPUT"===e.tagName&&"hidden"===e.type||function(e){if("INPUT"!==e.tagName||"radio"!==e.type||!e.name)return!1;let t=t=>e.ownerDocument.querySelector('input[type="radio"]'.concat(t)),n=t('[name="'.concat(e.name,'"]:checked'));return n||(n=t('[name="'.concat(e.name,'"]'))),n!==e}(e)||(0===o?t.push(e):n.push({documentOrder:r,tabIndex:o,node:e}))}),n.sort((e,t)=>e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex).map(e=>e.node).concat(t)}function c(){return!0}let p=function(e){let{children:t,disableAutoFocus:n=!1,disableEnforceFocus:o=!1,disableRestoreFocus:i=!1,getTabbable:p=d,isEnabled:f=c,open:h}=e,m=r.useRef(!1),E=r.useRef(null),v=r.useRef(null),x=r.useRef(null),b=r.useRef(null),y=r.useRef(!1),g=r.useRef(null),A=(0,l.A)((0,s.A)(t),g),R=r.useRef(null);r.useEffect(()=>{h&&g.current&&(y.current=!n)},[n,h]),r.useEffect(()=>{if(!h||!g.current)return;let e=(0,a.A)(g.current);return!g.current.contains(e.activeElement)&&(g.current.hasAttribute("tabIndex")||g.current.setAttribute("tabIndex","-1"),y.current&&g.current.focus()),()=>{i||(x.current&&x.current.focus&&(m.current=!0,x.current.focus()),x.current=null)}},[h]),r.useEffect(()=>{if(!h||!g.current)return;let e=(0,a.A)(g.current),t=t=>{R.current=t,!o&&f()&&"Tab"===t.key&&e.activeElement===g.current&&t.shiftKey&&(m.current=!0,v.current&&v.current.focus())},n=()=>{let t=g.current;if(null===t)return;if(!e.hasFocus()||!f()||m.current){m.current=!1;return}if(t.contains(e.activeElement)||o&&e.activeElement!==E.current&&e.activeElement!==v.current)return;if(e.activeElement!==b.current)b.current=null;else if(null!==b.current)return;if(!y.current)return;let n=[];if((e.activeElement===E.current||e.activeElement===v.current)&&(n=p(g.current)),n.length>0){var r,i;let e=!!((null===(r=R.current)||void 0===r?void 0:r.shiftKey)&&(null===(i=R.current)||void 0===i?void 0:i.key)==="Tab"),t=n[0],o=n[n.length-1];"string"!=typeof t&&"string"!=typeof o&&(e?o.focus():t.focus())}else t.focus()};e.addEventListener("focusin",n),e.addEventListener("keydown",t,!0);let r=setInterval(()=>{e.activeElement&&"BODY"===e.activeElement.tagName&&n()},50);return()=>{clearInterval(r),e.removeEventListener("focusin",n),e.removeEventListener("keydown",t,!0)}},[n,o,i,f,h,p]);let k=e=>{null===x.current&&(x.current=e.relatedTarget),y.current=!0};return(0,u.jsxs)(r.Fragment,{children:[(0,u.jsx)("div",{tabIndex:h?0:-1,onFocus:k,ref:E,"data-testid":"sentinelStart"}),r.cloneElement(t,{ref:A,onFocus:e=>{null===x.current&&(x.current=e.relatedTarget),y.current=!0,b.current=e.target;let n=t.props.onFocus;n&&n(e)}}),(0,u.jsx)("div",{tabIndex:h?0:-1,onFocus:k,ref:v,"data-testid":"sentinelEnd"})]})};var f=n(7650),h=n(4969),m=n(9877);let E=r.forwardRef(function(e,t){let{children:n,container:o,disablePortal:i=!1}=e,[a,u]=r.useState(null),d=(0,l.A)(r.isValidElement(n)?(0,s.A)(n):null,t);return((0,h.A)(()=>{!i&&u(("function"==typeof o?o():o)||document.body)},[o,i]),(0,h.A)(()=>{if(a&&!i)return(0,m.A)(t,a),()=>{(0,m.A)(t,null)}},[t,a,i]),i)?r.isValidElement(n)?r.cloneElement(n,{ref:d}):n:a?f.createPortal(n,a):a});var v=n(2710),x=n(8330),b=n(2567),y=n(8827),g=n(5542),A=n(5761),R=n(3444),k=n(9328);let T={entering:{opacity:1},entered:{opacity:1}},C=r.forwardRef(function(e,t){let n=(0,A.A)(),o={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:i,appear:l=!0,children:a,easing:d,in:c,onEnter:p,onEntered:f,onEntering:h,onExit:m,onExited:E,onExiting:v,style:x,timeout:b=o,TransitionComponent:y=g.Ay,...C}=e,S=r.useRef(null),N=(0,k.A)(S,(0,s.A)(a),t),I=e=>t=>{if(e){let n=S.current;void 0===t?e(n):e(n,t)}},O=I(h),w=I((e,t)=>{(0,R.q)(e);let r=(0,R.c)({style:x,timeout:b,easing:d},{mode:"enter"});e.style.webkitTransition=n.transitions.create("opacity",r),e.style.transition=n.transitions.create("opacity",r),p&&p(e,t)}),M=I(f),P=I(v),D=I(e=>{let t=(0,R.c)({style:x,timeout:b,easing:d},{mode:"exit"});e.style.webkitTransition=n.transitions.create("opacity",t),e.style.transition=n.transitions.create("opacity",t),m&&m(e)}),L=I(E);return(0,u.jsx)(y,{appear:l,in:c,nodeRef:S,onEnter:w,onEntered:M,onEntering:O,onExit:D,onExited:L,onExiting:P,addEndListener:e=>{i&&i(S.current,e)},timeout:b,...C,children:(e,t)=>{let{ownerState:n,...o}=t;return r.cloneElement(a,{style:{opacity:0,visibility:"exited"!==e||c?void 0:"hidden",...T[e],...x,...a.props.style},ref:N,...o})}})});var S=n(1045),N=n(7157);function I(e){return(0,N.Ay)("MuiBackdrop",e)}(0,S.A)("MuiBackdrop",["root","invisible"]);let O=e=>{let{classes:t,invisible:n}=e;return(0,i.A)({root:["root",n&&"invisible"]},I,t)},w=(0,v.Ay)("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent",variants:[{props:{invisible:!0},style:{backgroundColor:"transparent"}}]}),M=r.forwardRef(function(e,t){let n=(0,b.b)({props:e,name:"MuiBackdrop"}),{children:r,className:i,component:l="div",invisible:s=!1,open:a,components:d={},componentsProps:c={},slotProps:p={},slots:f={},TransitionComponent:h,transitionDuration:m,...E}=n,v={...n,component:l,invisible:s},x=O(v),g={slots:{transition:h,root:d.Root,...f},slotProps:{...c,...p}},[A,R]=(0,y.A)("root",{elementType:w,externalForwardedProps:g,className:(0,o.A)(x.root,i),ownerState:v}),[k,T]=(0,y.A)("transition",{elementType:C,externalForwardedProps:g,ownerState:v});return(0,u.jsx)(k,{in:a,timeout:m,...E,...T,children:(0,u.jsx)(A,{"aria-hidden":!0,...R,classes:x,ref:t,children:r})})});var P=n(7303);function D(...e){return e.reduce((e,t)=>null==t?e:function(...n){e.apply(this,n),t.apply(this,n)},()=>{})}var L=n(4419),j=n(2757),F=n(9125);function U(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function B(e){return parseInt((0,j.A)(e).getComputedStyle(e).paddingRight,10)||0}function K(e,t,n,r,o){let i=[t,n,...r];[].forEach.call(e.children,e=>{let t=!i.includes(e),n=!function(e){let t=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].includes(e.tagName),n="INPUT"===e.tagName&&"hidden"===e.getAttribute("type");return t||n}(e);t&&n&&U(e,o)})}function W(e,t){let n=-1;return e.some((e,r)=>!!t(e)&&(n=r,!0)),n}class q{add(e,t){let n=this.modals.indexOf(e);if(-1!==n)return n;n=this.modals.length,this.modals.push(e),e.modalRef&&U(e.modalRef,!1);let r=function(e){let t=[];return[].forEach.call(e.children,e=>{"true"===e.getAttribute("aria-hidden")&&t.push(e)}),t}(t);K(t,e.mount,e.modalRef,r,!0);let o=W(this.containers,e=>e.container===t);return -1!==o?this.containers[o].modals.push(e):this.containers.push({modals:[e],container:t,restore:null,hiddenSiblings:r}),n}mount(e,t){let n=W(this.containers,t=>t.modals.includes(e)),r=this.containers[n];r.restore||(r.restore=function(e,t){let n=[],r=e.container;if(!t.disableScrollLock){let e;if(function(e){let t=(0,a.A)(e);return t.body===e?(0,j.A)(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}(r)){let e=(0,F.A)((0,j.A)(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight="".concat(B(r)+e,"px");let t=(0,a.A)(r).querySelectorAll(".mui-fixed");[].forEach.call(t,t=>{n.push({value:t.style.paddingRight,property:"padding-right",el:t}),t.style.paddingRight="".concat(B(t)+e,"px")})}if(r.parentNode instanceof DocumentFragment)e=(0,a.A)(r).body;else{let t=r.parentElement,n=(0,j.A)(r);e=(null==t?void 0:t.nodeName)==="HTML"&&"scroll"===n.getComputedStyle(t).overflowY?t:r}n.push({value:e.style.overflow,property:"overflow",el:e},{value:e.style.overflowX,property:"overflow-x",el:e},{value:e.style.overflowY,property:"overflow-y",el:e}),e.style.overflow="hidden"}return()=>{n.forEach(e=>{let{value:t,el:n,property:r}=e;t?n.style.setProperty(r,t):n.style.removeProperty(r)})}}(r,t))}remove(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],n=this.modals.indexOf(e);if(-1===n)return n;let r=W(this.containers,t=>t.modals.includes(e)),o=this.containers[r];if(o.modals.splice(o.modals.indexOf(e),1),this.modals.splice(n,1),0===o.modals.length)o.restore&&o.restore(),e.modalRef&&U(e.modalRef,t),K(o.container,e.mount,e.modalRef,o.hiddenSiblings,!1),this.containers.splice(r,1);else{let e=o.modals[o.modals.length-1];e.modalRef&&U(e.modalRef,!1)}return n}isTopModal(e){return this.modals.length>0&&this.modals[this.modals.length-1]===e}constructor(){this.modals=[],this.containers=[]}}let H=()=>{},V=new q,Y=function(e){let{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:o=!1,closeAfterTransition:i=!1,onTransitionEnter:s,onTransitionExited:u,children:d,onClose:c,open:p,rootRef:f}=e,h=r.useRef({}),m=r.useRef(null),E=r.useRef(null),v=(0,l.A)(E,f),[x,b]=r.useState(!p),y=!!d&&d.props.hasOwnProperty("in"),g=!0;("false"===e["aria-hidden"]||!1===e["aria-hidden"])&&(g=!1);let A=()=>(0,a.A)(m.current),R=()=>(h.current.modalRef=E.current,h.current.mount=m.current,h.current),k=()=>{V.mount(R(),{disableScrollLock:o}),E.current&&(E.current.scrollTop=0)},T=(0,P.A)(()=>{let e=("function"==typeof t?t():t)||A().body;V.add(R(),e),E.current&&k()}),C=()=>V.isTopModal(R()),S=(0,P.A)(e=>{m.current=e,e&&(p&&C()?k():E.current&&U(E.current,g))}),N=r.useCallback(()=>{V.remove(R(),g)},[g]);r.useEffect(()=>()=>{N()},[N]),r.useEffect(()=>{p?T():y&&i||N()},[p,N,y,i,T]);let I=e=>t=>{var r;null===(r=e.onKeyDown)||void 0===r||r.call(e,t),"Escape"===t.key&&229!==t.which&&C()&&!n&&(t.stopPropagation(),c&&c(t,"escapeKeyDown"))},O=e=>t=>{var n;null===(n=e.onClick)||void 0===n||n.call(e,t),t.target===t.currentTarget&&c&&c(t,"backdropClick")};return{getRootProps:function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=(0,L.A)(e);delete n.onTransitionEnter,delete n.onTransitionExited;let r={...n,...t};return{role:"presentation",...r,onKeyDown:I(r),ref:v}},getBackdropProps:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{"aria-hidden":!0,...e,onClick:O(e),open:p}},getTransitionProps:()=>{var e,t;return{onEnter:D(()=>{b(!1),s&&s()},null!==(e=null==d?void 0:d.props.onEnter)&&void 0!==e?e:H),onExited:D(()=>{b(!0),u&&u(),i&&N()},null!==(t=null==d?void 0:d.props.onExited)&&void 0!==t?t:H)}},rootRef:v,portalRef:S,isTopModal:C,exited:x,hasTransition:y}};function _(e){return(0,N.Ay)("MuiModal",e)}(0,S.A)("MuiModal",["root","hidden","backdrop"]);let z=e=>{let{open:t,exited:n,classes:r}=e;return(0,i.A)({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},_,r)},G=(0,v.Ay)("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})((0,x.A)(e=>{let{theme:t}=e;return{position:"fixed",zIndex:(t.vars||t).zIndex.modal,right:0,bottom:0,top:0,left:0,variants:[{props:e=>{let{ownerState:t}=e;return!t.open&&t.exited},style:{visibility:"hidden"}}]}})),X=(0,v.Ay)(M,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),J=r.forwardRef(function(e,t){let n=(0,b.b)({name:"MuiModal",props:e}),{BackdropComponent:i=X,BackdropProps:l,classes:s,className:a,closeAfterTransition:d=!1,children:c,container:f,component:h,components:m={},componentsProps:v={},disableAutoFocus:x=!1,disableEnforceFocus:g=!1,disableEscapeKeyDown:A=!1,disablePortal:R=!1,disableRestoreFocus:T=!1,disableScrollLock:C=!1,hideBackdrop:S=!1,keepMounted:N=!1,onBackdropClick:I,onClose:O,onTransitionEnter:w,onTransitionExited:M,open:P,slotProps:D={},slots:L={},theme:j,...F}=n,U={...n,closeAfterTransition:d,disableAutoFocus:x,disableEnforceFocus:g,disableEscapeKeyDown:A,disablePortal:R,disableRestoreFocus:T,disableScrollLock:C,hideBackdrop:S,keepMounted:N},{getRootProps:B,getBackdropProps:K,getTransitionProps:W,portalRef:q,isTopModal:H,exited:V,hasTransition:_}=Y({...U,rootRef:t}),J={...U,exited:V},Q=z(J),Z={};if(void 0===c.props.tabIndex&&(Z.tabIndex="-1"),_){let{onEnter:e,onExited:t}=W();Z.onEnter=e,Z.onExited=t}let $={...F,slots:{root:m.Root,backdrop:m.Backdrop,...L},slotProps:{...v,...D}},[ee,et]=(0,y.A)("root",{elementType:G,externalForwardedProps:$,getSlotProps:B,additionalProps:{ref:t,as:h},ownerState:J,className:(0,o.A)(a,null==Q?void 0:Q.root,!J.open&&J.exited&&(null==Q?void 0:Q.hidden))}),[en,er]=(0,y.A)("backdrop",{elementType:i,externalForwardedProps:$,additionalProps:l,getSlotProps:e=>K({...e,onClick:t=>{I&&I(t),(null==e?void 0:e.onClick)&&e.onClick(t)}}),className:(0,o.A)(null==l?void 0:l.className,null==Q?void 0:Q.backdrop),ownerState:J}),eo=(0,k.A)(null==l?void 0:l.ref,er.ref);return N||P||_&&!V?(0,u.jsx)(E,{ref:q,container:f,disablePortal:R,children:(0,u.jsxs)(ee,{...et,children:[!S&&i?(0,u.jsx)(en,{...er,ref:eo}):null,(0,u.jsx)(p,{disableEnforceFocus:g,disableAutoFocus:x,disableRestoreFocus:T,isEnabled:H,open:P,children:r.cloneElement(c,Z)})]})}):null})},3444:(e,t,n)=>{n.d(t,{c:()=>o,q:()=>r});let r=e=>e.scrollTop;function o(e,t){var n,r;let{timeout:o,easing:i,style:l={}}=e;return{duration:null!==(n=l.transitionDuration)&&void 0!==n?n:"number"==typeof o?o:o[t.mode]||0,easing:null!==(r=l.transitionTimingFunction)&&void 0!==r?r:"object"==typeof i?i[t.mode]:i,delay:l.transitionDelay}}},6239:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(2115);function o(e){return parseInt(r.version,10)>=19?e?.props?.ref||null:e?.ref||null}},9125:(e,t,n)=>{n.d(t,{A:()=>r});function r(e=window){let t=e.document.documentElement.clientWidth;return e.innerWidth-t}},8245:(e,t,n)=>{n.d(t,{A:()=>r});function r(e){return e&&e.ownerDocument||document}},2757:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(8245);function o(e){return(0,r.A)(e).defaultView||window}},5542:(e,t,n)=>{n.d(t,{Ay:()=>E});var r=n(160),o=n(7757),i=n(2115),l=n(7650);let s={disabled:!1};var a=n(2031),u="unmounted",d="exited",c="entering",p="entered",f="exiting",h=function(e){function t(t,n){r=e.call(this,t,n)||this;var r,o,i=n&&!n.isMounting?t.enter:t.appear;return r.appearStatus=null,t.in?i?(o=d,r.appearStatus=c):o=p:o=t.unmountOnExit||t.mountOnEnter?u:d,r.state={status:o},r.nextCallback=null,r}(0,o.A)(t,e),t.getDerivedStateFromProps=function(e,t){return e.in&&t.status===u?{status:d}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(e){var t=null;if(e!==this.props){var n=this.state.status;this.props.in?n!==c&&n!==p&&(t=c):(n===c||n===p)&&(t=f)}this.updateStatus(!1,t)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var e,t,n,r=this.props.timeout;return e=t=n=r,null!=r&&"number"!=typeof r&&(e=r.exit,t=r.enter,n=void 0!==r.appear?r.appear:t),{exit:e,enter:t,appear:n}},n.updateStatus=function(e,t){if(void 0===e&&(e=!1),null!==t){if(this.cancelNextCallback(),t===c){if(this.props.unmountOnExit||this.props.mountOnEnter){var n=this.props.nodeRef?this.props.nodeRef.current:l.findDOMNode(this);n&&n.scrollTop}this.performEnter(e)}else this.performExit()}else this.props.unmountOnExit&&this.state.status===d&&this.setState({status:u})},n.performEnter=function(e){var t=this,n=this.props.enter,r=this.context?this.context.isMounting:e,o=this.props.nodeRef?[r]:[l.findDOMNode(this),r],i=o[0],a=o[1],u=this.getTimeouts(),d=r?u.appear:u.enter;if(!e&&!n||s.disabled){this.safeSetState({status:p},function(){t.props.onEntered(i)});return}this.props.onEnter(i,a),this.safeSetState({status:c},function(){t.props.onEntering(i,a),t.onTransitionEnd(d,function(){t.safeSetState({status:p},function(){t.props.onEntered(i,a)})})})},n.performExit=function(){var e=this,t=this.props.exit,n=this.getTimeouts(),r=this.props.nodeRef?void 0:l.findDOMNode(this);if(!t||s.disabled){this.safeSetState({status:d},function(){e.props.onExited(r)});return}this.props.onExit(r),this.safeSetState({status:f},function(){e.props.onExiting(r),e.onTransitionEnd(n.exit,function(){e.safeSetState({status:d},function(){e.props.onExited(r)})})})},n.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(e,t){t=this.setNextCallback(t),this.setState(e,t)},n.setNextCallback=function(e){var t=this,n=!0;return this.nextCallback=function(r){n&&(n=!1,t.nextCallback=null,e(r))},this.nextCallback.cancel=function(){n=!1},this.nextCallback},n.onTransitionEnd=function(e,t){this.setNextCallback(t);var n=this.props.nodeRef?this.props.nodeRef.current:l.findDOMNode(this),r=null==e&&!this.props.addEndListener;if(!n||r){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var o=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],i=o[0],s=o[1];this.props.addEndListener(i,s)}null!=e&&setTimeout(this.nextCallback,e)},n.render=function(){var e=this.state.status;if(e===u)return null;var t=this.props,n=t.children,o=(t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef,(0,r.A)(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return i.createElement(a.A.Provider,{value:null},"function"==typeof n?n(e,o):i.cloneElement(i.Children.only(n),o))},t}(i.Component);function m(){}h.contextType=a.A,h.propTypes={},h.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:m,onEntering:m,onEntered:m,onExit:m,onExiting:m,onExited:m},h.UNMOUNTED=u,h.EXITED=d,h.ENTERING=c,h.ENTERED=p,h.EXITING=f;let E=h}}]);