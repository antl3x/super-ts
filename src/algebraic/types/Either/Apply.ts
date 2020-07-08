import { Left, Right } from './Applicative';
import type { Eitherλ } from './Either';
import { isLeft } from './Functions';

export { ap };

/**
 * TODO: Add comment
 * @param p1 
 */
const ap = <A, B, C>(p1: Eitherλ<A, (a: B) => C>) => (
  p2: Eitherλ<A, B>
): Eitherλ<A, C> =>
  isLeft (p1)
    ? Left (p1.λ.value)
    : isLeft (p2)
    ? Left (p2.λ.value)
    : Right (p1.λ.value (p2.λ.value));

