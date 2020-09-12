import { isSuccessOf } from '@algebraic/types/Result/Functions';
import Intersect, { IntersectΔ$ } from '@runtime/types/Intersect/Intersect';
import Record from '@runtime/types/Record/Record';
import String from '@runtime/types/String/String';

describe ('Intersect Type', () => {
  it ('Symbol identifier exists', () => {
    expect (Intersect (Record ({a: String}), Record ({b: String}))._.type).toBe (IntersectΔ$);
  });

  it ('When Intersect is checked with null, we expected to fail', () => {
    const payload = undefined;
    const isIntersect = Intersect (Record ({a: String}), Record ({b: String})).Δ.check (payload);
    expect (isSuccessOf (isIntersect, payload)).toBeFalsy ();
  });

  it ('When Intersect is checked respecting all childs, we expected to suceed', () => {
    const payload = { firstName: 'Mike', lastName: 'Tyson' };
    const isIntersect = Intersect (Record ({firstName: String}), Record ({lastName: String})).Δ.check (payload);

    expect (isSuccessOf (isIntersect, payload)).toBeTruthy ();
  });

  it ('When Intersect is checked respecting only one child, we expected to fail', () => {
    const payload = { firstName: 1, lastName: 'Tyson' };
    const isIntersect = Intersect (Record ({firstName: String}), Record ({lastName: String})).Δ.check (payload);

    expect (isSuccessOf (isIntersect, payload)).toBeFalsy ();
  });

  it ('When Intersect is checked respecting only second child, we expected to fail', () => {
    const payload = { firstName: 1, lastName: true };
    const isIntersect = Intersect (Record ({firstName: String}), Record ({lastName: String})).Δ.check (payload);

    expect (isSuccessOf (isIntersect, payload)).toBeFalsy ();
  });
});