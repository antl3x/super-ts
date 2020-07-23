import { tap } from '@algebraic/common/tap';
import ResultModule from '@algebraic/types/Result';
import pipe from 'ramda/src/pipe';
import { isSuccessOf } from '@algebraic/types/Result/Functions';

it ('Should pass when we update state of database with tap', () => {
  let DbInstance = null;
  const User = ResultModule.λ.of ({ firstName: 'Mike' });
  const saveToDb = (user: object) => {
    DbInstance = user;
  };
  const saveUserRes = pipe (() => User, tap (ResultModule) (saveToDb)) ();
  expect (isSuccessOf (saveUserRes, { firstName: 'Mike' })).toBeTruthy ();
  expect (DbInstance).toStrictEqual ({ firstName: 'Mike' });
});
