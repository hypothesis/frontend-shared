import { Checkbox } from '../../../';

import {
  PatternPage,
  Pattern,
  PatternExamples,
  PatternExample,
} from '../PatternPage';

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
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
