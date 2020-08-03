import { pipe } from '@algebraic/common/pipe';
import { bindOf, bindTo } from '@algebraic/types/Async/Functions';
import Async from '@algebraic/types/Async';

describe ('Async (Functions)', () => {
  it ('bindOf', async () => {
    const userBind = await pipe (Async.λ.of ('Mike'), bindOf ('firstName')) ();

    expect (userBind).toStrictEqual ({ firstName: 'Mike' });
  });

  it ('bindTo', async () => {
    const userAddBinds = await pipe (
      Async.λ.of ('Mike'),
      bindOf ('firstName'),
      bindTo ('lastName', () => Async.λ.of ('Lance'))
    ) ();

    expect (userAddBinds).toStrictEqual ({
      firstName: 'Mike',
      lastName: 'Lance',
    });
  });
});
