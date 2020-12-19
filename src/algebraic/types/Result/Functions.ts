import type { Failureλ, Successλ, Resultλ } from './Result';
import { NonEmptyArrayλ } from '@algebraic/types/NonEmptyArray/NonEmptyArray';
import { pipe } from '@algebraic/common/pipe';
import { chain } from './Chain';
import { map } from './Functor';
import { bindTo as cBindTo } from '@algebraic/common/bindTo';
import { bindOf as cBindOf } from '@algebraic/common/bindOf';

export {
  isFailure,
  isSuccess,
  isSuccessOf,
  fold,
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
const isFailure = <A, B>(p1: Resultλ<A, B>): p1 is Failureλ<A> =>
  p1.λ.id === 'Failure';

/**
 * TODO: Add comment
 * @param p1
 */
const isSuccess = <A, B>(p1: Resultλ<A, B>): p1 is Successλ<B> =>
  p1.λ.id === 'Success';

/**
 * TODO: Add comment
 * @param p1
 */
const isSuccessOf = <A, B>(p1: Resultλ<A, B>, p2: any): p1 is Successλ<B> =>
  isSuccess (p1) && (p1 as any).λ.value.toString () === p2.toString ();

/**
 * TODO: Add comment
 * @param p1
 */
const fold = <A, B, C, D>(
  onFailure: (a: NonEmptyArrayλ<A>) => C,
  onSucess: (b: B) => D
) => (p1: Resultλ<A, B>) =>
  isFailure (p1) ? onFailure (p1.λ.value) : onSucess (p1.λ.value);

/**
 * TODO: Add comment
 * @param p1
 */
const foldStrict = <A, B, C>(
  onFailure: (a: NonEmptyArrayλ<A>) => C,
  onSucess: (b: B) => C
) => (p1: Resultλ<A, B>) =>
  isFailure (p1) ? onFailure (p1.λ.value) : onSucess (p1.λ.value);

/**
 * TODO: Add comment
 */
const bindTo = <Property extends string, Previous, A, B>(
  p1: Exclude<Property, keyof Previous>,
  p2: <Param extends Previous>(a: Param) => Resultλ<A, B>
) => <C>(
  p3: Resultλ<C, Previous>
): Resultλ<
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
  p2: <Param extends Previous>(a: Param) => Resultλ<A, B>
) => (
  p3: Resultλ<A, Previous>
): Resultλ<
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
  p2: Resultλ<A, Value>
): Resultλ<A, { [K in Property]: Value }> =>
  pipe (
    p2,
    map ((a) => cBindOf (p1, a))
  );

/**
 * TODO: Add comment
 */
const chainFirst = <A, B, C>(p1: (b: B) => Resultλ<A, C>) => <D>(
  p2: Resultλ<D, B>
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
  p1: (b: B) => Resultλ<A, C>
) => (p2: Resultλ<A, B>) => Resultλ<A, B> = chainFirst;

/**
 * TODO: Add comment
 */
export const getOrElse = <A, B>(onFailure: (a: NonEmptyArrayλ<A>) => B) => <C>(
  p2: Resultλ<A, C>
): C | B => (isFailure (p2) ? onFailure (p2.λ.value) : p2.λ.value);

/**
 * TODO: Add comment
 */
export const getOrElseStrict: <A, B>(
  onFailure: (a: NonEmptyArrayλ<A>) => B
) => (p2: Resultλ<A, B>) => B = getOrElse;

/**
 * TODO: Add comment
 */
export const orElse = <A, B, C>(onFailure: (a: NonEmptyArrayλ<A>) => Resultλ<C, B>) => (p2: Resultλ<A, B>): Resultλ<C, B> => (isFailure (p2) ? onFailure (p2.λ.value) : p2)
