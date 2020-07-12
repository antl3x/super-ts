import { HKT2, Kind2, Types2 } from '@hkt';

interface Bifunctor<Type> {
  λ: {
    readonly kind: Type;
    readonly bimap: <A, B, C, D>(
      p1: (a: A) => C
    ) => (p2: (a: B) => D) => (p3: HKT2<Type, A, B>) => HKT2<Type, C, D>;
  };
}

interface BifunctorOf2<Type extends Types2> {
    λ: {
      readonly kind: Type;
      readonly bimap: <A, B, C, D>(
        p1: (a: A) => C
      ) => (p2: (a: B) => D) => (p3: Kind2<Type, A, B>) => Kind2<Type, C, D>;
    };
    λU: {
      readonly kind: Type;
      readonly bimap: <A, B, C, D>(
        p1: (a: A) => C,
        p2: (a: B) => D,
        p3: Kind2<Type, A, B>
      ) => Kind2<Type, C, D>;
    };
  }

export { Bifunctor, BifunctorOf2 };
