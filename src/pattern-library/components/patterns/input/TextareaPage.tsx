import { Textarea } from '../../../../';
import Library from '../../Library';

export default function TextareaPage() {
  return (
    <Library.Page
      title="Textarea"
      intro={
        <p>
          <code>Textarea</code> is a presentational component for styling{' '}
          <code>textarea</code> elements.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="Textarea" />

          <Library.Example>
            <Library.Demo title="Basic Textarea" withSource>
              <div className="w-[350px]">
                <Textarea
                  aria-label="Textarea example"
                  placeholder="Placeholder..."
                />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Working with Textareas">
          <Library.Example title="Labels">
            <p>
              Hypothesis does not currently have a design pattern for labeling
              textareas. However, for accessibility, it is critical that a{' '}
              <code>Textarea</code> have either an associated <code>label</code>{' '}
              element or an <code>aria-label</code> attribute.
            </p>

            <Library.Demo title="Textarea with label" withSource>
              <div className="w-[350px]">
                <label htmlFor="textarea-with-label" className="font-semibold">
                  Label
                </label>
                <Textarea
                  id="textarea-with-label"
                  placeholder="Placeholder..."
                />
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="Disabled Textareas">
            <p>
              <code>Textarea</code>s can be disabled by applying the HTML{' '}
              <code>disabled</code> attribute.
            </p>
            <Library.Demo withSource>
              <div className="w-[350px]">
                <Textarea
                  aria-label="Example textarea"
                  placeholder="Placeholder..."
                  disabled
                />
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="Validation errors">
            <p>
              Validation errors can be triggered as a result of standard HTML
              attributes such as <code>required</code> or a custom error set
              using the <code>error</code> prop. Errors set using{' '}
              <code>error</code> are synced to the browser via{' '}
              <code>HTMLTextAreaElement.setCustomValidity</code>. This allows
              the browser to alert the user when they try to submit the
              containing form.
            </p>
            <p>
              If the text area has custom validation checks, they should be
              performed in the element&apos;s <code>onChange</code> handler.
            </p>
            <p>
              If the form is using custom UI to present validation errors,
              inputs must link to the element displaying their validation error
              using <code>aria-describedby</code>.
            </p>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <code>Textarea</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.Example title="error">
            <Library.Info>
              <Library.InfoItem label="description">
                Set <code>error</code> to indicate a validation error. This
                implicitly sets{' '}
                <code>
                  feedback={'"'}error{'"'}
                </code>
                . In addition to visually and semantically indicating the error
                state, this will set a custom validation error on the textarea
                using <code>HTMLTextAreaElement.setCustomValidity</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="feedback">
            <Library.Info>
              <Library.InfoItem label="description">
                Set <code>feedback</code> to indicate that there is an
                associated error or warning for the <code>Textarea</code>.
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
                <Textarea
                  aria-label="Textarea with error"
                  feedback="error"
                  value="something invalid"
                />
              </div>
              <div className="w-[350px]">
                <Textarea
                  aria-label="Textarea with warning"
                  feedback="warning"
                  value="might be a problem"
                />
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Textarea</code> accepts HTML attributes for textarea
                elements.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLTextareaElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
