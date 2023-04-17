import Library from '../Library';

export default function CustomizingComponentsPage() {
  return (
    <Library.Page
      title="Customizing components"
      intro={
        <>
          <p>
            Here are the steps to take when you find yourself wanting to
            customize the styling of a component.
          </p>
        </>
      }
    >
      <Library.Section title="How to customize a component">
        <Library.Pattern title="Step 1: Stop and reflect">
          <p>
            Components in this library are designed to be flexible within the
            bounds of established design patterns. Certain guard rails exist on
            purpose. Reflect before you customize!
          </p>
        </Library.Pattern>

        <Library.Pattern title="Supported customization">
          <p>
            The following options represent flexibility purposely baked into
            components.
          </p>
          <ol>
            <li>
              Use a <strong>different variant</strong> of the component. Check
              the {"component's"} documentation in this library to see what
              variants are available.
            </li>
            <li>
              Use <strong>component styling props</strong>, e.g.{' '}
              <code>color</code>, <code>underline</code> or <code>size</code>.
              These differ per component and define styling aspects that are
              intended to be adjusted.
            </li>
            <li>
              Use a <strong>base presentational component</strong>, e.g.{' '}
              <code>LinkBase</code>. This will only apply minimal, base styles.
              Extend with the <code>classes</code> prop.
            </li>
            <li>
              Use a{' '}
              <strong>
                base presentational component, with the <code>unstyled</code>
                boolean prop set
              </strong>
              . This will prevent the component from setting <i>any</i> styles,
              allowing you to start from scratch with the <code>classes</code>{' '}
              prop.
            </li>
          </ol>
        </Library.Pattern>

        <Library.Pattern title="Stronger medicine">
          <p>
            For use if the above options do not satisfy the need. Tread with
            care.
          </p>
          <ol>
            <li>
              <p>
                <strong>
                  Extend presentational components with the <code>classes</code>{' '}
                  prop
                </strong>{' '}
                (using the <code>classes</code> prop on base presentational
                components is always OK).
              </p>
              <p>
                The intention is to allow for extension, not override. in the
                event of a conflict between the {"component's"} own styling and
                the classes specified here, there is currently no guarantee of
                which will take precedence.
              </p>
            </li>
            <li>
              Use a <strong>different component</strong>, or create a new one.
            </li>
            <li>
              Emergency escape hatch: Use{' '}
              <strong>
                <code>!important</code> CSS rules
              </strong>{' '}
              (these class names are prefixed with a <code>!</code> in
              <code>tailwindcss</code>) . This should be a last-ditch tactic.
            </li>
          </ol>
          <p>
            Any time you use <code>classes</code> on a presentational component
            and especially if you use <code>!important</code> hacks, raise the
            issue. It may be that the component needs adjustment, or that a new
            component is called for.
          </p>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
