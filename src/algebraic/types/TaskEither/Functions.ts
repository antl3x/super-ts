import { TaskEitherλ } from './TaskEither';
import { isFailure } from '@algebraic/types/Validation/Functions';
import TaskEitherModule from '.';
import { Validationλ } from '@algebraic/types/Validation/Validation';
import { NonEmptyArrayλ } from '@algebraic/types/NonEmptyArray/NonEmptyArray';
import EitherModule from '../Either';
import { Taskλ } from '../Task/Task';

export { fromValidation, fold, foldUnion, tryCatch };

/**
 * TODO: Add comment
 * @param p1
 */
const fromValidation = <A, B>(p1: Validationλ<A, B>): TaskEitherλ<NonEmptyArrayλ<A>, B> =>
  isFailure (p1) 
    ? TaskEitherModule.λ.Left (p1.λ.value) 
    : TaskEitherModule.λ.Right (p1.λ.value) 

/**
 * TODO: Add comment
 * @param p1
 */
const fold = <A, B, C>(
  onLeft: (a: A) => C,
  onRight: (b: B) => C
) => (p1: TaskEitherλ<A, B>): Taskλ<C> => 
  () => p1 ().then (EitherModule.λ.fold (onLeft, onRight))

/**
 * TODO: Add comment
 * @param p1
 */
const foldUnion = <A, B>(p1: TaskEitherλ<A, B>): Taskλ<A | B> => 
  () => p1 ().then (EitherModule.λ.foldUnion)

/**
 * TODO: Add comment
 */
const tryCatch = <A, B>(p1: () => Promise<B>, onRejected: (reason: unknown) => A): TaskEitherλ<A, B> =>
   () => p1 ().then (EitherModule.λ.Right, (reason) => EitherModule.λ.Left (onRejected (reason)))