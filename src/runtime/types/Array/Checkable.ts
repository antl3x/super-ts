import ResultModule from '@algebraic/types/Result';
import { sequence } from '@algebraic/common/sequence';
import { Check, Checkable, Schema, InvalidCheck } from '@runtime/defs';
import { introspect } from '@runtime/introspection';
import rPipe from 'ramda/src/pipe';
import Array, { ArrayΔ } from './Array';
import { Resultλ } from '@algebraic/types/Result/Result';

export { checkInt };

const buildPath = (indice: number, parentPath?: string) =>
  parentPath ? `${parentPath}[${indice}]` : `[${indice}]`;

const isArray = <A extends Schema, IsReadOnly extends boolean>(): Check<
  ArrayΔ<A, IsReadOnly>
> => (a, path, child) =>
  globalThis.Array.isArray (a) && a.length > 0
    ? ResultModule.λ.Success (a as ArrayΔ<A, IsReadOnly>['_']['primitive'])
    : ResultModule.λ.Failure ([
        {
          code: 'IS_ARRAY',
          message: `Expected ${introspect (
            child
          )} but found (${a} :: ${typeof a})`,
          path,
        },
      ]);

const doWithChecks = <A extends Schema, IsReadOnly extends boolean>(
  path: string,
  withChecks?: Check<ArrayΔ<A, IsReadOnly>>[]
) => (payload: ArrayΔ<A, IsReadOnly>['_']['primitive']) =>
  withChecks
    ? withChecks.map ((check) => check (payload, path))
    : [
        ResultModule.λ.Success<
          InvalidCheck,
          ArrayΔ<A, IsReadOnly>['_']['primitive']
        > (payload),
      ];

const doChildChecks = <
  A extends Schema & Checkable<A>,
  IsReadOnly extends boolean
>(
  payload: ArrayΔ<A, IsReadOnly>['_']['primitive'],
  path: string,
  child: ArrayΔ<A, IsReadOnly>['_']['child']
) => (
  withChecks: Resultλ<InvalidCheck, ArrayΔ<A, IsReadOnly>['_']['primitive']>[]
) =>
  sequence (ResultModule) ([
    ...withChecks,
    ...doChildChecksCondition (withChecks, payload, path, child),
  ]);

const doChildChecksCondition = <
  A extends Schema & Checkable<A>,
  IsReadOnly extends boolean
>(
  withChecks: Resultλ<InvalidCheck, ArrayΔ<A, IsReadOnly>['_']['primitive']>[],
  payload: ArrayΔ<A, IsReadOnly>['_']['primitive'],
  path: string,
  child: ArrayΔ<A, IsReadOnly>['_']['child']
) =>
  withChecks.some ((c) => c.λ.id === 'Success')
    ? (payload as any[]).map ((v, i) =>
        child._.checkInt (v, buildPath (i, path), (child as any)?._?.child)
      )
    : [];

const checkInt = <A extends Schema & Checkable<A>, IsReadOnly extends boolean>(
  child: ArrayΔ<A, IsReadOnly>['_']['child'],
  isReadOnly: IsReadOnly,
  withChecks?: Check<ArrayΔ<A, IsReadOnly>>[]
): Check<ArrayΔ<A, IsReadOnly>> => (a: unknown, path: string) =>
  rPipe (
    () => isArray<A, IsReadOnly> () (a, path, Array (child, isReadOnly)),
    ResultModule.λ.map ((res) => doWithChecks (path, withChecks) (res)),
    ResultModule.λ.chain ((res) =>
      doChildChecks (a as any[], path, child) (res)
    ),
    ResultModule.λ.map ((res) => res[0])
  ) ();
