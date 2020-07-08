import { HKT1, Kind1, Types1, Types2, Kind2 } from '@hkt';
import {
  Applicative,
  ApplicativeOf1,
  ApplicativeOf2
} from './Applicative';
import { Foldable, FoldableOf1 } from './Foldable';
import { Functor, FunctorOf1 } from './Functor';

interface Traversable<Type> extends Functor<Type>, Foldable<Type> {
  λ: {
    readonly kind: Type;
    readonly map: Functor<Type>['λ']['map'];
    readonly reduce: Foldable<Type>['λ']['reduce'];
    readonly foldMap: Foldable<Type>['λ']['foldMap'];
    readonly traverse: Traverse<Type>;
  };
}

interface TraversableOf1<Type extends Types1> extends FunctorOf1<Type>, FoldableOf1<Type> {
  λ: {
    readonly kind: Type;
    readonly map: FunctorOf1<Type>['λ']['map'];
    readonly reduce: FoldableOf1<Type>['λ']['reduce'];
    readonly foldMap: FoldableOf1<Type>['λ']['foldMap'];
    readonly traverse: TraverseOf1<Type>;
  };
}

interface Traverse<Type> {
  <A extends Types2>(p1: ApplicativeOf2<A>): <B, C, D>(p2: (b: B) => Kind2<A, C, D>) => (p3:  HKT1<Type, B>) => Kind2<A, C, HKT1<Type, D>>;
  <A extends Types1>(p1: ApplicativeOf1<A>): <B, C>(p2: (b: B) => Kind1<A, C>) => (p3: HKT1<Type, B>) => Kind1<A, HKT1<Type, C>>;
  <A>(p1: Applicative<A>): <B, C>(p2: (b: B) => HKT1<A, C>) => (p3: HKT1<Type, B>) => HKT1<A, HKT1<Type, C>>;
}

interface TraverseOf1<Type extends Types1> {
  <A extends Types2>(p1: ApplicativeOf2<A>): <B, C, D>(p2: (b: B) => Kind2<A, C, D>) => (p3: Kind1<Type, B>) => Kind2<A, C, Kind1<Type, D>>;
  <A extends Types1>(p1: ApplicativeOf1<A>): <B, C>(p2: (b: B) => Kind1<A, C>) => (p3: Kind1<Type, B>) => Kind1<A, Kind1<Type, C>>;
  <A>(p1: Applicative<A>): <B, C>(p2: (b: B) => HKT1<A, C>) => (p3: Kind1<Type, B>) => HKT1<A, Kind1<Type, C>>;
}


export { Traversable, TraversableOf1 };
