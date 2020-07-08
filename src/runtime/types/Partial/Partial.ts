import { Checkable, Childable, Schema, TypeOf } from '@runtime/defs';
import { checkInt } from './Checkable';

export { PartialΔ, PartialΔ$ };
const PartialΔ$ = Symbol ('Partial');
type PartialΔ$ = typeof PartialΔ$;

/**
 * TODO: Add comment
 */
type PartialΔ<A extends { [key: string]: Schema }> = Schema<
  PartialΔ$,
  { [K in keyof A]?: TypeOf<A[K]> }
> &
  Checkable<PartialΔ<A>> &
  Childable<A>;

const Partial = <A extends { [key: string]: Schema }>(
  child: A
): PartialΔ<A> => ({
  _: {
    type: PartialΔ$,
    primitive: undefined as any,
    child,
    checkInt: (a, path) => checkInt (a, path, child),
  },
  Δ: {
    check: (a) => checkInt (a, '', child),
  },
});

export default Partial;
