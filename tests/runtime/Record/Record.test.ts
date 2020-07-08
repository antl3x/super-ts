import Record, { RecordΔ$ } from '@runtime/types/Record/Record';
import String from '@runtime/types/String/String';
import Array from '@runtime/types/Array/Array';
import Number from '@runtime/types/Number/Number';

import { isSuccessOf, isFailure } from '@algebraic/types/Validation/Functions';
import { isGreaterThan as isStringGt } from '@runtime/types/String/checks/isGreaterThan';
import { isGreaterThan as isNumberGt } from '@runtime/types/Number/checks/isGreaterThan';

describe ('Record Type', () => {
  it ('Symbol identifier exists', () => {
    const Person = Record ({
      firstName: String,
    });
    expect (Person.type).toBe (RecordΔ$);
  });

  it ('When Record is checked with incorrect payload, we expected to fail', () => {
    const payload = undefined;
    const isPerson = Record ({
      firstName: String,
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
  });

  it ('When Record is checked with correct child, we expected to pass', () => {
    const payload = { firstName: 'Mike' };
    const isPerson = Record ({
      firstName: String,
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeTruthy ();
  });

  it ('When Record is checked with incorrect child, we expected to fail', () => {
    const payload = { firstName: true };
    const isPerson = Record ({
      firstName: String,
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
  });

  it ('When Record is checked not respecting child custom check, we expected to fail', () => {
    const payload = { firstName: 'Mike' };
    const isPerson = Record ({
      firstName: String.checkWith ([isStringGt (10)]),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
  });

  it ('When Record is checked respecting child custom check, we expected to pass', () => {
    const payload = { firstName: 'Mike Pompeo' };
    const isPerson = Record ({
      firstName: String.checkWith ([isStringGt (10)]),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeTruthy ();
  });

  it ('When Record is checked respecting first child custom check but not the second, we expected to fail', () => {
    const payload = { firstName: 'Mike Pompeo', age: 10 };
    const isPerson = Record ({
      firstName: String.checkWith ([isStringGt (10)]),
      age: Number.checkWith ([isNumberGt (18)]),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
  });

  it ('When Record is checked respecting first child custom check but not the second, we expected to fail', () => {
    const payload = { firstName: 'Mike', age: 20 };
    const isPerson = Record ({
      firstName: String.checkWith ([isStringGt (10)]),
      age: Number.checkWith ([isNumberGt (18)]),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
  });

  it ('When Record is checked respecting all first leval child custom check but not the inner record, we expected to fail', () => {
    const payload = { firstName: 'Mike Pompeo', age: 20 };
    const Boss = Record ({ firstName: String });
    const isPerson = Record ({
      firstName: String.checkWith ([isStringGt (10)]),
      age: Number.checkWith ([isNumberGt (18)]),
      boss: Boss,
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
  });

  it ('When Record is checked respecting all childs with nested levels, we expected to pass', () => {
    const payload = {
      firstName: 'Mike Pompeo',
      age: 20,
      boss: { firstName: 'Jonh' },
    };
    const Boss = Record ({ firstName: String });
    const isPerson = Record ({
      firstName: String.checkWith ([isStringGt (10)]),
      age: Number.checkWith ([isNumberGt (18)]),
      boss: Boss,
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeTruthy ();
  });

  it ('When Record is checked with incorrect payload, we expected to have a valid path', () => {
    const payload = undefined;
    const isPerson = Record ({
      info: Record ({
        name: String,
      }),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
    expect (isFailure (isPerson) ? isPerson.λ.value[0].path : undefined).toBe ('');
  });

  it ('When Record is checked with incorrect property, we expected to have a valid path', () => {
    const payload = { info: true };
    const isPerson = Record ({
      info: Record ({
        name: String,
      }),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
    expect (isFailure (isPerson) ? isPerson.λ.value[0].path : undefined).toBe (
      'info'
    );
  });

  it ('When Record is checked with incorrect deep property, we expected to have a valid path', () => {
    const payload = { info: { name: true } };
    const isPerson = Record ({
      info: Record ({
        name: String,
      }),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
    expect (isFailure (isPerson) ? isPerson.λ.value[0].path : undefined).toBe (
      'info.name'
    );
  });

  it ('When Record is checked with incorrect deep property as array, we expected to have a valid path', () => {
    const payload = { info: { name: true } };
    const isPerson = Record ({
      info: Record ({
        name: Array (String),
      }),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
    expect (isFailure (isPerson) ? isPerson.λ.value[0].path : undefined).toBe (
      'info.name'
    );
  });

  it ('When Record is checked with incorrect specific array indiceon a deep property, we expected to have a valid path', () => {
    const payload = { info: { name: ['Mike', 'Julia', true] } };
    const isPerson = Record ({
      info: Record ({
        name: Array (String),
      }),
    }).check (payload);
    expect (isSuccessOf (isPerson, payload)).toBeFalsy ();
    expect (isFailure (isPerson) ? isPerson.λ.value[0].path : undefined).toBe (
      'info.name[2]'
    );
  });
});
