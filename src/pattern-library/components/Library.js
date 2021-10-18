import classnames from 'classnames';
import { toChildArray } from 'preact';
import { useState } from 'preact/hooks';

import { LabeledButton } from '../../components/buttons';

import { jsxToString } from '../util/jsx-to-string';

/**
 * @typedef LibraryBaseProps
 * @prop {import("preact").ComponentChildren} [children]
 * @prop {string} [title]
 *
 */

/**
 * Components for rendering patterns, examples and demos in the pattern-library
 * page. A pattern-library Page contains Patterns, which in turn contain
 * Examples. An Example _may_ contain one or more Demos. Child content (markup)
 * may also be rendered in these components, as desired.
 *
 * Example of structure:
 *
 * <Library.Page title="Elephants">
 *   <p>Any content you want on the page.</p>
 *   More content: it can be any valid `ComponentChildren`
 *
 *   <Library.Pattern title="Elephant">
 *     <p>The `Elephant` component is used to render information about elephant
 *     personalities.</p>
 *     <Library.Example title="Colored elephants">
 *       <p>You can change the color of your elephant.</p>
 *       <Library.Demo withSource>
 *         <Elephant color="pink" />
 *       </Library.Demo>
 *     </Library.Example>
 *     // More Examples if desired
 *   </Library.Pattern>
 *
 *   // more Patterns if desired...
 * </Library.Page>
 */

/**
 * Render a pattern-library page.
 *
 * @param {LibraryBaseProps} props
 */
function Page({ children, title }) {
  return (
    <section className="LibraryPage">
      <h1 className="Library__heading1">{title}</h1>
      {children}
    </section>
  );
}

/**
 * Render info about a single pattern (or component) on a pattern-library page.
 *
 * @param {LibraryBaseProps} props
 */
function Pattern({ children, title }) {
  return (
    <section className="LibraryPattern">
      <h2 className="Library__heading2">{title}</h2>
      {children}
    </section>
  );
}

/**
 * @typedef LibraryExampleProps
 * @prop {import("preact").ComponentChildren} [children]
 * @prop {string} [title]
 * @prop {'split'|'wide'} [variant='split'] - Layout variant. Applies
 *   appropriate className.
 *   - Split (default) lays out in a row. Non-demo example content is rendered
 *     left, with demos right. Demos in this variant stack vertically.
 *   - Wide lays out in a full-width column. Non-example is rendered first,
 *     then a row to contain demos. Demos in this variant render next to each
 *     other in a single row.
 */

/**
 * Render example content and optional Demo(s) for a pattern.
 *
 * @param {LibraryExampleProps} props
 */
function Example({ children, title, variant = 'split' }) {
  const kids = toChildArray(children);

  // Extract Demo components out of any children
  const demos = kids.filter(
    kid => typeof kid === 'object' && kid?.type === Demo
  );
  // And everything else that is not a demo...
  const notDemos = kids.filter(kid => !demos.includes(kid));

  return (
    <div className={classnames('LibraryExample', `LibraryExample--${variant}`)}>
      <div className="LibraryExample__content">
        {title && <h3 className="Library__heading3">{title}</h3>}
        {notDemos}
      </div>
      <div className="LibraryExample__demos">{demos}</div>
    </div>
  );
}

/**
 * @typedef DemoProps
 * @prop {import("preact").ComponentChildren} [children]
 * @prop {boolean} [withSource=false] - Should the demo also render the source?
 *   When true, a "Source" tab will be rendered, which will display the JSX
 *   source of the Demo's children
 * @prop {object} [style] - Inline styles to apply to the demo container
 * @prop {string} [title]
 */

/**
 * Render a "Demo", with optional source. This will render the children as
 * provided in a tabbed container. If `withSource` is `true`, the JSX source
 * of the children will be provided in a separate "Source" tab from the
 * rendered Demo content.
 *
 * @param {DemoProps} props
 */
function Demo({ children, withSource = false, style = {}, title }) {
  const [visibleTab, setVisibleTab] = useState('demo');
  const source = toChildArray(children).map((child, idx) => {
    return (
      <li key={idx}>
        <code>
          <pre>{jsxToString(child)}</pre>
        </code>
      </li>
    );
  });
  return (
    <div className="LibraryDemo">
      {title && <h4 className="Library__heading4">{title}</h4>}
      <div className="LibraryDemo__tabs">
        <LabeledButton
          onClick={() => setVisibleTab('demo')}
          pressed={visibleTab === 'demo'}
          variant="dark"
        >
          Demo
        </LabeledButton>
        {withSource && (
          <LabeledButton
            onClick={() => setVisibleTab('source')}
            pressed={visibleTab === 'source'}
            variant="dark"
          >
            Source
          </LabeledButton>
        )}
      </div>
      <div className="LibraryDemo__container">
        {visibleTab === 'demo' && (
          <div className="LibraryDemo__demo" style={style}>
            <div className="LibraryDemo__demo-content">{children}</div>
          </div>
        )}
        {visibleTab === 'source' && (
          <div className="LibraryDemo__source">
            <ul>{source}</ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default {
  Page,
  Pattern,
  Example,
  Demo,
};
