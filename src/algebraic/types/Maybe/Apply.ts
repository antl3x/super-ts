import type { Maybeλ } from './Maybe';
import { isNothing } from './Functions';
import { Nothing, Just } from './Applicative';

export { ap };

const ap = <A, B>(p1: Maybeλ<(a: A) => B>) => (p2: Maybeλ<A>): Maybeλ<B> =>
  isNothing (p1)
    ? Nothing
    : isNothing (p2)
    ? Nothing
    : Just (p1.λ.value (p2.λ.value));
