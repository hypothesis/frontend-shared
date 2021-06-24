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
  'success',
  'notice',
  'error',
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

export default function ColorFoundations() {
  return (
    <PatternPage title="Colors">
      <Pattern title="Color swatches">
        <PatternExamples>{backgroundExamples}</PatternExamples>
      </Pattern>

      <Pattern title="Overriding background colors: example">
        <PatternExamples>
          <PatternExample details="Background-color utility class">
            <div className="hyp-panel hyp-u-bg-color--grey-2">
              <p>
                This is a <code>panel</code> with an applied utility class
                <code>.hyp-u-bg-color--grey-2</code>.
              </p>
            </div>
          </PatternExample>
        </PatternExamples>
      </Pattern>
    </PatternPage>
  );
}
