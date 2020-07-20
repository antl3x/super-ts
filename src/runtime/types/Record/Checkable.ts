import ResultModule from '@algebraic/types/Result';
import { introspect } from 'src/runtime/introspection';
import { sequence } from '@algebraic/common/sequence';
import { Check, Checkable, Schema } from '@runtime/defs';
import rPipe from 'ramda/src/pipe';
import Record, { RecordΔ } from './Record';
export { checkInt };

const buildPath = (previousPath: string, currentPath: string) =>
  previousPath.length > 0 ? `${previousPath}.${currentPath}` : `${currentPath}`;

const isRecord = <A extends { [key: string]: Schema }>(): Check<RecordΔ<A>> => (
  a,
  path,
  child
) =>
  typeof a === 'object'
    ? ResultModule.λ.Success (a as A)
    : ResultModule.λ.Failure ([
        {
          code: 'IS_RECORD',
          message: `Expected ${introspect (
            Record (child)
          )} but found (${a} :: ${typeof a})`,
          path,
        },
      ]);

const doChildChecks = (
  a: any,
  path: string,
  child: { [key: string]: Checkable<Schema> }
) =>
  sequence (ResultModule) (
    Object.keys (child).map ((c) =>
      child[c]._.checkInt (a[c], buildPath (path, c), child)
    )
  );

const checkInt = <A extends { [key: string]: Schema }>(
  a: unknown,
  path: string,
  child: any
) =>
  rPipe (
    (a: unknown, path: string, child: any) => isRecord<A> () (a, path, child),
    ResultModule.λ.chain (() => doChildChecks (a, path, child)),
    ResultModule.λ.map (() => a as A)
  ) (a, path, child);
