import classnames from 'classnames';
import { toChildArray, createContext } from 'preact';
import type { ComponentChildren, JSX } from 'preact';
import { useMemo, useState, useContext } from 'preact/hooks';
import { Link as RouteLink } from 'wouter-preact';

import {
  CautionIcon,
  CodeIcon,
  Link as UILink,
  Scroll,
  ScrollContainer,
} from '../../';
import { jsxToHTML } from '../util/jsx-to-string';

/**
 * Components for rendering component documentation, examples and demos in the
 * pattern-library page.
 */

type LibraryElementAttributes = Omit<JSX.HTMLAttributes<HTMLElement>, 'title'>;

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
          <div className="my-8 pb-8 border-b space-y-4 font-light text-xl leading-relaxed">
            {intro}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export type LibraryHeadingProps = JSX.HTMLAttributes<HTMLHeadingElement> & {
  children: ComponentChildren;
  level: number;
};

function Heading({
  children,
  level = 2,
  ...htmlAttributes
}: LibraryHeadingProps) {
  if (level <= 2) {
    return (
      <h2
        className="text-3xl text-slate-600 font-bold mb-4"
        {...htmlAttributes}
      >
        {children}
      </h2>
    );
  } else if (level === 3) {
    return (
      <h3
        className="text-2xl text-slate-600 font-medium mb-4"
        {...htmlAttributes}
      >
        {children}
      </h3>
    );
  } else {
    return (
      <h4
        className="text-lg border-b border-stone-300 text-slate-600 font-normal mb-4"
        {...htmlAttributes}
      >
        {children}
      </h4>
    );
  }
}

export type LibrarySectionProps = LibraryElementAttributes & {
  children?: ComponentChildren;
  intro?: ComponentChildren;
  title?: string;
  level?: number;
};

// Keep track of <Section> nested depth
const SectionDepthContext = createContext<number>(1);

/**
 * Render a primary section of a page. Each component documented on a pattern-
 * library page gets its own section.
 */
function Section({
  children,
  intro,
  level,
  title,
  ...htmlAttributes
}: LibrarySectionProps) {
  const sectionDepth = useContext(SectionDepthContext);
  const depth = level ?? sectionDepth + 1;

  return (
    <SectionDepthContext.Provider value={depth}>
      <section
        data-depth={depth}
        className={classnames('leading-relaxed', {
          'mt-8 mb-16': depth <= 2,
          'mt-8 mb-8': depth === 3,
          'mt-6 mb-8': depth >= 4,
        })}
        {...htmlAttributes}
      >
        {title && <Heading level={depth}>{title}</Heading>}
        {intro && (
          <div className="text-base space-y-3 leading-relaxed">{intro}</div>
        )}
        {children}
      </section>
    </SectionDepthContext.Provider>
  );
}

export type LibraryPatternProps = LibraryElementAttributes & {
  children?: ComponentChildren;
  title?: string;
};

/**
 * Render a second-level section. e.g. Usage, Props, Status
 */
function Pattern({ children, title, ...htmlAttributes }: LibraryPatternProps) {
  return (
    <Section level={3} title={title} {...htmlAttributes}>
      {children}
    </Section>
  );
}

export type LibraryExampleProps = LibraryElementAttributes & {
  children?: ComponentChildren;
  title?: string;
};

/**
 * Render content in a third-level section, e.g. documentation
 * about a specific prop or examples of usage.
 */
function Example({ children, title, ...htmlAttributes }: LibraryExampleProps) {
  return (
    <Section level={4} title={title} {...htmlAttributes}>
      {children}
    </Section>
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
 * Render a pill to highlight a change
 */
function StatusChip({ status }: LibraryStatusChipProps) {
  return (
    <span
      className={classnames(
        'rounded-md py-1 px-2 mr-1.5 text-sm font-semibold',
        {
          'bg-red-error text-color-text-inverted': status === 'breaking',
          'bg-yellow-notice': status === 'deprecated' || status === 'changed',
          'bg-green-success text-color-text-inverted': status === 'added',
        }
      )}
    >
      {status === 'breaking' && <span>Breaking</span>}
      {status === 'deprecated' && <span>Deprecated</span>}
      {status === 'added' && <span>Added</span>}
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
    <li
      className={classnames(
        'flex gap-x-2',
        // "Outdent": <ul>s are indented (for readability) by 2rem. In the
        // case of this particular <ul>, we want to regain left-hand space
        // because the status chips are aligned to the right.
        '-ml-8 '
      )}
    >
      <div className="mt-2 min-w-[7rem] text-right">
        <StatusChip status={status} />
      </div>
      <div className="grow">{children}</div>
    </li>
  );
}

export type LibraryCodeProps = {
  /** Code content (to be rendered with syntax highlighting) */
  content: ComponentChildren;
  /** Controls relative code font size */
  size?: 'sm' | 'md';
  /** Caption (e.g. filename, description) of code block */
  title?: ComponentChildren;
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
    <figure className="space-y-2 min-h-0 h-full">
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
  size?: 'sm' | 'md';
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

function Callout({ children }: { children: ComponentChildren }) {
  return (
    <div className="flex gap-x-2 p-3 rounded-md bg-slate-50 border shadow-inner">
      <div className="w-6 h-6">
        <CautionIcon className="text-yellow-notice w-6 h-6 mt-0.5" />
      </div>
      <div>{children}</div>
    </div>
  );
}

export default {
  Callout,
  Changelog,
  ChangelogItem,
  Code,
  Demo,
  Example,
  Link,
  Page,
  Pattern,
  Section,
  StatusChip,
  Usage,
};
