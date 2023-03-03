import {
  Button,
  Card,
  CardContent,
  EditIcon,
  ReplyIcon,
  CheckIcon,
  ScrollBox,
} from '../../../next';
import Library from '../Library';
import { SampleListElements } from './samples';

export default function UsingComponentsPage() {
  return (
    <Library.Page
      title="Using components"
      intro={
        <>
          <p>
            This package provides several categories of components. Which
            category a component belongs to defines its general role and the
            kinds of props it takes.
          </p>
          <ul>
            <li>
              <strong className="font-semibold">
                Presentational components
              </strong>{' '}
              are composable components that encapsulate design patterns and UI
              behavior, with limited styling customization
            </li>
            <li>
              <strong className="font-semibold">Base components</strong> are
              similar to presentational components but allow more styling
              flexibility
            </li>
            <li>
              <strong className="font-semibold">Composite components</strong>{' '}
              combine composable components and behavior to satisfy a particular
              use case
            </li>
            <li>
              <strong className="font-semibold">Simple components</strong> are
              opinionated, simple components that apply design patterns
            </li>
          </ul>
        </>
      }
    >
      <Library.Section
        title="Presentational components"
        intro={
          <p>
            <strong>Presentational components</strong> have a common props API
            and provide some flexibility for customization. Example:{' '}
            <code>Button</code>, <code>Link</code>.
          </p>
        }
      >
        <Library.Pattern title="Props API">
          <p>
            <strong>Presentational components</strong> take these common props
            unless documented otherwise:
          </p>
          <Library.Code
            size="sm"
            content={`/**
 * @typedef PresentationalProps
 * @prop {import('preact').ComponentChildren} [children]
 * @prop {string|string[]} [classes] - Optional extra CSS classes to append to the
 *   component's default classes
 * @prop {never} [className] - Use variants, props, base component (when
 *   available) or classes instead
 * @prop {import('preact').Ref<HTMLElement>} [elementRef] - Ref for component's
 *   outermost element.
 */
`}
            title="Common presentational-component props"
          />

          <p>
            Presentational components also take <strong>HTML attributes</strong>{' '}
            applicable to their primary element, typically the outermost element
            rendered by the component.
          </p>
        </Library.Pattern>
      </Library.Section>

      <Library.Section title="Base components">
        <p>
          <strong>Base components</strong> are similar to presentational
          components, but apply minimal styling. They are intended for use cases
          that require customization flexibility.
        </p>
        <p>
          Example: <code>ButtonBase</code>, <code>LinkBase</code>.
        </p>

        <p>
          By default, base components apply some core styling.{' '}
          <strong>Base styling might include</strong> things like basic layout
          (e.g. establishing a <code>flex</code> layout), focus rings,
          establishing transition properties (but not the property values of the
          transitioned properties) or preventing text from wrapping inside a
          button.
        </p>
        <p>
          However, <strong>base styling does not include</strong> things like
          colors, dimensions (padding, spacing, gaps, margins or sizing), text
          styling (size, style, weight, decoration) or borders.
        </p>
        <p>
          Alternately, base components can be configured to disable all base
          styles.
        </p>

        <Library.Pattern title="Props API">
          <p>
            <strong>Base components</strong> extend presentational component
            props with an optional boolean <code>unstyled</code> prop. When set,
            the component will have no styling at all, allowing for complete
            customization.
          </p>
        </Library.Pattern>
      </Library.Section>

      <Library.Section
        title="Composite components"
        intro={
          <>
            <p>
              <strong>Composite components</strong> compose and style
              presentational components in a particular way to satisfy a use
              case and sometimes support more nuanced or advanced behavior.
            </p>
            <p>
              Example: <code>ScrollBox</code>, <code>Panel</code>.
            </p>
          </>
        }
      >
        <Library.Pattern title="Props API">
          <p>
            <strong>Composite components</strong> accept the same common props
            as presentational components with the exception of{' '}
            <code>classes</code>.
          </p>
        </Library.Pattern>
      </Library.Section>

      <Library.Section
        title="Simple components"
        intro={
          <>
            <p>
              <strong>Simple components</strong> are opinionated, simple
              components that apply design patterns. They provide minimal, if
              any, options for customization.
            </p>
            <p>
              Example: <code>Spinner</code>.
            </p>
          </>
        }
      >
        <Library.Pattern title="Props API">
          Simple components only accept component-specific props.
        </Library.Pattern>
      </Library.Section>

      <Library.Section title="Working with components">
        <Library.Pattern title="Common prop conventions">
          <Library.Example title="variant">
            <p>
              Many components provide stylistic <strong>variants</strong>.
              Variants are mutually exclusive and may affect several different
              aspects of styling.
            </p>
            <p>
              In contrast, other props like <code>underline</code> or{' '}
              <code>size</code> impact a single aspect of styling and may be
              combined in various ways.
            </p>
            <Library.Demo
              title="Card variants, affecting shadows and hover effects"
              withSource
            >
              <Card variant="raised">
                <CardContent>
                  This is content inside of a <code>Card</code> with the
                  default, <code>raised</code> <code>variant</code>.
                </CardContent>
              </Card>

              <Card variant="flat">
                <CardContent>
                  This is content inside of a <code>Card</code> with the{' '}
                  <code>flat</code> <code>variant</code>.
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="size">
            <p>
              <code>size</code> takes size abbreviations (strings) as values and
              impacts spacing and padding. Typically, accepted values are{' '}
              <code>{"'sm', 'md', 'lg'"}</code>. Components generally inherit
              font sizing, unless documented otherwise.
            </p>
            <Library.Demo withSource>
              <Button icon={EditIcon} size="sm">
                Small (sm)
              </Button>
              <Button icon={ReplyIcon} size="md">
                Medium (md, default)
              </Button>
              <Button icon={CheckIcon} size="lg">
                Large (lg)
              </Button>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Boolean props">
            <p>
              Boolean props are named for their truthy state. For example,{' '}
              <code>ScrollBox</code> has borders by default. Thus the associated
              boolean prop to disable them is named <code>borderless</code> (not{' '}
              <code>border={'{false}'}</code>).
            </p>
            <Library.Demo title="Turning off borders on a ScrollBox" withSource>
              <div className="w-[280px] h-[200px]">
                <ScrollBox borderless>
                  <ul>
                    <SampleListElements />
                  </ul>
                </ScrollBox>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Inspecting and debugging components">
          <p>
            To aid with in-browser inspecting, all components add a{' '}
            <code>data-component</code> and, sometimes, a{' '}
            <code>data-composite-component</code> attribute to their outermost
            elements.
          </p>
          <Library.Example title="data-component">
            <p>
              Presentational and simple components set{' '}
              <code>data-component</code> only.
            </p>
            <Library.Code
              content={
                <div
                  /* eslint-disable-next-line react/no-unknown-property */
                  class="rounded-sm border bg-white shadow hover:shadow-md w-full"
                  data-component="Card"
                />
              }
              size="sm"
              title="Rendered outer div for Card"
            />
          </Library.Example>

          <Library.Example title="data-composite-component">
            <p>
              Composite components set <code>data-composite-component</code>.
              For example, the outermost element of <code>Panel</code> is both a{' '}
              <code>Card</code> (<code>data-component</code>) and a{' '}
              <code>Panel</code> (<code>data-composite-component</code>).
            </p>
            <Library.Code
              content={
                <div
                  /* eslint-disable-next-line react/no-unknown-property */
                  class="rounded-sm border bg-white shadow hover:shadow-md w-full"
                  data-component="Card"
                  data-composite-component="Panel"
                />
              }
              size="sm"
              title="Rendered outer div for Panel"
            />
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
