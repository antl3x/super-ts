import ValidationModule from '@algebraic/types/Validation';
import { sequence } from '@algebraic/common/sequence';
import { Check, Checkable, Schema, InvalidCheck } from '@runtime/defs';
import { introspect } from '@runtime/introspection';
import rPipe from 'ramda/src/pipe';
import Array, { ArrayΔ } from './Array';
import { Validationλ } from '@algebraic/types/Validation/Validation';

export { checkInt };

const buildPath = (indice: number, parentPath?: string) =>
  parentPath ? `${parentPath}[${indice}]` : `[${indice}]`;

const isArray = <A extends Schema, IsReadOnly extends boolean>(): Check<
  ArrayΔ<A, IsReadOnly>
> => (a, path, child) =>
  globalThis.Array.isArray (a) && a.length > 0
    ? ValidationModule.λ.Success (a as ArrayΔ<A, IsReadOnly>['primitive'])
    : ValidationModule.λ.Failure ([
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
) => (payload: ArrayΔ<A, IsReadOnly>['primitive']) =>
  withChecks
    ? withChecks.map ((check) => check (payload, path))
    : [
        ValidationModule.λ.Success<
          InvalidCheck,
          ArrayΔ<A, IsReadOnly>['primitive']
        > (payload),
      ];

const doChildChecks = <
  A extends Schema & Checkable<A>,
  IsReadOnly extends boolean
>(
  payload: ArrayΔ<A, IsReadOnly>['primitive'],
  path: string,
  child: ArrayΔ<A, IsReadOnly>['child']
) => (
  withChecks: Validationλ<InvalidCheck, ArrayΔ<A, IsReadOnly>['primitive']>[]
) =>
  sequence (ValidationModule) ([
    ...withChecks,
    ...doChildChecksCondition (withChecks, payload, path, child),
  ]);

const doChildChecksCondition = <
  A extends Schema & Checkable<A>,
  IsReadOnly extends boolean
>(
  withChecks: Validationλ<InvalidCheck, ArrayΔ<A, IsReadOnly>['primitive']>[],
  payload: ArrayΔ<A, IsReadOnly>['primitive'],
  path: string,
  child: ArrayΔ<A, IsReadOnly>['child']
) =>
  withChecks.some ((c) => c.λ.id === 'Success')
    ? (payload as any[]).map ((v, i) =>
        child.checkInt (v, buildPath (i, path), (child as any)?.child)
      )
    : [];

const checkInt = <A extends Schema & Checkable<A>, IsReadOnly extends boolean>(
  child: ArrayΔ<A, IsReadOnly>['child'],
  isReadOnly: IsReadOnly,
  withChecks?: Check<ArrayΔ<A, IsReadOnly>>[]
): Check<ArrayΔ<A, IsReadOnly>> => (a: unknown, path: string) =>
  rPipe (
    () => isArray<A, IsReadOnly> () (a, path, Array (child, isReadOnly)),
    ValidationModule.λ.map ((res) => doWithChecks (path, withChecks) (res)),
    ValidationModule.λ.chain ((res) =>
      doChildChecks (a as any[], path, child) (res)
    ),
    ValidationModule.λ.map ((res) => res[0])
  ) ();
