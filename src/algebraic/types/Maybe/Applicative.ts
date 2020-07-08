
import { Maybe$λ } from './Maybe';
import type { Maybeλ } from './Maybe';

export { Just as of, Just, Nothing };

/**
 * TODO: Add comment
 */
const Just = <A>(p1: A): Maybeλ<A> => ({
  λ: {
    id: 'Just',
    kind: Maybe$λ,
    typeA: undefined as any,
    value: p1,
  },
});

/**
 * TODO: Add comment
 */
const Nothing: Maybeλ<never> = {
  λ: {
    id: 'Nothing',
    kind: Maybe$λ,
    typeA: undefined as never,
  }
};

