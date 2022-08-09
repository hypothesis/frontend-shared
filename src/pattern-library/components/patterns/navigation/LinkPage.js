import { Link, LinkUnstyled } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

export default function LinkPage() {
  return (
    <Library.Page
      title="Link"
      intro={
        <p>
          <code>Link</code> is a presentational component for anchor (
          <code>a</code>) elements. A <code>LinkUnstyled</code> component is
          also available.
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
        <Library.Pattern title="Status">
          <p>
            <code>Link</code> is a reimplementation of an existing legacy
            component with the same name.
          </p>

          <Library.Example title="Migrating to this component">
            <Next.Changelog>
              <Next.ChangelogItem status="breaking">
                Prop name:{' '}
                <s>
                  <code>linkRef</code>
                </s>{' '}
                ➜ <code>elementRef</code>
              </Next.ChangelogItem>
              <Next.ChangelogItem status="breaking">
                <s>
                  <code>className</code>
                </s>{' '}
                ➜ no longer supported; use <code>LinkUnstyled</code> instead
              </Next.ChangelogItem>
              <Next.ChangelogItem status="added">
                <code>color</code>, <code>underline</code> props
              </Next.ChangelogItem>
              <Next.ChangelogItem status="added">
                <code>LinkUnstyled</code> component
              </Next.ChangelogItem>
            </Next.Changelog>
          </Library.Example>
        </Library.Pattern>
        <Library.Pattern title="Usage">
          <Next.Usage componentName="Link" />
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
        title="LinkUnstyled"
        intro={
          <p>
            <code>LinkUnstyled</code> is a presentational component. It does not
            apply any styling and can be used for customization.
          </p>
        }
      >
        <Library.Pattern title="Status">
          <p>
            <code>LinkUnstyled</code> is a new component.
          </p>
        </Library.Pattern>
        <Library.Pattern title="Usage">
          <Next.Usage componentName="LinkUnstyled" />
          <p>
            To enable a focus ring consistent with other interactive elements,
            use the <code>.focus-visible-ring</code> utility class.
          </p>
          <Library.Example>
            <Library.Demo withSource>
              <LinkUnstyled
                href="https://www.example.com"
                classes="focus-visible-ring bg-slate-0 p-2"
              >
                A link to somewhere
              </LinkUnstyled>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
