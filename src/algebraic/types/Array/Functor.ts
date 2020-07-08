export { map, mapU };

/**
 * TODO: Add comment
 * 
 * map :: (a -> b) -> Array a -> Array b
 */
const map = <A, B>(p1: (a: A) => B) => 
    (p2: Array<A>): Array<B> =>
    
    mapU (p1, p2)

/**
 * TODO: Add comment
 * 
 * map :: (a -> b) -> Array a -> Array b
 */
const mapU = <A, B>(p1: (a: A) => B, p2: Array<A>): Array<B> =>
    
    p2.map (p1);

