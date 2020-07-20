import Union, { UnionΔ$ } from '@runtime/types/Union/Union';
import Number from '@runtime/types/Number/Number';
import String from '@runtime/types/String/String';
import { isSuccessOf } from '@algebraic/types/Result/Functions';
import { isGreaterThan as isStringGt } from '@runtime/types/String/checks/isGreaterThan';
import { isGreaterThan as isNumberGt } from '@runtime/types/Number/checks/isGreaterThan';

describe ('Union Type', () => {
  it ('Symbol identifier exists', () => {
    expect (Union (String, Number)._.type).toBe (UnionΔ$);
  });

  it ('When Union is checked respecting first child, we expected to pass', () => {
    const payload = 'this is a string';
    const isUnion = Union (String, Number).Δ.check (payload);
    expect (isSuccessOf (isUnion, payload)).toBeTruthy ();
  });

  it ('When Union is checked respecting second child, we expected to pass', () => {
    const payload = 1;
    const isUnion = Union (String, Number).Δ.check (payload);
    expect (isSuccessOf (isUnion, payload)).toBeTruthy ();
  });

  it ('When Union is checked not respecting any child, we expected to fail', () => {
    const payload = undefined;
    const isUnion = Union (String, Number).Δ.check (payload);
    expect (isSuccessOf (isUnion, payload)).toBeFalsy ();
  });

  it ('When Union is checked respecting first child with custom check, we expected to pass', () => {
    const payload = 'this is a string';
    const isUnion = Union (String.Δ.checkWith ([isStringGt (1)]), Number).Δ.check (
      payload
    );
    expect (isSuccessOf (isUnion, payload)).toBeTruthy ();
  });

  it ('When Union is checked respecting second child with custom check, we expected to pass', () => {
    const payload = 10;
    const isUnion = Union (String, Number.Δ.checkWith ([isNumberGt (1)])).Δ.check (
      payload
    );
    expect (isSuccessOf (isUnion, payload)).toBeTruthy ();
  });

  it ('When Union is checked disrespecting first child with custom check, we expected to fail', () => {
    const payload = 'this is a string';
    const isUnion = Union (String.Δ.checkWith ([isStringGt (100)]), Number).Δ.check (
      payload
    );
    expect (isSuccessOf (isUnion, payload)).toBeFalsy ();
  });

  it ('When Union is checked disrespecting second child with custom check, we expected to fail', () => {
    const payload = 10;
    const isUnion = Union (String, Number.Δ.checkWith ([isNumberGt (100)])).Δ.check (
      payload
    );
    expect (isSuccessOf (isUnion, payload)).toBeFalsy ();
  });
});
