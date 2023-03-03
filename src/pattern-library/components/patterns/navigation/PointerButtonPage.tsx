import { PointerButton } from '../../../../next';
import Library from '../../Library';

export default function PointerButtonPage() {
  return (
    <Library.Page
      title="PointerButton"
      intro={
        <>
          <p>
            <code>PointerButton</code> is a component for styling a button that
            points towards a group of items elsewhere in the UI or off-screen.
            They are specifically used to indicate and navigate to
            &quot;buckets&quot; (groups of annotations that are near each other
            in document content) in the Hypothesis client.
          </p>
          <p>
            PointerButtons point at and navigate to these groups of annotation
            highlights, which are either in the visible content of the source
            document (guest page) or off-screen (above or below).
          </p>
        </>
      }
    >
      <Library.Section
        title="PointerButton"
        intro={
          <p>
            <code>PointerButton</code> is a presentational component.
          </p>
        }
      >
        <Library.Pattern title="Usage">
          <Library.Usage componentName="PointerButton" />
          <Library.Example>
            <Library.Demo
              title="PointerButton directions 'up', 'down', 'left'"
              withSource
            >
              <PointerButton direction="up">3</PointerButton>
              <PointerButton direction="down">7</PointerButton>
              <PointerButton direction="left">5</PointerButton>
            </Library.Demo>

            <p>
              The following example shows <code>PointerButtons</code> as they
              might appear in the client, positioned absolutely in a{' '}
              {'"bucket bar"'}.
            </p>

            <Library.Demo title="PointerButtons in visual context" withSource>
              <div className="w-[23px] h-[250px] bg-grey-2">
                <ul className="relative h-full pointer-events-none">
                  <li
                    className="absolute right-0 pointer-events-auto mt-[-11px]"
                    style={{ top: '15px' }}
                  >
                    <PointerButton direction="up">6</PointerButton>
                  </li>

                  <li
                    className="absolute right-0 pointer-events-auto mt-[-8px]"
                    style={{ top: '47px' }}
                  >
                    <PointerButton direction="left">10</PointerButton>
                  </li>

                  <li
                    className="absolute right-0 pointer-events-auto mt-[-8px]"
                    style={{ top: '112px' }}
                  >
                    <PointerButton direction="left">1</PointerButton>
                  </li>

                  <li
                    className="absolute right-0 pointer-events-auto"
                    style={{ top: '230px' }}
                  >
                    <PointerButton direction="down">4</PointerButton>
                  </li>
                </ul>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <p>
            <code>PointerButton</code> also takes common{' '}
            <a href="./input-button">
              <code>ButtonBase</code>
            </a>{' '}
            props.
          </p>
          <Library.Example title="direction">
            <p>
              The <code>direction</code> prop is not required. When not
              provided, the button will not point in any direction but instead
              will be lozenge-shaped. This pattern is not used anywhere
              currently.
            </p>
            <Library.Demo title="direction not set" withSource>
              <PointerButton>24</PointerButton>
            </Library.Demo>

            <p>
              The <code>left</code> direction is intended to point to and
              navigate to a bucket of annotations currently visible on-screen.
            </p>
            <Library.Demo title="direction: left" withSource>
              <PointerButton direction="left">3</PointerButton>
            </Library.Demo>

            <p>
              The <code>up</code> direction is intended to point to and navigate
              to the next bucket offscreen (above).
            </p>
            <Library.Demo title="direction: up" withSource>
              <PointerButton direction="up">4</PointerButton>
            </Library.Demo>

            <p>
              The <code>down</code> direction is intended to point to and
              navigate to the next bucket offscreen (below).
            </p>
            <Library.Demo title="direction: down" withSource>
              <PointerButton direction="down">6</PointerButton>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
