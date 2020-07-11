import type { Taskλ } from './Task';

export { of };

/**
 * TODO: Add comment
 */
const of = <A>(p1: A): Taskλ<A> => () => Promise.resolve (p1);
