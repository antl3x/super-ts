import type { Eitherλ, Rightλ, Leftλ } from './Either';

export { isLeft, isRight, fold };

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


/**
 * TODO: Add comment
 * @param p1
 */
const fold = <A, B, C>(
  onLeft: (a: A) => C,
  onRight: (b: B) => C
) => (p1: Eitherλ<A, B>) =>
  isLeft (p1) ? onLeft (p1.λ.value) : onRight (p1.λ.value);
