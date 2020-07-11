import { Taskλ } from './Task';
import { of } from './Applicative';

export { chain, chainU };

/**
 * TODO: Add comment
 * 
 * chain :: (a -> b) -> Task a -> Task b
 */
const chain = <A, B>(p1:  (b: A) => Taskλ<B>) =>
  (p2: Taskλ<A>): Taskλ<B> =>

  chainU (p1, p2)


  /**
 * TODO: Add comment
 * 
 * chain :: (a -> b) -> Task a -> Task b
 */
const chainU = <A, B, C>(p1: (b: A) => Taskλ<B>, p2: Taskλ<A>): Taskλ<B> =>
  
  of (p2 ().then (a => p1 (a)).then ())