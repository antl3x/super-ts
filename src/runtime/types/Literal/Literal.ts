import { Schema, Childable, Checkable } from '@runtime/defs';
import { checkInt } from './Checkable';

export { LiteralΔ, LiteralΔ$, LiteralPrimitivesΔ$, Null, Undefined };
const LiteralΔ$ = Symbol ('Literal');
type LiteralΔ$ = typeof LiteralΔ$;
type LiteralPrimitivesΔ$ = undefined | null | boolean | number | string;

/**
 * TODO: Add comment
 */
type LiteralΔ<A extends LiteralPrimitivesΔ$> =
  Schema<LiteralΔ$, A> &
    Checkable<LiteralΔ<A>> &
    Childable<A>

const Literal = <A extends LiteralPrimitivesΔ$>(child: A): LiteralΔ<A> => ({
  _: {
    type: LiteralΔ$,
    primitive: undefined as any,
    child,
    checkInt: (a, path) => checkInt (a, path, child),
  },
  Δ: {
    check: (a) => checkInt (a, '', child)
  }
});

const Null = Literal (null);
const Undefined = Literal (undefined);

export default Literal;
