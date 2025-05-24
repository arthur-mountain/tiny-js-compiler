import assert from "node:assert";
import testcases from "./testcases/index.js";
import lexer from "./index.js";

for (const { source, expect } of testcases) {
  try {
    if (expect instanceof Error) {
      assert.throws(() => lexer(source));
    } else {
      assert.deepStrictEqual(lexer(source), expect);
    }
    console.log(`✅ Passed: "${source}"`);
  } catch (err) {
    console.error(`❌ Failed: "${source}"`);
    console.error(err);
  }
}
