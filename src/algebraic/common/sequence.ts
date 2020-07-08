import { ApplicativeOf1, ApplicativeOf2 } from '@algebraic/defs/Applicative';
import { ApplyOf1, ApplyOf2 } from '@algebraic/defs/Apply';
import { Kind1, Kind2, Types1, Types2 } from '@hkt';

/**
 * TODO: Add Comment
 */

function sequence<A extends Types1>(
  p1: ApplicativeOf1<A> & ApplyOf1<A>
): <B>(p2: Array<Kind1<A, B>>) => Kind1<A, Array<B>>;

function sequence<A extends Types2>(
  p1: ApplicativeOf2<A> & ApplyOf2<A>
): <B, C>(p2: Array<Kind2<A, B, C>>) => Kind2<A, B, Array<C>>;

function sequence<A extends Types1>(
  adtModule: ApplicativeOf1<A> & ApplyOf1<A>
) {
  return function <B>(adtInstances: Array<Kind1<A, B>>): Kind1<A, Array<B>> {
    return adtInstances.reduce (
      (pv, cv) =>
        adtModule.λ.ap (adtModule.λ.map ((as: B[]) => (b: B) => [...as, b]) (pv)) (
          cv
        ),
      adtModule.λ.of<B[]> ([])
    );
  };
}

export { sequence };
