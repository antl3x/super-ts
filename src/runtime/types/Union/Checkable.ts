import ResultModule from '@algebraic/types/Result';
import { Resultλ } from '@algebraic/types/Result/Result';
import { introspect } from 'src/runtime/introspection';
import { Checkable, InvalidCheck, Schema } from '@runtime/defs';
import rPipe from 'ramda/src/pipe';
import Union, { UnionΔ } from './Union';
import { pipe } from '@algebraic/common/pipe';
import { sequence } from '@algebraic/common/sequence';
export { checkInt };

const doChildChecks = <A extends (Schema & Checkable<Schema>)[]>(
  a: unknown,
  path: string,
  child: UnionΔ<A>['_']['child']
) => child.map ((c) => c._.checkInt (a, path, child));

const suceedOrFail = <A extends (Schema & Checkable<Schema>)[]>(
  a: UnionΔ<A>['_']['primitive'],
  path: string,
  child: UnionΔ<A>['_']['child']
) => (
  childResults: Resultλ<InvalidCheck, any>[]
): Resultλ<InvalidCheck, UnionΔ<A>['_']['primitive']> =>
  childResults.some ((i) => i.λ.id === 'Success')
    ? ResultModule.λ.Success (a)
    : ResultModule.λ.Failure ([
        {
          code: 'IS_UNION',
          message: `Expected ${introspect (
            Union (...child)
          )} but found (${typeof a === 'object' ? JSON.stringify (a) : a} :: ${typeof a})`,
          path,
        },
      ])
    ;

const checkInt = <A extends (Schema & Checkable<Schema>)[]>(
  child: UnionΔ<A>['_']['child']
) => (a: unknown, path: string) =>
  rPipe (
    (a: unknown, path: string) => doChildChecks (a, path, child),
    suceedOrFail (a as any, path, child)
  ) (a, path);
