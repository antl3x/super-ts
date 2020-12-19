import { AsyncEitherλ } from './AsyncEither';
import { isFailure } from '@algebraic/types/Result/Functions';
import AsyncEitherModule from '.';
import { Resultλ } from '@algebraic/types/Result/Result';
import { NonEmptyArrayλ } from '@algebraic/types/NonEmptyArray/NonEmptyArray';
import EitherModule from '../Either';
import { Asyncλ } from '../Async/Async';
import AsyncModule from '../Async';
import { pipe } from '@algebraic/common/pipe';
import { chain } from './Chain';
import { map, mapU } from './Functor';
import { bindTo as cBindTo } from '@algebraic/common/bindTo';
import { bindOf as cBindOf } from '@algebraic/common/bindOf';
import { Eitherλ } from '../Either/Either';
import { isLeft } from '../Either/Functions';
import { AsyncResultλ } from '../AsyncResult/AsyncResult';

export {
  fromResult,
  fromEither,
  fold,
  foldUnion,
  tryCatch,
  mapLeft,
  bindTo,
  bindToStrict,
  bindOf,
  chainFirst,
  chainFirstStrict,
};

/**
 * TODO: Add comment
 * @param p1
 */
const fromResult = <A, B>(
  p1: Resultλ<A, B>
): AsyncEitherλ<NonEmptyArrayλ<A>, B> =>
  isFailure (p1)
    ? AsyncEitherModule.λ.Left (p1.λ.value)
    : AsyncEitherModule.λ.Right (p1.λ.value);

/**
 * TODO: Add comment
 * @param p1
 */
const fromEither = <A, B>(p1: Eitherλ<A, B>): AsyncEitherλ<A, B> =>
  isLeft (p1)
    ? AsyncEitherModule.λ.Left (p1.λ.value)
    : AsyncEitherModule.λ.Right (p1.λ.value);

/**
 * TODO: Add comment
 * @param p1
 */
const fold = <A, B, C>(onLeft: (a: A) => C, onRight: (b: B) => C) => (
  p1: AsyncEitherλ<A, B>
): Asyncλ<C> => () => p1 ().then (EitherModule.λ.fold (onLeft, onRight));

/**
 * TODO: Add comment
 * @param p1
 */
const foldUnion = <A, B>(p1: AsyncEitherλ<A, B>): Asyncλ<A | B> => () =>
  p1 ().then (EitherModule.λ.foldUnion);

/**
 * TODO: Add comment
 */
const tryCatch = <A, B>(
  p1: () => Promise<B>,
  onRejected: (reason: unknown) => A
): AsyncEitherλ<A, B> => () =>
  p1 ().then (EitherModule.λ.Right, (reason) =>
    EitherModule.λ.Left (onRejected (reason))
  );

/**
 * TODO: Add comment
 */
const mapLeft = <A, B, C>(p1: (a: A) => C) => (
  p2: AsyncEitherλ<A, B>
): AsyncEitherλ<C, B> => AsyncModule.λU.map (EitherModule.λ.mapLeft (p1), p2);

/**
 * TODO: Add comment
 */
const bindTo = <Property extends string, Previous, A, B>(
  p1: Exclude<Property, keyof Previous>,
  p2: <Param extends Previous>(a: Param) => AsyncEitherλ<A, B>
) => <C>(
  p3: AsyncEitherλ<C, Previous>
): AsyncEitherλ<
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
  p2: <Param extends Previous>(a: Param) => AsyncEitherλ<A, B>
) => (
  p3: AsyncEitherλ<A, Previous>
): AsyncEitherλ<
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
  p2: AsyncEitherλ<A, Value>
): AsyncEitherλ<A, { [K in Property]: Value }> =>
  mapU ((a) => cBindOf (p1, a), p2);

/**
 * TODO: Add comment
 */
const chainFirst = <A, B, C>(p1: (b: B) => AsyncEitherλ<A, C>) => <D>(
  p2: AsyncEitherλ<D, B>
) =>
  pipe (
    p2,
    chain ((b) =>
      pipe (
        p1 (b),
        map (() => b)
      )
    )
  );

/**
 * TODO: Add comment
 */
const chainFirstStrict: <A, B, C>(
  p1: (b: B) => AsyncEitherλ<A, C>
) => (p2: AsyncEitherλ<A, B>) => AsyncEitherλ<A, B> = chainFirst;

/**
 * TODO: Add comment
 */
export const getOrElse = <A, B>(onLeft: (a: A) => Asyncλ<B>) => <C>(p2: AsyncEitherλ<A, C>): Asyncλ<C | B> =>
  pipe (
    p2,
    AsyncModule.λ.chain (
      EitherModule.λ.fold<A, C, Asyncλ<C | B>> (onLeft, AsyncModule.λ.of)
      )
    )

/**
 * TODO: Add comment
 */
export const getOrElseStrict: <A, B>(onLeft: (a: A) => Asyncλ<B>) => (p2: AsyncEitherλ<A, B>) => Asyncλ<B> = getOrElse