import { LinkButton } from '../../../../';
import Library from '../../Library';

export default function LinkButtonPage() {
  return (
    <Library.Page
      title="LinkButton"
      intro={
        <p>
          <code>LinkButton</code> is a presentational component that can be used
          to style a button to appear as a link.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="LinkButton" />
          <Library.Example>
            <Library.Demo title="Basic LinkButton" withSource>
              <LinkButton>Example of LinkButton</LinkButton>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <Library.Example title="color">
            <Library.Info>
              <Library.InfoItem label="status">
                <Library.StatusChip status="deprecated" /> Use{' '}
                <code>variant</code> prop instead.
              </Library.InfoItem>
              <Library.InfoItem label="description">
                Link <code>color</code> affects the color of link text
                (including hover color).
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{"'brand' | 'text' | 'text-light'"}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'brand'"}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Example title="inline">
            <Library.Info>
              <Library.InfoItem label="description">
                Style a <code>LinkButton</code> to lay out inline. Ignored if{' '}
                <code>unstyled</code> is set.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo withSource>
              <div className="flex flex-col gap-y-4">
                <p>
                  This is{' '}
                  <LinkButton underline="always">
                    a default LinkButton
                  </LinkButton>{' '}
                  with some text.
                </p>
                <p>
                  This is{' '}
                  <LinkButton underline="always" inline>
                    an inline LinkButton
                  </LinkButton>{' '}
                  with some text.
                </p>
              </div>
            </Library.Demo>
          </Library.Example>

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
                Control when underlines are applied to <code>LinkButton</code>s.
                Current default is <code>{"'none'"}</code>, but this will be
                changing in future. Links inline with text content should set{' '}
                <code>underline</code> to <code>{"'always'"}</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'none' | 'hover' | 'always'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'none'`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource>
              <div className="flex flex-col">
                <LinkButton underline="none">
                  Underline: none (default)
                </LinkButton>

                <LinkButton href="https://www.example.com" underline="hover">
                  Underline: hover
                </LinkButton>

                <LinkButton href="https://www.example.com" underline="always">
                  Underline: always
                </LinkButton>
                <p>
                  LinkButtons should be{' '}
                  <LinkButton underline="always" inline>
                    always underlined
                  </LinkButton>{' '}
                  when inline with text content.
                </p>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>LinkButton</code> accepts HTML attribute props applicable
                to <code>HTMLButtonElement</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{'preact.JSX.HTMLAttributes<HTMLButtonElement>'}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Styling API">
          <p>
            <code>LinkButton</code> accepts the following props from the{' '}
            <Library.Link href="/using-components#presentational-components-styling-api">
              presentational component styling API
            </Library.Link>
            .
          </p>
          <Library.Example title="variant">
            <Library.Info>
              <Library.InfoItem label="description">
                Set to <code>custom</code> to remove theming styles.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{"'brand' | 'text' | 'text-light' | 'custom'"}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'brand'"}</code>
              </Library.InfoItem>
            </Library.Info>

            <div className="m-8 grid grid-cols-4 gap-x-16 gap-y-4">
              <div className="row-span-2 self-end">
                <strong>variant</strong>
              </div>
              <div className="uppercase col-span-3 w-full text-center font-semibold border-b border-stone-300 pb-2 border-dashed">
                states
              </div>
              <div>
                <strong>default</strong>
              </div>
              <div>
                <strong>pressed</strong>
              </div>
              <div>
                <strong>disabled</strong>
              </div>

              <div className="col-span-4 border-b border-stone-300" />
              <div>
                <code>{`'brand'`}</code>
              </div>
              <LinkButton variant="brand">Link text</LinkButton>
              <LinkButton variant="brand" pressed>
                Link text
              </LinkButton>
              <LinkButton variant="brand" disabled>
                Link text
              </LinkButton>

              <div>
                <code>{`'text'`}</code>
              </div>
              <LinkButton variant="text">Link text</LinkButton>
              <LinkButton variant="text" pressed>
                Link text
              </LinkButton>
              <LinkButton variant="text" disabled>
                Link text
              </LinkButton>

              <div>
                <code>{`'text-light'`}</code>
              </div>
              <LinkButton variant="text-light">Link text</LinkButton>
              <LinkButton variant="text-light" pressed>
                Link text
              </LinkButton>
              <LinkButton variant="text-light" disabled>
                Link text
              </LinkButton>

              <div>
                <code>{`'custom'`}</code>
              </div>
              <LinkButton variant="custom">Link text</LinkButton>
              <LinkButton variant="custom" pressed>
                Link text
              </LinkButton>
              <LinkButton variant="custom" disabled>
                Link text
              </LinkButton>
            </div>
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
              <LinkButton unstyled>Unstyled LinkButton</LinkButton>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
