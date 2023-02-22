import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardActions,
} from '../../../../next';
import { Button, EditIcon } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

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
        <Library.Pattern title="Status">
          <p>
            <code>Card</code> is a re-implementation of a legacy component of
            the same name. <code>CardContent</code>, <code>CardHeader</code>,{' '}
            <code>CardTitle</code> and <code>CardActions</code> are new
            components.
          </p>

          <Library.Example title="Migrating to this component (Card)">
            <Next.Changelog>
              <Next.ChangelogItem status="breaking">
                <code>Card</code> no longer provides padding or spacing around
                content. Use <code>Card</code> in combination with{' '}
                <code>CardContent</code> for spacing.
              </Next.ChangelogItem>
              <Next.ChangelogItem status="breaking">
                <code>Card</code> no longer provides styling for the{' '}
                <code>clean</code> theme. Use <code>classes</code> to apply
                theme styles.
              </Next.ChangelogItem>
              <Next.ChangelogItem status="breaking">
                <code>Card</code> no longer provides styling for the{' '}
                <code>.is-focused</code> class. Use the <code>active</code> prop
                instead.
              </Next.ChangelogItem>
              <Next.ChangelogItem status="breaking">
                Prop name:{' '}
                <s>
                  <code>containerRef</code>
                </s>{' '}
                ➜ <code>elementRef</code>
              </Next.ChangelogItem>
              <Next.ChangelogItem status="added">
                <code>variant:</code> <code>raised</code> (default) or{' '}
                <code>flat</code>. The <code>flat</code> variant disables any
                dimensionality or shadows.
              </Next.ChangelogItem>
              <Next.ChangelogItem status="added">
                <code>active</code> (boolean): Sets hover-style shadows on{' '}
                <code>Card</code>. Must be combined with <code>raised</code>{' '}
                variant.
              </Next.ChangelogItem>
            </Next.Changelog>
          </Library.Example>
        </Library.Pattern>
        <Library.Pattern title="Usage">
          <Next.Usage componentName="Card, CardContent" />
          <Library.Example>
            <Library.Demo title="Basic Card with CardContent" withSource>
              <Card>
                <CardContent>
                  <LoremIpsum size="xs" />
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <p>
            By default, <code>Card</code> has some dimensional effects that
            intensify on hover. These can be disabled by using the{' '}
            <code>flat</code> variant.
          </p>
          <Library.Example title="variant">
            <Library.Demo title="variant: 'raised' (default)" withSource>
              <Card variant="raised">
                <CardContent>
                  <LoremIpsum size="xs" />
                </CardContent>
              </Card>
            </Library.Demo>

            <Library.Demo title="variant: 'flat'" withSource>
              <Card variant="flat">
                <CardContent>
                  <LoremIpsum size="xs" />
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="active">
            <p>
              Setting the <code>active</code> boolean prop will apply styles as
              if the <code>Card</code> is hovered.
            </p>
            <Library.Demo title="active: true" withSource>
              <Card active>
                <CardContent>
                  <LoremIpsum size="xs" />
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="width">
            <Library.Demo title="width: 'full' (default)" withSource>
              <Card width="full">
                <CardContent>
                  <LoremIpsum size="xs" />
                </CardContent>
              </Card>
            </Library.Demo>

            <Library.Demo title="width: 'auto'" withSource>
              <Card width="auto">
                <CardContent>
                  <p>Sizes itself to content automatically.</p>
                </CardContent>
              </Card>
            </Library.Demo>

            <p>
              The <code>custom</code> width value allows the author to set width
              with the <code>classes</code> prop.
            </p>
            <Library.Demo title="width: 'custom'" withSource>
              <Card classes="w-[400px]" width="custom">
                <CardContent>
                  <p>Sized to 400 px.</p>
                </CardContent>
              </Card>
            </Library.Demo>
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
        <Library.Pattern title="Usage">
          <Next.Usage componentName="Card, CardContent" />

          <Library.Example title="Laying out Card content">
            <Library.Demo title="Card with CardContent" withSource>
              <Card>
                <CardContent>
                  <LoremIpsum size="xs" />
                </CardContent>
              </Card>
            </Library.Demo>

            <Library.Demo title="Full-width Card content" withSource>
              <Card>
                <img src="https://placekitten.com/1000/250" alt="kitty" />
                <CardContent>
                  You can add full-bleed content by placing it outside of the{' '}
                  <code>CardContent</code> component.
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="size">
            <p>
              The <code>size</code> prop (<em>default</em> <code>md</code>)
              adjusts relative padding and spacing in <code>CardContent</code>.
            </p>

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
        <Library.Pattern title="Usage">
          <Next.Usage componentName="Card, CardContent, CardHeader" size="sm" />
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="title">
            <Library.Demo title="Setting a title" withSource>
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

          <Library.Example title="onClose">
            <p>
              Passing a function to the <code>onClose</code> prop will render a
              close button.
            </p>
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
          </Library.Example>

          <Library.Example title="fullWidth">
            <p>
              In some cases, it might be desirable for the{' '}
              <code>CardHeader</code> and its border to span the full width of
              the <code>Card</code>.
            </p>
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
        </Library.Pattern>
      </Library.Section>

      <Library.Section
        title="CardTitle"
        intro={
          <p>
            Using <code>CardTitle</code> allows for more layout flexibility in{' '}
            <code>CardHeader</code>.
          </p>
        }
      >
        <Library.Pattern title="Usage">
          <Next.Usage
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
        <Library.Pattern title="Usage">
          <Next.Usage
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
      </Library.Section>
    </Library.Page>
  );
}
