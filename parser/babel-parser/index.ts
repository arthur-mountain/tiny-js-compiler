import type { TokenType } from "../../lexer";

// Program
export type Program = {
  type: "Program";
  body: Statement[];
};

// Statement
export type Statement =
  | VariableDeclaration
  | FunctionDeclaration
  | ReturnStatement
  | WhileStatement
  | ExpressionStatement
  | BlockStatement;

// Expression
export type Expression =
  | Identifier
  | NumericLiteral
  | StringLiteral
  | BooleanLiteral
  | CallExpression
  | BinaryExpression;

// Identifier
export type Identifier = {
  type: "Identifier";
  name: string;
};

// Literals
export type NumericLiteral = {
  type: "NumericLiteral";
  value: number;
};

export type StringLiteral = {
  type: "StringLiteral";
  value: string;
};

export type BooleanLiteral = {
  type: "BooleanLiteral";
  value: boolean;
};

// Expression types
export type CallExpression = {
  type: "CallExpression";
  callee: Expression;
  arguments: Expression[];
};

export type BinaryExpression = {
  type: "BinaryExpression";
  operator: string;
  left: Expression;
  right: Expression;
};

// VariableDeclaration
export type VariableDeclaration = {
  type: "VariableDeclaration";
  kind: "var" | "let" | "const";
  declarations: VariableDeclarator[];
};

export type VariableDeclarator = {
  type: "VariableDeclarator";
  id: Identifier;
  init: Expression;
};

// FunctionDeclaration
export type FunctionDeclaration = {
  type: "FunctionDeclaration";
  id: Identifier;
  params: Identifier[];
  body: BlockStatement;
};

// BlockStatement
export type BlockStatement = {
  type: "BlockStatement";
  body: Statement[];
};

// ReturnStatement
export type ReturnStatement = {
  type: "ReturnStatement";
  argument: Expression;
};

// WhileStatement
export type WhileStatement = {
  type: "WhileStatement";
  test: Expression;
  body: BlockStatement;
};

// ExpressionStatement
export type ExpressionStatement = {
  type: "ExpressionStatement";
  expression: Expression;
};

// ========= Parser implementation =========

const parser = (tokens: TokenType[]): Program => {
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

  // ---- Expression parser ----
  const parseExpression = (): Expression => {
    const left = parsePrimaryExpression();
    return parseBinaryExpression(left, 0);
  };

  const parsePrimaryExpression = (): Expression => {
    const token = peek();

    if (token.type === "number") {
      next();
      return { type: "NumericLiteral", value: Number(token.value) };
    }

    if (token.type === "string") {
      next();
      return { type: "StringLiteral", value: token.value };
    }

    if (token.type === "boolean") {
      next();
      return { type: "BooleanLiteral", value: token.value === "true" };
    }

    if (token.type === "identifier") {
      const id = eat("identifier");

      // CallExpression ?
      if (peek().type === "punctuation" && peek().value === "(") {
        eat("punctuation", "(");
        const args: Expression[] = [];
        while (peek().value !== ")") {
          args.push(parseExpression());
          if (peek().value === ",") {
            eat("punctuation", ",");
          }
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
      const expr = parseExpression();
      eat("punctuation", ")");
      return expr;
    }

    throw new Error(
      `Unknown expression starting with token '${token.type}' '${token.value}'`,
    );
  };

  const parseBinaryExpression = (
    left: Expression,
    minPrecedence: number,
  ): Expression => {
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
        right = parseBinaryExpression(right, precedence[peek().value]);
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

  // ---- Statement parsers ----
  const parseVariableDeclaration = (): VariableDeclaration => {
    const kind = eat("keyword").value as VariableDeclaration["kind"];

    const declarations: VariableDeclarator[] = [];
    do {
      const id = eat("identifier").value;
      eat("operator", "=");
      const init = parseExpression();
      declarations.push({
        type: "VariableDeclarator",
        id: { type: "Identifier", name: id },
        init,
      });

      if (peek().value === ",") {
        eat("punctuation", ",");
      } else {
        break;
      }
    } while (true);

    eat("punctuation", ";");
    return { type: "VariableDeclaration", kind, declarations };
  };

  const parseFunctionDeclaration = (): FunctionDeclaration => {
    eat("keyword", "function");
    const name = eat("identifier").value;
    eat("punctuation", "(");

    const params: Identifier[] = [];
    while (peek().value !== ")") {
      const param = eat("identifier").value;
      params.push({ type: "Identifier", name: param });

      if (peek().value === ",") {
        eat("punctuation", ",");
      } else {
        break;
      }
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
    const argument = parseExpression();
    eat("punctuation", ";");

    return {
      type: "ReturnStatement",
      argument,
    };
  };

  const parseWhileStatement = (): WhileStatement => {
    eat("keyword", "while");
    eat("punctuation", "(");
    const test = parseExpression();
    eat("punctuation", ")");

    const body = parseBlockStatement();

    return {
      type: "WhileStatement",
      test,
      body,
    };
  };

  const parseExpressionStatement = (): ExpressionStatement => {
    const expression = parseExpression();
    eat("punctuation", ";");
    return { type: "ExpressionStatement", expression };
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

  // ---- Top level parseStatement ----
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

    // fallback → ExpressionStatement
    return parseExpressionStatement();
  };

  // ---- Program ----
  const body: Statement[] = [];
  while (i < tokens.length) {
    body.push(parseStatement());
  }

  return { type: "Program", body };
};

export default parser;
