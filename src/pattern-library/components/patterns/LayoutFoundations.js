import { useState } from 'preact/hooks';

import { Actions, Card, LabeledButton } from '../../../';
import Library from '../Library';

export default function LayoutFoundations() {
  const [showExample1, setShowExample1] = useState(false);
  const [showExample2, setShowExample2] = useState(false);
  const [showExample3, setShowExample3] = useState(false);

  return (
    <Library.Page title="Layout">
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
