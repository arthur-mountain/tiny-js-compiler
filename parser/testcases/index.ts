import { variableDeclarationTestCases } from "./variable-declaration.js";
import { functoinDeclarationTestCases } from "./function-declaration.js";
import { ifElseTestCases } from "./if-else-statment.js";
import { switchStatementTestCases } from "./switch-statement.js";

export default [
  ...variableDeclarationTestCases,
  ...functoinDeclarationTestCases,
  ...ifElseTestCases,
  ...switchStatementTestCases,
];
