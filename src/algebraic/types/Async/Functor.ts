import type { Asyncλ } from './Async';
import { of } from './Applicative';

export { map, mapU };

/**
 * TODO: Add comment
 * 
 *  map :: (a -> b) -> Async a -> Async b
 */
const map = <A, B>(p1: (b: A) => B) =>
  (p2: Asyncλ<A>): Asyncλ<B> =>

  mapU (p1, p2)


/**
 * TODO: Add comment
 * 
 *  map :: (a -> b) -> Async a -> Async b
 */
const mapU = <A, B>(p1: (b: A) => B, p2: Asyncλ<A>): Asyncλ<B> =>

  () => p2 ().then (p1);