const numberTestCases = [
  {
    source: "let x = 5;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    source: "let x=5;",
    expect: [
      { type: "keyword", value: "let" },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "5" },
      { type: "punctuation", value: ";" },
    ],
  },
];

export { numberTestCases };
