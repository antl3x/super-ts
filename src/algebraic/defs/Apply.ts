import { HKT1, Kind1, Kind2, Types1, Types2 } from '@hkt';
import { Functor, FunctorOf1, FunctorOf2 } from './Functor';

interface Apply<Type> extends Functor<Type> {
  λ: {
    readonly kind: Type;
    readonly map: Functor<Type>['λ']['map'];
    readonly ap: <A, B>(
      p1: HKT1<Type, (a: A) => B>
    ) => (p2: HKT1<Type, A>) => HKT1<Type, B>;
  };
}

interface ApplyOf1<Type extends Types1> extends FunctorOf1<Type> {
  λ: {
    readonly kind: Type;
    readonly map: FunctorOf1<Type>['λ']['map'];
    readonly ap: <A, B>(
      p1: Kind1<Type, (a: A) => B>
    ) => (p2: Kind1<Type, A>) => Kind1<Type, B>;
  };
}

interface ApplyOf2<Type extends Types2> extends FunctorOf2<Type> {
  λ: {
    readonly kind: Type;
    readonly map: FunctorOf2<Type>['λ']['map'];
    readonly ap: <A, B, C>(
      p1: Kind2<Type, A, (a: B) => C>
    ) => (p2: Kind2<Type, A, B>) => Kind2<Type, A, C>;
  };
}

export { Apply, ApplyOf1, ApplyOf2 };
