import type { Asyncλ } from './Async';

export { ap };

const ap = <A, B>(p1: Asyncλ<(a: A) => B>) => (p2: Asyncλ<A>): Asyncλ<B> =>
  () => Promise.all ([p1 (), p2 ()]).then (([f, r]) => f (r));
