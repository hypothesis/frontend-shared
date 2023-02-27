/**
 * Pattern library components related to UI component re-implementation and
 * migration.
 */
import classnames from 'classnames';
import { useMemo } from 'preact/hooks';

import { Scroll, ScrollContainer } from '../../next';
import { jsxToHTML } from '../util/jsx-to-string';

/**
 * Render a little label or pill next to changelog items
 *
 * @typedef {'breaking'|'added'|'changed'|'deprecated'} ChangeStatus
 *
 * @param {object} props
 *   @param {ChangeStatus} props.status
 */
function StatusChip({ status }) {
  return (
    <span
      className={classnames('rounded-md py-1', {
        'px-2 bg-red-error text-color-text-inverted': status === 'breaking',
        'px-2 bg-yellow-notice': status === 'deprecated',
        'font-semibold': status === 'added' || status === 'changed',
      })}
    >
      {status === 'breaking' && <span>Breaking</span>}
      {status === 'deprecated' && <span>Deprecated</span>}
      {status === 'added' && <span>Added:</span>}
      {status === 'changed' && <span>Changed:</span>}
    </span>
  );
}

/**
 * Wrapper around a list of changelog items
 *
 * @param {object} props
 *   @param {import('preact').ComponentChildren} props.children
 */
function Changelog({ children }) {
  return <ul>{children}</ul>;
}

/**
 * Single changelog item
 *
 * @param {object} props
 *   @param {ChangeStatus} props.status
 *   @param {import('preact').ComponentChildren} props.children
 */
function ChangelogItem({ status, children }) {
  return (
    <li className="space-x-2">
      <StatusChip status={status} />
      <span>{children}</span>
    </li>
  );
}

/**
 * Render provided `content` as a "code block" example.
 *
 * Long code content will scroll if <Code /> is rendered inside a parent
 * element with constrained dimensions.
 *
 * @param {object} props
 *   @param {import('preact').ComponentChildren} props.content - Code content
 *   @param {'sm'|'md'|'lg'} [props.size]
 *   @param {string} [props.title] - Caption (e.g. filename, description) of
 *     code block
 */
function Code({ content, size, title }) {
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

/**
 * Render import "usage" of a given `componentName`
 *
 * @param {object} props
 *   @param {string} props.componentName
 *   @param {'next'|'legacy'} [props.generation]
 *   @param {'sm'|'md'|'lg'} [props.size]
 */
function Usage({ componentName, generation = 'next', size = 'md' }) {
  const importPath =
    generation === 'next'
      ? '@hypothesis/frontend-shared/lib/next'
      : '@hypothesis/frontend-shared';
  return (
    <Code
      content={`import { ${componentName} } from '${importPath}';
`}
      size={size}
    />
  );
}

export default {
  Changelog,
  ChangelogItem,
  Code,
  Usage,
};
