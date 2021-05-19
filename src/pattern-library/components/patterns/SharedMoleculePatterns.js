import {
  PatternExample,
  PatternExamples,
  PatternPage,
  Pattern,
} from '../PatternPage';

import { IconButton, LabeledButton } from '../../../';

export default function SharedMoleculePatterns() {
  return (
    <PatternPage title="Molecules">
      <Pattern title="Frame">
        <p>
          A <code>frame</code> has a border and a background, but no other
          layout affordances.
        </p>
        <PatternExamples>
          <PatternExample details="basic frame">
            <div className="hyp-frame">This is in a frame.</div>
          </PatternExample>
        </PatternExamples>
      </Pattern>

      <Pattern title="Card">
        <p>
          A <code>card</code> is a frame with internal margins and padding, and
          a hover effect.
        </p>
        <PatternExamples>
          <PatternExample details="basic card">
            <div className="hyp-card">This is in a card.</div>
          </PatternExample>
          <PatternExample details="a card with multiple child elements, showing default vertical rhythm">
            <div className="hyp-card">
              <div className="hyp-u-border">Child content in a card.</div>
              <div className="hyp-u-border">Child content in a card.</div>
              <div className="hyp-u-border">Child content in a card.</div>
            </div>
          </PatternExample>
          <PatternExample details="A card with some actions">
            <div className="hyp-card">
              <div>
                This is some text in a card that also contains some available
                actions.
              </div>
              <div className="hyp-actions">
                <IconButton title="User" icon="profile" />
                <IconButton title="Edit" icon="edit" />
                <IconButton title="Delete" icon="trash" />
              </div>
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>

      <Pattern title="Actions">
        <p>
          The <code>actions</code> pattern presents a collection of actions
          (typically buttons). By default, these are laid out in a row, aligned
          right, but can also be laid out in a column.
        </p>
        <PatternExamples>
          <PatternExample details="A set of LabeledButtons">
            <div className="hyp-actions">
              <LabeledButton icon="profile">User</LabeledButton>
              <LabeledButton icon="edit">Edit</LabeledButton>
              <LabeledButton icon="trash">Delete</LabeledButton>
            </div>
          </PatternExample>
          <PatternExample details="A set of IconButtons">
            <div className="hyp-actions">
              <IconButton title="User" icon="profile" />
              <IconButton title="Edit" icon="edit" />
              <IconButton title="Delete" icon="trash" />
            </div>
          </PatternExample>
          <PatternExample details="Columnar layout">
            <div className="hyp-actions--column">
              <LabeledButton>User</LabeledButton>
              <LabeledButton>Edit</LabeledButton>
              <LabeledButton>Delete</LabeledButton>
            </div>
          </PatternExample>
          <PatternExample details="Columnar layout: buttons stretching to fill space">
            <div style="width:300px">
              <div className="hyp-actions--column">
                <LabeledButton variant="primary">Do this</LabeledButton>
                <LabeledButton variant="primary">No, this!</LabeledButton>
                <LabeledButton variant="primary">Maybe this?</LabeledButton>
              </div>
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
