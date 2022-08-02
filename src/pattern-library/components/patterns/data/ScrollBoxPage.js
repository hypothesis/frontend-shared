import { ScrollBox } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

import { SampleListElements } from '../samples';

export default function ScrollBoxPage() {
  return (
    <Library.Page
      title="ScrollBox"
      intro={
        <>
          <p>
            <code>ScrollBox</code> is an opinionated composite component that
            provides a shorthand for styling scrollable content.
          </p>
          <p>
            For more custom control over scrolling content, see{' '}
            <code>Scroll</code> and its allies.
          </p>
        </>
      }
    >
      <Library.Pattern title="Status">
        <p>
          <code>ScrollBox</code> is a re-implementation of the legacy component{' '}
          <code>Scrollbox</code> (note casing change).
        </p>
        <Library.Example title="Migrating to this component">
          <Next.Changelog>
            <Next.ChangelogItem status="breaking">
              <strong>Watch out!</strong> The casing of this {"component's"}{' '}
              name has changed:
              <s>
                <code>Scrollbox</code>
              </s>{' '}
              ➜ <code>ScrollBox</code>
            </Next.ChangelogItem>
            <Next.ChangelogItem status="breaking">
              Prop:
              <s>
                <code>withHeader</code>
              </s>{' '}
              ➜ No longer supported. Use <code>Scroll</code> components directly
              to add header-like non-scrolling content.
            </Next.ChangelogItem>
            <Next.ChangelogItem status="breaking">
              Prop:
              <s>
                <code>classes</code>
              </s>{' '}
              ➜ no longer supported. Use <code>Scroll</code>-family components
              directly for more customization
            </Next.ChangelogItem>
          </Next.Changelog>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Usage">
        <Next.Usage componentName="ScrollBox" />
        <Library.Example title="Basic ScrollBox">
          <Library.Demo withSource>
            <div className="w-[280px] h-[200px]">
              <ScrollBox>
                <ul>
                  <SampleListElements />
                </ul>
              </ScrollBox>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Props">
        <Library.Example title="borderless">
          <p>
            <code>ScrollBox</code> applies a border to the outer{' '}
            <code>ScrollContainer</code> by default. This can be disabled with
            the <code>borderless</code> boolean prop.
          </p>
          <Library.Demo title="Turning off borders" withSource>
            <div className="w-[280px] h-[200px]">
              <ScrollBox borderless>
                <ul>
                  <SampleListElements />
                </ul>
              </ScrollBox>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
