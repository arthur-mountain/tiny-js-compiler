import { numberTestCases } from "./number.js";
import { stringTestCases } from "./string.js";
import { identifierTestCases } from "./identifier.js";
import { keywordsTestCases } from "./keywords.js";
import { operatorTestCases } from "./operators.js";
import { arrayTestCases } from "./array.js";
import { objectTestCases } from "./object.js";
import { functionTestCases } from "./function.js";
import { conditionTestCases } from "./condition.js";
import { loopTestCases } from "./loop.js";
import { controlFlowTestCases } from "./controlFlow.js";
import { exceptionTestCases } from "./exception.js";

export default [
  ...numberTestCases,
  ...stringTestCases,
  ...identifierTestCases,
  ...keywordsTestCases,
  ...operatorTestCases,
  ...arrayTestCases,
  ...objectTestCases,
  ...functionTestCases,
  ...conditionTestCases,
  ...loopTestCases,
  ...controlFlowTestCases,
  ...exceptionTestCases,
];
