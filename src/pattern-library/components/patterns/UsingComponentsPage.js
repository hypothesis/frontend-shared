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

import Next from '../LibraryNext';

import { SampleListElements } from './samples';

export default function UsingComponentsPage() {
  return (
    <Library.Page
      title="Using components"
      intro={<p>This guide applies to updated ({'"next"'}) components only.</p>}
    >
      <Library.Pattern title="Component categories">
        <ul>
          <li>
            <strong>Simple components</strong>: Opinionated, simple components
            that apply design patterns. Example: <code>Spinner</code>.
          </li>
          <li>
            <strong>Presentational components</strong>: Composable components
            with customization flexibility. Example: <code>Button</code>,{' '}
            <code>Link</code>.
          </li>
          <li>
            <strong>Composite components</strong>: These components are
            combinations of presentational components arranged and styled in a
            particular way to satisfy a use case. Example:{' '}
            <code>ScrollBox</code>.
          </li>
        </ul>
      </Library.Pattern>
      <Library.Pattern title="Component API">
        <p>The props accepted by a component combine:</p>
        <ul>
          <li>
            <strong>Common props</strong> available to all components in its
            category
          </li>
          <li>
            <strong>Specific props</strong> for the component
          </li>
        </ul>

        <p>
          Documentation pages for components cover the props specific to the
          component, and call out any deviation of the component from its{' '}
          {"category's"} common props.
        </p>
      </Library.Pattern>

      <Library.Pattern title="Common props API">
        <Library.Example title="Presentational components">
          <p>
            <strong>Presentational components</strong> take these common props
            unless documented otherwise:
          </p>
          <Next.Code
            size="sm"
            content={`/**
 * @typedef PresentationalProps
 * @prop {import('preact').ComponentChildren} [children]
 * @prop {string|string[]} [classes] - Optional extra CSS classes to append to the
 *   component's default classes
 * @prop {never} [className] - Use variants, props, unstyled component (when
 *   available) or classes instead
 * @prop {import('preact').Ref<HTMLElement>} [elementRef] - Ref for component's
 *   outermost element.
 */
`}
            title="Common presentational-component props"
          />

          <p>
            Presentational components also take <strong>HTML attributes</strong>{' '}
            applicable to their outermost element.
          </p>
        </Library.Example>
        <Library.Example title="Composite components">
          <p>
            <strong>Composite components</strong> accept the same common props
            as presentational components with the exception of{' '}
            <code>classes</code>.
          </p>
        </Library.Example>

        <Library.Example title="Simple components">
          <p>
            <strong>Simple components</strong> take only documented,
            component-specific props.
          </p>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Other prop conventions">
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
                This is content inside of a <code>Card</code> with the default,{' '}
                <code>raised</code> <code>variant</code>.
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
            <code>{"'sm', 'md', 'lg'"}</code>. Components generally inherit font
            sizing, unless documented otherwise.
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
            Presentational and simple components set <code>data-component</code>{' '}
            only.
          </p>
          <Next.Code
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
            Composite components set <code>data-composite-component</code>. For
            example, the outermost element of <code>Panel</code> is both a{' '}
            <code>Card</code> (<code>data-component</code>) and a{' '}
            <code>Panel</code> (<code>data-composite-component</code>).
          </p>
          <Next.Code
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
    </Library.Page>
  );
}
