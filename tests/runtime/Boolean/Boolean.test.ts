import Boolean, { BooleanΔ$ } from '@runtime/types/Boolean/Boolean';
import { isSuccessOf } from '@algebraic/types/Validation/Functions';

describe ('Boolean Type', () => {
  it ('Symbol identifier exists', () => {
    expect (Boolean.type).toBe (BooleanΔ$);
  });

  it ('When Boolean is check, we expected to pass', () => {
    const payload = true;
    const isBoolean = Boolean.check (payload);
    expect (isSuccessOf (isBoolean, payload)).toBeTruthy ();
  });

  it ('When something that is not a Boolean is checked, we expected to fail', () => {
    const payload = 'this is a boolean';
    const isBoolean = Boolean.check (payload);
    expect (isSuccessOf (isBoolean, payload)).toBeFalsy ();
  });
});
