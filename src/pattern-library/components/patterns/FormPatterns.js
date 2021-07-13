import {
  PatternExample,
  PatternExamples,
  PatternPage,
  Pattern,
} from '../PatternPage';

import { IconButton } from '../../../components/buttons';

export default function FormPatterns() {
  return (
    <PatternPage title="Forms">
      <Pattern title="Text inputs">
        <p>
          A pattern for <code>input type=&quot;text&quot;</code>
        </p>
        <PatternExamples>
          <PatternExample details="basic text input">
            <input
              className="hyp-text-input"
              type="text"
              placeholder="http://www.example.com"
            />
          </PatternExample>
          <PatternExample details="text input in an error state">
            <input
              className="hyp-text-input has-error"
              type="text"
              placeholder="http://www.example.com"
            />
          </PatternExample>
        </PatternExamples>
      </Pattern>
      <Pattern title="Text input with button">
        <p>
          A pattern that pairs a text input field with an icon-only button. Use
          a dark-variant button to match the standard pattern here.
        </p>
        <PatternExamples>
          <PatternExample
            style={{ width: '300px' }}
            details="text input with a dark-variant IconButton"
          >
            <div className="hyp-text-input-with-button">
              <input type="text" placeholder="http://www.example.com" />
              <IconButton icon="arrow-right" title="go" variant="dark" />
            </div>
          </PatternExample>

          <PatternExample
            style={{ width: '300px' }}
            details="text input and button in an error state"
          >
            <div className="hyp-text-input-with-button">
              <input
                type="text"
                placeholder="http://www.example.com"
                className="has-error"
              />
              <IconButton icon="arrow-right" title="go" variant="dark" />
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
