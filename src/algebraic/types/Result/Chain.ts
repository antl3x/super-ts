import { isFailure } from './Functions';
import type { Resultλ } from './Result';

export { chainStrict, chainStrictU, chain, chainU };

/**
 * TODO: Add comment
 * 
 * chainStrict :: (b -> c) -> Result b -> Result c
 */
const chainStrict = <A, B, C>(p1:  (b: B) => Resultλ<A, C>) =>
  (p2: Resultλ<A, B>): Resultλ<A, C> =>

  chainStrictU (p1, p2)

/**
 * TODO: Add comment
 * 
 * chainStrictU :: (b -> c) -> Result b -> Result c
 */
const chainStrictU = <A, B, C>(p1: (b: B) => Resultλ<A, C>, p2: Resultλ<A, B>): Resultλ<A, C> =>
  
  chainU (p1, p2)

/**
 * TODO: Add comment 
 */
const chain = <A, B, C, D>(p1: (b: B) => Resultλ<A, C>) => (p2: Resultλ<D, B>): Resultλ<A | D, C> =>
  
  chainU (p1, p2)

/**
 * TODO: Add comment
 */
const chainU = <A, B, C, D>(p1: (b: B) => Resultλ<A, C>, p2: Resultλ<D, B>): Resultλ<A | D, C> =>
  
  isFailure (p2) ? p2 : p1 (p2.λ.value)