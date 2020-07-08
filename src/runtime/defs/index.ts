import { Validationλ } from "@algebraic/types/Validation/Validation";
export {
  Schema,
  TypeOf,
  Check,
  InvalidCheck,
  Childable,
  Checkable,
  CheckableWith,
};

interface Schema<Type = any, Primitive = any> {
  type: Type;
  primitive: Primitive;
}

interface Childable<Child> {
  child: Child;
}

type TypeOf<A extends Schema> = A["primitive"];

interface Checkable<A extends Schema> {
  check: (a: unknown) => Validationλ<InvalidCheck, TypeOf<A>>;
  checkInt: Check<A>;
}

interface CheckableWith<A extends Schema> {
  check: (a: unknown) => Validationλ<InvalidCheck, TypeOf<A>>;
  checkWith: (a: Check<A>[]) => A;
  checkInt: Check<A>;
}

interface Check<A extends Schema> {
  (a: unknown, path: string, child?: any): Validationλ<InvalidCheck, TypeOf<A>>;
}

interface InvalidCheck {
  message: string;
  path: string;
  code: string;
}
