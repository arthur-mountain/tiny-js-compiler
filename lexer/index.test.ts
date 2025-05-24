import assert from "node:assert";
import testcases from "./testcases/index.js";
import lexer from "./index.js";

for (const { description, source, expect } of testcases) {
  try {
    if (expect instanceof Error) {
      assert.throws(() => lexer(source));
    } else {
      assert.deepStrictEqual(lexer(source), expect);
    }
  } catch (error) {
    console.error(`❌ Failed     : "${source}"`);
    console.error(`❌ Description: "${description}"`);
    console.error(`❌ Reason     : "${error}"`);
  }
}

console.log("✅ All Passed");
