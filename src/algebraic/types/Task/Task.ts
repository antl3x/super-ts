export { Task$λ };
export type { Taskλ };

const Task$λ = 'Task';
type Task$λ = typeof Task$λ;

declare module  '../../../hkt' {
  interface Type2Kind1<A> {
    readonly [Task$λ]: Taskλ<A>;
  }
}

/**
 * TODO: Add comment
 */
interface Taskλ<A> {
  (): Promise<A>;
}



