import { Maybeλ } from '../Maybe/Maybe'
import { Arrayλ } from './Array'
import Maybe from '../Maybe'

export { flatten, head, isEmpty }

/**
 * TODO: Add comment
 * 
 * flatten :: Array Array a -> Array a
 */
const flatten = <A>(p1: Array<Array<A>>): Array<A> => 

    ([] as Array<A>).concat (...p1)

/**
 * TODO: Add comment
 * 
 * head :: Array a -> Maybe a
 */
const head = <A>(p1: Arrayλ<A>): Maybeλ<A> => 

    isEmpty (p1) 
        ? Maybe.λ.Nothing 
        : Maybe.λ.Just (p1[0])

/**
 * TODO: Add comment
 * 
 * head :: Array a -> Maybe a
 */
const isEmpty = <A>(p1: Arrayλ<A>): boolean => p1.length === 0;