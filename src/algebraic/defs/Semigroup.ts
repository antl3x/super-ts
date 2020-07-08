interface Semigroup<Type> {
  λ: {
    readonly kind: Type;
    readonly concat: (p1: Type) => (p2: Type) => Type;
  };
}

export { Semigroup };
