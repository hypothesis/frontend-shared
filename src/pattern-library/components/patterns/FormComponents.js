import { useState } from 'preact/hooks';

import {
  IconButton,
  LabeledCheckbox,
  TextInput,
  TextInputWithButton,
} from '../../..';
import Library from '../Library';
import Next from '../LibraryNext';

export default function FormComponents() {
  const [wantSandwich, setWantSandwich] = useState(true);
  const [wantWatermelon, setWantWatermelon] = useState(false);
  const [textInputHasError, setTextInputHasError] = useState(true);
  return (
    <Library.Page title="Forms">
      <Library.Pattern title="Status">
        <Next.Changelog>
          <Next.ChangelogItem status="deprecated">
            <s>
              <code>TextInput</code>
            </s>{' '}
            is deprecated and slated for removal in v6 of{' '}
            <code>frontend-shared</code>. Use
            <code>Input</code> component in the input group instead.
          </Next.ChangelogItem>
          <Next.ChangelogItem status="deprecated">
            <s>
              <code>TextInputWithButton</code>
            </s>{' '}
            is deprecated and slated for removal in v6 of{' '}
            <code>frontend-shared</code>. Use
            <code>InputGroup</code> component in the input group instead.
          </Next.ChangelogItem>
        </Next.Changelog>
      </Library.Pattern>

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

        <Library.Example title="As type='url'">
          <p>
            <code>TextInput</code> renders an <code>input</code> field of{' '}
            <code>type=&quot;text&quot;</code> by default, but text-like `type`
            values are also supported (<code>email</code>, <code>search</code>,{' '}
            <code>url</code>).
          </p>
          <Library.Demo withSource>
            <TextInput name="my-input" type="url" />
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
