import { inspect } from "node:util";
import lexer from "./lexer/index.js";
import parser from "./parser/index.js";
import babelParser from "./parser/babel-parser/index.js";

type Options = {
  parser?: "babel";
};

const compiler = (sourceCode: string, options: Options = {}) => {
  const tokens = lexer(sourceCode);
  const ast = options.parser === "babel" ? babelParser(tokens) : parser(tokens);
  console.log("\n========= lexer tokens =========");
  console.log(tokens);
  console.log(
    typeof options.parser === "undefined"
      ? "\n========= parser ast ========="
      : `\n========= ${options.parser} parser ast =========`,
  );
  console.log(inspect(ast, { depth: null, colors: true }));
};

compiler(
  `
const x = test();
`,
);
