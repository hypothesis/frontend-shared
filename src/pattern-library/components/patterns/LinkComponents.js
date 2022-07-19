import { Link } from '../../../';
import Library from '../Library';
import Next from '../LibraryNext';

export default function LinkComponents() {
  return (
    <Library.Page
      title="Links"
      intro={
        <p>
          <code>Link</code> is a legacy component providing common styling and
          attributes for anchor (<code>a</code>) elements.
        </p>
      }
    >
      <Library.Pattern title="Status">
        <Next.Changelog>
          <Next.ChangelogItem status="deprecated">
            The legacy implementation of
            <s>
              <code>Link</code>
            </s>{' '}
            is deprecated and slated for removal in v6.0 of{' '}
            <code>frontend-shared</code>. Use re-implemented
            <code>Link</code> component in the navigation group instead.
          </Next.ChangelogItem>
        </Next.Changelog>
      </Library.Pattern>
      <Library.Pattern title="Usage">
        <Next.Usage componentName="Link" generation="legacy" />
        <Library.Example>
          <Library.Demo withSource>
            <Link href="https://www.example.com">A link to somewhere</Link>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
