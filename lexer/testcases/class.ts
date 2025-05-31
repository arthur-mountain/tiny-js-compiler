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
      { type: "identifier", value: "A" },
      { type: "punctuation", value: "{" },
      { type: "punctuation", value: "}" },
      { type: "keyword", value: "class" },
      { type: "identifier", value: "B" },
      { type: "keyword", value: "extends" },
      { type: "identifier", value: "A" },
      { type: "punctuation", value: "{" },
      { type: "identifier", value: "constructor" },
      { type: "punctuation", value: "(" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: "{" },
      { type: "keyword", value: "super" },
      { type: "punctuation", value: "(" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: ";" },
      { type: "keyword", value: "this" },
      { type: "punctuation", value: "." },
      { type: "identifier", value: "x" },
      { type: "operator", value: "=" },
      { type: "number", value: "1" },
      { type: "punctuation", value: ";" },
      { type: "punctuation", value: "}" },
      { type: "punctuation", value: "}" },
      { type: "keyword", value: "const" },
      { type: "identifier", value: "b" },
      { type: "operator", value: "=" },
      { type: "keyword", value: "new" },
      { type: "identifier", value: "B" },
      { type: "punctuation", value: "(" },
      { type: "punctuation", value: ")" },
      { type: "punctuation", value: ";" },
    ],
  },
];

export { classTestCases };
