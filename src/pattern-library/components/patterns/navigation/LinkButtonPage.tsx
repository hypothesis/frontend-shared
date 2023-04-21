import { LinkButton } from '../../../../';
import Library from '../../Library';

export default function LinkButtonPage() {
  return (
    <Library.Page
      title="LinkButton"
      intro={
        <p>
          <code>LinkButton</code> can be used to style a button to appear as a
          link.
        </p>
      }
    >
      <Library.Section
        title="LinkButton"
        intro={
          <p>
            <code>LinkButton</code> is a presentational component.
          </p>
        }
      >
        <Library.Pattern>
          <Library.Usage componentName="LinkButton" />
          <Library.Example>
            <Library.Demo title="Basic LinkButton" withSource>
              <LinkButton>Example of LinkButton</LinkButton>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <p>
            <code>color</code> applies to link text and hovered link text.
          </p>
          <Library.Example title="color">
            <Library.Demo title="color: 'brand' (default)" withSource>
              <LinkButton color="brand" underline="hover">
                About this version
              </LinkButton>
            </Library.Demo>

            <Library.Demo title="color: 'text-light'" withSource>
              <LinkButton color="text-light" underline="hover">
                Show replies (7)
              </LinkButton>
            </Library.Demo>
            <Library.Demo title="color: 'text'" withSource>
              <p className="text-color-text">
                <LinkButton color="text">Page notes</LinkButton>{' '}
              </p>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="underline">
            <p>
              By default, <code>LinkButton</code>s are not underlined. This is
              acceptable when the LinkButton is a standalone, interactive
              element. Underline on hover is encouraged, however, and
              LinkButtons inline with text content should always be underlined.
            </p>
            <Library.Demo title="underline:'none' (default)" withSource>
              <LinkButton underline="none">Log in</LinkButton>
            </Library.Demo>

            <Library.Demo title="underline:'hover'" withSource>
              <LinkButton
                href="https://www.example.com"
                color="text-light"
                underline="hover"
              >
                Show replies (7)
              </LinkButton>
            </Library.Demo>
            <Library.Demo title="underline:'always'" withSource>
              <p>
                LinkButtons should be{' '}
                <LinkButton underline="always" color="text" inline>
                  underlined
                </LinkButton>{' '}
                when inline with text content.
              </p>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="variant">
            <p>
              <code>primary</code> <code>variant</code> text is a heavier weight
              than <code>secondary</code>.
            </p>
            <Library.Demo title="variant: 'secondary' (default)" withSource>
              <LinkButton>Log in</LinkButton>
            </Library.Demo>
            <Library.Demo title="variant: 'primary'" withSource>
              <LinkButton variant="primary">Log in</LinkButton>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="inline">
            <p>
              <code>inline</code> is a convenience <code>boolean</code> prop for
              styling a <code>LinkButton</code> to lay out inline.
            </p>
            <Library.Demo title="inline not set" withSource>
              <p>
                This is{' '}
                <LinkButton color="text" underline="always">
                  a LinkButton
                </LinkButton>{' '}
                with some text.
              </p>
            </Library.Demo>

            <Library.Demo title="inline set" withSource>
              <p>
                This is{' '}
                <LinkButton color="text" underline="always" inline>
                  a LinkButton
                </LinkButton>{' '}
                with some text.
              </p>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="States">
          <Library.Example title="disabled">
            <p>
              <code>disabled</code> <code>LinkButton</code>s do not have hover
              styling.
            </p>
            <Library.Demo withSource>
              <div>
                <LinkButton disabled>Disabled (color brand)</LinkButton>
                <LinkButton disabled color="text">
                  Disabled (color text)
                </LinkButton>
                <LinkButton disabled color="text-light">
                  Disabled (color text-light)
                </LinkButton>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="pressed or expanded">
            <p>
              <code>pressed</code> and <code>expanded</code> are styled the
              same.
            </p>
            <Library.Demo withSource>
              <div>
                <LinkButton pressed>Pressed (color brand)</LinkButton>
                <LinkButton pressed color="text">
                  Pressed (color text)
                </LinkButton>
                <LinkButton pressed color="text-light">
                  Pressed (color text-light)
                </LinkButton>
              </div>
              <div>
                <LinkButton expanded>Expanded (color brand)</LinkButton>
                <LinkButton expanded color="text">
                  Expanded (color text)
                </LinkButton>
                <LinkButton expanded color="text-light">
                  Expanded (color text-light)
                </LinkButton>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
