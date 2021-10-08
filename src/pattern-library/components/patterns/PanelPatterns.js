import { IconButton, LabeledButton } from '../../../';
import Library from '../Library';

export default function OrganismPatterns() {
  return (
    <Library.Page title="Panels">
      <p>
        The <code>panel</code> pattern is used by several components:{' '}
        <code>Panel</code>, <code>Dialog</code>, <code>Modal</code>, e.g.
      </p>
      <Library.Pattern title="Panel">
        <p>
          A panel is a card with a header and affordances for a close button.
          Use the <code>--closeable</code> modifier when using{' '}
          <code>panel</code> with an icon-only close button.
        </p>
        <Library.Example title="Panel with no header">
          <p>
            This is in a panel that has no header. A header is not required, but
            you are encouraged to use <code>card</code> in that case. Note that
            a <code>panel</code> will currently fill all available space. The
            containing element has been set to <code>max-width: 400px</code>{' '}
            here.
          </p>
          <Library.Demo withSource>
            <div style={{ maxWidth: '400px' }}>
              <div className="hyp-panel">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </div>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Panel with title but no close button">
          <p>
            This example shows a panel with header and content, but no close
            affordances.
          </p>
          <Library.Demo withSource>
            <div className="hyp-panel">
              <header className="hyp-panel__header">
                <h2 className="hyp-panel__title">
                  This is a panel title in a panel header
                </h2>
              </header>
              <div>
                This is panel content. There is a header but no close
                affordance.
              </div>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Closeable panel">
          <p>
            This example shows a panel pattern with a <code>IconButton</code>{' '}
            close button, using the <code>--closeable</code> modifier.
          </p>
          <Library.Demo withSource>
            <div className="hyp-panel hyp-panel--closeable">
              <header className="hyp-panel__header">
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
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Panel with actions">
          <p>
            It is common to render some <code>actions</code> within a panel.
          </p>
          <Library.Demo withSource>
            <div className="hyp-panel hyp-panel--closeable">
              <header className="hyp-panel__header">
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
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
