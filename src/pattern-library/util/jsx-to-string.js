import hljs from 'highlight.js/lib/core';
import hljsXMLLang from 'highlight.js/lib/languages/xml';
import hljsJavascriptLang from 'highlight.js/lib/languages/javascript';
import { Fragment } from 'preact';

/**
 * Escape `str` for use in a "-quoted string.
 *
 * @param {string} str
 */
function escapeQuotes(str) {
  return str.replace(/"/g, '\\"');
}

/** @param {any} type */
function componentName(type) {
  let name = typeof type === 'string' ? type : type.displayName ?? type.name;

  name = name.replace('Wrapper', '');
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
 * Test if an element looks like a JSX element.
 *
 * @param {any} value
 * @return {value is import('preact').VNode<any>}
 */
function isJSXElement(value) {
  const elementType = value?.type;
  return typeof elementType === 'string' || typeof elementType === 'function';
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
    // nb. The special `key` and `ref` props are not included in `vnode.props`.
    // `ref` is not serializable to a string and `key` is generally set dynamically
    // (eg. from an index or item ID) so it doesn't make sense to include it either.
    let propStr = Object.entries(vnode.props)
      .map(([name, value]) => {
        // Allow certain pattern-library-defined props to be invisible in source
        // view
        if (name.includes('WrapperProp')) {
          return '';
        }
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
        } else if (isJSXElement(value)) {
          valueStr = `{${jsxToString(value)}}`;
        } else if (value && typeof value === 'object') {
          // Use the prop name instead of [Object object]; it's more helpful
          valueStr = `{${name}}`;
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

    const name = vnode.type === Fragment ? '' : componentName(vnode.type);
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

/**
 * Render a JSX expression as syntax-highlighted HTML markup.
 *
 * For the syntax highlighting to be visible, a Highlight.js CSS stylesheet must be
 * loaded on the page.
 *
 * @param {import('preact').ComponentChildren} vnode - JSX expression to render.
 *   See {@link jsxToString}
 * @return {string}
 */
export function jsxToHTML(vnode) {
  // JSX support in Highlight.js involves a combination of the JS and XML
  // languages, so we need to load both.
  if (!hljs.getLanguage('javascript')) {
    hljs.registerLanguage('javascript', hljsJavascriptLang);
  }
  if (!hljs.getLanguage('xml')) {
    hljs.registerLanguage('xml', hljsXMLLang);
  }
  const code = jsxToString(vnode);
  return hljs.highlightAuto(code).value;
}
