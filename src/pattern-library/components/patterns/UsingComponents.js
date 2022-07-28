import Library from '../Library';

import Next from '../LibraryNext';

export default function UsingComponentsPage() {
  return (
    <Library.Page
      title="Using components"
      intro={
        <>
          <p>This guide applies to updated ({'"next"'}) components only.</p>
        </>
      }
    >
      <Library.Pattern title="Component categories">
        <ul>
          <li>
            <strong>Simple components</strong>: Opinionated, simple components
            that apply design patterns. Example: <code>Spinner</code>.
          </li>
          <li>
            <strong>Presentational components</strong>: Composable components
            with customization flexibility. Example: <code>Button</code>,{' '}
            <code>Link</code>.
          </li>
          <li>
            <strong>Composite components</strong>: These components are
            combinations of presentational components arranged and styled in a
            particular way to satisfy a use case. Example:{' '}
            <code>ScrollBox</code>.
          </li>
        </ul>
      </Library.Pattern>
      <Library.Pattern title="Component API">
        <p>The props accepted by a component combine:</p>
        <ul>
          <li>
            <strong>Common props</strong> available to all components in its
            category
          </li>
          <li>
            <strong>Specific props</strong> for the component
          </li>
        </ul>

        <p>
          Documentation pages for components cover the props specific to the
          component, and call out any deviation of the component from its{' '}
          {"category's"} common props.
        </p>

        <Library.Example title="Simple components" />
        <p>
          <strong>Simple components</strong> are opinionated and take only
          documented, component-specific props.
        </p>
        <Library.Example title="Presentational components" />
        <p>
          <strong>Presentational components</strong> have more customization
          flexibility and take these common props:
        </p>
        <Next.Code
          size="sm"
          content={`/**
 * @typedef PresentationalProps
 * @prop {import('preact').ComponentChildren} [children]
 * @prop {string|string[]} [classes] - Optional extra CSS classes to append to the
 *   component's default classes
 * @prop {never} [className] - Use variants, props, unstyled component (when
 *   available) or classes instead
 * @prop {import('preact').Ref<HTMLElement>} [elementRef] - Ref for component's
 *   outermost element.
 */
`}
        />
        <Library.Example title="Composite components">
          <p>
            Composite components accept the same common props as presentational
            components with the exception of{' '}
            <s>
              <code>classes</code>
            </s>
            .
          </p>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
