<<<<<<< HEAD
import { useState } from 'preact/hooks';

import { LabeledCheckbox } from '../../../';
=======
import { Checkbox } from '../../../';
>>>>>>> 5aca4b7 (Add `Checkbox` basic patterns to pattern library)

import {
  PatternPage,
  Pattern,
  PatternExamples,
  PatternExample,
} from '../PatternPage';

<<<<<<< HEAD
export default function SharedFormPatterns() {
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
          <PatternExample details="A custom label positioned after the checkbox">
            <LabeledCheckbox
              checked={wantWatermelon}
              name="test-alternative"
              position="after"
              onToggle={setWantWatermelon}
            >
              <code>I want a watermelon</code>
            </LabeledCheckbox>
=======
function gimmeSandwich(isChecked) {
  const visibility = isChecked ? 'visible' : 'hidden';
  const elem = /** @type HTMLElement */ (document.querySelector(
    '#showme-sandwich'
  ));
  if (elem) {
    elem.style.visibility = visibility;
  }
}

export default function SharedFormPatterns() {
  return (
    <PatternPage title="Forms">
      <Pattern title="Checkbox">
        <span
          id="showme-sandwich"
          role="img"
          aria-label="seriously, just an emoji of sandwich"
          style="font-size: 2em; visibility:hidden"
        >
          🥪
        </span>
        <PatternExamples>
          <PatternExample details="A simple checkbox (Check me!)">
            <Checkbox
              label="I want a sandwich"
              id="sandwich"
              name="test"
              onChanged={isChecked => gimmeSandwich(isChecked)}
            />
          </PatternExample>
          <PatternExample details="A checkbox, defaulting to checked">
            <Checkbox
              label="I want a sandwich"
              name="test"
              defaultChecked={true}
            />
>>>>>>> 5aca4b7 (Add `Checkbox` basic patterns to pattern library)
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
