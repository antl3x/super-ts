import  type { Maybeλ } from './Maybe';
import { Just, Nothing } from './Applicative';
import { isNothing } from './Functions';

export { map, mapU };

/**
 * TODO: Add comment
 * 
 *  map :: (a -> b) -> Maybe a -> Maybe b
 */
const map = <A, B>(p1: (a: A) => B) =>
  (p2: Maybeλ<A>): Maybeλ<B> =>
  
  mapU (p1, p2)

/**
 * TODO: Add comment
 * 
 *  map :: (a -> b) -> Maybe a -> Maybe b
 */
const mapU = <A, B>(p1: (a: A) => B, p2: Maybeλ<A>): Maybeλ<B> =>

  isNothing (p2) ? Nothing : Just (p1 (p2.λ.value));
