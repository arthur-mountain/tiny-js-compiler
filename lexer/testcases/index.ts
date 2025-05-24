import { numberTestCases } from "./number.js";
import { stringTestCases } from "./string.js";
import { identifierTestCases } from "./identifier.js";
import { keywordsTestCases } from "./keywords.js";

export default [
  ...numberTestCases,
  ...stringTestCases,
  ...keywordsTestCases,
];
