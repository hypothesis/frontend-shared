import { AspectRatio, FileImageIcon, Link } from '../../../../';
import Library from '../../Library';

export default function AspectRatioPage() {
  return (
    <Library.Page
      title="AspectRatio"
      intro={
        <p>
          <code>AspectRatio</code> is a simple component that controls the
          aspect ratio of its first direct child.
        </p>
      }
    >
      <Library.Section title="AspectRatio">
        <Library.Pattern title="Usage">
          <Library.Usage componentName="AspectRatio" />
          <Library.Example>
            <Library.Demo
              title="AspectRatio with default 16:9 ratio"
              withSource
            >
              <div className="w-[350px]">
                <AspectRatio>
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </AspectRatio>
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="Placeholder content">
            <p>
              Placeholder content can be put in a container that is the first
              direct child of the <code>AspectRatio</code>.
            </p>
            <Library.Demo title="Placeholder" withSource>
              <div className="w-[250px] border rounded-md">
                <AspectRatio>
                  <div>
                    <FileImageIcon className="text-slate-5 w-2em h-2em" />
                  </div>
                </AspectRatio>
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="Fitting and positioning content">
            <p>
              The way the content is resized and fitted (
              <Link
                underline="always"
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit"
              >
                object-fit
              </Link>
              ) can be controlled with the <code>objectFit</code> prop
              (documented below).
            </p>
            <Library.Demo title="Changing object-fit to 'contain'" withSource>
              <div className="w-[350px] border rounded-md">
                <AspectRatio objectFit="contain">
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </AspectRatio>
              </div>
            </Library.Demo>
            <p>
              <Link
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-position"
                underline="always"
              >
                Object positioning
              </Link>{' '}
              within the content {"element's"} box can be handled by styling the
              content element itself. By default, the browser will position
              content <code>{'50% 50%'}</code> within the {"element's"} box. In
              this example, the image is styled to apply{' '}
              <code>{'object-position: top'}</code> instead.
            </p>

            <Library.Demo
              title="Changing the contained object's position"
              withSource
            >
              <div className="w-[350px]">
                <AspectRatio>
                  <img
                    src="https://placekitten.com/400/400"
                    alt="kitty"
                    className="object-top"
                  />
                </AspectRatio>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="ratio">
            <p>
              Control applied aspect ratio with the <code>ratio</code> prop
              (default <code>{"'16/9'"}</code>). Note that this prop takes a{' '}
              <code>string</code> numeric expression or value, which is used in
              a CSS <code>calc()</code> expression.
            </p>
            <Library.Demo title="Setting aspect ratio to 4:3" withSource>
              <div className="w-[350px]">
                <AspectRatio ratio="4/3">
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </AspectRatio>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="objectFit">
            <p>
              Use the <code>objectFit</code> prop to control how the content
              object is fitted (
              <Link
                underline="always"
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit"
              >
                object-fit
              </Link>
              ).
            </p>
            <Library.Demo title="objectFit:'cover' (default)" withSource>
              <div className="w-[350px] border rounded-md">
                <AspectRatio objectFit="cover">
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </AspectRatio>
              </div>
            </Library.Demo>

            <Library.Demo title="objectFit:'contain'" withSource>
              <div className="w-[350px] border rounded-md">
                <AspectRatio objectFit="contain">
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </AspectRatio>
              </div>
            </Library.Demo>

            <Library.Demo title="objectFit:'fill'" withSource>
              <div className="w-[350px] border rounded-md">
                <AspectRatio objectFit="fill">
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </AspectRatio>
              </div>
            </Library.Demo>

            <Library.Demo title="objectFit:'scale-down'" withSource>
              <div className="w-[350px] border rounded-md">
                <AspectRatio objectFit="scale-down">
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </AspectRatio>
              </div>
            </Library.Demo>

            <Library.Demo title="objectFit:'none'" withSource>
              <div className="w-[350px] border rounded-md">
                <AspectRatio objectFit="none">
                  <img src="https://placekitten.com/400/400" alt="kitty" />
                </AspectRatio>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
