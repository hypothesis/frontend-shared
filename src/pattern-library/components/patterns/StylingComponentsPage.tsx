import { Link } from '../../../';
import Library from '../Library';

export default function StylingComponentsPage() {
  return (
    <Library.Page
      title="Styling components"
      intro={
        <>
          <p>
            The{' '}
            <Library.Link href="/using-components#presentational-components-styling-api">
              styling API
            </Library.Link>{' '}
            supported by some presentational components provides several
            mechanisms for style customizations.
          </p>
        </>
      }
    >
      <Library.Section title="Using the Styling API">
        <Library.Callout>
          This documentation pertains to updated presentational components that
          support the extended{' '}
          <Library.Link href="/using-components#presentational-components-styling-api">
            Styling API
          </Library.Link>
          . For components that {"don't"} yet support this API, you can achieve
          most style customization using the <code>classes</code> prop, but may
          need to use <code>!important</code> rules in some cases to avoid
          conflicts.
        </Library.Callout>
        <Library.Section title="Component CSS layers and associated styling props">
          <div className="grid grid-cols-6 gap-2 my-8 items-center border py-4 px-2 rounded border-stone-400">
            <div />
            <div className="col-span-4 border rounded p-3 text-center">
              Functional and behavioral
            </div>
            <div />
            <div className="text-right">
              <code>unstyled</code>
            </div>
            <div className="col-span-4 border rounded p-3 text-center">
              Core and layout
            </div>
            <div />
            <div className="text-right">
              <code>variant</code>
            </div>
            <div className="col-span-2 border rounded p-3 text-center">
              Theming
            </div>
            <div className="col-span-2 border rounded p-3 text-center">
              Dimensions
            </div>
            <div>
              <code>size</code>
            </div>
          </div>
          <ul>
            <li>
              Some components have foundational{' '}
              <strong>functional and behavioral CSS</strong> that cannot be
              disabled, e.g. interactivity, accessibility rules.
            </li>
            <li>
              <strong>Core and layout</strong> styling can be disabled with the{' '}
              <code>unstyled</code> prop. This will also disable theming and
              dimensional (sizing) styles, allowing full visual customization.
            </li>
            <li>
              <strong>Theming</strong> can be controlled or disabled with the{' '}
              <code>variant</code> prop.
            </li>
            <li>
              <strong>Dimensions</strong> and sizing can be controlled or
              disabled with the <code>size</code> prop.
            </li>
          </ul>
        </Library.Section>

        <Library.Section title="Theming with variant">
          <p>
            Many presentational components provide <code>variant</code> options,
            which apply different defined {'"themes"'} to the component.
          </p>
          <Library.Demo title="Variant examples: Link" withSource>
            <div className="flex flex-col">
              <Link href="https://www.example.com" variant="brand">
                Link with variant: brand
              </Link>
              <Link href="https://www.example.com" variant="text">
                Link with variant: text
              </Link>
            </div>
          </Library.Demo>

          <Library.Section title="Adjusting theming with the 'custom' variant">
            <p>
              Set <code>variant</code> to <code>{"'custom'"}</code> when:
            </p>
            <ul>
              <li>
                the component you are working takes a<code>variant</code> prop
                (not all components have variants), <strong>and</strong>
              </li>
              <li>
                you want to apply CSS (<code>classes</code>) that are in any of
                the theme-styling categories below
              </li>
            </ul>

            <p>
              Styles for dimensions (size) and core layout will still be
              applied.
            </p>

            <Library.Demo title="Customizing Link theming" withSource>
              <Link
                href="https://www.example.com"
                variant="custom"
                classes="text-blue-focus hover:text-grey-7"
              >
                Link with custom theming of text color
              </Link>
            </Library.Demo>

            <Library.Section title="Theme styling categories">
              <p>
                <code>variant</code> styles correspond to the following{' '}
                <Link href="https://tailwindcss.com/docs">TailwindCSS</Link>{' '}
                styling categories:
              </p>
              <ul>
                <li>typography (includes colors)</li>
                <li>backgrounds</li>
                <li>borders (except ring)</li>
                <li>effects</li>
                <li>filters</li>
                <li>transitions and animation</li>
                <li>transforms</li>
              </ul>
            </Library.Section>

            <Library.Section title="Avoiding CSS conflicts">
              <p>
                Setting <code>variant</code> to <code>{"'custom'"}</code>{' '}
                ensures that the component does not output any theme-related
                styles. This prevents CSS conflicts with your theming{' '}
                <code>classes</code> and makes it easier to spot when a
                component has had its theme customized.
              </p>

              <Library.Demo title="Example: variant styles conflict" withSource>
                <Link
                  href="https://www.example.com"
                  variant="text"
                  classes="text-brand"
                  underline="always"
                >
                  This link should be red
                </Link>
              </Library.Demo>

              <Library.Demo
                title="Example: Using `custom` variant to avoid conflicts"
                withSource
              >
                <Link
                  href="https://www.example.com"
                  variant="custom"
                  classes="text-brand"
                  underline="always"
                >
                  This link should be red
                </Link>
              </Library.Demo>
            </Library.Section>
          </Library.Section>
        </Library.Section>

        <Library.Section title="Sizing with `size`">
          <Library.Section title="When to use size='custom'">
            <p>
              Set <code>size</code> to <code>{"'custom'"}</code> when:
            </p>
            <ul>
              <li>
                the component you are working takes a<code>size</code> prop (not
                all components have sizes), <strong>and</strong>
              </li>
              <li>
                you want to apply <code>classes</code> that are in any of the
                sizing categories below
              </li>
            </ul>
            <p>
              Setting <code>size</code> to <code>{"'custom'"}</code> ensures
              that the component does not output any size-related styles. This
              prevents CSS conflicts with your sizing <code>classes</code> and
              makes it easier to spot when a component has had its theme
              customized.
            </p>
          </Library.Section>
          <Library.Section title="Size styling categories">
            <p>
              <code>size</code> styles correspond to the following{' '}
              <Link href="https://tailwindcss.com/docs">TailwindCSS</Link>{' '}
              styling categories:
            </p>
            <ul>
              <li>spacing: margins, padding, etc.</li>
              <li>sizing</li>
              <li>flexbox and grid: gap (only)</li>
            </ul>
          </Library.Section>
        </Library.Section>

        <Library.Section title="Unstyled components">
          <p>
            <code>unstyled</code> (<code>boolean</code>) disables all styles in
            a component (except, in some cases, essential behavioral styles
            required for component functionality).
          </p>
          <Library.Demo title="Fully-customized Link using unstyled" withSource>
            <Link
              unstyled
              href="http://www.example.com"
              classes="border rounded bg-slate-500 p-2 text-white hover:text-slate-100 hover:bg-slate-600"
            >
              Customized link
            </Link>
          </Library.Demo>
          <Library.Callout>
            <strong>Note</strong>: When <code>unstyled</code> is set, values
            passed to <code>size</code> or <code>variant</code> will be ignored,
            as associated styles are disabled.
          </Library.Callout>

          <Library.Section title="Unstyled style categories">
            <p>
              Setting <code>unstyled</code> disables (pretty much) all styling.{' '}
              Disabled styles include those in <code>variant</code> and{' '}
              <code>size</code> categories, and, in addition, styles from the
              following{' '}
              <Link href="https://tailwindcss.com/docs">TailwindCSS</Link>{' '}
              styling categories:
            </p>
            <ul>
              <li>layout</li>
              <li>flexbox and grid</li>
              <li>border: ring (only)</li>
            </ul>
          </Library.Section>
        </Library.Section>
      </Library.Section>
    </Library.Page>
  );
}
