import Array, { ArrayΔ$ } from '@runtime/types/Array/Array';
import String from '@runtime/types/String/String';

import { isSuccessOf } from '@algebraic/types/Result/Functions';
import { isGreaterThan as isStringGt } from '@runtime/types/String/checks/isGreaterThan';
import { isGreaterThan as isArrayGt } from '@runtime/types/Array/checks/isGreaterThan';

describe ('Array Type', () => {
  it ('Symbol identifier exists', () => {
    expect (Array (String)._.type).toBe (ArrayΔ$);
  });

  it ('When array is checked with correct child, we expected to pass', () => {
    const payload = ['this is a arrayof string'];
    const isArray = Array (String).Δ.check (payload);
    expect (isSuccessOf (isArray, payload)).toBeTruthy ();
  });

  it ('When readonly array is checked with correct child, we expected to pass', () => {
    const payload = ['this is a arrayof string'];
    const isArray = Array (String).Δ.asReadOnly ().Δ.check (payload);
    expect (isSuccessOf (isArray, payload)).toBeTruthy ();
  });

  it ('When array is checked with incorrect child, we expected to fail', () => {
    const payload = undefined;
    const isArray = Array (String).Δ.check (payload);
    expect (isSuccessOf (isArray, payload)).toBeFalsy ();
  });

  it ('When array is checked with custom check and respect custom check & child, we expected to pass', () => {
    const payload = ['string 1', 'string 2', 'string 3'];
    const isArray = Array (String)
      .Δ.checkWith ([isArrayGt (2)])
      .Δ.check (payload);
    expect (isSuccessOf (isArray, payload)).toBeTruthy ();
  });

  it ('When array is checked with custom check and respect custom check & does not respect child, we expected to fail', () => {
    const payload = [true, 1, false];
    const isArray = Array (String)
      .Δ.checkWith ([isArrayGt (2)])
      .Δ.check (payload);
    expect (isSuccessOf (isArray, payload)).toBeFalsy ();
  });

  it ('When array is checked with custom check and does not respect custom check but respect child, we expected to fail', () => {
    const payload = ['string 1', 'string 2', 'string 3'];
    const isArray = Array (String)
      .Δ.checkWith ([isArrayGt (10)])
      .Δ.check (payload);
    expect (isSuccessOf (isArray, payload)).toBeFalsy ();
  });

  it ('When array is checked with child custom check and respects, we expected to pass', () => {
    const payload = ['string greater than 100'];
    const isArray = Array (String.Δ.checkWith ([isStringGt (10)])).Δ.check (
      payload
    );
    expect (isSuccessOf (isArray, payload)).toBeTruthy ();
  });

  it ('When array is checked with child custom check and does not respect its, we expected to fail', () => {
    const payload = ['string less than 100'];
    const isArray = Array (String.Δ.checkWith ([isStringGt (100)])).Δ.check (
      payload
    );
    expect (isSuccessOf (isArray, payload)).toBeFalsy ();
  });

  it ('When array and child are checked with custom check and respect custom check of both, we expected to pass', () => {
    const payload = ['true', 'true', 'true'];
    const isArray = Array (String.Δ.checkWith ([isStringGt (3)]))
      .Δ.checkWith ([isArrayGt (2)])
      .Δ.check (payload);
    expect (isSuccessOf (isArray, payload)).toBeTruthy ();
  });

  it ('When array and child are checked with custom check and disrespect custom check of both, we expected to fail', () => {
    const payload = ['true', 'true'];
    const isArray = Array (String.Δ.checkWith ([isStringGt (10)]))
      .Δ.checkWith ([isArrayGt (2)])
      .Δ.check (payload);
    expect (isSuccessOf (isArray, payload)).toBeFalsy ();
  });
});
