import { Failure, Success } from './Applicative';
import { isFailure } from './Functions';
import type { Resultλ } from './Result';

export { ap };

const ap = <A, B, C>(p1: Resultλ<A, (a: B) => C>) => (
  p2: Resultλ<A, B>
): Resultλ<A, C> =>
  isFailure (p1)
    ? isFailure (p2)
    ? Failure (p1.λ.value.concat (p2.λ.value) as any)
    : p1
    : isFailure (p2)
    ? p2
    : Success (p1.λ.value (p2.λ.value));


