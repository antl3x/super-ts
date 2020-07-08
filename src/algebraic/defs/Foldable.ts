import { HKT1, Types1, Kind1, Types2, Kind2 } from '@hkt';
import { Monoid } from './Monoid';

interface Foldable<Type> {
  λ: {
    readonly kind: Type;
    
    readonly reduce: <A, B>(p1: (a: A, b: B) => A)
      => (p2: A)
      => (p3: HKT1<Type, B>)
      => A;

    readonly foldMap: <A>(p1: Monoid<A>)
      => <B>(p2: (b: B) => A)
      => (p3: HKT1<Type, B>)
      => A;
  };
}

interface FoldableOf1<Type extends Types1> {
  λ: {
    readonly kind: Type;

    readonly reduce: <A, B>(p1: (a: A, b: B) => A)
      => (p2: A) 
      => (p3: Kind1<Type, B>)
      => A;
    
    readonly foldMap: <A>(p1: Monoid<A>)
      => <B>(p2: (b: B) => A)
      => (p3: Kind1<Type, B>)
      => A;
  };
}

interface FoldableOf2<Type extends Types2> {
  λ: {
    readonly kind: Type;

    readonly reduce: <A, B, C>(p1: (a: A, b: B) => A)
      => (p2: A)
      => (p3: Kind2<Type, A, B>)
      => C;
    
    readonly foldMap: <A>(p1: Monoid<A>)
      => <B, C>(p2: (c: C) => A)
      => (p3: Kind2<Type, B, C>)
      => A;
  };
}

export { Foldable, FoldableOf1, FoldableOf2 };
