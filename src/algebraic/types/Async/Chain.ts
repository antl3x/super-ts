import { Asyncλ } from './Async';
import { of } from './Applicative';

export { chain, chainU };

/**
 * TODO: Add comment
 * 
 * chain :: (a -> b) -> Async a -> Async b
 */
const chain = <A, B>(p1:  (b: A) => Asyncλ<B>) =>
  (p2: Asyncλ<A>): Asyncλ<B> =>

  chainU (p1, p2)


  /**
 * TODO: Add comment
 * 
 * chain :: (a -> b) -> Async a -> Async b
 */
const chainU = <A, B, C>(p1: (b: A) => Asyncλ<B>, p2: Asyncλ<A>): Asyncλ<B> =>
  
  () => p2 ().then (a => p1 (a) ())