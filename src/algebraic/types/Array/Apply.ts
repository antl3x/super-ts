import { flatten } from './Functions';
export { ap };

/**
 * TODO: Add comment
 * 
 * ap :: Array (a -> b) -> Array a -> Array b
 */
const ap = <A, B>(p1: Array<(a: A) => B>) =>
    (p2: Array<A>): Array<B> => 
    
    flatten (p1.map (r1 => p2.map (r2  => r1 (r2))));