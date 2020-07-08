import type { Eitherλ } from './Either';
import { Either$λ } from './Either';

export { Right as of, Right, Left };

/**
 * TODO: Add comment
 */
const Right = <A = unknown, B = unknown>(p1: B): Eitherλ<A, B> => ({
  λ: {
    id: 'Right',
    kind: Either$λ,
    typeA: undefined as any,
    typeB: undefined as any,
    value: p1,
  },
});

/**
 * TODO: Add comment
 */
const Left = <A = unknown, B = unknown>(p1: A): Eitherλ<A, B> => ({
  λ: {
    id: 'Left',
    kind: Either$λ,
    typeA: undefined as any,
    typeB: undefined as any,
    value: p1,
  },
});

