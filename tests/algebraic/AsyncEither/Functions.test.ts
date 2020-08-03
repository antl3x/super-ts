import { pipe } from '@algebraic/common/pipe';
import {bindOf, bindTo} from '@algebraic/types/AsyncEither/Functions';
import AsyncEither from '@algebraic/types/AsyncEither';

describe ('AsyncEither (Functions)', () => {

it ('bindOf', async () => {
  const userBind = await pipe (
    AsyncEither.λ.of ('Mike'),
    bindOf ('firstName')
  ) ();

  expect (userBind).toStrictEqual ({
    λ: {
      id: 'Right',
      kind: 'Either',
      typeB: undefined,
      value: { firstName: 'Mike' },
    },
  });
});

it ('bindTo', async () => {
  const userAddBinds = await pipe (
    AsyncEither.λ.of ('Mike'),
    bindOf ('firstName'),
    bindTo ('lastName', () => AsyncEither.λ.Right ('Lance'))
  ) ();

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