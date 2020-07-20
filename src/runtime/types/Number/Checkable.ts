import { Check } from '@runtime/defs';
import { NumberΔ } from './Number';
import ResultModule from '@algebraic/types/Result';
import rPipe from 'ramda/src/pipe';
import { sequence } from '@algebraic/common/sequence';
export { checkInt };

const isNumber: Check<NumberΔ> = (a, path) =>
  typeof a === 'number'
    ? ResultModule.λ.Success (a)
    : ResultModule.λ.Failure ([
        {
          code: 'IS_NUMBER',
          message: `Expected Number but found (${a} :: ${typeof a})`,
          path,
        },
      ]);

const doWithChecks = rPipe (
  (payload: unknown, path: string, withChecks: Check<NumberΔ>[]) =>
    sequence (ResultModule) (withChecks.map ((check) => check (payload, path))),
  ResultModule.λ.map ((s) => s[0])
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
