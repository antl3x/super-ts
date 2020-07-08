import type { Failureλ, Successλ, Validationλ } from "./Validation";
import { NonEmptyArrayλ } from "@algebraic/types/NonEmptyArray/NonEmptyArray";

export { isFailure, isSuccess, isSuccessOf, fold };

/**
 * TODO: Add comment
 * @param p1
 */
const isFailure = <A, B>(p1: Validationλ<A, B>): p1 is Failureλ<A> =>
  p1.λ.id === "Failure";

/**
 * TODO: Add comment
 * @param p1
 */
const isSuccess = <A, B>(p1: Validationλ<A, B>): p1 is Successλ<B> =>
  p1.λ.id === "Success";

/**
 * TODO: Add comment
 * @param p1
 */
const isSuccessOf = <A, B>(p1: Validationλ<A, B>, p2: any): p1 is Successλ<B> =>
  isSuccess(p1) && (p1 as any).λ.value.toString() === p2.toString();

/**
 * TODO: Add comment
 * @param p1
 */
const fold = <A, B, C>(
  onFailure: (a: NonEmptyArrayλ<A>) => C,
  onSucess: (b: B) => C
) => (p1: Validationλ<A, B>) =>
  isFailure(p1) ? onFailure(p1.λ.value) : onSucess(p1.λ.value);
