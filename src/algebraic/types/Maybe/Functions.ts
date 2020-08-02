import type { Justλ, Maybeλ, Nothingλ } from './Maybe';
import { Nothing, Just } from './Applicative';
import { pipe } from '@algebraic/common/pipe';
import { chain } from './Chain';
import { map } from './Functor';
import { bindTo as cBindTo } from '@algebraic/common/bindTo';

export { isNothing, isJust, fromMaybe, fromNullable, bindTo, bindOf };

/**
 * TODO: Add comment
 * @param p1
 */
const isNothing = <A>(p1: Maybeλ<A>): p1 is Nothingλ => p1.λ.id === 'Nothing';

/**
 * TODO: Add comment
 * @param p1
 */
const isJust = <A>(p1: Maybeλ<A>): p1 is Justλ<A> => p1.λ.id === 'Just';

/**
 * TODO: Add Comment
 * @param p1 
 */
const fromNullable = <A>(a: A): Maybeλ<NonNullable<A>> => a == null ? Nothing : Just (a as NonNullable<A>)


const fromMaybe = <A>(p1: A) => (p2: Maybeλ<A>): A =>
  isNothing (p2) ? p1 : p2.λ.value;

/**
 * TODO: Add comment
 */
const bindTo = <Property extends string, Previous, A>(
  p1: Exclude<Property, keyof Previous>,
  p2: (a: Previous) => Maybeλ<A>
) => (
  p3: Maybeλ<Previous>
): Maybeλ<
  {
    [K in keyof Previous | Property]: K extends keyof Previous
      ? Previous[K]
      : A;
  }
> =>
  pipe (
    () => p3,
    chain ((a) =>
      pipe (
        () => p2 (a),
        map ((b) => cBindTo (a, p1, b))
      )
    )
  );

/**
 * TODO: Add comment
 */
const bindOf = <Property extends string, Value>(p1: Property) => (
  p2: Maybeλ<Value>
): Maybeλ<{ [K in Property]: Value }> =>
  pipe (
    () => p2,
    map ((a) => cBindTo ({}, p1, a))
  );
