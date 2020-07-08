import {
  Schema,
  TypeOf,
  Childable,
  Checkable,
  Check,
  CheckableWith,
} from '@runtime/defs';
import { checkInt } from './Checkable';
import { String } from '@runtime/types/String';

export { ArrayΔ, ArrayΔ$ };
const ArrayΔ$ = Symbol ('Array');
type ArrayΔ$ = typeof ArrayΔ$;

/**
 * TODO: Add comment
 */
interface ArrayΔ<A extends Schema, IsReadOnly extends boolean = false>
  extends Schema<
      ArrayΔ$,
      IsReadOnly extends true ? readonly TypeOf<A>[] : TypeOf<A>[]
    >,
    CheckableWith<ArrayΔ<A, IsReadOnly>>,
    Childable<A> {
  isReadOnly?: IsReadOnly;
  asReadOnly: () => ArrayΔ<A, true>;
}

const Array = <
  A extends Schema & Checkable<A>,
  IsReadOnly extends boolean = false
>(
  child: A,
  isReadOnly = false as IsReadOnly,
  withChecks?: Check<ArrayΔ<A, IsReadOnly>>[]
): ArrayΔ<A, IsReadOnly> => ({
  type: ArrayΔ$,
  primitive: undefined as any,
  child,
  check: (a) => checkInt (child, isReadOnly, withChecks) (a, ''),
  checkInt: checkInt (child, isReadOnly, withChecks),
  checkWith: (p1) => Array (child, isReadOnly, p1),
  asReadOnly: () =>
    Array (child, true, withChecks as Check<ArrayΔ<A, true>>[] | undefined),
  isReadOnly,
});

const isRo = Array (String).asReadOnly ();
type X = TypeOf<typeof isRo>;

export default Array;
