import { useState } from 'preact/hooks';

import { LabeledCheckbox } from '../../../';

import {
  PatternPage,
  Pattern,
  PatternExamples,
  PatternExample,
} from '../PatternPage';

export default function SharedFormPatterns() {
  const [show, setShow] = useState(true);
  return (
    <PatternPage title="Forms">
      <Pattern title="Checkbox">
        <span
          role="img"
          aria-label="seriously, just an emoji of sandwich"
          style={{
            fontSize: '2em',
            visibility: show ? 'visible' : 'hidden',
          }}
        >
          🥪
        </span>
        <PatternExamples>
          <PatternExample details="A checkbox, defaulting to checked">
            <LabeledCheckbox
              label="I want a sandwich"
              name="test"
              checked={show}
              onToggle={isChecked => setShow(isChecked)}
            />
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
