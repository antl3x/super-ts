import type { Eitherλ } from './Either';
import { Left, Right } from './Applicative';
import { isLeft } from './Functions';

export { map, mapU };

/**
 * TODO: Add comment
 * 
 * map :: (b -> c) -> Either b -> Either c
 */
const map = <A, B, C>(p1: (b: B) => C) =>
  (p2: Eitherλ<A, B>): Eitherλ<A, C> => 
  
  mapU (p1, p2)

/**
 * TODO: Add comment
 * 
 * map :: (b -> c) -> Either b -> Either c
 */
const mapU = <A, B, C>(p1: (b: B) => C, p2: Eitherλ<A, B>): Eitherλ<A, C> =>
  
  isLeft (p2) ? Left (p2.λ.value) : Right (p1 (p2.λ.value));

