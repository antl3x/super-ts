import { Failure, Success } from './Applicative';
import { isFailure } from './Functions';
import type { Validationλ } from './Validation';

export { ap };

const ap = <A, B, C>(p1: Validationλ<A, (a: B) => C>) => (
  p2: Validationλ<A, B>
): Validationλ<A, C> =>
  isFailure (p1)
    ? isFailure (p2)
    ? Failure (p1.λ.value.concat (p2.λ.value) as any)
    : p1
    : isFailure (p2)
    ? p2
    : Success (p1.λ.value (p2.λ.value));


