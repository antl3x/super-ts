import * as Benchmark from 'benchmark'
import EitherModule from '../../../src/algebraic/types/Either';
import { sequenceTuple } from '../../../src/algebraic/common/sequenceTuple';
import { isRight } from '../../../src/algebraic/types/Either/Functions';


const suite = new Benchmark.Suite ()

suite
  .add ('[ 🧪 ] sequenceTuple (1)', function () {
    sequenceTuple (EitherModule) (EitherModule.λ.Right (1))
  })
  .add ('[ 🧪 ] sequenceTuple (2)', function () {
    sequenceTuple (EitherModule) (EitherModule.λ.Right (1), EitherModule.λ.Right (2))
  })
  .add ('[ 🧪 ] sequenceTuple (3)', function () {
    sequenceTuple (EitherModule) (EitherModule.λ.Right (1), EitherModule.λ.Right (2),  EitherModule.λ.Right (3))
  })
  .add ('[ 🧪 ] sequenceTuple (4)', function () {
    sequenceTuple (EitherModule) (EitherModule.λ.Right (1), EitherModule.λ.Right (2),  EitherModule.λ.Right (3),  EitherModule.λ.Right (4))
  })
  .add ('[ 🧪 ] sequenceTuple (5)', function () {
    sequenceTuple (EitherModule) (EitherModule.λ.Right (1), EitherModule.λ.Right (2),  EitherModule.λ.Right (3),  EitherModule.λ.Right (4),  EitherModule.λ.Right (5))
  })
  .add ('[ 🧪 ] sequenceTuple (6)', function () {
    sequenceTuple (EitherModule) (EitherModule.λ.Right (1), EitherModule.λ.Right (2),  EitherModule.λ.Right (3),  EitherModule.λ.Right (4),  EitherModule.λ.Right (5),  EitherModule.λ.Right (6))
  })
  .add ('[ 🧪 ] sequenceTuple (7)', function () {
    sequenceTuple (EitherModule) (EitherModule.λ.Right (1), EitherModule.λ.Right (2),  EitherModule.λ.Right (3),  EitherModule.λ.Right (4),  EitherModule.λ.Right (5),  EitherModule.λ.Right (6),  EitherModule.λ.Right (7))
  })
  .on ('cycle', function (event: any) {
    console.log (String (event.target))
  })
  .on ('complete', function (this: any) {
    console.log ('[ 🏆 ] The  fastest implementation is ' + this.filter ('fastest').map ('name'))
  })
  .run ({ async: true })