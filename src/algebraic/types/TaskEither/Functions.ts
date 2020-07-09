import { TaskEitherλ } from './TaskEither';
import { isFailure } from '@algebraic/types/Validation/Functions';
import TaskEitherModule from '.';
import { Validationλ } from '@algebraic/types/Validation/Validation';
import { NonEmptyArrayλ } from '@algebraic/types/NonEmptyArray/NonEmptyArray';
import { Taskλ } from '../Task/Task';
import EitherModule from '../Either';
import { of } from '../Task/Applicative';

export { fromValidation, fold };

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
    onLeft: (a: A) => Taskλ<C>,
    onRight: (b: B) => Taskλ<C>
  ) => (p1: TaskEitherλ<A, B>): Taskλ<C> => 
    of (p1.λ.value ().then (EitherModule.λ.fold (onLeft, onRight)).then ())
  