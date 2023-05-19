import { Thumbnail, ImageIcon, Link } from '../../../../';
import Library from '../../Library';

export default function ThumbnailPage() {
  return (
    <Library.Page
      title="Thumbnail"
      intro={
        <p>
          <code>Thumbnail</code> renders media thumbnails, handling aspect
          ratio, loading states, and placeholder content. It is a composite
          component that uses{' '}
          <Library.Link href="/data-aspectratio">
            <code>AspectRatio</code>
          </Library.Link>
          .
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="Thumbnail" />

          <Library.Demo title="Basic Thumbnail" withSource>
            <div className="w-[250px]">
              <Thumbnail>
                <img src="https://placekitten.com/400/400" alt="kitty" />
              </Thumbnail>
            </div>
          </Library.Demo>
        </Library.Pattern>

        <Library.Pattern title="Using Thumbnail">
          <Library.Example title="Loading and placeholder content">
            <Library.Demo withSource title="Loading state">
              <div className="w-[250px]">
                <Thumbnail loading>
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </Thumbnail>
              </div>
            </Library.Demo>

            <Library.Demo withSource title="Placeholder shown when empty">
              <div className="w-[250px]">
                <Thumbnail />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Height and width constraints">
            <p>
              <code>Thumbnail</code> will constrain content to within the height
              and width constraints of the containing element. If the parent
              element has a set height and there is extra space, Thumbnail
              content will be centered vertically.
            </p>
            <Library.Demo title="Extra available vertical space" withSource>
              <div className="w-[250px] h-[300px]">
                <Thumbnail>
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </Thumbnail>
              </div>
            </Library.Demo>
            <p>
              Thumbnail content respects parent constraints, even if there is
              not enough room to show the full content. In this example,
              <code>object-position: top</code> has been set on the contained
              image to optimize the cropping.
            </p>

            <Library.Demo title="Content taller than vertical space" withSource>
              <div className="w-[350px] h-[150px]">
                <Thumbnail>
                  <img
                    src="https://placekitten.com/400/400"
                    className="object-top"
                    alt="kitty"
                  />
                </Thumbnail>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <p>
            <code>Thumbnail</code> takes all standard props from the composite
            component API.
          </p>

          <Library.Example title="borderless">
            <Library.Info>
              <Library.InfoItem label="description">
                Render the <code>Thumbnail</code> with no visual border.
                Relative border size can be controlled with the{' '}
                <code>size</code> prop.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="borderless Thumbnails" withSource>
              <div className="space-y-4">
                <div className="w-[200px]">
                  <Thumbnail borderless>
                    <img src="https://placekitten.com/400/400" alt="kitty" />
                  </Thumbnail>
                </div>
                <div className="w-[200px]">
                  <Thumbnail borderless />
                </div>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="loading">
            <Library.Info>
              <Library.InfoItem label="description">
                Display a loading indicator.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Example title="objectFit">
            <Library.Info>
              <Library.InfoItem label="description">
                Control the way the content is resized and fitted (
                <Link
                  underline="always"
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit"
                >
                  object-fit
                </Link>
                ).
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>
                  {"'cover' | 'contain' | 'fill' | 'none' | 'scale-down'"}
                </code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'cover'"}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Example title="placeholder">
            <Library.Info>
              <Library.InfoItem label="description">
                Custom placeholder content to use when the{' '}
                <code>Thumbnail</code> is empty.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>preact.ComponentChildren</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo withSource title="Custom placeholder">
              <div className="w-[250px]">
                <Thumbnail
                  placeholder={
                    <ImageIcon className="text-grey-5 w-1em h-1em" />
                  }
                />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="ratio">
            <Library.Info>
              <Library.InfoItem label="description">
                Set the aspect ratio for the content.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string</code> Any numeric string that can be used in a CSS{' '}
                <code>calc()</code> expression
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'16/9'"}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="ratio: '4/3'" withSource>
              <div className="w-[250px]">
                <Thumbnail ratio="4/3">
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </Thumbnail>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="size">
            <Library.Info>
              <Library.InfoItem label="description">
                Set the relative proportions of the <code>Thumbnail</code>, its
                border, loading spinner and placeholder content. If you need
                more styling control, use{' '}
                <Library.Link href="/data-aspectratio">
                  AspectRatio
                </Library.Link>{' '}
                directly.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{"'sm' | 'md' | 'lg'"}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'md'"}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="size: 'sm'" withSource>
              <div className="flex gap-x-4">
                <div className="w-[200px]">
                  <Thumbnail size="sm">
                    <img src="https://placekitten.com/400/400" alt="kitty" />
                  </Thumbnail>
                </div>

                <div className="w-[200px]">
                  <Thumbnail size="sm" loading />
                </div>

                <div className="w-[200px]">
                  <Thumbnail size="sm" />
                </div>
              </div>
            </Library.Demo>

            <Library.Demo title="size: 'md'" withSource>
              <div className="flex gap-x-4">
                <div className="w-[200px]">
                  <Thumbnail size="md">
                    <img src="https://placekitten.com/400/400" alt="kitty" />
                  </Thumbnail>
                </div>

                <div className="w-[200px]">
                  <Thumbnail size="md" loading />
                </div>

                <div className="w-[200px]">
                  <Thumbnail size="md" />
                </div>
              </div>
            </Library.Demo>

            <Library.Demo title="size: 'lg'" withSource>
              <div className="flex gap-x-4">
                <div className="w-[200px]">
                  <Thumbnail size="lg">
                    <img src="https://placekitten.com/400/400" alt="kitty" />
                  </Thumbnail>
                </div>

                <div className="w-[200px]">
                  <Thumbnail size="lg" loading />
                </div>

                <div className="w-[200px]">
                  <Thumbnail size="lg" />
                </div>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
