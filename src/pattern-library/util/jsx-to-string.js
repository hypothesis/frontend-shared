/**
 * Escape `str` for use in a "-quoted string.
 *
 * @param {string} str
 */
function escapeQuotes(str) {
  return str.replace(/"/g, '\\"');
}

function componentName(type) {
  const name = typeof type === 'string' ? type : type.displayName ?? type.name;
  // Handle (display)name conflicts if there are two components with the same
  // name. e.g. if there are two components named `Foo`, the second of those
  // encountered will have a name of `Foo$1`. Strip the `$1` in this case.
  return name.replace(/\$[0-9]+$/, '');
}

/**
 * Indent a multi-line string by `indent` spaces.
 *
 * @param {string} str
 * @param {number} indent
 */
function indentLines(str, indent) {
  const indentStr = ' '.repeat(indent);
  const lines = str.split('\n');
  return lines.map(line => indentStr + line).join('\n');
}

/**
 * Render a JSX expression as a code string.
 *
 * Currently this only supports serializing props with simple types (strings,
 * booleans, numbers).
 *
 * @example
 *   jsxToString(<Widget expanded={true} label="Thing"/>) // returns `<Widget expanded label="Thing"/>`
 *
 * @param {import('preact').ComponentChildren} vnode
 * @return {string}
 */
export function jsxToString(vnode) {
  if (
    typeof vnode === 'string' ||
    typeof vnode === 'number' ||
    typeof vnode === 'bigint'
  ) {
    return vnode.toString();
  } else if (typeof vnode === 'boolean') {
    return '';
  } else if (vnode && 'type' in vnode) {
    const name = componentName(vnode.type);

    // nb. The special `key` and `ref` props are not included in `vnode.props`.
    // `ref` is not serializable to a string and `key` is generally set dynamically
    // (eg. from an index or item ID) so it doesn't make sense to include it either.
    let propStr = Object.entries(vnode.props)
      .map(([name, value]) => {
        if (name === 'children') {
          return '';
        }

        // When a boolean property is present, render:
        // 'booleanPropName' => when true
        // 'booleanPropName={false}' => when false
        if (typeof value === 'boolean') {
          return value ? name : `${name}={false}`;
        }

        let valueStr;
        if (typeof value === 'string') {
          valueStr = `"${escapeQuotes(value)}"`;
        } else if (typeof value === 'function' && componentName(value)) {
          // Handle {import("preact").FunctionComponent<{}>} props
          valueStr = `{${componentName(value)}}`;
        } else if (value) {
          // `toString` necessary for Symbols
          valueStr = `{${value.toString()}}`;
        }
        return `${name}=${valueStr}`;
      })
      .join(' ')
      .trim();
    if (propStr.length > 0) {
      propStr = ' ' + propStr;
    }

    const children = vnode.props.children;
    if (children) {
      let childrenStr = Array.isArray(children)
        ? children.map(jsxToString).join('\n')
        : jsxToString(children);
      childrenStr = indentLines(childrenStr, 2);
      return `<${name}${propStr}>\n${childrenStr}\n</${name}>`;
    } else {
      // No children - use a self-closing tag.
      return `<${name}${propStr} />`;
    }
  } else {
    return '';
  }
}
