import type { Eitherλ, Rightλ, Leftλ } from './Either';
import EitherModule from '.';
import { Resultλ } from '../Result/Result';
import { NonEmptyArrayλ } from '@algebraic/types/NonEmptyArray/NonEmptyArray';
import ResultModule from '../Result';
import { pipe } from '@algebraic/common/pipe';
import { chain } from './Chain';
import { map } from './Functor';
import { bindTo as cBindTo } from '@algebraic/common/bindTo';
import { bindOf as cBindOf } from '@algebraic/common/bindOf';

export {
  isLeft,
  isRight,
  fold,
  foldUnion,
  mapLeft,
  mapLeftU,
  fromResult,
  bindTo,
  bindToStrict,
  bindOf,
};

/**
 * TODO: Add comment
 * @param p1
 */
const isLeft = <A, B>(p1: Eitherλ<A, B>): p1 is Leftλ<A> => p1.λ.id === 'Left';

/**
 * TODO: Add comment
 * @param p1
 */
const isRight = <A, B>(p1: Eitherλ<A, B>): p1 is Rightλ<B> =>
  p1.λ.id === 'Right';

/**
 * TODO: Add comment
 * @param p1
 */
const fold = <A, B, C>(onLeft: (a: A) => C, onRight: (b: B) => C) => (
  p1: Eitherλ<A, B>
) => (isLeft (p1) ? onLeft (p1.λ.value) : onRight (p1.λ.value));

/**
 * TODO: Add comment
 * @param p1
 */
const foldUnion = <A, B>(p1: Eitherλ<A, B>): A | B => p1.λ.value;

/**
 * TODO: Add comment
 * @param p1
 */
const mapLeft = <A, B, C>(p1: (a: A) => C) => (
  p2: Eitherλ<A, B>
): Eitherλ<C, B> => mapLeftU (p1, p2);

/**
 * TODO: Add comment
 * @param p1
 */
const mapLeftU = <A, B, C>(p1: (a: A) => C, p2: Eitherλ<A, B>): Eitherλ<C, B> =>
  isLeft (p2) ? EitherModule.λ.Left (p1 (p2.λ.value)) : p2;

/**
 * TODO: Add comment
 * @param p1
 */
const fromResult = <A, B>(p1: Resultλ<A, B>): Eitherλ<NonEmptyArrayλ<A>, B> =>
  ResultModule.λ.isFailure (p1)
    ? EitherModule.λ.Left (p1.λ.value)
    : EitherModule.λ.Right (p1.λ.value);

/**
 * TODO: Add comment
 */
const bindTo = <Property extends string, Previous, A, B>(
  p1: Exclude<Property, keyof Previous>,
  p2: <Param extends Previous>(a: Param) => Eitherλ<A, B>
) => <C>(
  p3: Eitherλ<C, Previous>
): Eitherλ<
  A | C,
  {
    [K in keyof Previous | Property]: K extends keyof Previous
      ? Previous[K]
      : B;
  }
> =>
  pipe (
    p3,
    chain ((a) =>
      pipe (
        p2 (a),
        map ((b) => cBindTo (a, p1, b))
      )
    )
  );

/**
 * TODO: Add comment
 */
const bindToStrict = <Property extends string, Previous, A, B>(
  p1: Exclude<Property, keyof Previous>,
  p2: <Param extends Previous>(a: Param) => Eitherλ<A, B>
) => (
  p3: Eitherλ<A, Previous>
): Eitherλ<
  A,
  {
    [K in keyof Previous | Property]: K extends keyof Previous
      ? Previous[K]
      : B;
  }
> => bindTo (p1, p2) (p3);

/**
 * TODO: Add comment
 */
const bindOf = <Property extends string, Value, A>(p1: Property) => (
  p2: Eitherλ<A, Value>
): Eitherλ<A, { [K in Property]: Value }> =>
  pipe (
    p2,
    map ((a) => cBindOf (p1, a))
  );
