import Tuple, { TupleΔ$ } from '@runtime/types/Tuple/Tuple';
import Number from '@runtime/types/Number/Number';
import String from '@runtime/types/String/String';
import { isSuccessOf } from '@algebraic/types/Validation/Functions';
import { isGreaterThan as isStringGt } from '@runtime/types/String/checks/isGreaterThan';
import { isGreaterThan as isNumberGt } from '@runtime/types/Number/checks/isGreaterThan';

describe ('Tuple Type', () => {
  it ('Symbol identifier exists', () => {
    expect (Tuple (String, Number)._.type).toBe (TupleΔ$);
  });

  it ('When Tuple is checked not respecting any child, we expected to fail', () => {
    const payload = undefined;
    const isTuple = Tuple (String, Number).Δ.check (payload);
    expect (isSuccessOf (isTuple, payload)).toBeFalsy ();
  });

  it ('When Tuple is checked respecting first child but not the second, we expected to fail', () => {
    const payload = ['this is a string', null];
    const isTuple = Tuple (String, Number).Δ.check (payload);
    expect (isSuccessOf (isTuple, payload)).toBeFalsy ();
  });

  it ('When Tuple is checked respecting second child but not the first, we expected to fail', () => {
    const payload = [true, 1];
    const isTuple = Tuple (String, Number).Δ.check (payload);
    expect (isSuccessOf (isTuple, payload)).toBeFalsy ();
  });

  it ('When Tuple is checked respecting all childs, we expected to pass', () => {
    const payload = ['this is string', 1];
    const isTuple = Tuple (String, Number).Δ.check (payload);
    expect (isSuccessOf (isTuple, payload)).toBeTruthy ();
  });

  it ('When Tuple is checked respecting first child with custom check but not the second, we expected to fail', () => {
    const payload = ['this is a string', 5];
    const isTuple = Tuple (
      String.Δ.checkWith ([isStringGt (1)]),
      Number.Δ.checkWith ([isNumberGt (10)])
    ).Δ.check (payload);
    expect (isSuccessOf (isTuple, payload)).toBeFalsy ();
  });

  it ('When Tuple is checked respecting second child with custom check but not the first, we expected to fail', () => {
    const payload = ['this is a string', 5];
    const isTuple = Tuple (
      String.Δ.checkWith ([isStringGt (100)]),
      Number.Δ.checkWith ([isNumberGt (1)])
    ).Δ.check (payload);
    expect (isSuccessOf (isTuple, payload)).toBeFalsy ();
  });

  it ('When Tuple is checked respecting all childs with custom check, we expected to pass', () => {
    const payload = ['this is a string', 11];
    const isTuple = Tuple (
      String.Δ.checkWith ([isStringGt (10)]),
      Number.Δ.checkWith ([isNumberGt (10)])
    ).Δ.check (payload);
    expect (isSuccessOf (isTuple, payload)).toBeTruthy ();
  });
});
