
export { pipe };

function pipe <A>(a: A): A;
function pipe <A, B>(a2b: (a: A) => B): B;
function pipe <A, B, C>(a2b: (a: A) => B, b2c: (b: B) => C): C;
function pipe <A, B, C, D>(a2b: (a: A) => B, b2c: (b: B) => C, c2d: (c: C) => D): D;
function pipe <A, B, C, D, E>(
    a2b: (a: A) => B,
    b2c: (b: B) => C,
    c2d: (c: C) => D,
    d2e: (d: D) => E
  ): E;
function pipe <A, B, C, D, E, F>(
    a2b: (a: A) => B,
    b2c: (b: B) => C,
    c2d: (c: C) => D,
    d2e: (d: D) => E,
    e2f: (e: E) => F
  ): F;
function pipe <A, B, C, D, E, F, G>(
    a2b: (a: A) => B,
    b2c: (b: B) => C,
    c2d: (c: C) => D,
    d2e: (d: D) => E,
    e2f: (f: E) => F,
  f2g: (e: F) => G
  ): G;
function pipe <A, B, C, D, E, F, G, H>(
    a2b: (a: A) => B,
    b2c: (b: B) => C,
    c2d: (c: C) => D,
    d2e: (d: D) => E,
    e2f: (e: E) => F,
  f2g: (f: F) => G,
    g2h: (g: G) => H
  ): H;
function pipe <A, B, C, D, E, F, G, H, I>(
    a2b: (a: A) => B,
    b2c: (b: B) => C,
    c2d: (c: C) => D,
    d2e: (d: D) => E,
    e2f: (e: E) => F,
  f2g: (f: F) => G,
    g2h: (g: G) => H,
    h2i: (h: H) => I
  ): I;
function pipe <A, B, C, D, E, F, G, H, I, J>(
    a2b: (a: A) => B,
    b2c: (b: B) => C,
    c2d: (c: C) => D,
    d2e: (d: D) => E,
    e2f: (e: E) => F,
  f2g: (f: F) => G,
    g2h: (g: G) => H,
    h2i: (h: H) => I,
    i2j: (i: I) => J
  ): J;
function pipe <A, B, C, D, E, F, G, H, I, J, K>(
    a2b: (a: A) => B,
    b2c: (b: B) => C,
    c2d: (c: C) => D,
    d2e: (d: D) => E,
    e2f: (e: E) => F,
    f2g: (f: F) => G,
    g2h: (g: G) => H,
    h2i: (h: H) => I,
    i2j: (i: I) => J,
    i2k: (j: J) => K
  ): K;

function pipe(...fns: ((...args: any[]) => any)[]): any {
    return function (p1: any) {
      return fns.reduce ((prev, fn) => fn (prev), p1);
  };
}
