import type { Taskλ } from './Task';
import { Task$λ } from './Task';

export { of };

/**
 * TODO: Add comment
 */
const of = <A>(p1: A | PromiseLike<A>): Taskλ<A> => ({
  λ: {
    kind: Task$λ,
    id: Task$λ,
    typeA: undefined as any,
    value: (): Promise<A> => Promise.resolve (p1),
  },
});
