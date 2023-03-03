import classnames from 'classnames';
import { toChildArray } from 'preact';
import type { ComponentChildren, JSX } from 'preact';
import { useState } from 'preact/hooks';

import { jsxToHTML } from '../util/jsx-to-string';

/**
 * Components for rendering component documentation, examples and demos in the
 * pattern-library page.
 *
 * Example of structure:
 *
 * <Library.Page intro={<p>Some introductory content</p>} title="Elephants">
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

export type LibraryPageProps = {
  children?: ComponentChildren;
  intro?: ComponentChildren;
  title?: string;
};

/**
 * Render content for a pattern-library page
 */
function Page({ children, intro, title }: LibraryPageProps) {
  return (
    <section className="max-w-6xl pb-16 space-y-8 text-slate-7">
      <div className="sticky top-0 z-4 h-16 flex items-center bg-slate-0 border-b">
        <h1 className="px-4 text-4xl font-light">{title}</h1>
      </div>
      {intro && (
        <div className="styled-text px-4 text-xl font-light space-y-4 leading-relaxed">
          {intro}
        </div>
      )}
      <div className="px-4 space-y-16 styled-text">{children}</div>
    </section>
  );
}

export type LibrarySectionProps = {
  children?: ComponentChildren;
  intro?: ComponentChildren;
  id?: string;
  title: string;
};

/**
 * Render a primary section of a page. Each component documented on a pattern-
 * library page gets its own section.
 */
function Section({ children, id, intro, title }: LibrarySectionProps) {
  return (
    <section className="my-16 space-y-8">
      <h2 className="text-3xl font-bold" id={id}>
        {title}
      </h2>
      {intro && (
        <div className="styled-text text-base space-y-3 leading-relaxed">
          {intro}
        </div>
      )}
      <div className="space-y-16 styled-text">{children}</div>
    </section>
  );
}

export type LibraryPatternProps = {
  children?: ComponentChildren;
  id?: string;
  title: string;
};

/**
 * Render a second-level section. e.g. Usage, Props, Status
 */
function Pattern({ children, id, title }: LibraryPatternProps) {
  return (
    <section className="space-y-8">
      <h3 className="text-2xl text-slate-7" id={id}>
        {title}
      </h3>
      <div className="space-y-8 px-4">{children}</div>
    </section>
  );
}

export type LibraryExampleProps = {
  children?: ComponentChildren;
  id?: string;
  title?: string;
};

/**
 * Render content in a third-level section, e.g. documentation
 * about a specific prop or examples of usage.
 */
function Example({ children, id, title }: LibraryExampleProps) {
  return (
    <div className="space-y-6">
      {title && (
        <h4 className="text-xl text-slate-9 font-light" id={id}>
          {title}
        </h4>
      )}
      <div className="space-y-6 px-4">{children}</div>
    </div>
  );
}

type DemoButtonProps = {
  children: ComponentChildren;
  onClick: () => void;
  pressed: boolean;
};
/**
 * Render a button to swap between demo and source views in a Demo
 */
function DemoButton({ children, onClick, pressed }: DemoButtonProps) {
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

export type LibraryDemoProps = {
  children: ComponentChildren;
  /** Extra CSS classes for the demo content's immediate parent container */
  classes?: string | string[];
  /** Inline styles to apply to the demo container */
  style?: JSX.CSSProperties;
  title?: string;
  /**
   * Should the demo also render the source? When true, a "Source" tab will be
   * rendered, which will display the JSX source of the Demo's children.
   */
  withSource?: boolean;
};

/**
 * Render a "Demo", with optional source. This will render the children as
 * provided in a tabbed container. If `withSource` is `true`, the JSX source
 * of the children will be provided in a separate "Source" tab from the
 * rendered Demo content.
 */
function Demo({
  children,
  classes,
  withSource = false,
  style = {},
  title,
}: LibraryDemoProps) {
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
    <div className="space-y-2">
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
  Demo,
  Example,
  Page,
  Pattern,
  Section,
};
