import { Actions, Card, Frame, Scrollbox, LabeledButton } from '../../..';
import Library from '../Library';

import { SampleListElements } from './samples';

export default function ContainerComponents() {
  return (
    <Library.Page title="Containers">
      <Library.Pattern title="Frame">
        <Library.Example title="Laying out content in a Frame">
          <p>
            The <code>Frame</code> component renders content inside of a{' '}
            <code>frame</code> design pattern.
          </p>
          <Library.Demo withSource>
            <Frame>
              <div>This content is inside of a frame.</div>
              <div>This content is inside of a frame.</div>
            </Frame>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Card">
        <p>
          The <code>Card</code> component pattern provides a card-like layout
          using the <code>card</code> pattern.
        </p>
        <Library.Example title="Laying out content in a Card">
          <Library.Demo withSource>
            <Card>
              <div>This content is inside of a card.</div>
              <div>This content is inside of a card.</div>
            </Card>
          </Library.Demo>
        </Library.Example>
        <Library.Example title="Overriding styles">
          <p>
            This example shows overriding the background color of a{' '}
            <code>Card</code> using a utility class.
          </p>
          <Library.Demo withSource>
            <Card classes="hyp-u-bg-color--grey-3">
              <div>This content is inside of a card.</div>
              <div>This content is inside of a card.</div>
            </Card>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Actions">
        <p>
          The <code>Actions</code> component pattern lays out actions (buttons).
        </p>

        <Library.Example title="Laying out buttons with Actions">
          <Library.Demo withSource>
            <Actions>
              <LabeledButton>Cancel</LabeledButton>
              <LabeledButton>Maybe</LabeledButton>
              <LabeledButton variant="primary">OK</LabeledButton>
            </Actions>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Laying out buttons vertically with Actions">
          <Library.Demo withSource>
            <Actions direction="column">
              <LabeledButton>This is one option</LabeledButton>
              <LabeledButton>This is another option</LabeledButton>
              <LabeledButton variant="primary">
                This is the best option
              </LabeledButton>
            </Actions>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Scrollbox">
        <p>
          The <code>Scrollbox</code> component is a container for (potentially-)
          overflowing content. It provides a scroll context and is styled with
          the <code>scrollbox</code> pattern.
        </p>
        <Library.Example variant="wide">
          <p>
            A <code>Scrollbox</code> will fill its available space. Constraints
            to that space need to be applied to a parent element. Here a parent
            element is set to a width and height.
          </p>
          <Library.Demo title="Basic scrollbox" withSource>
            <div style="height:250px;max-height:250px;width:200px">
              <Scrollbox>
                <ul className="hyp-u-padding hyp-u-vertical-spacing">
                  <SampleListElements />
                </ul>
              </Scrollbox>
            </div>
          </Library.Demo>
          <Library.Demo title="Scrollbox with header" withSource>
            <div style="height:250px;max-height:250px;width:200px">
              <Scrollbox withHeader>
                <div className="hyp-sticky-header">
                  <div className="hyp-sticky-header__heading">
                    NATO Alphabet
                  </div>
                </div>
                <ul className="hyp-u-padding hyp-u-vertical-spacing">
                  <SampleListElements />
                </ul>
              </Scrollbox>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
