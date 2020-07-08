import { Schema, Childable, Checkable } from '@runtime/defs';
import { checkInt } from './Checkable';

export { LiteralΔ, LiteralΔ$, LiteralPrimitivesΔ$, Null, Undefined };
const LiteralΔ$ = Symbol ('Literal');
type LiteralΔ$ = typeof LiteralΔ$;
type LiteralPrimitivesΔ$ = undefined | null | boolean | number | string;

/**
 * TODO: Add comment
 */
interface LiteralΔ<A extends LiteralPrimitivesΔ$>
  extends Schema<LiteralΔ$, A>,
    Checkable<LiteralΔ<A>>,
    Childable<A> {}

const Literal = <A extends LiteralPrimitivesΔ$>(child: A): LiteralΔ<A> => ({
  type: LiteralΔ$,
  primitive: undefined as any,
  child,
  check: (a) => checkInt (a, '', child),
  checkInt: (a, path) => checkInt (a, path, child),
});

const Null = Literal (null);
const Undefined = Literal (undefined);

export default Literal;
