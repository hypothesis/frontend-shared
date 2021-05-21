import {
  PatternExample,
  PatternExamples,
  PatternPage,
  Pattern,
} from '../PatternPage';

import { IconButton, LabeledButton } from '../../../';

export default function OrganismPatterns() {
  return (
    <PatternPage title="Organisms">
      <Pattern title="Panel">
        <p>
          A panel is a card with a header and affordances for a close button.
          Use the <code>--closeable</code> modifier when using{' '}
          <code>panel</code> with an icon-only close button.
        </p>
        <PatternExamples>
          <PatternExample
            details="Panel with no header"
            style={{ maxWidth: '400px' }}
          >
            <div className="hyp-panel">
              This is in a panel that has no header. A header is not required,
              but you are encouraged to use <code>card</code> in that case. Note
              that a <code>panel</code> will currently fill all available space.
              The containing element has been set to{' '}
              <code>max-width: 400px</code> here.
            </div>
          </PatternExample>
          <PatternExample details="Panel with title but no close button">
            <div className="hyp-panel">
              <header>
                <h2 className="hyp-panel__title">
                  This is a panel title in a panel header
                </h2>
              </header>
              <div>
                This is panel content. There is a header but no close
                affordance.
              </div>
            </div>
          </PatternExample>

          <PatternExample details="Closeable panel (using IconButton): preferred">
            <div className="hyp-panel hyp-panel--closeable">
              <header>
                <h2 className="hyp-panel__title">
                  Panel title on a closeable panel
                </h2>
                <div className="hyp-panel__close">
                  <IconButton icon="cancel" title="Close" />
                </div>
              </header>
              <div>
                This is panel content in a panel, using <code>--closeable</code>
                .
              </div>
            </div>
          </PatternExample>

          <PatternExample details="Panel with actions">
            <div className="hyp-panel hyp-panel--closeable">
              <header>
                <h2 className="hyp-panel__title">Panel title</h2>
                <div className="hyp-panel__close">
                  <IconButton icon="cancel" title="Close" />
                </div>
              </header>
              <div>
                This is panel content in a panel that also has some available
                actions.
              </div>
              <div className="hyp-actions">
                <LabeledButton title="Cancel">Cancel</LabeledButton>
                <LabeledButton title="Try again" variant="primary">
                  Try again
                </LabeledButton>
              </div>
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
