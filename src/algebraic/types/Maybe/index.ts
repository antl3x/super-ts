import type { ApplicativeOf1 } from '@algebraic/defs/Applicative';
import { ApplyOf1 } from '@algebraic/defs/Apply';
import { FunctorOf1 } from '@algebraic/defs/Functor';
import { Just, Nothing, of } from './Applicative';
import { ap } from './Apply';
import { map, mapU } from './Functor';
import { Maybe$λ } from './Maybe';
import { fromNullable } from './Functions';

type MaybeModule = ApplicativeOf1<Maybe$λ> &
  ApplyOf1<Maybe$λ> &
  FunctorOf1<Maybe$λ> & {
    λ: {
      Nothing: typeof Nothing;
      Just: typeof Just;
      fromNullable: typeof fromNullable;
    };
  };

const MaybeModule: MaybeModule = {
  λ: {
    kind: Maybe$λ,
    of,
    map,
    ap,
    Just,
    Nothing,
    fromNullable
  },
  λU: {
    kind: Maybe$λ,
    map: mapU,
  },
};

export default MaybeModule;
