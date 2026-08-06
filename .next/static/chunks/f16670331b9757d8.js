(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,20955,(e,t,n)=>{var r={229:function(e){var t,n,r,o=e.exports={};function i(){throw Error("setTimeout has not been defined")}function a(){throw Error("clearTimeout has not been defined")}try{t="function"==typeof setTimeout?setTimeout:i}catch(e){t=i}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(e){n=a}function s(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}var l=[],u=!1,c=-1;function d(){u&&r&&(u=!1,r.length?l=r.concat(l):c=-1,l.length&&f())}function f(){if(!u){var e=s(d);u=!0;for(var t=l.length;t;){for(r=l,l=[];++c<t;)r&&r[c].run();c=-1,t=l.length}r=null,u=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new p(e,t)),1!==l.length||u||s(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw Error("process.chdir is not supported")},o.umask=function(){return 0}}},o={};function i(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={exports:{}},a=!0;try{r[e](n,n.exports,i),a=!1}finally{a&&delete o[e]}return n.exports}i.ab="/ROOT/node_modules/next/dist/compiled/process/",t.exports=i(229)},50461,(e,t,n)=>{"use strict";var r,o;t.exports=(null==(r=e.g.process)?void 0:r.env)&&"object"==typeof(null==(o=e.g.process)?void 0:o.env)?e.g.process:e.r(20955)},41705,(e,t,n)=>{"use strict";n._=function(e){return e&&e.__esModule?e:{default:e}}},8481,(e,t,n)=>{"use strict";var r=Symbol.for("react.transitional.element");function o(e,t,n){var o=null;if(void 0!==n&&(o=""+n),void 0!==t.key&&(o=""+t.key),"key"in t)for(var i in n={},t)"key"!==i&&(n[i]=t[i]);else n=t;return{$$typeof:r,type:e,key:o,ref:void 0!==(t=n.ref)?t:null,props:n}}n.Fragment=Symbol.for("react.fragment"),n.jsx=o,n.jsxs=o},91398,(e,t,n)=>{"use strict";t.exports=e.r(8481)},61556,(e,t,n)=>{"use strict";var r=e.i(50461),o=Symbol.for("react.transitional.element"),i=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),c=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),m=Symbol.for("react.lazy"),h=Symbol.for("react.activity"),y=Symbol.iterator,g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},v=Object.assign,b={};function x(e,t,n){this.props=e,this.context=t,this.refs=b,this.updater=n||g}function _(){}function w(e,t,n){this.props=e,this.context=t,this.refs=b,this.updater=n||g}x.prototype.isReactComponent={},x.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},x.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},_.prototype=x.prototype;var S=w.prototype=new _;S.constructor=w,v(S,x.prototype),S.isPureReactComponent=!0;var E=Array.isArray;function k(){}var j={H:null,A:null,T:null,S:null},C=Object.prototype.hasOwnProperty;function O(e,t,n){var r=n.ref;return{$$typeof:o,type:e,key:t,ref:void 0!==r?r:null,props:n}}function T(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var $=/\/+/g;function N(e,t){var n,r;return"object"==typeof e&&null!==e&&null!=e.key?(n=""+e.key,r={"=":"=0",":":"=2"},"$"+n.replace(/[=:]/g,function(e){return r[e]})):t.toString(36)}function P(e,t,n){if(null==e)return e;var r=[],a=0;return!function e(t,n,r,a,s){var l,u,c,d=typeof t;("undefined"===d||"boolean"===d)&&(t=null);var f=!1;if(null===t)f=!0;else switch(d){case"bigint":case"string":case"number":f=!0;break;case"object":switch(t.$$typeof){case o:case i:f=!0;break;case m:return e((f=t._init)(t._payload),n,r,a,s)}}if(f)return s=s(t),f=""===a?"."+N(t,0):a,E(s)?(r="",null!=f&&(r=f.replace($,"$&/")+"/"),e(s,n,r,"",function(e){return e})):null!=s&&(T(s)&&(l=s,u=r+(null==s.key||t&&t.key===s.key?"":(""+s.key).replace($,"$&/")+"/")+f,s=O(l.type,u,l.props)),n.push(s)),1;f=0;var p=""===a?".":a+":";if(E(t))for(var h=0;h<t.length;h++)d=p+N(a=t[h],h),f+=e(a,n,r,d,s);else if("function"==typeof(h=null===(c=t)||"object"!=typeof c?null:"function"==typeof(c=y&&c[y]||c["@@iterator"])?c:null))for(t=h.call(t),h=0;!(a=t.next()).done;)d=p+N(a=a.value,h++),f+=e(a,n,r,d,s);else if("object"===d){if("function"==typeof t.then)return e(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"==typeof e.status?e.then(k,k):(e.status="pending",e.then(function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)},function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(t),n,r,a,s);throw Error("Objects are not valid as a React child (found: "+("[object Object]"===(n=String(t))?"object with keys {"+Object.keys(t).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}return f}(e,r,"","",function(e){return t.call(n,e,a++)}),r}function A(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){(0===e._status||-1===e._status)&&(e._status=1,e._result=t)},function(t){(0===e._status||-1===e._status)&&(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var M="function"==typeof reportError?reportError:function(e){if("object"==typeof window&&"function"==typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"==typeof e&&null!==e&&"string"==typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"==typeof r.default&&"function"==typeof r.default.emit)return void r.default.emit("uncaughtException",e);console.error(e)};n.Activity=h,n.Children={map:P,forEach:function(e,t,n){P(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!T(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},n.Component=x,n.Fragment=a,n.Profiler=l,n.PureComponent=w,n.StrictMode=s,n.Suspense=f,n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=j,n.__COMPILER_RUNTIME={__proto__:null,c:function(e){return j.H.useMemoCache(e)}},n.cache=function(e){return function(){return e.apply(null,arguments)}},n.cacheSignal=function(){return null},n.cloneElement=function(e,t,n){if(null==e)throw Error("The argument must be a React element, but you passed "+e+".");var r=v({},e.props),o=e.key;if(null!=t)for(i in void 0!==t.key&&(o=""+t.key),t)C.call(t,i)&&"key"!==i&&"__self"!==i&&"__source"!==i&&("ref"!==i||void 0!==t.ref)&&(r[i]=t[i]);var i=arguments.length-2;if(1===i)r.children=n;else if(1<i){for(var a=Array(i),s=0;s<i;s++)a[s]=arguments[s+2];r.children=a}return O(e.type,o,r)},n.createContext=function(e){return(e={$$typeof:c,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:u,_context:e},e},n.createElement=function(e,t,n){var r,o={},i=null;if(null!=t)for(r in void 0!==t.key&&(i=""+t.key),t)C.call(t,r)&&"key"!==r&&"__self"!==r&&"__source"!==r&&(o[r]=t[r]);var a=arguments.length-2;if(1===a)o.children=n;else if(1<a){for(var s=Array(a),l=0;l<a;l++)s[l]=arguments[l+2];o.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps)void 0===o[r]&&(o[r]=a[r]);return O(e,i,o)},n.createRef=function(){return{current:null}},n.forwardRef=function(e){return{$$typeof:d,render:e}},n.isValidElement=T,n.lazy=function(e){return{$$typeof:m,_payload:{_status:-1,_result:e},_init:A}},n.memo=function(e,t){return{$$typeof:p,type:e,compare:void 0===t?null:t}},n.startTransition=function(e){var t=j.T,n={};j.T=n;try{var r=e(),o=j.S;null!==o&&o(n,r),"object"==typeof r&&null!==r&&"function"==typeof r.then&&r.then(k,M)}catch(e){M(e)}finally{null!==t&&null!==n.types&&(t.types=n.types),j.T=t}},n.unstable_useCacheRefresh=function(){return j.H.useCacheRefresh()},n.use=function(e){return j.H.use(e)},n.useActionState=function(e,t,n){return j.H.useActionState(e,t,n)},n.useCallback=function(e,t){return j.H.useCallback(e,t)},n.useContext=function(e){return j.H.useContext(e)},n.useDebugValue=function(){},n.useDeferredValue=function(e,t){return j.H.useDeferredValue(e,t)},n.useEffect=function(e,t){return j.H.useEffect(e,t)},n.useEffectEvent=function(e){return j.H.useEffectEvent(e)},n.useId=function(){return j.H.useId()},n.useImperativeHandle=function(e,t,n){return j.H.useImperativeHandle(e,t,n)},n.useInsertionEffect=function(e,t){return j.H.useInsertionEffect(e,t)},n.useLayoutEffect=function(e,t){return j.H.useLayoutEffect(e,t)},n.useMemo=function(e,t){return j.H.useMemo(e,t)},n.useOptimistic=function(e,t){return j.H.useOptimistic(e,t)},n.useReducer=function(e,t,n){return j.H.useReducer(e,t,n)},n.useRef=function(e){return j.H.useRef(e)},n.useState=function(e){return j.H.useState(e)},n.useSyncExternalStore=function(e,t,n){return j.H.useSyncExternalStore(e,t,n)},n.useTransition=function(){return j.H.useTransition()},n.version="19.2.3"},91788,(e,t,n)=>{"use strict";t.exports=e.r(61556)},13584,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"HeadManagerContext",{enumerable:!0,get:function(){return r}});let r=e.r(41705)._(e.r(91788)).default.createContext({})},94470,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},52456,(e,t,n)=>{"use strict";function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(r=function(e){return e?n:t})(e)}n._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=r(t);if(n&&n.has(e))return n.get(e);var o={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=i?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(o,a,s):o[a]=e[a]}return o.default=e,n&&n.set(e,o),o}},94941,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"default",{enumerable:!0,get:function(){return s}});let r=e.r(91788),o="u"<typeof window,i=o?()=>{}:r.useLayoutEffect,a=o?()=>{}:r.useEffect;function s(e){let{headManager:t,reduceComponentsToState:n}=e;function s(){if(t&&t.mountedInstances){let e=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(n(e))}}return o&&(t?.mountedInstances?.add(e.children),s()),i(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),i(()=>(t&&(t._pendingUpdate=s),()=>{t&&(t._pendingUpdate=s)})),a(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},80963,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={default:function(){return h},defaultHead:function(){return d}};for(var o in r)Object.defineProperty(n,o,{enumerable:!0,get:r[o]});let i=e.r(41705),a=e.r(52456),s=e.r(91398),l=a._(e.r(91788)),u=i._(e.r(94941)),c=e.r(13584);function d(){return[(0,s.jsx)("meta",{charSet:"utf-8"},"charset"),(0,s.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function f(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===l.default.Fragment?e.concat(l.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(94470);let p=["name","httpEquiv","charSet","itemProp"];function m(e){let t,n,r,o;return e.reduce(f,[]).reverse().concat(d().reverse()).filter((t=new Set,n=new Set,r=new Set,o={},e=>{let i=!0,a=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){a=!0;let n=e.key.slice(e.key.indexOf("$")+1);t.has(n)?i=!1:t.add(n)}switch(e.type){case"title":case"base":n.has(e.type)?i=!1:n.add(e.type);break;case"meta":for(let t=0,n=p.length;t<n;t++){let n=p[t];if(e.props.hasOwnProperty(n))if("charSet"===n)r.has(n)?i=!1:r.add(n);else{let t=e.props[n],r=o[n]||new Set;("name"!==n||!a)&&r.has(t)?i=!1:(r.add(t),o[n]=r)}}}return i})).reverse().map((e,t)=>{let n=e.key||t;return l.default.cloneElement(e,{key:n})})}let h=function({children:e}){let t=(0,l.useContext)(c.HeadManagerContext);return(0,s.jsx)(u.default,{reduceComponentsToState:m,headManager:t,children:e})};("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},89129,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={DecodeError:function(){return g},MiddlewareNotFoundError:function(){return _},MissingStaticPage:function(){return x},NormalizeError:function(){return v},PageNotFoundError:function(){return b},SP:function(){return h},ST:function(){return y},WEB_VITALS:function(){return i},execOnce:function(){return a},getDisplayName:function(){return d},getLocationOrigin:function(){return u},getURL:function(){return c},isAbsoluteUrl:function(){return l},isResSent:function(){return f},loadGetInitialProps:function(){return m},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return w}};for(var o in r)Object.defineProperty(n,o,{enumerable:!0,get:r[o]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function a(e){let t,n=!1;return(...r)=>(n||(n=!0,t=e(...r)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>s.test(e);function u(){let{protocol:e,hostname:t,port:n}=window.location;return`${e}//${t}${n?":"+n:""}`}function c(){let{href:e}=window.location,t=u();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function m(e,t){let n=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await m(t.Component,t.ctx)}:{};let r=await e.getInitialProps(t);if(n&&f(n))return r;if(!r)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${r}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return r}let h="u">typeof performance,y=h&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class g extends Error{}class v extends Error{}class b extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class x extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class _ extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function w(e){return JSON.stringify({message:e.message,stack:e.stack})}},17431,(e,t,n)=>{"use strict";var r=e.r(91788);function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var a={d:{f:i,r:function(){throw Error(o(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},s=Symbol.for("react.portal"),l=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){return"font"===e?"":"string"==typeof t?"use-credentials"===t?t:"":void 0}n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,n.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(o(299));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:s,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},n.flushSync=function(e){var t=l.T,n=a.p;try{if(l.T=null,a.p=2,e)return e()}finally{l.T=t,a.p=n,a.d.f()}},n.preconnect=function(e,t){"string"==typeof e&&(t=t?"string"==typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:null,a.d.C(e,t))},n.prefetchDNS=function(e){"string"==typeof e&&a.d.D(e)},n.preinit=function(e,t){if("string"==typeof e&&t&&"string"==typeof t.as){var n=t.as,r=u(n,t.crossOrigin),o="string"==typeof t.integrity?t.integrity:void 0,i="string"==typeof t.fetchPriority?t.fetchPriority:void 0;"style"===n?a.d.S(e,"string"==typeof t.precedence?t.precedence:void 0,{crossOrigin:r,integrity:o,fetchPriority:i}):"script"===n&&a.d.X(e,{crossOrigin:r,integrity:o,fetchPriority:i,nonce:"string"==typeof t.nonce?t.nonce:void 0})}},n.preinitModule=function(e,t){if("string"==typeof e)if("object"==typeof t&&null!==t){if(null==t.as||"script"===t.as){var n=u(t.as,t.crossOrigin);a.d.M(e,{crossOrigin:n,integrity:"string"==typeof t.integrity?t.integrity:void 0,nonce:"string"==typeof t.nonce?t.nonce:void 0})}}else null==t&&a.d.M(e)},n.preload=function(e,t){if("string"==typeof e&&"object"==typeof t&&null!==t&&"string"==typeof t.as){var n=t.as,r=u(n,t.crossOrigin);a.d.L(e,n,{crossOrigin:r,integrity:"string"==typeof t.integrity?t.integrity:void 0,nonce:"string"==typeof t.nonce?t.nonce:void 0,type:"string"==typeof t.type?t.type:void 0,fetchPriority:"string"==typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"==typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"==typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"==typeof t.imageSizes?t.imageSizes:void 0,media:"string"==typeof t.media?t.media:void 0})}},n.preloadModule=function(e,t){if("string"==typeof e)if(t){var n=u(t.as,t.crossOrigin);a.d.m(e,{as:"string"==typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:n,integrity:"string"==typeof t.integrity?t.integrity:void 0})}else a.d.m(e)},n.requestFormReset=function(e){a.d.r(e)},n.unstable_batchedUpdates=function(e,t){return e(t)},n.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},n.useFormStatus=function(){return l.H.useHostTransitionStatus()},n.version="19.2.3"},30943,(e,t,n)=>{"use strict";!function e(){if("u">typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),t.exports=e.r(17431)},37372,e=>{e.v({className:"barlow_787abe52-module__o0DmqW__className",variable:"barlow_787abe52-module__o0DmqW__variable"})},49722,e=>{e.v({className:"archivo_b59e2fa4-module__LZhF-q__className",variable:"archivo_b59e2fa4-module__LZhF-q__variable"})},3115,e=>{"use strict";let t,n,r;var o,i=e.i(91398),a=e.i(7065),s=String.raw,l=s`
  :root,
  :host {
    --chakra-vh: 100vh;
  }

  @supports (height: -webkit-fill-available) {
    :root,
    :host {
      --chakra-vh: -webkit-fill-available;
    }
  }

  @supports (height: -moz-fill-available) {
    :root,
    :host {
      --chakra-vh: -moz-fill-available;
    }
  }

  @supports (height: 100dvh) {
    :root,
    :host {
      --chakra-vh: 100dvh;
    }
  }
`,u=()=>(0,i.jsx)(a.Global,{styles:l}),c=({scope:e=""})=>(0,i.jsx)(a.Global,{styles:s`
      html {
        line-height: 1.5;
        -webkit-text-size-adjust: 100%;
        font-family: system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        touch-action: manipulation;
      }

      body {
        position: relative;
        min-height: 100%;
        margin: 0;
        font-feature-settings: "kern";
      }

      ${e} :where(*, *::before, *::after) {
        border-width: 0;
        border-style: solid;
        box-sizing: border-box;
        word-wrap: break-word;
      }

      main {
        display: block;
      }

      ${e} hr {
        border-top-width: 1px;
        box-sizing: content-box;
        height: 0;
        overflow: visible;
      }

      ${e} :where(pre, code, kbd,samp) {
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 1em;
      }

      ${e} a {
        background-color: transparent;
        color: inherit;
        text-decoration: inherit;
      }

      ${e} abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        -webkit-text-decoration: underline dotted;
        text-decoration: underline dotted;
      }

      ${e} :where(b, strong) {
        font-weight: bold;
      }

      ${e} small {
        font-size: 80%;
      }

      ${e} :where(sub,sup) {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }

      ${e} sub {
        bottom: -0.25em;
      }

      ${e} sup {
        top: -0.5em;
      }

      ${e} img {
        border-style: none;
      }

      ${e} :where(button, input, optgroup, select, textarea) {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
      }

      ${e} :where(button, input) {
        overflow: visible;
      }

      ${e} :where(button, select) {
        text-transform: none;
      }

      ${e} :where(
          button::-moz-focus-inner,
          [type="button"]::-moz-focus-inner,
          [type="reset"]::-moz-focus-inner,
          [type="submit"]::-moz-focus-inner
        ) {
        border-style: none;
        padding: 0;
      }

      ${e} fieldset {
        padding: 0.35em 0.75em 0.625em;
      }

      ${e} legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
      }

      ${e} progress {
        vertical-align: baseline;
      }

      ${e} textarea {
        overflow: auto;
      }

      ${e} :where([type="checkbox"], [type="radio"]) {
        box-sizing: border-box;
        padding: 0;
      }

      ${e} input[type="number"]::-webkit-inner-spin-button,
      ${e} input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none !important;
      }

      ${e} input[type="number"] {
        -moz-appearance: textfield;
      }

      ${e} input[type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
      }

      ${e} input[type="search"]::-webkit-search-decoration {
        -webkit-appearance: none !important;
      }

      ${e} ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
      }

      ${e} details {
        display: block;
      }

      ${e} summary {
        display: list-item;
      }

      template {
        display: none;
      }

      [hidden] {
        display: none !important;
      }

      ${e} :where(
          blockquote,
          dl,
          dd,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          hr,
          figure,
          p,
          pre
        ) {
        margin: 0;
      }

      ${e} button {
        background: transparent;
        padding: 0;
      }

      ${e} fieldset {
        margin: 0;
        padding: 0;
      }

      ${e} :where(ol, ul) {
        margin: 0;
        padding: 0;
      }

      ${e} textarea {
        resize: vertical;
      }

      ${e} :where(button, [role="button"]) {
        cursor: pointer;
      }

      ${e} button::-moz-focus-inner {
        border: 0 !important;
      }

      ${e} table {
        border-collapse: collapse;
      }

      ${e} :where(h1, h2, h3, h4, h5, h6) {
        font-size: inherit;
        font-weight: inherit;
      }

      ${e} :where(button, input, optgroup, select, textarea) {
        padding: 0;
        line-height: inherit;
        color: inherit;
      }

      ${e} :where(img, svg, video, canvas, audio, iframe, embed, object) {
        display: block;
      }

      ${e} :where(img, video) {
        max-width: 100%;
        height: auto;
      }

      [data-js-focus-visible]
        :focus:not([data-focus-visible-added]):not(
          [data-focus-visible-disabled]
        ) {
        outline: none;
        box-shadow: none;
      }

      ${e} select::-ms-expand {
        display: none;
      }

      ${l}
    `}),d=e.i(81538),f=e.i(13625),p="chakra-ui-light",m="chakra-ui-dark",h="chakra-ui-color-mode",y={ssr:!1,type:"localStorage",get(e){let t;if(!(null==globalThis?void 0:globalThis.document))return e;try{t=localStorage.getItem(h)||e}catch(e){}return t||e},set(e){try{localStorage.setItem(h,e)}catch(e){}}},g=e.i(39681),v=e.i(91788),b=()=>{};function x(e,t){return"cookie"===e.type&&e.ssr?e.get(t):t}function _(e){let{value:t,children:n,options:{useSystemColorMode:r,initialColorMode:o,disableTransitionOnChange:a}={},colorModeManager:s=y}=e,l="dark"===o?"dark":"light",[u,c]=(0,v.useState)(()=>x(s,l)),[d,h]=(0,v.useState)(()=>x(s)),{getSystemTheme:_,setClassName:w,setDataset:S,addListener:E}=(0,v.useMemo)(()=>(function(e={}){let{preventTransition:t=!0}=e,n={setDataset:e=>{let r=t?n.preventTransition():void 0;document.documentElement.dataset.theme=e,document.documentElement.style.colorScheme=e,null==r||r()},setClassName(e){document.body.classList.add(e?m:p),document.body.classList.remove(e?p:m)},query:()=>window.matchMedia("(prefers-color-scheme: dark)"),getSystemTheme(e){var t;return(null!=(t=n.query().matches)?t:"dark"===e)?"dark":"light"},addListener(e){let t=n.query(),r=t=>{e(t.matches?"dark":"light")};return"function"==typeof t.addListener?t.addListener(r):t.addEventListener("change",r),()=>{"function"==typeof t.removeListener?t.removeListener(r):t.removeEventListener("change",r)}},preventTransition(){let e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),requestAnimationFrame(()=>{requestAnimationFrame(()=>{document.head.removeChild(e)})})}}};return n})({preventTransition:a}),[a]),k="system"!==o||u?u:d,j=(0,v.useCallback)(e=>{let t="system"===e?_():e;c(t),w("dark"===t),S(t),s.set(t)},[s,_,w,S]);(0,g.useSafeLayoutEffect)(()=>{"system"===o&&h(_())},[]),(0,v.useEffect)(()=>{let e=s.get();e?j(e):"system"===o?j("system"):j(l)},[s,l,o,j]);let C=(0,v.useCallback)(()=>{j("dark"===k?"light":"dark")},[k,j]);(0,v.useEffect)(()=>{if(r)return E(j)},[r,E,j]);let O=(0,v.useMemo)(()=>({colorMode:null!=t?t:k,toggleColorMode:t?b:C,setColorMode:t?b:j,forced:void 0!==t}),[k,C,j,t]);return(0,i.jsx)(f.ColorModeContext.Provider,{value:O,children:n})}_.displayName="ColorModeProvider";var w=e.i(40272),S=e.i(76817),E=e.i(84885),k=e.i(71396),k=k;function j(e){let{cssVarsRoot:t,theme:n,children:r}=e,o=(0,v.useMemo)(()=>(0,w.toCSSVar)(n),[n]);return(0,i.jsxs)(k.a,{theme:o,children:[(0,i.jsx)(C,{root:t}),r]})}function C({root:e=":host, :root"}){let t=[e,"[data-theme]"].join(",");return(0,i.jsx)(a.Global,{styles:e=>({[t]:e.__cssVars})})}var[O,T]=function(e={}){let{strict:t=!0,errorMessage:n="useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",name:r}=e,o=(0,v.createContext)(void 0);return o.displayName=r,[o.Provider,function e(){var r;let i=(0,v.useContext)(o);if(!i&&t){let t=Error(n);throw t.name="ContextError",null==(r=Error.captureStackTrace)||r.call(Error,t,e),t}return i},o]}({name:"StylesContext",errorMessage:"useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "});function $(){let{colorMode:e}=(0,f.useColorMode)();return(0,i.jsx)(a.Global,{styles:t=>{let n=(0,S.memoizedGet)(t,"styles.global"),r=(0,E.runIfFn)(n,{theme:t,colorMode:e});if(r)return(0,w.css)(r)(t)}})}var N=(0,v.createContext)({getDocument:()=>document,getWindow:()=>window});function P(e){let{children:t,environment:n,disabled:r}=e,o=(0,v.useRef)(null),a=(0,v.useMemo)(()=>n||{getDocument:()=>{var e,t;return null!=(t=null==(e=o.current)?void 0:e.ownerDocument)?t:document},getWindow:()=>{var e,t;return null!=(t=null==(e=o.current)?void 0:e.ownerDocument.defaultView)?t:window}},[n]),s=!r||!n;return(0,i.jsxs)(N.Provider,{value:a,children:[t,s&&(0,i.jsx)("span",{id:"__chakra_env",hidden:!0,ref:o})]})}N.displayName="EnvironmentContext",P.displayName="EnvironmentProvider";var A=e=>{let{children:t,colorModeManager:n,portalZIndex:r,resetScope:o,resetCSS:a=!0,theme:s={},environment:l,cssVarsRoot:f,disableEnvironment:p,disableGlobalStyle:m}=e,h=(0,i.jsx)(P,{environment:l,disabled:p,children:t});return(0,i.jsx)(j,{theme:s,cssVarsRoot:f,children:(0,i.jsxs)(_,{colorModeManager:n,options:s.config,children:[a?(0,i.jsx)(c,{scope:o}):(0,i.jsx)(u,{}),!m&&(0,i.jsx)($,{}),r?(0,i.jsx)(d.PortalManager,{zIndex:r,children:h}):h]})})},M=e.i(49656),R=(e,t)=>e.find(e=>e.id===t);function L(e,t){let n=I(e,t),r=n?e[n].findIndex(e=>e.id===t):-1;return{position:n,index:r}}function I(e,t){for(let[n,r]of Object.entries(e))if(R(r,t))return n}function z(e,t){let n=(0,v.useRef)(!1),r=(0,v.useRef)(!1);(0,v.useEffect)(()=>{if(n.current&&r.current)return e();r.current=!0},t),(0,v.useEffect)(()=>(n.current=!0,()=>{n.current=!1}),[])}var H=e.i(74833),D=e.i(11829),F=e.i(86398),U=e.i(46440),q={initial:e=>{let{position:t}=e,n=["top","bottom"].includes(t)?"y":"x",r=["top-right","bottom-right"].includes(t)?1:-1;return"bottom"===t&&(r=1),{opacity:0,[n]:24*r}},animate:{opacity:1,y:0,x:0,scale:1,transition:{duration:.4,ease:[.4,0,.2,1]}},exit:{opacity:0,scale:.85,transition:{duration:.2,ease:[.4,0,1,1]}}},B=(0,v.memo)(e=>{let t,{id:n,message:r,onCloseComplete:o,onRequestRemove:a,requestClose:s=!1,position:l="bottom",duration:u=5e3,containerStyle:c,motionVariants:d=q,toastSpacing:f="0.5rem"}=e,[p,m]=(0,v.useState)(u),h=(0,F.useIsPresent)();z(()=>{h||null==o||o()},[h]),z(()=>{m(u)},[u]);let y=()=>{h&&a()};(0,v.useEffect)(()=>{h&&s&&a()},[h,s,a]),t=function(e,t=[]){let n=(0,v.useRef)(e);return(0,v.useEffect)(()=>{n.current=e}),(0,v.useCallback)((...e)=>{var t;return null==(t=n.current)?void 0:t.call(n,...e)},t)}(y),(0,v.useEffect)(()=>{if(null==p)return;let e=null;return e=window.setTimeout(()=>{t()},p),()=>{e&&window.clearTimeout(e)}},[p,t]);let g=(0,v.useMemo)(()=>({pointerEvents:"auto",maxWidth:560,minWidth:300,margin:f,...c}),[c,f]),b=(0,v.useMemo)(()=>{let e,t,n;return e=l.includes("right"),t=l.includes("left"),n="center",e&&(n="flex-end"),t&&(n="flex-start"),{display:"flex",flexDirection:"column",alignItems:n}},[l]);return(0,i.jsx)(D.motion.div,{layout:!0,className:"chakra-toast",variants:d,initial:"initial",animate:"animate",exit:"exit",onHoverStart:()=>m(null),onHoverEnd:()=>m(u),custom:{position:l},style:b,children:(0,i.jsx)(U.chakra.div,{role:"status","aria-atomic":"true",className:"chakra-toast__inner",__css:g,children:(0,H.runIfFn)(r,{id:n,onClose:y})})})});B.displayName="ToastComponent";var W=e.i(24867);function G(e){return(0,i.jsx)(W.Icon,{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{fill:"currentColor",d:"M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"})})}var V=e.i(93316),Z=e.i(59245),[X,K]=(0,V.createContext)({name:"AlertContext",hookName:"useAlertContext",providerName:"<Alert />"}),[Y,J]=(0,V.createContext)({name:"AlertStylesContext",hookName:"useAlertStyles",providerName:"<Alert />"}),Q={info:{icon:function(e){return(0,i.jsx)(W.Icon,{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{fill:"currentColor",d:"M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"})})},colorScheme:"blue"},warning:{icon:G,colorScheme:"orange"},success:{icon:function(e){return(0,i.jsx)(W.Icon,{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{fill:"currentColor",d:"M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"})})},colorScheme:"green"},error:{icon:G,colorScheme:"red"},loading:{icon:Z.Spinner,colorScheme:"blue"}},ee=e.i(5904),et=e.i(23520),en=(0,ee.forwardRef)(function(e,t){var n;let{status:r="info",addRole:o=!0,...a}=(0,w.omitThemingProps)(e),s=null!=(n=e.colorScheme)?n:Q[r].colorScheme,l=(0,et.useMultiStyleConfig)("Alert",{...e,colorScheme:s}),u={width:"100%",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",...l.container};return(0,i.jsx)(X,{value:{status:r},children:(0,i.jsx)(Y,{value:l,children:(0,i.jsx)(U.chakra.div,{"data-status":r,role:o?"alert":void 0,ref:t,...a,className:(0,H.cx)("chakra-alert",e.className),__css:u})})})});en.displayName="Alert";var er=(0,ee.forwardRef)(function(e,t){let n=J(),{status:r}=K(),o={display:"inline",...n.description};return(0,i.jsx)(U.chakra.div,{ref:t,"data-status":r,...e,className:(0,H.cx)("chakra-alert__desc",e.className),__css:o})});function eo(e){let{status:t}=K(),n=Q[t].icon,r=J(),o="loading"===t?r.spinner:r.icon;return(0,i.jsx)(U.chakra.span,{display:"inherit","data-status":t,...e,className:(0,H.cx)("chakra-alert__icon",e.className),__css:o,children:e.children||(0,i.jsx)(n,{h:"100%",w:"100%"})})}er.displayName="AlertDescription",eo.displayName="AlertIcon";var ei=(0,ee.forwardRef)(function(e,t){let n=J(),{status:r}=K();return(0,i.jsx)(U.chakra.div,{ref:t,"data-status":r,...e,className:(0,H.cx)("chakra-alert__title",e.className),__css:n.title})});ei.displayName="AlertTitle";var ea=e.i(76997),es=(t=o={top:[],"top-left":[],"top-right":[],"bottom-left":[],bottom:[],"bottom-right":[]},n=new Set,r=e=>{t=e(t),n.forEach(e=>e())},{getState:()=>t,subscribe:e=>(n.add(e),()=>{r(()=>o),n.delete(e)}),removeToast:(e,t)=>{r(n=>({...n,[t]:n[t].filter(t=>t.id!=e)}))},notify:(e,t)=>{let n=function(e,t={}){var n,r;el+=1;let o=null!=(n=t.id)?n:el,i=null!=(r=t.position)?r:"bottom";return{id:o,message:e,position:i,duration:t.duration,onCloseComplete:t.onCloseComplete,onRequestRemove:()=>es.removeToast(String(o),i),status:t.status,requestClose:!1,containerStyle:t.containerStyle}}(e,t),{position:o,id:i}=n;return r(e=>{var t,r;let i=o.includes("top")?[n,...null!=(t=e[o])?t:[]]:[...null!=(r=e[o])?r:[],n];return{...e,[o]:i}}),i},update:(e,t)=>{e&&r(n=>{let r={...n},{position:o,index:a}=L(r,e);return o&&-1!==a&&(r[o][a]={...r[o][a],...t,message:function(e={}){let{render:t,toastComponent:n=eu}=e;return r=>"function"==typeof t?t({...r,...e}):(0,i.jsx)(n,{...r,...e})}(t)}),r})},closeAll:({positions:e}={})=>{r(t=>(null!=e?e:["bottom","bottom-right","bottom-left","top","top-left","top-right"]).reduce((e,n)=>(e[n]=t[n].map(e=>({...e,requestClose:!0})),e),{...t}))},close:e=>{r(t=>{let n=I(t,e);return n?{...t,[n]:t[n].map(t=>t.id==e?{...t,requestClose:!0}:t)}:t})},isActive:e=>!!L(es.getState(),e).position}),el=0,eu=e=>{let{status:t,variant:n="solid",id:r,title:o,isClosable:a,onClose:s,description:l,colorScheme:u,icon:c}=e,d=r?{root:`toast-${r}`,title:`toast-${r}-title`,description:`toast-${r}-description`}:void 0;return(0,i.jsxs)(en,{addRole:!1,status:t,variant:n,id:null==d?void 0:d.root,alignItems:"start",borderRadius:"md",boxShadow:"lg",paddingEnd:8,textAlign:"start",width:"auto",colorScheme:u,children:[(0,i.jsx)(eo,{children:c}),(0,i.jsxs)(U.chakra.div,{flex:"1",maxWidth:"100%",children:[o&&(0,i.jsx)(ei,{id:null==d?void 0:d.title,children:o}),l&&(0,i.jsx)(er,{id:null==d?void 0:d.description,display:"block",children:l})]}),a&&(0,i.jsx)(ea.CloseButton,{size:"sm",onClick:s,position:"absolute",insetEnd:1,top:1})]})},ec=e.i(98817),ed=e.i(44666),[ef,ep]=(0,V.createContext)({name:"ToastOptionsContext",strict:!1}),em=e=>{let t=(0,v.useSyncExternalStore)(es.subscribe,es.getState,es.getState),{motionVariants:n,component:r=B,portalProps:o}=e,a=Object.keys(t).map(e=>{let o,a,s,l=t[e];return(0,i.jsx)("div",{role:"region","aria-live":"polite","aria-label":`Notifications-${e}`,id:`chakra-toast-manager-${e}`,style:(o="top"===e||"bottom"===e,a=e.includes("top")?"env(safe-area-inset-top, 0px)":void 0,s=e.includes("bottom")?"env(safe-area-inset-bottom, 0px)":void 0,{position:"fixed",zIndex:"var(--toast-z-index, 5500)",pointerEvents:"none",display:"flex",flexDirection:"column",margin:o?"0 auto":void 0,top:a,bottom:s,right:e.includes("left")?void 0:"env(safe-area-inset-right, 0px)",left:e.includes("right")?void 0:"env(safe-area-inset-left, 0px)"}),children:(0,i.jsx)(ec.AnimatePresence,{initial:!1,children:l.map(e=>(0,i.jsx)(r,{motionVariants:n,...e},e.id))})},e)});return(0,i.jsx)(ed.Portal,{...o,children:a})},eh=e=>function({children:t,theme:n=e,toastOptions:r,...o}){return(0,i.jsxs)(A,{theme:n,...o,children:[(0,i.jsx)(ef,{value:null==r?void 0:r.defaultOptions,children:t}),(0,i.jsx)(em,{...r})]})},ey=eh(M.theme);eh(M.baseTheme);var eg=e.i(58678),ev=e.i(37372);let eb={className:ev.default.className,style:{fontFamily:"'Barlow', 'Barlow Fallback'",fontStyle:"normal"}};null!=ev.default.variable&&(eb.variable=ev.default.variable);var ex=e.i(49722);let e_={className:ex.default.className,style:{fontFamily:"'Archivo', 'Archivo Fallback'",fontStyle:"normal"}};null!=ex.default.variable&&(e_.variable=ex.default.variable);let ew=(0,e.i(60710).extendTheme)({config:{initialColorMode:"light",useSystemColorMode:!1},colors:{blackAlt:"#111316",grey1:"#0D0F15",grey2:"#9d9d9d",gold:"#E0BE7A",goldAlt:"#A18855",focus:"#E0BE7A"},fonts:{heading:"var(--font-din-ot),-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif",body:"var(--font-din-ot),-apple-system,system-ui,sans-serif"},fontSizes:{"3xs":"0.45rem","2xs":"0.625rem","4xl":"36px","5xl":"48px"},radii:{base:"0.75rem",md:"6px",lg:"12px",xl:"18px","2xl":"2.5rem","3xl":"3.5rem"},shadows:{lg:"0 6px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)",xl:"0 8px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04)","2xl":"0 15px 50px -12px rgba(0, 0, 0, 0.25)",outline:"0 0 0 3px rgba(125, 125, 125, 0.3)",surface:"0 0 0 1px rgba(63,63,68,0.05),0 1px 35px 0 rgba(63,63,68,0.05)",surfaceDark:"0 0 0 1px rgba(195,195,195,0.045),0 1px 35px 0 rgba(0,0,0,0.1)"},zIndices:{backgroundGrid:-1,buttonSlider:2,cursor:5,navigation:6,footer:6,loader:7},breakpoints:{base:"0em",sm:"23.4375em",md:"36.0625em",lg:"48em",xl:"62.0625em","2xl":"75em","3xl":"98.75em","4xl":"125em"},styles:{global:{body:{backgroundColor:"#000"},"body *":{boxSizing:"border-box",wordWrap:"break-word"},"div#__next":{width:"100%",height:"auto",minHeight:"calc(var(--vh, 1vh) * 100)",boxSizing:"border-box",wordWrap:"break-word",color:"#fff",fontFamily:"var(--font-din-ot),sans-serif"},"body .dg.ac":{zIndex:999,opacity:.3,transition:"opacity 0.2s"},"body .dg.ac .c input[type='text']":{height:"27px",margin:0,padding:0},"body .dg.ac:hover":{opacity:1},"*:focus":{boxShadow:"none !important",outline:"none"},"*[data-focus]":{boxShadow:"none !important"},"a:focus-visible, button:focus-visible, [role='button']:focus-visible":{boxShadow:"none",outline:"#E0BE7A solid 2px",outlineOffset:"1px"}}}});function eS({Component:e,pageProps:t}){return(0,v.useEffect)(()=>{let e=()=>{document.documentElement.style.setProperty("--vh",`${.01*window.innerHeight}px`)};return e(),window.addEventListener("resize",e),window.addEventListener("orientationchange",e),()=>{window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e)}},[]),(0,i.jsxs)(ey,{theme:ew,children:[(0,i.jsx)(a.Global,{styles:`:root{--font-din-ot:${eb.style.fontFamily};--font-gridnik:${e_.style.fontFamily};}`}),(0,i.jsxs)(eg.default,{children:[(0,i.jsx)("meta",{charSet:"utf-8"}),(0,i.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0, viewport-fit=cover"})]}),(0,i.jsx)(e,{...t})]})}e.s(["default",()=>eS],3115)},68146,(e,t,n)=>{let r="/_app";(window.__NEXT_P=window.__NEXT_P||[]).push([r,()=>e.r(3115)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([r])})},48761,e=>{e.v(t=>Promise.all(["static/chunks/28e14a26e92e0e1d.js"].map(t=>e.l(t))).then(()=>t(93594)))},28805,e=>{e.v(t=>Promise.all(["static/chunks/3dcc93bb4829c1ba.js"].map(t=>e.l(t))).then(()=>t(79466)))}]);