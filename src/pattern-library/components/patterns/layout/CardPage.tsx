import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardActions,
} from '../../../../';
import { Button, EditIcon } from '../../../../';
import Library from '../../Library';
import { LoremIpsum } from '../samples';

export default function CardPage() {
  return (
    <Library.Page
      title="Card"
      intro={
        <p>
          The <code>Card</code> family of presentational components provide
          support for laying out content in a card-like interface.
        </p>
      }
    >
      <Library.Section
        title="Card"
        intro={
          <p>
            <code>Card</code> lays out content in a frame, with dimensional
            shadows by default.
          </p>
        }
      >
        <Library.Pattern>
          <Library.Usage componentName="Card, CardContent" />
          <Library.Example>
            <Library.Demo title="Basic Card" withSource>
              <Card>
                <CardContent>
                  <LoremIpsum size="xs" />
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Working with Cards">
          <Library.Example title="Full-width content">
            <p>
              You can add full-bleed content by placing it outside of the{' '}
              <code>CardContent</code> component.
            </p>
            <Library.Demo title="Card with full-width image" withSource>
              <Card>
                <img
                  className="rounded-t-lg"
                  src="https://placekitten.com/1000/250"
                  alt="kitty"
                />
                <CardContent>
                  <LoremIpsum size="xs" />
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <code>Card</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.Example title="active">
            <Library.Info>
              <Library.InfoItem label="description">
                Style the card as if it is hovered or otherwise active.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`boolean`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`false`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="active Card" withSource>
              <Card active>
                <CardContent>
                  <LoremIpsum size="xs" />
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="variant">
            <Library.Info>
              <Library.InfoItem label="description">
                Set the <code>Card</code> theming.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'raised' | 'flat'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`raised`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="raised" withSource>
              <Card variant="raised">
                <CardContent>
                  <p>
                    The default {`"raised"`} variant has dimensional effects on
                    hover.
                  </p>
                </CardContent>
              </Card>
            </Library.Demo>

            <Library.Demo title="flat" withSource>
              <Card variant="flat">
                <CardContent>
                  <p>
                    The {`"flat"`} variant does not have dimensional effects.
                  </p>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="width">
            <Library.Info>
              <Library.InfoItem label="description">
                Define how the {`card's`} width is set. Provide width{' '}
                <code>classes</code> when setting <code>width</code> to{' '}
                <code>{`'custom'`}</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'full' | 'auto' | 'custom'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'full'`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="full width" withSource>
              <Card width="full">
                <CardContent>
                  By default, a card will use the full width of its container.
                </CardContent>
              </Card>
            </Library.Demo>

            <Library.Demo title="auto width" withSource>
              <Card width="auto">
                <CardContent>
                  Setting width to <em>auto</em>.
                </CardContent>
              </Card>
            </Library.Demo>

            <Library.Demo title="custom width with extra classes" withSource>
              <Card classes="w-[400px]" width="custom">
                <CardContent>
                  <p>Sized to 400 px.</p>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Card</code> accepts HTML attributes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>

      <Library.Section
        title="CardContent"
        intro={
          <p>
            <code>CardContent</code> puts consistent padding and spacing around
            content in a <code>Card</code> component.
          </p>
        }
      >
        <Library.Pattern>
          <Library.Usage componentName="Card, CardContent" />
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <code>CardContent</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.Example title="size">
            <Library.Info>
              <Library.InfoItem label="description">
                Set relative spacing and padding.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'sm' | 'md' | 'lg'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'md'`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource>
              <div className="space-y-3">
                <Card>
                  <CardContent size="sm">
                    <div>
                      <code>CardContent</code> component with{' '}
                      <strong>
                        <code>size={"'sm'"}</code>
                      </strong>
                      .
                    </div>
                    <LoremIpsum size="xs" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent size="md">
                    <div>
                      <code>CardContent</code> component with{' '}
                      <strong>
                        <code>size={"'md'"}</code>
                      </strong>
                      .
                    </div>
                    <LoremIpsum size="xs" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent size="lg">
                    <div>
                      <code>CardContent</code> component with{' '}
                      <strong>
                        <code>size={"'lg'"}</code>
                      </strong>
                      .
                    </div>
                    <LoremIpsum size="xs" />
                  </CardContent>
                </Card>
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>CardContent</code> accepts HTML attributes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>

      <Library.Section
        title="CardHeader"
        intro={
          <p>
            <code>CardHeader</code> renders a styled title and an optional close
            button on a <code>Card</code>.
          </p>
        }
      >
        <Library.Pattern>
          <Library.Usage
            componentName="Card, CardContent, CardHeader"
            size="sm"
          />

          <Library.Example>
            <Library.Demo withSource title="Basic CardHeader">
              <Card>
                <CardHeader title="Card title" />
                <CardContent>
                  <div>
                    A <code>Card</code> with <code>CardHeader</code>.
                  </div>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <code>CardHeader</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.Example title="title">
            <Library.Info>
              <Library.InfoItem label="description">
                Render a <code>CardTitle</code> with this title string in the{' '}
                <code>CardHeader</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`string`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource title="With a `title`">
              <Card>
                <CardHeader title="Card title" onClose={() => {}} />
                <CardContent>
                  <div>
                    A <code>Card</code> with <code>CardHeader</code>.
                  </div>
                </CardContent>
              </Card>
            </Library.Demo>

            <Library.Demo withSource title="Composed with `CardTitle`">
              <Card>
                <CardHeader onClose={() => {}}>
                  <CardTitle>Title here</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    A <code>Card</code> with <code>CardHeader</code>.
                  </div>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="onClose">
            <Library.Info>
              <Library.InfoItem label="description">
                Callback to request that the card close. When provided, a close
                button will be rendered.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`() => void`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource>
              <Card>
                <CardHeader
                  title="This card can be closed"
                  onClose={() => alert('you clicked it')}
                />
                <CardContent>
                  <div>
                    Passing an <code>onClose</code> function to{' '}
                    <code>CardHeader</code> will add a close button.
                  </div>
                </CardContent>
              </Card>
            </Library.Demo>

            <Library.Demo title="Close button sizing" withSource>
              <div className="text-[13px] w-full">
                <Card>
                  <CardHeader onClose={() => alert('you clicked it')}>
                    <h3 className="text-brand font-semibold">
                      Custom title styling
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div>
                      The close button will always have the same size,
                      regardless of local font size. Here, font size is{' '}
                      <code>13px</code>, echoing the client application base
                      font size, but the close button remains the same size.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="fullWidth">
            <Library.Info>
              <Library.InfoItem label="description">
                Ensure that the header divider (border) spans the full width of
                the card. This can be helpful when the card content scrolls.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`boolean`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`false`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo
              title="Making a CardHeader span the full width"
              withSource
            >
              <Card>
                <CardHeader
                  title="Full-width header"
                  onClose={() => alert('you clicked it')}
                  fullWidth
                />
                <CardContent>
                  <div>
                    A <code>Card</code> with <code>CardHeader</code>.
                  </div>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="variant">
            <Library.Info>
              <Library.InfoItem label="description">
                Define which theme to use for <code>CardHeader</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`{'primary' | 'secondary'}`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'primary'`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="primary" withSource>
              <Card>
                <CardHeader
                  variant="primary"
                  title="Primary variant"
                  onClose={() => {}}
                />
                <CardContent>
                  <p>
                    This {"Card's"} <code>CardHeader</code> is styled with the{' '}
                    <code>primary</code> (default) variant.
                  </p>
                </CardContent>
              </Card>
            </Library.Demo>
            <Library.Demo title="secondary" withSource>
              <Card>
                <CardHeader
                  variant="secondary"
                  onClose={() => {}}
                  title="Secondary variant"
                />
                <CardContent>
                  <p>
                    This {"Card's"} <code>CardHeader</code> is styled with the{' '}
                    <code>secondary</code> variant.
                  </p>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>CardHeader</code> accepts HTML attributes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>

      <Library.Section
        title="CardTitle"
        intro={
          <p>
            <code>CardTitle</code> styles a heading element in a{' '}
            <code>CardHeader</code>.
          </p>
        }
      >
        <Library.Pattern>
          <Library.Usage
            componentName="Card, CardContent, CardHeader, CardTitle"
            size="sm"
          />
          <Library.Demo title="Setting title with CardTitle" withSource>
            <Card>
              <CardHeader>
                <EditIcon />
                <CardTitle>Card title</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  Using <code>CardTitle</code> in a <code>CardHeader</code>.
                  This allows for other custom content in the{' '}
                  <code>CardHeader</code>.
                </div>
              </CardContent>
            </Card>
          </Library.Demo>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <code>CardTitle</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.Example title="tagName">
            <Library.Info>
              <Library.InfoItem label="description">
                Which heading element to use for the title
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'h1' | 'h2' | 'h3' | 'h4' | 'h5'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'h1'`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="tagName = 'h3'" withSource>
              <Card>
                <CardHeader>
                  <EditIcon />
                  <CardTitle tagName="h3">Card title</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Setting a different heading level (HTML tag) in a{' '}
                    <code>CardTitle</code>.
                  </p>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="variant">
            <Library.Info>
              <Library.InfoItem label="description">
                Define which theme to use for <code>CardTitle</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`{'primary' | 'secondary'}`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'primary'`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="primary" withSource>
              <Card>
                <CardHeader>
                  <CardTitle variant="primary">Card title</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    This <code>CardTitle</code> uses the default{' '}
                    <code>{"'primary'"}</code> variant.
                  </p>
                </CardContent>
              </Card>
            </Library.Demo>

            <Library.Demo title="secondary" withSource>
              <Card>
                <CardHeader>
                  <CardTitle variant="secondary">Card title</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    This <code>CardTitle</code> uses the
                    <code>{"'secondary'"}</code> variant.
                  </p>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>CardTitle</code> accepts HTML attributes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>

      <Library.Section
        title="CardActions"
        intro={
          <p>
            Use <code>CardActions</code> to render a group of buttons in a{' '}
            <code>Card</code>.
          </p>
        }
      >
        <Library.Pattern>
          <Library.Usage
            componentName="Card, CardContent, CardHeader, CardActions"
            size="sm"
          />
          <Library.Example>
            <Library.Demo title="Card with actions" withSource>
              <Card>
                <CardHeader title="This card has some actions" />
                <CardContent>
                  <LoremIpsum size="xs" />
                  <CardActions>
                    <Button>Cancel</Button>
                    <Button variant="primary">Do it</Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <code>CardActions</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>CardActions</code> accepts HTML attributes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
