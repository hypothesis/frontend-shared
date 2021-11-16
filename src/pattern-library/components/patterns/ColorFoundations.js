import tailwindConfig from '../../../../tailwind.config';

import Library from '../Library';

// TODO:
// - color descriptions and guidance
// - foreground color examples
// - valid contrast combinations

const colorConfig = tailwindConfig.theme.extend.colors;

function ColorSwatch({ colorKey }) {
  return (
    <div>
      <div className={`bg-${colorKey} h-12 mr-4`} />
      <p>
        <i>
          {colorKey}: {colorConfig[colorKey]}
        </i>
      </p>
    </div>
  );
}

const colorSwatches = Object.keys(colorConfig).map(colorKey => (
  <ColorSwatch key={colorKey} colorKey={colorKey} />
));

export default function ColorFoundations() {
  return (
    <Library.Page title="Colors">
      <Library.Pattern title="Color swatches">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorSwatches}
        </div>
      </Library.Pattern>

      <Library.Pattern title="Atomic example">
        <div className="p-4 hyp-u-border">
          Bordered with <code>.hyp-u-border</code>
        </div>
      </Library.Pattern>
    </Library.Page>
  );
}
