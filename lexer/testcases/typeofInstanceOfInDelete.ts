const typeofInstanceofInDeleteTestCases = [
  {
    description: "typeof 運算子",
    source: "typeof x;",
    expect: [
      { type: "keyword", value: "typeof" },
      { type: "name", value: "x" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "instanceof 運算子",
    source: "x instanceof Array;",
    expect: [
      { type: "name", value: "x" },
      { type: "keyword", value: "instanceof" },
      { type: "name", value: "Array" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "in 運算子",
    source: "'prop' in obj;",
    expect: [
      { type: "string", value: "prop" },
      { type: "keyword", value: "in" },
      { type: "name", value: "obj" },
      { type: "punctuation", value: ";" },
    ],
  },
  {
    description: "delete 運算子",
    source: "delete obj.prop;",
    expect: [
      { type: "keyword", value: "delete" },
      { type: "name", value: "obj" },
      { type: "dot", value: "." },
      { type: "name", value: "prop" },
      { type: "punctuation", value: ";" },
    ],
  },
];

export { typeofInstanceofInDeleteTestCases };
