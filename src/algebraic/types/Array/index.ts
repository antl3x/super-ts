import type { ApplicativeOf1 } from '@algebraic/defs/Applicative';
import type { FunctorOf1 } from '@algebraic/defs/Functor';
import { TraversableOf1 } from '@algebraic/defs/Traversable';
import { of } from './Applicative';
import { Array$λ } from './Array';
import { map, mapU } from './Functor';
import { ap } from './Apply';
import { reduce, foldMap } from './Foldable';
import { traverse } from './Traversable';

type ArrayModule = ApplicativeOf1<Array$λ> &
  FunctorOf1<Array$λ> &
  TraversableOf1<Array$λ>;

const ArrayModule: ArrayModule = {
  λ: {
    kind: Array$λ,
    of,
    map,
    ap,
    reduce,
    foldMap,
    traverse,
  },
  λU: {
    kind: Array$λ,
    map: mapU,
  },
};

export default ArrayModule;
