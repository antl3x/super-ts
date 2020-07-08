import { Check } from '@runtime/defs';
import { StringΔ } from './String';
import ValidationModule from '@algebraic/types/Validation';
import rPipe from 'ramda/src/pipe';
import { sequence } from '@algebraic/common/sequence';
export { checkInt };

const isString: Check<StringΔ> = (a, path) =>
  typeof a === 'string'
    ? ValidationModule.λ.Success (a)
    : ValidationModule.λ.Failure ([
        {
          code: 'IS_STRING',
          message: `Expected string but found (${a} :: ${typeof a})`,
          path,
        },
      ]);

const doWithChecks = rPipe (
  (payload: unknown, path: string, withChecks: Check<StringΔ>[]) =>
    sequence (ValidationModule) (withChecks.map ((check) => check (payload, path))),
  ValidationModule.λ.map ((s) => s[0])
);

const checkInt = (withChecks?: Check<StringΔ>[]) => (
  a: unknown,
  path: string
) =>
  rPipe (
    () => isString (a, path),
    (res) =>
      withChecks && res.λ.id === 'Success'
        ? doWithChecks (a, path, withChecks)
        : isString (a, path)
  ) ();
