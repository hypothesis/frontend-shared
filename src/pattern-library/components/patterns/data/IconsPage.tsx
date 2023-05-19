import { Link } from '../../../../';
import * as Icons from '../../../../components/icons';
import Library from '../../Library';

export default function IconsPage() {
  return (
    <Library.Page
      title="Icons"
      intro={
        <p>
          Icons are simple, standalone components that wrap SVG source markup.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="CancelIcon" />
          <Library.Example>
            <Library.Demo
              title="Basic Icon component usage: CancelIcon"
              withSource
            >
              <Icons.CancelIcon />
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Icon components">
          <div className="my-4 grid grid-cols-4 gap-6">
            {(Object.keys(Icons) as Array<keyof typeof Icons>).map(iconName => {
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

        <Library.Pattern title="Component API">
          <Library.Example title="...svgProps">
            <Library.Callout>
              Unlike other components in this package, Icon components take{' '}
              <code>className</code>, not <code>classes</code>.
            </Library.Callout>
            <Library.Info>
              <Library.InfoItem label="description">
                Icon components accept SVG attributes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>
                  {'preact.JSX.HTMLAttributes<'}
                  <Link href="https://developer.mozilla.org/en-US/docs/Web/API/SVGSVGElement">
                    SVGSVGElement
                  </Link>
                </code>
                {'>'}
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Demo title="Styled icon component" withSource>
            <Icons.CautionIcon className="text-yellow-notice w-16 h-16" />
          </Library.Demo>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
