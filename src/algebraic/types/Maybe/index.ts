import type { ApplicativeOf1 } from '@algebraic/defs/Applicative';
import { ApplyOf1 } from '@algebraic/defs/Apply';
import { FunctorOf1 } from '@algebraic/defs/Functor';
import { Just, Nothing, of } from './Applicative';
import { ap } from './Apply';
import { map, mapU } from './Functor';
import { Maybe$λ } from './Maybe';
import { fromNullable, bindTo, bindOf, chainFirst } from './Functions';
import { ChainOf1 } from '@algebraic/defs/Chain';
import { chain, chainU } from './Chain';

type MaybeModule = ApplicativeOf1<Maybe$λ> &
  ApplyOf1<Maybe$λ> &
  ChainOf1<Maybe$λ> &
  FunctorOf1<Maybe$λ> & {
    λ: {
      Nothing: typeof Nothing;
      Just: typeof Just;
      fromNullable: typeof fromNullable;
      bindTo: typeof bindTo;
      bindOf: typeof bindOf;
      chainFirst: typeof chainFirst;
    };
  };

const MaybeModule: MaybeModule = {
  λ: {
    kind: Maybe$λ,
    of,
    map,
    ap,
    chain,
    bindTo,
    bindOf,
    Just,
    Nothing,
    fromNullable,
    chainFirst,
  },
  λU: {
    kind: Maybe$λ,
    map: mapU,
    chain: chainU,
  },
};

export default MaybeModule;
