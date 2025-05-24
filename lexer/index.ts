export type TokenType =
  | { type: "keyword"; value: string }
  | { type: "operator"; value: string }
  | { type: "punctuation"; value: string }
  | { type: "number"; value: string }
  | { type: "string"; value: string }
  | { type: "name"; value: string };

const keywords = new Set(["var", "let", "const", "function"]);
const operators = new Set(["+", "-", "*", "/", "=", ">", "<", "!"]);

const tokenlizer = (sourceCode: string) => {
  const tokens: TokenType[] = [];
  let i = 0;

  while (i < sourceCode.length) {
    const char = sourceCode[i];

    // 跳過空白字元
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // 處理字母開頭 (可能是變數名稱或關鍵字)
    if (/[a-zA-Z_$]/.test(char)) {
      let value = "";

      while (i < sourceCode.length && /[a-zA-Z0-9_$]/.test(sourceCode[i])) {
        value += sourceCode[i];
        i++;
      }

      if (keywords.has(value)) {
        tokens.push({ type: "keyword", value });
      } else {
        tokens.push({ type: "name", value });
      }

      continue;
    }

    // 數字
    if (/[0-9]/.test(char)) {
      let value = "";
      while (/[0-9]/.test(sourceCode[i])) {
        value += sourceCode[i];
        i++;
      }
      tokens.push({ type: "number", value });
      continue;
    }

    // 字串(單/雙引號，含跳脫字元處理)
    if (char === '"' || char === "'") {
      const quoteType = char;
      i++; // 跳過起始引號
      let value = "";

      while (i < sourceCode.length) {
        const currentChar = sourceCode[i];

        if (currentChar === "\\") {
          // 跳過跳脫字元，取得下一個 char 進行判斷，避免類似這樣的 "abc\"
          i++;
          const nextChar = sourceCode[i];
          if (nextChar === undefined) {
            throw new TypeError("Unexpected end after escape character");
          }

          value += nextChar;
          i++;
          continue;
        }

        if (currentChar === quoteType) {
          break; // 結束字串
        }

        value += currentChar;
        i++;
      }

      if (sourceCode[i] === quoteType) {
        i++; // 跳過結尾引號
        tokens.push({ type: "string", value });
      } else {
        throw new TypeError("Unterminated string literal");
      }

      continue;
    }

    // 運算符號
    if (operators.has(char)) {
      if (char === "=") {
        if (sourceCode[i + 1] === "=" && sourceCode[i + 2] === "=") {
          tokens.push({ type: "operator", value: "===" });
          i += 3;
          continue;
        } else if (sourceCode[i + 1] === "=") {
          tokens.push({ type: "operator", value: "==" });
          i += 2;
          continue;
        }
      } else if (char === ">") {
        if (sourceCode[i + 1] === ">" && sourceCode[i + 2] === ">") {
          tokens.push({ type: "operator", value: ">>>" });
          i += 3;
          continue;
        } else if (sourceCode[i + 1] === ">") {
          tokens.push({ type: "operator", value: ">>" });
          i += 2;
          continue;
        } else if (sourceCode[i + 1] === "=") {
          tokens.push({ type: "operator", value: ">=" });
          i += 2;
          continue;
        }
      } else if (char === "<") {
        if (sourceCode[i + 1] === "<" && sourceCode[i + 2] === "<") {
          tokens.push({ type: "operator", value: "<<<" });
          i += 3;
          continue;
        } else if (sourceCode[i + 1] === "<") {
          tokens.push({ type: "operator", value: "<<" });
          i += 2;
          continue;
        } else if (sourceCode[i + 1] === "=") {
          tokens.push({ type: "operator", value: "<=" });
          i += 2;
          continue;
        }
      } else if (char === "!") {
        if (sourceCode[i + 1] === "=" && sourceCode[i + 2] === "=") {
          tokens.push({ type: "operator", value: "!==" });
          i += 3;
          continue;
        } else if (sourceCode[i + 1] === "=") {
          tokens.push({ type: "operator", value: "!=" });
          i += 2;
          continue;
        }
      }

      tokens.push({ type: "operator", value: char });
      i++;
      continue;
    }

    // 結尾分號 ";"
    if (char === ";") {
      tokens.push({ type: "punctuation", value: ";" });
      i++;
      continue;
    }

    // 尚未實作，其他情況(未處理的字符)
    throw new TypeError(`Unexpected character: ${char}`);
  }

  return tokens;
};

export default tokenlizer;
