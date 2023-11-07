import { OptionButton } from '../../../../';
import Library from '../../Library';

export default function OptionButtonPage() {
  return (
    <Library.Page
      title="OptionButton"
      intro={
        <p>
          <code>OptionButton</code> is a simple component for presenting an
          option as part of a set of options. It can be used in places where it
          is impractical or undesirable to use an equivalent{' '}
          <code>{`input type="radio"`}</code> or <code>select</code> element.{' '}
          <code>OptionButton</code> wraps{' '}
          <Library.Link href="/input-button">
            <code>Button</code>
          </Library.Link>
          .
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="OptionButton" />
          <Library.Example>
            <Library.Demo withSource title="Basic OptionButton">
              <div className="w-[250px]">
                <OptionButton>Option Alpha</OptionButton>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Working with OptionButton">
          <Library.Example title="Multiple OptionButtons">
            <p>
              <code>OptionButton</code> is designed for use in a set, similar to
              an <code>option</code> element or a radio button. While not
              enforced, a maximum of one <code>OptionButton</code> in a set
              should be selected. There is also <code>disabled</code>
              styling.
            </p>
            <p>
              To facilitate alignment, <code>OptionButton</code> stretches to
              the full width of its container.
            </p>
            <Library.Demo withSource>
              <div className="w-[280px] space-y-2">
                <OptionButton>Option Alpha</OptionButton>
                <OptionButton selected>Option Bravo</OptionButton>
                <OptionButton>Option Charlie-Delta-Echo</OptionButton>
                <OptionButton disabled>Option Foxtrot</OptionButton>
                <OptionButton>Option Golf</OptionButton>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <Library.Example title="details">
            <Library.Info>
              <Library.InfoItem label="description">
                Optional content to display at right side of button. Be sure to
                set a useful <code>title</code> (used for generating{' '}
                <code>aria-label</code>) when constructing such buttons.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>preact.ComponentChildren</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="OptionButton with details" withSource>
              <div className="w-[250px]">
                <OptionButton
                  details="PDF"
                  title="Select a PDF from Google Drive"
                >
                  Google Drive
                </OptionButton>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="selected">
            <Library.Info>
              <Library.InfoItem label="description">
                The option represented by the button is selected. A maximum of
                one <code>OptionButton</code> in a set should be selected at any
                time. This is an alias for the <code>Button</code>{' '}
                <code>pressed</code> prop.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="Selected OptionButton" withSource>
              <div className="w-[250px]">
                <OptionButton
                  details="PDF"
                  title="Select a PDF from Google Drive"
                  selected
                >
                  Google Drive
                </OptionButton>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="rounded">
            <Library.Info>
              <Library.InfoItem label="description">
                <Library.StatusChip status="deprecated" />
                Whether this button should render rounded corners.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="Rounded OptionButton" withSource>
              <div className="w-[250px]">
                <OptionButton
                  rounded
                  details="PDF"
                  title="Select a PDF from Google Drive"
                  selected
                >
                  Google Drive
                </OptionButton>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="...buttonProps">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>OptionButton</code> accepts and forwards all{' '}
                <Library.Link href="/input-button">
                  <code>Button</code>
                </Library.Link>{' '}
                component API props. Styling API props are not forwarded.
              </Library.InfoItem>

              <Library.InfoItem label="type">
                <code>{`Omit<ButtonProps, 'size' | 'unstyled' | 'classes' | 'variant'>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
