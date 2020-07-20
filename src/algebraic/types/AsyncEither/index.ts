import type { ApplicativeOf2 } from '@algebraic/defs/Applicative';
import type { ApplyOf2 } from '@algebraic/defs/Apply';
import type { FunctorOf2 } from '@algebraic/defs/Functor';
import { Left, of, Right } from './Applicative';
import { ap } from './Apply';
import { map, mapU } from './Functor';
import { chain, chainU, flatMap } from './Chain';
import { AsyncEither$λ } from './AsyncEither';
import { fromResult, tryCatch, foldUnion } from './Functions';
import { fold } from './Functions';
import { ChainOf2 } from '@algebraic/defs/Chain';
import { mapLeft } from './Functions';

type AsyncEitherModule = {
  λ: {
    Left: typeof Left;
    Right: typeof Right;
    fromResult: typeof fromResult;
    fold: typeof fold;
    foldUnion: typeof foldUnion;
    of: typeof of;
    tryCatch: typeof tryCatch;
    mapLeft: typeof mapLeft;
    flatMap: typeof flatMap;
  };
} &
  ApplicativeOf2<AsyncEither$λ> &
  FunctorOf2<AsyncEither$λ> &
  ChainOf2<AsyncEither$λ> &
  ApplyOf2<AsyncEither$λ>;

const AsyncEitherModule: AsyncEitherModule = {
  λ: {
    kind: AsyncEither$λ,
    ap,
    of,
    map,
    Left,
    Right,
    fromResult,
    fold,
    foldUnion,
    tryCatch,
    chain,
    mapLeft,
    flatMap
  },
  λU: {
    kind: AsyncEither$λ,
    map: mapU,
    chain: chainU
  },
};

export default AsyncEitherModule;
