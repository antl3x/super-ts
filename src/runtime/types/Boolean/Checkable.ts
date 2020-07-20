import ResultModule from '@algebraic/types/Result';
import { Check } from '@runtime/defs';
import { BooleanΔ } from './Boolean';
export { checkInt };

const isBoolean: Check<BooleanΔ> = (a, path) =>
  typeof a === 'boolean'
    ? ResultModule.λ.Success (a)
    : ResultModule.λ.Failure ([
        {
          code: 'IS_BOOLEAN',
          message: `Expected boolean but found (${a} :: ${typeof a})`,
          path,
        },
      ]);

const checkInt = isBoolean;
