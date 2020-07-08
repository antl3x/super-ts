import { isFailure } from './Functions';
import type { Validationλ } from './Validation';

export { chain, chainU };

/**
 * TODO: Add comment
 * 
 * chain :: (b -> c) -> Validation b -> Validation c
 */
const chain = <A, B, C>(p1:  (b: B) => Validationλ<A, C>) =>
  (p2: Validationλ<A, B>): Validationλ<A, C> =>

  chainU (p1, p2)


  /**
 * TODO: Add comment
 * 
 * chain :: (b -> c) -> Validation b -> Validation c
 */
const chainU = <A, B, C>(p1: (b: B) => Validationλ<A, C>, p2: Validationλ<A, B>): Validationλ<A, C> =>
  
  isFailure (p2) ? p2 :  p1 (p2.λ.value);