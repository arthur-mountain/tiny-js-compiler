const classTestCases = [
  {
    description: "class 繼承與 new 實例化",
    source: `
      class A {}
      class B extends A {
        constructor() {
          super();
          this.x = 1;
        }
      }
      const b = new B();
    `,
    expect: [
      { type: "keyword", value: "class" },
      { type: "name", value: "A" },
      { type: "brace", value: "{" },
      { type: "brace", value: "}" },
      { type: "keyword", value: "class" },
      { type: "name", value: "B" },
      { type: "keyword", value: "extends" },
      { type: "name", value: "A" },
      { type: "brace", value: "{" },
      { type: "name", value: "constructor" },
      { type: "parenthesis", value: "(" },
      { type: "parenthesis", value: ")" },
      { type: "brace", value: "{" },
      { type: "keyword", value: "super" },
      { type: "parenthesis", value: "(" },
      { type: "parenthesis", value: ")" },
      { type: "punctuation", value: ";" },
      { type: "keyword", value: "this" },
      { type: "dot", value: "." },
      { type: "name", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "1" },
      { type: "punctuation", value: ";" },
      { type: "brace", value: "}" },
      { type: "brace", value: "}" },
      { type: "keyword", value: "const" },
      { type: "name", value: "b" },
      { type: "operator", value: "=" },
      { type: "keyword", value: "new" },
      { type: "name", value: "B" },
      { type: "parenthesis", value: "(" },
      { type: "parenthesis", value: ")" },
      { type: "punctuation", value: ";" },
    ],
  },
];

export { classTestCases };
