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

      <Library.Pattern title="Color">
        <p>
          <code>color</code> applies to link text and hovered link text.
        </p>
        <Library.Example title="color: 'brand' (default)">
          <Library.Demo
            title="Using default color='brand' for sign up link"
            withSource
          >
            <Link href="https://www.example.com" color="brand">
              Sign up
            </Link>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="color: 'text-light'">
          <Library.Demo
            title="Using color='text-light' for an annotation tag"
            withSource
          >
            <Link href="https://www.example.com" color="text-light">
              <div className="flex items-center border rounded-sm bg-grey-0 px-1.5 py-1">
                annotation tag
              </div>
            </Link>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="color: 'text'">
          <Library.Demo
            title="Using color='text' for sidebar tab labels"
            withSource
          >
            <p className="text-color-text">
              <Link href="https://www.example.com" color="text">
                Page notes
              </Link>{' '}
            </p>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Underline">
        <p>
          By default, <code>Link</code>s are not underlined. This is acceptable
          when the <code>Link</code> is a standalone, interactive element.
          Underline on hover is encouraged, however, and <code>Link</code>s
          inline with text content should always be underlined.
        </p>
        <Library.Example title="underline:'none' (default)">
          <Library.Demo
            title="Using underline='none' for standalone log in link"
            withSource
          >
            <Link href="https://www.example.com" underline="none">
              Log in
            </Link>
          </Library.Demo>
        </Library.Example>
        <Library.Example title="underline:'hover'">
          <Library.Demo
            title="Using underline='hover' for reply-expansion link"
            withSource
          >
            <Link
              href="https://www.example.com"
              color="text-light"
              underline="hover"
            >
              Show replies (7)
            </Link>
          </Library.Demo>
        </Library.Example>
        <Library.Example title="underline:'always'">
          <Library.Demo
            title="Using underline='always' in text content"
            withSource
          >
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

      <Library.Pattern title="LinkUnstyled">
        <p>
          <code>LinkUnstyled</code> does not apply any styling. Use the{' '}
          <code>classes</code> prop to style the component.
        </p>
        <p>
          To enable a focus ring consistent with other interactive elements, use
          the <code>.focus-visible-ring</code> utility class.
        </p>
        <Library.Example title="Usage">
          <Next.Usage componentName="LinkUnstyled" />
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
    </Library.Page>
  );
}
