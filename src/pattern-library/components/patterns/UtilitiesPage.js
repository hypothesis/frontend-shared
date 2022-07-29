import Library from '../Library';

export default function UtilitiesPage() {
  return (
    <Library.Page title="Utilities">
      <Library.Pattern title="Focus rings">
        <Library.Example title="Custom focus-visible ring">
          <p>
            The <code>.focus-visible-ring</code> utility class customizes an
            interactive element&apos;s focus ring such that it is only visible
            when the element has <code>:focus-visible</code> or the polyfilled
            equivalent for browsers that do not support{' '}
            <code>:focus-visible</code>.
          </p>
          <Library.Demo
            title="input and button with .focus-visible-ring"
            withSource
          >
            <input type="text" className="border focus-visible-ring" />
            <button className="focus-visible-ring">Button</button>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
