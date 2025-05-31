const keywordsTestCases = [
  {
    description: "var",
    source: "var x = 5;",
    expect: [
      { type: "keyword", value: "var" },
      { type: "identifier", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "let",
    source: "let x = 5;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "identifier", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "const",
    source: "const x = 5;",
    expect: [
      { type: "keyword", value: "const" },
      { type: "identifier", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
];

export { keywordsTestCases };
