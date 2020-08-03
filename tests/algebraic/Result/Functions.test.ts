import { pipe } from '@algebraic/common/pipe';
import {bindOf, bindTo} from '@algebraic/types/Result/Functions';
import Result from '@algebraic/types/Result';

describe ('Result (Functions)', () => {

it ('bindOf', () => {
  const userBind = pipe (
    Result.λ.of ('Mike'),
    bindOf ('firstName')
  );

  expect (userBind).toStrictEqual ({
    λ: {
      id: 'Success',
      kind: 'Result',
      type: undefined,
      value: { firstName: 'Mike' },
    },
  });
});

it ('bindTo', () => {
  const userAddBinds = pipe (
    Result.λ.of ('Mike'),
    bindOf ('firstName'),
    bindTo ('lastName', () => Result.λ.Success ('Lance'))
  );

  expect (userAddBinds).toStrictEqual ({
    λ: {
      id: 'Success',
      kind: 'Result',
      type: undefined,
      value: { firstName: 'Mike', lastName: 'Lance' },
    },
  });
});
})