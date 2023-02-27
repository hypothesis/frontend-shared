import { Card, Icon, registerIcon } from '../../../';
import * as iconSrc from '../../../icons';
import Library from '../Library';
import Next from '../LibraryNext';

/** @type {Record<string, symbol>} */
const icons = {};

for (let [iconName, src] of Object.entries(iconSrc)) {
  icons[iconName] = registerIcon(iconName, src);
}

export default function IconComponents() {
  return (
    <Library.Page
      title="Icons"
      intro={
        <p>
          The legacy <code>Icon</code> component renders an SVG icon indicated
          by the <code>name</code> prop.
        </p>
      }
    >
      <Library.Pattern title="Status">
        <Next.Changelog>
          <Next.ChangelogItem status="deprecated">
            The single icon component <code>Icon</code> is deprecated in favor
            of individual icon components. The <code>Icon</code> component is
            slated for removal in <code>v6.0</code> of this package.
          </Next.ChangelogItem>
        </Next.Changelog>
      </Library.Pattern>
      <Library.Pattern title="Hypothesis icon set">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {Object.keys(icons).map(iconName => (
            <Card
              key={iconName}
              classes="flex flex-col items-center bg-grey-0 border-slate-5 space-y-3 rounded-lg"
            >
              <div style="text-lg">
                <Icon name={icons[iconName]} />
              </div>
              <div>{iconName}</div>
            </Card>
          ))}
        </div>
      </Library.Pattern>
    </Library.Page>
  );
}
