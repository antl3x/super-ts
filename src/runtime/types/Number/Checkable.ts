import { Check } from '@runtime/defs';
import { NumberΔ } from './Number';
import ValidationModule from '@algebraic/types/Validation';
import rPipe from 'ramda/src/pipe';
import { sequence } from '@algebraic/common/sequence';
export { checkInt };

const isNumber: Check<NumberΔ> = (a, path) =>
  typeof a === 'number'
    ? ValidationModule.λ.Success (a)
    : ValidationModule.λ.Failure ([
        {
          code: 'IS_NUMBER',
          message: `Expected Number but found (${a} :: ${typeof a})`,
          path,
        },
      ]);

const doWithChecks = rPipe (
  (payload: unknown, path: string, withChecks: Check<NumberΔ>[]) =>
    sequence (ValidationModule) (withChecks.map ((check) => check (payload, path))),
  ValidationModule.λ.map ((s) => s[0])
);

const checkInt = (withChecks?: Check<NumberΔ>[]) => (
  a: unknown,
  path: string
) =>
  rPipe (
    () => isNumber (a, path),
    (res) =>
      withChecks && res.λ.id === 'Success'
        ? doWithChecks (a, path, withChecks)
        : isNumber (a, path)
  ) ();
