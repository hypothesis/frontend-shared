import { Input } from '../../../../next';
import Library from '../../Library';

export default function InputPage() {
  return (
    <Library.Page
      title="Input"
      intro={
        <p>
          <code>Input</code> styles text inputs.
        </p>
      }
    >
      <Library.Section
        title="Input"
        intro={
          <p>
            <code>Input</code> is a presentational component for styling textual{' '}
            <code>input</code> elements.
          </p>
        }
      >
        <Library.Pattern title="Usage">
          <Library.Usage componentName="Input" />

          <Library.Example>
            <Library.Demo title="Basic Input" withSource>
              <div className="w-[350px]">
                <Input
                  aria-label="Input example"
                  placeholder="Placeholder..."
                />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Accessibility">
            <p>
              Hypothesis does not currently have a design pattern for labeling
              text inputs. However, for accessibility, it is critical that an{' '}
              <code>Input</code> have either an associated <code>label</code>{' '}
              element or an <code>aria-label</code> attribute.
            </p>

            <Library.Demo title="Input with label" withSource>
              <div className="w-[350px]">
                <label htmlFor="input-with-label" className="font-semibold">
                  Label
                </label>
                <Input id="input-with-label" placeholder="Placeholder..." />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="type">
            <p>
              <code>Input</code> currently supports the following{' '}
              <code>type</code> values:
            </p>
            <ul>
              <li>
                <code>text</code> (default)
              </li>
              <li>
                <code>url</code>
              </li>
              <li>
                <code>email</code>
              </li>
              <li>
                <code>text</code>
              </li>
            </ul>
          </Library.Example>

          <Library.Example title="hasError">
            <p>
              Set <code>hasError</code> to indicate that there is an associated
              error for the <code>Input</code>.
            </p>
            <Library.Demo withSource>
              <div className="w-[350px]">
                <Input
                  aria-label="Example input"
                  hasError
                  value="something invalid"
                />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="disabled">
            <Library.Demo withSource>
              <div className="w-[350px]">
                <Input
                  aria-label="Example input"
                  placeholder="Disabled..."
                  disabled
                />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
