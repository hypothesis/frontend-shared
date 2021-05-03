import {
  PatternExample,
  PatternExamples,
  PatternPage,
  Pattern,
} from '../PatternPage';

export default function SharedOrganismPatterns() {
  return (
    <PatternPage title="Organisms">
      <Pattern title="Card">
        <PatternExamples>
          <PatternExample details="A card is a framed element with internal margins and padding, and a hover shadow effect">
            <div className="card">This is in a card.</div>
          </PatternExample>
          <PatternExample details="A card applies vertical rhythm to its immediate-child elements: borders added here to highlight this">
            <div className="card">
              <div className="u-border">Child content in a card.</div>
              <div className="u-border">Child content in a card.</div>
              <div className="u-border">Child content in a card.</div>
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
