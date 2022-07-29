import { Input } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

export default function InputPage() {
  return (
    <Library.Page
      title="Input"
      intro={
        <p>
          <code>Input</code> is a presentational component for styling textual{' '}
          <code>input</code> elements.
        </p>
      }
    >
      <Library.Pattern title="Status">
        <p>
          <code>Input</code> is new component modeled after the{' '}
          <code>TextInput</code> legacy component.
        </p>

        <Library.Example title="Migrating to this component (from TextInput)">
          <Next.Changelog>
            <Next.ChangelogItem status="breaking">
              Prop name:{' '}
              <s>
                <code>inputRef</code>
              </s>{' '}
              ➜ <code>elementRef</code>
            </Next.ChangelogItem>
            <Next.ChangelogItem status="changed">
              The <code>input</code> element now stretches to fill all available
              horizontal space
            </Next.ChangelogItem>
          </Next.Changelog>
        </Library.Example>
      </Library.Pattern>
      <Library.Pattern title="Usage">
        <Next.Usage componentName="Input" />

        <Library.Example>
          <Library.Demo title="Basic Input" withSource>
            <div className="w-[350px]">
              <Input placeholder="Placeholder..." />
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="type">
        <p>
          <code>Input</code> currently supports the following <code>type</code>{' '}
          values:
        </p>
        <ul>
          <li>
            <code>text</code> (default)
          </li>
          <li>
            <code>url</code>
          </li>
          <li>
            <code>email</code>
          </li>
          <li>
            <code>text</code>
          </li>
        </ul>
      </Library.Pattern>

      <Library.Pattern title="hasError">
        <Library.Example>
          <Library.Demo title="Input with an associated error" withSource>
            <div className="w-[350px]">
              <Input hasError value="something invalid" />
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="disabled">
        <Library.Example>
          <Library.Demo withSource>
            <div className="w-[350px]">
              <Input placeholder="Disabled..." disabled />
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
