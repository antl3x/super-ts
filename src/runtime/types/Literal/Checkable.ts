import ResultModule from '@algebraic/types/Result';
import { Check } from '@runtime/defs';
import { LiteralΔ } from './Literal';
export { checkInt };

const isLiteral: Check<LiteralΔ<any>> = (a, path, child) =>
  a === child
    ? ResultModule.λ.Success (a)
    : ResultModule.λ.Failure ([
        {
          code: 'IS_LITERAL',
          message: `Expected literal (${child} :: ${typeof child}) but found (${a} :: ${typeof a})`,
          path,
        },
      ]);

const checkInt = (a: unknown, path: string, child: any) =>
  isLiteral (a, path, child);
