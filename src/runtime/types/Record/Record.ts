import { Checkable, Childable, Schema, TypeOf } from '@runtime/defs';
import { checkInt } from './Checkable';

export { RecordΔ, RecordΔ$ };
const RecordΔ$ = Symbol ('Record');
type RecordΔ$ = typeof RecordΔ$;

/**
 * TODO: Add comment
 */
type RecordΔ<A extends { [key: string]: Schema }> = Schema<
  RecordΔ$,
  { [K in keyof A]: TypeOf<A[K]> }
> &
  Checkable<RecordΔ<A>> &
  Childable<A>;

const Record = <A extends { [key: string]: Schema }>(child: A): RecordΔ<A> => ({
  _: {
    type: RecordΔ$,
    primitive: undefined as any,
    child,
    checkInt: (a, path) => checkInt (a, path, child),
  },
  Δ: {
    check: (a) => checkInt (a, '', child),
  },
});

export default Record;
