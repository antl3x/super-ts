import { NonEmptyArrayλ } from './NonEmptyArray';

export { map, mapU };

/**
 * TODO: Add comment
 * 
 * map :: (a -> b) -> NonEmptyArray a -> NonEmptyArray b
 */
const map = <A, B>(p1: (a: A) => B) => 
    (p2: NonEmptyArrayλ<A>): NonEmptyArrayλ<B> =>

    mapU (p1, p2)


/**
 * TODO: Add comment
 * 
 * map :: (a -> b) -> NonEmptyArray a -> NonEmptyArray b
 */
const mapU = <A, B>(p1: (a: A) => B, p2: NonEmptyArrayλ<A>): NonEmptyArrayλ<B> =>

    p2.map (p1) as NonEmptyArrayλ<B>;
