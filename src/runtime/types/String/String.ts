import { Schema, CheckableWith, Check } from '@runtime/defs';
import { checkInt } from './Checkable';

export { StringΔ, StringΔ$ };
const StringΔ$ = Symbol ('String');
type StringΔ$ = typeof StringΔ$;

/**
 * TODO: Add comment
 */
interface StringΔ extends Schema<StringΔ$, string>, CheckableWith<StringΔ> {}

const String = (withChecks?: Check<StringΔ>[]): StringΔ => ({
  type: StringΔ$,
  primitive: undefined as any,
  check: (a) => checkInt (withChecks) (a, ''),
  checkWith: String,
  checkInt: checkInt (withChecks),
});

export default String ();
