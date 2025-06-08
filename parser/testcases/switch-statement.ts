const switchStatementTestCases = [
  {
    description: "switch with single case and block",
    source: `
      switch(x) {
        case 1: {
          break;
        }
      }
    `,
    expect: [
      {
        type: "SwitchStatement",
        discriminant: { type: "Identifier", name: "x" },
        cases: [
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "1" },
            consequent: [
              {
                type: "BlockStatement",
                body: [
                  {
                    type: "BreakStatement",
                    label: null,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    description: "switch with single case without block",
    source: `
      switch(x) {
        case 1: 
          break;
      }
    `,
    expect: [
      {
        type: "SwitchStatement",
        discriminant: { type: "Identifier", name: "x" },
        cases: [
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "1" },
            consequent: [
              {
                type: "BreakStatement",
                label: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    description: "switch with multiple cases with blocks",
    source: `
      switch(x) {
        case 1: { break; }
        case 2: { break; }
      }
    `,
    expect: [
      {
        type: "SwitchStatement",
        discriminant: { type: "Identifier", name: "x" },
        cases: [
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "1" },
            consequent: [
              {
                type: "BlockStatement",
                body: [
                  {
                    type: "BreakStatement",
                    label: null,
                  },
                ],
              },
            ],
          },
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "2" },
            consequent: [
              {
                type: "BlockStatement",
                body: [
                  {
                    type: "BreakStatement",
                    label: null,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    description: "switch with multiple cases without blocks",
    source: `
      switch(x) {
        case 1: break;
        case 2: break;
      }
    `,
    expect: [
      {
        type: "SwitchStatement",
        discriminant: { type: "Identifier", name: "x" },
        cases: [
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "1" },
            consequent: [
              {
                type: "BreakStatement",
                label: null,
              },
            ],
          },
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "2" },
            consequent: [
              {
                type: "BreakStatement",
                label: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    description: "switch with cases and default",
    source: `
      switch(x) {
        case 1: break;
        case 2: break;
        default: {
          let y = 5;
        }
      }
    `,
    expect: [
      {
        type: "SwitchStatement",
        discriminant: { type: "Identifier", name: "x" },
        cases: [
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "1" },
            consequent: [
              {
                type: "BreakStatement",
                label: null,
              },
            ],
          },
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "2" },
            consequent: [
              {
                type: "BreakStatement",
                label: null,
              },
            ],
          },
          {
            type: "SwitchCase",
            test: undefined,
            consequent: [
              {
                type: "BlockStatement",
                body: [
                  {
                    type: "VariableDeclaration",
                    kind: "let",
                    declarations: [
                      {
                        type: "VariableDeclarator",
                        id: { type: "Identifier", name: "y" },
                        init: { type: "NumberLiteral", value: "5" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    description: "switch with mixed case blocks",
    source: `
      switch(x) {
        case 1: break;
        case 2: {
          break;
        }
        case 3: 
          break;
        default: break;
      }
    `,
    expect: [
      {
        type: "SwitchStatement",
        discriminant: { type: "Identifier", name: "x" },
        cases: [
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "1" },
            consequent: [
              {
                type: "BreakStatement",
                label: null,
              },
            ],
          },
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "2" },
            consequent: [
              {
                type: "BlockStatement",
                body: [
                  {
                    type: "BreakStatement",
                    label: null,
                  },
                ],
              },
            ],
          },
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "3" },
            consequent: [
              {
                type: "BreakStatement",
                label: null,
              },
            ],
          },
          {
            type: "SwitchCase",
            test: undefined,
            consequent: [
              {
                type: "BreakStatement",
                label: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    description: "switch with empty case (fallthrough)",
    source: `
      switch(x) {
        case 1:
        case 2:
          break;
      }
    `,
    expect: [
      {
        type: "SwitchStatement",
        discriminant: { type: "Identifier", name: "x" },
        cases: [
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "1" },
            consequent: [],
          },
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "2" },
            consequent: [
              {
                type: "BreakStatement",
                label: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    description: "switch with default first",
    source: `
      switch(x) {
        default:
          break;
        case 1: 
          break;
      }
    `,
    expect: [
      {
        type: "SwitchStatement",
        discriminant: { type: "Identifier", name: "x" },
        cases: [
          {
            type: "SwitchCase",
            test: undefined,
            consequent: [
              {
                type: "BreakStatement",
                label: null,
              },
            ],
          },
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "1" },
            consequent: [
              {
                type: "BreakStatement",
                label: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    description: "switch with empty default",
    source: `
      switch(x) {
        case 1: break;
        default:
      }
    `,
    expect: [
      {
        type: "SwitchStatement",
        discriminant: { type: "Identifier", name: "x" },
        cases: [
          {
            type: "SwitchCase",
            test: { type: "NumberLiteral", value: "1" },
            consequent: [
              {
                type: "BreakStatement",
                label: null,
              },
            ],
          },
          {
            type: "SwitchCase",
            test: undefined,
            consequent: [],
          },
        ],
      },
    ],
  },
];

export { switchStatementTestCases };
