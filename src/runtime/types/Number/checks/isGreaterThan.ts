import { Check } from '@runtime/defs';
import { NumberΔ } from '../Number';
import Validation from '@algebraic/types/Validation';

export { isGreaterThan };

const isGreaterThan = (p1: number): Check<NumberΔ> => (a, path) =>
  typeof a === 'number' && a > p1
    ? Validation.λ.Success (a)
    : Validation.λ.Failure ([
        {
          code: 'IS_NUMBER_GREATER_THAN',
          message: `Expected number to be greater than ${p1}.`,
          path,
        },
      ]);
