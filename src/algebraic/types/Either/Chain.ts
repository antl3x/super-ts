import { isLeft } from './Functions';
import type { Eitherλ } from './Either';

export { chainStrict, chainStrictU, chain, chainU };

/**
 * TODO: Add comment
 * 
 * chainStrict :: (b -> c) -> Either b -> Either c
 */
const chainStrict = <A, B, C>(p1:  (b: B) => Eitherλ<A, C>) =>
  (p2: Eitherλ<A, B>): Eitherλ<A, C> =>

  chainStrictU (p1, p2)

/**
 * TODO: Add comment
 * 
 * chainStrictU :: (b -> c) -> Either b -> Either c
 */
const chainStrictU = <A, B, C>(p1: (b: B) => Eitherλ<A, C>, p2: Eitherλ<A, B>): Eitherλ<A, C> =>
  
  chainU (p1, p2)

/**
 * TODO: Add comment 
 */
const chain = <A, B, C, D>(p1: (b: B) => Eitherλ<A, C>) => (p2: Eitherλ<D, B>): Eitherλ<A | D, C> =>
  
  chainU (p1, p2)

/**
 * TODO: Add comment
 */
const chainU = <A, B, C, D>(p1: (b: B) => Eitherλ<A, C>, p2: Eitherλ<D, B>): Eitherλ<A | D, C> =>
  
  isLeft (p2) ? p2 : p1 (p2.λ.value)