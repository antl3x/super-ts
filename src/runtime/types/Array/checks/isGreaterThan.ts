import Validation from '@algebraic/types/Validation';
import { Check, Schema } from '@runtime/defs';
import { ArrayΔ } from '../Array';

export { isGreaterThan };

const isGreaterThan = <A extends Schema>(p1: number): Check<ArrayΔ<A>> => (
  a,
  path
) =>
  globalThis.Array.isArray (a) && a.length > p1
    ? Validation.λ.Success ([a])
    : Validation.λ.Failure ([
        {
          code: 'IS_ARRAY_GREATER_THAN',
          message: `Expected array to be greater than ${p1}.`,
          path,
        },
      ]);
