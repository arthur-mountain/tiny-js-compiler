const loopTestCases = [
  {
    description: "for 迴圈",
    source: "for(let i=0; i<10; i++){}",
    expect: [
      { type: "keyword", value: "for" },
      { type: "parenthesis", value: "(" },
      { type: "keyword", value: "let" },
      { type: "name", value: "i" },
      { type: "operator", value: "=" },
      { type: "number", value: "0" },
      { type: "punctuation", value: ";" },
      { type: "name", value: "i" },
      { type: "operator", value: "<" },
      { type: "number", value: "10" },
      { type: "punctuation", value: ";" },
      { type: "name", value: "i" },
      { type: "operator", value: "++" },
      { type: "parenthesis", value: ")" },
      { type: "brace", value: "{" },
      { type: "brace", value: "}" },
    ],
  },
  {
    description: "while 迴圈",
    source: "while(true){}",
    expect: [
      { type: "keyword", value: "while" },
      { type: "parenthesis", value: "(" },
      { type: "keyword", value: "true" },
      { type: "parenthesis", value: ")" },
      { type: "brace", value: "{" },
      { type: "brace", value: "}" },
    ],
  },
  {
    description: "do...while 迴圈",
    source: "do{} while(false);",
    expect: [
      { type: "keyword", value: "do" },
      { type: "brace", value: "{" },
      { type: "brace", value: "}" },
      { type: "keyword", value: "while" },
      { type: "parenthesis", value: "(" },
      { type: "keyword", value: "false" },
      { type: "parenthesis", value: ")" },
      { type: "punctuation", value: ";" },
    ],
  },
];

export { loopTestCases };
