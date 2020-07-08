import { Schema, CheckableWith, Check } from '@runtime/defs';
import { checkInt } from './Checkable';

export { NumberΔ, NumberΔ$ };
const NumberΔ$ = Symbol ('Number');
type NumberΔ$ = typeof NumberΔ$;

/**
 * TODO: Add comment
 */
type NumberΔ = Schema<NumberΔ$, number> & CheckableWith<NumberΔ>;

const Number = (withChecks?: Check<NumberΔ>[]): NumberΔ => ({
  _: {
    type: NumberΔ$,
    primitive: undefined as any,
    checkInt: checkInt (withChecks),
  },
  Δ: {
    check: (a) => checkInt (withChecks) (a, ''),
    checkWith: Number
  }
});

export default Number ();
