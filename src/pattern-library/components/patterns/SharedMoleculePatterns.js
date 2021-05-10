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
            <div className="frame">This is in a frame.</div>
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
            <div className="card">This is in a card.</div>
          </PatternExample>
          <PatternExample details="a card with multiple child elements, showing default vertical rhythm">
            <div className="card">
              <div className="u-border">Child content in a card.</div>
              <div className="u-border">Child content in a card.</div>
              <div className="u-border">Child content in a card.</div>
            </div>
          </PatternExample>
          <PatternExample details="A card with some actions">
            <div className="card">
              <div>
                This is some text in a card that also contains some available
                actions.
              </div>
              <div className="actions">
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
          (typically buttons) spaced out in a row, aligned right.
        </p>
        <PatternExamples>
          <PatternExample details="A set of LabeledButtons">
            <div className="actions">
              <LabeledButton icon="profile">User</LabeledButton>
              <LabeledButton icon="edit">Edit</LabeledButton>
              <LabeledButton icon="trash">Delete</LabeledButton>
            </div>
          </PatternExample>
          <PatternExample details="A set of IconButtons">
            <div className="actions">
              <IconButton title="User" icon="profile" />
              <IconButton title="Edit" icon="edit" />
              <IconButton title="Delete" icon="trash" />
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
