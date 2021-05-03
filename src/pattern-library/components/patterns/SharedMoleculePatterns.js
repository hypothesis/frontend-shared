import {
  PatternExample,
  PatternExamples,
  PatternPage,
  Pattern,
} from '../PatternPage';

export default function SharedMoleculePatterns() {
  return (
    <PatternPage title="Molecules">
      <Pattern title="Frame">
        <PatternExamples>
          <PatternExample details="A frame gives a border and a background but no other layout affordances">
            <div className="frame">This is in a frame.</div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
