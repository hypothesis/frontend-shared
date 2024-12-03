import { PointerButton } from '../../../../';
import Library from '../../Library';

export default function PointerButtonPage() {
  return (
    <Library.Page
      title="PointerButton"
      intro={
        <>
          <p>
            <code>PointerButton</code> is a presentational component for styling
            a button that points towards a group of items elsewhere in the UI or
            off-screen. They are specifically used to indicate and navigate to
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
      <Library.Section>
        <Library.SectionL2>
          <Library.Usage componentName="PointerButton" />
          <Library.SectionL3>
            <Library.Demo title="Basic PointerButtons" withSource>
              <PointerButton direction="up">3</PointerButton>
              <PointerButton direction="down">7</PointerButton>
              <PointerButton direction="left">5</PointerButton>
            </Library.Demo>
          </Library.SectionL3>
        </Library.SectionL2>
        <Library.SectionL2 title="Working with PointerButtons">
          <Library.SectionL3 title="PointerButtons in context">
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
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Component API">
          <code>Button</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.SectionL3 title="direction">
            <Library.Info>
              <Library.InfoItem label="description">
                Direction the button should point. If not provided, the button
                will be a round lozenge.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'up' | 'down' | 'left'`}</code>
              </Library.InfoItem>
            </Library.Info>

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
          </Library.SectionL3>
          <Library.SectionL3 title="...buttonProps">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>PointerButton</code> props for{' '}
                <Library.Link href="/input-button">Button</Library.Link> except
                for styling API props. This includes HTML attributes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`Omit<ButtonProps>, 'variant' | 'size' | 'unstyled'>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>
    </Library.Page>
  );
}
