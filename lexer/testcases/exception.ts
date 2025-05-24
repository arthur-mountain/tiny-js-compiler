const exceptionTestCases = [
  {
    description: "try-catch-finally 結構",
    source: `
      try {
        doSomething();
      } catch(e) {
        handleError(e);
      } finally {
        cleanup();
      }
    `,
    expect: [
      { type: "keyword", value: "try" },
      { type: "brace", value: "{" },
      { type: "name", value: "doSomething" },
      { type: "parenthesis", value: "(" },
      { type: "parenthesis", value: ")" },
      { type: "punctuation", value: ";" },
      { type: "brace", value: "}" },
      { type: "keyword", value: "catch" },
      { type: "parenthesis", value: "(" },
      { type: "name", value: "e" },
      { type: "parenthesis", value: ")" },
      { type: "brace", value: "{" },
      { type: "name", value: "handleError" },
      { type: "parenthesis", value: "(" },
      { type: "name", value: "e" },
      { type: "parenthesis", value: ")" },
      { type: "punctuation", value: ";" },
      { type: "brace", value: "}" },
      { type: "keyword", value: "finally" },
      { type: "brace", value: "{" },
      { type: "name", value: "cleanup" },
      { type: "parenthesis", value: "(" },
      { type: "parenthesis", value: ")" },
      { type: "punctuation", value: ";" },
      { type: "brace", value: "}" },
    ],
  },
];

export { exceptionTestCases };
