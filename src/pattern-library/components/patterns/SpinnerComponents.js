import { Spinner } from '../../..';

import {
  PatternPage,
  Pattern,
  PatternExamples,
  PatternExample,
} from '../PatternPage';

export default function SpinnerComponents() {
  return (
    <PatternPage title="Spinner">
      <Pattern title="Spinner">
        <PatternExamples>
          <PatternExample details="basic loading spinner">
            <Spinner />
          </PatternExample>
          <PatternExample details="loading spinner, large">
            <Spinner size="large" />
          </PatternExample>
          <PatternExample details="loading spinner, small">
            <Spinner size="small" />
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
