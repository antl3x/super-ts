import ValidationModule from '@algebraic/types/Validation';
import { Check } from '@runtime/defs';
import { BooleanΔ } from './Boolean';
export { checkInt };

const isBoolean: Check<BooleanΔ> = (a, path) =>
  typeof a === 'boolean'
    ? ValidationModule.λ.Success (a)
    : ValidationModule.λ.Failure ([
        {
          code: 'IS_BOOLEAN',
          message: `Expected boolean but found (${a} :: ${typeof a})`,
          path,
        },
      ]);

const checkInt = isBoolean;
