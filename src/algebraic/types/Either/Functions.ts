import type { Eitherλ, Rightλ, Leftλ } from './Either';

export { isLeft, isRight };

/**
 * TODO: Add comment
 * @param p1
 */
const isLeft = <A, B>(p1: Eitherλ<A, B>): p1 is Leftλ<A, B> =>
  p1.λ.id === 'Left';

/**
 * TODO: Add comment
 * @param p1
 */
const isRight = <A, B>(p1: Eitherλ<A, B>): p1 is Rightλ<A, B> =>
  p1.λ.id === 'Right';



