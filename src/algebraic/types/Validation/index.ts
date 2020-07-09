import type { ApplicativeOf2 } from '@algebraic/defs/Applicative';
import type { ApplyOf2 } from '@algebraic/defs/Apply';
import type { FunctorOf2 } from '@algebraic/defs/Functor';
import { Failure, of, Success } from './Applicative';
import { ap } from './Apply';
import { map, mapU, mapFailure } from './Functor';
import { Validation$λ } from './Validation';
import { ChainOf2 } from '@algebraic/defs/Chain';
import { chainU, chain } from './Chain';
import { fold } from './Functions';

type ValidationModule = ApplicativeOf2<Validation$λ> &
  FunctorOf2<Validation$λ> &
  ApplyOf2<Validation$λ> &
  ChainOf2<Validation$λ> & {
    λ: {
      mapFailure: typeof mapFailure;
      Failure: typeof Failure;
      Success: typeof Success;
      fold: typeof fold;
    };
  };

const ValidationModule: ValidationModule = {
  λ: {
    kind: Validation$λ,
    ap,
    of,
    map,
    chain,
    fold,
    mapFailure,
    Failure,
    Success,
  },
  λU: {
    kind: Validation$λ,
    map: mapU,
    chain: chainU,
  },
};

export default ValidationModule;
