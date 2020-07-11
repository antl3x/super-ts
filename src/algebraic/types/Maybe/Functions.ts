import type { Justλ, Maybeλ, Nothingλ } from './Maybe';
import { Nothing, Just } from './Applicative';

export { isNothing, isJust, fromMaybe, fromNullable };

/**
 * TODO: Add comment
 * @param p1
 */
const isNothing = <A>(p1: Maybeλ<A>): p1 is Nothingλ => p1.λ.id === 'Nothing';

/**
 * TODO: Add comment
 * @param p1
 */
const isJust = <A>(p1: Maybeλ<A>): p1 is Justλ<A> => p1.λ.id === 'Just';

/**
 * TODO: Add Comment
 * @param p1 
 */
const fromNullable = <A>(a: A): Maybeλ<NonNullable<A>> => a == null ? Nothing : Just (a as NonNullable<A>)


const fromMaybe = <A>(p1: A) => (p2: Maybeλ<A>): A =>
  isNothing (p2) ? p1 : p2.λ.value;
