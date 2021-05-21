import {
  PatternPage,
  Pattern,
  PatternExamples,
  PatternExample,
} from '../PatternPage';

// TODO:
// - color descriptions and guidance
// - hex and other metadata about colors
// - more sophisticated "swatches"
// - foreground color examples
// - more examples of overriding with `!` classes
// - valid contrast combinations

const backgroundExamples = [
  'brand',
  'grey-0',
  'grey-1',
  'grey-2',
  'grey-3',
  'grey-4',
  'grey-5',
  'grey-6',
  'grey-7',
  'grey-8',
  'grey-9',
].map(colorName => {
  return (
    <PatternExample details={`${colorName}`} key={`bg-${colorName}`}>
      <div
        key={colorName}
        className={`PatternSwatch hyp-u-bg-color--${colorName}`}
      />
    </PatternExample>
  );
});

export default function ColorPatterns() {
  return (
    <PatternPage title="Colors">
      <Pattern title="Color swatches">
        <PatternExamples>{backgroundExamples}</PatternExamples>
      </Pattern>

      <Pattern title="Overriding background colors: example">
        <PatternExamples>
          <PatternExample details="Background utility class without override: panel specificity wins">
            <div className="hyp-panel hyp-u-bg-color--grey-2">
              <p>
                This is a <code>panel</code> with an applied utility class
                <code>.hyp-u-bg-color--grey-2</code>.
              </p>
              <p>
                It is superseded by a background-color rule from the{' '}
                <code>panel</code> (it is &quot;ignored&quot;).
              </p>
            </div>
          </PatternExample>
          <PatternExample details="Background utility class with override: background class wins">
            <div className="hyp-panel hyp-!-u-bg-color--grey-2">
              <p>
                This is a <code>panel</code> with an applied utility class
                <code>.hyp-!-u-bg-color--grey-2</code>.
              </p>
              <p>
                It contains an <code>!important</code> rule.
              </p>
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
