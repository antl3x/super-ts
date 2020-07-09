import {
  String,
  Number,
  Boolean,
  Array,
  Record,
  Literal,
  Tuple,
  Union,
} from 'src/runtime/index';
import { TypeOf } from '@runtime/defs';
import { isSuccessOf } from '@algebraic/types/Validation/Functions';
import { Validation } from '@algebraic/index';
import { identity } from '@common/identity';

const League = Union (
  Literal ('NFL'),
  Literal ('MLB'),
  Literal ('NBA'),
  Literal ('WNBA')
);

const Gender = Union (Literal ('Male'), Literal ('Female'), Literal ('Other'));

const Team = Record ({
  name: String,
  yearFounded: Number,
  league: League,
  type: Literal ('team'),
});

const Player = Record ({
  firstName: String,
  lastName: String,
  salaryOnTeam: Tuple (Number, Team),
  age: Number,
  isActive: Boolean,
  teamsPlayed: Array (Team),
  gender: Gender,
  type: Literal ('player'),
});

type Player = TypeOf<typeof Player>;

it ('Should pass with a valid team', () => {
  const teamPayload = {
    name: 'Seattle Seahawks',
    yearFounded: 1974,
    league: 'NFL',
    type: 'team',
  };

  const isTeam = Team.Δ.check (teamPayload);
  expect (isSuccessOf (isTeam, teamPayload)).toBeTruthy ();
});

it ('Should fail with an invalid team', () => {
  const teamPayload = {
    name: true,
    yearFounded: '1974',
    league: 'Soccer',
    type: 'other',
  };

  const isTeam = Team.Δ.check (teamPayload);
  expect (isSuccessOf (isTeam, teamPayload)).toBeFalsy ();
});

it ('Should pass with correct error return with an invalid team', () => {
  const teamPayload = {
    name: null,
    yearFounded: '1974',
    league: 'Soccer',
    type: 'other',
  };

  const isTeam = Team.Δ.check (teamPayload);
  const isTeamRes = Validation.λ.fold (identity, identity) (isTeam);
  expect (isTeamRes).toEqual ([
    {
        code: 'IS_STRING',
        message: 'Expected string but found (null :: object)',
        path: 'name'
    },
    {
        code: 'IS_NUMBER',
        message: 'Expected Number but found (1974 :: string)',
        path: 'yearFounded'
    },
    {
      code: 'IS_UNION',
      message: 'Expected (NFL | MLB | NBA | WNBA) but found (Soccer :: string)',
      path: 'league'
    },
    {
      code: 'IS_LITERAL',
      message: 'Expected literal (team :: string) but found (other :: string)',
      path: 'type'
    }
  ]);
});
