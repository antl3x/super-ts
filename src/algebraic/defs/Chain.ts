import { Kind1, Types1, Types2, Kind2 } from '@hkt';
import { ApplyOf2, ApplyOf1 } from './Apply';


interface ChainOf1<Type extends Types1> extends ApplyOf1<Type> {
  λ: {
    readonly kind: Type;
    readonly map: ApplyOf1<Type>['λ']['map'];
    readonly ap: ApplyOf1<Type>['λ']['ap'];
    readonly chain: <A, B>(p1: (a: A) => Kind1<Type, B>)
      => (p2: Kind1<Type, A>)
      => Kind1<Type, B>;
  };
  λU: {
    readonly kind: Type;
    readonly map: ApplyOf1<Type>['λU']['map'];
    readonly chain: <A, B>(p1: (a: A) => Kind1<Type, B>, p2: Kind1<Type, A>) => Kind1<Type, B>;
  };
}

interface ChainOf2<Type extends Types2> extends ApplyOf2<Type> {
  λ: {
    readonly kind: Type;
    readonly map: ApplyOf2<Type>['λ']['map'];
    readonly ap: ApplyOf2<Type>['λ']['ap'];
    readonly chain: <A, B, C>(p1: (b: B) => Kind2<Type, A, C>)
      => (p2: Kind2<Type, A, B>)
      => Kind2<Type, A, C>;
  };
  λU: {
    readonly kind: Type;
    readonly map: ApplyOf2<Type>['λU']['map'];
    readonly chain: <A, B, C>(p1: (b: B) => Kind2<Type, A, C>, p2: Kind2<Type, A, B>) => Kind2<Type, A, C>;
  };
}


export { ChainOf1, ChainOf2 };
