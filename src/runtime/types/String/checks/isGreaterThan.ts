import { Check } from '@runtime/defs';
import { StringΔ } from '../String';
import Validation from '@algebraic/types/Validation';

export { isGreaterThan };

const isGreaterThan = (p1: number): Check<StringΔ> => (a, path) =>
  typeof a === 'string' && a.length > p1
    ? Validation.λ.Success (a)
    : Validation.λ.Failure ([
        {
          code: 'IS_STRING_GREATER_THAN',
          message: `Expected string to be greater than ${p1}.`,
          path,
        },
      ]);
