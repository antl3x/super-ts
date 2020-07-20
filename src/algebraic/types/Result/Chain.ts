import { isFailure } from './Functions';
import type { Resultλ } from './Result';

export { chain, chainU };

/**
 * TODO: Add comment
 * 
 * chain :: (b -> c) -> Result b -> Result c
 */
const chain = <A, B, C>(p1:  (b: B) => Resultλ<A, C>) =>
  (p2: Resultλ<A, B>): Resultλ<A, C> =>

  chainU (p1, p2)


  /**
 * TODO: Add comment
 * 
 * chain :: (b -> c) -> Result b -> Result c
 */
const chainU = <A, B, C>(p1: (b: B) => Resultλ<A, C>, p2: Resultλ<A, B>): Resultλ<A, C> =>
  
  isFailure (p2) ? p2 :  p1 (p2.λ.value);