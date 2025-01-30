"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[8507],{2050:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>l,metadata:()=>c,toc:()=>r});var i=s(4848),t=s(8453);const l={layout:"docs",title:"Muxes and Input Selection",section:"chisel3"},a="Muxes and Input Selection",c={id:"explanations/muxes-and-input-selection",title:"Muxes and Input Selection",description:"Selecting inputs is very useful in hardware description, and therefore Chisel provides several built-in generic input-selection implementations.",source:"@site/docs/explanations/muxes-and-input-selection.md",sourceDirName:"explanations",slug:"/explanations/muxes-and-input-selection",permalink:"/docs/explanations/muxes-and-input-selection",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/muxes-and-input-selection.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Muxes and Input Selection",section:"chisel3"},sidebar:"chiselSidebar",previous:{title:"Multiple Clock Domains",permalink:"/docs/explanations/multi-clock"},next:{title:"Naming",permalink:"/docs/explanations/naming"}},o={},r=[{value:"Mux",id:"mux",level:3},{value:"MuxCase",id:"muxcase",level:3},{value:"MuxLookup",id:"muxlookup",level:3},{value:"Mux1H",id:"mux1h",level:3}];function d(e){const n={code:"code",em:"em",h1:"h1",h3:"h3",header:"header",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"muxes-and-input-selection",children:"Muxes and Input Selection"})}),"\n",(0,i.jsx)(n.p,{children:"Selecting inputs is very useful in hardware description, and therefore Chisel provides several built-in generic input-selection implementations."}),"\n",(0,i.jsx)(n.h3,{id:"mux",children:"Mux"}),"\n",(0,i.jsxs)(n.p,{children:["The first one is ",(0,i.jsx)(n.code,{children:"Mux"}),". This is a 2-input selector. Unlike the ",(0,i.jsx)(n.code,{children:"Mux2"})," example which was presented previously, the built-in ",(0,i.jsx)(n.code,{children:"Mux"})," allows\nthe inputs (",(0,i.jsx)(n.code,{children:"in0"})," and ",(0,i.jsx)(n.code,{children:"in1"}),") to be any datatype as long as they are the same subclass of ",(0,i.jsx)(n.code,{children:"Data"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"By using the functional module creation feature presented in the previous section, we can create multi-input selector in a simple way:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:"Mux(c1, a, Mux(c2, b, Mux(..., default)))\n"})}),"\n",(0,i.jsx)(n.h3,{id:"muxcase",children:"MuxCase"}),"\n",(0,i.jsxs)(n.p,{children:["The nested ",(0,i.jsx)(n.code,{children:"Mux"})," is not necessary since Chisel also provides the built-in ",(0,i.jsx)(n.code,{children:"MuxCase"}),", which implements that exact feature.\n",(0,i.jsx)(n.code,{children:"MuxCase"})," is an n-way ",(0,i.jsx)(n.code,{children:"Mux"}),", which can be used as follows:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:"MuxCase(default, Array(c1 -> a, c2 -> b, ...))\n"})}),"\n",(0,i.jsx)(n.p,{children:"Where each selection dependency is represented as a tuple in a Scala\narray [ condition -> selected_input_port ]."}),"\n",(0,i.jsx)(n.h3,{id:"muxlookup",children:"MuxLookup"}),"\n",(0,i.jsxs)(n.p,{children:["Chisel also provides ",(0,i.jsx)(n.code,{children:"MuxLookup"})," which is an n-way indexed multiplexer:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:"MuxLookup(idx, default)(Seq(0.U -> a, 1.U -> b, ...))\n"})}),"\n",(0,i.jsxs)(n.p,{children:["This is the same as a ",(0,i.jsx)(n.code,{children:"MuxCase"}),", where the conditions are all index based selection:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:"MuxCase(default,\n        Array((idx === 0.U) -> a,\n              (idx === 1.U) -> b, ...))\n"})}),"\n",(0,i.jsx)(n.p,{children:"Note that the conditions/cases/selectors (eg. c1, c2) must be in parentheses."}),"\n",(0,i.jsx)(n.h3,{id:"mux1h",children:"Mux1H"}),"\n",(0,i.jsxs)(n.p,{children:["Another ",(0,i.jsx)(n.code,{children:"Mux"})," utility is the one-hot mux, ",(0,i.jsx)(n.code,{children:"Mux1H"}),". It takes a sequence of selectors and values and returns the value associated with the one selector that is set. If zero or multiple selectors are set the behavior is undefined.  For example:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:"  val hotValue = chisel3.util.Mux1H(Seq(\n    io.selector(0) -> 2.U,\n    io.selector(1) -> 4.U,\n    io.selector(2) -> 8.U,\n    io.selector(4) -> 11.U,\n  ))\n"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Mux1H"})," whenever possible generates ",(0,i.jsx)(n.em,{children:"Firrtl"})," that is readily optimizable as low depth and/or tree."]})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>c});var i=s(6540);const t={},l=i.createContext(t);function a(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);