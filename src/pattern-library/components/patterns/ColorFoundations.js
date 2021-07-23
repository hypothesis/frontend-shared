import Library from '../Library';

// TODO:
// - color descriptions and guidance
// - hex and other metadata about colors
// - foreground color examples
// - more examples of overriding with `!` classes
// - valid contrast combinations

const brand = ['brand'];

const greys = [
  'white',
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
];

const states = ['success', 'notice', 'error'];

function ColorSwatch({ colorName }) {
  return (
    <div>
      <div
        className={`hyp-u-bg-color--${colorName}`}
        style="width:16rem;height:2rem;margin-right:1em"
      />
      <p>
        <i>{colorName}</i>
      </p>
    </div>
  );
}

const brandExamples = brand.map(colorName => (
  <ColorSwatch key={colorName} colorName={colorName} />
));

const greyExamples = greys.map(colorName => (
  <ColorSwatch key={colorName} colorName={colorName} />
));

const stateExamples = states.map(colorName => (
  <ColorSwatch key={colorName} colorName={colorName} />
));

export default function ColorFoundations() {
  return (
    <Library.Page title="Colors">
      <Library.Pattern title="Brand red">
        <div className="hyp-u-layout-row" style="flex-wrap:wrap">
          {brandExamples}
        </div>
      </Library.Pattern>

      <Library.Pattern title="Greys">
        <div className="hyp-u-layout-row" style="flex-wrap:wrap">
          {greyExamples}
        </div>
      </Library.Pattern>

      <Library.Pattern title="State indicators">
        <div className="hyp-u-layout-row" style="flex-wrap:wrap">
          {stateExamples}
        </div>
      </Library.Pattern>
    </Library.Page>
  );
}
