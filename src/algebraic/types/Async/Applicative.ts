import type { Asyncλ } from './Async';

export { of };

/**
 * TODO: Add comment
 */
const of = <A>(p1: A): Asyncλ<A> => () => Promise.resolve (p1);
