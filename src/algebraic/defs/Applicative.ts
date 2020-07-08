import { HKT1, Kind1, Kind2, Types1, Types2 } from '@hkt';
import { Apply, ApplyOf1, ApplyOf2 } from './Apply';

interface Applicative<Type> extends Apply<Type> {
  λ: {
    readonly kind: Type;
    readonly of: <A>(a: A) => HKT1<Type, A>;
    readonly ap: Apply<Type>['λ']['ap'];
    readonly map: Apply<Type>['λ']['map'];
  };
}

interface ApplicativeOf1<Type extends Types1> extends ApplyOf1<Type> {
  λ: {
    readonly kind: Type;
    readonly of: <A>(a: A) => Kind1<Type, A>;
    readonly ap: ApplyOf1<Type>['λ']['ap'];
    readonly map: ApplyOf1<Type>['λ']['map'];
  };
}

interface ApplicativeOf2<Type extends Types2> extends ApplyOf2<Type> {
  λ: {
    readonly kind: Type;
    readonly of: <A, B>(a: B) => Kind2<Type, A, B>;
    readonly ap: ApplyOf2<Type>['λ']['ap'];
    readonly map: ApplyOf2<Type>['λ']['map'];
  };
}

export { Applicative, ApplicativeOf1, ApplicativeOf2 };
