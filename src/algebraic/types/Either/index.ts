import type { ApplicativeOf2 } from '@algebraic/defs/Applicative';
import type { ApplyOf2 } from '@algebraic/defs/Apply';
import type { FunctorOf2 } from '@algebraic/defs/Functor';
import { of, Right, Left } from './Applicative';
import { ap } from './Apply';
import { Either$λ } from './Either';
import { map, mapU } from './Functor';
import { chain, chainU } from './Chain';
import { fold, foldUnion } from './Functions';
import { ChainOf2 } from '@algebraic/defs/Chain';

type EitherModule = ApplicativeOf2<Either$λ> &
  FunctorOf2<Either$λ> &
  ChainOf2<Either$λ> &
  ApplyOf2<Either$λ> & {
    λ: {
      Left: typeof Left;
      Right: typeof Right;
      fold: typeof fold;
      foldUnion: typeof foldUnion;
    };
  };

const EitherModule: EitherModule = {
  λ: {
    kind: Either$λ,
    ap,
    of,
    map,
    Left,
    Right,
    fold,
    foldUnion,
    chain
  },
  λU: {
    kind: Either$λ,
    map: mapU,
    chain: chainU
  },
};

export default EitherModule;
