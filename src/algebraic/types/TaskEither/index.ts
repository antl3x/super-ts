import type { ApplicativeOf2 } from '@algebraic/defs/Applicative';
import type { ApplyOf2 } from '@algebraic/defs/Apply';
import type { FunctorOf2 } from '@algebraic/defs/Functor';
import { Left, of, Right } from './Applicative';
import { ap } from './Apply';
import { map, mapU } from './Functor';
import { TaskEither$λ } from './TaskEither';
import { fromValidation, tryCatch, foldUnion } from './Functions';
import { fold } from './Functions';

type TaskEitherModule = {
  λ: {
    Left: typeof Left;
    Right: typeof Right;
    fromValidation: typeof fromValidation;
    fold: typeof fold;
    foldUnion: typeof foldUnion;
    of: typeof of;
    tryCatch: typeof tryCatch;
  };
} &
  ApplicativeOf2<TaskEither$λ> &
  FunctorOf2<TaskEither$λ> &
  ApplyOf2<TaskEither$λ>;

const TaskEitherModule: TaskEitherModule = {
  λ: {
    kind: TaskEither$λ,
    ap,
    of,
    map,
    Left,
    Right,
    fromValidation,
    fold,
    foldUnion,
    tryCatch
  },
  λU: {
    kind: TaskEither$λ,
    map: mapU,
  },
};

export default TaskEitherModule;
