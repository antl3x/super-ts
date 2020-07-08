import { Schema, TypeOf, Childable, Checkable, Check } from '@runtime/defs';
import { checkInt } from './Checkable';

export { RecordΔ, RecordΔ$ };
const RecordΔ$ = Symbol ('Record');
type RecordΔ$ = typeof RecordΔ$;

/**
 * TODO: Add comment
 */
interface RecordΔ<A extends { [key: string]: Schema }>
  extends Schema<RecordΔ$, { [K in keyof A]: TypeOf<A[K]> }>,
    Checkable<RecordΔ<A>>,
    Childable<A> {}

const Record = <A extends { [key: string]: Schema }>(child: A): RecordΔ<A> => ({
  type: RecordΔ$,
  primitive: undefined as any,
  child,
  check: (a) => checkInt (a, '', child),
  checkInt: (a, path) => checkInt (a, path, child),
});

export default Record;
