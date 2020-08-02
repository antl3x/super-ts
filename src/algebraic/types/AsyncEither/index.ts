import type { ApplicativeOf2 } from '@algebraic/defs/Applicative';
import type { ApplyOf2 } from '@algebraic/defs/Apply';
import type { FunctorOf2 } from '@algebraic/defs/Functor';
import { Left, of, Right } from './Applicative';
import { ap } from './Apply';
import { map, mapU } from './Functor';
import { chain, chainU, chainStrict } from './Chain';
import { AsyncEither$λ } from './AsyncEither';
import { fromResult, tryCatch, foldUnion, bindTo, bindToStrict, bindOf } from './Functions';
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
    chainStrict: typeof chainStrict;
    chain: typeof chain;
    bindTo: typeof bindTo;
    bindToStrict: typeof bindToStrict;
    bindOf: typeof bindOf;
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
    chainStrict,
    bindTo,
    bindToStrict,
    bindOf
  },
  λU: {
    kind: AsyncEither$λ,
    map: mapU,
    chain: chainU
  },
};

export default AsyncEitherModule;
