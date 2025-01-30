"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[6474],{6458:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>t,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=i(4848),a=i(8453);const o={layout:"docs",title:"Layers",section:"chisel3"},l="Layers",s={id:"explanations/layers",title:"Layers",description:"Layers describe functionality of a Chisel generator that a user would like to",source:"@site/docs/explanations/layers.md",sourceDirName:"explanations",slug:"/explanations/layers",permalink:"/docs/explanations/layers",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/layers.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Layers",section:"chisel3"},sidebar:"chiselSidebar",previous:{title:"Intrinsics",permalink:"/docs/explanations/intrinsics"},next:{title:"Memories",permalink:"/docs/explanations/memories"}},t={},c=[{value:"Overview",id:"overview",level:2},{value:"Verilog ABI",id:"verilog-abi",level:2},{value:"Extract Layers",id:"extract-layers",level:3},{value:"Inline Layers",id:"inline-layers",level:3},{value:"User-defined Layers",id:"user-defined-layers",level:2},{value:"Built-in Layers",id:"built-in-layers",level:2},{value:"Layer-coloring",id:"layer-coloring",level:2},{value:"Layer-colored Probes and Wires",id:"layer-colored-probes-and-wires",level:3},{value:"Enabling Layers",id:"enabling-layers",level:3},{value:"Examples",id:"examples",level:2},{value:"Simple Extract Layer",id:"simple-extract-layer",level:3},{value:"Simple Inline Layer",id:"simple-inline-layer",level:3},{value:"Design Verification Example",id:"design-verification-example",level:3},{value:"Implementation Notes",id:"implementation-notes",level:4},{value:"Verilog Output",id:"verilog-output",level:4}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"layers",children:"Layers"})}),"\n",(0,r.jsxs)(n.p,{children:["Layers describe functionality of a Chisel generator that a user would like to\n",(0,r.jsx)(n.em,{children:"optionally"})," include at Verilog elaboration time.  Pragmatically, they are a\nfeature to access SystemVerilog's ",(0,r.jsx)(n.code,{children:"bind"})," construct and ",(0,r.jsx)(n.code,{children:"`ifdef"})," preprocessor\nmacros.  The optional functionality of layers, by construction, is not allowed\nto affect logic outside the layer."]}),"\n",(0,r.jsx)(n.p,{children:"Layers are typically used to describe design verification code or\ndebugging logic that a user would like to be able to later disable (for\nperformance, verbosity, or cleanliness reasons) or use internally, but exclude\nfrom delivery to a customer."}),"\n",(0,r.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,r.jsx)(n.p,{children:"A layer consists of two pieces:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["A layer ",(0,r.jsx)(n.em,{children:"declaration"}),", and"]}),"\n",(0,r.jsxs)(n.li,{children:["One or more ",(0,r.jsx)(n.em,{children:"layer blocks"})," inside Chisel modules."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"The declaration indicates that optional functionality can exist.  The layer\nblock contains the optional functionality."}),"\n",(0,r.jsxs)(n.p,{children:["There are two kinds of layers.  The layer kind determines the ",(0,r.jsx)(n.em,{children:"convention"}),",\ni.e., how the layer blocks of a layer are represented in Verilog and the\nmechanism to enable a layer.  Available layer kinds are:"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:['"Extract" Layers: layers whose blocks are lowered to modules that are\ninstantiated using ',(0,r.jsx)(n.code,{children:"bind"})," and can be enabled by including a file during\nVerilog elaboration, and"]}),"\n",(0,r.jsxs)(n.li,{children:['"Inline" Layers: layers whose blocks will be guarded with ',(0,r.jsx)(n.code,{children:"`ifdef"})," macros\nand can be enabled by setting a Verilog preprocessor define."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Extract layers may also specify a directory into which their collateral are\nwritten."}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["For more information about these SystemVerilog concepts, the IEEE 1800-2023\nstandard discusses ",(0,r.jsx)(n.code,{children:"bind"})," in Section 23.11 and ",(0,r.jsx)(n.code,{children:"`ifdef"})," in Section 23.6."]})}),"\n",(0,r.jsxs)(n.p,{children:["To declare a layer, create a singleton ",(0,r.jsx)(n.code,{children:"object"})," in scala that extends the\nabstract class ",(0,r.jsx)(n.code,{children:"chisel3.layer.Layer"}),", passing into the layer constructor either\nan object of class ",(0,r.jsx)(n.code,{children:"chisel3.layer.LayerConfig.Extract"})," for an extract layer, or\nthe object ",(0,r.jsx)(n.code,{children:"chisel3.layer.LayerConfig.Inline"})," for an inline layer."]}),"\n",(0,r.jsx)(n.p,{children:"Below, an extract layer and an inline layer are declared:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scala",children:"import chisel3.layer.{Layer, LayerConfig}\n\nobject A extends Layer(LayerConfig.Extract())\n\nobject B extends Layer(LayerConfig.Inline)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Layers may be nested.  Nesting a child layer under a parent layer means that the\nchild layer may access constructs in the parent layer.  Put differently, the\nchild layer will only be enabled if the parent layer is already enabled.  To\ndeclare a nested layer, extend the ",(0,r.jsx)(n.code,{children:"chisel3.layer.Layer"})," abstract class inside\nanother declaration."]}),"\n",(0,r.jsx)(n.p,{children:"The following example defines an extract layer with two nested layers inside it:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scala",children:"object C extends Layer(LayerConfig.Extract()) {\n  object D extends Layer(LayerConfig.Extract())\n  object E extends Layer(LayerConfig.Inline) {\n    object F extends Layer(LayerConfig.Inline)\n  }\n}\n"})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["SystemVerilog prohibits a ",(0,r.jsx)(n.code,{children:"bind"})," instantiation under another ",(0,r.jsx)(n.code,{children:"bind"}),"\ninstantiation.  However, Chisel allows nesting of extract layers.  This is\nresolved by the FIRRTL compiler to restructure nested extract layers to be\nsibling modules that communicate via ports."]})}),"\n",(0,r.jsxs)(n.admonition,{type:"warning",children:[(0,r.jsx)(n.p,{children:"Extract layers may not be nested under inline layers.  However, inline layers\nmay be nested under extract layers."}),(0,r.jsx)(n.p,{children:"Any module which contains layer blocks or transitively contains layer blocks in\nits submodules may not be instantiated under a layer block."})]}),"\n",(0,r.jsxs)(n.p,{children:["A ",(0,r.jsx)(n.em,{children:"layer block"}),", associated with a layer, adds optional functionality to a\nmodule that is enabled if that layer is enabled.  To define a layer block, use\nthe ",(0,r.jsx)(n.code,{children:"chisel3.layer.block"})," inside a Chisel module and pass the layer that it\nshould be associated with."]}),"\n",(0,r.jsx)(n.p,{children:"Inside the layer block, any Chisel or Scala value visible in lexical scope may\nbe used.  Layer blocks may not return values.  Any values created inside a layer\nblock are not accessible outside the layer block, unless using layer-colored\nprobes."}),"\n",(0,r.jsxs)(n.p,{children:["The following example defines layer blocks inside module ",(0,r.jsx)(n.code,{children:"Foo"}),".  Each layer\nblock contains a wire that captures a value from its visible lexical scope.\n(For nested layer blocks, this scope includes their parent layer blocks.):"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.layer.block\n\nclass Foo extends RawModule {\n  val port = IO(Input(Bool()))\n\n  block(A) {\n    val a = WireInit(port)\n  }\n\n  block(B) {\n    val b = WireInit(port)\n  }\n\n  block(C) {\n    val c = WireInit(port)\n    block(C.D) {\n      val d = WireInit(port | c)\n    }\n    block(C.E) {\n      val e = WireInit(port ^ c)\n      block (C.E.F) {\n        val f = WireInit(port & e)\n      }\n    }\n  }\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The layer block API will automatically create parent layer blocks for you if\npossible.  In the following example, it is legal to directly create a layer\nblock of ",(0,r.jsx)(n.code,{children:"C.D"})," directly in a module:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scala",children:"class Bar extends RawModule {\n  block (C.D) {}\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Formally, it is legal to create a layer block associated with a layer as long as\nthe current scope is an ",(0,r.jsx)(n.em,{children:"ancestor"})," of the request layer."]}),"\n",(0,r.jsxs)(n.admonition,{type:"info",children:[(0,r.jsxs)(n.p,{children:["The requirement is an ",(0,r.jsx)(n.em,{children:"ancestor"})," relationship, not a ",(0,r.jsx)(n.em,{children:"proper ancestor"}),"\nrelationship.  This means that it is legal to nest a layer block under a layer\nblock of the same layer like:"]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scala",children:"class Baz extends RawModule {\n  block(A) {\n    block(A) {}\n  }\n}\n"})})]}),"\n",(0,r.jsx)(n.h2,{id:"verilog-abi",children:"Verilog ABI"}),"\n",(0,r.jsx)(n.p,{children:"Layers are compiled to SystemVerilog using the FIRRTL ABI.  This ABI defines\nwhat happens to layer blocks in a Chisel design and how a layer can be enabled\nafter a design is compiled to SystemVerilog."}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["For the exact definition of the FIRRTL ABI for layers, see the ",(0,r.jsx)(n.a,{href:"https://github.com/chipsalliance/firrtl-spec/releases/latest/download/abi.pdf",children:"FIRRTL ABI\nSpecification"}),"."]})}),"\n",(0,r.jsx)(n.h3,{id:"extract-layers",children:"Extract Layers"}),"\n",(0,r.jsxs)(n.p,{children:["Extract layers have their layer blocks removed from the design.  To enable a\nlayer, a file with a specific name should be included in the design.  This file\nbegins with ",(0,r.jsx)(n.code,{children:"layers-"})," and then includes the circuit name and all layer names\ndelimited with dashes (",(0,r.jsx)(n.code,{children:"-"}),")."]}),"\n",(0,r.jsxs)(n.p,{children:["For example, for module ",(0,r.jsx)(n.code,{children:"Foo"})," declared above, this will produce three files, one\nfor each extract layer:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"layers-Foo-A.sv\nlayers-Foo-C.sv\nlayers-Foo-C-D.sv\n"})}),"\n",(0,r.jsx)(n.p,{children:"To enable any of these layers at compilation time, the appropriate file should\nbe included in the build.  Any combination of files may be included.  Including\nonly a child layer's file will automatically include its parent layer's file."}),"\n",(0,r.jsx)(n.h3,{id:"inline-layers",children:"Inline Layers"}),"\n",(0,r.jsxs)(n.p,{children:["Inline layers have their layer blocks guarded with conditional compilation\ndirectives.  To enable an inline layer, set a preprocessor define when compiling\nyour design.  The preprocessor define begins with ",(0,r.jsx)(n.code,{children:"layer_"})," and then includes the\ncircuit name and all layer names delimited with dollar signs (",(0,r.jsx)(n.code,{children:"$"}),").  Parent\nextract layer names appear in the macro."]}),"\n",(0,r.jsxs)(n.p,{children:["For example, for module ",(0,r.jsx)(n.code,{children:"Foo"})," declared above, this will be sensitive to three\nmacros, one for each inline layer:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"layer_Foo$B\nlayer_Foo$C$E\nlayer_Foo$C$E$F\n"})}),"\n",(0,r.jsx)(n.h2,{id:"user-defined-layers",children:"User-defined Layers"}),"\n",(0,r.jsxs)(n.p,{children:["A user is free to define as many layers as they want.  All layers shown\npreviously are user-defined, e.g., ",(0,r.jsx)(n.code,{children:"A"})," and ",(0,r.jsx)(n.code,{children:"C.E"})," are user-defined layers.\nUser-defined layers are only emitted into FIRRTL if they have layer block users.\nTo change this behavior and unconditionally emit a user-defined layer, use the\n",(0,r.jsx)(n.code,{children:"chisel3.layer.addLayer"})," API."]}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsx)(n.p,{children:"Before creating new user-defined layers, consider using the built-in layers\ndefined below.  Additionally, if working in a larger project, the project may\nhave it's own user-defined layers that you are expected to use.  This is because\nthe ABIs affect the build system.  Please consult with a technical lead of the\nproject to see if this is the case."})}),"\n",(0,r.jsx)(n.h2,{id:"built-in-layers",children:"Built-in Layers"}),"\n",(0,r.jsx)(n.p,{children:"Chisel provides several built-in layers.  These are shown below with their full\nScala paths.  All built-in layers are extract layers:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"chisel3.layers.Verification\n\u251c\u2500\u2500 chisel3.layers.Verification.Assert\n\u251c\u2500\u2500 chisel3.layers.Verification.Assume\n\u2514\u2500\u2500 chisel3.layers.Verification.Cover\n"})}),"\n",(0,r.jsxs)(n.p,{children:["These built-in layers are dual purpose.  First, these layers match the common\nuse case of sequestering verification code.  The ",(0,r.jsx)(n.code,{children:"Verification"})," layer is for\ncommon verification collateral.  The ",(0,r.jsx)(n.code,{children:"Assert"}),", ",(0,r.jsx)(n.code,{children:"Assume"}),", and ",(0,r.jsx)(n.code,{children:"Cover"})," layers are\nfor, respectively, assertions, assumptions, and cover statements.  Second, the\nChisel standard library uses them for a number of its APIs.  ",(0,r.jsx)(n.em,{children:"Unless otherwise\nwrapped in a different layer block, the following operations are automatically\nplaced in layers"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Prints are placed in the ",(0,r.jsx)(n.code,{children:"Verification"})," layer"]}),"\n",(0,r.jsxs)(n.li,{children:["Assertions are placed in the ",(0,r.jsx)(n.code,{children:"Verification.Assert"})," layer"]}),"\n",(0,r.jsxs)(n.li,{children:["Assumptions are placed in the ",(0,r.jsx)(n.code,{children:"Verification.Assume"})," layer"]}),"\n",(0,r.jsxs)(n.li,{children:["Covers are placed in the ",(0,r.jsx)(n.code,{children:"Verification.Cover"})," layer"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["For predictability of output, these layers will always be show up in the FIRRTL\nthat Chisel emits.  To change this behavior, use ",(0,r.jsx)(n.code,{children:"firtool"})," command line options\nto ",(0,r.jsx)(n.em,{children:"specialize"})," these layers (remove their optionality by making them always\nenabled or disabled).  Use ",(0,r.jsx)(n.code,{children:"-enable-layers"})," to enable a layer, ",(0,r.jsx)(n.code,{children:"-disable-layers"}),"\nto disable a layer, or ",(0,r.jsx)(n.code,{children:"-default-layer-specialization"})," to set a default\nspecialization."]}),"\n",(0,r.jsxs)(n.admonition,{type:"tip",children:[(0,r.jsx)(n.p,{children:"Users may extend built-in layers with user-defined layers using an advanced API.\nTo do this, the layer parent must be specified as an implicit value."}),(0,r.jsxs)(n.p,{children:["The following example nests the layer ",(0,r.jsx)(n.code,{children:"Debug"})," to the ",(0,r.jsx)(n.code,{children:"Verification"})," layer:"]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scala",children:"object UserDefined {\n  // Define an implicit val `root` of type `Layer` to cause layers which can see\n  // this to use `root` as their parent layer.  This allows us to nest the\n  // user-defined `Debug` layer under the built-in `Verification` layer.\n  implicit val root: Layer = chisel3.layers.Verification\n  object Debug extends Layer(LayerConfig.Inline)\n}\n"})})]}),"\n",(0,r.jsx)(n.h2,{id:"layer-coloring",children:"Layer-coloring"}),"\n",(0,r.jsxs)(n.p,{children:["While layers are not allowed to influence the design or their parent layers, it\nis often useful and necessary to allow layer blocks to send information out of\ntheir containing modules to be read by layer blocks of the same layer or\nchildren layers. Hardware which has this optional property is said to be\n",(0,r.jsx)(n.em,{children:"layer-colored"}),".  Both probes and wires can be layer-colored."]}),"\n",(0,r.jsx)(n.h3,{id:"layer-colored-probes-and-wires",children:"Layer-colored Probes and Wires"}),"\n",(0,r.jsx)(n.p,{children:"A layer-colored probe is a probe that exists if a user enables its corresponding\nlayer during Verilog elaboration.  Layer-colored probes are used to describe\noptional verification, debugging, or logging interfaces."}),"\n",(0,r.jsx)(n.p,{children:"Layer-colored wires are used as temporary storage of defined probe values.  They\nare used for communication between layer blocks of the same layer in the same\nmodule or as temporary storage when forwarding a probe to a port."}),"\n",(0,r.jsxs)(n.p,{children:["A layer-colored probe or wire may be the target of a ",(0,r.jsx)(n.code,{children:"define"})," if the ",(0,r.jsx)(n.code,{children:"define"})," is\nenabled when the color of the probe or wire is enabled.  A layer-colored probe\nor wire may be ",(0,r.jsx)(n.code,{children:"read"})," from if the color of the probe or wire is enabled when the\n",(0,r.jsx)(n.code,{children:"read"})," is enabled.  Put differently, you may write to your layer or a child\nlayer and you may read from your layer or a parent layer."]}),"\n",(0,r.jsx)(n.p,{children:"The example below shows two layer-colored probe ports and one layer-colored\nprobe wire driven in legal ways:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.layer.{Layer, LayerConfig}\nimport chisel3.probe.{Probe, ProbeValue, define}\n\nobject A extends Layer(LayerConfig.Extract())\nobject B extends Layer(LayerConfig.Extract())\n\nclass Foo extends RawModule {\n  val a = IO(Output(Probe(Bool(), A)))\n  val b = IO(Output(Probe(Bool(), B)))\n\n  layer.block(A) {\n    val a_wire = WireInit(false.B)\n    define(a, ProbeValue(a_wire))\n  }\n\n  val b_wire_probe = Wire(Probe(Bool(), B))\n  define(b, b_wire_probe)\n\n  layer.block(B) {\n    val b_wire = WireInit(false.B)\n    define(b_wire_probe, ProbeValue(b_wire))\n  }\n\n}\n"})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["For more information, see the layer coloring section of the ",(0,r.jsx)(n.a,{href:"https://github.com/chipsalliance/firrtl-spec/releases/latest/download/spec.pdf",children:"FIRRTL\nSpecification"}),"."]})}),"\n",(0,r.jsx)(n.h3,{id:"enabling-layers",children:"Enabling Layers"}),"\n",(0,r.jsxs)(n.p,{children:["When working with layer-colored probes, it is often convenient to grant access\nto probes of one or more colors.  E.g., testbenches often want to ",(0,r.jsx)(n.em,{children:"enable"})," all\nlayers in a design-under-test so that they gain access to layer-colored probe\nports necessary for advanced design verification.  Without an additional\nfeature, this use case is poorly supported with just layer coloring.  First, it\nis tedious to enclose all code inside a testbench in a layer block.  Second, a\ntestbench may need to read probes with colors that do not have a parent--child\nrelationship.  No layer block is capable of both legally reading from different\nprobes and combining the results."]}),"\n",(0,r.jsxs)(n.p,{children:["To support this use case, Chisel provides the ",(0,r.jsx)(n.code,{children:"layer.enable"})," API.  This API\ngrants access to any layer-colored probes of instantiated modules for the\nenabled layer.  The API may be used more than once to enable more than one\nlayer."]}),"\n",(0,r.jsxs)(n.p,{children:["The example below instantiates module ",(0,r.jsx)(n.code,{children:"Foo"})," from the previous section.  After\nenabling layers ",(0,r.jsx)(n.code,{children:"A"})," and ",(0,r.jsx)(n.code,{children:"B"}),", the module can read from probes with colors ",(0,r.jsx)(n.code,{children:"A"})," and\n",(0,r.jsx)(n.code,{children:"B"})," and use their results in a single operation:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scala",children:"import chisel3.layer.enable\nimport chisel3.probe.read\n\nclass Bar extends RawModule {\n\n  enable(A)\n  enable(B)\n\n  val foo = Module(new Foo)\n\n  val c = read(foo.a) ^ read(foo.b)\n\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,r.jsx)(n.h3,{id:"simple-extract-layer",children:"Simple Extract Layer"}),"\n",(0,r.jsxs)(n.p,{children:["The design below has a single extract layer that, when enabled, will add an\nassert that checks for overflow.  Based on the FIRRTL ABI, we can expect that a\nfile called ",(0,r.jsx)(n.code,{children:"layers-Foo-A.sv"})," will be produced when we compile it."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scala",children:'import chisel3._\nimport chisel3.layer.{Layer, LayerConfig, block}\nimport chisel3.ltl.AssertProperty\n\nobject A extends Layer(LayerConfig.Extract())\n\nclass Foo extends Module {\n  val a, b = IO(Input(UInt(4.W)))\n  val sum = IO(Output(UInt(4.W)))\n\n  sum :<= a +% b\n\n  block(A) {\n    withDisable(Disable.Never) {\n      AssertProperty(!(a +& b)(4), "overflow occurred")\n    }\n  }\n\n}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["After compilation, we get the following SystemVerilog.  Comments that include\n",(0,r.jsx)(n.code,{children:"FILE"})," indicate the beginning of a new file:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-verilog",children:'// Generated by CIRCT firtool-1.103.0\nmodule Foo(\n  input        clock,\n               reset,\n  input  [3:0] a,\n               b,\n  output [3:0] sum\n);\n\n  wire [4:0] _sum_T = {1\'h0, a} + {1\'h0, b};\n  assign sum = _sum_T[3:0];\nendmodule\n\n\n// ----- 8< ----- FILE "A/layers-Foo-A.sv" ----- 8< -----\n\n// Generated by CIRCT firtool-1.103.0\n`ifndef layers_Foo_A\n`define layers_Foo_A\nbind Foo Foo_A a_0 (\n  ._GEN  (_sum_T),\n  .clock (clock)\n);\n`endif // layers_Foo_A\n\n// ----- 8< ----- FILE "A/Foo_A.sv" ----- 8< -----\n\n// Generated by CIRCT firtool-1.103.0\nmodule Foo_A(\n  input [4:0] _GEN,\n  input       clock\n);\n\n  overflow_occurred: assert property (@(posedge clock) ~(_GEN[4]));\nendmodule\n\n'})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["The above example was compiled with the firtool options\n",(0,r.jsx)(n.code,{children:"-enable-layers=Verification"}),", ",(0,r.jsx)(n.code,{children:"-enable-layers=Verification.Assert"}),",\n",(0,r.jsx)(n.code,{children:"-enable-layers=Verification.Assume"}),", and ",(0,r.jsx)(n.code,{children:"-enable-layers=Verification.Cover"})," to\nmake the output terser.  Normally, bind files would show up for these built-in\nlayers."]})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["Note: the generated module, ",(0,r.jsx)(n.code,{children:"Foo_A"}),", and its file, ",(0,r.jsx)(n.code,{children:"Foo_A.sv"}),", are ",(0,r.jsx)(n.em,{children:"not part of\nthe ABI"}),".  You should not rely on any generated module names or files other than\nthe bind file, ",(0,r.jsx)(n.code,{children:"layers-Foo-A.sv"}),"."]})}),"\n",(0,r.jsx)(n.h3,{id:"simple-inline-layer",children:"Simple Inline Layer"}),"\n",(0,r.jsxs)(n.p,{children:["The design below is the same as the previous example, but uses an inline layer.\nBased on the FIRRTL ABI, we can expect that the body of the layer block will be\nguarded by an ",(0,r.jsx)(n.code,{children:"`ifdef"})," sensitive to the preprocessor macro ",(0,r.jsx)(n.code,{children:"layer_Foo$A"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scala",children:'import chisel3._\nimport chisel3.layer.{Layer, LayerConfig, block}\nimport chisel3.ltl.AssertProperty\n\nobject A extends Layer(LayerConfig.Inline)\n\nclass Foo extends Module {\n  val a, b = IO(Input(UInt(4.W)))\n  val sum = IO(Output(UInt(4.W)))\n\n  sum :<= a +% b\n\n  block(A) {\n    withDisable(Disable.Never) {\n      AssertProperty(!(a +& b)(4), "overflow occurred")\n    }\n  }\n\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"After compilation, we get the following SystemVerilog."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.103.0\nmodule Foo(\n  input        clock,\n               reset,\n  input  [3:0] a,\n               b,\n  output [3:0] sum\n);\n\n  wire [4:0] _sum_T = {1'h0, a} + {1'h0, b};\n  `ifdef layer_Foo$A\n    overflow_occurred: assert property (@(posedge clock) ~(_sum_T[4]));\n  `endif // layer_Foo$A\n  assign sum = _sum_T[3:0];\nendmodule\n\n"})}),"\n",(0,r.jsx)(n.h3,{id:"design-verification-example",children:"Design Verification Example"}),"\n",(0,r.jsx)(n.p,{children:"Consider a use case where a design or design verification engineer would like to\nadd some asserts and debug prints to a module.  The logic necessary for the\nasserts and debug prints requires additional computation.  All of this code\nshould selectively included at Verilog elaboration time (not at Chisel\nelaboration time).  The engineer can use three layers to do this."}),"\n",(0,r.jsx)(n.p,{children:"There are three layers used in this example:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["The built-in ",(0,r.jsx)(n.code,{children:"Verification"})," layer"]}),"\n",(0,r.jsxs)(n.li,{children:["The built-in ",(0,r.jsx)(n.code,{children:"Assert"})," layer which is nested under the built-in ",(0,r.jsx)(n.code,{children:"Verification"}),"\nlayer"]}),"\n",(0,r.jsxs)(n.li,{children:["A user-defined ",(0,r.jsx)(n.code,{children:"Debug"})," layer which is also nested under the built-in\n",(0,r.jsx)(n.code,{children:"Verification"})," layer"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"Verification"})," layer can be used to store common logic used by both the\n",(0,r.jsx)(n.code,{children:"Assert"})," and ",(0,r.jsx)(n.code,{children:"Debug"})," layers.  The latter two layers allow for separation of,\nrespectively, assertions from prints."]}),"\n",(0,r.jsx)(n.p,{children:"One way to write this in Scala is the following:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-scala",children:'import chisel3._\nimport chisel3.layer.{Layer, LayerConfig, block}\nimport chisel3.layers.Verification\n\n// User-defined layers are declared here.  Built-in layers do not need to be declared.\nobject UserDefined {\n  implicit val root: Layer = Verification\n  object Debug extends Layer(LayerConfig.Inline)\n}\n\nclass Foo extends Module {\n  val a = IO(Input(UInt(32.W)))\n  val b = IO(Output(UInt(32.W)))\n\n  b := a +% 1.U\n\n  // This adds a `Verification` layer block inside Foo.\n  block(Verification) {\n\n    // Some common logic added here.  The input port `a` is "captured" and\n    // used here.\n    val a_d0 = RegNext(a)\n\n    // This adds an `Assert` layer block.\n    block(Verification.Assert) {\n      chisel3.assert(a >= a_d0, "a must always increment")\n    }\n\n    // This adds a `Debug` layer block.\n    block(UserDefined.Debug) {\n      printf("a: %x, a_d0: %x", a, a_d0)\n    }\n\n  }\n\n}\n\n'})}),"\n",(0,r.jsx)(n.p,{children:"After compilation, this will produce two layer include files with the\nfollowing filenames.  One file is created for each extract layer:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"layers_Foo_Verification.sv"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"layers_Foo_Verification_Assert.sv"})}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Additionally, the resulting SystemVerilog will be sensitive to the preprocessor\ndefine ",(0,r.jsx)(n.code,{children:"layer_Foo$Verification$Debug"})," due to the one inline layer we added."]}),"\n",(0,r.jsxs)(n.p,{children:["A user can then include any combination of these files in their design to\ninclude the optional functionality described by the ",(0,r.jsx)(n.code,{children:"Verification"})," or\n",(0,r.jsx)(n.code,{children:"Verification.Assert"})," layers and enable debugging by setting the preprocessor\nmacro.  The ",(0,r.jsx)(n.code,{children:"Verification.Assert"})," bind file automatically includes the\n",(0,r.jsx)(n.code,{children:"Verification"})," bind file for the user."]}),"\n",(0,r.jsx)(n.h4,{id:"implementation-notes",children:"Implementation Notes"}),"\n",(0,r.jsxs)(n.admonition,{type:"warning",children:[(0,r.jsxs)(n.p,{children:["This section describes the implementation of how layers are compiled.  Anything\nthat is ",(0,r.jsx)(n.em,{children:"not"})," a bind file name or a preprocessor macro should not be relied\nupon!  A FIRRTL compiler may implement this differently or may optimize layer\nblocks in any legal way it chooses.  E.g., layer blocks associated with the same\nlayer may be merged, layer blocks may be moved up or down the hierarchy, code\nthat only fans out to a layer block may be sunk into it, and unused layer blocks\nmay be deleted."]}),(0,r.jsx)(n.p,{children:"The information below is for user understanding and interest only."})]}),"\n",(0,r.jsxs)(n.p,{children:["In implementation, a FIRRTL compiler creates three Verilog modules for the\ncircuit above (one for ",(0,r.jsx)(n.code,{children:"Foo"})," and one for each layer block associated with an\nextract layer in module ",(0,r.jsx)(n.code,{children:"Foo"}),"):"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"Foo"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"Foo_Verification"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"Foo_Verification_Assert"})}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["These will typically be created in separate files with names that match the\nmodules, i.e., ",(0,r.jsx)(n.code,{children:"Foo.sv"}),", ",(0,r.jsx)(n.code,{children:"Foo_Verification.sv"}),", and\n",(0,r.jsx)(n.code,{children:"Foo_Verification_Assert.sv"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["The ports of each module created from a layer block will be automatically\ndetermined based on what that layer block captured from outside the layer block.\nIn the example above, the ",(0,r.jsx)(n.code,{children:"Verification"})," layer block captured port ",(0,r.jsx)(n.code,{children:"a"}),".  The\n",(0,r.jsx)(n.code,{children:"Assert"})," layer block captured captured ",(0,r.jsx)(n.code,{children:"a"})," and ",(0,r.jsx)(n.code,{children:"a_d0"}),"."]}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["Even though there are no layer blocks that use the ",(0,r.jsx)(n.code,{children:"Verification.Assume"})," or\n",(0,r.jsx)(n.code,{children:"Verification.Cover"})," layers, bind files which have no effect are produced in the\noutput.  This is due to the ABI which requires that layers that are defined in\nFIRRTL must produce these files."]})}),"\n",(0,r.jsx)(n.h4,{id:"verilog-output",children:"Verilog Output"}),"\n",(0,r.jsx)(n.p,{children:"The complete Verilog output for this example is reproduced below:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-verilog",children:'// Generated by CIRCT firtool-1.103.0\nmodule Foo(\n  input         clock,\n                reset,\n  input  [31:0] a,\n  output [31:0] b\n);\n\n  assign b = a + 32\'h1;\nendmodule\n\n\n// ----- 8< ----- FILE "verification/cover/layers-Foo-Verification-Cover.sv" ----- 8< -----\n\n// Generated by CIRCT firtool-1.103.0\n`include "verification/layers-Foo-Verification.sv"\n`ifndef layers_Foo_Verification_Cover\n`define layers_Foo_Verification_Cover\n`endif // layers_Foo_Verification_Cover\n\n// ----- 8< ----- FILE "verification/assume/layers-Foo-Verification-Assume.sv" ----- 8< -----\n\n// Generated by CIRCT firtool-1.103.0\n`include "verification/layers-Foo-Verification.sv"\n`ifndef layers_Foo_Verification_Assume\n`define layers_Foo_Verification_Assume\n`endif // layers_Foo_Verification_Assume\n\n// ----- 8< ----- FILE "verification/assert/layers-Foo-Verification-Assert.sv" ----- 8< -----\n\n// Generated by CIRCT firtool-1.103.0\n`include "verification/layers-Foo-Verification.sv"\n`ifndef layers_Foo_Verification_Assert\n`define layers_Foo_Verification_Assert\nbind Foo Foo_Verification_Assert verification_assert (\n  .a     (Foo.verification.a_probe),\n  .a_d0  (Foo.verification.a_d0_probe),\n  .reset (reset),\n  .clock (Foo.verification.clock_probe)\n);\n`endif // layers_Foo_Verification_Assert\n\n// ----- 8< ----- FILE "verification/layers-Foo-Verification.sv" ----- 8< -----\n\n// Generated by CIRCT firtool-1.103.0\n`ifndef layers_Foo_Verification\n`define layers_Foo_Verification\nbind Foo Foo_Verification verification (\n  .clock (clock),\n  .a     (a),\n  .reset (reset)\n);\n`endif // layers_Foo_Verification\n\n// ----- 8< ----- FILE "verification/assert/Foo_Verification_Assert.sv" ----- 8< -----\n\n// Generated by CIRCT firtool-1.103.0\n\n// Users can define \'STOP_COND\' to add an extra gate to stop conditions.\n`ifndef STOP_COND_\n  `ifdef STOP_COND\n    `define STOP_COND_ (`STOP_COND)\n  `else  // STOP_COND\n    `define STOP_COND_ 1\n  `endif // STOP_COND\n`endif // not def STOP_COND_\n\n// Users can define \'ASSERT_VERBOSE_COND\' to add an extra gate to assert error printing.\n`ifndef ASSERT_VERBOSE_COND_\n  `ifdef ASSERT_VERBOSE_COND\n    `define ASSERT_VERBOSE_COND_ (`ASSERT_VERBOSE_COND)\n  `else  // ASSERT_VERBOSE_COND\n    `define ASSERT_VERBOSE_COND_ 1\n  `endif // ASSERT_VERBOSE_COND\n`endif // not def ASSERT_VERBOSE_COND_\nmodule Foo_Verification_Assert(\n  input [31:0] a,\n               a_d0,\n  input        reset,\n               clock\n);\n\n  `ifndef SYNTHESIS\n    always @(posedge clock) begin\n      if (~reset & a < a_d0) begin\n        if (`ASSERT_VERBOSE_COND_)\n          $error("Assertion failed: a must always increment\\n");\n        if (`STOP_COND_)\n          $fatal;\n      end\n    end // always @(posedge)\n  `endif // not def SYNTHESIS\nendmodule\n\n\n// ----- 8< ----- FILE "verification/Foo_Verification.sv" ----- 8< -----\n\n// Generated by CIRCT firtool-1.103.0\n\n// Users can define \'PRINTF_FD\' to add a specified fd to prints.\n`ifndef PRINTF_FD_\n  `ifdef PRINTF_FD\n    `define PRINTF_FD_ (`PRINTF_FD)\n  `else  // PRINTF_FD\n    `define PRINTF_FD_ 32\'h80000002\n  `endif // PRINTF_FD\n`endif // not def PRINTF_FD_\n\n// Users can define \'PRINTF_COND\' to add an extra gate to prints.\n`ifndef PRINTF_COND_\n  `ifdef PRINTF_COND\n    `define PRINTF_COND_ (`PRINTF_COND)\n  `else  // PRINTF_COND\n    `define PRINTF_COND_ 1\n  `endif // PRINTF_COND\n`endif // not def PRINTF_COND_\nmodule Foo_Verification(\n  input        clock,\n  input [31:0] a,\n  input        reset\n);\n\n  wire        clock_probe = clock;\n  wire [31:0] a_probe = a;\n  reg  [31:0] a_d0;\n  wire [31:0] a_d0_probe = a_d0;\n  `ifdef layer_Foo$Verification$Debug\n    `ifndef SYNTHESIS\n      always @(posedge clock) begin\n        if ((`PRINTF_COND_) & ~reset)\n          $fwrite(`PRINTF_FD_, "a: %x, a_d0: %x", a, a_d0);\n      end // always @(posedge)\n    `endif // not def SYNTHESIS\n  `endif // layer_Foo$Verification$Debug\n  always @(posedge clock)\n    a_d0 <= a;\nendmodule\n\n'})})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>s});var r=i(6540);const a={},o=r.createContext(a);function l(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);