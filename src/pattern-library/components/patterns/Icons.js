import Library from '../Library';

import * as Icons from '../../../components/icons';

export default function IconPage() {
  return (
    <Library.Page title="Icons">
      <p className="text-lg">TODO</p>
      <Library.Pattern title="Usage">
        <Library.Example>
          <Library.Demo withSource>
            <Icons.CancelIcon />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
      <Library.Pattern title="Icon components">
        <div className="grid grid-cols-4 gap-6">
          {Object.keys(Icons).map(iconName => {
            const IconComponent = Icons[iconName];
            return (
              <div
                className="flex flex-col gap-y-4 border rounded-sm p-4 items-center justify-center"
                key={iconName}
              >
                <IconComponent />
                {iconName}
              </div>
            );
          })}
        </div>
      </Library.Pattern>
    </Library.Page>
  );
}
