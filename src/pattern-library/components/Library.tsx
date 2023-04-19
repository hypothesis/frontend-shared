import classnames from 'classnames';
import { toChildArray } from 'preact';
import type { ComponentChildren, JSX } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { Link as RouteLink } from 'wouter-preact';

import { CodeIcon, Link as UILink, Scroll, ScrollContainer } from '../../';
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
    <section className="max-w-6xl styled-text text-stone-600">
      <div
        className="sticky top-0 z-4 h-16 flex items-center bg-stone-100 border-b"
        id="page-header"
      >
        <h1 className="px-2 text-3xl text-slate-700 font-light">{title}</h1>
      </div>

      <div className="px-2 mt-8">
        {intro && (
          <div className="my-8 pb-8 border-b space-y-4 font-light text-xl leading-relaxed ">
            {intro}
          </div>
        )}
        {children}
      </div>
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
    <section className="mt-8 mb-16">
      <h2 className="text-3xl text-slate-600 font-bold " id={id}>
        {title}
      </h2>
      {intro && (
        <div className="text-base space-y-3 leading-relaxed">{intro}</div>
      )}
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}

export type LibraryPatternProps = {
  children?: ComponentChildren;
  id?: string;
  title?: string;
};

/**
 * Render a second-level section. e.g. Usage, Props, Status
 */
function Pattern({ children, id, title }: LibraryPatternProps) {
  return (
    <section className="mt-8 mb-12">
      {title && (
        <h3 className="text-2xl text-slate-600 font-medium" id={id}>
          {title}
        </h3>
      )}
      <div className="space-y-8">{children}</div>
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
    <div className="mt-6">
      {title && (
        <h4
          className="border-b border-stone-300 text-lg text-slate-600 font-normal"
          id={id}
        >
          {title}
        </h4>
      )}
      <div className="px-4">{children}</div>
    </div>
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
    <div className="my-8 p-2 space-y-1">
      <div className="flex items-center px-2">
        <div className="py-1 grow">
          <h5 className="text-base text-base leading-none font-semibold text-slate-600">
            {title}
          </h5>
        </div>
        <div className="flex flex-row items-center justify-end gap-x-4">
          {withSource && (
            <button
              className={classnames(
                'flex items-center gap-x-1.5 py-1 px-2 rounded-md',
                'text-sm text-slate-500',
                'hover:bg-slate-50 border hover:border-slate-300',
                {
                  'bg-slate-100 border border-slate-400 shadow-inner':
                    visibleTab === 'source',
                  'border-slate-100 shadow': visibleTab !== 'source',
                }
              )}
              aria-pressed={visibleTab === 'source'}
              onClick={() =>
                setVisibleTab(prevState =>
                  prevState === 'source' ? 'demo' : 'source'
                )
              }
              title="Toggle view-source panel"
            >
              <CodeIcon className="w-[18px] h-[18px]" />
            </button>
          )}
        </div>
      </div>
      <div className="p-2 unstyled-text">
        {visibleTab === 'demo' && (
          <div
            className="w-full p-8 rounded-md border border-stone-300 bg-slate-50 rounded-md"
            style={style}
          >
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

type ChangeStatus = 'breaking' | 'added' | 'changed' | 'deprecated';

type LibraryStatusChipProps = {
  status: ChangeStatus;
};

/**
 * Render a little label or pill next to changelog items
 */
function StatusChip({ status }: LibraryStatusChipProps) {
  return (
    <span
      className={classnames('rounded-md py-1', {
        'px-2 bg-red-error text-color-text-inverted': status === 'breaking',
        'px-2 bg-yellow-notice':
          status === 'deprecated' || status === 'changed',
        'font-semibold': status === 'added',
      })}
    >
      {status === 'breaking' && <span>Breaking</span>}
      {status === 'deprecated' && <span>Deprecated</span>}
      {status === 'added' && <span>Added:</span>}
      {status === 'changed' && <span>Changed</span>}
    </span>
  );
}

export type LibraryChangelogProps = {
  children: ComponentChildren;
};

/**
 * Wrapper around a list of changelog items
 */
function Changelog({ children }: LibraryChangelogProps) {
  return <ul>{children}</ul>;
}

export type LibraryChangelogItemProps = {
  status: ChangeStatus;
  children: ComponentChildren;
};

/**
 * Single changelog item
 */
function ChangelogItem({ status, children }: LibraryChangelogItemProps) {
  return (
    <li className="space-x-2">
      <StatusChip status={status} />
      <span>{children}</span>
    </li>
  );
}

export type LibraryCodeProps = {
  /** Code content (to be rendered with syntax highlighting) */
  content: ComponentChildren;
  /** Controls relative code font size */
  size?: 'sm' | 'md' | 'lg';
  /** Caption (e.g. filename, description) of code block */
  title?: string;
};

/**
 * Render provided `content` as a "code block" example.
 *
 * Long code content will scroll if <Code /> is rendered inside a parent
 * element with constrained dimensions.
 */
function Code({ content, size, title }: LibraryCodeProps) {
  const codeMarkup = useMemo(() => jsxToHTML(content), [content]);

  return (
    <figure className="space-y-2 min-h-0 h-full my-8">
      <ScrollContainer borderless>
        <div
          className={classnames(
            'unstyled-text bg-slate-7 text-color-text-inverted p-4 rounded-md min-h-0 h-full',
            { 'text-sm': size === 'sm' }
          )}
        >
          <Scroll variant="flat">
            <code className="text-color-text-inverted">
              <pre
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: codeMarkup }}
              />
            </code>
          </Scroll>
        </div>
        {title && (
          <figcaption className="flex justify-end">
            <span className="italic">{title}</span>
          </figcaption>
        )}
      </ScrollContainer>
    </figure>
  );
}

export type LibraryUsageProps = {
  componentName: string;
  size?: 'sm' | 'md' | 'lg';
};

/**
 * Render import "usage" of a given `componentName`
 */
function Usage({ componentName, size = 'md' }: LibraryUsageProps) {
  const importPath = '@hypothesis/frontend-shared';
  return (
    <Code
      content={`import { ${componentName} } from '${importPath}';
`}
      size={size}
    />
  );
}

export type LinkProps = {
  children: ComponentChildren;
  href: string;
};

/**
 * Render an internal link to another pattern-library page.
 * TODO: Support external links
 */
function Link({ children, href }: LinkProps) {
  return (
    <RouteLink href={href}>
      <UILink underline="always">{children}</UILink>
    </RouteLink>
  );
}

export default {
  Changelog,
  ChangelogItem,
  Code,
  Demo,
  Example,
  Link,
  Page,
  Pattern,
  Section,
  Usage,
};
