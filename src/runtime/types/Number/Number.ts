import { Schema, CheckableWith, Check } from '@runtime/defs';
import { checkInt } from './Checkable';

export { NumberΔ, NumberΔ$ };
const NumberΔ$ = Symbol ('Number');
type NumberΔ$ = typeof NumberΔ$;

/**
 * TODO: Add comment
 */
interface NumberΔ extends Schema<NumberΔ$, number>, CheckableWith<NumberΔ> {}

const Number = (withChecks?: Check<NumberΔ>[]): NumberΔ => ({
  type: NumberΔ$,
  primitive: undefined as any,
  check: (a) => checkInt (withChecks) (a, ''),
  checkWith: Number,
  checkInt: checkInt (withChecks),
});

export default Number ();
