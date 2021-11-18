import tailwindConfig from '../../../../tailwind.config';

import Library from '../Library';

// TODO:
// - color descriptions and guidance
// - foreground color examples
// - valid contrast combinations

const colorConfig = tailwindConfig.theme.colors ?? {};

function ColorSwatch({ className, colorKey, colorValue = '' }) {
  const colorValueString = colorValue ? `: ${colorValue}` : '';
  return (
    <div>
      <div className={`${className} h-12 mr-4`} />
      <p>
        <i>
          {colorKey}
          {colorValueString}
        </i>
      </p>
    </div>
  );
}

export default function ColorFoundations() {
  return (
    <Library.Page title="Colors">
      <Library.Pattern title="Brand">
        <div className="grid md:grid-cols-2 gap-4">
          <ColorSwatch
            className="bg-brand"
            colorKey={'brand'}
            colorValue={colorConfig.brand.DEFAULT}
          />
          <ColorSwatch
            className="bg-brand-dark"
            colorKey={'brand-dark'}
            colorValue={colorConfig.brand.dark}
          />
        </div>
      </Library.Pattern>
      <Library.Pattern title="Greys">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ColorSwatch
            className="white"
            colorKey={'white'}
            colorValue={colorConfig.white}
          />
          <ColorSwatch
            className="bg-grey-0"
            colorKey={'grey-0'}
            colorValue={colorConfig['grey-0']}
          />
          <ColorSwatch
            className="bg-grey-1"
            colorKey={'grey-1'}
            colorValue={colorConfig['grey-1']}
          />
          <ColorSwatch
            className="bg-grey-2"
            colorKey={'grey-2'}
            colorValue={colorConfig['grey-2']}
          />
          <ColorSwatch
            className="bg-grey-3"
            colorKey={'grey-3'}
            colorValue={colorConfig['grey-3']}
          />
          <ColorSwatch
            className="bg-grey-4"
            colorKey={'grey-4'}
            colorValue={colorConfig['grey-4']}
          />
          <ColorSwatch
            className="bg-grey-5"
            colorKey={'grey-5'}
            colorValue={colorConfig['grey-5']}
          />
          <ColorSwatch
            className="bg-grey-6"
            colorKey={'grey-6'}
            colorValue={colorConfig['grey-6']}
          />
          <ColorSwatch
            className="bg-grey-7"
            colorKey={'grey-7'}
            colorValue={colorConfig['grey-7']}
          />
          <ColorSwatch
            className="bg-grey-8"
            colorKey={'grey-8'}
            colorValue={colorConfig['grey-8']}
          />
          <ColorSwatch
            className="bg-grey-9"
            colorKey={'grey-9'}
            colorValue={colorConfig['grey-9']}
          />
        </div>
      </Library.Pattern>

      <Library.Pattern title="States">
        <div className="grid lg:grid-cols-3 gap-4">
          <ColorSwatch
            className="bg-success"
            colorKey={'success'}
            colorValue={colorConfig.success}
          />
          <ColorSwatch
            className="bg-notice"
            colorKey={'notice'}
            colorValue={colorConfig.notice}
          />
          <ColorSwatch
            className="bg-error"
            colorKey={'error'}
            colorValue={colorConfig.error}
          />
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
