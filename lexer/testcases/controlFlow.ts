const controlFlowTestCases = [
  {
    description: "break 陳述句",
    source: "while(true){ break; }",
    expect: [
      { type: "keyword", value: "while" },
      { type: "punctuation", value: "(" },
      { type: "boolean", value: "true" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: "{" },
      { type: "keyword", value: "break" },
      { type: "punctuation", value: ";" },
      { type: "punctuation", value: "}" },
    ],
  },
  {
    description: "continue 陳述句",
    source: "for(;;){ continue; }",
    expect: [
      { type: "keyword", value: "for" },
      { type: "punctuation", value: "(" },
      { type: "punctuation", value: ";" },
      { type: "punctuation", value: ";" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: "{" },
      { type: "keyword", value: "continue" },
      { type: "punctuation", value: ";" },
      { type: "punctuation", value: "}" },
    ],
  },
  {
    description: "switch-case-default 結構",
    source: `
      switch(x) {
        case 1: break;
        default: continue;
      }
    `,
    expect: [
      { type: "keyword", value: "switch" },
      { type: "punctuation", value: "(" },
      { type: "identifier", value: "x" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: "{" },
      { type: "keyword", value: "case" },
      { type: "number", value: "1" },
      { type: "punctuation", value: ":" },
      { type: "keyword", value: "break" },
      { type: "punctuation", value: ";" },
      { type: "keyword", value: "default" },
      { type: "punctuation", value: ":" },
      { type: "keyword", value: "continue" },
      { type: "punctuation", value: ";" },
      { type: "punctuation", value: "}" },
    ],
  },
];

export { controlFlowTestCases };
