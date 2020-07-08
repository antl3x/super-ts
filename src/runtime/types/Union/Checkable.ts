import ValidationModule from '@algebraic/types/Validation';
import { Validationλ } from '@algebraic/types/Validation/Validation';
import { introspect } from 'src/runtime/introspection';
import { Checkable, InvalidCheck, Schema, Check } from '@runtime/defs';
import rPipe from 'ramda/src/pipe';
import Union, { UnionΔ } from './Union';
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
  childResults: Validationλ<InvalidCheck, any>[]
): Validationλ<InvalidCheck, UnionΔ<A>['_']['primitive']> =>
  childResults.some ((i) => i.λ.id === 'Success')
    ? ValidationModule.λ.Success (a)
    : ValidationModule.λ.Failure ([
        {
          code: 'IS_UNION',
          message: `Expected ${introspect (
            Union (...child)
          )} but found (${a} :: ${typeof a})`,
          path,
        },
      ]);

const checkInt = <A extends (Schema & Checkable<Schema>)[]>(
  child: UnionΔ<A>['_']['child']
) => (a: unknown, path: string) =>
  rPipe (
    (a: unknown, path: string) => doChildChecks (a, path, child),
    suceedOrFail (a as any, path, child)
  ) (a, path);
