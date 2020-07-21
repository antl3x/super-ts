import type { ApplicativeOf2 } from '@algebraic/defs/Applicative';
import type { ApplyOf2 } from '@algebraic/defs/Apply';
import type { FunctorOf2 } from '@algebraic/defs/Functor';
import { Failure, of, Success } from './Applicative';
import { ap } from './Apply';
import { map, mapU, mapFailure } from './Functor';
import { Result$λ } from './Result';
import { ChainOf2 } from '@algebraic/defs/Chain';
import { chainU, chain } from './Chain';
import { fold, isFailure, isSuccess } from './Functions';

type ResultModule = ApplicativeOf2<Result$λ> &
  FunctorOf2<Result$λ> &
  ApplyOf2<Result$λ> &
  ChainOf2<Result$λ> & {
    λ: {
      mapFailure: typeof mapFailure;
      Failure: typeof Failure;
      Success: typeof Success;
      fold: typeof fold;
      isFailure: typeof isFailure;
      isSuccess: typeof isSuccess;
    };
  };

const ResultModule: ResultModule = {
  λ: {
    kind: Result$λ,
    ap,
    of,
    map,
    chain,
    fold,
    mapFailure,
    Failure,
    Success,
    isFailure,
    isSuccess
  },
  λU: {
    kind: Result$λ,
    map: mapU,
    chain: chainU,
  },
};

export default ResultModule;
