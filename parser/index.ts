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
  | BlockStatement
  | ReturnStatement
  | WhileStatement
  | ForStatement
  | ExpressionStatement
  | IfStatement
  | SwitchStatement
  | BreakStatement;

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

type IfStatement = {
  type: "IfStatement";
  test: Expression;
  consequent: BlockStatement;
  alternate?: BlockStatement | IfStatement;
};

type SwitchStatement = {
  type: "SwitchStatement";
  discriminant: Expression;
  cases: SwitchCase[];
};

type SwitchCase = {
  type: "SwitchCase";
  test?: Expression; // undefined 代表 default case
  consequent: Statement[];
};

type ForStatement = {
  type: "ForStatement";
  init?: VariableDeclaration | Expression | null;
  test?: Expression | null;
  update?: Expression | null;
  body: BlockStatement;
};

type BreakStatement = {
  type: "BreakStatement";
  label: Expression | null;
};

type ExpressionStatement = {
  type: "ExpressionStatement";
  expression: Expression;
};

// Parser implementation

const parser = (tokens: TokenType[]) => {
  let i = 0;

  const peek = (pos: number = i): TokenType => tokens[pos];
  const next = (count: number = 1) => (i += count);
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

  const parseExpression = (): Expression => {
    const left = parsePrimaryExpression();
    return parseBinaryExpression(left, 0);
  };

  const parseBinaryExpression = (
    left: Expression,
    minPrecedence: number = 0,
  ) => {
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

      left = { type: "BinaryExpression", operator, left, right };
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
            args.push(parseExpression());
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
      const expr = parseExpression();
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
      const init = parseExpression();

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
    const argument = parseExpression();
    eat("punctuation", ";");
    return { type: "ReturnStatement", argument };
  };

  const parseWhileStatement = (): WhileStatement => {
    eat("keyword", "while");
    eat("punctuation", "(");
    const test = parseExpression();
    eat("punctuation", ")");

    const body = parseStatementAsBlock();
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

  const parseStatementAsBlock = (): BlockStatement => {
    if (peek().type === "punctuation" && peek().value === "{") {
      return parseBlockStatement();
    }
    return { type: "BlockStatement", body: [parseStatement()] };
  };

  const parseIfStatement = (): IfStatement => {
    eat("keyword", "if");
    eat("punctuation", "(");
    const test = parseExpression();
    eat("punctuation", ")");

    const consequent = parseStatementAsBlock();

    let alternate: BlockStatement | IfStatement | undefined;
    if (peek() && peek().type === "keyword" && peek().value === "else") {
      eat("keyword", "else");

      if (peek().type === "keyword" && peek().value === "if") {
        // else if --> parse IfStatement recursively
        alternate = parseIfStatement();
      } else {
        // else --> parse BlockStatement
        alternate = parseStatementAsBlock();
      }
    }

    return { type: "IfStatement", test, consequent, alternate };
  };

  const parseBreakStatement = (): BreakStatement => {
    eat("keyword", "break");
    const label =
      peek().type === "identifier" ? parsePrimaryExpression() : null;
    eat("punctuation", ";");
    return { type: "BreakStatement", label };
  };

  const parseSwitchStatement = (): SwitchStatement => {
    eat("keyword", "switch");
    eat("punctuation", "(");
    const discriminant = parseExpression();
    eat("punctuation", ")");
    eat("punctuation", "{");

    const cases: SwitchCase[] = [];
    while (peek().type !== "punctuation" || peek().value !== "}") {
      if (
        peek().type === "keyword" &&
        (peek().value === "case" || peek().value === "default")
      ) {
        let test: Expression | undefined;
        if (peek().value === "case") {
          eat("keyword", "case");
          test = parseExpression();
        } else {
          eat("keyword", "default");
        }
        eat("punctuation", ":");

        const consequent: Statement[] = [];
        // 只在下一個 token 是 'case' or 'default' or '}' 才停
        while (
          !(
            peek().type === "keyword" &&
            (peek().value === "case" || peek().value === "default")
          ) &&
          !(peek().type === "punctuation" && peek().value === "}")
        ) {
          // 支援 BlockStatement 或單獨 Statement
          if (peek().type === "punctuation" && peek().value === "{") {
            consequent.push(parseBlockStatement());
          } else {
            consequent.push(parseStatement());
          }

          // 防止 infinite loop，如果已經到 switch 結尾
          if (peek().type === "punctuation" && peek().value === "}") {
            break;
          }
        }

        cases.push({ type: "SwitchCase", test, consequent });
      } else {
        throw new Error(
          `Unexpected token ${peek().type} (${peek().value}) in switch`,
        );
      }
    }

    eat("punctuation", "}"); // 關閉 switch

    return { type: "SwitchStatement", discriminant, cases };
  };

  const parseForStatement = (): ForStatement => {
    eat("keyword", "for");
    eat("punctuation", "(");

    // Parse init: let i = 0 或 i = 0 或 空
    let init: VariableDeclaration | Expression | null = null;
    if (peek().value !== ";") {
      if (declarators.has(peek().value)) {
        init = parseVariableDeclaration();
      } else {
        init = parseExpression();
        eat("punctuation", ";");
      }
    } else {
      eat("punctuation", ";");
    }

    // Parse test: i < 10 或空
    let test: Expression | null = null;
    if (peek().value !== ";") {
      test = parseExpression();
    }
    eat("punctuation", ";");

    // Parse update: i++ 或空
    let update: Expression | null = null;
    if (peek().value !== ")") {
      update = parseExpression();
    }
    eat("punctuation", ")");

    const body = parseStatementAsBlock();
    return { type: "ForStatement", init, test, update, body };
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
      } else if (token.value === "for") {
        return parseForStatement();
      } else if (token.value === "if") {
        return parseIfStatement();
      } else if (token.value === "switch") {
        return parseSwitchStatement();
      } else if (token.value === "break") {
        return parseBreakStatement();
      }
    }

    // Fallback ExpressionStatement
    const expr = parseExpression();
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
