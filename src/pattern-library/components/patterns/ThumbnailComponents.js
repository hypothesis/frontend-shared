import { Thumbnail } from '../../..';

import Library from '../Library';

export default function ThumbnailComponents() {
  return (
    <Library.Page title="Thumbnail">
      <Library.Pattern title="Thumbnail">
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

        <Library.Example title="Empty thumbnail with default placeholder">
          <Library.Demo withSource>
            <div style="height: 250px; width:175px">
              <Thumbnail />
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Thumbnail with image content">
          <Library.Demo withSource>
            <div style="height: 250px; width:175px">
              <Thumbnail>
                <img src="http://placekitten.com/200/300" alt="kitty" />
              </Thumbnail>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Empty thumbnail in loading state">
          <Library.Demo withSource>
            <div style="height: 250px; width:175px">
              <Thumbnail isLoading />
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Thumbnail in loading state">
          <Library.Demo withSource>
            <div style="height: 250px; width:175px">
              <Thumbnail isLoading>
                <img src="http://placekitten.com/200/300" alt="kitty" />
              </Thumbnail>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Empty thumbnail with custom placeholder">
          <p>Placeholder can be any JSX</p>
          <Library.Demo withSource>
            <div style="height: 250px; width:175px">
              <Thumbnail placeholder="!" />
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Thumbnail (smaller)">
        <p>These examples are within a 100x150px parent.</p>
        <Library.Example title="Smaller loading spinner">
          <Library.Demo withSource>
            <div style="width:150px; height:100px">
              <Thumbnail isLoading size="small" />
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Constrained image proportions">
          <Library.Demo withSource>
            <div style="width:150px; height:100px">
              <Thumbnail size="small">
                <img src="http://placekitten.com/200/300" alt="kitty" />
              </Thumbnail>
            </div>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Constrained image proportions: placeholder">
          <Library.Demo withSource>
            <div style="width:150px; height:100px">
              <Thumbnail size="small" />
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
