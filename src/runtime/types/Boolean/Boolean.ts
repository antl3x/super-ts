import { Schema, Checkable } from '@runtime/defs';
import { checkInt } from './Checkable';

export { BooleanΔ, BooleanΔ$ };
const BooleanΔ$ = Symbol ('Boolean');
type BooleanΔ$ = typeof BooleanΔ$;

/**
 * TODO: Add comment
 */
interface BooleanΔ extends Schema<BooleanΔ$, boolean>, Checkable<BooleanΔ> {}

const Boolean: BooleanΔ = {
  type: BooleanΔ$,
  primitive: undefined as any,
  check: (a) => checkInt (a, ''),
  checkInt,
};

export default Boolean;
