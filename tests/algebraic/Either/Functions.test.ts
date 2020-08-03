import { pipe } from '@algebraic/common/pipe';
import {bindOf, bindTo} from '@algebraic/types/Either/Functions';
import Either from '@algebraic/types/Either';

describe ('Either (Functions)', () => {

it ('bindOf', () => {
  const userBind = pipe (
    Either.λ.of ('Mike'),
    bindOf ('firstName')
  )

  expect (userBind).toStrictEqual ({
    λ: {
      id: 'Right',
      kind: 'Either',
      typeB: undefined,
      value: { firstName: 'Mike' },
    },
  });
});

it ('bindTo', () => {
  const userAddBinds = pipe (
    Either.λ.of ('Mike'),
    bindOf ('firstName'),
    bindTo ('lastName', () => Either.λ.Right ('Lance'))
  );

  expect (userAddBinds).toStrictEqual ({
    λ: {
      id: 'Right',
      kind: 'Either',
      typeB: undefined,
      value: { firstName: 'Mike', lastName: 'Lance' },
    },
  });
});
})