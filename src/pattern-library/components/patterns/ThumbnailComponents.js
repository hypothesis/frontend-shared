import { Thumbnail } from '../../..';

import {
  PatternPage,
  Pattern,
  PatternExamples,
  PatternExample,
} from '../PatternPage';

export default function ThumbnailComponents() {
  return (
    <PatternPage title="Thumbnail">
      <Pattern title="Thumbnail">
        <p>
          The <code>Thumbnail</code> component handles rendering a thumbnail or
          other image, and provides a loading state and an empty (placeholder)
          state. If <code>Thumbnail</code> has no content, it will render a
          placeholder. If its <code>isLoading</code> prop is set to{' '}
          <code>true</code>, it will render a loading state.
        </p>
        <p>
          The following examples are rendered within a parent container sized to
          250x175px. The Thumbnail will fill, but not exceed, the available
          space.
        </p>
        <PatternExamples>
          <PatternExample details="Empty thumbnail with default placeholder">
            <div style="height: 250px; width:175px">
              <Thumbnail />
            </div>
          </PatternExample>
          <PatternExample details="Thumbnail with image content">
            <div style="height: 250px; width:175px">
              <Thumbnail>
                <img src="http://placekitten.com/200/300" alt="kitty" />
              </Thumbnail>
            </div>
          </PatternExample>
          <PatternExample details="Empty thumbnail in loading state">
            <div style="height: 250px; width:175px">
              <Thumbnail isLoading />
            </div>
          </PatternExample>
          <PatternExample details="Thumbnail in loading state (ignores content)">
            <div style="height: 250px; width:175px">
              <Thumbnail isLoading>
                <img src="http://placekitten.com/200/300" alt="kitty" />
              </Thumbnail>
            </div>
          </PatternExample>
          <PatternExample details="Empty thumbnail with custom placeholder (placeholder can be any valid JSX)">
            <div style="height: 250px; width:175px">
              <Thumbnail placeholder="!" />
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>

      <Pattern title="Thumbnail (smaller)">
        <p>These examples are within a 100x150px parent.</p>
        <PatternExamples>
          <PatternExample details="smaller loading spinner">
            <div style="width:150px; height:100px">
              <Thumbnail isLoading size="small" />
            </div>
          </PatternExample>
          <PatternExample details="constrained image proportions">
            <div style="width:150px; height:100px">
              <Thumbnail size="small">
                <img src="http://placekitten.com/200/300" alt="kitty" />
              </Thumbnail>
            </div>
          </PatternExample>
          <PatternExample details="constrained image proportions">
            <div style="width:150px; height:100px">
              <Thumbnail size="small" />
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
