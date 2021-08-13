import { useState } from 'preact/hooks';

import { IconButton } from '../../../components/buttons';
import { LabeledCheckbox } from '../../../components/Checkbox';
import { TextInput, TextInputWithButton } from '../../../components/TextInput';

import Library from '../Library';

export default function FormComponents() {
  const [wantSandwich, setWantSandwich] = useState(true);
  const [wantWatermelon, setWantWatermelon] = useState(false);
  const [textInputHasError, setTextInputHasError] = useState(true);
  return (
    <Library.Page title="Forms">
      <Library.Pattern title="LabeledCheckbox">
        <Library.Example title="Unchecked (default)">
          <div style="font-size: 2em">
            {wantWatermelon && '🍉'}
            &nbsp;
          </div>
          <Library.Demo withSource>
            <LabeledCheckbox
              checked={wantWatermelon}
              name="test-alternative"
              onToggle={isChecked => setWantWatermelon(isChecked)}
            >
              I want a watermelon
            </LabeledCheckbox>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Checked">
          <div style="font-size: 2em">{wantSandwich && '🥪'}</div>
          <Library.Demo style={{ width: '300px' }} withSource>
            <LabeledCheckbox
              name="test"
              checked={wantSandwich}
              onToggle={isChecked => setWantSandwich(isChecked)}
            >
              I want a sandwich
            </LabeledCheckbox>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="TextInput">
        <p>
          The <code>TextInput</code> component is a basic wrapper around an
          <code>input type=&quot;text&quot;</code> field.
        </p>
        <Library.Example title="Basic usage">
          <Library.Demo withSource>
            <TextInput name="my-input" />
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Error state">
          <Library.Demo withSource>
            <TextInput name="my-input" hasError />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="TextInputWithButton">
        <p>
          This component wraps the <code>text-input-with-button</code> pattern:
          a text input on the left with an associated icon-only button on the
          right.
        </p>
        <p>
          Current usage favors the <code>dark</code> variant of{' '}
          <code>IconButton</code>.
        </p>
        <Library.Example title="Basic usage">
          <Library.Demo withSource>
            <TextInputWithButton>
              <TextInput name="my-input" />
              <IconButton icon="arrow-right" variant="dark" title="go" />
            </TextInputWithButton>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Error state">
          <Library.Demo withSource>
            <TextInputWithButton>
              <TextInput name="my-input" hasError={textInputHasError} />
              <IconButton
                icon="arrow-right"
                variant="dark"
                title="go"
                onClick={() => setTextInputHasError(!textInputHasError)}
              />
            </TextInputWithButton>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
