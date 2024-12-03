import { AspectRatio, FileImageIcon, Link } from '../../../../';
import Library from '../../Library';

export default function AspectRatioPage() {
  return (
    <Library.Page
      title="AspectRatio"
      intro={
        <p>
          <code>AspectRatio</code> is a simple component that controls the
          aspect ratio of its first direct child, with a default ratio of 16:9.
        </p>
      }
    >
      <Library.Section>
        <Library.SectionL2>
          <Library.Usage componentName="AspectRatio" />
          <Library.SectionL3>
            <Library.Demo title="Basic AspectRatio" withSource>
              <div className="w-[350px]">
                <AspectRatio>
                  <img src="https://placehold.co/400x400" alt="placeholder" />
                </AspectRatio>
              </div>
            </Library.Demo>
          </Library.SectionL3>
        </Library.SectionL2>
        <Library.Section title="Working with AspectRatio">
          <Library.SectionL3 title="Placeholder content">
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
          </Library.SectionL3>
          <Library.SectionL3 title="Fitting and positioning content">
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
                    src="https://placehold.co/400x400"
                    alt="placeholder"
                    className="object-top"
                  />
                </AspectRatio>
              </div>
            </Library.Demo>
          </Library.SectionL3>
        </Library.Section>
        <Library.Section title="Component API">
          <Library.SectionL3 title="children">
            <Library.Info>
              <Library.InfoItem label="description">
                Either the{' '}
                <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element">
                  replaced element
                </Link>{' '}
                to be sized or placeholder content in a container.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>preact.ComponentChildren</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
          <Library.SectionL3 title="ratio">
            <Library.Info>
              <Library.InfoItem label="description">
                Set the aspect ratio for the content
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string</code> Any numeric string that can be used in a CSS{' '}
                <code>calc()</code> expression
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'16/9'"}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
          <Library.SectionL3 title="objectFit">
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
            <Library.Demo title="objectFit:'cover' (default)" withSource>
              <div className="w-[350px] border rounded-md">
                <AspectRatio objectFit="cover">
                  <img src="https://placehold.co/400x400" alt="placeholder" />
                </AspectRatio>
              </div>
            </Library.Demo>

            <Library.Demo title="objectFit:'contain'" withSource>
              <div className="w-[350px] border rounded-md">
                <AspectRatio objectFit="contain">
                  <img src="https://placehold.co/400x400" alt="placeholder" />
                </AspectRatio>
              </div>
            </Library.Demo>

            <Library.Demo title="objectFit:'fill'" withSource>
              <div className="w-[350px] border rounded-md">
                <AspectRatio objectFit="fill">
                  <img src="https://placehold.co/400x400" alt="placeholder" />
                </AspectRatio>
              </div>
            </Library.Demo>

            <Library.Demo title="objectFit:'scale-down'" withSource>
              <div className="w-[350px] border rounded-md">
                <AspectRatio objectFit="scale-down">
                  <img src="https://placehold.co/400x400" alt="placeholder" />
                </AspectRatio>
              </div>
            </Library.Demo>

            <Library.Demo title="objectFit:'none'" withSource>
              <div className="w-[350px] border rounded-md">
                <AspectRatio objectFit="none">
                  <img src="https://placehold.co/400x400" alt="placeholder" />
                </AspectRatio>
              </div>
            </Library.Demo>
          </Library.SectionL3>
        </Library.Section>
      </Library.Section>
    </Library.Page>
  );
}
