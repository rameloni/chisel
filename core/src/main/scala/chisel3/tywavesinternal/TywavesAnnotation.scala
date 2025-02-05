package chisel3.tywavesinternal

import chisel3.{Data, MemBase, Record, Vec, VecLike}
import chisel3.experimental.{BaseModule, ChiselAnnotation}
import chisel3.internal.{HasId, NamedComponent}
import chisel3.internal.firrtl.ir._
import chisel3.properties.{DynamicObject, StaticObject}
import firrtl.annotations.{Annotation, IsMember, SingleTargetAnnotation}

import scala.collection.mutable

// TODO: if the code touches a lot of Chisel internals, it might be better to put it into
//    - core
//  otherwise:
//    - src

/** Represent the parameters of a class constructor:
  *  {{{
  *   class A(
  *        a: Int,                  // parameter without val
  *        val b: String,           // parameter with val
  *        protected val c: Char,   // parameter with protected val
  *        private val d: Boolean,  // parameter with private val
  *        val o: OtherClass        // parameter with complex type (another class)
  *       )
  *  }}}
  *
  *  The ClassParam stores for each parameter the name, the type and optionally the value of it.
  *
  * @param name The name of the parameter
  * @param typeName The type of the parameter
  * @param value The value of the parameter. It is `None` when the annotator is not able to retrieve the value
  */
case class ClassParam(name: String, typeName: String, value: Option[String])

/**
  * TywavesAnnotation is a custom annotation that is used to store Chisel high-level information in the FIRRTL for the
  * Tywaves waveform viewer.
  *
  * This case class is not intended to be used by the user.
  *
  * @param target  The target of the annotation
  * @param typeName The name of the type of the target
  * @param params The constructor parameters of the type of the target. It is `None` when the class type has no parameters
  *
  * Example:
  * {{{
  *   val integer = IO(Input(UInt(8.W))) // is of type UInt without parameters
  *   val io = new Bundle { ... }        // is an anonymous bundle
  *
  *   class MyCustomBundleT(val n: Int) extends Bundle { ... }
  *   val x = new MyCustomBundleT(10)    // is of MyCustomBundleT(n: 10) type
  * }}}
  */
private[chisel3] case class TywavesAnnotation[T <: IsMember](
  target:   T,
  typeName: String,
  params:   Option[Seq[ClassParam]])
    extends SingleTargetAnnotation[T] {
  def duplicate(n: T) = this.copy(n)
}

object TywavesChiselAnnotation {

  // Store a list of annotations created
  private val annoCreated = new mutable.HashSet[IsMember]()

  /** Create an annotation as [[ChiselAnnotation]].
    *
    * @return Some(ChiselAnnotation) if the annotation is created, None otherwise
    */
  private def createTywavesChiselAnno[T <: IsMember](
    target:    T,
    name:      String,
    paramsOpt: Option[Seq[ClassParam]]
  ): Option[ChiselAnnotation] = {

    if (annoCreated.contains(target)) {
      None // If the annotation already exists return None. Prevent duplicates
    } else {
      annoCreated.add(target)
      Some(new ChiselAnnotation {
        override def toFirrtl: Annotation = TywavesAnnotation(target, name, paramsOpt)
      })
    }
  }

  /** Generate the annotations for a full `Circuit` */
  def generate(circuit: Circuit): Seq[ChiselAnnotation] = {
    val typeAliases: Seq[String] = circuit.typeAliases.map(_.name)

    val result = circuit.components.flatMap(c => generate(c, typeAliases))
    // Clear the annotation list after every loop in a Circuit
    annoCreated.clear()
    result

    // TODO: Check for layers and options
    //    circuit.layers
    //    circuit.options

  }

  /** Generate the annotations for a `Component` of a `Circuit` */
  def generate(component: Component, typeAliases: Seq[String]): Seq[ChiselAnnotation] = component match {
    case ctx @ DefModule(id, name, public, layers, ports, cmds) =>
      // TODO: layers
      // Add tywaves annotation: this component, ports, commands
      createAnno(id) ++
        (ports ++ ctx.secretPorts).flatMap(p => generate(p, typeAliases)) ++
        (cmds ++ ctx.secretCommands).flatMap(c => generate(c, typeAliases))
    case ctx @ DefBlackBox(id, name, ports, topDir, params) =>
      // TODO: ?params?
      // Add tywaves annotation: this component, ports
      createAnno(id) ++
        (ports ++ ctx.secretPorts).flatMap(p => generate(p, typeAliases))
    case ctx @ DefIntrinsicModule(id, name, ports, topDir, params) =>
      // TODO: ?params?
      // Add tywaves annotation: this component, ports
      createAnno(id) ++
        (ports ++ ctx.secretPorts).flatMap(p => generate(p, typeAliases))
    case ctx @ DefClass(id, name, ports, cmds) =>
      // Add tywaves annotation: this component, ports, commands
      createAnno(id) ++
        (ports ++ ctx.secretPorts).flatMap(p => generate(p, typeAliases)) ++
        cmds.flatMap(c => generate(c, typeAliases))
    case ctx => throw new Exception(s"Failed to generate TywavesAnnotation. Unknown component type: $ctx")
  }

  /** Generate the annotations for a `Port` of a `Component` */
  def generate(port: Port, typeAliases: Seq[String]): Seq[ChiselAnnotation] = createAnno(port.id)

  /** Generate the annotations for a `Command` of a `Component` */
  def generate(command: Command, typeAliases: Seq[String]): Seq[ChiselAnnotation] = {
    def createAnnoMem(target: HasId, binding: String, size: BigInt, innerType: Data): Seq[ChiselAnnotation] = {
      val name = s"$binding[${dataToTypeName(innerType)}[$size]]"
      // TODO: what if innerType is a Vec or a Bundle?

      createTywavesChiselAnno(target.toTarget, name, None).toSeq
      //      Seq(new ChiselAnnotation {
      //        override def toFirrtl: Annotation = TywavesAnnotation(target.toTarget, name, None)
      //      }) //++ createAnno(chisel3.Wire(innerType))
    }
    command match {
      case e: DefPrim[_] => createAnno(e.id)
      case e @ DefWire(info, id)                        => createAnno(id)
      case e @ DefReg(info, id, clock)                  => createAnno(id)
      case e @ DefRegInit(info, id, clock, reset, init) => createAnno(id)
      case e @ DefMemory(info, id, t, size)             => createAnnoMem(id, id.getClass.getSimpleName, size, t)
      case e @ DefSeqMemory(info, id, t, size, ruw)     => createAnnoMem(id, id.getClass.getSimpleName, size, t)
      case e @ FirrtlMemory(info, id, t, size, readPortNames, writePortNames, readwritePortNames) =>
        createAnnoMem(id, id.getClass.getSimpleName, size, t)
      // Annotating DefMemPort causes errors in firtool, firtool does not support annotating DefMemPort
      case e @ DefMemPort(info, id, source, dir, idx, clock) => Seq.empty //createAnno(id)
      // Connect should not be annotated. I used, it would annotate also tmp expressions that are not declared
      case Connect(info, loc, exp)                                  => Seq.empty
      case PropAssign(info, loc, exp)                               => Seq.empty
      case Attach(info, locs)                                       => Seq.empty
      case DefInvalid(info, arg)                                    => Seq.empty // TODO: check invalid
      case e @ DefInstance(info, id, _)                             => Seq.empty // TODO: check instance
      case e @ DefInstanceChoice(info, _, default, option, choices) => Seq.empty
      case e @ DefObject(info, _, className)                        => Seq.empty // TODO: check object
      case e @ Stop(_, info, clock, ret)                            => Seq.empty
      case e @ Printf(_, info, clock, pable)                        => Seq.empty
      case e @ ProbeDefine(sourceInfo, sink, probeExpr)             => Seq.empty
      case e @ ProbeForceInitial(sourceInfo, probe, value)          => Seq.empty
      case e @ ProbeReleaseInitial(sourceInfo, probe)               => Seq.empty
      case e @ ProbeForce(sourceInfo, clock, cond, probe, value)    => Seq.empty
      case e @ ProbeRelease(sourceInfo, clock, cond, probe)         => Seq.empty
      case e @ Verification(_, op, info, clk, pred, pable)          => Seq.empty
      case e @ When(info, arg, ifRegion, elseRegion) =>
        ifRegion.flatMap(generate(_, typeAliases)) ++
          elseRegion.flatMap(generate(_, typeAliases))
      case e =>
        println(s"Unknown command: $e") // TODO: replace with logger
        Seq.empty
    }
    // TODO: Add tywaves annotation

  }

  /** Return a fancy typeName for a given input [[Data]] */
  private def dataToTypeName(data: Data) = data match {
    case t: Vec[?] =>
      t.toString.split(" ").last
    // This is a workaround to pretty print anonymous bundles and other records
    case t: Record =>
      t.topBindingOpt match {
        case Some(binding) =>
          s"${t._bindingToString(binding)}[${t.className}]" // t._bindingToString(binding) + "[" + t.className + "]"
        case None => t.className
      }

    case t =>
      t.toString.split(" ").last
  }

  /** Get the parameters ([[ClassParam]]) in the constructor of a given scala class.
    *
    * @param target The instance of the class. It can be any class instance.
    * @return A list of [[ClassParam]] that contains the name, type and value* of the parameters in the constructor.
    *         The name and the type are always returned for any class and any kind of parameter.
    *         An actual value of the parameter instead is returned only for `case classes` and for `val`/`var`
    *         parameters (actual fields of a class, i.e. `class A(val a: Int)` and `case class A(a: Int)`.
    *         None is returned for simply parameters (i.e. `class A(a: Int)`).
    *
    *         It ignores fields in the body of the class (i.e. `class A(a: Int) { val b = 10 }`). It is something
    *         certainly possible but it is not implemented since we assume the "type" of a [[chisel3.Module]] and
    *         [[chisel3.Data]] is given by its constructor.
    *
    *         For parameters of complex types (i.e. other classes), the value of the instance class is a string
    *         including recursively the values of the parameters of the nested class.
    * @example {{{
    * class BaseClass (val a: Int)
    * class OtherClass(val a: Int, val b: BaseClass)
    * // Example of nested class in parameters
    * class TopClass  (a: Int, val b: String, protected val c: Char, private val d: Boolean, val o: OtherClass)
    *
    * case class CaseClassExample(a: Int, o: OtherClass)
    *
    * val baseClass = new BaseClass(1)
    * val otherClass = new OtherClass(1, baseClass)
    * val topClass = new TopClass(1, "hello", 'c', true, otherClass)
    * val caseClass = new CaseClassExample(1, otherClass)
    *
    * getConstructorParams(baseClass)  // List(ClassParam("a", "Int", Some(1)))
    * getConstructorParams(otherClass) // List(ClassParam("a", "Int", Some(1)),
    *                                  //      ClassParam("b", "BaseClass", Some("BaseClass(a: 1)")))
    * getConstructorParams(topClass)   // List(ClassParam("a", "Int", None),
    *                                  //      ClassParam("b", "String", Some("hello")),
    *                                  //      ClassParam("c", "Char", Some('c')),
    *                                  //      ClassParam("d", "Boolean", Some(true)),
    *                                  //      ClassParam("o", "OtherClass", Some("OtherClass(a: 1, b: BaseClass(a: 1))"))
    * getConstructorParams(caseClass)  // List(ClassParam("a", "Int", Some(1)),
    *                                  //      ClassParam("o", "OtherClass", Some("OtherClass(a: 1, b: BaseClass(a: 1))"))
    *
    * }}}
    */
  def getConstructorParams(target: Any): Seq[ClassParam] = {
    import scala.reflect.runtime.universe._
    import scala.reflect.api.{Mirror, TypeCreator, Universe}
    def getTypeTag[T](target: T) = {
      val c = target.getClass
      val mirror = runtimeMirror(c.getClassLoader) // obtain runtime mirror
      val sym = mirror.staticClass(c.getName) // obtain class symbol for `c`
      val tpe = sym.selfType // obtain type object for `c`
      // create a type tag which contains above type object
      TypeTag(
        mirror,
        new TypeCreator {
          def apply[U <: Universe with Singleton](m: Mirror[U]) =
            if (m eq mirror) tpe.asInstanceOf[U#Type]
            else
              throw new IllegalArgumentException(s"Type tag defined in $mirror cannot be migrated to other mirrors.")
        }
      )
    }
    val tt = getTypeTag(target)

    def hasParams(target: Any): Boolean = {
      val tt = getTypeTag(target)
      val im = runtimeMirror(target.getClass.getClassLoader).reflect(target)
      tt.tpe.members.collect {
        case m: MethodSymbol if m.isConstructor => m
      } // Get the constructor
        .flatMap(_.paramLists.flatten)
        .exists { a =>
          try {
            im.reflectField(a.asTerm).get // if it can be reflected it has fields
            true
          } catch { case e: Exception => false } // Otherwise, it does not have fields: complex type
        }
    }

    // Get the instance mirror
    val im = runtimeMirror(target.getClass.getClassLoader).reflect(target)

    // Collect all the parameters in the primary constructor
    // 1. Get all the members of this type
    // 2. Filter the method symbol that is the primary constructor
    // 3. Get the list of params in this method

    val l = tt.tpe.members.collect {
      case m: MethodSymbol if m.isConstructor =>
        m.paramLists.flatten.collect {
          // Filter the object itself??
          case a if !a.name.toString.contains("$outer") =>
            val t = a.info.toString.split("\\$")
            val typeName = (if (t.length > 1) t(1) else t(0)).split("\\.").last // Remove the package name
            val paramName = a.name.toString // Get the name of the parameter
            val value =
              try {
                // Try to extract the value of the parameter
                val term =
                  try { tt.tpe.decl(a.name).asTerm.accessed.asTerm }
                  catch { case _: Throwable => a.asTerm }
                val valueTerm = im.reflectField(term).get

                val finalValueTerm =
                  // Recursive base case
                  if (!hasParams(valueTerm)) {
                    // If the the parameter is a Data
                    //    class Top(val param1: UInt) extends Bundle
                    // then simplify the value of the parameter itself.
                    // This prevents from having something like "Top.param1: IO[UInt<8>]"
                    // and instead it will be simply "IO[UInt<8>]" (the value of the parameter)
                    valueTerm match {
                      case v: Data => dataToTypeName(v)
                      case _ => valueTerm.toString
                    }
                  }
                  // Recursive call
                  else {
                    val params = getConstructorParams(valueTerm).map { p =>
                      p.value.fold(p.name)(v => s"${p.name}: $v")
                    }
                    // Format the parameters in this way: Type(param1: value1, param2: value2, ...)
                    s"$typeName(${params.mkString(", ")})"
                  }
                Some(finalValueTerm)
              } catch {
                case _: Throwable => None // Ignore the exception if the value cannot be extracted (not included)
              }
            ClassParam(paramName, typeName, value)
        }
    }.toList.flatten
    l
  }

  /** Get (optionally) the parameters ([[ClassParam]]) in the constructor of a given scala class.
    * For examples and explanation see: [[getConstructorParams]].
    */
  private def getConstructorParamsOpt(target: Any): Option[Seq[ClassParam]] = {
    val params = getConstructorParams(target)
    if (params.nonEmpty) Some(params) else None
  }

  /**
    * Create the annotation
    * @param target The target of the annotation
    */
  private def createAnno(target: Data): Seq[ChiselAnnotation] = {
    val name = dataToTypeName(target)

    var annotations: Seq[ChiselAnnotation] = Seq.empty
    target match {
      case record: Record =>
        record.elements.foreach {
          case (name, element) => annotations = annotations ++ createAnno(element)
        }
      case vecLike: VecLike[_] =>
        // Warning: this assumes all the elements have the same type
        vecLike.collectFirst { element =>
          annotations = annotations ++ createAnno(element); true
        }
      case _ => ()
    }

    // Skip the paramsOpt when the target is a Bits (skip width) TODO: check if it is something that I want or not
    val paramsOpt = target match {
      case _: chisel3.Bits | _: chisel3.Clock | _: chisel3.Reset | _: chisel3.experimental.Analog => None
      case _ => getConstructorParamsOpt(target)
    }

    annotations ++
      createTywavesChiselAnno(target.toTarget, name, paramsOpt).toSeq
  }

  private def createAnno(target: BaseModule): Seq[ChiselAnnotation] = {
    val name = target.desiredName
    val paramsOpt = getConstructorParamsOpt(target)
    createTywavesChiselAnno(target.toTarget, name, paramsOpt).toSeq
  }

  // TODO: replace ??? with a nice logger to avoid unexpected crashes
  private def createAnno(target: HasId): Seq[ChiselAnnotation] = {
    target match {
      case t: Data           => createAnno(t)
      case t: BaseModule     => createAnno(t)
      case t: MemBase[_]     => Seq.empty
      case t: NamedComponent => Seq.empty
      case t: VecLike[_]     => Seq.empty
      case t if t.isInstanceOf[DynamicObject] => Seq.empty
      case t if t.isInstanceOf[StaticObject]  => Seq.empty
    }
  }
  // TODO: check all the cases for Arg
  private def createAnno(target: Arg): Seq[ChiselAnnotation] = {
    target match {
      case t @ Node(id)                            => createAnno(id)
      case t @ ModuleIO(mod, name)                 => Seq.empty
      case t @ ILit(n)                             => Seq.empty
      case t @ Ref(name)                           => Seq.empty
      case t @ PropertyLit(propertyType, lit)      => Seq.empty
      case t @ PropExpr(sourceInfo, tpe, op, args) => Seq.empty
      case t @ Slot(imm, name)                     => Seq.empty
      case t @ ProbeExpr(probe)                    => Seq.empty
      case t @ ProbeRead(probe)                    => Seq.empty
      case t @ RWProbeExpr(probe)                  => Seq.empty
      case t @ Index(imm, value)                   => Seq.empty
      case t @ ModuleCloneIO(mod, name)            => Seq.empty
      case t @ OpaqueSlot(imm)                     => Seq.empty
      case t: Component => Seq.empty
      case t: LitArg    => Seq.empty // Ignore
      case t =>
        println(s"Unknown Arg type: $t")
        Seq.empty
    }

  }

}
