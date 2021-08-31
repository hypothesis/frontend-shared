import { IconButton, SvgIcon } from '../../../';
import Library from '../Library';

export default function FormPatterns() {
  return (
    <Library.Page title="Forms">
      <Library.Pattern title="Checkbox">
        <p>
          A checkbox, styled accessibly with an SVG image. The SVG image is an
          adjacent sibling to the checkbox <code>input</code>.
        </p>
        <Library.Example title="Checkbox">
          <p>
            This example shows an <code>input type=&quot;checkbox&quot;</code>{' '}
            element with the <code>checkbox</code> pattern applied, both
            unchecked and checked.
          </p>
          <Library.Demo withSource>
            <div className="hyp-u-layout-row hyp-u-horizontal-spacing">
              <div>
                <input className="hyp-checkbox" type="checkbox" />
                <SvgIcon name="checkbox" />
              </div>

              <div>
                <input className="hyp-checkbox" type="checkbox" checked />
                <SvgIcon name="checkbox" />
              </div>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Checkbox with label">
          <Library.Demo withSource>
            <label className="hyp-label">
              <input className="hyp-checkbox" type="checkbox" />
              <SvgIcon name="checkbox" />
              <span>Click me, please</span>
            </label>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Text inputs">
        <p>
          A pattern for <code>input type=&quot;text&quot;</code>
        </p>
        <Library.Example title="Basic text input">
          <Library.Demo withSource>
            <input
              className="hyp-text-input"
              type="text"
              placeholder="http://www.example.com"
            />
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Text input in an error state">
          <Library.Demo withSource>
            <input
              className="hyp-text-input has-error"
              type="text"
              placeholder="http://www.example.com"
            />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Text input with button">
        <p>
          A pattern that pairs a text input field with an icon-only button. Use
          a dark-variant button to match the standard pattern here.
        </p>
        <Library.Example title="Text input with a dark-variant IconButton">
          <Library.Demo withSource>
            <div style={{ width: '300px' }}>
              <div className="hyp-text-input-with-button">
                <input type="text" placeholder="http://www.example.com" />
                <IconButton icon="arrow-right" title="go" variant="dark" />
              </div>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Text input and button in an error state">
          <Library.Demo withSource>
            <div style={{ width: '300px' }}>
              <div className="hyp-text-input-with-button">
                <input
                  type="text"
                  placeholder="http://www.example.com"
                  className="has-error"
                />
                <IconButton icon="arrow-right" title="go" variant="dark" />
              </div>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
