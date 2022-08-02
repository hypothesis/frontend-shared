import { Spinner } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

export default function SpinnerPage() {
  return (
    <Library.Page
      title="Spinner"
      intro={
        <p>
          <code>Spinner</code> is a simple component to render a spinner with
          spokes, representing loading or other progress. To customize, use the{' '}
          <code>SpinnerSpokesIcon</code> or <code>SpinnerCircleIcon</code>{' '}
          component instead.
        </p>
      }
    >
      <Library.Pattern title="Status">
        <p>
          <code>Spinner</code> is a reimplementation of an existing legacy
          component of the same name.
        </p>

        <Library.Example title="Migrating to this component">
          <Next.Changelog>
            <Next.ChangelogItem status="breaking">
              Prop:{' '}
              <s>
                <code>classes</code>
              </s>{' '}
              removed
            </Next.ChangelogItem>
            <Next.ChangelogItem status="breaking">
              Prop values for <code>size</code>:{' '}
              <s>
                <code>{"'small'"}</code>,<code>{"'medium'"}</code>,
                <code>{"'large'"}</code>
              </s>{' '}
              ➜ Use <code>{"'sm'"}</code>, <code>{"'md'"}</code>, or{' '}
              <code>{"'lg'"}</code>
            </Next.ChangelogItem>
            <Next.ChangelogItem status="breaking">
              Default <code>size</code>:{' '}
              <s>
                <code>{"'medium'"}</code>
              </s>{' '}
              ➜ <code>{"'sm'"}</code>
            </Next.ChangelogItem>
          </Next.Changelog>
        </Library.Example>
      </Library.Pattern>
      <Library.Pattern title="Usage">
        <Next.Usage componentName="Spinner" />
        <Library.Example>
          <Library.Demo title="Basic Spinner" withSource>
            <Spinner />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Props">
        <Library.Example title="color">
          <Library.Demo title="color: 'text-light' (default)" withSource>
            <Spinner color="text-light" size="md" />
          </Library.Demo>
          <Library.Demo title="color: 'text'" withSource>
            <Spinner color="text" size="md" />
          </Library.Demo>
        </Library.Example>

        <Library.Example title="size">
          <Library.Demo title="size: 'sm' (1em) (default)" withSource>
            <Spinner size="sm" />
          </Library.Demo>
          <Library.Demo title="size: 'md' (2em)" withSource>
            <Spinner size="md" />
          </Library.Demo>
          <Library.Demo title="size: 'lg' (4em)" withSource>
            <Spinner size="lg" />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
