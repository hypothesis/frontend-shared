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
          square. To adjust size, adjust the local font size.
        </p>
        <PatternExamples>
          <PatternExample details="basic spinner">
            <SvgIcon name="spinner" className="hyp-spinner" />
          </PatternExample>
          <PatternExample
            details="spinner with local font-size at 3rem"
            style={{ fontSize: '3rem' }}
          >
            <SvgIcon name="spinner" className="hyp-spinner" />
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
