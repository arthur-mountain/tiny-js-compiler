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
      { type: "punctuation", value: "{" },
      { type: "identifier", value: "doSomething" },
      { type: "punctuation", value: "(" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: ";" },
      { type: "punctuation", value: "}" },
      { type: "keyword", value: "catch" },
      { type: "punctuation", value: "(" },
      { type: "identifier", value: "e" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: "{" },
      { type: "identifier", value: "handleError" },
      { type: "punctuation", value: "(" },
      { type: "identifier", value: "e" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: ";" },
      { type: "punctuation", value: "}" },
      { type: "keyword", value: "finally" },
      { type: "punctuation", value: "{" },
      { type: "identifier", value: "cleanup" },
      { type: "punctuation", value: "(" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: ";" },
      { type: "punctuation", value: "}" },
    ],
  },
];

export { exceptionTestCases };
