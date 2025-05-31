import type { TokenType } from "../lexer";

type AST = {
  type: "Program";
  body: Statement[];
};

type Statement = VariableDeclaration | ExpressionStatement;

type Expression =
  | NumberLiteral
  | StringLiteral
  | BooleanLiteral
  | Identifier
  | CallExpression;

type NumberLiteral = { type: "NumberLiteral"; value: string };
type StringLiteral = { type: "StringLiteral"; value: string };
type BooleanLiteral = { type: "BooleanLiteral"; value: string };
type Identifier = { type: "Identifier"; name: string };
type CallExpression = {
  type: "CallExpression";
  callee: Identifier;
  arguments: Expression[];
};

type VariableDeclaration = {
  type: "VariableDeclaration";
  id: Identifier;
  init: Expression;
};

type ExpressionStatement = {
  type: "ExpressionStatement";
  expression: Expression;
};

const declarators = new Set(["var", "let", "const"]);

const parser = (tokens: TokenType[]) => {
  let i = 0;

  const current = (): TokenType => {
    return tokens[i];
  };

  const next = (count: number = 1) => {
    i += count;
  };

  const eat = (type: TokenType["type"], value?: string): TokenType => {
    const token = current();
    if (token.type !== type || (value && token.value !== value)) {
      throw new Error(
        `Unexpected token ${token.type}(${token.value}), expected ${type} ${value ?? ""}`,
      );
    }
    next();
    return token;
  };

  const parseVariableDeclaration = (): VariableDeclaration => {
    eat("keyword", "let");
    const id = eat("identifier");
    eat("operator", "=");
    const init = parseExpression();
    eat("punctuation", ";");
    return {
      type: "VariableDeclaration",
      id: { type: "Identifier", name: id.value },
      init,
    };
  };

  const parseExpression = (): Expression => {
    const token = current();

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

      if (current().type === "punctuation" && current().value === "(") {
        // parse CallExpression
        eat("punctuation", "(");
        const args: Expression[] = [];

        while (current().value !== ")") {
          args.push(parseExpression());
          if (current().value === ",") {
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

    throw new Error(
      `Unknown expression starting with token ${token.type} ${token.value}`,
    );
  };

  const parseStatement = (): Statement => {
    const token = current();

    if (token.type === "keyword" && declarators.has(token.value)) {
      return parseVariableDeclaration();
    }

    // fallback: assume it's an expression statement
    const expr = parseExpression();
    eat("punctuation", ";");
    return { type: "ExpressionStatement", expression: expr };
  };

  const body: Statement[] = [];
  while (i < tokens.length) {
    body.push(parseStatement());
  }

  return { type: "Program", body };
};

export default parser;
