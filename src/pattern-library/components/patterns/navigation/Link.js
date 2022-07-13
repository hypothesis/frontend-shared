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
              Some text that includes{' '}
              <Link href="https://www.example.com">a link to somewhere</Link> in
              its content.
            </p>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Color">
        <p>
          <code>color</code> applies to link text and hovered link text.
        </p>
        <Library.Example title="color: 'brand' (default)">
          <Library.Demo withSource>
            Content that contains a{' '}
            <Link href="https://www.example.com" color="brand">
              link to somewhere
            </Link>{' '}
            using (default) brand color.
          </Library.Demo>
        </Library.Example>

        <Library.Example title="color: 'text-light'">
          <p>
            This is a legacy pattern that should used with caution and in
            isolated places (away from running text) as its contrast is low and
            it does not read as a link. It styles links with the{' '}
            <code>color-text-light</code> color.
          </p>
          <Library.Demo withSource>
            Content that contains a
            <Link href="https://www.example.com" color="text-light">
              link to somewhere
            </Link>
            using light color.
          </Library.Demo>
        </Library.Example>

        <Library.Example title="color: 'text'">
          <p>
            This legacy pattern styles links with <code>color-text</code> and
            should be avoided or used with underlines.
          </p>
          <Library.Demo withSource>
            <p className="text-color-text">
              Content that contains a{' '}
              <Link href="https://www.example.com" color="text">
                link to somewhere
              </Link>{' '}
              using text color.
            </p>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Underline">
        <p>
          <code>Link</code>&apos;s default styling honors legacy design patterns
          that use no underlines, but authors should consider using underlines
          for usability and accessibility.
        </p>
        <Library.Example title="underline:'none' (default)">
          <Library.Demo withSource>
            <Link href="https://www.example.com" underline="none">
              no underlines, nope, never
            </Link>
          </Library.Demo>
        </Library.Example>
        <Library.Example title="underline:'hover'">
          <Library.Demo withSource>
            <Link href="https://www.example.com" underline="hover">
              underline on hover
            </Link>
          </Library.Demo>
        </Library.Example>
        <Library.Example title="underline:'always'">
          <Library.Demo withSource>
            <Link href="https://www.example.com" underline="always">
              always underlined
            </Link>
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
