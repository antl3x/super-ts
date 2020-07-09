export { Array$λ, Arrayλ };

const Array$λ = 'Array';
type Array$λ = typeof Array$λ;
type Arrayλ<A> = Array<A>;

declare module  '../../../hkt' {
  interface Type2Kind1<A> {
    readonly [Array$λ]: Array<A>;
  }
}
