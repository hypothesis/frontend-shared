import classnames from 'classnames';
import { useState } from 'preact/hooks';

import { Actions, Card, LabeledButton } from '../../../';
import Library from '../Library';

function SquareBlock() {
  return (
    <div
      className="hyp-u-bg-color--grey-4"
      style={{ width: '2rem', height: '2rem' }}
    />
  );
}

/**
 * Render an example of vertical or horizontal spacing between elements.
 *
 * @param {object} options
 *   @param {'horizontal'|'vertical'} options.direction
 *   @param {number} options.size - Spacing unit size, 0 - 9
 *   @param {boolean} [options.defaultSize] - Is this the "default" spacing for
 *     this orientation?
 */
function SpacingDemo({ direction, size, defaultSize = false }) {
  const layoutClass =
    direction === 'vertical' ? 'hyp-u-layout-column' : 'hyp-u-layout-row';
  const baseClass =
    direction === 'vertical'
      ? 'hyp-u-vertical-spacing'
      : 'hyp-u-horizontal-spacing';
  const sizeClass = `${baseClass}--${size}`;
  return (
    <div className={classnames(layoutClass, baseClass)}>
      {defaultSize ? (
        <div>
          <strong>{size}*</strong>
        </div>
      ) : (
        <div>{size}</div>
      )}
      <div className={classnames(layoutClass, sizeClass, 'hyp-u-border')}>
        <SquareBlock />
        <SquareBlock />
        <SquareBlock />
        <SquareBlock />
        <SquareBlock />
      </div>
      {direction === 'horizontal' && (
        <div>
          <code>.{sizeClass}</code>
        </div>
      )}
    </div>
  );
}

export default function LayoutFoundations() {
  const [showExample1, setShowExample1] = useState(false);
  const [showExample2, setShowExample2] = useState(false);
  const [showExample3, setShowExample3] = useState(false);
  const scaleUnits = [
    '0',
    '0.125rem',
    '0.25rem',
    '0.5rem',
    '0.75rem',
    '1rem (default unit)',
    '1.5rem',
    '2rem',
    '4rem',
    '8rem',
  ];
  return (
    <Library.Page title="Layout">
      <Library.Pattern title="Spacing Units">
        <p>
          Spacing units provide a way to apply predefined, consistent spacing
          dimensions between (margins) and around (padding) elements. Our
          spacing is based on a <code>1rem</code> foundational unit.
        </p>
        <div className="hyp-u-vertical-spacing">
          {scaleUnits.map((unitLength, idx) => (
            <div
              key={idx}
              className={`hyp-u-layout-row hyp-u-bg-color--grey-5 hyp-u-horizontal-spacing--${idx}`}
            >
              <div
                className="hyp-u-bg-color--white"
                style={{ paddingRight: '1rem' }}
              >
                <strong>{idx}</strong>
              </div>
              <div
                className="hyp-u-bg-color--white hyp-u-stretch"
                style={{ paddingLeft: '1rem' }}
              >
                <code>{unitLength}</code>
              </div>
            </div>
          ))}
        </div>
      </Library.Pattern>

      <Library.Pattern title="Horizontal spacing">
        <p>
          Sometimes you may need to apply or adjust horizontal spacing between
          an element&apos;s immediate children.
        </p>

        <p>
          The default spacing unit used by{' '}
          <code>.hyp-u-horizontal-spacing</code> and mixins is 3, marked with an
          asterisk below.
        </p>

        <div className="hyp-u-vertical-spacing">
          <div className="hyp-u-layout-column hyp-u-vertical-spacing">
            <SpacingDemo direction="horizontal" size={0} />
            <SpacingDemo direction="horizontal" size={1} />
            <SpacingDemo direction="horizontal" size={2} />
            <SpacingDemo direction="horizontal" size={3} defaultSize />
            <SpacingDemo direction="horizontal" size={4} />
            <SpacingDemo direction="horizontal" size={5} />
            <SpacingDemo direction="horizontal" size={6} />
            <SpacingDemo direction="horizontal" size={7} />
            <SpacingDemo direction="horizontal" size={8} />
            <SpacingDemo direction="horizontal" size={9} />
          </div>
        </div>
      </Library.Pattern>

      <Library.Pattern title="Vertical spacing">
        <p>
          Sometimes you may need to apply or adjust vertical spacing between an
          element&apos;s immediate children.
        </p>

        <p>
          The default spacing unit used by <code>.hyp-u-vertical-spacing</code>{' '}
          and mixins is 5, marked with an asterisk below.
        </p>
        <div className="hyp-u-layout-row hyp-u-horizontal-spacing--7">
          <SpacingDemo direction="vertical" size={0} />
          <SpacingDemo direction="vertical" size={1} />
          <SpacingDemo direction="vertical" size={2} />
          <SpacingDemo direction="vertical" size={3} />
          <SpacingDemo direction="vertical" size={4} />
          <SpacingDemo direction="vertical" size={5} defaultSize />
          <SpacingDemo direction="vertical" size={6} />
          <SpacingDemo direction="vertical" size={7} />
          <SpacingDemo direction="vertical" size={8} />
          <SpacingDemo direction="vertical" size={9} />
        </div>
      </Library.Pattern>

      <Library.Pattern title="Positioning and Overlay">
        <Library.Example title="Centering in the viewport">
          <p>
            The <code>fixed-centered</code> layout pattern centers an element
            both horizontally and vertically within the entire viewport.
          </p>
          <Library.Demo>
            <div>
              <LabeledButton
                variant="primary"
                onClick={() => setShowExample1(true)}
              >
                Show example
              </LabeledButton>
              <div
                className="hyp-u-fixed-centered"
                style={`width:450px;${
                  showExample1 ? 'visibility:visible' : 'visibility:hidden'
                }`}
              >
                <Card classes="w-[450px]">
                  <p>
                    This is a card that is centered vertically and horizontally
                    in the current viewport.
                  </p>
                  <Actions>
                    <LabeledButton
                      variant="primary"
                      onClick={() => setShowExample1(false)}
                    >
                      Hide example
                    </LabeledButton>
                  </Actions>
                </Card>
              </div>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Full-screen overlay">
          <p>
            The <code>overlay</code> layout pattern provides a full-viewport,
            semi-opaque overlay that obscures UI interactions in the viewport
            below. It is intended for use as a backdrop for modals, e.g.
          </p>
          <Library.Demo>
            <div>
              <LabeledButton
                variant="primary"
                onClick={() => setShowExample2(true)}
              >
                Show example
              </LabeledButton>
              <div
                className="hyp-u-overlay"
                style={
                  showExample2 ? 'visibility:visible' : 'visibility:hidden'
                }
              >
                <div className="hyp-u-fixed-centered">
                  <LabeledButton onClick={() => setShowExample2(false)}>
                    Hide example
                  </LabeledButton>
                </div>
              </div>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Full-screen overlay with fixed-centered content">
          <p>
            This shows an example of combining the <code>overlay</code> and{' '}
            <code>fixed-centered</code> patterns.
          </p>
          <Library.Demo>
            <div>
              <LabeledButton
                variant="primary"
                onClick={() => setShowExample3(true)}
              >
                Show example
              </LabeledButton>
              <div
                className="hyp-u-overlay"
                style={
                  showExample3 ? 'visibility:visible' : 'visibility:hidden'
                }
              >
                <div className="hyp-u-fixed-centered">
                  <Card classes="w-[450px]">
                    <div>
                      This is content in a fixed-centered card of 450px width
                      over a full-screen overlay.
                    </div>
                    <Actions>
                      <LabeledButton
                        variant="primary"
                        onClick={() => setShowExample3(false)}
                      >
                        Hide example
                      </LabeledButton>
                    </Actions>
                  </Card>
                </div>
              </div>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
