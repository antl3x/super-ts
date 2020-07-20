import { Check } from '@runtime/defs';
import { NumberΔ } from '../Number';
import Result from '@algebraic/types/Result';

export { isGreaterThan };

const isGreaterThan = (p1: number): Check<NumberΔ> => (a, path) =>
  typeof a === 'number' && a > p1
    ? Result.λ.Success (a)
    : Result.λ.Failure ([
        {
          code: 'IS_NUMBER_GREATER_THAN',
          message: `Expected number to be greater than ${p1}.`,
          path,
        },
      ]);
