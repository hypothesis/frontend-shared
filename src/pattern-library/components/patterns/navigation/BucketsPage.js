import { BucketButton } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

export default function BucketsPage() {
  return (
    <Library.Page
      title="Buckets"
      intro={
        <>
          <p>
            <em>Buckets</em> are a concept are used in the Hypothesis client.
            They represent a set of one or more annotation highlights that are
            located near each other in the source text.
          </p>
          <p>
            Bucket buttons point at and navigate to these groups of annotation
            highlights, which are either in the visible content of the source
            document (guest page) or off-screen (above or below).
          </p>
        </>
      }
    >
      <Library.Section
        title="BucketButton"
        intro={
          <p>
            <code>BucketButton</code> is a presentational component for styling
            a button that points towards a group of items elsewhere in the UI or
            off-screen.
          </p>
        }
      >
        <Library.Pattern title="Status">
          <p>
            <code>BucketButton</code> is a new component.
          </p>
        </Library.Pattern>

        <Library.Pattern title="Usage">
          <Next.Usage componentName="BucketButton" />
          <Library.Example>
            <Library.Demo
              title="BucketButton variants 'lozenge', 'up', 'down', 'left'"
              withSource
            >
              <BucketButton>13</BucketButton>
              <BucketButton variant="up">3</BucketButton>
              <BucketButton variant="down">7</BucketButton>
              <BucketButton variant="left">5</BucketButton>
            </Library.Demo>

            <p>
              The following example shows <code>BucketButtons</code> as they
              might appear in the client, positioned absolutely in a{' '}
              {'"bucket bar"'}.
            </p>

            <Library.Demo title="BucketButtons in visual context" withSource>
              <div className="w-[23px] h-[250px] bg-grey-2">
                <ul className="relative h-full pointer-events-none">
                  <li
                    className="absolute right-0 pointer-events-auto mt-[-11px]"
                    style={{ top: '15px' }}
                  >
                    <BucketButton variant="up">6</BucketButton>
                  </li>

                  <li
                    className="absolute right-0 pointer-events-auto mt-[-8px]"
                    style={{ top: '47px' }}
                  >
                    <BucketButton variant="left">10</BucketButton>
                  </li>

                  <li
                    className="absolute right-0 pointer-events-auto mt-[-8px]"
                    style={{ top: '112px' }}
                  >
                    <BucketButton variant="left">1</BucketButton>
                  </li>

                  <li
                    className="absolute right-0 pointer-events-auto"
                    style={{ top: '230px' }}
                  >
                    <BucketButton variant="down">4</BucketButton>
                  </li>
                </ul>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <p>
            <code>BucketButton</code> also takes common{' '}
            <a href="./input-button">
              <code>ButtonBase</code>
            </a>{' '}
            props.
          </p>
          <Library.Example title="variant">
            <p>
              While <code>lozenge</code> is the default variant, it is not
              currently used anywhere. Translation: you need to tell your bucket
              button which direction to point using the <code>variant</code>{' '}
              prop.
            </p>
            <Library.Demo title="variant: lozenge (default)" withSource>
              <BucketButton variant="lozenge">24</BucketButton>
            </Library.Demo>

            <p>
              The <code>left</code> variant is intended to point to and navigate
              to a bucket of annotations currently visible on-screen.
            </p>
            <Library.Demo title="variant: left" withSource>
              <BucketButton variant="left">3</BucketButton>
            </Library.Demo>

            <p>
              The <code>up</code> variant is intended to point to and navigate
              to the next bucket offscreen (above).
            </p>
            <Library.Demo title="variant: up" withSource>
              <BucketButton variant="up">4</BucketButton>
            </Library.Demo>

            <p>
              The <code>down</code> variant is intended to point to and navigate
              to the next bucket offscreen (below).
            </p>
            <Library.Demo title="variant: down" withSource>
              <BucketButton variant="down">6</BucketButton>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
