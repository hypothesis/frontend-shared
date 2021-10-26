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
        <div className="LibraryGrid">
          {Object.keys(icons).map(iconName => (
            <Card
              key={iconName}
              classes="hyp-u-vertical-spacing hyp-u-layout-column--center IconTile"
            >
              <div style="font-size:1.5rem">
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
