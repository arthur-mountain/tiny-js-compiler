export type TokenType =
  | { type: "keyword"; value: string }
  | { type: "identifier"; value: string }
  | { type: "number"; value: string }
  | { type: "string"; value: string }
  | { type: "boolean"; value: string }
  | { type: "null"; value: "null" }
  | { type: "undefined"; value: "undefined" }
  | { type: "operator"; value: string }
  | { type: "punctuation"; value: string }
  | { type: "comment"; value: string };

const keywords = new Set([
  "var",
  "let",
  "const",
  "function",
  "async",
  "await",
  "if",
  "else",
  "return",
  "for",
  "while",
  "do",
  "break",
  "continue",
  "switch",
  "case",
  "default",
  "try",
  "catch",
  "finally",
  "new",
  "class",
  "extends",
  "super",
  "this",
  "typeof",
  "instanceof",
  "in",
  "delete",
]);
const booleans = new Set(["true", "false"]);
const punctuations = new Set([
  "(",
  ")",
  "[",
  "]",
  "{",
  "}",
  ":",
  ",",
  ".",
  ";",
]);
const operators = new Set(["+", "-", "*", "/", "=", ">", "<", "!"]);

const tokenlizer = (sourceCode: string) => {
  const tokens: TokenType[] = [];
  let i = 0;

  const peekChar = (i: number) =>
    String.fromCodePoint(sourceCode.codePointAt(i)!);
  const eatChar = () => {
    const code = sourceCode.codePointAt(i)!;
    const char = String.fromCodePoint(code);
    i += code > 0xffff ? 2 : 1; // 如果超過「surrogate pair」代理對，就會用到兩個 code units，否則會是 1 個;
    return char;
  };
  const next = (count: number = 1) => {
    i += count;
  };

  while (i < sourceCode.length) {
    const char = peekChar(i);

    // 跳過空白字元
    if (/\s/.test(char)) {
      next();
      continue;
    }

    // 處理字母開頭 (可能是變數名稱或關鍵字)
    if (/[a-zA-Z_$]/.test(char)) {
      let value = "";

      while (i < sourceCode.length && /[a-zA-Z0-9_$]/.test(peekChar(i))) {
        value += eatChar();
      }

      if (keywords.has(value)) {
        tokens.push({ type: "keyword", value });
      } else if (value === "true" || value === "false") {
        tokens.push({ type: "boolean", value });
      } else if (value === "null") {
        tokens.push({ type: "null", value });
      } else if (value === "undefined") {
        tokens.push({ type: "undefined", value });
      } else {
        tokens.push({ type: "identifier", value });
      }

      continue;
    }

    // 數字
    if (/[0-9]/.test(char)) {
      let value = "";
      while (/[0-9]/.test(peekChar(i))) {
        value += eatChar();
      }

      if (peekChar(i) === "." && /[0-9]/.test(peekChar(i + 1))) {
        value += eatChar(); // 加上小數點
        while (/[0-9]/.test(peekChar(i))) {
          value += eatChar();
        }
      }

      tokens.push({ type: "number", value });
      continue;
    }

    // 字串(單/雙引號，含跳脫字元處理)
    if (char === '"' || char === "'") {
      const quoteType = char;
      next(); // 跳過起始引號
      let value = "";

      while (i < sourceCode.length) {
        const currentChar = peekChar(i);

        if (currentChar === "\\") {
          // 跳過跳脫字元，取得下一個 char 進行判斷，避免類似這樣的 "abc\"
          next();
          const nextChar = peekChar(i);
          if (nextChar === undefined) {
            throw new TypeError("Unexpected end after escape character");
          }

          value += eatChar();
          continue;
        }

        if (currentChar === quoteType) {
          break; // 結束字串
        }

        value += eatChar();
      }

      if (peekChar(i) === quoteType) {
        next(); // 跳過結尾引號
        tokens.push({ type: "string", value });
      } else {
        throw new TypeError("Unterminated string literal");
      }

      continue;
    }

    // 運算符號(包含註解)
    if (operators.has(char)) {
      if (char === "=") {
        if (peekChar(i + 1) === "=" && peekChar(i + 2) === "=") {
          tokens.push({ type: "operator", value: "===" });
          next(3);
          continue;
        } else if (peekChar(i + 1) === "=") {
          tokens.push({ type: "operator", value: "==" });
          next(2);
          continue;
        } else if (peekChar(i + 1) === ">") {
          tokens.push({ type: "operator", value: "=>" });
          next(2);
          continue;
        }
      } else if (char === ">") {
        if (peekChar(i + 1) === ">" && peekChar(i + 2) === ">") {
          tokens.push({ type: "operator", value: ">>>" });

          next(3);
          continue;
        } else if (peekChar(i + 1) === ">") {
          tokens.push({ type: "operator", value: ">>" });
          next(2);
          continue;
        } else if (peekChar(i + 1) === "=") {
          tokens.push({ type: "operator", value: ">=" });
          next(2);
          continue;
        }
      } else if (char === "<") {
        if (peekChar(i + 1) === "<" && peekChar(i + 2) === "<") {
          tokens.push({ type: "operator", value: "<<<" });
          next(3);
          continue;
        } else if (peekChar(i + 1) === "<") {
          tokens.push({ type: "operator", value: "<<" });
          next(2);
          continue;
        } else if (peekChar(i + 1) === "=") {
          tokens.push({ type: "operator", value: "<=" });
          next(2);
          continue;
        }
      } else if (char === "!") {
        if (peekChar(i + 1) === "=" && peekChar(i + 2) === "=") {
          tokens.push({ type: "operator", value: "!==" });
          next(3);
          continue;
        } else if (peekChar(i + 1) === "=") {
          tokens.push({ type: "operator", value: "!=" });
          next(2);
          continue;
        }
      } else if (char === "+") {
        if (peekChar(i + 1) === "+") {
          tokens.push({ type: "operator", value: "++" });
          next(2);
          continue;
        } else if (peekChar(i + 1) === "=") {
          tokens.push({ type: "operator", value: "+=" });
          next(2);
          continue;
        }
      } else if (char === "-") {
        if (peekChar(i + 1) === "-") {
          tokens.push({ type: "operator", value: "--" });
          next(2);
          continue;
        } else if (peekChar(i + 1) === "=") {
          tokens.push({ type: "operator", value: "-=" });
          next(2);
          continue;
        }
      } else if (char === "*") {
        if (peekChar(i + 1) === "*") {
          tokens.push({ type: "operator", value: "**" });
          next(2);
          continue;
        } else if (peekChar(i + 1) === "=") {
          tokens.push({ type: "operator", value: "*=" });
          next(2);
          continue;
        }
      } else if (char === "/") {
        if (peekChar(i + 1) === "=") {
          tokens.push({ type: "operator", value: "/=" });
          next(2);
          continue;
        } else if (peekChar(i + 1) === "/") {
          // single line comment
          // 吃掉兩次 chars，跳過 "//"
          next(2);
          let value = "";

          while (i < sourceCode.length && peekChar(i) !== "\n") {
            value += eatChar();
          }

          tokens.push({ type: "comment", value });
          continue;
        } else if (peekChar(i + 1) === "*") {
          // multi line comment
          // 吃掉兩次 chars for '/*'
          let value = eatChar() + eatChar();
          let missingCloseComment = true;

          while (i < sourceCode.length) {
            if (
              peekChar(i) === "*" &&
              i + 1 < sourceCode.length &&
              peekChar(i + 1) === "/"
            ) {
              // 吃掉兩次 chars for '*/'
              value += eatChar() + eatChar();
              missingCloseComment = false;
              break;
            }

            value += eatChar();
          }

          if (missingCloseComment) {
            throw new TypeError("Unterminated block comment");
          }

          tokens.push({ type: "comment", value });
          continue;
        }
      }

      tokens.push({ type: "operator", value: char });
      next();
      continue;
    }

    // 處理標點符號
    if (punctuations.has(char)) {
      tokens.push({ type: "punctuation", value: char });
      next();
      continue;
    }

    // 尚未實作，其他情況(未處理的字符)
    throw new TypeError(`Unexpected character: ${char}`);
  }

  return tokens;
};

export default tokenlizer;
