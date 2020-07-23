import { ChainOf1, ChainOf2 } from '@algebraic/defs/Chain';
import { Kind1, Types1, Types2, Kind2 } from '@hkt';

/**
 * TODO: Add Comment
 * Tap is an Usafe Operation that performs side effects.
 * It's recommend only for DEBUG purposes.
 */

function tap<A extends Types1>(
  p1: ChainOf1<A>
): <B>(p2: (b: B) => any) => (p3: Kind1<A, B>) => Kind1<A, B>;

function tap<A extends Types2>(
    p1: ChainOf2<A>
  ): <B, C>(p2: (c: C) => any) => (p3: Kind2<A, B, C>) => Kind2<A, B, C>;

  
function tap<A extends Types1>(
    p1: ChainOf1<A>
) {
  return function <B>(p2: (b: B) => any) {
      return function (p3: Kind1<A, B>): Kind1<A, B> {
        return p1.λU.map ((a) => {
            p2 (a)
            return a;
        }, p3)
      }
  };
}

export { tap };

