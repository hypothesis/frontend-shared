import { Link } from '../../../next';

import Library from '../Library';
import Next from '../LibraryNext';

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
        <Library.Example title="Styling groups of inputs">
          <p>
            The <code>input-group</code> modifier allows adaptation of styling
            on inputs when they are part of a group of inputs. This is identical
            in functionality to the{' '}
            <Link
              href="https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state"
              underline="always"
            >
              tailwind <code>group</code> modifier
            </Link>{' '}
            but is {'"namespaced"'} to associate it with its more targeted
            usage.
          </p>

          <p>
            Each of the <code>button</code>s used in the following grouping
            examples has the markup shown below. The <code>rounded-lg</code>{' '}
            class sets border-radius on the buttons, but{' '}
            <code>input-group:rounded-none</code> removes it when the buttons
            are inside of an <code>input-group</code>.
          </p>

          <Next.Code
            content={
              <button className="border p-2 rounded-lg input-group:rounded-none">
                Label
              </button>
            }
            title="Button element styling"
          />

          <Library.Demo title="buttons in an .input-group" withSource>
            <div className="input-group">
              <div className="flex gap-x-2 input-group:gap-x-0">
                <button className="border p-2 rounded-lg input-group:rounded-none">
                  One
                </button>
                <button className="border p-2 rounded-lg input-group:rounded-none">
                  Two
                </button>
                <button className="border p-2 rounded-lg input-group:rounded-none">
                  Three
                </button>
              </div>
            </div>
          </Library.Demo>

          <Library.Demo
            title="The same buttons not in an .input-group"
            withSource
          >
            <div className="flex gap-x-2 input-group:gap-x-0">
              <button className="border p-2 rounded-lg input-group:rounded-none">
                One
              </button>
              <button className="border p-2 rounded-lg input-group:rounded-none">
                Two
              </button>
              <button className="border p-2 rounded-lg input-group:rounded-none">
                Three
              </button>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
