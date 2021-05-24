import { useState } from 'preact/hooks';

import { LabeledCheckbox } from '../../../';

import {
  PatternPage,
  Pattern,
  PatternExamples,
  PatternExample,
} from '../PatternPage';

export default function FormPatterns() {
  const [wantSandwich, setWantSandwich] = useState(true);
  const [wantWatermelon, setWantWatermelon] = useState(false);
  return (
    <PatternPage title="Forms">
      <Pattern title="Checkbox">
        <div style="font-size: 2em">
          {wantSandwich && '🥪'}
          {wantWatermelon && '🍉'}
          &nbsp;
        </div>
        <PatternExamples>
          <PatternExample details="A checkbox, defaulting to checked">
            <LabeledCheckbox
              name="test"
              checked={wantSandwich}
              onToggle={isChecked => setWantSandwich(isChecked)}
            >
              I want a sandwich
            </LabeledCheckbox>
          </PatternExample>
          <PatternExample details="A custom label positioned before the checkbox">
            <LabeledCheckbox
              checked={wantWatermelon}
              name="test-alternative"
              position="before"
              onToggle={setWantWatermelon}
            >
              <code>I want a watermelon</code>
            </LabeledCheckbox>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
