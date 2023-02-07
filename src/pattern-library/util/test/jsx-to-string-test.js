import { jsxToString } from '../jsx-to-string';

function Widget_(children, { ...props }) {
  return <div {...props}>{children}</div>;
}

function Widget$1(children, { ...props }) {
  return <div {...props}>{children}</div>;
}

function Widget_$1(children, { ...props }) {
  return <div {...props}>{children}</div>;
}

function Widget(children, { ...props }) {
  return <div {...props}>{children}</div>;
}

describe('jsx-to-string', () => {
  [
    {
      jsx: <Widget />,
      expected: '<Widget />',
      description: 'it renders component name',
    },
    {
      jsx: <Widget_ />,
      expected: '<Widget />',
      description: 'it removes trailing underscore',
    },
    {
      jsx: <Widget$1 />,
      expected: '<Widget />',
      description: 'it removes name conflict characters',
    },
    {
      jsx: <Widget_$1 />,
      expected: '<Widget />',
      description: 'it removes underscore and name conflict characters',
    },
  ].forEach(({ jsx, expected, description }) => {
    it(`normalizes component names: ${description}`, () => {
      assert.equal(jsxToString(jsx), expected);
    });
  });

  describe('non-component content', () => {
    [
      {
        jsx: 'foo',
        expected: 'foo',
        description: 'type: string',
      },
      {
        jsx: 5,
        expected: '5',
        description: 'type: number',
      },
      {
        jsx: BigInt(9007199254740991),
        expected: '9007199254740991',
        description: 'type: bigint',
      },
      {
        jsx: true,
        expected: '',
        description: 'type: boolean',
      },
    ].forEach(({ jsx, expected, description }) => {
      it(`renders non-component content: ${description}`, () => {
        assert.equal(jsxToString(jsx), expected);
      });
    });
  });

  describe('props and their values', () => {
    [
      {
        jsx: <Widget _ignored={true} />,
        expected: '<Widget />',
        description: 'props with leading underscore ignored',
      },
      {
        jsx: <Widget ignored={true} />,
        expected: '<Widget ignored />',
        description: 'truthy booleans',
      },
      {
        jsx: <Widget ignored={false} />,
        expected: '<Widget ignored={false} />',
        description: 'falsey booleans',
      },
    ].forEach(({ jsx, expected, description }) => {
      it(`renders boolean props: ${description}`, () => {
        assert.equal(jsxToString(jsx), expected);
      });
    });

    [
      {
        jsx: <Widget _greeting={'Hello'} />,
        expected: '<Widget />',
        description: 'props with leading underscore ignored',
      },
      {
        jsx: <Widget greeting={'Hello'} />,
        expected: '<Widget greeting="Hello" />',
        description: 'renders strings without brackets',
      },
      {
        jsx: <Widget greeting={'He"llo'} />,
        expected: '<Widget greeting="He\\"llo" />',
        description: 'quotes strings correctly',
      },
    ].forEach(({ jsx, expected, description }) => {
      it(`renders string props: ${description}`, () => {
        assert.equal(jsxToString(jsx), expected);
      });
    });

    [
      {
        jsx: <Widget _count={5} />,
        expected: '<Widget />',
        description: 'props with leading underscore ignored',
      },
      {
        jsx: <Widget count={5} />,
        expected: '<Widget count={5} />',
        description: 'truthy numbers',
      },
      {
        jsx: <Widget count={0} />,
        expected: '<Widget count={0} />',
        description: 'falsey numbers',
      },
      {
        jsx: <Widget count={BigInt(1234567890)} />,
        expected: '<Widget count={1234567890} />',
        description: 'BigInt numbers',
      },
    ].forEach(({ jsx, expected, description }) => {
      it(`renders numeric props: ${description}`, () => {
        assert.equal(jsxToString(jsx), expected);
      });
    });

    [
      {
        jsx: <Widget _onChange={() => {}} />,
        expected: '<Widget />',
        description: 'props with leading underscore ignored',
      },
      {
        jsx: <Widget onChange={function foo() {}} />,
        expected: '<Widget onChange={foo} />',
        description: 'renders name of function as value when available',
      },
      {
        jsx: <Widget onChange={() => {}} />,
        expected: '<Widget onChange={onChange} />',
        description: 'renders prop name as value if no function name available',
      },
    ].forEach(({ jsx, expected, description }) => {
      it(`renders function props: ${description}`, () => {
        assert.equal(jsxToString(jsx), expected);
      });
    });

    [
      {
        jsx: <Widget _helmet={{ foo: 'bar' }} />,
        expected: '<Widget />',
        description: 'props with leading underscore ignored',
      },
      {
        jsx: <Widget helmet={{ foo: 'bar' }} />,
        expected: '<Widget helmet={helmet} />',
        description: 'renders name of prop for value if value is truthy',
      },
      {
        jsx: <Widget helmet={null} />,
        expected: '<Widget helmet={null} />',
        description: 'renders value of object if value is falsey',
      },
    ].forEach(({ jsx, expected, description }) => {
      it(`renders object props: ${description}`, () => {
        assert.equal(jsxToString(jsx), expected);
      });
    });

    [
      {
        jsx: <Widget _other={Symbol('five')} />,
        expected: '<Widget />',
        description: 'props with leading underscore ignored',
      },
      {
        jsx: <Widget other={Symbol('five')} />,
        expected: '<Widget other={Symbol(five)} />',
        description: 'renders string representation of prop value',
      },
    ].forEach(({ jsx, expected, description }) => {
      it(`other prop types: ${description}`, () => {
        assert.equal(jsxToString(jsx), expected);
      });
    });

    [
      {
        jsx: <Widget _widget={<Widget_ />} />,
        expected: '<Widget />',
        description: 'props with leading underscore ignored',
      },
      {
        jsx: <Widget widget={<Widget_ />} />,
        expected: '<Widget widget={<Widget />} />',
        description: 'JSX component props',
      },
    ].forEach(({ jsx, expected, description }) => {
      it(`renders JSX props: ${description}`, () => {
        assert.equal(jsxToString(jsx), expected);
      });
    });
  });

  describe('rendering children', () => {
    [
      {
        jsx: <Widget>With children</Widget>,
        expected: `<Widget>
  With children
</Widget>`,
        description: 'children are rendered and indented',
      },
      {
        jsx: <Widget widget={<Widget_>Prop children</Widget_>} />,
        expected: `<Widget widget={<Widget>
  Prop children
</Widget>} />`,
        description: 'children in JSX props',
      },
    ].forEach(({ jsx, expected, description }) => {
      it(`renders children: ${description}`, () => {
        assert.equal(jsxToString(jsx), expected);
      });
    });
  });
});
