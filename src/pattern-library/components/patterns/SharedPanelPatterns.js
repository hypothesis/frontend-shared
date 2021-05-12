import { Panel } from '../../../';

import {
  PatternPage,
  Pattern,
  PatternExamples,
  PatternExample,
} from '../PatternPage';

export default function SharedPanelPatterns() {
  return (
    <PatternPage title="Panel">
      <Pattern title="Panel">
        <PatternExamples>
          <PatternExample details="Basic Panel usage">
            <Panel title="Basic panel">
              Here is a panel with no close button and very simple content.
            </Panel>
          </PatternExample>
          <PatternExample details="Basic Panel with close button">
            <Panel
              title="Basic panel with close button"
              onClose={() => alert('close clicked')}
            >
              Here is a panel with very basic content and a close button.
              Providing an <code>onClose</code> function will cause a close
              button to render.
            </Panel>
          </PatternExample>
          <PatternExample details="A panel can also have an icon in the header">
            <Panel
              icon="edit"
              title="Panel with optional heading icon"
              onClose={() => alert('close clicked')}
            >
              This panel has an optional icon in the header.
            </Panel>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
