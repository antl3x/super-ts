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
type ArrayΔ<A extends Schema, IsReadOnly extends boolean = false> = Schema<
  ArrayΔ$,
  IsReadOnly extends true ? readonly TypeOf<A>[] : TypeOf<A>[]
> &
  CheckableWith<ArrayΔ<A, IsReadOnly>> &
  Childable<A> & {
    _: {
      isReadOnly?: IsReadOnly;
    };
    Δ: { 
      asReadOnly: () => ArrayΔ<A, true>;
    };
  };

const Array = <
  A extends Schema & Checkable<A>,
  IsReadOnly extends boolean = false
>(
  child: A,
  isReadOnly = false as IsReadOnly,
  withChecks?: Check<ArrayΔ<A, IsReadOnly>>[]
): ArrayΔ<A, IsReadOnly> => ({
  _: {
    type: ArrayΔ$,
    primitive: undefined as any,
    child,
    isReadOnly,
    checkInt: checkInt (child, isReadOnly, withChecks),
  },
  Δ: {
    check: (a) => checkInt (child, isReadOnly, withChecks) (a, ''),
    checkWith: (p1) => Array (child, isReadOnly, p1),
    asReadOnly: () =>
      Array (child, true, withChecks as Check<ArrayΔ<A, true>>[] | undefined),
  },
});

export default Array;
