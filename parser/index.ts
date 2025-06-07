import type { TokenType } from "../lexer";

type AST = {
  type: "Program";
  body: Statement[];
};

type Expression =
  | NumberLiteral
  | StringLiteral
  | BooleanLiteral
  | Identifier
  | CallExpression
  | BinaryExpression;

type NumberLiteral = { type: "NumberLiteral"; value: string };
type StringLiteral = { type: "StringLiteral"; value: string };
type BooleanLiteral = { type: "BooleanLiteral"; value: string };
type Identifier = { type: "Identifier"; name: string };
type CallExpression = {
  type: "CallExpression";
  callee: Identifier;
  arguments: Expression[];
};

type BinaryExpression = {
  type: "BinaryExpression";
  operator: string;
  left: Expression;
  right: Expression;
};

type Statement =
  | VariableDeclaration
  | FunctionStatement
  | ReturnStatement
  | ExpressionStatement;

type VariableDeclaration = {
  type: "VariableDeclaration";
  kind: "var" | "let" | "const";
  declarations: {
    type: "VariableDeclarator";
    id: Identifier;
    init: Expression;
  }[];
};

type FunctionStatement = {
  type: "FunctionDeclaration";
  id: Identifier;
  params: Identifier[];
  body: {
    type: "BlockStatement";
    body: ReturnStatement[];
  };
};

type ReturnStatement = {
  type: "ReturnStatement";
  argument: {
    type: "Literal";
    value: string;
    raw: string;
  };
};

type ExpressionStatement = {
  type: "ExpressionStatement";
  expression: Expression;
};

const parser = (tokens: TokenType[]) => {
  let i = 0;

  const peek = (pos: number = i): TokenType => {
    return tokens[pos];
  };

  const next = (count: number = 1) => {
    i += count;
  };

  const eat = (type: TokenType["type"], value?: string): TokenType => {
    const token = peek();
    if (token.type !== type || (value && token.value !== value)) {
      throw new Error(
        `Unexpected token ${token.type}(${token.value}), expected ${type} ${value ?? ""}`,
      );
    }
    next();
    return token;
  };

  // example:
  //  - let x = 5;
  //  - let x = 5, y = 5;
  //  Operator UnSupported:
  //  - let x = 5 + 10; UnSupported yet(BinaryExpression)
  //  - let x = (5 + 10) + 10; UnSupported yet(Priority of brace)
  //  - let x = y + 5; UnSupported yet(Identifier BinaryExpression)

  const precedence: Record<string, number> = {
    "==": 1,
    "!=": 1,
    "<": 2,
    ">": 2,
    "+": 3,
    "-": 3,
    "*": 4,
    "/": 4,
  };
  const parseExpression = (minPrecedence: number): Expression => {
    let left = parsePrimaryExpression();

    while (
      peek().type === "operator" &&
      precedence[peek().value] >= minPrecedence
    ) {
      const operator = eat("operator").value;

      let right = parsePrimaryExpression();

      while (
        peek().type === "operator" &&
        precedence[peek().value] > precedence[operator]
      ) {
        right = parseExpression(precedence[peek().value]);
      }

      left = {
        type: "BinaryExpression",
        operator,
        left,
        right,
      };
    }

    return left;
  };

  // 核心邏輯
  const parsePrimaryExpression = (): Expression => {
    const token = peek();

    if (token.type === "number") {
      next();
      return { type: "NumberLiteral", value: token.value };
    }

    if (token.type === "string") {
      next();
      return { type: "StringLiteral", value: token.value };
    }

    if (token.type === "boolean") {
      next();
      return { type: "BooleanLiteral", value: token.value };
    }

    if (token.type === "identifier") {
      next();
      if (peek().type === "punctuation" && peek().value === "(") {
        eat("punctuation", "(");
        const args: Expression[] = [];
        if (peek().value !== ")") {
          do {
            args.push(parseExpression(0));
            if (peek().value === ",") eat("punctuation", ",");
          } while (peek().value !== ")");
        }
        eat("punctuation", ")");
        return {
          type: "CallExpression",
          callee: { type: "Identifier", name: token.value },
          arguments: args,
        };
      }
      return { type: "Identifier", name: token.value };
    }

    if (token.type === "punctuation" && token.value === "(") {
      eat("punctuation", "(");
      const expr = parseExpression(0);
      eat("punctuation", ")");
      return expr;
    }

    throw new Error(
      `Unknown primary expression starting with token '${token.type}' '${token.value}'`,
    );
  };

  const parseVariableDeclaration = (): VariableDeclaration => {
    const kind = eat("keyword").value as VariableDeclaration["kind"];

    if (peek().type !== "identifier") {
      throw new Error("Variable name is missing");
    }

    const declarations: VariableDeclaration["declarations"] = [];
    while (peek().type === "identifier") {
      const id = eat("identifier");
      eat("operator", "=");
      const init = parseExpression(0);
      declarations.push({
        type: "VariableDeclarator",
        id: { type: "Identifier", name: id.value },
        init,
      });
      if (eat("punctuation").value === ";") {
        break;
      }
    }
    return { type: "VariableDeclaration", kind, declarations };
  };

  const parseFunctionDeclaration = (): FunctionStatement => {
    eat("keyword", "function");
    const name = eat("identifier").value;
    eat("punctuation", "(");

    const params: Identifier[] = [];
    while (true) {
      params.push({ type: "Identifier", name: eat("identifier").value });
      if (eat("punctuation").value === ")") {
        break;
      }
    }

    const blockStatementBody: FunctionStatement["body"]["body"] = [];
    eat("punctuation", "{");
    eat("punctuation", "}");

    return {
      type: "FunctionDeclaration",
      id: { type: "Identifier", name },
      params,
      body: {
        type: "BlockStatement",
        body: blockStatementBody,
      },
    };
  };

  const declarators = new Set(["var", "let", "const"]);
  const parseStatement = (): Statement => {
    const token = peek();

    if (token.type === "keyword") {
      if (declarators.has(token.value)) {
        return parseVariableDeclaration();
      } else if (token.value === "function") {
        return parseFunctionDeclaration();
      }
    }

    throw new Error(
      `UnSupported statement with token '${token.type}' '${token.value}'`,
    );
  };

  const body: Statement[] = [];
  while (i < tokens.length) {
    body.push(parseStatement());
  }
  return { type: "Program", body } satisfies AST;
};

export default parser;
