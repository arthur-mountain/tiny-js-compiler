import lexer from "./lexer/index.js";

const compiler = (sourceCode: string) => {
  const tokens = lexer(sourceCode);
  console.log("lexer tokens: ", tokens);
};

compiler("let x = 5;");
