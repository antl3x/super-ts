export { Either$λ };
export type { Eitherλ, Rightλ, Leftλ };

const Either$λ = 'Either';
type Either$λ = typeof Either$λ;
type Eitherλ<A, B> = Leftλ<A, B> | Rightλ<A, B>;

declare module  '@hkt' {
  interface Type2Kind2<A = unknown, B = unknown> {
    readonly [Either$λ]: Eitherλ<A, B>;
  }
}

/**
 * TODO: Add comment
 */
interface Leftλ<A, B> {
  λ: {
    id: 'Left';
    kind: Either$λ;
    typeA: A;
    typeB: B;
    value: A;
  };
}

/**
 * TODO: Add comment
 */
interface Rightλ<A, B> {
  λ: {
    id: 'Right';
    kind: Either$λ;
    typeA: A;
    typeB: B;
    value: B;
  };
}


