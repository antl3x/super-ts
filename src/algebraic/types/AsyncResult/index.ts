import type { ApplicativeOf2 } from '@algebraic/defs/Applicative';
import type { ApplyOf2 } from '@algebraic/defs/Apply';
import type { FunctorOf2 } from '@algebraic/defs/Functor';
import { Failure, of, Success } from './Applicative';
import { ap } from './Apply';
import { map, mapU } from './Functor';
import { chain, chainU, chainStrict } from './Chain';
import { AsyncResult$λ } from './AsyncResult';
import {
  fromResult,
  tryCatch,
  bindTo,
  bindToStrict,
  bindOf,
  fromEither,
  foldStrict,
  chainFirst,
  chainFirstStrict,
} from './Functions';
import { fold } from './Functions';
import { ChainOf2 } from '@algebraic/defs/Chain';
import { mapFailure } from './Functions';

type AsyncResultModule = {
  λ: {
    Failure: typeof Failure;
    Success: typeof Success;
    fromEither: typeof fromEither;
    fromResult: typeof fromResult;
    foldStrict: typeof foldStrict;
    fold: typeof fold;
    of: typeof of;
    tryCatch: typeof tryCatch;
    mapFailure: typeof mapFailure;
    chainStrict: typeof chainStrict;
    chain: typeof chain;
    chainFirst: typeof chainFirst;
    chainFirstStrict: typeof chainFirstStrict;
    bindTo: typeof bindTo;
    bindToStrict: typeof bindToStrict;
    bindOf: typeof bindOf;
  };
} & ApplicativeOf2<AsyncResult$λ> &
  FunctorOf2<AsyncResult$λ> &
  ChainOf2<AsyncResult$λ> &
  ApplyOf2<AsyncResult$λ>;

const AsyncResultModule: AsyncResultModule = {
  λ: {
    kind: AsyncResult$λ,
    ap,
    of,
    map,
    Failure,
    Success,
    fromResult,
    fromEither,
    fold,
    foldStrict,
    tryCatch,
    chain,
    chainFirst,
    chainFirstStrict,
    mapFailure,
    chainStrict,
    bindTo,
    bindToStrict,
    bindOf,
  },
  λU: {
    kind: AsyncResult$λ,
    map: mapU,
    chain: chainU,
  },
};

export default AsyncResultModule;
