import Library from '../../Library';
import Next from '../../LibraryNext';

import { Link } from '../../../../next';

import * as Icons from '../../../../components/icons';

export default function IconsPage() {
  return (
    <Library.Page
      title="Icons"
      intro={<p>Icons are simple, standalone components.</p>}
    >
      <Library.Section title="Icon components">
        <Library.Pattern title="Status">
          <p>
            These standalone icon components are new. These are intended to
            replace the single legacy <code>Icon</code> component.
          </p>
          <Library.Example title="Migrating to updated icons">
            <Next.Changelog>
              <Next.ChangelogItem status="changed">
                It is no longer necessary to import SVG source nor registration
                functions from this package to use icons.
              </Next.ChangelogItem>
            </Next.Changelog>
          </Library.Example>
        </Library.Pattern>
        <Library.Pattern title="Usage">
          <Next.Usage componentName="CancelIcon" />
          <Library.Example>
            <Library.Demo title="Usage example with CancelIcon" withSource>
              <Icons.CancelIcon />
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Available icon components">
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

        <Library.Pattern title="Props">
          <p>
            Icon components accept any{' '}
            <code>
              <Link href="https://developer.mozilla.org/en-US/docs/Web/API/SVGSVGElement">
                SVGSVGElement
              </Link>
            </code>{' '}
            attributes as props. Use <code>className</code> (not{' '}
            <code>classes</code>) to style icons.
          </p>
          <Library.Example>
            <Library.Demo title="Styled icon component" withSource>
              <Icons.CautionIcon className="text-yellow-notice w-16 h-16" />
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Sizing icons">
          <p>
            Icons are sized at <code>16×16</code> unless styled otherwise.
          </p>
          <p>
            Icons are often sized relative to the surrounding text. The{' '}
            <code>em</code> spacing value provided by this {"package's"}{' '}
            Tailwind preset allows sizing at <code>1em</code>.
          </p>

          <p>
            <Link
              href="https://tailwindcss.com/docs/customizing-spacing"
              underline="always"
            >
              <div className="flex items-center gap-x-1">
                More information about {"tailwind's"} sizing utility classes
                <Icons.ExternalIcon />
              </div>
            </Link>
          </p>
          <Library.Example>
            <Library.Demo title="Sized icon components" withSource>
              <div className="space-y-2">
                <div className="text-xs items-center flex gap-x-2">
                  <Icons.ArrowRightIcon className="w-em h-em" />
                  Icon sized relative to some small text
                </div>
                <div className="text-lg items-center flex gap-x-2">
                  <Icons.ArrowRightIcon className="w-em h-em" />
                  Icon sized relative to some larger text
                </div>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
