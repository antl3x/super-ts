import { Nothing } from './Applicative';
import { isNothing } from './Functions';
import { Maybeλ } from './Maybe';

export { chain, chainU };

/**
 * TODO: Add comment
 * 
 * chain :: (a -> b) -> Maybe a -> Maybe b
 */
const chain = <A, B>(p1:  (b: A) => Maybeλ<B>) =>
  (p2: Maybeλ<A>): Maybeλ<B> =>

  chainU (p1, p2)


  /**
 * TODO: Add comment
 * 
 * chain :: (a -> b) -> Maybe a -> Maybe b
 */
const chainU = <A, B, C>(p1: (b: A) => Maybeλ<B>, p2: Maybeλ<A>): Maybeλ<B> =>
  
  isNothing (p2) ? Nothing :  p1 (p2.λ.value)