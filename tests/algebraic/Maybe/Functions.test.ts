import { pipe } from '@algebraic/common/pipe';
// import pipe from 'ramda/src/pipe'
import {bindOf, bindTo} from '@algebraic/types/Maybe/Functions';
import Maybe from '@algebraic/types/Maybe';

describe ('Maybe (Functions)', () => {

it ('bindOf', () => {
  const userBind = pipe (
    Maybe.λ.of ('Mike'),
    bindOf ('firstName')
  );

  expect (userBind).toStrictEqual ({
    λ: {
      id: 'Just',
      kind: 'Maybe',
      typeA: undefined,
      value: { firstName: 'Mike' },
    },
  });
});

it ('bindTo', () => {
  const userAddBinds = pipe (
    Maybe.λ.of ('Mike'),
    bindOf ('firstName'),
    bindTo ('lastName', () => Maybe.λ.Just ('Lance'))
  );

  expect (userAddBinds).toStrictEqual ({
    λ: {
      id: 'Just',
      kind: 'Maybe',
      typeA: undefined,
      value: { firstName: 'Mike', lastName: 'Lance' },
    },
  });
});
})