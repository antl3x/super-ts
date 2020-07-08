import type { ApplicativeOf2 } from "@algebraic/defs/Applicative";
import type { ApplyOf2 } from "@algebraic/defs/Apply";
import type { FunctorOf2 } from "@algebraic/defs/Functor";
import { Left, of, Right } from "./Applicative";
import { ap } from "./Apply";
import { map, mapU } from "./Functor";
import { TaskEither$λ } from "./TaskEither";

type TaskEitherModule = ApplicativeOf2<TaskEither$λ> &
  FunctorOf2<TaskEither$λ> &
  ApplyOf2<TaskEither$λ> & {
    λ: {
      Left: typeof Left;
      Right: typeof Right;
    };
  };

const TaskEitherModule: TaskEitherModule = {
  λ: {
    kind: TaskEither$λ,
    ap,
    of,
    map,
    Left,
    Right,
  },
  λU: {
    kind: TaskEither$λ,
    map: mapU,
  },
};

export default TaskEitherModule;
