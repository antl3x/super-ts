
export { pipe };

function pipe <A>(a: A): A;
function pipe <A, B>(a: A, a2b: (a: A) => B): B;
function pipe <A, B, C>(a: A, a2b: (a: A) => B, b2c: (b: B) => C): C;
function pipe <A, B, C, D>(a: A, a2b: (a: A) => B, b2c: (b: B) => C, c2d: (c: C) => D): D;
function pipe <A, B, C, D, E>(
    a: A, a2b: (a: A) => B,
    b2c: (b: B) => C,
    c2d: (c: C) => D,
    d2e: (d: D) => E
  ): E;
function pipe <A, B, C, D, E, F>(
    a: A, a2b: (a: A) => B,
    b2c: (b: B) => C,
    c2d: (c: C) => D,
    d2e: (d: D) => E,
    e2f: (e: E) => F
  ): F;
function pipe <A, B, C, D, E, F, G>(
    a: A, a2b: (a: A) => B,
    b2c: (b: B) => C,
    c2d: (c: C) => D,
    d2e: (d: D) => E,
    e2f: (f: E) => F,
  f2g: (e: F) => G
  ): G;
function pipe <A, B, C, D, E, F, G, H>(
    a: A, a2b: (a: A) => B,
    b2c: (b: B) => C,
    c2d: (c: C) => D,
    d2e: (d: D) => E,
    e2f: (e: E) => F,
  f2g: (f: F) => G,
    g2h: (g: G) => H
  ): H;
function pipe <A, B, C, D, E, F, G, H, I>(
    a: A, a2b: (a: A) => B,
    b2c: (b: B) => C,
    c2d: (c: C) => D,
    d2e: (d: D) => E,
    e2f: (e: E) => F,
  f2g: (f: F) => G,
    g2h: (g: G) => H,
    h2i: (h: H) => I
  ): I;
function pipe <A, B, C, D, E, F, G, H, I, J>(
    a: A, a2b: (a: A) => B,
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
    a: A, a2b: (a: A) => B,
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

function pipe(a: any, ...fns: ((...args: any[]) => any)[]): any {
  if(fns.length > 0) {
    return fns.reduce ((prev, fn) => fn (prev), a);
  }
  return a;
}
