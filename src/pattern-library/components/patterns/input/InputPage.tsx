import { Input } from '../../../../';
import Library from '../../Library';

export default function InputPage() {
  return (
    <Library.Page
      title="Input"
      intro={
        <p>
          <code>Input</code> is a presentational component for styling textual{' '}
          <code>input</code> elements.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
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
        </Library.Pattern>

        <Library.Pattern title="Working with Inputs">
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
          <Library.Example title="Disabled inputs">
            <p>
              <code>Input</code>s can be disabled by applying the HTML{' '}
              <code>disabled</code> attribute.
            </p>
            <Library.Demo withSource>
              <div className="w-[350px]">
                <Input
                  aria-label="Example input"
                  placeholder="Placeholder..."
                  disabled
                />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <code>Input</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.Example title="feedback">
            <Library.Info>
              <Library.InfoItem label="description">
                Set <code>feedback</code> to indicate that there is an
                associated error or warning for the <code>Input</code>.
                <br />
                Notice that setting{' '}
                <code>
                  feedback={'"'}error{'"'}
                </code>{' '}
                will implicitly set{' '}
                <code>
                  aria-invalid={'"'}true{'"'}
                </code>
                .
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>
                  {`"error"`} | {`"warning"`}
                </code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`undefined`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource>
              <div className="w-[350px]">
                <Input
                  aria-label="Input with error"
                  feedback="error"
                  value="something invalid"
                />
              </div>
              <div className="w-[350px]">
                <Input
                  aria-label="Input with warning"
                  feedback="warning"
                  value="might be a problem"
                />
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="type">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Input</code> supports several input types
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'text' | 'url' | 'email' | 'search'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'text'`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Input</code> accepts HTML attributes for input elements.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLInputElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
