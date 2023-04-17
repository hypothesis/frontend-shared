import { Link, LinkBase } from '../../../../';
import Library from '../../Library';

export default function LinkPage() {
  return (
    <Library.Page
      title="Link"
      intro={
        <p>
          <code>Link</code> is a presentational component for anchor (
          <code>a</code>) elements. A <code>LinkBase</code> base presentational
          component is also available.
        </p>
      }
    >
      <Library.Section
        title="Link"
        intro={
          <p>
            <code>Link</code> is a presentational component for styling links.
          </p>
        }
      >
        <Library.Pattern title="Usage">
          <Library.Usage componentName="Link" />
          <Library.Example>
            <Library.Demo title="Basic Link" withSource>
              <p>
                <Link href="https://www.example.com">Click me</Link>
              </p>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="color">
            <p>
              <code>color</code> applies to link text and hovered link text.
            </p>
            <Library.Demo title="color: 'brand' (default)" withSource>
              <Link href="https://www.example.com" color="brand">
                Sign up
              </Link>
            </Library.Demo>
            <Library.Demo title="color: 'text-light'" withSource>
              <Link href="https://www.example.com" color="text-light">
                <div className="flex items-center border rounded-sm bg-grey-0 px-1.5 py-1">
                  annotation tag
                </div>
              </Link>
            </Library.Demo>
            <Library.Demo title="color: 'text'" withSource>
              <p className="text-color-text">
                <Link href="https://www.example.com" color="text">
                  Page notes
                </Link>{' '}
              </p>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="underline">
            <p>
              By default, <code>Link</code>s are not underlined. This is
              acceptable when the <code>Link</code> is a standalone, interactive
              element. Underline on hover is encouraged, however, and{' '}
              <code>Link</code>s inline with text content should always be
              underlined.
            </p>
            <Library.Demo title="underline:'none' (default)" withSource>
              <Link href="https://www.example.com" underline="none">
                Log in
              </Link>
            </Library.Demo>
            <Library.Demo title="underline:'hover'" withSource>
              <Link
                href="https://www.example.com"
                color="text-light"
                underline="hover"
              >
                Show replies (7)
              </Link>
            </Library.Demo>
            <Library.Demo title="underline:'always'" withSource>
              <p>
                Links should be{' '}
                <Link href="https://www.example.com" underline="always">
                  underlined
                </Link>{' '}
                when inline with text content.
              </p>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>

      <Library.Section
        title="LinkBase"
        intro={
          <>
            <p>
              <code>LinkBase</code> is a base presentational component that
              allows style customization of links.
            </p>
            <p>
              <code>LinkBase</code> applies minimal common styling. Turn off all
              styling by setting the <code>unstyled</code> prop.
            </p>
          </>
        }
      >
        <Library.Pattern title="Usage">
          <Library.Usage componentName="LinkBase" />

          <Library.Example>
            <p>
              This example shows a <code>LinkBase</code> with some additional{' '}
              <code>classes</code>. These <code>classes</code> are appended to
              the {"component's"} base styling classes.
            </p>

            <Library.Demo
              title="LinkBase with some additional styles"
              withSource
            >
              <LinkBase
                classes="border hover:underline"
                onClick={() => alert('You clicked the link')}
              >
                Click me
              </LinkBase>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
        <Library.Pattern title="Props">
          <Library.Example title="unstyled">
            <p>
              Set <code>unstyled</code> to style your link from scratch.{' '}
              <em>Only</em> the classes in <code>classes</code> are applied.
            </p>
            <Library.Demo title="LinkBase" withSource>
              <LinkBase
                classes="border hover:underline"
                onClick={() => alert('You clicked the link')}
                unstyled
              >
                Click me
              </LinkBase>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
