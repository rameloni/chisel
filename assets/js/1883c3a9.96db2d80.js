"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[7087],{6693:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>r,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var o=e(4848),i=e(8453);const s={layout:"docs",title:"Annotations",section:"chisel3"},a="Annotations",c={id:"explanations/annotations",title:"Annotations",description:'Annotations are metadata containers associated with zero or more "things" in a FIRRTL circuit.',source:"@site/docs/explanations/annotations.md",sourceDirName:"explanations",slug:"/explanations/annotations",permalink:"/docs/explanations/annotations",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/annotations.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Annotations",section:"chisel3"},sidebar:"chiselSidebar",previous:{title:"Explanations",permalink:"/docs/explanations"},next:{title:"Blackboxes",permalink:"/docs/explanations/blackboxes"}},r={},d=[];function l(n){const t={a:"a",code:"code",h1:"h1",p:"p",...(0,i.R)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"annotations",children:"Annotations"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:"Annotation"}),'s are metadata containers associated with zero or more "things" in a FIRRTL circuit.\nCommonly, ',(0,o.jsx)(t.code,{children:"Annotation"}),"s are used to communicate information from Chisel to a specific, known FIRRTL ",(0,o.jsx)(t.code,{children:"Transform"}),".\nIn this way ",(0,o.jsx)(t.code,{children:"Annotation"}),'s can be viewed as the "arguments" that a specific ',(0,o.jsx)(t.code,{children:"Transform"})," consumes."]}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:"Annotation"}),"s are intended to be an implementation detail of Chisel and are not\nmeant to be manually constructed or interacted with directly by users.  Instead,\nthey are intended to be used through existing or new Chisel APIs.  E.g., the\n",(0,o.jsx)(t.code,{children:"dontTouch"})," API provides a way for a user to indicate that a wire or port should\nnot be optimized.  This API is backed by a ",(0,o.jsx)(t.code,{children:"DontTouchAnnotation"}),", but this is\nhidden from Chisel users."]}),"\n",(0,o.jsxs)(t.p,{children:["A list of all supported ",(0,o.jsx)(t.code,{children:"Annotation"}),"s is maintained ",(0,o.jsx)(t.a,{href:"https://circt.llvm.org/docs/Dialects/FIRRTL/FIRRTLAnnotations/",children:"as part of documentation of\nthe FIRRTL Dialect on\ncirct.llvm.org"}),"."]})]})}function h(n={}){const{wrapper:t}={...(0,i.R)(),...n.components};return t?(0,o.jsx)(t,{...n,children:(0,o.jsx)(l,{...n})}):l(n)}},8453:(n,t,e)=>{e.d(t,{R:()=>a,x:()=>c});var o=e(6540);const i={},s=o.createContext(i);function a(n){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function c(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:a(n.components),o.createElement(s.Provider,{value:t},n.children)}}}]);