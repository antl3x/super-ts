import { HKT1, Types1, Kind1, Types2, Kind2 } from '@hkt';

interface Functor<Type> {
  λ: {
    readonly kind: Type;
    readonly map: <A, B>(
      p1: (a: A) => B
    ) => (p2: HKT1<Type, A>) => HKT1<Type, B>;
  };
}

interface FunctorOf1<Type extends Types1> {
  λ: {
    readonly kind: Type;
    readonly map: <A, B>(p1: (a: A) => B)
      => (p2: Kind1<Type, A>)
      => Kind1<Type, B>;
  };
  λU: {
    readonly kind: Type;
    readonly map: <A, B>(p1: (a: A) => B, p2: Kind1<Type, A>) => Kind1<Type, B>;
  };
}

interface FunctorOf2<Type extends Types2> {
  λ: {
    readonly kind: Type;
    readonly map: <A, B, C>(p1: (b: B) => C)
      => (p2: Kind2<Type, A, B>)
      => Kind2<Type, A, C>;
  };
  λU: {
    readonly kind: Type;
    readonly map: <A, B, C>(p1: (b: B) => C, p2: Kind2<Type, A, B>) => Kind2<Type, A, C>;
  };
}

export { Functor, FunctorOf1, FunctorOf2 };
