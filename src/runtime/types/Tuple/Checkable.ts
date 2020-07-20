import ResultModule from '@algebraic/types/Result';
import { introspect } from 'src/runtime/introspection';
import { sequence } from '@algebraic/common/sequence';
import { Check, Checkable, Schema, InvalidCheck } from '@runtime/defs';
import rPipe from 'ramda/src/pipe';
import Tuple, { TupleΔ } from './Tuple';
import { Resultλ } from '@algebraic/types/Result/Result';
export { checkInt };

const buildPath = (indice: number, parentPath?: string) =>
  parentPath ? `${parentPath}[${indice}]` : `[${indice}]`;

const isTuple = <A extends (Schema & Checkable<Schema>)[]>(): Check<
  TupleΔ<A>
> => (a, path, child) =>
  globalThis.Array.isArray (a) && a.length === child.length
    ? ResultModule.λ.Success (a as any)
    : ResultModule.λ.Failure ([
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
  sequence (ResultModule) (
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
    ResultModule.λ.chain (doChildChecks (path, child))
  ) (a, path, child) as Resultλ<InvalidCheck, any>;
