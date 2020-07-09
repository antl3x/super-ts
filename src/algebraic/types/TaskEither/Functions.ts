import { TaskEitherλ } from './TaskEither';
import { isFailure } from '@algebraic/types/Validation/Functions';
import TaskEitherModule from '.';
import { Validationλ } from '@algebraic/types/Validation/Validation';
import { NonEmptyArrayλ } from '@algebraic/types/NonEmptyArray/NonEmptyArray';

export { fromValidation };

/**
 * TODO: Add comment
 * @param p1
 */
const fromValidation = <A, B>(p1: Validationλ<A, B>): TaskEitherλ<NonEmptyArrayλ<A>, B> =>
  isFailure (p1) 
    ? TaskEitherModule.λ.Left (p1.λ.value) 
    : TaskEitherModule.λ.Right (p1.λ.value) 
