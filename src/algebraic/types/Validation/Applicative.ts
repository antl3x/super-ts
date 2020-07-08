import type { NonEmptyArrayλ } from "../NonEmptyArray/NonEmptyArray";
import type { Validationλ } from "./Validation";
import { Validation$λ } from "./Validation";

export { Success as of, Success, Failure };

/**
 * TODO: Add comment
 */
const Success = <A = unknown, B = unknown>(p1: B): Validationλ<A, B> => ({
  λ: {
    id: "Success",
    kind: Validation$λ,
    type: undefined as never,
    value: p1,
  },
});

/**
 * TODO: Add comment
 */
const Failure = <A = unknown, B = unknown>(
  p1: NonEmptyArrayλ<A>
): Validationλ<A, B> => ({
  λ: {
    id: "Failure",
    kind: Validation$λ,
    value: p1,
    type: undefined as never,
  },
});
