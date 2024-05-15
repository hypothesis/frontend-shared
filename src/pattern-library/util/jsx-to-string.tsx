import hljs from 'highlight.js/lib/core';
import hljsTypeScriptLang from 'highlight.js/lib/languages/typescript';
import hljsXMLLang from 'highlight.js/lib/languages/xml';
import { Fragment } from 'preact';
import type { ComponentChildren, VNode } from 'preact';

/**
 * Escape `str` for use in a "-quoted string.
 */
function escapeQuotes(str: string) {
  return str.replace(/"/g, '\\"');
}

/**
 * Format a component's name for display
 */
function componentName(type: any) {
  let name = typeof type === 'string' ? type : type.displayName ?? type.name;

  // Handle (display)name conflicts if there are two components with the same
  // name. e.g. if there are two components named `Foo`, the second of those
  // encountered will have a name of `Foo$1`. Strip the `$1` in this case.
  name = name.replace(/\$[0-9]+$/, '');
  // Remove trailing underscore from component names. This allows the pattern
  // library to create a convenience wrapper component around a given component
  // being documented, and have it appear that the documented component is being
  // used directly in rendered source content.
  name = name.replace(/\B_$/, '');

  return name;
}

/**
 * Indent a multi-line string by `indent` spaces.
 */
function indentLines(str: string, indent: number) {
  const indentStr = ' '.repeat(indent);
  const lines = str.split('\n');
  return lines.map(line => indentStr + line).join('\n');
}

/**
 * Test if an element looks like a JSX element.
 */
function isJSXElement(value: any): value is VNode<any> {
  const elementType = value?.type;
  return typeof elementType === 'string' || typeof elementType === 'function';
}

/**
 * Should the prop with `name` be ignored from output code strings?
 *
 * The special `children` prop, as well as any prop name beginning with an
 * underscore, should be ignored.
 */
function isExcludedProp(name: string) {
  return name.match(/^_/) || name === 'children';
}

/**
 * Render a JSX expression as a code string.
 *
 * A trailing underscore in component names will be omitted, allowing wrapper
 * components to be represented as the component they wrap. Props with a
 * leading underscore will be ignored.
 *
 * @example
 *   jsxToString(<Widget_ count={0} error={false} open={true} label="Thing" onClick={() => go()} _hello={"hello"} />)
 *   // returns '<Widget count={0}error={false} open label="Thing" onClick={onClick} />'
 */
export function jsxToString(vnode: ComponentChildren): string {
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
        if (isExcludedProp(name)) {
          return '';
        }

        if (isJSXElement(value)) {
          return `${name}={${jsxToString(value)}}`;
        }

        let valueStr = '';

        switch (typeof value) {
          case 'boolean':
            // When a boolean property is present, render:
            // 'booleanPropName' => when true
            // 'booleanPropName={false}' => when false
            valueStr = value ? name : `${name}={false}`;
            break;
          case 'string':
            valueStr = `${name}="${escapeQuotes(value)}"`;
            break;
          case 'bigint':
          case 'number':
          case 'undefined':
            valueStr = `${name}={${value}}`;
            break;
          case 'function':
            // This also handles function components
            valueStr = componentName(value)
              ? `${name}={${componentName(value)}}`
              : `${name}={${value.toString()}}`;
            break;
          case 'object':
            // Use the prop name instead of [Object object]; it's more helpful
            if (value) {
              valueStr = `${name}={${name}}`;
            } else {
              // null is an object
              valueStr = `${name}={${value}}`;
            }
            break;
          default:
            if (value) {
              // `toString` necessary for Symbols
              valueStr = `${name}={${value.toString()}}`;
            }
            break;
        }
        return valueStr;
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
 * Render a code snippet as syntax-highlighted HTML markup.
 *
 * For the syntax highlighting to be visible, a Highlight.js CSS stylesheet must be
 * loaded on the page.
 *
 * The content returned by this function is sanitized and safe to use as
 * `dangerouslySetInnerHTML` prop.
 */
export function highlightCode(code: string): string {
  // JSX support in Highlight.js involves a combination of the TS and XML
  // languages, so we need to load both.
  if (!hljs.getLanguage('typescript')) {
    hljs.registerLanguage('typescript', hljsTypeScriptLang);
  }
  if (!hljs.getLanguage('xml')) {
    hljs.registerLanguage('xml', hljsXMLLang);
  }

  return hljs.highlightAuto(code).value;
}

/**
 * Render a JSX expression as syntax-highlighted HTML markup.
 *
 * The content returned by this function is sanitized and safe to use as
 * `dangerouslySetInnerHTML` prop.
 */
export function jsxToHTML(vnode: ComponentChildren): string {
  const code = jsxToString(vnode);
  return highlightCode(code);
}
