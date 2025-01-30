"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[5666],{9756:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>a,frontMatter:()=>r,metadata:()=>c,toc:()=>h});var t=i(4848),s=i(8453);const r={layout:"docs",title:"Width Inference",section:"chisel3"},d="Width Inference",c={id:"explanations/width-inference",title:"Width Inference",description:"Chisel provides bit width inference to reduce design effort. Users are encouraged to manually specify widths of ports and registers to prevent any surprises, but otherwise unspecified widths will be inferred by the FIRRTL compiler.",source:"@site/docs/explanations/width-inference.md",sourceDirName:"explanations",slug:"/explanations/width-inference",permalink:"/docs/explanations/width-inference",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/width-inference.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Width Inference",section:"chisel3"},sidebar:"chiselSidebar",previous:{title:"Warnings",permalink:"/docs/explanations/warnings"},next:{title:"Appendix",permalink:"/docs/appendix"}},o={},h=[];function l(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",header:"header",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"width-inference",children:"Width Inference"})}),"\n",(0,t.jsx)(n.p,{children:"Chisel provides bit width inference to reduce design effort. Users are encouraged to manually specify widths of ports and registers to prevent any surprises, but otherwise unspecified widths will be inferred by the FIRRTL compiler."}),"\n",(0,t.jsx)(n.p,{children:"For all circuit components declared with unspecified widths, the FIRRTL compiler will infer the minimum possible width that maintains the legality of all its incoming connections. Implicit here is that inference is done in a right to left fashion in the sense of an assignment statement in chisel, i.e. from the left hand side from the right hand side. If a component has no incoming connections, and the width is unspecified, then an error is thrown to indicate that the width could not be inferred."}),"\n",(0,t.jsxs)(n.p,{children:["For module input ports with unspecified widths, the inferred width is the minimum possible width that maintains the legality of all incoming connections to all instantiations of the module.\nThe width of a ground-typed multiplexor expression is the maximum of its two corresponding input widths. For multiplexing aggregate-typed expressions, the resulting widths of each leaf subelement is the maximum of its corresponding two input leaf subelement widths.\nThe width of a conditionally valid expression is the width of its input expression.  For the full formal description see the ",(0,t.jsx)(n.a,{href:"https://github.com/freechipsproject/firrtl/blob/master/spec/spec.pdf",children:"Firrtl Spec"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"Hardware operators have output widths as defined by the following set of rules:"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"operation"}),(0,t.jsx)(n.th,{children:"bit width"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:"z = x + y"})," ",(0,t.jsx)(n.em,{children:"or"})," ",(0,t.jsx)(n.code,{children:"z = x +% y"})]}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"w(z) = max(w(x), w(y))"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"z = x +& y"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"w(z) = max(w(x), w(y)) + 1"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:"z = x - y"})," ",(0,t.jsx)(n.em,{children:"or"})," ",(0,t.jsx)(n.code,{children:"z = x -% y"})]}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"w(z) = max(w(x), w(y))"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"z = x -& y"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"w(z) = max(w(x), w(y)) + 1"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"z = x & y"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"w(z) = max(w(x), w(y))"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"z = Mux(c, x, y)"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"w(z) = max(w(x), w(y))"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"z = w * y"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"w(z) = w(x) + w(y)"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"z = x << n"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"w(z) = w(x) + maxNum(n)"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"z = x >> n"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"w(z) = w(x) - minNum(n)"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"z = Cat(x, y)"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"w(z) = w(x) + w(y)"})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"z = Fill(n, x)"})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"w(z) = w(x) * maxNum(n)"})})]})]})]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:["where for instance ",(0,t.jsx)(n.code,{children:"w(z)"})," is the bit width of wire ",(0,t.jsx)(n.code,{children:"z"}),", and the ",(0,t.jsx)(n.code,{children:"&"}),"\nrule applies to all bitwise logical operations."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Given a path of connections that begins with an unspecified width element (most commonly a top-level input), then the compiler will throw an exception indicating a certain width was uninferrable."}),"\n",(0,t.jsxs)(n.p,{children:['A common "gotcha" comes from truncating addition and subtraction with the operators ',(0,t.jsx)(n.code,{children:"+"})," and ",(0,t.jsx)(n.code,{children:"-"}),". Users who want the result to maintain the full, expanded precision of the addition or subtraction should use the expanding operators ",(0,t.jsx)(n.code,{children:"+&"})," and ",(0,t.jsx)(n.code,{children:"-&"}),"."]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"The default truncating operation comes from Chisel's history as a microprocessor design language."}),"\n"]})]})}function a(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>d,x:()=>c});var t=i(6540);const s={},r=t.createContext(s);function d(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);