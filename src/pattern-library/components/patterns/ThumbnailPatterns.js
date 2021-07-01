import {
  PatternExample,
  PatternExamples,
  PatternPage,
  Pattern,
} from '../PatternPage';

import { SvgIcon } from '../../..';

export default function ThumbnailPatterns() {
  return (
    <PatternPage title="Thumbnails">
      <p>
        The thumbnail pattern is for displaying thumbnail or other images in a
        frame of constrained size. It provides a variant for displaying a
        placeholder (when there is no image to render) or a loading state.
      </p>
      <p>
        The thumbnail will fill the available space in the parent (100%), but
        will constrain the image dimensions within that space, retaining aspect
        ratio. It will retain its dimensions even when empty or in loading
        state.
      </p>
      <Pattern title="Thumbnail">
        <p>
          These examples show a thumbnail that is contained within a parent
          container sized to 250x175px.
        </p>
        <PatternExamples>
          <PatternExample details="thumbnail with content">
            <div style="height: 250px; width: 175px">
              <div className="hyp-thumbnail">
                <div className="hyp-thumbnail__content">
                  <img src="http://placekitten.com/200/300" alt="kitty" />
                </div>
              </div>
            </div>
          </PatternExample>

          <PatternExample details="thumbnail with placeholder">
            <div style="height: 250px; width: 175px">
              <div className="hyp-thumbnail">
                <div className="hyp-thumbnail__content">
                  <div className="hyp-thumbnail__placeholder">...</div>
                </div>
              </div>
            </div>
          </PatternExample>

          <PatternExample details="thumbnail in loading state">
            <div style="height: 250px; width: 175px">
              <div className="hyp-thumbnail">
                <div className="hyp-thumbnail__content">
                  <SvgIcon name="hyp-spinner" className="hyp-spinner" />
                </div>
              </div>
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
      <Pattern title="Thumbnail in smaller dimensions">
        <p>
          These examples show all three states of a thumnbail in a smaller
          space: 150x100px.
        </p>
        <PatternExamples>
          <PatternExample details="all three states shown">
            <div style="width: 100px; height: 150px">
              <div className="hyp-thumbnail">
                <div className="hyp-thumbnail__content">
                  <img src="http://placekitten.com/100/150" alt="kitty" />
                </div>
              </div>
            </div>

            <div style="width: 100px; height: 150px">
              <div className="hyp-thumbnail">
                <div className="hyp-thumbnail__content">
                  <span className="hyp-thumbnail__placeholder">...</span>
                </div>
              </div>
            </div>

            <div style="width: 100px; height: 150px">
              <div className="hyp-thumbnail">
                <div className="hyp-thumbnail__content">
                  <SvgIcon name="hyp-spinner" className="hyp-spinner" />
                </div>
              </div>
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
      <Pattern title="Thumbnails: aspect ratio">
        <p>
          An image in a thumnbail is constrained to the available space, and
          retains aspect ratio.
        </p>
        <PatternExamples>
          <PatternExample details="thumbnail showing retention of image aspect ratio">
            <div style="width: 175px; height: 250px">
              <div className="hyp-thumbnail">
                <div className="hyp-thumbnail__content">
                  <img src="http://placekitten.com/350/250" alt="kitty" />
                </div>
              </div>
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
