import Partial, { PartialΔ$ } from '@runtime/types/Partial/Partial';
import String from '@runtime/types/String/String';
import Number from '@runtime/types/Number/Number';

import { isSuccessOf } from '@algebraic/types/Validation/Functions';
import { isGreaterThan as isStringGt } from '@runtime/types/String/checks/isGreaterThan';
import { isGreaterThan as isNumberGt } from '@runtime/types/Number/checks/isGreaterThan';

describe ('Partial Type', () => {
  it ('Symbol identifier exists', () => {
    const Person = Partial ({
      firstName: String,
    });
    expect (Person.type).toBe (PartialΔ$);
  });

  it ('When Partial is checked with incorrect payload, we expected to fail', () => {
    const payload = undefined;
    const isPerson = Partial ({
      firstName: String,
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
  });

  it ('When Partial is checked with undefined child, we expected to pass', () => {
    const payload = { firstName: undefined };
    const isPerson = Partial ({
      firstName: String,
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeTruthy ();
  });

  it ('When Partial is checked with correct child, we expected to pass', () => {
    const payload = { firstName: 'Mike' };
    const isPerson = Partial ({
      firstName: String,
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeTruthy ();
  });

  it ('When Partial is checked with incorrect child, we expected to fail', () => {
    const payload = { firstName: true };
    const isPerson = Partial ({
      firstName: String,
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
  });

  it ('When Partial is checked not respecting child custom check, we expected to fail', () => {
    const payload = { firstName: 'Mike' };
    const isPerson = Partial ({
      firstName: String.checkWith ([isStringGt (10)]),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
  });

  it ('When Partial is checked respecting child custom check, we expected to pass', () => {
    const payload = { firstName: 'Mike Pompeo' };
    const isPerson = Partial ({
      firstName: String.checkWith ([isStringGt (10)]),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeTruthy ();
  });

  it ('When Partial is checked respecting first child custom check but not the second, we expected to fail', () => {
    const payload = { firstName: 'Mike Pompeo', age: 10 };
    const isPerson = Partial ({
      firstName: String.checkWith ([isStringGt (10)]),
      age: Number.checkWith ([isNumberGt (18)]),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
  });

  it ('When Partial is checked respecting first child custom check but not the second, we expected to fail', () => {
    const payload = { firstName: 'Mike', age: 20 };
    const isPerson = Partial ({
      firstName: String.checkWith ([isStringGt (10)]),
      age: Number.checkWith ([isNumberGt (18)]),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
  });

  it ('When Partial is checked respecting all childs with nested levels, we expected to pass', () => {
    const payload = {
      firstName: 'Mike Pompeo',
      age: 20,
      boss: { firstName: 'Jonh' },
    };
    const Boss = Partial ({ firstName: String });
    const isPerson = Partial ({
      firstName: String.checkWith ([isStringGt (10)]),
      age: Number.checkWith ([isNumberGt (18)]),
      boss: Boss,
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeTruthy ();
  });
});
