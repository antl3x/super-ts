import type { Taskλ } from './Task';

export { ap };

const ap = <A, B>(p1: Taskλ<(a: A) => B>) => (p2: Taskλ<A>): Taskλ<B> =>
  () => Promise.all ([p1 (), p2 ()]).then (([f, r]) => f (r));
