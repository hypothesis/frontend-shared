import { Frame, Card, Actions } from '../../../components/containers';
import { LabeledButton } from '../../../components/buttons';

import {
  PatternPage,
  Pattern,
  PatternExamples,
  PatternExample,
} from '../PatternPage';

export default function ContainerComponents() {
  return (
    <PatternPage title="Containers">
      <Pattern title="Frame">
        <p>
          The <code>Frame</code> component pattern provides a framed layout with
          padding and vertical spacing of children.
        </p>
        <PatternExamples>
          <PatternExample details="Laying out content in a Frame">
            <Frame>
              <div>This content is inside of a frame.</div>
              <div>This content is inside of a frame.</div>
            </Frame>
          </PatternExample>
        </PatternExamples>
      </Pattern>

      <Pattern title="Card">
        <p>
          The <code>Card</code> component pattern provides a card-like layout
          that builds on <code>Frame</code>.
        </p>
        <PatternExamples>
          <PatternExample details="Laying out content in a Card">
            <Card>
              <div>This content is inside of a card.</div>
              <div>This content is inside of a card.</div>
            </Card>
          </PatternExample>

          <PatternExample details="Example of overriding background color">
            <Card classes="hyp-u-bg-color--grey-3">
              <div>This content is inside of a card.</div>
              <div>This content is inside of a card.</div>
            </Card>
          </PatternExample>
        </PatternExamples>
      </Pattern>

      <Pattern title="Actions">
        <p>
          The <code>Actions</code> component pattern lays out actions (buttons).
        </p>
        <PatternExamples>
          <PatternExample details="Laying out buttons with Actions">
            <Actions>
              <LabeledButton>Cancel</LabeledButton>
              <LabeledButton>Maybe</LabeledButton>
              <LabeledButton variant="primary">OK</LabeledButton>
            </Actions>
          </PatternExample>
          <PatternExample details="Laying out buttons vertically with Actions">
            <Actions direction="column">
              <LabeledButton>This is one option</LabeledButton>
              <LabeledButton>This is another option</LabeledButton>
              <LabeledButton variant="primary">
                This is the best option
              </LabeledButton>
            </Actions>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
