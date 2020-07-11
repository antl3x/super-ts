import { isLeft } from './Functions';
import type { Eitherλ } from './Either';

export { chain, chainU };

/**
 * TODO: Add comment
 * 
 * chain :: (b -> c) -> Either b -> Either c
 */
const chain = <A, B, C>(p1:  (b: B) => Eitherλ<A, C>) =>
  (p2: Eitherλ<A, B>): Eitherλ<A, C> =>

  chainU (p1, p2)


  /**
 * TODO: Add comment
 * 
 * chain :: (b -> c) -> Either b -> Either c
 */
const chainU = <A, B, C, D>(p1: (b: B) => Eitherλ<C, D>, p2: Eitherλ<A, B>): Eitherλ<A | C, D> =>
  
  isLeft (p2) ? p2 : p1 (p2.λ.value)