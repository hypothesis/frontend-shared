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
      <Library.Pattern title="How to customize a component">
        <p>
          These steps should be taken in order when design or layout
          customization of a component is necessary.
        </p>
        <ol>
          <li>
            Use a <strong>different variant</strong> of the component. Check the{' '}
            {"component's"} documentation in this library to see what variants
            are available.
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
          <li>
            Use the{' '}
            <strong>
              <code>classes</code> prop
            </strong>
            . This allows authors to append arbitrary classes to the{' '}
            {"component's"} outermost element but should be used with
            consideration.
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

        <Library.Example title="Stop and reflect">
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
