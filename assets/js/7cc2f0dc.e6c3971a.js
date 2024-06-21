"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[3291],{9044:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>r,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var t=a(4848),i=a(8453);const o={layout:"docs",title:"Polymorphism and Parameterization",section:"chisel3"},s="Polymorphism and Parameterization",l={id:"explanations/polymorphism-and-parameterization",title:"Polymorphism and Parameterization",description:"This section is advanced and can be skipped at first reading.",source:"@site/docs/explanations/polymorphism-and-parameterization.md",sourceDirName:"explanations",slug:"/explanations/polymorphism-and-parameterization",permalink:"/docs/explanations/polymorphism-and-parameterization",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/polymorphism-and-parameterization.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Polymorphism and Parameterization",section:"chisel3"},sidebar:"chiselSidebar",previous:{title:"Operators",permalink:"/docs/explanations/operators"},next:{title:"Ports",permalink:"/docs/explanations/ports"}},r={},d=[{value:"Parameterized Functions",id:"parameterized-functions",level:2},{value:"Parameterized Classes",id:"parameterized-classes",level:2},{value:"Parametrization based on Modules",id:"parametrization-based-on-modules",level:2}];function c(e){const n={code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"polymorphism-and-parameterization",children:"Polymorphism and Parameterization"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.em,{children:"This section is advanced and can be skipped at first reading."})}),"\n",(0,t.jsx)(n.p,{children:"Scala is a strongly typed language and uses parameterized types to specify generic functions and classes.\nIn this section, we show how Chisel users can define their own reusable functions and classes using parameterized classes."}),"\n",(0,t.jsx)(n.h2,{id:"parameterized-functions",children:"Parameterized Functions"}),"\n",(0,t.jsxs)(n.p,{children:["Earlier we defined ",(0,t.jsx)(n.code,{children:"Mux2"})," on ",(0,t.jsx)(n.code,{children:"Bool"}),", but now we show how we can define a generic multiplexer function.\nWe define this function as taking a boolean condition and con and alt arguments (corresponding to then and else expressions) of type ",(0,t.jsx)(n.code,{children:"T"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"def Mux[T <: Bits](c: Bool, con: T, alt: T): T = { ... }\n"})}),"\n",(0,t.jsxs)(n.p,{children:["where ",(0,t.jsx)(n.code,{children:"T"})," is required to be a subclass of ",(0,t.jsx)(n.code,{children:"Bits"}),".\nScala ensures that in each usage of ",(0,t.jsx)(n.code,{children:"Mux"}),", it can find a common superclass of the actual con and alt argument types,\notherwise it causes a Scala compilation type error.\nFor example,"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"Mux(c, UInt(10), UInt(11))\n"})}),"\n",(0,t.jsxs)(n.p,{children:["yields a ",(0,t.jsx)(n.code,{children:"UInt"})," wire because the ",(0,t.jsx)(n.code,{children:"con"})," and ",(0,t.jsx)(n.code,{children:"alt"})," arguments are each of type ",(0,t.jsx)(n.code,{children:"UInt"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"parameterized-classes",children:"Parameterized Classes"}),"\n",(0,t.jsxs)(n.p,{children:["Like parameterized functions, we can also parameterize classes to make them more reusable.\nFor instance, we can generalize the Filter class to use any kind of link.\nWe do so by parameterizing the ",(0,t.jsx)(n.code,{children:"FilterIO"})," class and defining the constructor to take a single argument ",(0,t.jsx)(n.code,{children:"gen"})," of type ",(0,t.jsx)(n.code,{children:"T"})," as below."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"class FilterIO[T <: Data](gen: T) extends Bundle {\n  val x = Input(gen)\n  val y = Output(gen)\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["We can now define ",(0,t.jsx)(n.code,{children:"Filter"})," by defining a module class that also takes a link type constructor argument and passes it through to the ",(0,t.jsx)(n.code,{children:"FilterIO"})," interface constructor:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"class Filter[T <: Data](gen: T) extends Module {\n  val io = IO(new FilterIO(gen))\n  // ...\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["We can now define a ",(0,t.jsx)(n.code,{children:"PLink"}),"-based ",(0,t.jsx)(n.code,{children:"Filter"})," as follows:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"val f = Module(new Filter(new PLink))\n"})}),"\n",(0,t.jsx)(n.p,{children:"A generic FIFO could be defined as follows:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"import chisel3.util.log2Up\n\nclass DataBundle extends Bundle {\n  val a = UInt(32.W)\n  val b = UInt(32.W)\n}\n\nclass Fifo[T <: Data](gen: T, n: Int) extends Module {\n  val io = IO(new Bundle {\n    val enqVal = Input(Bool())\n    val enqRdy = Output(Bool())\n    val deqVal = Output(Bool())\n    val deqRdy = Input(Bool())\n    val enqDat = Input(gen)\n    val deqDat = Output(gen)\n  })\n  val enqPtr     = RegInit(0.U((log2Up(n)).W))\n  val deqPtr     = RegInit(0.U((log2Up(n)).W))\n  val isFull     = RegInit(false.B)\n  val doEnq      = io.enqRdy && io.enqVal\n  val doDeq      = io.deqRdy && io.deqVal\n  val isEmpty    = !isFull && (enqPtr === deqPtr)\n  val deqPtrInc  = deqPtr + 1.U\n  val enqPtrInc  = enqPtr + 1.U\n  val isFullNext = Mux(doEnq && ~doDeq && (enqPtrInc === deqPtr),\n                         true.B, Mux(doDeq && isFull, false.B,\n                         isFull))\n  enqPtr := Mux(doEnq, enqPtrInc, enqPtr)\n  deqPtr := Mux(doDeq, deqPtrInc, deqPtr)\n  isFull := isFullNext\n  val ram = Mem(n, gen)\n  when (doEnq) {\n    ram(enqPtr) := io.enqDat\n  }\n  io.enqRdy := !isFull\n  io.deqVal := !isEmpty\n  ram(deqPtr) <> io.deqDat\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:"An Fifo with 8 elements of type DataBundle could then be instantiated as:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"val fifo = Module(new Fifo(new DataBundle, 8))\n"})}),"\n",(0,t.jsx)(n.p,{children:"It is also possible to define a generic decoupled (ready/valid) interface:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"class DecoupledIO[T <: Data](data: T) extends Bundle {\n  val ready = Input(Bool())\n  val valid = Output(Bool())\n  val bits  = Output(data)\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:"This template can then be used to add a handshaking protocol to any\nset of signals:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"class DecoupledDemo extends DecoupledIO(new DataBundle)\n"})}),"\n",(0,t.jsx)(n.p,{children:"The FIFO interface can be now be simplified as follows:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"class Fifo[T <: Data](data: T, n: Int) extends Module {\n  val io = IO(new Bundle {\n    val enq = Flipped(new DecoupledIO(data))\n    val deq = new DecoupledIO(data)\n  })\n  // ...\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"parametrization-based-on-modules",children:"Parametrization based on Modules"}),"\n",(0,t.jsx)(n.p,{children:"You can also parametrize modules based on other modules rather than just types. The following is an example of a module parametrized by other modules as opposed to e.g. types."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"import chisel3.RawModule\nimport chisel3.experimental.BaseModule\nimport circt.stage.ChiselStage\n\n// Provides a more specific interface since generic Module\n// provides no compile-time information on generic module's IOs.\ntrait MyAdder {\n    def in1: UInt\n    def in2: UInt\n    def out: UInt\n}\n\nclass Mod1 extends RawModule with MyAdder {\n    val in1 = IO(Input(UInt(8.W)))\n    val in2 = IO(Input(UInt(8.W)))\n    val out = IO(Output(UInt(8.W)))\n    out := in1 + in2\n}\n\nclass Mod2 extends RawModule with MyAdder {\n    val in1 = IO(Input(UInt(8.W)))\n    val in2 = IO(Input(UInt(8.W)))\n    val out = IO(Output(UInt(8.W)))\n    out := in1 - in2\n}\n\nclass X[T <: BaseModule with MyAdder](genT: => T) extends Module {\n    val io = IO(new Bundle {\n        val in1 = Input(UInt(8.W))\n        val in2 = Input(UInt(8.W))\n        val out = Output(UInt(8.W))\n    })\n    val subMod = Module(genT)\n    io.out := subMod.out\n    subMod.in1 := io.in1\n    subMod.in2 := io.in2\n}\n\nprintln(ChiselStage.emitSystemVerilog(new X(new Mod1)))\nprintln(ChiselStage.emitSystemVerilog(new X(new Mod2)))\n"})}),"\n",(0,t.jsx)(n.p,{children:"Output:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.76.0\nmodule Mod1(\t// polymorphism-and-parameterization.md:170:7\n  input  [7:0] in1,\t// polymorphism-and-parameterization.md:171:17\n               in2,\t// polymorphism-and-parameterization.md:172:17\n  output [7:0] out\t// polymorphism-and-parameterization.md:173:17\n);\n\n  assign out = in1 + in2;\t// polymorphism-and-parameterization.md:170:7, :174:16\nendmodule\n\nmodule X(\t// polymorphism-and-parameterization.md:186:7\n  input        clock,\t// polymorphism-and-parameterization.md:186:7\n               reset,\t// polymorphism-and-parameterization.md:186:7\n  input  [7:0] io_in1,\t// polymorphism-and-parameterization.md:187:16\n               io_in2,\t// polymorphism-and-parameterization.md:187:16\n  output [7:0] io_out\t// polymorphism-and-parameterization.md:187:16\n);\n\n  Mod1 subMod (\t// polymorphism-and-parameterization.md:192:24\n    .in1 (io_in1),\n    .in2 (io_in2),\n    .out (io_out)\n  );\t// polymorphism-and-parameterization.md:192:24\nendmodule\n\n// Generated by CIRCT firtool-1.76.0\nmodule Mod2(\t// polymorphism-and-parameterization.md:178:7\n  input  [7:0] in1,\t// polymorphism-and-parameterization.md:179:17\n               in2,\t// polymorphism-and-parameterization.md:180:17\n  output [7:0] out\t// polymorphism-and-parameterization.md:181:17\n);\n\n  assign out = in1 - in2;\t// polymorphism-and-parameterization.md:178:7, :182:16\nendmodule\n\nmodule X(\t// polymorphism-and-parameterization.md:186:7\n  input        clock,\t// polymorphism-and-parameterization.md:186:7\n               reset,\t// polymorphism-and-parameterization.md:186:7\n  input  [7:0] io_in1,\t// polymorphism-and-parameterization.md:187:16\n               io_in2,\t// polymorphism-and-parameterization.md:187:16\n  output [7:0] io_out\t// polymorphism-and-parameterization.md:187:16\n);\n\n  Mod2 subMod (\t// polymorphism-and-parameterization.md:192:24\n    .in1 (io_in1),\n    .in2 (io_in2),\n    .out (io_out)\n  );\t// polymorphism-and-parameterization.md:192:24\nendmodule\n\n"})})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,n,a)=>{a.d(n,{R:()=>s,x:()=>l});var t=a(6540);const i={},o=t.createContext(i);function s(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);