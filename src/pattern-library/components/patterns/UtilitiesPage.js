import Library from '../Library';

export default function UtilitiesPage() {
  return (
    <Library.Page
      title="Utilities"
      intro={
        <p>
          This {"package's"} <code>tailwindcss</code> preset provides some extra
          utility classes and modifiers. These can be used independently to
          style your {"app's"} component elements.
        </p>
      }
    >
      <Library.Pattern title="Utility classes">
        <Library.Example title=".focus-visible-ring">
          <p>
            The <code>.focus-visible-ring</code> utility class customizes an
            interactive element&apos;s focus ring such that it is only visible
            when the element has <code>:focus-visible</code> or the polyfilled
            equivalent for browsers that do not support{' '}
            <code>:focus-visible</code>. It uses the <code>blue-focus</code>{' '}
            color.
          </p>
          <Library.Demo
            title="input and button with .focus-visible-ring"
            withSource
          >
            <input type="text" className="border focus-visible-ring" />
            <button className="focus-visible-ring">Button</button>
          </Library.Demo>

          <Library.Demo
            title="Combining with other tailwind ring classes"
            withSource
          >
            <input
              type="text"
              className="border focus-visible-ring ring-slate-5"
            />
            <button className="focus-visible-ring ring-inset">
              Inset ring
            </button>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Modifiers (variants)">
        <p>
          This package also provides some tailwind variants (modifiers) that can
          be combined with other tailwind utility classes.
        </p>
        <Library.Example title="ARIA variants">
          <p>
            Tailwind does not provide out-of-the-box <code>aria-*</code>{' '}
            variants. This package provides <code>aria-pressed</code> and{' '}
            <code>aria-expanded</code>.
          </p>
          <Library.Demo title="button with `aria-pressed` styling" withSource>
            <button aria-pressed className="border p-2 aria-pressed:bg-slate-1">
              Button
            </button>
          </Library.Demo>
          <Library.Demo title="button with `aria-expanded` styling" withSource>
            <button
              aria-expanded
              className="border p-2 aria-expanded:bg-slate-7 aria-expanded:text-color-text-inverted"
            >
              Button
            </button>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
