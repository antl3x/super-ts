import { Check } from '@runtime/defs';
import { StringΔ } from './String';
import ResultModule from '@algebraic/types/Result';
import rPipe from 'ramda/src/pipe';
import { sequence } from '@algebraic/common/sequence';
export { checkInt };

const isString: Check<StringΔ> = (a, path) =>
  typeof a === 'string'
    ? ResultModule.λ.Success (a)
    : ResultModule.λ.Failure ([
        {
          code: 'IS_STRING',
          message: `Expected string but found (${a} :: ${typeof a})`,
          path,
        },
      ]);

const doWithChecks = rPipe (
  (payload: unknown, path: string, withChecks: Check<StringΔ>[]) =>
    sequence (ResultModule) (withChecks.map ((check) => check (payload, path))),
  ResultModule.λ.map ((s) => s[0])
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
