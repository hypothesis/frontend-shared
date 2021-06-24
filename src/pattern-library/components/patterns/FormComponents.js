import { useState } from 'preact/hooks';

import { LabeledCheckbox } from '../../../';

import {
  PatternPage,
  Pattern,
  PatternExamples,
  PatternExample,
} from '../PatternPage';

export default function FormComponents() {
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
          <PatternExample
            details="A checkbox, defaulting to checked"
            style={{ width: '300px' }}
          >
            <LabeledCheckbox
              name="test"
              checked={wantSandwich}
              onToggle={isChecked => setWantSandwich(isChecked)}
            >
              I want a sandwich
            </LabeledCheckbox>
          </PatternExample>
          <PatternExample details="A checkbox, unchecked">
            <LabeledCheckbox
              checked={wantWatermelon}
              name="test-alternative"
              onToggle={isChecked => setWantWatermelon(isChecked)}
            >
              I want a watermelon
            </LabeledCheckbox>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
