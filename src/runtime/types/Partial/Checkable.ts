import ValidationModule from '@algebraic/types/Validation';
import { introspect } from '@runtime/introspection';
import { sequence } from '@algebraic/common/sequence';
import { Check, Checkable, Schema, InvalidCheck } from '@runtime/defs';
import rPipe from 'ramda/src/pipe';
import Partial, { PartialΔ } from './Partial';
import { Validationλ } from '@algebraic/types/Validation/Validation';
export { checkInt };

const buildPath = (previousPath: string, currentPath: string) =>
  previousPath.length > 0 ? `${previousPath}.${currentPath}` : `${currentPath}`;

const isPartial = <A extends { [key: string]: Schema }>(): Check<
  PartialΔ<A>
> => (a, path, child) =>
  typeof a === 'object'
    ? ValidationModule.λ.Success (a as any)
    : ValidationModule.λ.Failure ([
        {
          code: 'IS_PARTIAL',
          message: `Expected ${introspect (
            Partial (child)
          )} but found (${a} :: ${typeof a})`,
          path,
        },
      ]);

const doChildChecks = (
  a: any,
  path: string,
  child: { [key: string]: Checkable<Schema> }
): Validationλ<InvalidCheck, any[]> =>
  sequence (ValidationModule) (
    Object.keys (child).map ((c) => {
      return a[c] === undefined || a[c] === null
        ? ValidationModule.λ.Success (a)
        : child[c]._.checkInt (a[c], buildPath (path, c), child);
    })
  );

const checkInt = <A extends { [key: string]: Schema | undefined }>(
  a: unknown,
  path: string,
  child: any
) =>
  rPipe (
    (a: unknown, path: string, child: any) => isPartial () (a, path, child),
    ValidationModule.λ.chain (() => doChildChecks (a, path, child)),
    ValidationModule.λ.map (() => a as A)
  ) (a, path, child);
