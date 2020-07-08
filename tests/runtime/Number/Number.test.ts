import Number, { NumberΔ$ } from '@runtime/types/Number/Number';
import { isGreaterThan } from '@runtime/types/Number/checks/isGreaterThan';
import { isSuccessOf } from '@algebraic/types/Validation/Functions';

describe ('Number Type', () => {
  it ('Symbol identifier exists', () => {
    expect (Number.type).toBe (NumberΔ$);
  });

  it ('When Number is check, we expected to pass', () => {
    const payload = 100;
    const isNumber = Number.check (payload);
    expect (isSuccessOf (isNumber, payload)).toBeTruthy ();
  });

  it ('When something that is not a Number is checked, we expected to fail', () => {
    const payload = 'this is not a number';
    const isNumber = Number.check (payload);
    expect (isSuccessOf (isNumber, payload)).toBeFalsy ();
  });

  it ('When number is checked with custom check, we expected to pass', () => {
    const payload = 10;
    const isNumber = Number.checkWith ([isGreaterThan (1)]).check (payload);
    expect (isSuccessOf (isNumber, payload)).toBeTruthy ();
  });

  it ('When number is checked with custom check that does not respect the rules, we expected to fail', () => {
    const payload = 1;
    const isNumber = Number.checkWith ([isGreaterThan (10)]).check (payload);
    expect (isSuccessOf (isNumber, payload)).toBeFalsy ();
  });
});
