import { ArrayΔ$ } from '@runtime/types/Array/Array';
import { LiteralΔ$ } from '@runtime/types/Literal/Literal';
import { UnionΔ$, UnionΔ } from '@runtime/types/Union/Union';
import { Schema, Checkable } from '@runtime/defs';
import { RecordΔ, RecordΔ$ } from '@runtime/types/Record/Record';
import { TupleΔ$, TupleΔ } from '@runtime/types/Tuple/Tuple';
import { PartialΔ$, PartialΔ } from '@runtime/types/Partial/Partial';

export { introspect };

const introspect = (a: any): string => {
  if (a?.type === ArrayΔ$) return introspectArray (a);
  if (a?.type === LiteralΔ$) return introspectLiteral (a);
  if (a?.type === UnionΔ$) return introspectUnion (a);
  if (a?.type === RecordΔ$) return introspectRecord (a);
  if (a?.type === TupleΔ$) return introspectTuple (a);
  if (a?.type === PartialΔ$) return introspectPartial (a);
  return (a?.type && a.type.toString ().toLowerCase ().slice (7, -1)) || ``;
};

const introspectArray = (a: any) =>
  `${a.isReadOnly ? `readonly` : ``} ${introspect (a.child)}[]`;

const introspectLiteral = (a: any) => `${a.child}`;

const introspectUnion = <A extends (Schema & Checkable<Schema>)[]>(
  a: UnionΔ<A>
) => `(${a.child.map (introspect).join (' | ')})`;

const introspectRecord = (a: RecordΔ<{ [key: string]: Schema }>) =>
  `{ ${Object.keys (a.child)
    .map ((k) => `${k}: ${introspect (a.child[k])};`)
    .join (' ')} }`;

const introspectPartial = (a: PartialΔ<{ [key: string]: Schema }>) =>
  `{ ${Object.keys (a.child)
    .map ((k) => `${k}?: ${introspect (a.child[k])};`)
    .join (' ')} }`;

const introspectTuple = (a: TupleΔ<(Schema & Checkable<Schema>)[]>) =>
  `[${a.child.map (introspect).join (', ')}]`;
