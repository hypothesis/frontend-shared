import { SvgIcon } from '../../../';
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
            <div className="flex space-x-3">
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
    </Library.Page>
  );
}
