import { Resultλ } from '@algebraic/types/Result/Result';
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
  _: {
    type: Type;
    primitive: Primitive;
  };
}

interface Childable<Child> {
  _: {
    child: Child;
  };
}

type TypeOf<A extends Schema> = A['_']['primitive'];

interface Checkable<A extends Schema> {
  _: {
    checkInt: Check<A>;
  };
  Δ: {
    check: (a: unknown) => Resultλ<InvalidCheck, TypeOf<A>>;
  };
}

interface CheckableWith<A extends Schema> {
  _: {
    checkInt: Check<A>;
  };
  Δ: {
    check: (a: unknown) => Resultλ<InvalidCheck, TypeOf<A>>;
    checkWith: (a: Check<A>[]) => A;
  };
}

interface Check<A extends Schema> {
  (a: unknown, path: string, child?: any): Resultλ<InvalidCheck, TypeOf<A>>;
}

interface InvalidCheck {
  message: string;
  path: string;
  code: string;
}
