import assert from "node:assert";
import testcases from "./testcases/index.js";
import lexer from "../../lexer/index.js";
import babelParser from "./index.js";

for (const { description, source, expect } of testcases) {
  try {
    if (expect instanceof Error) {
      assert.throws(() => babelParser(lexer(source)));
    } else {
      assert.deepStrictEqual(babelParser(lexer(source)).body, expect);
    }
  } catch (error) {
    console.error(`❌ Failed     : "${source}"`);
    console.error(`❌ Description: "${description}"`);
    console.error(`❌ Reason     : "${error}"`);
    console.error(error);
  }
}

console.log("✅ All Passed");
