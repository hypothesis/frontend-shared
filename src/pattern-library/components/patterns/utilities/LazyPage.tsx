import Library from '../../Library';

export default function LazyPage() {
  return (
    <Library.Page
      title="lazy"
      intro={
        <p>
          The <code>lazy</code> utility creates a component which is loaded
          asynchronously, displaying fallback content while loading and showing
          an error fallback if the component fails to load.
        </p>
      }
    >
      <Library.Section title="API">
        <Library.SectionL2>
          <Library.Usage symbolName="lazy" />
        </Library.SectionL2>
        <Library.SectionL2 title="Parameters">
          <Library.SectionL3 title="displayName">
            <Library.Info>
              <Library.InfoItem label="description">
                Display name for the lazy wrapper component.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>

          <Library.SectionL3 title="load">
            <Library.Info>
              <Library.InfoItem label="description">
                Callback invoked on first render to load the component. This
                returns a promise resolving to the loaded component. A common
                use case is to use an <code>import(...)</code> expression to
                load the component.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{'() => Promise<FunctionalComponent<P>>'}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>

          <Library.SectionL3 title="options">
            <Library.Info>
              <Library.InfoItem label="description">
                Configuration for the lazy component
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>LazyOptions&lt;P&gt;</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="LazyOptions">
          <Library.SectionL3 title="fallback">
            <Library.Info>
              <Library.InfoItem label="description">
                Function that returns content to display while loading
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{'(props: P) => ComponentChildren'}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>

          <Library.SectionL3 title="errorFallback">
            <Library.Info>
              <Library.InfoItem label="description">
                Function that returns content to display if loading fails. If
                not provided a default error fallback is shown.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>
                  {
                    '((props: P, error: Error) => ComponentChildren) | undefined'
                  }
                </code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>

      <Library.Section title="Examples">
        <Library.SectionL2 title="Basic usage">
          <p>
            Lazy components start loading on first render, and show a fallback
            while loading.
          </p>
          <Library.Demo
            title="Basic lazy component"
            exampleFile="lazy-basic"
            withSource
          />
        </Library.SectionL2>

        <Library.SectionL2 title="Error handling">
          <p>If a component fails to load, the error fallback is displayed:</p>
          <Library.Demo
            title="Component with error state"
            exampleFile="lazy-error-handling"
            withSource
          />
        </Library.SectionL2>
      </Library.Section>
    </Library.Page>
  );
}
