import Library from '../../Library';

export default function UseClickAwayPage() {
  return (
    <Library.Page
      title="useClickAway"
      intro={
        <p>
          <code>useClickAway</code> is a hook to listen for click events on{' '}
          <code>document.body</code>. If an event{"'"}s target is outside the
          container element, it invokes a callback.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage symbolName="useClickAway" />
          <Library.Example>
            <Library.Demo
              withSource
              title="Basic useClickAway"
              exampleFile="use-click-away-basic"
            />
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Hook arguments">
          <Library.Example title="container">
            <Library.Info>
              <Library.InfoItem label="description">
                A Ref to the DOM element used to evaluate if clicking happened{' '}
                {'"'}
                away{'"'}.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`RefObject<HTMLElement | undefined>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="callback">
            <Library.Info>
              <Library.InfoItem label="description">
                The callback to be invoked when clicking away. The click event
                object is passed to it.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`(e: Event) => void`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="options">
            <Library.Info>
              <Library.InfoItem label="description">
                Options to configure the hook{"'"}s behavior.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                See{' '}
                <Library.Link href="#hook-options">hook options</Library.Link>{' '}
                below for details.
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Hook options" id="hook-options">
          <Library.Example title="enabled">
            <Library.Info>
              <Library.InfoItem label="description">
                Allows the hook to be conditionally enabled or disabled, for
                example, if the container it handles is dynamically hidden or
                unmounted.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`boolean`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`true`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Code
              content={`useClickAway(containerRef, callback, { enabled: false })`}
            />
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
