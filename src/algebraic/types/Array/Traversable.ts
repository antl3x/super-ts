import { HKT1 } from "@hkt";
import { Applicative } from "@algebraic/defs/Applicative";

/**
 * TODO: Add comment
 *
 * traverse :: (Applicative f, Traversable t) => TypeRep f -> (a -> f b) -> t a -> f (t b)
 */
const traverse = <A, B, C>(p1: Applicative<A>) => (
  p2: (b: B) => HKT1<A, C>
) => (p3: Array<B>): HKT1<A, Array<C>> => {
  const initialValue = p1.λ.of<C[]>([]);
  const mapToApply = (pv: HKT1<A, C[]>) =>
    p1.λ.map<C[], (b: C) => C[]>((c1) => (c2) => [...c1, c2])(pv);
  const callbackFn = (pv: HKT1<A, C[]>, cv: B) =>
    p1.λ.ap(mapToApply(pv))(p2(cv));

  return p3.reduce(callbackFn, initialValue);
};

export { traverse };
