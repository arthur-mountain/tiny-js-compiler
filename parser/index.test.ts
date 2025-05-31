import assert from "node:assert";
import testcases from "./testcases/index.js";
import lexer from "../lexer/index.js";
import parser from "./index.js";

for (const { description, source, expect } of testcases) {
  try {
    if (expect instanceof Error) {
      assert.throws(() => parser(lexer(source)));
    } else {
      assert.deepStrictEqual(parser(lexer(source)).body, expect);
    }
  } catch (error) {
    console.error(`❌ Failed     : "${source}"`);
    console.error(`❌ Description: "${description}"`);
    console.error(`❌ Reason     : "${error}"`);
  }
}

console.log("✅ All Passed");
