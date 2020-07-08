import { Semigroup } from './Semigroup';

interface Monoid<Type> extends Semigroup<Type> {
  λ: {
    readonly kind: Type;
    readonly empty: Type;
    readonly concat: Semigroup<Type>['λ']['concat'];
  }; 
}

export { Monoid };
