import type { NonEmptyArrayλ } from '../NonEmptyArray/NonEmptyArray';
import type { Resultλ } from './Result';
import { Result$λ } from './Result';

export { Success as of, Success, Failure };

/**
 * TODO: Add comment
 */
const Success = <A = unknown, B = unknown>(p1: B): Resultλ<A, B> => ({
  λ: {
    id: 'Success',
    kind: Result$λ,
    type: undefined as never,
    value: p1,
  },
});

/**
 * TODO: Add comment
 */
const Failure = <A = unknown, B = unknown>(
  p1: NonEmptyArrayλ<A>
): Resultλ<A, B> => ({
  λ: {
    id: 'Failure',
    kind: Result$λ,
    value: p1,
    type: undefined as never,
  },
});
