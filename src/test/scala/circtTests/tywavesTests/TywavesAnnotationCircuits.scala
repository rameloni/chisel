package circtTests.tywavesTests

import chisel3._
import chisel3.experimental.{Analog, IntrinsicModule}
import chisel3.experimental.hierarchy.{instantiable, Definition, Instance}
import chisel3.stage.ChiselGeneratorAnnotation
import chisel3.tywavesinternal.{ClassParam, TywavesChiselAnnotation}
import chisel3.util.{MixedVec, SRAM, SRAMInterface}
import circt.stage.ChiselStage
import org.scalatest.AppendedClues.convertToClueful
import org.scalatest.matchers.should.Matchers

/** Utility functions for testing [[chisel3.tywavesinternal.TywavesAnnotation]] */
object TestUtils extends Matchers {

  def getSubOccurency(mainString: String, subString: String): List[String] = { // Split the text T into lines
    val lines = mainString.split("\n").toList

    // Compile a regex pattern to find the string X
    val pattern = (".*" + subString + ".*").r

    // Find the index of the line that matches the pattern
    val matchIndex = lines.indexWhere(line => pattern.matches(line))

    // If a match is found, return the line and the immediate next line
    if (matchIndex >= 0) {
      lines.slice(matchIndex, matchIndex + 2)
    } else {
      List() // Return an empty list if no match is found
    }
  }

  def getMissingSubOccurency(mainString: String, subString: String, expectedMatches: Seq[String]): String = {
    // Split the text into lines
    val lines = mainString.split("\n").toSeq

    // Compile a regex pattern to find the string X
    val pattern = (".*" + subString + ".*").r

    // Filter lines that match the pattern and get also the next line
    val matchingIndexes = lines.indices.filter(i => pattern.findFirstIn(lines(i)).isDefined)

    // Get the lines at these indexes and the next line
    val linesWithNext = matchingIndexes.flatMap { idx =>
      if (idx < lines.length - 1) List(lines(idx), lines(idx + 1))
      else List(lines(idx)) // Handle edge case where last line matches
    }.distinct // Remove duplicates in case same line is matched more than once

    val expectedRegex = expectedMatches.map(_.r)
    // Filter out lines that are in expectedMatches
    val missingLines = linesWithNext.filterNot { line =>
      expectedRegex.exists(_.findFirstIn(line).isDefined)
    }
    missingLines.mkString("\n")

  }

  def countSubstringOccurrences(mainString: String, subString: String): Int = {
    val pattern = subString.r
    pattern.findAllMatchIn(mainString).length
  }

  // Return target and expected regex string
  def createExpected(
    target:   String,
    typeName: String,
    binding:  String = "",
    params:   Option[Seq[ClassParam]] = None
  ): (String, String) = {
    val realTypeName = binding match {
      case "" => typeName
      case _  => s"$binding\\[$typeName\\]"
    }
    val realParams = params match {
      case Some(p) =>
        s""",\\s+"params":\\s*\\[\\s+${p.map { p =>
          {
            val value = p.value match {
              case Some(v) => s""",\\s*\"value\":\"$v\""""
              case None    => ""
            }
            "\\{\\s+" + Seq(s"""\"name\":\"${p.name}\"""", s"""\"typeName\":\"${p.typeName}\"\\s*$value""").mkString(
              ",\\s+"
            ) + "\\s*\\}"
          }
        }.mkString(",\\s+")}\\s+\\]"""
      case None => ""
    }
    (target, s"""\"target\":\"$target\",\\s+\"typeName\":\"$realTypeName\"$realParams\\s*""".stripMargin)
  }

  def checkAnno(
    expectedMatches:    Seq[((String, String), Int)],
    refString:          String,
    includeConstructor: Boolean = false
  ): Unit = {
    def totalAnnoCheck(n: Int): (String, Int) =
      (""""class":"chisel3.tywavesinternal.TywavesAnnotation"""", if (includeConstructor) n else n + 1)
    val targetStrings = expectedMatches.map(p => {
      val s = p._1._1
      "\"target\":\"" + s + "\""
    })
    (expectedMatches.map(p => (p._1._2, p._2)) :+ totalAnnoCheck(expectedMatches.map(_._2).sum)).foreach {
      case (pattern, count) =>
        (countSubstringOccurrences(refString, pattern) should be(count)).withClue(
          s"Pattern: $pattern: ${getMissingSubOccurency(refString, pattern, targetStrings)}"
        )
    }
  }
}

object TywavesAnnotationCircuits {

  trait BindingChoice { def apply[T <: Data](data: T): T }
  case object PortBinding extends BindingChoice {
    override def apply[T <: Data](data: T): T = IO((data))
    override def toString: String = "IO"
  }
  case object WireBinding extends BindingChoice {
    override def apply[T <: Data](data: T): T = Wire(data)
    override def toString: String = "Wire"
  }
  case object RegBinding extends BindingChoice {
    override def apply[T <: Data](data: T): T = Reg(data)
    override def toString: String = "Reg"
  }

  /** Represent a module which internal elements can have different bindings:
    *  - Reg
    *  - Wire
    *  - IO
    */
  abstract class TywavesTestModule(bindingChoice: BindingChoice) extends RawModule {
    def body: Unit
    bindingChoice match {
      case RegBinding =>
        val clock = IO(Input(Clock()))
        val reset = IO(Input(Reset()))
        withClockAndReset(clock, reset) { body }
      case _ => body
    }
  }

  /** Circuits for module annotations tests */
  object ModuleCircuits {
    // Empty circuit
    class TopCircuit extends RawModule

    // Circuit with submodule
    class MyModule extends RawModule

    class TopCircuitSubModule extends RawModule {
      val mod = Module(new MyModule)
    }

    // Circuit with submodule and submodule with submodule
    class TopCircuitMultiModule extends RawModule {
      // 4 times MyModule in total
      val mod1 = Module(new MyModule)
      val mod2 = Module(new MyModule)
      val mods = Seq.fill(2)(Module(new MyModule))
    }

    // Circuit with submodule and submodule with submodule
    class TopCircuitBlackBox extends RawModule {
      class MyBlackBox extends BlackBox(Map("PARAM1" -> "TRUE", "PARAM2" -> "DEFAULT")) {
        val io = IO(new Bundle {})
      }

      val myBlackBox1:  MyBlackBox = Module(new MyBlackBox)
      val myBlackBox2:  MyBlackBox = Module(new MyBlackBox)
      val myBlackBoxes: Seq[MyBlackBox] = Seq.fill(2)(Module(new MyBlackBox))
    }

    // Circuit using intrinsics
    class ExampleIntrinsicModule(str: String) extends IntrinsicModule("OtherIntrinsic", Map("STRING" -> str)) {
      val b = IO(Input(Bool()))
      val bout = IO(Output(Bool()))
    }

    class TopCircuitIntrinsic extends RawModule {
      val myIntrinsicModule1: ExampleIntrinsicModule = Module(new ExampleIntrinsicModule("Hello"))
      val myIntrinsicModule2: ExampleIntrinsicModule = Module(new ExampleIntrinsicModule("World"))
      val myIntrinsicModules: Seq[ExampleIntrinsicModule] = Seq.fill(2)(Module(new ExampleIntrinsicModule("Hello")))
    }

    // An abstract description of a CSR, represented as a Class.
    @instantiable
    class CSRDescription extends chisel3.properties.Class

    class CSRModule(csrDescDef: Definition[CSRDescription]) extends RawModule {
      val csrDescription = Instance(csrDescDef)
    }

    class TopCircuitClasses extends RawModule {
      val csrDescDef = Definition(new CSRDescription)
      val csrModule1: CSRModule = Module(new CSRModule(csrDescDef))
      val csrModule2: CSRModule = Module(new CSRModule(csrDescDef))
      val csrModules: Seq[CSRModule] = Seq.fill(2)(Module(new CSRModule(csrDescDef)))
    }
  }

  /** Circuits for DataTypes annotations test */
  object DataTypesCircuits {
    // Test Clock, Reset and AsyncReset
    class TopCircuitClockReset extends RawModule {
      val clock: Clock = IO(Input(Clock()))
      // Types od reset https://www.chisel-lang.org/docs/explanations/reset
      val syncReset:  Bool = IO(Input(Bool()))
      val reset:      Reset = IO(Input(Reset()))
      val asyncReset: AsyncReset = IO(Input(AsyncReset()))
    }

    // Test implicit Clock and Reset
    class TopCircuitImplicitClockReset extends Module

    // TODO: add the other ground types
    class TopCircuitGroundTypes(bindingChoice: BindingChoice) extends TywavesTestModule(bindingChoice) {
      override def body: Unit = {
        val uint: UInt = bindingChoice(UInt(8.W))
        val sint: SInt = bindingChoice(SInt(8.W))
        val bool: Bool = bindingChoice(Bool())
        if (bindingChoice != RegBinding) {
          val analog: Analog = bindingChoice(Analog(1.W))
        }
        //        val fixedPoint: FixedPoint TODO: does fixed point still exist?
        //        val interval: Interval = bindingChoice(Interval())) TODO: does interval still exist?
        val bits: UInt = bindingChoice(Bits(8.W))
      }
    }

    // Test Bundles
    class MyEmptyBundle extends Bundle

    class MyBundle extends Bundle {
      val a: UInt = UInt(8.W)
      val b: SInt = SInt(8.W)
      val c: Bool = Bool()
    }

    class TopCircuitBundles(bindingChoice: BindingChoice) extends TywavesTestModule(bindingChoice) {
      override def body: Unit = {
        val a: Bundle = bindingChoice(new Bundle {})
        val b: MyEmptyBundle = bindingChoice(new MyEmptyBundle)
        val c: MyBundle = bindingChoice(new MyBundle)
      }
    }

    class MyNestedBundle extends Bundle {
      val a: Bool = Bool()
      val b: MyBundle = new MyBundle
      val c: MyBundle = Flipped(new MyBundle)
    }

    class TopCircuitBundlesNested(bindingChoice: BindingChoice) extends TywavesTestModule(bindingChoice) {
      override def body: Unit = {
        val a: MyNestedBundle = bindingChoice(new MyNestedBundle)
      }
    }

    // Test Vecs
    class TopCircuitVecs(bindingChoice: BindingChoice) extends TywavesTestModule(bindingChoice) {
      override def body: Unit = {
        val a: Vec[SInt] = bindingChoice(Vec(5, SInt(23.W)))
        val b: Vec[Vec[SInt]] = bindingChoice(Vec(5, Vec(3, SInt(23.W))))
        val c = bindingChoice(
          Vec(
            5,
            new Bundle {
              val x: UInt = UInt(8.W)
            }
          )
        )
        // TODO: check if this should have a better representation, now its type is represented as other Records
        val d = bindingChoice(MixedVec(UInt(3.W), SInt(10.W)))
      }
    }

    // Test Bundles with Vecs
    class TopCircuitBundleWithVec(bindingChoice: BindingChoice) extends TywavesTestModule(bindingChoice) {
      override def body: Unit = {
        val a = bindingChoice(new Bundle {
          val vec = Vec(5, UInt(8.W))
        })
      }
    }

    // Test signals in submodules
    class TopCircuitTypeInSubmodule(bindingChoice: BindingChoice) extends RawModule {
      val mod = Module(new TopCircuitGroundTypes(bindingChoice))
    }

    // Test temporary values declared inside when and otherwise blocks
    class TopCircuitWhenElse extends RawModule {
      // Internally implement a MUX
      val inSeq = IO(Input(Vec(8, UInt(8.W))))
      val out = IO(Output(UInt(8.W)))
      val sel = IO(Input(UInt(math.sqrt(8).ceil.toInt.W)))

      val tmp = sel + 1.U
      when(sel % 2.U === 0.U) {
        val outTmp = inSeq(sel)
        val evenSel = outTmp + 1.U
        out := evenSel
      }.elsewhen(sel === 1.U) {
        val outTmp = inSeq(sel)
        val selIsOne = outTmp + 1.U
        out := selIsOne
      }.otherwise {
        val outTmp = inSeq(sel)
        val oddSel = outTmp + 1.U
        out := oddSel
      }

    }

    // Test enumeration
    class TopCircuitChiselEnum extends RawModule {
      object MyEnum extends ChiselEnum {
        val A, B, C = Value
      }

      object MyEnum2 extends ChiselEnum {
        val D, E, F = Value
      }

      object ScopeEnum {
        object MyEnum2 extends ChiselEnum {
          val D, E = Value
        }
      }

      val inputEnum = IO(Input(MyEnum()))

      val io = IO(Input(new Bundle {
        val a = MyEnum()
        val b = MyEnum2()
        val c = Bool()
      }))

      // So the enumVecAnnotation will have fields
      val i = IO(Input(new Bundle {
        val e = MyEnum()
        val b = new Bundle {
          val inner_e = ScopeEnum.MyEnum2()
          val NOENUM = Bool()
          val inner_ee = MyEnum()
          val inner_b = new Bundle {
            val inner_inner_e = MyEnum()
            val inner_NOENUM = Bool()
            val inner_ee = MyEnum2()
          }
          val v = Vec(3, MyEnum())
        }
        val v = Vec(3, MyEnum())
      }))

      val vBundle = VecInit(i)
      val v = IO(Input(Vec(3, MyEnum())))
      val vv = IO(Input(Vec(2, Vec(2, MyEnum()))))
    }
  }

  object MemCircuits {
    // Test memory ROM: https://www.chisel-lang.org/docs/explanations/memories#rom
    class ROMs {

      import chisel3.experimental.BundleLiterals._

      val romFromVec:     Vec[UInt] = Wire(Vec(4, UInt(8.W)))
      val romFromVecInit: Vec[UInt] = VecInit(1.U, 2.U, 4.U, 8.U)
      for (i <- 0 until 4) {
        romFromVec(i) := romFromVecInit(i)
      }
      val bundle = new Bundle {
        val a: UInt = UInt(8.W)
      }
      val romOfBundles =
        VecInit(bundle.Lit(_.a -> 1.U), bundle.Lit(_.a -> 2.U), bundle.Lit(_.a -> 4.U), bundle.Lit(_.a -> 8.U))
    }

    // TODO: having children in the roms object does not imply the same hierarchy in firrtl (roms is pure scala)
    class TopCircuitROM extends RawModule {
      val roms = new ROMs
    }

    class TopCircuitSyncMem[T <: Data](gen: T, withConnection: Boolean /* If true connect memPort */ ) extends Module {
      val mem = SyncReadMem(4, gen)
      if (withConnection) {
        val idx = IO(Input(UInt(2.W)))
        val in = IO(Input(gen))
        val out = IO(Output(gen))
        mem.write(idx, in)
        out := mem.read(idx)
      }
    }

    class TopCircuitMem[T <: Data](gen: T, withConnection: Boolean) extends Module {
      val mem = Mem(4, gen)
      if (withConnection) {
        val idx = IO(Input(UInt(2.W)))
        val in = IO(Input(gen))
        val out = IO(Output(gen))
        mem(idx) := in
        out := mem(idx)
      }
    }

    class TopCircuitSRAM[T <: Data](gen: T, size: Int, numReadPorts: Int, numWritePorts: Int, numReadwritePorts: Int)
        extends Module {
      val mem = SRAM(size, gen, numReadPorts, numWritePorts, numReadwritePorts)
    }

    class TopCircuitMemWithMask[T <: Data, M <: MemBase[T]](_gen: T, _mem: Class[M], maskSize: Int) extends Module {

      val gen = Vec(maskSize, _gen)
      val mem = {
        if (classOf[SyncReadMem[T]].isAssignableFrom(_mem)) SyncReadMem(4, gen)
        else if (classOf[Mem[T]].isAssignableFrom(_mem)) Mem(4, gen)
        else throw new Exception("Unknown memory type")
      }

      val mask = Wire(Vec(maskSize, Bool()))

      val idx = IO(Input(UInt(2.W)))
      val in = IO(Input(gen))
      val out = IO(Output(gen))

      mem.write(idx, in, mask)
      out := mem.read(idx)
    }

    class TopCircuitSRAMWithMask[T <: Data](_gen: T) extends Module {
      val maskSize = 2
      val gen = Vec(maskSize, _gen)
      val mem = SRAM.masked(4, gen, 1, 1, 0)
    }
  }

  object ParamCircuits {

    // Circuit with params
    class TopCircuitWithParams(val width1: Int, width2: Int) extends RawModule {
      val width3 = width1 + width2
      val uint: UInt = IO(Input(UInt(width1.W)))
      val sint: SInt = IO(Input(SInt(width2.W)))
      val bool: Bool = IO(Input(Bool()))
      val bits: Bits = IO(Input(Bits(width3.W)))
    }

    // Circuit with submodule and submodule with submodule
    class TopCircuitWithParamModules extends RawModule {
      class MyModule(val width: Int) extends RawModule

      val mod1: MyModule = Module(new MyModule(8))
      val mod2: MyModule = Module(new MyModule(16))
      val mod3: MyModule = Module(new MyModule(32))
    }

    // Bundle with parameters
    class TopCircuitWithParamBundle extends RawModule {
      class BaseBundle(val n: Int) extends Bundle {
        val b: UInt = UInt(n.W)
      }
      class OtherBundle(val a: UInt, val b: BaseBundle) extends Bundle {} // Example of nested class in parameters

      class TopBundle(a: Bool, val b: String, protected val c: Char, private val d: Boolean, val o: OtherBundle)
          extends Bundle {
        val inner_a = a
      }
      case class CaseClassExample(a: Int, o: OtherBundle) extends Bundle

      val baseBundle = IO(Input(new BaseBundle(1)))
      val otherBundle = IO(Input(new OtherBundle(UInt(baseBundle.n.W), baseBundle.cloneType)))
      val topBundle = IO(Input(new TopBundle(Bool(), "hello", 'c', true, otherBundle.cloneType)))

      val caseClassBundle = IO(Input(CaseClassExample(1, new OtherBundle(UInt(2.W), baseBundle.cloneType))))
      val anonBundle = IO(Input(new Bundle {}))

    }

    // A circuit where parameters are pure scala classes/case classes
    class TopCircuitWithParamScalaClasses extends RawModule {
      class MyScalaClass(val a: Int, b: String)
      case class MyScalaCaseClass(a: Int, b: String)

      class MyModule(val a: MyScalaClass, b: MyScalaCaseClass) extends RawModule
      class MyBundle(val a: MyScalaClass, b: MyScalaCaseClass) extends Bundle

      val mod:    MyModule = Module(new MyModule(new MyScalaClass(1, "hello"), MyScalaCaseClass(2, "world")))
      val bundle: MyBundle = IO(Input(new MyBundle(new MyScalaClass(1, "hello"), MyScalaCaseClass(2, "world"))))

    }
  }
}
