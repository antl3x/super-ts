import { Checkable, Childable, Schema, TypeOf } from '@runtime/defs';
import { checkInt } from './Checkable';

export { PartialΔ, PartialΔ$ };
const PartialΔ$ = Symbol ('Partial');
type PartialΔ$ = typeof PartialΔ$;

/**
 * TODO: Add comment
 */
interface PartialΔ<A extends { [key: string]: Schema }>
  extends Schema<PartialΔ$, { [K in keyof A]?: TypeOf<A[K]> }>,
    Checkable<PartialΔ<A>>,
    Childable<A> {}

const Partial = <A extends { [key: string]: Schema }>(
  child: A
): PartialΔ<A> => ({
  type: PartialΔ$,
  primitive: undefined as any,
  child,
  check: (a) => checkInt (a, '', child),
  checkInt: (a, path) => checkInt (a, path, child),
});

export default Partial;
