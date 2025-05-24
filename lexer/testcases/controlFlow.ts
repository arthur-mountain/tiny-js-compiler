const controlFlowTestCases = [
  {
    description: "break 陳述句",
    source: "while(true){ break; }",
    expect: [
      { type: "keyword", value: "while" },
      { type: "parenthesis", value: "(" },
      { type: "keyword", value: "true" },
      { type: "parenthesis", value: ")" },
      { type: "brace", value: "{" },
      { type: "keyword", value: "break" },
      { type: "punctuation", value: ";" },
      { type: "brace", value: "}" },
    ],
  },
  {
    description: "continue 陳述句",
    source: "for(;;){ continue; }",
    expect: [
      { type: "keyword", value: "for" },
      { type: "parenthesis", value: "(" },
      { type: "punctuation", value: ";" },
      { type: "punctuation", value: ";" },
      { type: "parenthesis", value: ")" },
      { type: "brace", value: "{" },
      { type: "keyword", value: "continue" },
      { type: "punctuation", value: ";" },
      { type: "brace", value: "}" },
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
      { type: "parenthesis", value: "(" },
      { type: "name", value: "x" },
      { type: "parenthesis", value: ")" },
      { type: "brace", value: "{" },
      { type: "keyword", value: "case" },
      { type: "number", value: "1" },
      { type: "colon", value: ":" },
      { type: "keyword", value: "break" },
      { type: "punctuation", value: ";" },
      { type: "keyword", value: "default" },
      { type: "colon", value: ":" },
      { type: "keyword", value: "continue" },
      { type: "punctuation", value: ";" },
      { type: "brace", value: "}" },
    ],
  },
];

export { controlFlowTestCases };
