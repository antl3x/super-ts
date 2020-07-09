export { Maybe$λ };
export type { Maybeλ, Justλ, Nothingλ };

const Maybe$λ = 'Maybe';
type Maybe$λ = typeof Maybe$λ;
type Maybeλ<A> = Nothingλ | Justλ<A>;

declare module  '../../../hkt' {
  interface Type2Kind1<A> {
    readonly [Maybe$λ]: Maybeλ<A>;
  }
}

/**
 * TODO: Add comment
 */
interface Nothingλ {
  λ: {
    id: 'Nothing';
    kind: Maybe$λ;
    typeA: never;
  };
}
/**
 * TODO: Add comment
 */
interface Justλ<A> {
  λ: {
    id: 'Just';
    kind: Maybe$λ;
    typeA: A;
    value: A;
  };
}


