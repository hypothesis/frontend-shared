import { useState } from 'preact/hooks';

import { LabeledButton } from '../../../';

import {
  PatternPage,
  Pattern,
  PatternExamples,
  PatternExample,
} from '../PatternPage';

export default function LayoutPatterns() {
  const [showExample1, setShowExample1] = useState(false);
  const [showExample2, setShowExample2] = useState(false);
  const [showExample3, setShowExample3] = useState(false);
  return (
    <PatternPage title="Layout">
      <Pattern title="Fixed-Centered Positioning">
        <p>
          The <code>fixed-centered</code> layout pattern centers an element both
          horizontally and vertically within the entire viewport.
        </p>
        <PatternExamples>
          <PatternExample details="Centering an element vertically and horizontally within the viewport">
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
                <div className="hyp-card">
                  <p>
                    This is a card that is centered vertically and horizontally
                    in the current viewport.
                  </p>
                  <div className="hyp-actions">
                    <LabeledButton
                      variant="primary"
                      onClick={() => setShowExample1(false)}
                    >
                      Hide example
                    </LabeledButton>
                  </div>
                </div>
              </div>
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
      <Pattern title="Full-screen overlay">
        <p>
          The <code>overlay</code> layout pattern provides a full-viewport,
          semi-opaque overlay that obscures UI interactions in the viewport
          below. It is intended for use as a backdrop for modals, e.g.
        </p>
        <PatternExamples>
          <PatternExample details="Semi-opaque full-screen overlay">
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
          </PatternExample>
        </PatternExamples>
      </Pattern>

      <Pattern title="Example: Full-screen overlay with fixed-centered content">
        <p>
          This shows an example of combining the <code>overlay</code> and{' '}
          <code>fixed-centered</code> patterns.
        </p>
        <PatternExamples>
          <PatternExample details="Overlay and fixed-centered patterns used together">
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
                  <div className="hyp-card" style="width:450px">
                    <div>
                      This is content in a fixed-centered card of 450px width
                      over a full-screen overlay.
                    </div>
                    <div className="hyp-actions">
                      <LabeledButton
                        variant="primary"
                        onClick={() => setShowExample3(false)}
                      >
                        Hide example
                      </LabeledButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
