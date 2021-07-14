import { useState } from 'preact/hooks';

import { IconButton } from '../../../components/buttons';
import { LabeledCheckbox } from '../../../components/Checkbox';
import { TextInput, TextInputWithButton } from '../../../components/TextInput';

import {
  PatternPage,
  Pattern,
  PatternExamples,
  PatternExample,
} from '../PatternPage';

export default function FormComponents() {
  const [wantSandwich, setWantSandwich] = useState(true);
  const [wantWatermelon, setWantWatermelon] = useState(false);
  const [textInputHasError, setTextInputHasError] = useState(true);
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

      <Pattern title="TextInput">
        <p>
          <code>TextInput</code> is a basic wrapper around an{' '}
          <code>input type=&quot;text&quot;</code> field.
        </p>
        <PatternExamples>
          <PatternExample details="basic text input field">
            <TextInput name="my-input" />
          </PatternExample>

          <PatternExample details="text input field in an error state">
            <TextInput name="my-input" hasError />
          </PatternExample>
        </PatternExamples>
      </Pattern>

      <Pattern title="TextInputWithButton">
        <p>
          This component wraps the <code>text-input-with-button</code> pattern:
          a text input on the left with an associated icon-only button on the
          right.
        </p>
        <p>
          Current usage favors the <code>dark</code> variant of{' '}
          <code>IconButton</code>.
        </p>
        <PatternExamples>
          <PatternExample details="basic text input field">
            <TextInputWithButton>
              <TextInput name="my-input" />
              <IconButton icon="arrow-right" variant="dark" title="go" />
            </TextInputWithButton>
          </PatternExample>

          <PatternExample details="text input field in an error state; click button to toggle error state">
            <TextInputWithButton>
              <TextInput name="my-input" hasError={textInputHasError} />
              <IconButton
                icon="arrow-right"
                variant="dark"
                title="go"
                onClick={() => setTextInputHasError(!textInputHasError)}
              />
            </TextInputWithButton>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
