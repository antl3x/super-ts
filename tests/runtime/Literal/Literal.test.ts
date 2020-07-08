import Literal, { LiteralΔ$ } from '@runtime/types/Literal/Literal';
import { isSuccessOf } from '@algebraic/types/Validation/Functions';

describe ('Literal Type', () => {
  it ('Symbol identifier exists', () => {
    const payload = 'some lit value';
    expect (Literal (payload)._.type).toBe (LiteralΔ$);
  });

  it ('When Literal is check, we expected to pass', () => {
    const payload = 100;
    const isLiteral = Literal (payload).Δ.check (payload);
    expect (isSuccessOf (isLiteral, payload)).toBeTruthy ();
  });

  it ('When something that is not a Literal is checked, we expected to fail', () => {
    const payload = 'this is a Literal';
    const isLiteral = Literal (payload).Δ.check (true);
    expect (isSuccessOf (isLiteral, payload)).toBeFalsy ();
  });
});
