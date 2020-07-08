import { FunctorOf1 } from "@algebraic/defs/Functor";
import { map, mapU } from "./Functor";
import { NonEmptyArray$λ } from "./NonEmptyArray";

type NonEmptyArrayModule = FunctorOf1<NonEmptyArray$λ>;

const NonEmptyArrayModule: NonEmptyArrayModule = {
  λ: {
    kind: NonEmptyArray$λ,
    map,
  },
  λU: {
    kind: NonEmptyArray$λ,
    map: mapU,
  },
};

export default NonEmptyArrayModule;
