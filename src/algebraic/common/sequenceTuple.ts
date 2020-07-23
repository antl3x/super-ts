import { ApplicativeOf1, ApplicativeOf2 } from '@algebraic/defs/Applicative';
import { ApplyOf1, ApplyOf2 } from '@algebraic/defs/Apply';
import { Kind1, Kind2, Types1, Types2 } from '@hkt';

/**
 * TODO: Add Comment
 */

function sequenceTuple<A extends Types2>(
  p1: ApplicativeOf2<A> & ApplyOf2<A>
): <Z extends Array<Kind2<A, any, any>>>(
  ...p2: Z & { 0: Kind2<A, any, any> }
) => Kind2<
  A,
  Z extends Array<Kind2<A, infer B, any>> ? B : never,
  {
    [K in keyof Z]: [Z[K]] extends [Kind2<A, infer B, infer X>] ? X : never;
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
    return adtInstances.reduce (
      (pv, cv) => adtModule.λ.ap (pv) (cv),
      adtModule.λ.of (constructFn (adtInstances.length, []))
    );
  };
}
    
const constructFn = (currentSize: number, acc: any[]) => {
  return function (x: unknown) {
    return currentSize > 1
    ? constructFn (currentSize - 1,  [...acc, x])
    : [...acc, x];
  }

}

export { sequenceTuple };
