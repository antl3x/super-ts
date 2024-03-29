import type { ApplicativeOf2 } from '@algebraic/defs/Applicative';
import type { ApplyOf2 } from '@algebraic/defs/Apply';
import type { FunctorOf2 } from '@algebraic/defs/Functor';
import { Failure, of, Success } from './Applicative';
import { ap } from './Apply';
import { map, mapU, mapFailure } from './Functor';
import { Result$λ } from './Result';
import { ChainOf2 } from '@algebraic/defs/Chain';
import { chainU, chain, chainStrict, chainStrictU } from './Chain';
import {
  fold,
  isFailure,
  isSuccess,
  bindTo,
  bindToStrict,
  bindOf,
  chainFirst,
  chainFirstStrict,
  getOrElse,
  getOrElseStrict,
  orElse,
} from './Functions';

type ResultModule = ApplicativeOf2<Result$λ> &
  FunctorOf2<Result$λ> &
  ApplyOf2<Result$λ> &
  ChainOf2<Result$λ> & {
    λ: {
      mapFailure: typeof mapFailure;
      Failure: typeof Failure;
      Success: typeof Success;
      fold: typeof fold;
      chainStrict: typeof chainStrict;
      bindTo: typeof bindTo;
      bindToStrict: typeof bindToStrict;
      bindOf: typeof bindOf;
      isFailure: typeof isFailure;
      isSuccess: typeof isSuccess;
      chainFirst: typeof chainFirst;
      chainFirstStrict: typeof chainFirstStrict;
      getOrElse: typeof getOrElse;
      getOrElseStrict: typeof getOrElseStrict;
      orElse: typeof orElse;
    };
    λU: {
      chainStrict: typeof chainStrictU;
    };
  };

const ResultModule: ResultModule = {
  λ: {
    kind: Result$λ,
    ap,
    bindOf,
    bindTo,
    bindToStrict,
    chain,
    chainFirst,
    chainFirstStrict,
    chainStrict,
    Failure,
    fold,
    isFailure,
    isSuccess,
    map,
    mapFailure,
    of,
    Success,
    getOrElse,
    getOrElseStrict,
    orElse
  },
  λU: {
    kind: Result$λ,
    map: mapU,
    chain: chainU,
    chainStrict: chainStrictU,
  },
};

export default ResultModule;
