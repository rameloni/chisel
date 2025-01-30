"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[2289],{2358:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>r,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>d,toc:()=>c});var i=a(4848),s=a(8453),t=a(1871);const l={sidebar_position:1},o="Naming Cookbook",d={id:"cookbooks/naming",title:"Naming Cookbook",description:"I still have _T signals, can this be fixed?",source:"@site/docs/cookbooks/naming.md",sourceDirName:"cookbooks",slug:"/cookbooks/naming",permalink:"/docs/cookbooks/naming",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/cookbooks/naming.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"chiselSidebar",previous:{title:"General Cookbook",permalink:"/docs/cookbooks/cookbook"},next:{title:"Hierarchy Cookbook",permalink:"/docs/cookbooks/hierarchy"}},r={},c=[{value:"I still have _T signals, can this be fixed?",id:"i-still-have-_t-signals-can-this-be-fixed",level:3},{value:"I have so many wires with the same name, like <code>x</code>, <code>x_1</code> and <code>x_2</code>. How can I make them easier to understand?",id:"i-have-so-many-wires-with-the-same-name-like-x-x_1-and-x_2-how-can-i-make-them-easier-to-understand",level:3},{value:"How can I get better names for code generated by <code>when</code> clauses?",id:"how-can-i-get-better-names-for-code-generated-by-when-clauses",level:3},{value:"I still see _GEN signals, can this be fixed?",id:"i-still-see-_gen-signals-can-this-be-fixed",level:3},{value:"How do I make my modules have more stable names instead of &#39;Module_1&#39; and &#39;Module_42&#39;?",id:"how-do-i-make-my-modules-have-more-stable-names-instead-of-module_1-and-module_42",level:3},{value:"How would I write my own <code>typeName</code> for my data types?",id:"how-would-i-write-my-own-typename-for-my-data-types",level:3},{value:"I don&#39;t want to override <code>typeName</code> over and over! Is there any easy way to generate a <code>typeName</code>?",id:"i-dont-want-to-override-typename-over-and-over-is-there-any-easy-way-to-generate-a-typename",level:3},{value:"Can I name my bundles in FIRRTL, so I don&#39;t generate extremely long bundle types?",id:"can-i-name-my-bundles-in-firrtl-so-i-dont-generate-extremely-long-bundle-types",level:3},{value:"Why do I keep seeing _stripped suffixing everywhere in my FIRRTL? I didn&#39;t specify that in my <code>aliasName</code>.",id:"why-do-i-keep-seeing-_stripped-suffixing-everywhere-in-my-firrtl-i-didnt-specify-that-in-my-aliasname",level:3},{value:"I want to add some hardware or assertions, but each time I do all the signal names get bumped!",id:"i-want-to-add-some-hardware-or-assertions-but-each-time-i-do-all-the-signal-names-get-bumped",level:3},{value:"I want to force a signal (or instance) name to something, how do I do that?",id:"i-want-to-force-a-signal-or-instance-name-to-something-how-do-i-do-that",level:3},{value:"How can I omit the prefix in certain parts of the code?",id:"how-can-i-omit-the-prefix-in-certain-parts-of-the-code",level:3},{value:"I am still not getting the name I want. For example, inlining an instance changes my name!",id:"i-am-still-not-getting-the-name-i-want-for-example-inlining-an-instance-changes-my-name",level:3}];function u(e){const n={a:"a",code:"code",em:"em",h1:"h1",h3:"h3",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"naming-cookbook",children:"Naming Cookbook"})}),"\n","\n",(0,i.jsx)(t.A,{toc:c}),"\n",(0,i.jsx)(n.h3,{id:"i-still-have-_t-signals-can-this-be-fixed",children:"I still have _T signals, can this be fixed?"}),"\n",(0,i.jsx)(n.p,{children:"See the next answer!"}),"\n",(0,i.jsxs)(n.h3,{id:"i-have-so-many-wires-with-the-same-name-like-x-x_1-and-x_2-how-can-i-make-them-easier-to-understand",children:["I have so many wires with the same name, like ",(0,i.jsx)(n.code,{children:"x"}),", ",(0,i.jsx)(n.code,{children:"x_1"})," and ",(0,i.jsx)(n.code,{children:"x_2"}),". How can I make them easier to understand?"]}),"\n",(0,i.jsxs)(n.p,{children:["Signals with ",(0,i.jsx)(n.code,{children:"_T"})," names or names that Chisel has to uniquify\noften are intermediate values generated within loops, function calls, or ",(0,i.jsx)(n.code,{children:"when"})," predicates.\nThey can also be consumed by verification statements like ",(0,i.jsx)(n.code,{children:"assert"})," or ",(0,i.jsx)(n.code,{children:"prints"}),".\nIn these cases, the compiler plugin often can't find a good prefix for the generated\nintermediate signals and can't name them at all or has to make up a unique name for them."]}),"\n",(0,i.jsxs)(n.p,{children:["We recommend you manually insert calls to ",(0,i.jsx)(n.code,{children:"prefix"})," to clarify these cases:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'import chisel3.experimental.prefix\nclass ExamplePrefix extends Module {\n\n  Seq.tabulate(2) { i =>\n    Seq.tabulate(2) { j =>\n      prefix(s"loop_${i}_${j}"){\n        val x = WireInit((i*0x10+j).U(8.W))\n        dontTouch(x)\n      }\n    }\n  }\n}\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.103.0\nmodule ExamplePrefix(\n  input clock,\n        reset\n);\n\n  wire [7:0] loop_0_0_x = 8'h0;\n  wire [7:0] loop_0_1_x = 8'h1;\n  wire [7:0] loop_1_0_x = 8'h10;\n  wire [7:0] loop_1_1_x = 8'h11;\nendmodule\n\n"})}),"\n",(0,i.jsxs)(n.h3,{id:"how-can-i-get-better-names-for-code-generated-by-when-clauses",children:["How can I get better names for code generated by ",(0,i.jsx)(n.code,{children:"when"})," clauses?"]}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"prefix"})," API can help with code inside ",(0,i.jsx)(n.code,{children:"when"})," clauses:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'class ExampleWhenPrefix extends Module {\n\n  val in = IO(Input(UInt(4.W)))\n  val out = IO(Output(UInt(4.W)))\n\n  out := DontCare\n\n  Seq.tabulate(2) { i =>\n    val j = i + 1\n    prefix(s"clause_${j}") {\n      when (in === j.U) {\n        val foo = Reg(UInt(4.W))\n        foo := in + j.U(4.W)\n        out := foo\n      }\n    }\n  }\n}\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.103.0\nmodule ExampleWhenPrefix(\n  input        clock,\n               reset,\n  input  [3:0] in,\n  output [3:0] out\n);\n\n  reg [3:0] clause_1_foo;\n  reg [3:0] clause_2_foo;\n  always @(posedge clock) begin\n    clause_1_foo <= in + 4'h1;\n    clause_2_foo <= in + 4'h2;\n  end // always @(posedge)\n  assign out = in == 4'h2 ? clause_2_foo : clause_1_foo;\nendmodule\n\n"})}),"\n",(0,i.jsx)(n.h3,{id:"i-still-see-_gen-signals-can-this-be-fixed",children:"I still see _GEN signals, can this be fixed?"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"_GEN"})," signals are usually generated from the FIRRTL compiler, rather than the Chisel library. We are working on\nrenaming these signals with more context-dependent names, but it is a work in progress. Thanks for caring!"]}),"\n",(0,i.jsx)(n.h3,{id:"how-do-i-make-my-modules-have-more-stable-names-instead-of-module_1-and-module_42",children:"How do I make my modules have more stable names instead of 'Module_1' and 'Module_42'?"}),"\n",(0,i.jsxs)(n.p,{children:["This is an example of the module instability problem, which results from several modules all sharing the exact same name. To fix this, you must add more specificity to your ",(0,i.jsx)(n.code,{children:"Module"}),"'s name to avoid these name collisions."]}),"\n",(0,i.jsxs)(n.p,{children:["This can be done by leveraging the ",(0,i.jsx)(n.code,{children:"desiredName"})," and ",(0,i.jsx)(n.code,{children:"typeName"})," APIs.\n",(0,i.jsx)(n.code,{children:"desiredName"})," is for indicating the names of ",(0,i.jsx)(n.code,{children:"Modules"})," (e.g. influenced by the parameters passed in), and ",(0,i.jsx)(n.code,{children:"typeName"})," is useful for modules which are type-parameterized by subclasses of ",(0,i.jsx)(n.code,{children:"Data"}),". Overriding ",(0,i.jsx)(n.code,{children:"desiredName"})," can reduce or even eliminate name collisions. For instance, suppose your module looks like the following:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:"class MyModule[T <: Data](gen: T) extends Module {\n  // ...\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["We can override ",(0,i.jsx)(n.code,{children:"desiredName"})," of the module to include the type name of the ",(0,i.jsx)(n.code,{children:"gen"})," parameter like so:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'class MyModule[T <: Data](gen: T) extends Module {\n  override def desiredName = s"MyModule_${gen.typeName}"\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Any instances of your ",(0,i.jsx)(n.code,{children:"MyModule"})," will now have Verilog module names containing the type parameter."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:"val foo = Module(new MyModule(UInt(4.W))) // MyModule_UInt4 // MyModule_UInt4\nval bar = Module(new MyModule(Vec(3, UInt(4.W)))) // MyModule_Vec3_UInt4\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Note that all base Chisel util modules, like ",(0,i.jsx)(n.code,{children:"Queue"}),", already implement ",(0,i.jsx)(n.code,{children:"desiredName"})," like this:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:"val fooQueue = Module(new Queue(UInt(8.W), 4)) // Verilog module would be named 'Queue4_UInt8' // Verilog module would be named 'Queue4_UInt8'\nval barQueue = Module(new Queue(SInt(12.W), 3)) // ... and 'Queue3_SInt12' // ... and 'Queue3_SInt12'\nval bazQueue = Module(new Queue(Bool(), 16)) // ... and 'Queue16_Bool'\n"})}),"\n",(0,i.jsxs)(n.h3,{id:"how-would-i-write-my-own-typename-for-my-data-types",children:["How would I write my own ",(0,i.jsx)(n.code,{children:"typeName"})," for my data types?"]}),"\n",(0,i.jsxs)(n.p,{children:["If you're using your own user-defined ",(0,i.jsx)(n.code,{children:"Bundle"}),", you can increase the specificity of its own ",(0,i.jsx)(n.code,{children:"typeName"})," by overriding it. All ",(0,i.jsx)(n.code,{children:"Data"})," types have a simple default implementation of ",(0,i.jsx)(n.code,{children:"typeName"})," (which is simply its class name), but you can override this yourself:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:"class MyBundle[T <: Data](gen: T, intParam: Int) extends Bundle {\n  // Generate a stable typeName for this Bundle. Two 'words' are present\n  // in this implementation: the bundle's name plus its integer parameter\n  // (something like 'MyBundle9')\n  // and the generator's typeName, which itself can be composed of 'words'\n  // (something like 'Vec3_UInt4')\n  override def typeName = s\"MyBundle${intParam}_${gen.typeName}\"\n\n  // ...\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Now if you use your ",(0,i.jsx)(n.code,{children:"MyBundle"})," in a module like a ",(0,i.jsx)(n.code,{children:"Queue"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:"val fooQueue = Module(new Queue(new MyBundle(UInt(4.W), 3), 16)) // Queue16_MyBundle3_UInt4\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The suggested pattern for ",(0,i.jsx)(n.code,{children:"typeName"}),", and subsequently ",(0,i.jsx)(n.code,{children:"desiredName"}),", is to fold single integer-like parameters with the name itself (for example, ",(0,i.jsx)(n.code,{children:"Queue4"}),", ",(0,i.jsx)(n.code,{children:"UInt3"}),", ",(0,i.jsx)(n.code,{children:"MyBundle9"}),") to form 'words' and separate these 'words' with underscores (",(0,i.jsx)(n.code,{children:"Queue4_UInt3"}),", ",(0,i.jsx)(n.code,{children:"FooBundle_BarType4"}),")."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Bundles"})," that have multiple integer arguments aren't presently addressed by any of the built-in modules, and so implementing a descriptive and sufficiently differentiable ",(0,i.jsx)(n.code,{children:"typeName"})," for such ",(0,i.jsx)(n.code,{children:"Bundles"})," is left as an exercise to the reader. However, integers should not occur with an underscore before them at the very end of the ",(0,i.jsx)(n.code,{children:"typeName"})," (e.g. ",(0,i.jsx)(n.code,{children:"MyBundle_1"}),") because this is the ",(0,i.jsx)(n.em,{children:"same"})," syntax used for duplicates, and so would cause confusion. Having to disambiguate modules all named ",(0,i.jsx)(n.code,{children:"Queue32_MyBundle_4_1"}),", ",(0,i.jsx)(n.code,{children:"Queue32_MyBundle_4_2"}),", ",(0,i.jsx)(n.code,{children:"Queue32_MyBundle_4_3"}),", and so on would be undesirable, indeed!"]}),"\n",(0,i.jsxs)(n.h3,{id:"i-dont-want-to-override-typename-over-and-over-is-there-any-easy-way-to-generate-a-typename",children:["I don't want to override ",(0,i.jsx)(n.code,{children:"typeName"})," over and over! Is there any easy way to generate a ",(0,i.jsx)(n.code,{children:"typeName"}),"?"]}),"\n",(0,i.jsxs)(n.p,{children:["Yes, with the experimental ",(0,i.jsx)(n.code,{children:"HasAutoTypename"})," trait. This trait can be mixed into your ",(0,i.jsx)(n.code,{children:"Bundle"}),"s to automatically generate a tuple-like ",(0,i.jsx)(n.code,{children:"typeName"})," for them, based on the constructor parameters of that ",(0,i.jsx)(n.code,{children:"Bundle"}),". Let's look at the previous examples:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'class MyBundle[T <: Data](gen: T, intParam: Int) extends Bundle {\n  override def typeName = s"MyBundle_${gen.typeName}_${intParam}"\n  // ...\n}\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'new MyBundle(UInt(8.W), 3).typeName\n// res7: String = "MyBundle_UInt<8>_3"\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Auto-generated ",(0,i.jsx)(n.code,{children:"typeName"}),"s take the form of ",(0,i.jsx)(n.code,{children:"{Bundle Name}_{Parameter Value 1}_{Parameter Value 2}_{...}"}),", and so our ",(0,i.jsx)(n.code,{children:"MyBundle"})," can be equivalently expressed with:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:"import chisel3.experimental.HasAutoTypename\nclass MyBundle[T <: Data](gen: T, intParam: Int) extends Bundle with HasAutoTypename {\n  // ...\n  // Note: No `override def typeName` statement here\n}\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'new MyBundle(UInt(8.W), 3).typeName\n// res9: String = "MyBundle_UInt<8>_3"\n'})}),"\n",(0,i.jsx)(n.h3,{id:"can-i-name-my-bundles-in-firrtl-so-i-dont-generate-extremely-long-bundle-types",children:"Can I name my bundles in FIRRTL, so I don't generate extremely long bundle types?"}),"\n",(0,i.jsxs)(n.p,{children:["Yes, using the ",(0,i.jsx)(n.code,{children:"HasTypeAlias"})," trait. FIRRTL has a construct to alias a bundle type with a type alias like so:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"circuit Top :\n  type MyBundle = { foo : UInt<8>, bar : UInt<1>}\n\n  module Top :\n    //...\n"})}),"\n",(0,i.jsxs)(n.p,{children:["These can be automatically emitted from Chisel by mixing ",(0,i.jsx)(n.code,{children:"HasTypeAlias"})," into a user-defined ",(0,i.jsx)(n.code,{children:"Record"}),", and implementing a field named ",(0,i.jsx)(n.code,{children:"aliasName"})," with a ",(0,i.jsx)(n.code,{children:"RecordAlias(...)"})," instance."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'import chisel3.experimental.{HasTypeAlias, RecordAlias}\n\nclass AliasedBundle extends Bundle with HasTypeAlias {\n  override def aliasName = RecordAlias("MyAliasedBundle")\n  val foo = UInt(8.W)\n  val bar = Bool()\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Let's see what happens when we generate FIRRTL using this ",(0,i.jsx)(n.code,{children:"Bundle"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'emitFIRRTL(new Module {\n  val wire = Wire(new AliasedBundle)\n})\n// res10: String = """FIRRTL version 4.2.0\n// circuit _18_Anon :\n//   type MyAliasedBundle = { foo : UInt<8>, bar : UInt<1>}\n// \n//   layer Verification, bind, "verification" :\n//     layer Assert, bind, "verification/assert" :\n//     layer Assume, bind, "verification/assume" :\n//     layer Cover, bind, "verification/cover" :\n// \n//   public module _18_Anon : @[naming.md 232:28]\n//     input clock : Clock @[naming.md 232:28]\n//     input reset : UInt<1> @[naming.md 232:28]\n// \n//     wire wire : MyAliasedBundle @[naming.md 233:18]\n// \n// """\n'})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"HasTypeAlias"})," also supports nested bundles, too:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'class Child extends Bundle with HasTypeAlias {\n  override def aliasName = RecordAlias("ChildBundle")\n  val x = UInt(8.W)\n}\n\nclass Parent extends Bundle with HasTypeAlias {\n  override def aliasName = RecordAlias("ParentBundle")\n  val child = new Child\n}\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'emitFIRRTL(new Module {\n  val wire = Wire(new Parent)\n})\n// res11: String = """FIRRTL version 4.2.0\n// circuit _22_Anon :\n//   type ChildBundle = { x : UInt<8>}\n//   type ParentBundle = { child : ChildBundle}\n// \n//   layer Verification, bind, "verification" :\n//     layer Assert, bind, "verification/assert" :\n//     layer Assume, bind, "verification/assume" :\n//     layer Cover, bind, "verification/cover" :\n// \n//   public module _22_Anon : @[naming.md 255:28]\n//     input clock : Clock @[naming.md 255:28]\n//     input reset : UInt<1> @[naming.md 255:28]\n// \n//     wire wire : ParentBundle @[naming.md 256:18]\n// \n// """\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"why-do-i-keep-seeing-_stripped-suffixing-everywhere-in-my-firrtl-i-didnt-specify-that-in-my-aliasname",children:["Why do I keep seeing _stripped suffixing everywhere in my FIRRTL? I didn't specify that in my ",(0,i.jsx)(n.code,{children:"aliasName"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["You're using an ",(0,i.jsx)(n.code,{children:"Input(...)"})," or ",(0,i.jsx)(n.code,{children:"Output(...)"})," in conjunction with an aliased ",(0,i.jsx)(n.code,{children:"Record"})," that contains a ",(0,i.jsx)(n.code,{children:"Flipped(...)"}),". These flipped values are stripped by ",(0,i.jsx)(n.code,{children:"Input"})," and ",(0,i.jsx)(n.code,{children:"Output"})," which fundamentally changes the type of the parent ",(0,i.jsx)(n.code,{children:"Record"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'class StrippedBundle extends Bundle with HasTypeAlias {\n  override def aliasName = RecordAlias("StrippedBundle")\n  val flipped = Flipped(UInt(8.W))\n  val normal = UInt(8.W)\n}\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'emitFIRRTL(new Module {\n  val in = IO(Input(new StrippedBundle))\n})\n// res12: String = """FIRRTL version 4.2.0\n// circuit _26_Anon :\n//   type StrippedBundle_stripped = { flipped : UInt<8>, normal : UInt<8>}\n// \n//   layer Verification, bind, "verification" :\n//     layer Assert, bind, "verification/assert" :\n//     layer Assume, bind, "verification/assume" :\n//     layer Cover, bind, "verification/cover" :\n// \n//   public module _26_Anon : @[naming.md 273:28]\n//     input clock : Clock @[naming.md 273:28]\n//     input reset : UInt<1> @[naming.md 273:28]\n//     input in : StrippedBundle_stripped @[naming.md 274:14]\n// \n//     skip\n// \n// """\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Note how the bundle type doesn't contain a ",(0,i.jsx)(n.code,{children:"flip flipped : UInt<8>"})," field, and the alias gains a ",(0,i.jsx)(n.code,{children:'"_stripped"'})," suffix! This ",(0,i.jsx)(n.code,{children:"Bundle"})," type is no longer the same as the one we wrote in Chisel, so we have to distinguish it as such."]}),"\n",(0,i.jsxs)(n.p,{children:["By default, the suffix appended to ",(0,i.jsx)(n.code,{children:"Record"})," names is ",(0,i.jsx)(n.code,{children:'"_stripped"'}),". This can be defined by users with an additional string argument passed to ",(0,i.jsx)(n.code,{children:"RecordAlias(alias, strippedSuffix)"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'class CustomStrippedBundle extends Bundle with HasTypeAlias {\n  override def aliasName = RecordAlias("StrippedBundle", "Foo")\n  val flipped = Flipped(UInt(8.W))\n  val normal = UInt(8.W)\n}\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'emitFIRRTL(new Module {\n  val in = IO(Input(new CustomStrippedBundle))\n})\n// res13: String = """FIRRTL version 4.2.0\n// circuit _30_Anon :\n//   type StrippedBundleFoo = { flipped : UInt<8>, normal : UInt<8>}\n// \n//   layer Verification, bind, "verification" :\n//     layer Assert, bind, "verification/assert" :\n//     layer Assume, bind, "verification/assume" :\n//     layer Cover, bind, "verification/cover" :\n// \n//   public module _30_Anon : @[naming.md 291:28]\n//     input clock : Clock @[naming.md 291:28]\n//     input reset : UInt<1> @[naming.md 291:28]\n//     input in : StrippedBundleFoo @[naming.md 292:14]\n// \n//     skip\n// \n// """\n'})}),"\n",(0,i.jsx)(n.h3,{id:"i-want-to-add-some-hardware-or-assertions-but-each-time-i-do-all-the-signal-names-get-bumped",children:"I want to add some hardware or assertions, but each time I do all the signal names get bumped!"}),"\n",(0,i.jsxs)(n.p,{children:['This is the classic "ECO" problem, and we provide descriptions in ',(0,i.jsx)(n.a,{href:"../explanations/naming",children:"explanation"}),". In short,\nwe recommend wrapping all additional logic in a prefix scope, which enables a unique namespace. This should prevent\nname collisions, which are what triggers all those annoying signal name bumps!"]}),"\n",(0,i.jsx)(n.h3,{id:"i-want-to-force-a-signal-or-instance-name-to-something-how-do-i-do-that",children:"I want to force a signal (or instance) name to something, how do I do that?"}),"\n",(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.code,{children:".suggestName"})," method, which is on all classes which subtype ",(0,i.jsx)(n.code,{children:"Data"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"how-can-i-omit-the-prefix-in-certain-parts-of-the-code",children:"How can I omit the prefix in certain parts of the code?"}),"\n",(0,i.jsxs)(n.p,{children:["You can use the ",(0,i.jsx)(n.code,{children:"noPrefix { ... }"})," to strip the prefix from all signals generated in that scope."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:"import chisel3.experimental.noPrefix\n\nclass ExampleNoPrefix extends Module {\n  val in = IO(Input(UInt(2.W)))\n  val out = IO(Output(UInt(5.W)))\n\n  val add = noPrefix {\n    // foo will not get a prefix\n    val foo = RegNext(in + 1.U)\n    foo + in\n  }\n\n  out := add\n}\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.103.0\nmodule ExampleNoPrefix(\n  input        clock,\n               reset,\n  input  [1:0] in,\n  output [4:0] out\n);\n\n  reg [1:0] foo;\n  always @(posedge clock)\n    foo <= in + 2'h1;\n  assign out = {3'h0, foo + in};\nendmodule\n\n"})}),"\n",(0,i.jsx)(n.h3,{id:"i-am-still-not-getting-the-name-i-want-for-example-inlining-an-instance-changes-my-name",children:"I am still not getting the name I want. For example, inlining an instance changes my name!"}),"\n",(0,i.jsxs)(n.p,{children:["In cases where a FIRRTL transform renames a signal/instance, you can use the ",(0,i.jsx)(n.code,{children:"forcename"})," API:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'import chisel3.util.experimental.{forceName, InlineInstance}\n\nclass WrapperExample extends Module {\n  val in = IO(Input(UInt(3.W)))\n  val out = IO(Output(UInt(3.W)))\n  val inst = Module(new Wrapper)\n  inst.in := in\n  out := inst.out\n}\nclass Wrapper extends Module with InlineInstance {\n  val in = IO(Input(UInt(3.W)))\n  val out = IO(Output(UInt(3.W)))\n  val inst = Module(new MyLeaf)\n  forceName(inst, "inst")\n  inst.in := in\n  out := inst.out\n}\nclass MyLeaf extends Module {\n  val in = IO(Input(UInt(3.W)))\n  val out = IO(Output(UInt(3.W)))\n  out := in\n}\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.103.0\nmodule MyLeaf(\n  input  [2:0] in,\n  output [2:0] out\n);\n\n  assign out = in;\nendmodule\n\nmodule WrapperExample(\n  input        clock,\n               reset,\n  input  [2:0] in,\n  output [2:0] out\n);\n\n  MyLeaf inst (\n    .in  (in),\n    .out (out)\n  );\nendmodule\n\n"})}),"\n",(0,i.jsx)(n.p,{children:"This can be used to rename instances and non-aggregate typed signals."})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},1871:(e,n,a)=>{a.d(n,{A:()=>l});a(6540);var i=a(5195);const s={tableOfContentsInline:"tableOfContentsInline_prmo"};var t=a(4848);function l(e){let{toc:n,minHeadingLevel:a,maxHeadingLevel:l}=e;return(0,t.jsx)("div",{className:s.tableOfContentsInline,children:(0,t.jsx)(i.A,{toc:n,minHeadingLevel:a,maxHeadingLevel:l,className:"table-of-contents",linkClassName:null})})}},5195:(e,n,a)=>{a.d(n,{A:()=>x});var i=a(6540),s=a(6342);function t(e){const n=e.map((e=>({...e,parentIndex:-1,children:[]}))),a=Array(7).fill(-1);n.forEach(((e,n)=>{const i=a.slice(2,e.level);e.parentIndex=Math.max(...i),a[e.level]=n}));const i=[];return n.forEach((e=>{const{parentIndex:a,...s}=e;a>=0?n[a].children.push(s):i.push(s)})),i}function l(e){let{toc:n,minHeadingLevel:a,maxHeadingLevel:i}=e;return n.flatMap((e=>{const n=l({toc:e.children,minHeadingLevel:a,maxHeadingLevel:i});return function(e){return e.level>=a&&e.level<=i}(e)?[{...e,children:n}]:n}))}function o(e){const n=e.getBoundingClientRect();return n.top===n.bottom?o(e.parentNode):n}function d(e,n){let{anchorTopOffset:a}=n;const i=e.find((e=>o(e).top>=a));if(i){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(o(i))?i:e[e.indexOf(i)-1]??null}return e[e.length-1]??null}function r(){const e=(0,i.useRef)(0),{navbar:{hideOnScroll:n}}=(0,s.p)();return(0,i.useEffect)((()=>{e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function c(e){const n=(0,i.useRef)(void 0),a=r();(0,i.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:i,linkActiveClassName:s,minHeadingLevel:t,maxHeadingLevel:l}=e;function o(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(i),o=function(e){let{minHeadingLevel:n,maxHeadingLevel:a}=e;const i=[];for(let s=n;s<=a;s+=1)i.push(`h${s}.anchor`);return Array.from(document.querySelectorAll(i.join()))}({minHeadingLevel:t,maxHeadingLevel:l}),r=d(o,{anchorTopOffset:a.current}),c=e.find((e=>r&&r.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,a){a?(n.current&&n.current!==e&&n.current.classList.remove(s),e.classList.add(s),n.current=e):e.classList.remove(s)}(e,e===c)}))}return document.addEventListener("scroll",o),document.addEventListener("resize",o),o(),()=>{document.removeEventListener("scroll",o),document.removeEventListener("resize",o)}}),[e,a])}var u=a(8774),h=a(4848);function m(e){let{toc:n,className:a,linkClassName:i,isChild:s}=e;return n.length?(0,h.jsx)("ul",{className:s?void 0:a,children:n.map((e=>(0,h.jsxs)("li",{children:[(0,h.jsx)(u.A,{to:`#${e.id}`,className:i??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,h.jsx)(m,{isChild:!0,toc:e.children,className:a,linkClassName:i})]},e.id)))}):null}const p=i.memo(m);function x(e){let{toc:n,className:a="table-of-contents table-of-contents__left-border",linkClassName:o="table-of-contents__link",linkActiveClassName:d,minHeadingLevel:r,maxHeadingLevel:u,...m}=e;const x=(0,s.p)(),g=r??x.tableOfContents.minHeadingLevel,f=u??x.tableOfContents.maxHeadingLevel,y=function(e){let{toc:n,minHeadingLevel:a,maxHeadingLevel:s}=e;return(0,i.useMemo)((()=>l({toc:t(n),minHeadingLevel:a,maxHeadingLevel:s})),[n,a,s])}({toc:n,minHeadingLevel:g,maxHeadingLevel:f});return c((0,i.useMemo)((()=>{if(o&&d)return{linkClassName:o,linkActiveClassName:d,minHeadingLevel:g,maxHeadingLevel:f}}),[o,d,g,f])),(0,h.jsx)(p,{toc:y,className:a,linkClassName:o,...m})}},8453:(e,n,a)=>{a.d(n,{R:()=>l,x:()=>o});var i=a(6540);const s={},t=i.createContext(s);function l(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);