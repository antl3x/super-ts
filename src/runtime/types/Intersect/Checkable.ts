import ResultModule from '@algebraic/types/Result';
import { Resultλ } from '@algebraic/types/Result/Result';
import { introspect } from 'src/runtime/introspection';
import { Checkable, InvalidCheck, Schema } from '@runtime/defs';
import rPipe from 'ramda/src/pipe';
import Intersect, { IntersectΔ } from './Intersect';
import { pipe } from '@algebraic/common/pipe';
import { sequence } from '@algebraic/common/sequence';
export { checkInt };

const doChildChecks = <A extends (Schema & Checkable<Schema>)[]>(
  a: unknown,
  path: string,
  child: IntersectΔ<A>['_']['child']
) => child.map ((c) => c._.checkInt (a, path, child));

const suceedOrFail = <A extends (Schema & Checkable<Schema>)[]>(
  a: IntersectΔ<A>['_']['primitive'],
  path: string,
  child: IntersectΔ<A>['_']['child']
) => (
  childResults: Resultλ<InvalidCheck, any>[]
): Resultλ<InvalidCheck, IntersectΔ<A>['_']['primitive']> => {
  const failedChilds = childResults.filter ((i) => i.λ.id === 'Failure')
  return failedChilds.length >= 1 
  ? ResultModule.λ.Failure ([
    {
      code: 'IS_INTERSECT',
      message: `Expected ${introspect (
        Intersect (...child)
        )} but found (${typeof a === 'object' ? JSON.stringify (a) : a} :: ${typeof a})`,
        path,
      },
      ...failedChilds.map (i => i.λ.value)
    ])
    : ResultModule.λ.Success (a)
}
    ;

const checkInt = <A extends (Schema & Checkable<Schema>)[]>(
  child: IntersectΔ<A>['_']['child']
) => (a: unknown, path: string) =>
  rPipe (
    (a: unknown, path: string) => doChildChecks (a, path, child),
    suceedOrFail (a as any, path, child)
  ) (a, path);
