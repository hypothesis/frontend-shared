import classnames from 'classnames';
import { toChildArray } from 'preact';
import { useState } from 'preact/hooks';

import { Frame } from '../../components/containers';

import { jsxToHTML } from '../util/jsx-to-string';

/**
 * @typedef LibraryBaseProps
 * @prop {import("preact").ComponentChildren} [intro] - Optional
 *   introductory content
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
 * <Library.Page intro={<p>Some introductory content</p>} title="Elephants">
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
function Page({ children, intro, title }) {
  return (
    <section className="max-w-6xl pb-16 space-y-8 text-slate-7">
      <PageTitle title={title} />
      {intro && <PageIntro>{intro}</PageIntro>}
      <div className="px-4 space-y-16 styled-text">{children}</div>
    </section>
  );
}

/**
 * Sticky pattern-library page header
 */
function PageTitle({ title }) {
  return (
    <div className="sticky top-0 z-4 h-16 flex items-center bg-slate-0 border-b">
      <h1 className="px-4 text-4xl font-light">{title}</h1>
    </div>
  );
}

/**
 * Page introductory text
 */
function PageIntro({ children }) {
  return (
    <div className="styled-text px-4 text-xl font-light space-y-4 leading-relaxed">
      {children}
    </div>
  );
}

/**
 * Render info about a single pattern (or component) on a pattern-library page.
 *
 * @param {LibraryBaseProps} props
 */
function Pattern({ children, title }) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl text-slate-7">{title}</h2>
      <div className="space-y-8 px-4">{children}</div>
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
    <div className="space-y-6">
      {title && <h3 className="text-xl text-slate-9 font-light">{title}</h3>}

      <div className="space-y-6 px-4">{notDemos}</div>
      <div
        className={classnames({
          'space-y-16 px-4': variant === 'split',
          'flex flex-row gap-16 flex-wrap': variant === 'wide',
        })}
      >
        {demos}
      </div>
    </div>
  );
}

/**
 * @typedef DemoButtonProps
 * @prop {import("preact").ComponentChildren} [children]
 * @prop {() => void} [onClick]
 * @prop {boolean} pressed
 */

/**
 *
 * @param {DemoButtonProps} props
 */
function DemoButton({ children, onClick, pressed }) {
  return (
    <button
      className={classnames(
        'flex items-center gap-x-1.5 rounded-sm shadow py-1 px-2',
        'text-sm text-color-text-light hover:bg-grey-0 hover:text-grey-7 hover:shadow-md',
        {
          'bg-grey-2': pressed,
        }
      )}
      onClick={onClick}
      aria-pressed={pressed}
    >
      {children}
    </button>
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
          <pre
            className="font-pre whitespace-pre-wrap break-words text-sm"
            dangerouslySetInnerHTML={{ __html: jsxToHTML(child) }}
          />
        </code>
      </li>
    );
  });
  return (
    <div className="space-y-2 p-4">
      <div className="flex items-center">
        <div className="py-2 grow">
          <h4 className="text-lg italic text-slate-7 font-light">{title}</h4>
        </div>
        <div className="flex flex-row items-center justify-end gap-x-4">
          {withSource && (
            <>
              <DemoButton
                onClick={() => setVisibleTab('demo')}
                pressed={visibleTab === 'demo'}
              >
                Demo
              </DemoButton>
              <DemoButton
                onClick={() => setVisibleTab('source')}
                pressed={visibleTab === 'source'}
              >
                Source
              </DemoButton>
            </>
          )}
        </div>
      </div>
      <div className="bg-slate-0 p-2 rounded-md unstyled-text">
        {visibleTab === 'demo' && (
          <div className="w-full bg-white p-8 rounded-md" style={style}>
            <div className="h-full flex flex-row items-center justify-center gap-2">
              {children}
            </div>
          </div>
        )}
        {visibleTab === 'source' && (
          <Frame classes="w-full rounded-md bg-slate-7 text-color-text-inverted p-4">
            <ul>{source}</ul>
          </Frame>
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
