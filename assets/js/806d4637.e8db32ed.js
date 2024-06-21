"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[8485],{5811:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>m,frontMatter:()=>t,metadata:()=>s,toc:()=>c});var a=i(4848),l=i(8453),o=i(1871);const t={sidebar_position:4},r="Serialization Cookbook",s={id:"cookbooks/serialization",title:"Serialization Cookbook",description:"Why do I need to serialize Modules",source:"@site/docs/cookbooks/serialization.md",sourceDirName:"cookbooks",slug:"/cookbooks/serialization",permalink:"/docs/cookbooks/serialization",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/cookbooks/serialization.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"chiselSidebar",previous:{title:"DataView Cookbook",permalink:"/docs/cookbooks/dataview"},next:{title:"Troubleshooting",permalink:"/docs/cookbooks/troubleshooting"}},d={},c=[{value:"Why do I need to serialize Modules",id:"why-do-i-need-to-serialize-modules",level:2},{value:"How do I serialize Modules with <code>SerializableModuleGenerator</code>",id:"how-do-i-serialize-modules-with-serializablemodulegenerator",level:2}];function u(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"serialization-cookbook",children:"Serialization Cookbook"}),"\n","\n","\n",(0,a.jsx)(o.A,{toc:c}),"\n",(0,a.jsx)(n.h2,{id:"why-do-i-need-to-serialize-modules",children:"Why do I need to serialize Modules"}),"\n",(0,a.jsxs)(n.p,{children:['Chisel provides a very flexible hardware design experience. However, it sometimes becomes too flexible to design a relative big designs, since parameters of module might come from: 1. Global variables; 2. Outer class; 3. Entropies(time, random). It becomes really hard or impossible to describe "how to reproduce this single module?". This forbids doing unit-test for a module generator, and introduces issues in post-synthesis when doing ECO: a change to Module A might lead to change in Module B.\nThus ',(0,a.jsx)(n.code,{children:"SerializableModuleGenerator"}),", ",(0,a.jsx)(n.code,{children:"SerializableModule[T <: SerializableModuleParameter]"})," and ",(0,a.jsx)(n.code,{children:"SerializableModuleParameter"})," are provided to solve these issues.\nFor any ",(0,a.jsx)(n.code,{children:"SerializableModuleGenerator"}),", Chisel can automatically serialize and de-serialize it by adding these constraints:"]}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:["the ",(0,a.jsx)(n.code,{children:"SerializableModule"})," should not be inner class, since the outer class is a parameter to it;"]}),"\n",(0,a.jsxs)(n.li,{children:["the ",(0,a.jsx)(n.code,{children:"SerializableModule"})," has and only has one parameter with ",(0,a.jsx)(n.code,{children:"SerializableModuleParameter"})," as its type."]}),"\n",(0,a.jsx)(n.li,{children:"the Module neither depends on global variables nor uses non-reproducible functions(random, time, etc), and this should be guaranteed by user, since Scala cannot detect it."}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"It can provide these benefits:"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:["user can use ",(0,a.jsx)(n.code,{children:"SerializableModuleGenerator(module: class[SerializableModule], parameter: SerializableModuleParameter)"})," to auto serialize a Module and its parameter."]}),"\n",(0,a.jsxs)(n.li,{children:["user can nest ",(0,a.jsx)(n.code,{children:"SerializableModuleGenerator"})," in other serializable parameters to represent a relative large parameter."]}),"\n",(0,a.jsxs)(n.li,{children:["user can elaborate any ",(0,a.jsx)(n.code,{children:"SerializableModuleGenerator"})," into a single module for testing."]}),"\n"]}),"\n",(0,a.jsxs)(n.h2,{id:"how-do-i-serialize-modules-with-serializablemodulegenerator",children:["How do I serialize Modules with ",(0,a.jsx)(n.code,{children:"SerializableModuleGenerator"})]}),"\n",(0,a.jsxs)(n.p,{children:["It is pretty simple and illustrated by example below, the ",(0,a.jsx)(n.code,{children:"GCD"})," Module with ",(0,a.jsx)(n.code,{children:"width"})," as its parameter."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.experimental.{SerializableModule, SerializableModuleGenerator, SerializableModuleParameter}\nimport upickle.default._\n\n// provide serialization functions to GCDSerializableModuleParameter\nobject GCDSerializableModuleParameter {\n  implicit def rwP: ReadWriter[GCDSerializableModuleParameter] = macroRW\n}\n\n// Parameter\ncase class GCDSerializableModuleParameter(width: Int) extends SerializableModuleParameter\n\n// Module\nclass GCDSerializableModule(val parameter: GCDSerializableModuleParameter)\n    extends Module\n    with SerializableModule[GCDSerializableModuleParameter] {\n  val io = IO(new Bundle {\n    val a = Input(UInt(parameter.width.W))\n    val b = Input(UInt(parameter.width.W))\n    val e = Input(Bool())\n    val z = Output(UInt(parameter.width.W))\n  })\n  val x = Reg(UInt(parameter.width.W))\n  val y = Reg(UInt(parameter.width.W))\n  val z = Reg(UInt(parameter.width.W))\n  val e = Reg(Bool())\n  when(e) {\n    x := io.a\n    y := io.b\n    z := 0.U\n  }\n  when(x =/= y) {\n    when(x > y) {\n      x := x - y\n    }.otherwise {\n      y := y - x\n    }\n  }.otherwise {\n    z := x\n  }\n  io.z := z\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["using ",(0,a.jsx)(n.code,{children:"write"})," function in ",(0,a.jsx)(n.code,{children:"upickle"}),", it should return a json string:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:'val j = upickle.default.write(\n  SerializableModuleGenerator(\n    classOf[GCDSerializableModule],\n    GCDSerializableModuleParameter(32)\n  )\n)\n// j: String = "{\\"parameter\\":{\\"width\\":32},\\"generator\\":\\"repl.MdocSession$MdocApp$GCDSerializableModule\\"}"\n'})}),"\n",(0,a.jsx)(n.p,{children:"You can then read from json string and elaborate the Module:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"circt.stage.ChiselStage.emitSystemVerilog(\n  upickle.default.read[SerializableModuleGenerator[GCDSerializableModule, GCDSerializableModuleParameter]](\n    ujson.read(j)\n  ).module()\n)\n"})})]})}function m(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}},1871:(e,n,i)=>{i.d(n,{A:()=>t});i(6540);var a=i(5195);const l={tableOfContentsInline:"tableOfContentsInline_prmo"};var o=i(4848);function t(e){let{toc:n,minHeadingLevel:i,maxHeadingLevel:t}=e;return(0,o.jsx)("div",{className:l.tableOfContentsInline,children:(0,o.jsx)(a.A,{toc:n,minHeadingLevel:i,maxHeadingLevel:t,className:"table-of-contents",linkClassName:null})})}},5195:(e,n,i)=>{i.d(n,{A:()=>p});var a=i(6540),l=i(6342);function o(e){const n=e.map((e=>({...e,parentIndex:-1,children:[]}))),i=Array(7).fill(-1);n.forEach(((e,n)=>{const a=i.slice(2,e.level);e.parentIndex=Math.max(...a),i[e.level]=n}));const a=[];return n.forEach((e=>{const{parentIndex:i,...l}=e;i>=0?n[i].children.push(l):a.push(l)})),a}function t(e){let{toc:n,minHeadingLevel:i,maxHeadingLevel:a}=e;return n.flatMap((e=>{const n=t({toc:e.children,minHeadingLevel:i,maxHeadingLevel:a});return function(e){return e.level>=i&&e.level<=a}(e)?[{...e,children:n}]:n}))}function r(e){const n=e.getBoundingClientRect();return n.top===n.bottom?r(e.parentNode):n}function s(e,n){let{anchorTopOffset:i}=n;const a=e.find((e=>r(e).top>=i));if(a){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(r(a))?a:e[e.indexOf(a)-1]??null}return e[e.length-1]??null}function d(){const e=(0,a.useRef)(0),{navbar:{hideOnScroll:n}}=(0,l.p)();return(0,a.useEffect)((()=>{e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function c(e){const n=(0,a.useRef)(void 0),i=d();(0,a.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:a,linkActiveClassName:l,minHeadingLevel:o,maxHeadingLevel:t}=e;function r(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(a),r=function(e){let{minHeadingLevel:n,maxHeadingLevel:i}=e;const a=[];for(let l=n;l<=i;l+=1)a.push(`h${l}.anchor`);return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:o,maxHeadingLevel:t}),d=s(r,{anchorTopOffset:i.current}),c=e.find((e=>d&&d.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,i){i?(n.current&&n.current!==e&&n.current.classList.remove(l),e.classList.add(l),n.current=e):e.classList.remove(l)}(e,e===c)}))}return document.addEventListener("scroll",r),document.addEventListener("resize",r),r(),()=>{document.removeEventListener("scroll",r),document.removeEventListener("resize",r)}}),[e,i])}var u=i(8774),m=i(4848);function h(e){let{toc:n,className:i,linkClassName:a,isChild:l}=e;return n.length?(0,m.jsx)("ul",{className:l?void 0:i,children:n.map((e=>(0,m.jsxs)("li",{children:[(0,m.jsx)(u.A,{to:`#${e.id}`,className:a??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,m.jsx)(h,{isChild:!0,toc:e.children,className:i,linkClassName:a})]},e.id)))}):null}const b=a.memo(h);function p(e){let{toc:n,className:i="table-of-contents table-of-contents__left-border",linkClassName:r="table-of-contents__link",linkActiveClassName:s,minHeadingLevel:d,maxHeadingLevel:u,...h}=e;const p=(0,l.p)(),x=d??p.tableOfContents.minHeadingLevel,f=u??p.tableOfContents.maxHeadingLevel,v=function(e){let{toc:n,minHeadingLevel:i,maxHeadingLevel:l}=e;return(0,a.useMemo)((()=>t({toc:o(n),minHeadingLevel:i,maxHeadingLevel:l})),[n,i,l])}({toc:n,minHeadingLevel:x,maxHeadingLevel:f});return c((0,a.useMemo)((()=>{if(r&&s)return{linkClassName:r,linkActiveClassName:s,minHeadingLevel:x,maxHeadingLevel:f}}),[r,s,x,f])),(0,m.jsx)(b,{toc:v,className:i,linkClassName:r,...h})}},8453:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>r});var a=i(6540);const l={},o=a.createContext(l);function t(e){const n=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:t(e.components),a.createElement(o.Provider,{value:n},e.children)}}}]);