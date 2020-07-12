import type { NonEmptyArrayλ } from '../NonEmptyArray/NonEmptyArray';
import { Failure, Success } from './Applicative';
import { isFailure } from './Functions';
import type { Validationλ } from './Validation';

export { map, mapU, mapFailure };

/**
 * TODO: Add comment
 *
 * map :: (b -> c) -> Validation b -> Validation c
 */
const map = <A, B, C>(p1: (b: B) => C) => (
  p2: Validationλ<A, B>
): Validationλ<A, C> => mapU (p1, p2);

/**
 * TODO: Add comment
 *
 * map :: (b -> c) -> Validation b -> Validation c
 */
const mapU = <A, B, C>(
  p1: (b: B) => C,
  p2: Validationλ<A, B>
): Validationλ<A, C> =>
  isFailure (p2) ? Failure (p2.λ.value) : Success (p1 (p2.λ.value));

/**
 * TODO: Add comment
 */
const mapFailure = <A, B, C>(
  p1: (b: NonEmptyArrayλ<A>) => NonEmptyArrayλ<C>
) => (p2: Validationλ<A, B>): Validationλ<C, B> =>
  isFailure (p2) ? Failure (p1 (p2.λ.value)) : Success (p2.λ.value);
