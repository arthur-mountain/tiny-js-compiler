const functoinDeclarationTestCases = [
  {
    description: "初始化具名函式",
    source: "function test() {}",
    expect: [
      {
        type: "FunctionDeclaration",
        id: { type: "Identifier", name: "test" },
        params: [],
        body: { type: "BlockStatement", body: [] },
      },
    ],
  },
  {
    description: "初始化同步函式有返回字串",
    source: "function test() { return '1234'; }",
    expect: [
      {
        type: "FunctionDeclaration",
        id: { type: "Identifier", name: "test" },
        params: [],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: { type: "StringLiteral", value: "1234" },
            },
          ],
        },
      },
    ],
  },
  {
    description: "初始化同步函式有返回值數字",
    source: "function test() { return 1234; }",
    expect: [
      {
        type: "FunctionDeclaration",
        id: { type: "Identifier", name: "test" },
        params: [],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: { type: "NumberLiteral", value: "1234" },
            },
          ],
        },
      },
    ],
  },
  /* array/object return parsing unsupported yet*/
  // {
  //   description: "初始化同步函式有返回值陣列",
  //   source: "function test() { return [1,2,3] };",
  //   expect: [],
  // },
  // {
  //   description: "初始化同步函式有返回值物件",
  //   source: "function test() { return { key1: 'value1' } };",
  //   expect: [],
  // },
  /* async function unsupported yet*/
  // {
  //   description: "初始化同步函式有返回值物件",
  //   source: "async function test() { };",
  //   expect: [],
  // },
];

export { functoinDeclarationTestCases };
