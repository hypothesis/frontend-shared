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
          <p>This guide applies to updated ({'"next"'}) components only.</p>
        </>
      }
    >
      <Library.Pattern title="Step 1: Stop and reflect">
        <p>
          Components in this library are designed to be flexible within the
          bounds of established design patterns. Certain guard rails exist on
          purpose. Reflect before you customize!
        </p>
      </Library.Pattern>

      <Library.Pattern title="How to customize a component">
        <Library.Example title="Intended customization">
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
              Use an <strong>unstyled component</strong>, e.g.{' '}
              <code>LinkUnstyled</code>. This is appropriate if you want to do
              considerable customization of a component.
            </li>
          </ol>
        </Library.Example>

        <Library.Example title="Stronger medicine">
          <p>
            For use if the above options do not satisfy the need. Tread with
            care.
          </p>
          <ol>
            <li>
              <p>
                Use the{' '}
                <strong>
                  <code>classes</code> prop
                </strong>
                . This allows authors to append arbitrary classes to the{' '}
                {"component's"} outermost element but should be used with
                consideration.
              </p>
              <p>
                The intention is to allow for extension, not override. There is
                no guarantee that provided <code>classes</code> {"won't"}{' '}
                conflict with classes applied by the component.
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
            Any time you use <code>classes</code> and especially if you use{' '}
            <code>!important</code> hacks, raise the issue. It may be that the
            component needs adjustment, or that a new component is called for.
          </p>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
