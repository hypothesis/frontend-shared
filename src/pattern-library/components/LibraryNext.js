/**
 * Pattern library components related to UI component re-implementation and
 * migration.
 */

import classnames from 'classnames';

import { jsxToString } from '../util/jsx-to-string';

/**
 * Render a little label or pill next to changelog items
 *
 * @typedef {'breaking'|'added'|'deprecated'} ChangeStatus
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
        'font-semibold': status !== 'breaking',
      })}
    >
      {status === 'breaking' && <span>Breaking</span>}
      {status === 'deprecated' && <span>Deprecated</span>}
      {status === 'added' && <span>Added:</span>}
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
 * @param {object} props
 *   @param {string} props.content - Code content
 *   @param {'sm'|'md'|'lg'} [props.size]
 *   @param {string} [props.title] - Caption (e.g. filename, description) of
 *     code block
 */
function Code({ content, size, title }) {
  return (
    <figure className="space-y-2">
      <div
        className={classnames(
          'unstyled-text bg-slate-7 text-color-text-inverted p-4 rounded-md',
          { 'text-sm': size === 'sm' }
        )}
      >
        <code className="text-color-text-inverted">
          <pre className="whitespace-pre-wrap">{jsxToString(content)}</pre>
        </code>
      </div>
      {title && (
        <figcaption className="flex justify-end">
          <span className="italic">{title}</span>
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Render import "usage" of a given `componentName`
 *
 * @param {object} props
 *   @prop {string} props.componentName
 *   @prop {'next'|'legacy'} [props.generation]
 */
function Usage({ componentName, generation = 'next' }) {
  const importPath =
    generation === 'next'
      ? '@hypothesis/frontend-shared/lib/next'
      : '@hypothesis/frontend-shared';
  return (
    <Code
      content={`import { ${componentName} } from '${importPath}';
`}
    />
  );
}

export default {
  Changelog,
  ChangelogItem,
  Code,
  Usage,
};
