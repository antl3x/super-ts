import type { Resultλ } from '@algebraic/types/Result/Result';
import type { AsyncResultλ } from './AsyncResult';
import Result from '@algebraic/types/Result';
import Async from '@algebraic/types/Async';

export { ap };

const ap = <A, B, C>(p1: AsyncResultλ<A, (a: B) => C>) => (
  p2: AsyncResultλ<A, B>
): AsyncResultλ<A, C> =>
  Async.λ.ap (
    Async.λ.map ((h: Resultλ<A, (a: B) => C>) => (ga: Resultλ<A, B>) =>
      Result.λ.ap<A, B, C> (h) (ga)
    ) (p1)
  ) (p2);
