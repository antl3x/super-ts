import ValidationModule from '@algebraic/types/Validation';
import { introspect } from 'src/runtime/introspection';
import { sequence } from '@algebraic/common/sequence';
import { Check, Checkable, Schema, InvalidCheck } from '@runtime/defs';
import rPipe from 'ramda/src/pipe';
import Tuple, { TupleΔ } from './Tuple';
import { Validationλ } from '@algebraic/types/Validation/Validation';
export { checkInt };

const buildPath = (indice: number, parentPath?: string) =>
  parentPath ? `${parentPath}[${indice}]` : `[${indice}]`;

const isTuple = <A extends (Schema & Checkable<Schema>)[]>(): Check<
  TupleΔ<A>
> => (a, path, child) =>
  globalThis.Array.isArray (a) && a.length === child.length
    ? ValidationModule.λ.Success (a as any)
    : ValidationModule.λ.Failure ([
        {
          code: 'IS_TUPLE',
          message: `Expected ${introspect (
            Tuple (...child)
          )} but found (${a} :: ${typeof a})`,
          path,
        },
      ]);

const doChildChecks = <A extends (Schema & Checkable<Schema>)[]>(
  path: string,
  child: TupleΔ<A>['_']['child']
) => (payload: any[]) =>
  sequence (ValidationModule) (
    payload.map ((v, i) =>
      child[i]._.checkInt (v, buildPath (i, path), (child as any)?.child)
    )
  );

const checkInt = <A extends (Schema & Checkable<Schema>)[]>(
  a: unknown,
  path: string,
  child: TupleΔ<A>['_']['child']
) =>
  rPipe (
    (a: unknown, path: string, child: any) => isTuple<A> () (a, path, child),
    ValidationModule.λ.chain (doChildChecks (path, child))
  ) (a, path, child) as Validationλ<InvalidCheck, any>;
