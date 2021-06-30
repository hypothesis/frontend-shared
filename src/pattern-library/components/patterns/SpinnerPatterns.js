import {
  PatternExample,
  PatternExamples,
  PatternPage,
  Pattern,
} from '../PatternPage';

import { SvgIcon } from '../../..';

export default function SpinnerPatterns() {
  return (
    <PatternPage title="Spinners">
      <p>
        The <code>spinner</code> pattern can be used to show loading states. It
        is an animated SVG.
      </p>
      <Pattern title="Spinner">
        <p>
          The spinner is <code>em-sized</code>; it renders at <code>1em</code>{' '}
          square, by default. Other relative sizes are available as follows. For
          manual sizing control, adjust the font-size of a parent element.
        </p>
        <PatternExamples>
          <PatternExample details="basic spinner">
            <SvgIcon name="spinner" className="hyp-spinner" />
          </PatternExample>
          <PatternExample details="spinner, large size">
            <SvgIcon name="spinner" className="hyp-spinner--large" />
          </PatternExample>
          <PatternExample details="spinner, small size">
            <SvgIcon name="spinner" className="hyp-spinner--small" />
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
