import { Checkable, Childable, Schema, TypeOf } from '@runtime/defs';
import { checkInt } from './Checkable';

export { UnionΔ, UnionΔ$, UnionPrimitiveΔ$ };
const UnionΔ$ = Symbol ('Union');
type UnionΔ$ = typeof UnionΔ$;

/**
 * TODO: Add comment
 */
type UnionΔ<A extends (Schema & Checkable<Schema>)[]> = Schema<
  UnionΔ$,
  UnionPrimitiveΔ$<A>
> &
  Checkable<UnionΔ<A>> &
  Childable<A>;

const Union = <A extends (Schema & Checkable<Schema>)[]>(
  ...child: A
): UnionΔ<A> => ({
  _: {
    type: UnionΔ$,
    primitive: undefined as any,
    child,
    checkInt: checkInt (child),
  },
  Δ: {
    check: (a) => checkInt (child) (a, ''),
  },
});

type S = Schema;
type UnionPrimitiveΔ$<A> = A extends [
  infer U1,
  infer U2,
  infer U3,
  infer U4,
  infer U5,
  infer U6,
  infer U7,
  infer U8,
  infer U9,
  infer U10
]
  ? U1 extends S
    ? U2 extends S
      ? U3 extends S
        ? U4 extends S
          ? U5 extends S
            ? U6 extends S
              ? U7 extends S
                ? U8 extends S
                  ? U9 extends S
                    ? U10 extends S
                      ?
                          | TypeOf<U1>
                          | TypeOf<U2>
                          | TypeOf<U3>
                          | TypeOf<U4>
                          | TypeOf<U5>
                          | TypeOf<U6>
                          | TypeOf<U7>
                          | TypeOf<U8>
                          | TypeOf<U9>
                          | TypeOf<U10>
                      : unknown
                    : unknown
                  : unknown
                : unknown
              : unknown
            : unknown
          : unknown
        : unknown
      : unknown
    : unknown
  : A extends [
      infer U1,
      infer U2,
      infer U3,
      infer U4,
      infer U5,
      infer U6,
      infer U7,
      infer U8,
      infer U9
    ]
  ? U1 extends S
    ? U2 extends S
      ? U3 extends S
        ? U4 extends S
          ? U5 extends S
            ? U6 extends S
              ? U7 extends S
                ? U8 extends S
                  ? U9 extends S
                    ?
                        | TypeOf<U1>
                        | TypeOf<U2>
                        | TypeOf<U3>
                        | TypeOf<U4>
                        | TypeOf<U5>
                        | TypeOf<U6>
                        | TypeOf<U7>
                        | TypeOf<U8>
                        | TypeOf<U9>
                    : unknown
                  : unknown
                : unknown
              : unknown
            : unknown
          : unknown
        : unknown
      : unknown
    : unknown
  : A extends [
      infer U1,
      infer U2,
      infer U3,
      infer U4,
      infer U5,
      infer U6,
      infer U7,
      infer U8
    ]
  ? U1 extends S
    ? U2 extends S
      ? U3 extends S
        ? U4 extends S
          ? U5 extends S
            ? U6 extends S
              ? U7 extends S
                ? U8 extends S
                  ?
                      | TypeOf<U1>
                      | TypeOf<U2>
                      | TypeOf<U3>
                      | TypeOf<U4>
                      | TypeOf<U5>
                      | TypeOf<U6>
                      | TypeOf<U7>
                      | TypeOf<U8>
                  : unknown
                : unknown
              : unknown
            : unknown
          : unknown
        : unknown
      : unknown
    : unknown
  : A extends [
      infer U1,
      infer U2,
      infer U3,
      infer U4,
      infer U5,
      infer U6,
      infer U7
    ]
  ? U1 extends S
    ? U2 extends S
      ? U3 extends S
        ? U4 extends S
          ? U5 extends S
            ? U6 extends S
              ? U7 extends S
                ?
                    | TypeOf<U1>
                    | TypeOf<U2>
                    | TypeOf<U3>
                    | TypeOf<U4>
                    | TypeOf<U5>
                    | TypeOf<U6>
                    | TypeOf<U7>
                : unknown
              : unknown
            : unknown
          : unknown
        : unknown
      : unknown
    : unknown
  : A extends [infer U1, infer U2, infer U3, infer U4, infer U5, infer U6]
  ? U1 extends S
    ? U2 extends S
      ? U3 extends S
        ? U4 extends S
          ? U5 extends S
            ? U6 extends S
              ?
                  | TypeOf<U1>
                  | TypeOf<U2>
                  | TypeOf<U3>
                  | TypeOf<U4>
                  | TypeOf<U5>
                  | TypeOf<U6>
              : unknown
            : unknown
          : unknown
        : unknown
      : unknown
    : unknown
  : A extends [infer U1, infer U2, infer U3, infer U4, infer U5]
  ? U1 extends S
    ? U2 extends S
      ? U3 extends S
        ? U4 extends S
          ? U5 extends S
            ? TypeOf<U1> | TypeOf<U2> | TypeOf<U3> | TypeOf<U4> | TypeOf<U5>
            : unknown
          : unknown
        : unknown
      : unknown
    : unknown
  : A extends [infer U1, infer U2, infer U3, infer U4]
  ? U1 extends S
    ? U2 extends S
      ? U3 extends S
        ? U4 extends S
          ? TypeOf<U1> | TypeOf<U2> | TypeOf<U3> | TypeOf<U4>
          : unknown
        : unknown
      : unknown
    : unknown
  : A extends [infer U1, infer U2, infer U3]
  ? U1 extends S
    ? U2 extends S
      ? U3 extends S
        ? TypeOf<U1> | TypeOf<U2> | TypeOf<U3>
        : unknown
      : unknown
    : unknown
  : A extends [infer U1, infer U2]
  ? U1 extends S
    ? U2 extends S
      ? TypeOf<U1> | TypeOf<U2>
      : unknown
    : unknown
  : A extends [infer U1]
  ? U1 extends S
    ? TypeOf<U1>
    : unknown
  : A;

export default Union;
