import type { Taskλ } from './Task';
import { of } from './Applicative';

export { map, mapU };

/**
 * TODO: Add comment
 * 
 *  map :: (a -> b) -> Task a -> Task b
 */
const map = <A, B>(p1: (b: A) => B) =>
  (p2: Taskλ<A>): Taskλ<B> =>

  mapU (p1, p2)


/**
 * TODO: Add comment
 * 
 *  map :: (a -> b) -> Task a -> Task b
 */
const mapU = <A, B>(p1: (b: A) => B, p2: Taskλ<A>): Taskλ<B> =>

  of (p2 ().then (p1));