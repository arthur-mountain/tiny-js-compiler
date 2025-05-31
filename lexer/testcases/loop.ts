const loopTestCases = [
  {
    description: "for 迴圈",
    source: "for(let i=0; i<10; i++){}",
    expect: [
      { type: "keyword", value: "for" },
      { type: "punctuation", value: "(" },
      { type: "keyword", value: "let" },
      { type: "identifier", value: "i" },
      { type: "operator", value: "=" },
      { type: "number", value: "0" },
      { type: "punctuation", value: ";" },
      { type: "identifier", value: "i" },
      { type: "operator", value: "<" },
      { type: "number", value: "10" },
      { type: "punctuation", value: ";" },
      { type: "identifier", value: "i" },
      { type: "operator", value: "++" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: "{" },
      { type: "punctuation", value: "}" },
    ],
  },
  {
    description: "while 迴圈",
    source: "while(true){}",
    expect: [
      { type: "keyword", value: "while" },
      { type: "punctuation", value: "(" },
      { type: "boolean", value: "true" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: "{" },
      { type: "punctuation", value: "}" },
    ],
  },
  {
    description: "do...while 迴圈",
    source: "do{} while(false);",
    expect: [
      { type: "keyword", value: "do" },
      { type: "punctuation", value: "{" },
      { type: "punctuation", value: "}" },
      { type: "keyword", value: "while" },
      { type: "punctuation", value: "(" },
      { type: "boolean", value: "false" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: ";" },
    ],
  },
];

export { loopTestCases };
