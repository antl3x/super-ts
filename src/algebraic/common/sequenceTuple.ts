import { ApplicativeOf1, ApplicativeOf2 } from "@algebraic/defs/Applicative";
import { ApplyOf1, ApplyOf2 } from "@algebraic/defs/Apply";
import { Kind1, Kind2, Types1, Types2 } from "@hkt";

/**
 * TODO: Add Comment
 */

function sequenceTuple<A extends Types2>(
  p1: ApplicativeOf2<A> & ApplyOf2<A>
): <B, Z extends Array<Kind2<A, B, any>>>(
  ...p2: Z & { 0: Kind2<A, B, any> }
) => Kind2<
  A,
  B,
  {
    [K in keyof Z]: [Z[K]] extends [Kind2<A, B, infer X>] ? X : never;
  }
>;

function sequenceTuple<A extends Types1>(
  p1: ApplicativeOf1<A> & ApplyOf1<A>
): <Z extends Array<Kind1<A, any>>>(
  ...p2: Z & { 0: Kind1<A, any> }
) => Kind1<
  A,
  { [K in keyof Z]: [[K]] extends [Kind1<A, infer X>] ? X : never }
>;

function sequenceTuple(adtModule: ApplicativeOf1<any> & ApplyOf1<any>) {
  return function (...adtInstances: Kind1<any, any>[]): any {
    return adtInstances.reduce(
      (pv, cv) => adtModule.λ.ap(pv)(cv),
      adtModule.λ.of(toTuple(adtInstances.length, adtModule, []))
    );
  };
}

const toTuple = (
  totalItems: number,
  adtModule: ApplyOf1<any> & ApplicativeOf1<any>,
  prevValue: any[]
) => (x: unknown): any =>
  totalItems - 1 === 0
    ? prevValue[0]["λ"]
      ? sequenceTuple(adtModule)(...(prevValue.concat(x) as any))
      : prevValue.concat(x)
    : toTuple(totalItems - 1, adtModule, prevValue.concat(x));

export { sequenceTuple };
