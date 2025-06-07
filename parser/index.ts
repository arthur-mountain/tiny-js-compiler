import type { TokenType } from "../lexer";

type AST = {
  type: "Program";
  body: Statement[];
};

// Expression
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

// Statement
type Statement =
  | VariableDeclaration
  | FunctionDeclaration
  | ReturnStatement
  | WhileStatement
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

type FunctionDeclaration = {
  type: "FunctionDeclaration";
  id: Identifier;
  params: Identifier[];
  body: BlockStatement;
};

type BlockStatement = {
  type: "BlockStatement";
  body: Statement[];
};

type ReturnStatement = {
  type: "ReturnStatement";
  argument: Expression;
};

type WhileStatement = {
  type: "WhileStatement";
  test: Expression;
  body: BlockStatement;
};

type ExpressionStatement = {
  type: "ExpressionStatement";
  expression: Expression;
};

// Parser implementation

const parser = (tokens: TokenType[]) => {
  let i = 0;

  const peek = (pos: number = i): TokenType => tokens[pos];
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

  const parseExpression = (minPrecedence: number = 0): Expression => {
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
      const id = eat("identifier");

      if (peek().type === "punctuation" && peek().value === "(") {
        eat("punctuation", "(");
        const args: Expression[] = [];
        if (peek().value !== ")") {
          do {
            args.push(parseExpression(0));
            if (peek().value !== ",") break;
            eat("punctuation", ",");
          } while (true);
        }
        eat("punctuation", ")");
        return {
          type: "CallExpression",
          callee: { type: "Identifier", name: id.value },
          arguments: args,
        };
      }

      return { type: "Identifier", name: id.value };
    }

    if (token.type === "punctuation" && token.value === "(") {
      eat("punctuation", "(");
      const expr = parseExpression(0);
      eat("punctuation", ")");
      return expr;
    }

    throw new Error(
      `Unknown expression starting with token '${token.type}' '${token.value}'`,
    );
  };

  const parseVariableDeclaration = (): VariableDeclaration => {
    const kind = eat("keyword").value as VariableDeclaration["kind"];
    const declarations: VariableDeclaration["declarations"] = [];

    do {
      const id = eat("identifier");
      eat("operator", "=");
      const init = parseExpression(0);

      declarations.push({
        type: "VariableDeclarator",
        id: { type: "Identifier", name: id.value },
        init,
      });

      if (peek().value !== ",") break;
      eat("punctuation", ",");
    } while (true);

    eat("punctuation", ";");

    return { type: "VariableDeclaration", kind, declarations };
  };

  const parseFunctionDeclaration = (): FunctionDeclaration => {
    eat("keyword", "function");
    const name = eat("identifier").value;
    eat("punctuation", "(");

    const params: Identifier[] = [];
    if (peek().value !== ")") {
      do {
        params.push({ type: "Identifier", name: eat("identifier").value });
        if (peek().value !== ",") break;
        eat("punctuation", ",");
      } while (true);
    }
    eat("punctuation", ")");

    const body = parseBlockStatement();

    return {
      type: "FunctionDeclaration",
      id: { type: "Identifier", name },
      params,
      body,
    };
  };

  const parseReturnStatement = (): ReturnStatement => {
    eat("keyword", "return");
    const argument = parseExpression(0);
    eat("punctuation", ";");
    return { type: "ReturnStatement", argument };
  };

  const parseWhileStatement = (): WhileStatement => {
    eat("keyword", "while");
    eat("punctuation", "(");
    const test = parseExpression(0);
    eat("punctuation", ")");

    const body = parseBlockStatement();
    return { type: "WhileStatement", test, body };
  };

  const parseBlockStatement = (): BlockStatement => {
    eat("punctuation", "{");
    const body: Statement[] = [];
    while (peek().value !== "}") {
      body.push(parseStatement());
    }
    eat("punctuation", "}");

    return { type: "BlockStatement", body };
  };

  const declarators = new Set(["var", "let", "const"]);
  const parseStatement = (): Statement => {
    const token = peek();

    if (token.type === "keyword") {
      if (declarators.has(token.value)) {
        return parseVariableDeclaration();
      } else if (token.value === "function") {
        return parseFunctionDeclaration();
      } else if (token.value === "return") {
        return parseReturnStatement();
      } else if (token.value === "while") {
        return parseWhileStatement();
      }
    }

    // Fallback ExpressionStatement
    const expr = parseExpression(0);
    eat("punctuation", ";");
    return { type: "ExpressionStatement", expression: expr };
  };

  const parseProgram = (): AST => {
    const body: Statement[] = [];
    while (i < tokens.length) {
      body.push(parseStatement());
    }
    return { type: "Program", body };
  };

  return parseProgram();
};

export default parser;
