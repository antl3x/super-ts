import { Schema, Checkable } from '@runtime/defs';
import { checkInt } from './Checkable';

export { BooleanΔ, BooleanΔ$ };
const BooleanΔ$ = Symbol ('Boolean');
type BooleanΔ$ = typeof BooleanΔ$;

/**
 * TODO: Add comment
 */
type BooleanΔ = Schema<BooleanΔ$, boolean> & Checkable<BooleanΔ>;

const Boolean: BooleanΔ = {
  _: {
    type: BooleanΔ$,
    primitive: undefined as any,
    checkInt
  },
  Δ: {
    check: (a) => checkInt (a, ''),
  }
}

export default Boolean;
