import ResultModule from '@algebraic/types/Result';
import { sequenceTuple } from '@algebraic/common/sequenceTuple';
import { isSuccess, isFailure } from '@algebraic/types/Result/Functions';
import { identity } from '@common/identity';

const A = ResultModule.λ.Success<'SomeType', boolean> (true);
const B = ResultModule.λ.Success<'Other Type', string> ('B');
const C = ResultModule.λ.Success<'Other Type', number> (1);
const D = ResultModule.λ.Failure<'C Type', boolean> (['C Type']);
const E = ResultModule.λ.Failure<'D Type', boolean> (['D Type']);

it ('Should pass when tupling with only Success cases', () => {
  const tupleResult = sequenceTuple (ResultModule) (A, B, C);
  expect (isSuccess (tupleResult)).toBeTruthy ();
  expect (ResultModule.λ.fold (identity, identity) (tupleResult)).toStrictEqual ([
    true,
    'B',
    1,
  ]);
});

it ('Should pass when tupling with Failure & Success cases', () => {
  const tupleResult = sequenceTuple (ResultModule) (A, B, C, D, E);
  expect (isFailure (tupleResult)).toBeTruthy ();
  expect (ResultModule.λ.fold (identity, identity) (tupleResult)).toStrictEqual ([
    'C Type',
    'D Type',
  ]);
});
