type HKT1<ID, TypeA> = {
  λ: {
    kind: ID;
    typeA: TypeA;
  };
};

type HKT2<ID, TypeA, TypeB> = HKT1<
  ID,
  TypeA
> & {
  λ: {
    typeB: TypeB;
  };
};

interface Type2Kind1<A> {}
interface Type2Kind2<A, B> {}

type Types1 = keyof Type2Kind1<any>;
type Types2 = keyof Type2Kind2<any, any>;
type Types = Types1 | Types2;

type Kind1<Type extends Types1, A> = Type extends Types1
  ? Type2Kind1<A>[Type]
  : any;
type Kind2<Type extends Types2, A, B> = Type extends Types2
  ? Type2Kind2<A, B>[Type]
  : any;

export {
  Types,
  Types1,
  Types2,
  Type2Kind1,
  Type2Kind2,
  HKT1,
  HKT2,
  Kind1,
  Kind2,
};
