import { Link } from '../../../../';
import Library from '../../Library';

export default function LinkPage() {
  return (
    <Library.Page
      title="Link"
      intro={
        <p>
          <code>Link</code> is a presentational component that provides styling
          and common behavior for anchor (<code>a</code>) elements.
        </p>
      }
    >
      <Library.Section title="Link">
        <Library.Pattern>
          <Library.Usage componentName="Link" />
          <Library.Example>
            <Library.Demo title="Basic Link" withSource>
              <Link href="https://www.example.com">A link to a website</Link>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <code>Link</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.Example title="underline">
            <div className="m-4">
              <Library.Callout>
                <strong>Note</strong> The <code>underline</code> prop is likely
                to be removed in future and underlining will be controlled with
                a styling-API prop. This prop is ignored if{' '}
                <code>unstyled</code> is set (in which case, no underline
                styling will be applied).
              </Library.Callout>
            </div>
            <Library.Info>
              <Library.InfoItem label="description">
                Control when underlines are applied to links. Current default is{' '}
                <code>{"'none'"}</code>, but this will be changing in future.
                Links inline with text content should set <code>underline</code>{' '}
                to <code>{"'always'"}</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{"'none' | 'hover' | 'always'"}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'none'"}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource>
              <div className="flex flex-col">
                <Link href="https://www.example.com" underline="none">
                  Link with underline: none
                </Link>
                <Link href="https://www.example.com" underline="hover">
                  Link with underline: hover
                </Link>
                <Link href="https://www.example.com" underline="always">
                  Link with underline: always
                </Link>
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Link</code> accepts HTML attribute props applicable to{' '}
                <code>HTMLAnchorElement</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{'preact.JSX.HTMLAttributes<HTMLAnchorElement>'}</code>
              </Library.InfoItem>
              <Library.InfoItem label="example">
                <Library.Code
                  content={`<Link id="my-own-id" href="https://www.example.com">A Link with attributes</Link>`}
                  size="sm"
                />
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Styling API">
          <p>
            <code>Link</code> accepts the following props from the{' '}
            <Library.Link href="/using-components#presentational-components-styling-api">
              presentational component styling API
            </Library.Link>
            .
          </p>
          <Library.Example title="variant" id="styling-api-variant">
            <Library.Info>
              <Library.InfoItem label="description">
                Link <code>variant</code>s affect the color of link text
                (including hover color). Set to <code>custom</code> to remove
                theming styles.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{"'brand' | 'text' | 'text-light' | 'custom'"}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'brand'"}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource>
              <div className="flex flex-col">
                <Link href="https://www.example.com" variant="brand">
                  Variant: brand (default)
                </Link>
                <Link href="https://www.example.com" variant="text">
                  Variant: text
                </Link>
                <Link href="https://www.example.com" variant="text-light">
                  Variant: text-light
                </Link>
                <Link href="https://www.example.com" variant="custom">
                  Variant: custom
                </Link>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="unstyled">
            <Library.Info>
              <Library.InfoItem label="description">
                Set to remove all styling.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource>
              <Link href="https://www.example.com" unstyled>
                Unstyled Link
              </Link>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
