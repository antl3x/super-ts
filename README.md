# <span id="section:home">🦸 λΔ super-ts</span>

[![npm version](https://img.shields.io/npm/v/super-ts.svg)](https://www.npmjs.com/package/super-ts)

**super-ts** is a Typescript functional programming library inspired by [Haskell](https://www.haskell.org/) and [PureScript](http://www.purescript.org/) providing both runtime type checking and functional algebraic data types.

**super-ts** were built to unify concepts and tools of some wonderful libraries, such _[fp-ts](https://github.com/gcanti/fp-ts)_, _[io-ts](https://github.com/gcanti/io-ts)_ and _[runtypes](https://github.com/pelotom/runtypes)_.

Forwarding to be an all-in-one solution, **super-ts** is divided into two main categories: **Algebraic Types** & **Runtime Types**;

- _Runtime Types_: static and runtime type checking
- _Algebraic Types_: Monads, Functors, Semigroups and others.

## <span id="section:instalation">Instalation</span>

`npm install super-ts` will install super-ts for use.

## <span id="section:consuming">Consuming</span>

You can use **super-ts** in two flavors: CommonJS or ES Modules.

```ts
import { String } from "super-ts/cjs/runtime";
import { Either } from "super-ts/cjs/algebraic";
```

```ts
import { String } from "super-ts/esm/runtime";
import { Either } from "super-ts/esm/algebraic";
```

PS: If you are using the package with ES Modules over **node** you should run your application with the flag `--experimental-specifier-resolution=node`

ES Modules enables [tree shaking](https://webpack.js.org/guides/tree-shaking/) to be possible using bundlers.

## <span id="section:runtime-types">Δ Runtime Types</span>

**super-ts** provides you with primitive types that can be safely type-checked at runtime with custom constraints and use this same schema as your Typescript static type signature. You can also provide custom runtime checks to build more advanced types that fit your use cases.

### <span id="section:runtime-types-example">Δ Why is useful?</span>

Let's suppose that you have the following static type schema on your Typescript project:

```ts
type League = "NFL" | "MLB" | "NBA" | "WNBA";

type Gender = "Male" | "Female" | "Other";

type Team = {
  name: string;
  yearFounded: number;
  league: League;
  type: "team";
};

type Player = {
  firstName: string;
  lastName: string;
  salaryOnTeam: [number, Team];
  age: number;
  isActive: boolean;
  teamsPlayed: Team[];
  gender: Gender;
  type: "player";
};
```

This works fine on TypeScript since you use this schema to type safe your application on compile time, but what about runtime? What happens if you receive this schema as a payload from some external source?

In this scenario your application is unsafe and you need to do a lot of validations to avoid runtime errors.

‌To avoid all this boring work you can use **super-ts** runtime types to define your schema keeping your application safe on runtime as well on compile time, re-using static types generated by **super-ts**.

### <span id="section:runtime-types-example">Δ Example (Defining schema with _super-ts_)</span>

In order to define the same schema as above using _super-ts_ we do the following:

```ts
import {
  String,
  Number,
  Boolean,
  Array,
  Record,
  Literal,
  Tuple,
  Union,
} from "super-ts/esm/runtime";

const League = Union(
  Literal("NFL"),
  Literal("MLB"),
  Literal("NBA"),
  Literal("WNBA")
);

const Gender = Union(Literal("Male"), Literal("Female"), Literal("Other"));

const Team = Record({
  name: String,
  yearFounded: Number,
  league: League,
  type: Literal("team"),
});

const Player = Record({
  firstName: String,
  lastName: String,
  salaryOnTeam: Tuple(Number, Team),
  age: Number,
  isActive: Boolean,
  teamsPlayed: Array(Team),
  gender: Gender,
  type: Literal("player"),
});
```

When you define your schema using **super-ts** you can get Typescript static types using the custom `TypeOf` type.

```ts
import { TypeOf } from 'super-ts/esm/runtime'

type Player = TypeOf<typeof Player>;

// type Player = {
//    firstName: string;
//    lastName: string;
//    salaryOnTeam: [number, {
//        name: string;
//        yearFounded: number;
//        league: "NFL" | "MLB" | "NBA" | "WNBA";
//        type: "team";
//    }];
//    age: number;
//    isActive: boolean;
//    teamsPlayed: {
//        ...;
//    }[];
//    gender: "Male" | "Female" | "Other";
//    type: "player";
// }


```

### <span id="section:runtime-types-example">Δ API</span>

When you use the runtime types, we expose an API under the property `.Δ` so you can use functions available for the type.

#### <a name="create" href="#L512">`check :: a -⁠> Validationλ InvalidCheck a`</a>

Takes an unknown payload and validates against the type. If the validation suceeds,
we return an algebraic type called _Validationλ_ of _Sucess_ which contains the payload.
If the check fails we return an _Validationλ_ of _Failure_ containing an _NonEmptyArrayλ_
of _InvalidCheck_ containing all the errors found on that payload.

**Example**

```ts
import { identity } from 'super-ts/common/identity';
import { Validation } from 'super-ts/algebraic';

/** other imports .. */

/** above code .. */

const Team = Record({
  name: String,
  yearFounded: Number,
  league: League,
  type: Literal("team"),
});

const teamInvalidPayload = {
  name: null,
  yearFounded: "1974",
  league: "NFL",
  type: "team",
};

const isValidTeam = Team.Δ.check(teamInvalidPayload);

const isValidTeamRes = Validation.λ.fold (identity, identity) (isValidTeam);


// isValidTeam = [
//    {
//        code: 'IS_STRING',
//        message: 'Expected string but found (null :: object)',
//        path: 'name'
//    },
//    {
//        code: 'IS_NUMBER',
//        message: 'Expected Number but found (1974 :: string)',
//        path: 'yearFounded'
//    }
//  ]

```

## <span id="section:algebraic-types">λ Algebraic Types</span>

This documentation is working in progress.. 😅 🚧
