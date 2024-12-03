import classnames from 'classnames';
import { toChildArray, createContext } from 'preact';
import type { ComponentChildren, JSX } from 'preact';
import { useState, useContext, useEffect } from 'preact/hooks';
import { Link as RouteLink } from 'wouter-preact';

import {
  CautionIcon,
  CodeIcon,
  Link as UILink,
  Scroll,
  ScrollContainer,
} from '../../';
import { highlightCode, jsxToHTML } from '../util/jsx-to-string';

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
    <main className="styled-text text-stone-600">
      <div className="px-8 py-4">
        <h1 className="text-3xl text-slate-600 font-bold" id="page-header">
          {title}
        </h1>
        {intro && (
          <div className="my-8 pb-8 border-b space-y-4 font-light text-xl leading-relaxed">
            {intro}
          </div>
        )}
        {children}
      </div>
    </main>
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
        className="text-2xl text-slate-600 font-medium mb-4"
        {...htmlAttributes}
      >
        {children}
      </h2>
    );
  } else if (level === 3) {
    return (
      <h3
        className="text-xl text-slate-600 font-medium mb-4"
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
const SectionDepthContext = createContext<number>(0);

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
          'mt-8 mb-16': depth <= 1,
          'mt-8 mb-8': depth === 2,
          'mt-6 mb-8': depth >= 3,
        })}
        {...htmlAttributes}
      >
        {title && (
          // Heading level is one larger than section level because heading
          // level 1 is reserved for the main heading of the page.
          <Heading level={depth + 1}>{title}</Heading>
        )}
        {intro && (
          <div className="text-base space-y-3 leading-relaxed">{intro}</div>
        )}
        {children}
      </section>
    </SectionDepthContext.Provider>
  );
}

export type LibrarySectionL2Props = LibraryElementAttributes & {
  children?: ComponentChildren;
  title?: string;
};

/**
 * Render a second-level section. e.g. Usage, Props, Status
 */
function SectionL2({
  children,
  title,
  ...htmlAttributes
}: LibrarySectionL2Props) {
  return (
    <Section level={2} title={title} {...htmlAttributes}>
      {children}
    </Section>
  );
}

export type LibrarySectionL3Props = LibraryElementAttributes & {
  children?: ComponentChildren;
  title?: string;
};

/**
 * Render content in a third-level section, e.g. documentation
 * about a specific prop or examples of usage.
 */
function SectionL3({
  children,
  title,
  ...htmlAttributes
}: LibrarySectionL3Props) {
  return (
    <Section level={3} title={title} {...htmlAttributes}>
      {children}
    </Section>
  );
}

function SimpleError({ message }: { message: string }) {
  return (
    <div className="w-full text-red-600 p-2 border rounded border-red-600">
      {message}
    </div>
  );
}

/**
 * Fetches provided example file and returns its contents as text, excluding
 * the import statements.
 * An error is thrown if the file cannot be fetched for any reason.
 */
async function fetchCodeExample(
  exampleFile: string,
  signal: AbortSignal,
): Promise<string> {
  const res = await fetch(`/examples/${exampleFile}.tsx`, { signal });
  if (res.status >= 400) {
    throw new Error(`Failed loading ${exampleFile} example file`);
  }

  const text = await res.text();

  // Remove import statements and trim trailing empty lines
  return text.replace(/^import .*;\n/gm, '').replace(/^\s*\n*/, '');
}

export type LibraryDemoProps = {
  children?: ComponentChildren;

  /**
   * Example file to read and use as content (to be rendered with syntax
   * highlighting).
   * It should be relative to the `pattern-library/examples` dir, and include no
   * file extension: `exampleFile="some-example"`.
   *
   * The file needs to have a default export, which will be used to render the
   * interactive example.
   *
   * If provided together with `children`, `children` will take precedence.
   */
  exampleFile?: string;

  /** Extra CSS classes for the demo content's immediate parent container */
  classes?: string | string[];
  /** Inline styles to apply to the demo container */
  style?: JSX.CSSProperties;
  title?: ComponentChildren;
  /**
   * Should the demo also render the source? When true, a "Source" tab will be
   * rendered, which will display the JSX source of the Demo's children.
   */
  withSource?: boolean;
};

type DemoContentsResult =
  | { children: ComponentChildren }
  | {
      code?: string;
      example?: ComponentChildren;
      codeError?: string;
      exampleError?: string;
    };

function isStaticDemoContent(
  contentResult: DemoContentsResult,
): contentResult is { children: ComponentChildren } {
  return 'children' in contentResult;
}

/**
 * Determines what are the contents to be used for a Demo, which can be either
 * an explicitly provided set of children, or the contents of an example file
 * which is dynamically imported.
 */
function useDemoContents(
  props: Pick<LibraryDemoProps, 'children' | 'exampleFile'>,
): DemoContentsResult {
  const [code, setCode] = useState<string>();
  const [example, setExample] = useState<ComponentChildren>();
  const [codeError, setCodeError] = useState<string>();
  const [exampleError, setExampleError] = useState<string>();

  useEffect(() => {
    if (!props.exampleFile) {
      return () => {};
    }

    import(`../examples/${props.exampleFile}.tsx`)
      .then(({ default: Example }) => setExample(<Example />))
      .catch(() =>
        setExampleError(
          `Failed loading ../examples/${props.exampleFile}.tsx module`,
        ),
      );

    const controller = new AbortController();
    fetchCodeExample(props.exampleFile, controller.signal)
      .then(setCode)
      .catch(e => setCodeError(e.message));

    return () => controller.abort();
  }, [props.exampleFile, props.children]);

  if (props.children) {
    return { children: props.children };
  }

  return { code, example, codeError, exampleError };
}

/**
 * Render a "Demo", with optional source. This will render the children as
 * provided in a tabbed container. If `withSource` is `true`, the JSX source
 * of the children will be provided in a separate "Source" tab from the
 * rendered Demo content.
 */
function Demo({
  classes,
  withSource = false,
  style = {},
  title,
  ...rest
}: LibraryDemoProps) {
  const [visibleTab, setVisibleTab] = useState('demo');
  const demoContents = useDemoContents(rest);
  const isStaticContent = isStaticDemoContent(demoContents);

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
                },
              )}
              aria-pressed={visibleTab === 'source'}
              onClick={() =>
                setVisibleTab(prevState =>
                  prevState === 'source' ? 'demo' : 'source',
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
            className="w-full p-8 rounded-md border border-stone-300 bg-stone-50 rounded-md"
            style={style}
          >
            <div
              className={classnames(
                'h-full flex flex-row items-center justify-center gap-2',
                classes,
              )}
            >
              {!isStaticContent ? demoContents.example : demoContents.children}
              {!isStaticContent && demoContents.exampleError && (
                <SimpleError message={demoContents.exampleError} />
              )}
            </div>
          </div>
        )}
        {visibleTab === 'source' && (
          <>
            {!isStaticContent ? (
              demoContents.code && <Code content={demoContents.code} />
            ) : (
              <div className="border w-full rounded-md bg-slate-7 text-color-text-inverted p-4">
                <ul>
                  {toChildArray(demoContents.children).map((child, idx) => {
                    return (
                      <li key={idx}>
                        <code>
                          <pre
                            className="font-pre whitespace-pre-wrap break-words text-sm"
                            dangerouslySetInnerHTML={{
                              __html: jsxToHTML(child),
                            }}
                          />
                        </code>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {!isStaticContent && demoContents.codeError && (
              <SimpleError message={demoContents.codeError} />
            )}
          </>
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
        },
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
        '-ml-8 ',
      )}
    >
      <div className="mt-2 min-w-[7rem] text-right">
        <StatusChip status={status} />
      </div>
      <div className="grow">{children}</div>
    </li>
  );
}

type CodeContentProps =
  | {
      /** Code content (to be rendered with syntax highlighting) */
      content: ComponentChildren;
    }
  | {
      /**
       * Example file to read and use as content (to be rendered with syntax
       * highlighting)
       */
      exampleFile: string;
    };

export type LibraryCodeProps = {
  /** Controls relative code font size */
  size?: 'sm' | 'md';
  /** Caption (e.g. filename, description) of code block */
  title?: ComponentChildren;
} & CodeContentProps;

function isCodeWithContent(
  props: CodeContentProps,
): props is { content: ComponentChildren } {
  return 'content' in props;
}

/**
 * Dynamically resolves the content based on provided props.
 * An error is optionally returned in case loading the content failed.
 */
function useCodeContent(
  props: CodeContentProps,
): [string | undefined, Error | undefined] {
  const hasStaticContent = isCodeWithContent(props);
  const [codeMarkup, setCodeMarkup] = useState<string | undefined>(
    hasStaticContent ? jsxToHTML(props.content) : undefined,
  );
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (hasStaticContent) {
      return () => {};
    }

    const controller = new AbortController();
    fetchCodeExample(`/examples/${props.exampleFile}.tsx`, controller.signal)
      .then(code => setCodeMarkup(highlightCode(code)))
      .catch(setError);

    return () => controller.abort();
  }, [hasStaticContent, props]);

  return [codeMarkup, error];
}

/**
 * Render provided `content` as a "code block" example.
 *
 * Long code content will scroll if <Code /> is rendered inside a parent
 * element with constrained dimensions.
 */
function Code({ size, title, ...rest }: LibraryCodeProps) {
  const [codeMarkup, error] = useCodeContent(rest);

  return (
    <figure className="space-y-2 min-h-0 h-full">
      {codeMarkup && (
        <ScrollContainer borderless>
          <div
            className={classnames(
              'unstyled-text bg-slate-7 text-color-text-inverted p-4 rounded-md min-h-0 h-full',
              { 'text-sm': size === 'sm' },
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
      )}
      {error && <SimpleError message={error.message} />}
    </figure>
  );
}

export type LibraryUsageProps = {
  /** @deprecated. Use symbolName instead */
  componentName?: string;
  symbolName?: string;
  size?: 'sm' | 'md';
};

/**
 * Render import "usage" of a given `componentName`
 */
function Usage({
  componentName,
  symbolName = componentName,
  size = 'md',
}: LibraryUsageProps) {
  const importPath = '@hypothesis/frontend-shared';
  return (
    <Code
      content={`import { ${symbolName} } from '${importPath}';
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
    <RouteLink href={href} asChild>
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

/**
 * Render a two-column grid for label-description pairs
 */
function Info({ children }: { children: ComponentChildren }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-2 m-4">
      {children}
    </div>
  );
}

/**
 * Render a "row" in an Info layout with a label and description (children)
 */
function InfoItem({
  children,
  label,
}: {
  children: ComponentChildren;
  label: string;
}) {
  return (
    <>
      <div className="pt-1 text-right font-medium text-stone-600 text-sm">
        {label}
      </div>
      <div>{children}</div>
    </>
  );
}

export default {
  Callout,
  Changelog,
  ChangelogItem,
  Code,
  Demo,
  Info,
  InfoItem,
  Link,
  Page,
  Section,
  SectionL2,
  SectionL3,
  StatusChip,
  Usage,
};
