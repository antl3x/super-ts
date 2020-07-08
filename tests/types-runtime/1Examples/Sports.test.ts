import {
  String,
  Number,
  Boolean,
  Array,
  Record,
  Literal,
  Tuple,
  Union,
} from 'src/runtime';
import { TypeOf } from '@runtime/defs';
import { isSuccessOf } from '@algebraic/types/Validation/Functions';

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

  const isTeam = Team.check (teamPayload);
  expect (isSuccessOf (isTeam, teamPayload)).toBeTruthy ();
});

it ('Should pass with an invalid team', () => {
  const teamPayload = {
    name: true,
    yearFounded: '1974',
    league: 'Soccer',
    type: 'other',
  };

  const isTeam = Team.check (teamPayload);
  expect (isSuccessOf (isTeam, teamPayload)).toBeFalsy ();
});
