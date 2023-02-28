import { Thumbnail, ImageIcon } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

export default function ThumbnailPage() {
  return (
    <Library.Page
      title="Thumbnail"
      intro={
        <p>
          <code>Thumbnail</code> renders media thumbnails. It handles aspect
          ratio, loading states, and placeholder content.
        </p>
      }
    >
      <Library.Section
        title="Thumbnail"
        intro={
          <p>
            <code>Thumbnail</code> is a composite component. It is built atop
            the <code>AspectRatio</code> component.
          </p>
        }
      >
        <Library.Pattern title="Status">
          <p>
            <code>Thumbnail</code> is a reimplementation of a legacy component
            with the same name.
          </p>

          <Library.Example title="Migrating to this component">
            <Next.Changelog>
              <Next.ChangelogItem status="breaking">
                Prop name:{' '}
                <s>
                  <code>classes</code>
                </s>{' '}
                ➜ No longer supported. Style a parent container instead, or use{' '}
                <code>AspectRatio</code> directly
              </Next.ChangelogItem>
              <Next.ChangelogItem status="breaking">
                Prop name:{' '}
                <s>
                  <code>isLoading</code>
                </s>{' '}
                ➜ <code>loading</code>
              </Next.ChangelogItem>
              <Next.ChangelogItem status="breaking">
                Prop values for <code>size</code>:{' '}
                <s>
                  <code>{"'small'"}</code>,<code>{"'medium'"}</code>,
                  <code>{"'large'"}</code>
                </s>{' '}
                ➜ Use <code>{"'sm'"}</code>, <code>{"'md'"}</code>, or{' '}
                <code>{"'lg'"}</code>
              </Next.ChangelogItem>
              <Next.ChangelogItem status="added">
                Prop <code>ratio</code> (default <code>{'"16/9"'}</code>) ➜ All
                content is constrained to this aspect ratio
              </Next.ChangelogItem>
            </Next.Changelog>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Usage">
          <Next.Usage componentName="Thumbnail" />
          <Library.Example>
            <p>
              <code>Thumbnail</code> lays out its content based on parent
              element constraints. In this example, the parent container sets a
              width of <code>350px</code>.
            </p>
            <Library.Demo
              title="Basic thumbnail with default 16:9 aspect ratio"
              withSource
            >
              <div className="w-[350px]">
                <Thumbnail>
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </Thumbnail>
              </div>
            </Library.Demo>

            <Library.Demo withSource title="Loading state">
              <div className="w-[350px]">
                <Thumbnail loading>
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </Thumbnail>
              </div>
            </Library.Demo>

            <p>
              <code>Thumbnail</code> will show placeholder content if it is
              empty and not loading.
            </p>

            <Library.Demo withSource title="Placeholder state">
              <div className="w-[350px]">
                <Thumbnail />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Managing height constraints">
            <p>
              If <code>height</code> is set on the parent container, this is the
              maximum height that the <code>Thumbnail</code> will use.
            </p>
            <p>
              If the parent element has a set height and there is extra space,{' '}
              <code>Thumbnail</code> content will be centered vertically.
            </p>

            <Library.Demo title="Extra available vertical space" withSource>
              <div className="w-[350px] h-[400px]">
                <Thumbnail>
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </Thumbnail>
              </div>
            </Library.Demo>

            <p>
              Thumbnail content respects parent constraints, even if there is
              not enough room to show the full content. In this example,{' '}
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

        <Library.Pattern title="Props">
          <Library.Example title="loading">
            <p>
              <code>Thumbnail</code> will show a loading spinner if the boolean{' '}
              <code>loading</code> prop is set.
            </p>
            <Library.Demo withSource title="Loading state">
              <div className="w-[350px]">
                <Thumbnail loading>
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </Thumbnail>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="placeholder">
            <p>
              <code>Thumbnail</code> will render placeholder content if it is
              empty and not <code>loading</code>. Custom{' '}
              <code>placeholder</code> content can be set.
            </p>
            <Library.Demo withSource title="Default placeholder">
              <div className="w-[350px]">
                <Thumbnail />
              </div>
            </Library.Demo>

            <Library.Demo withSource title="Custom placeholder">
              <div className="w-[350px]">
                <Thumbnail
                  placeholder={
                    <ImageIcon className="text-grey-5 w-1em h-1em" />
                  }
                />
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="ratio">
            <p>
              Control applied aspect ratio with the <code>ratio</code> prop
              (default <code>{"'16/9'"}</code>). Note that this prop takes a{' '}
              <code>string</code> numeric expression or value, which is used in
              a CSS <code>calc()</code> expression.
            </p>
            <Library.Demo title="ratio: '16/9' (default)" withSource>
              <div className="w-[350px]">
                <Thumbnail>
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </Thumbnail>
              </div>
            </Library.Demo>

            <Library.Demo title="ratio: '4/3'" withSource>
              <div className="w-[350px]">
                <Thumbnail ratio="4/3">
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </Thumbnail>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="size">
            <p>
              The <code>size</code> prop affects the relative size of the{' '}
              {"component's"} border, loading spinner size and placeholder size.
              The overall dimension constraints in these examples are set by the
              parent container.
            </p>
            <Library.Demo title="size: 'md' (default)" withSource>
              <div className="space-y-4">
                <div className="w-[300px]">
                  <Thumbnail>
                    <img src="https://placekitten.com/400/400" alt="kitty" />
                  </Thumbnail>
                </div>
                <div className="w-[300px]">
                  <Thumbnail loading />
                </div>
                <div className="w-[300px]">
                  <Thumbnail />
                </div>
              </div>
            </Library.Demo>

            <Library.Demo title="size: 'sm'" withSource>
              <div className="space-y-4">
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

            <Library.Demo title="size: 'lg'" withSource>
              <div className="space-y-4">
                <div className="w-[400px]">
                  <Thumbnail size="lg">
                    <img src="https://placekitten.com/400/400" alt="kitty" />
                  </Thumbnail>
                </div>
                <div className="w-[400px]">
                  <Thumbnail size="lg" loading />
                </div>
                <div className="w-[400px]">
                  <Thumbnail size="lg" />
                </div>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="borderless">
            <p>
              The {"component's"} border can be turned off by setting the{' '}
              <code>borderless</code> prop.
            </p>
            <Library.Demo title="borderless Thumbnails" withSource>
              <div className="space-y-4">
                <div className="w-[300px]">
                  <Thumbnail borderless>
                    <img src="https://placekitten.com/400/400" alt="kitty" />
                  </Thumbnail>
                </div>
                <div className="w-[300px]">
                  <Thumbnail borderless loading />
                </div>
                <div className="w-[300px]">
                  <Thumbnail borderless />
                </div>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
