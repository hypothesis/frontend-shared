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
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
