import { Schema, CheckableWith, Check } from '@runtime/defs';
import { checkInt } from './Checkable';

export { StringΔ, StringΔ$ };
const StringΔ$ = Symbol ('String');
type StringΔ$ = typeof StringΔ$;

/**
 * TODO: Add comment
 */
type StringΔ = Schema<StringΔ$, string> & CheckableWith<StringΔ>;

const String = (withChecks?: Check<StringΔ>[]): StringΔ => ({
  _: {
    type: StringΔ$,
    primitive: undefined as any,
    checkInt: checkInt (withChecks)
  },
  Δ: {
  check: (a) => checkInt (withChecks) (a, ''),
  checkWith: String
  }
});

export default String ();
