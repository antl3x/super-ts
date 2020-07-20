import Result from '@algebraic/types/Result';
import { Check, Schema } from '@runtime/defs';
import { ArrayΔ } from '../Array';

export { isGreaterThan };

const isGreaterThan = <A extends Schema>(p1: number): Check<ArrayΔ<A>> => (
  a,
  path
) =>
  globalThis.Array.isArray (a) && a.length > p1
    ? Result.λ.Success ([a])
    : Result.λ.Failure ([
        {
          code: 'IS_ARRAY_GREATER_THAN',
          message: `Expected array to be greater than ${p1}.`,
          path,
        },
      ]);
