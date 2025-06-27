import Library from '../Library';

export default function UsingComponentsPage() {
  return (
    <Library.Page
      title="Using components"
      intro={
        <p>
          This package provides several categories of components. Which category
          a component belongs to indicates its general role and common props
          API.
        </p>
      }
    >
      <Library.Section title="Presentational components">
        <p>
          <strong className="font-semibold">Presentational components</strong>{' '}
          are the most common type of component. They are composable components
          that encapsulate design patterns and UI behavior.
        </p>

        <p>
          Examples:{' '}
          <Library.Link href="/input-button">
            <code>Button</code>
          </Library.Link>
          ,{' '}
          <Library.Link href="/navigation-link">
            <code>Link</code>
          </Library.Link>
        </p>

        <Library.Section id="presentational-components-api" title="API">
          <p>
            All presentational components provide this API unless documented
            otherwise.
          </p>
          <Library.SectionL3 title="children">
            <Library.Info>
              <Library.InfoItem label="type">
                <code>preact.ComponentChildren</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
          <Library.SectionL3 title="classes">
            <Library.Info>
              <Library.InfoItem label="description">
                CSS class(es) that will be appended to the CSS classes applied
                to the {"component's"} outermost or most significant element.
                This can be used independently or in conjunction with the
                Styling API props.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
          <Library.SectionL3 title="elementRef">
            <Library.Info>
              <Library.InfoItem label="description">
                A <code>Ref</code> applied to the {"component's"} outermost or
                most significant element.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{'preact.Ref<HTMLElement | undefined>'}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
          <Library.SectionL3 title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                Presentational components accept HTML attributes applicable to
                the element type of the {"component's"} outermost or most
                significant element.
              </Library.InfoItem>
              <Library.InfoItem label="example">
                <Library.Code
                  content={`<Link id="my-own-id" href="https://www.example.com">A Link with attributes</Link>`}
                  size="sm"
                />
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>
                  {'preact.JSX.HTMLAttributes<T extends HTMLElement>'}
                </code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.Section>

        <Library.Section
          id="presentational-components-styling-api"
          title="Styling API"
        >
          <p>
            <Library.Callout>
              These props extend the common presentational-component API. They
              are new and not supported by all presentational components yet.
              See individual component API documentation for details.
            </Library.Callout>
          </p>

          <p>
            See also the{' '}
            <Library.Link href="/styling-components">
              styling guide
            </Library.Link>{' '}
            that details how to use these props to customize components.
          </p>

          <Library.SectionL3 title="variant">
            <Library.Info>
              <Library.InfoItem label="description">
                Many presentational components have multiple variants. Variants{' '}
                {'"theme"'} a component, affecting such aspects as color,
                transitions, shadows, etc. Set to <code>{"'custom'"}</code> to
                disable variant styling.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'custom' | string`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="example">
                <Library.Code
                  content={`<SomeComponent variant="secondary" classes="bg-pink">
   <p>This will EXTEND the "secondary" variant styles with a pink background</p>
</SomeComponent>

<SomeComponent variant="custom" classes="bg-pink">
  <p>This will REPLACE all theming styles with a pink background</p>
</SomeComponent>`}
                  size="sm"
                />
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>

          <Library.SectionL3 title="size">
            <Library.Info>
              <Library.InfoItem label="description">
                Many, but not all, presentational components provide multiple
                sizes. The <code>size</code> value affects size, padding,
                margins, etc. Set to <code>{"'custom'"}</code> to disable
                size-related styling.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'custom' | string`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="example">
                <Library.Code
                  content={`<SomeComponent size="lg" classes="mt-4">
  This will EXTEND size styling with a top margin
</SomeComponent>

<SomeComponent size="custom" classes="mt-4">
  This will REPLACE size styling with a top margin
</SomeComponent>`}
                  size="sm"
                />
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>

          <Library.SectionL3 title="unstyled">
            <Library.Info>
              <Library.InfoItem label="description">
                Set this to disable all styling. This is a {'"master switch"'}{' '}
                that will supersede <code>size</code> and <code>variant</code>{' '}
                values. Note that some components have core (typically
                behavioral) CSS classes that cannot be disabled.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
              <Library.InfoItem label="example">
                <Library.Code
                  content={`<SomeComponent unstyled classes="bg-pink">
  This will replace all styles with a pink background (only)
</SomeComponent>`}
                  size="sm"
                />
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.Section>
      </Library.Section>

      <Library.Section title="Composite components">
        <p>
          <strong className="font-semibold">Composite components</strong>{' '}
          compose and style presentational components in a particular way to
          satisfy a use case and sometimes support more complex or widget-like
          behavior.
        </p>

        <p>
          Examples:{' '}
          <Library.Link href="/data-scrollbox">
            <code>ScrollBox</code>
          </Library.Link>
          ,{' '}
          <Library.Link href="/layout-panel">
            <code>Panel</code>
          </Library.Link>
        </p>

        <Library.Section id="composite-components-api" title="API">
          <Library.SectionL3 title="children">
            <Library.Info>
              <Library.InfoItem label="description">
                Some, but not all, composite components accept{' '}
                <code>children</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>preact.ComponentChildren</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>

          <Library.SectionL3 title="elementRef">
            <Library.Info>
              <Library.InfoItem label="description">
                A <code>Ref</code> applied to the {"component's"} outermost or
                most significant element.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{'preact.Ref<HTMLElement | undefined>'}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>

          <Library.SectionL3 title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                Some, but not all, composite components accept HTML attributes
                applicable to the element type of the {"component's"} outermost
                or most significant element.
              </Library.InfoItem>
              <Library.InfoItem label="example">
                <Library.Code
                  content={`<Link id="my-own-id" href="https://www.example.com">A Link with attributes</Link>`}
                  size="sm"
                />
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>
                  {'preact.JSX.HTMLAttributes<T extends HTMLElement>'}
                </code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.Section>
      </Library.Section>

      <Library.Section title="Transition components">
        <p>
          <strong className="font-semibold">Transition components</strong> are
          components with an in/out transition which can be used standalone or
          wrapped by other components.
        </p>

        <p>
          Example:{' '}
          <Library.Link href="/transitions-slider">
            <code>Slider</code>
          </Library.Link>
        </p>
        <Library.Section title="API" id="transition-components-api">
          <Library.SectionL3 title="delay">
            <Library.Info>
              <Library.InfoItem label="description">
                Sets delay before transitions begin. See the{' '}
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay">
                  transition-delay
                </a>{' '}
                CSS property.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string | undefined</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>

          <Library.SectionL3 title="direction">
            <Library.Info>
              <Library.InfoItem label="description">
                Sets the current direction of the component transition.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{"'in' | 'out' "}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'in'"}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>

          <Library.SectionL3 title="onTransitionEnd">
            <Library.Info>
              <Library.InfoItem label="description">
                Callback invoked when the {"component's"} transition has
                completed.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`(direction: 'in' | 'out') => void`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.Section>
      </Library.Section>

      <Library.Section title="Simple components">
        <p>
          <strong className="font-semibold">Simple components</strong> are
          opinionated, simple components that apply design patterns. These
          components have a minimal, component-specific API.
        </p>
      </Library.Section>
    </Library.Page>
  );
}
