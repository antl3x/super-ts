import { pipe } from '@algebraic/common/pipe';
import { bindOf, bindTo } from '@algebraic/types/AsyncResult/Functions';
import AsyncResult from '@algebraic/types/AsyncResult';

describe ('AsyncResult (Functions)', () => {
  it ('bindOf', async () => {
    const userBind = await pipe (
      AsyncResult.λ.of ('Mike'),
      bindOf ('firstName')
    ) ();

    expect (userBind).toStrictEqual ({
      λ: {
        id: 'Success',
        kind: 'Result',
        type: undefined,
        value: { firstName: 'Mike' },
      },
    });
  });

  it ('bindTo', async () => {
    const userAddBinds = await pipe (
      AsyncResult.λ.of ('Mike'),
      bindOf ('firstName'),
      bindTo ('lastName', () => AsyncResult.λ.Success ('Lance'))
    ) ();

    expect (userAddBinds).toStrictEqual ({
      λ: {
        id: 'Success',
        kind: 'Result',
        type: undefined,
        value: { firstName: 'Mike', lastName: 'Lance' },
      },
    });
  });
});
