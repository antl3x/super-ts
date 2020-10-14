import { AsyncResultλ } from './AsyncResult';
import { isFailure } from '@algebraic/types/Result/Functions';
import AsyncEitherModule from '.';
import { Resultλ } from '@algebraic/types/Result/Result';
import { NonEmptyArrayλ } from '@algebraic/types/NonEmptyArray/NonEmptyArray';
import Result from '../Result';
import { Asyncλ } from '../Async/Async';
import AsyncModule from '../Async';
import { pipe } from '@algebraic/common/pipe';
import { chain } from './Chain';
import { map, mapU } from './Functor';
import { bindTo as cBindTo } from '@algebraic/common/bindTo';
import { bindOf as cBindOf } from '@algebraic/common/bindOf';
import { Eitherλ } from '../Either/Either';
import { isLeft } from '../Either/Functions';

export {
  fromResult,
  fromEither,
  fold,
  foldStrict,
  tryCatch,
  mapFailure,
  bindTo,
  bindToStrict,
  bindOf,
};

/**
 * TODO: Add comment
 * @param p1
 */
const fromResult = <A, B>(p1: Resultλ<A, B>): AsyncResultλ<A, B> =>
  isFailure (p1)
    ? AsyncEitherModule.λ.Failure (p1.λ.value)
    : AsyncEitherModule.λ.Success (p1.λ.value);

/**
 * TODO: Add comment
 * @param p1
 */
const fromEither = <A, B>(p1: Eitherλ<A, B>): AsyncResultλ<A, B> =>
  isLeft (p1)
    ? AsyncEitherModule.λ.Failure ([p1.λ.value])
    : AsyncEitherModule.λ.Success (p1.λ.value);

/**
 * TODO: Add comment
 * @param p1
 */
const fold = <A, B, C, D>(
  onLeft: (a: NonEmptyArrayλ<A>) => C,
  onRight: (b: B) => D
) => (p1: AsyncResultλ<A, B>): Asyncλ<C | D> => () =>
  p1 ().then (Result.λ.fold (onLeft, onRight));

/**
 * TODO: Add comment
 * @param p1
 */
const foldStrict = <A, B, C>(
  onLeft: (a: NonEmptyArrayλ<A>) => C,
  onRight: (b: B) => C
) => (p1: AsyncResultλ<A, B>): Asyncλ<C> => () =>
  p1 ().then (Result.λ.fold (onLeft, onRight));

/**
 * TODO: Add comment
 */
const tryCatch = <A, B>(
  p1: () => Promise<B>,
  onRejected: (reason: unknown) => A
): AsyncResultλ<A, B> => () =>
  p1 ().then (Result.λ.Success, (reason) =>
    Result.λ.Failure ([onRejected (reason)])
  );

/**
 * TODO: Add comment
 */
const mapFailure = <A, B, C>(
  p1: (a: NonEmptyArrayλ<A>) => NonEmptyArrayλ<C>
) => (p2: AsyncResultλ<A, B>): AsyncResultλ<C, B> =>
  AsyncModule.λU.map (Result.λ.mapFailure (p1), p2);

/**
 * TODO: Add comment
 */
const bindTo = <Property extends string, Previous, A, B>(
  p1: Exclude<Property, keyof Previous>,
  p2: <Param extends Previous>(a: Param) => AsyncResultλ<A, B>
) => <C>(
  p3: AsyncResultλ<C, Previous>
): AsyncResultλ<
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
  p2: <Param extends Previous>(a: Param) => AsyncResultλ<A, B>
) => (
  p3: AsyncResultλ<A, Previous>
): AsyncResultλ<
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
  p2: AsyncResultλ<A, Value>
): AsyncResultλ<A, { [K in Property]: Value }> =>
  mapU ((a) => cBindOf (p1, a), p2);
