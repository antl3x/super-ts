import type { ApplicativeOf1 } from '@algebraic/defs/Applicative';
import type { ApplyOf1 } from '@algebraic/defs/Apply';
import type { FunctorOf1 } from '@algebraic/defs/Functor';
import { of } from './Applicative';
import { ap } from './Apply';
import { map, mapU } from './Functor';
import { Task$λ } from './Task';

type TaskModule = ApplicativeOf1<Task$λ> &
  FunctorOf1<Task$λ> &
  ApplyOf1<Task$λ>;

const TaskModule: TaskModule = {
  λ: {
    kind: Task$λ,
    ap,
    of,
    map,
  },
  λU: {
    kind: Task$λ,
    map: mapU,
  },
};

export default TaskModule;
