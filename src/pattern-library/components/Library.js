import classnames from 'classnames';
import { toChildArray } from 'preact';
import { useState } from 'preact/hooks';

import { jsxToHTML } from '../util/jsx-to-string';

/**
 * @typedef {import('preact').ComponentChildren} Children
 */

/**
 * Components for rendering patterns, examples and demos in the pattern-library
 * page.
 *
 * Example of structure:
 *
 * <Page intro={<p>Some introductory content</p>} title="Elephants">
 *   <p>Any content you want on the page.</p>
 *
 *   <Library.Section title="ComponentName">
 *     <Library.Pattern title="Usage">
 *       <p>The `Elephant` component is used to render information about elephant
 *       personalities.</p>
 *       <Library.Example title="Colored elephants">
 *         <p>You can change the color of your elephant.</p>
 *         <Library.Demo withSource>
 *           <Elephant color="pink" />
 *         </Library.Demo>
 *         // More Demos if desired...
 *       </Library.Example>
 *       // More Examples if desired...
 *     </Library.Pattern>
 *   // more Patterns if desired...
 *   </Library.Section>
 *
 *   // More Sections...
 *
 * </Library.Page>
 */

/**
 * Render content for a pattern-library page
 *
 * @param {object} props
 *   @param {Children} props.children
 *   @param {Children} [props.intro]
 *   @param {string} props.title
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
 *
 * @param {object} props
 *   @param {string} props.title
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
 *
 * @param {object} props
 *   @param {Children} props.children
 */
function PageIntro({ children }) {
  return (
    <div className="styled-text px-4 text-xl font-light space-y-4 leading-relaxed">
      {children}
    </div>
  );
}

/**
 * Render info about a primary section of a page
 *
 * @param {object} props
 *   @param {Children} props.children
 *   @param {Children} [props.intro]
 *   @param {string} props.title
 */
function Section({ children, intro, title }) {
  return (
    <section className="pb-16 space-y-8">
      <h2 className="text-3xl font-bold">{title}</h2>
      {intro && <SectionIntro>{intro}</SectionIntro>}
      <div className="space-y-16 styled-text">{children}</div>
    </section>
  );
}

/**
 * Page introductory text
 *
 *  @param {object} props
 *    @param {Children} props.children
 */
function SectionIntro({ children }) {
  return (
    <div className="styled-text text-lg space-y-3 leading-relaxed">
      {children}
    </div>
  );
}

/**
 * Render info about a secondary section of a page
 *
 * @param {object} props
 *   @param {Children} props.children
 *   @param {Children} [props.intro]
 *   @param {string} [props.title]
 */
function Pattern({ children, title }) {
  return (
    <section className="space-y-8">
      <h3 className="text-2xl text-slate-7">{title}</h3>
      <div className="space-y-8 px-4">{children}</div>
    </section>
  );
}

/**
 * Render information about a tertiary section on a page.
 *
 * @param {object} props
 *   @param {Children} props.children
 *   @param {string} [props.title]
 */
function Example({ children, title }) {
  const kids = toChildArray(children);

  // Extract Demo components out of any children
  const demos = kids.filter(
    kid => typeof kid === 'object' && kid?.type === Demo
  );
  // And everything else that is not a demo...
  const notDemos = kids.filter(kid => !demos.includes(kid));

  return (
    <div className="space-y-6">
      {title && <h4 className="text-xl text-slate-9 font-light">{title}</h4>}

      <div className="space-y-6 px-4">{notDemos}</div>
      <div className="space-y-16 px-4">{demos}</div>
    </div>
  );
}

/**
 * Render a button to swap between demo and source views in a Demo
 *
 * @param {object} props
 *   @param {import("preact").ComponentChildren} props.children
 *   @param {() => void} props.onClick
 *   @param {boolean} props.pressed
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
 * Render a "Demo", with optional source. This will render the children as
 * provided in a tabbed container. If `withSource` is `true`, the JSX source
 * of the children will be provided in a separate "Source" tab from the
 * rendered Demo content.
 *
 * @param {object} props
 *   @param {import("preact").ComponentChildren} [props.children]
 *   @param {string} [props.classes] - Extra CSS classes for the demo content's
 *     immediate parent container
 *   @param {boolean} [props.withSource=false] - Should the demo also render the source?
 *   When true, a "Source" tab will be rendered, which will display the JSX
 *   source of the Demo's children
 *   @param {object} [props.style] - Inline styles to apply to the demo container
 *   @param {string} [props.title]
 */
function Demo({ children, classes, withSource = false, style = {}, title }) {
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
          <h5 className="text-lg italic text-slate-7 font-light">{title}</h5>
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
            <div
              className={classnames(
                'h-full flex flex-row items-center justify-center gap-2',
                classes
              )}
            >
              {children}
            </div>
          </div>
        )}
        {visibleTab === 'source' && (
          <div className="border w-full rounded-md bg-slate-7 text-color-text-inverted p-4">
            <ul>{source}</ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default {
  Page,
  Section,
  Pattern,
  Example,
  Demo,
};
