import { Monoid } from "@algebraic/defs/Monoid";

export { reduce, foldMap };

/**
 * TODO: Add comment
 *
 * reduce :: (b -> a -> b) -> b -> Array a -> b
 */

const reduce = <A, B>(p1: (b: B, a: A) => B) => (p2: B) => (p3: Array<A>): B =>
  p3.reduce(p1, p2);

/**
 * TODO: Add comment
 *
 * foldMap :: (Monoid a) => TypeRep a -> (b -> a) -> Array b -> a
 */

const foldMap = <A>(p1: Monoid<A>) => <B>(p2: (b: B) => A) => (
  p3: Array<B>
): A => p3.reduce((pv, cv) => p1.λ.concat(pv)(p2(cv)), p1.λ.empty);
