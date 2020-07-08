import { of } from './Applicative';
import type { Taskλ } from './Task';

export { ap };

const ap = <A, B>(p1: Taskλ<(a: A) => B>) => (p2: Taskλ<A>): Taskλ<B> =>
  of (Promise.all ([p1.λ.value (), p2.λ.value ()]).then (([f, r]) => f (r)));
