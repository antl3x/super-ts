import type { NonEmptyArrayλ } from '../NonEmptyArray/NonEmptyArray';
import { Failure, Success } from './Applicative';
import { isFailure } from './Functions';
import type { Resultλ } from './Result';

export { map, mapU, mapFailure };

/**
 * TODO: Add comment
 *
 * map :: (b -> c) -> Result b -> Result c
 */
const map = <A, B, C>(p1: (b: B) => C) => (
  p2: Resultλ<A, B>
): Resultλ<A, C> => mapU (p1, p2);

/**
 * TODO: Add comment
 *
 * map :: (b -> c) -> Result b -> Result c
 */
const mapU = <A, B, C>(
  p1: (b: B) => C,
  p2: Resultλ<A, B>
): Resultλ<A, C> =>
  isFailure (p2) ? Failure (p2.λ.value) : Success (p1 (p2.λ.value));

/**
 * TODO: Add comment
 */
const mapFailure = <A, B, C>(
  p1: (b: NonEmptyArrayλ<A>) => NonEmptyArrayλ<C>
) => (p2: Resultλ<A, B>): Resultλ<C, B> =>
  isFailure (p2) ? Failure (p1 (p2.λ.value)) : Success (p2.λ.value);
