import { AsyncEitherλ } from './AsyncEither';
import { isFailure } from '@algebraic/types/Result/Functions';
import AsyncEitherModule from '.';
import { Resultλ } from '@algebraic/types/Result/Result';
import { NonEmptyArrayλ } from '@algebraic/types/NonEmptyArray/NonEmptyArray';
import EitherModule from '../Either';
import { Asyncλ } from '../Async/Async';
import AsyncModule from '../Async';

export { fromResult, fold, foldUnion, tryCatch, mapLeft };

/**
 * TODO: Add comment
 * @param p1
 */
const fromResult = <A, B>(p1: Resultλ<A, B>): AsyncEitherλ<NonEmptyArrayλ<A>, B> =>
  isFailure (p1) 
    ? AsyncEitherModule.λ.Left (p1.λ.value) 
    : AsyncEitherModule.λ.Right (p1.λ.value) 

/**
 * TODO: Add comment
 * @param p1
 */
const fold = <A, B, C>(
  onLeft: (a: A) => C,
  onRight: (b: B) => C
) => (p1: AsyncEitherλ<A, B>): Asyncλ<C> => 
  () => p1 ().then (EitherModule.λ.fold (onLeft, onRight))

/**
 * TODO: Add comment
 * @param p1
 */
const foldUnion = <A, B>(p1: AsyncEitherλ<A, B>): Asyncλ<A | B> => 
  () => p1 ().then (EitherModule.λ.foldUnion)

/**
 * TODO: Add comment
 */
const tryCatch = <A, B>(p1: () => Promise<B>, onRejected: (reason: unknown) => A): AsyncEitherλ<A, B> =>
   () => p1 ().then (EitherModule.λ.Right, (reason) => EitherModule.λ.Left (onRejected (reason)));

/**
 * TODO: Add comment
 */
const mapLeft = <A, B, C>(p1: (a: A) => C) => (p2: AsyncEitherλ<A, B>): AsyncEitherλ<C, B> =>
  AsyncModule.λU.map (EitherModule.λ.mapLeft (p1), p2)

