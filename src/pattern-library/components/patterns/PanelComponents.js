import { Panel } from '../../../';
import Library from '../Library';

export default function PanelComponents() {
  return (
    <Library.Page title="Panel">
      <Library.Pattern title="Panel">
        <Library.Example title="Basic usage">
          <Library.Demo withSource>
            <Panel title="Basic panel">
              <p>
                Here is a panel with no close button and very simple content.
              </p>
            </Panel>
          </Library.Demo>
        </Library.Example>
        <Library.Example title="With close button">
          <Library.Demo withSource>
            <Panel
              title="Basic panel with close button"
              onClose={() => alert('close clicked')}
            >
              <p>Here is a panel with very basic content and a close button.</p>
              <p>
                Providing an <code>onClose</code> function will cause a close
                button to render.
              </p>
            </Panel>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="With header icon">
          <Library.Demo withSource>
            <Panel
              icon="edit"
              title="Panel with optional heading icon"
              onClose={() => alert('close clicked')}
            >
              This panel has an optional icon in the header.
            </Panel>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Clean theme">
          <Library.Demo withSource>
            <div className="theme-clean" style="width:100%">
              <Panel
                icon="edit"
                title="Panel with clean-theme styling"
                onClose={() => alert('close clicked')}
              >
                This panel has an optional icon in the header.
              </Panel>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
