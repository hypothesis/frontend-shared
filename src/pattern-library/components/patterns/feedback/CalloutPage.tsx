import { Callout, ProfileIcon } from '../../../../';
import Library from '../../Library';

export default function CalloutPage() {
  return (
    <Library.Page
      title="Callout"
      intro={
        <p>
          Callout is a presentational component that can be used for alerts,
          banners or toast messages.
        </p>
      }
      apiReference="functions/Callout"
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="Callout" />
          <Library.Example>
            <Library.Demo withSource title="Basic Callout">
              <div className="flex flex-col gap-y-4">
                <Callout status="notice">
                  A callout with (default) notice status.
                </Callout>
                <Callout status="success">
                  A callout with a success message.
                </Callout>
                <Callout status="error">
                  A callout with an error message.
                </Callout>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <p>
            <code>Callout</code> accepts all standard{' '}
            <Library.Link href="/using-components#presentational-components-api">
              presentational component props
            </Library.Link>
            .
          </p>

          <Library.Example title="icon">
            <Library.Info>
              <Library.InfoItem label="description">
                Custom icon to display in callout.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`IconComponent`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="Callout with custom icon" withSource>
              <Callout icon={ProfileIcon} status="success">
                This callout has a custom icon
              </Callout>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="status">
            <Library.Info>
              <Library.InfoItem label="description">
                Will theme the callout with an appropriate icon and coloring
                (unless overridden by the <code>icon</code> prop or Styling API
                props).
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'notice' | 'success' | 'error'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'notice'`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Callout</code> accepts HTML attribute props applicable to{' '}
                <code>HTMLElement</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`Omit<JSX.HTMLAttributes<HTMLElement>, 'size' | 'icon'>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Styling API">
          <p>
            <code>Callout</code> accepts the following props from the{' '}
            <Library.Link href="/using-components#presentational-components-styling-api">
              presentational component styling API
            </Library.Link>
            .
          </p>

          <Library.Example title="variant">
            <Library.Info>
              <Library.InfoItem label="description">
                Set the <code>Callout</code> theming.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'outlined' | 'raised' | 'custom'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'outlined'`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="Callout variants" withSource>
              <div className="flex flex-col gap-y-4">
                <Callout variant="outlined">
                  This is an <strong>outlined</strong> (default) callout.
                </Callout>
                <Callout variant="raised">
                  This is a <strong>raised</strong> callout, which provides
                  dimensionality and interactive cursor.
                </Callout>
              </div>
            </Library.Demo>

            <Library.Demo title="Callout with custom variant" withSource>
              <Callout variant="custom">
                Note that no icon is rendered when variant is{' '}
                <code>{`'custom'`}</code>.
              </Callout>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="size">
            <Library.Info>
              <Library.InfoItem label="description">
                Set the relative internal sizing of the callout. Set to{' '}
                <code>{`'custom'`}</code> to disable sizing classes and set your
                own with <code>classes</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'sm' | 'md' | 'lg' | 'custom'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'md'`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="Callout sizes" withSource>
              <div className="flex flex-col gap-y-4">
                <Callout status="success" size="sm">
                  A callout with a small size.
                </Callout>
                <Callout status="success" size="md">
                  A callout with a medium size.
                </Callout>
                <Callout status="success" size="lg">
                  A callout with a large size.
                </Callout>

                <Callout status="success" size="custom" classes="p-4">
                  Note that no icon is rendered if size is{' '}
                  <code>{`'custom'`}</code>
                </Callout>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="unstyled">
            <Library.Info>
              <Library.InfoItem label="description">
                Set this to disable all styling and provide your own styling
                with <code>classes</code>. No icon will be rendered.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
