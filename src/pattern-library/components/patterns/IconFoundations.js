import Library from '../Library';

import { Card, Icon, registerIcon } from '../../../';
import * as iconSrc from '../../../icons';

const icons = {};

for (const iconName in iconSrc) {
  if (Object.prototype.hasOwnProperty.call(iconSrc, iconName)) {
    icons[iconName] = registerIcon(iconName, iconSrc[iconName]);
  }
}

export default function IconFoundations() {
  return (
    <Library.Page title="Icons">
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
