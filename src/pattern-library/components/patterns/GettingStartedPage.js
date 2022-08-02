import Library from '../Library';
import Next from '../LibraryNext';

export default function GettingStartedPage() {
  return (
    <Library.Page
      title="Getting started"
      intro={
        <p>
          The <code>@hypothesis/frontend-shared</code> package provides reusable
          UI components for Hypothesis front-end applications.
        </p>
      }
    >
      <div className="space-y-8">
        <p>This package provides two sets of components:</p>
        <ul>
          <li>
            <strong>Updated, standalone components</strong>. These components
            require <code>tailwindcss</code>. Use of these components is
            preferred.
          </li>
          <li>
            <strong>Legacy components</strong> with external assets (SASS and
            SVG source, e.g.). These are being deprecated as their updated
            counterparts are implemented, and are slated for removal in v6.0 of
            this package.
          </li>
        </ul>
      </div>
      <Library.Pattern title="Installation">
        <Next.Code
          content={`$ yarn add tailwindcss @hypothesis/frontend-shared`}
        />
      </Library.Pattern>
      <Library.Pattern title="Configuring and using updated components">
        <Library.Example title="Configure tailwindcss">
          <p>Configure your {"project's"} tailwind configuration object:</p>
          <ul>
            <li>Use this {"package's"} tailwind preset</li>
            <li>
              Add this {"package's"} JS source to the {"configuration's"}{' '}
              <code>content</code> globs
            </li>
          </ul>
          <Next.Code
            size="sm"
            title="Your project's tailwind config"
            content={`import tailwindConfig from '@hypothesis/frontend-shared/lib/tailwind.preset.js';

export default {
  presets: [tailwindConfig],
  content: [
    './node_modules/@hypothesis/frontend-shared/lib/**/*.js',
    // ...
  ],
  // ...`}
          />
        </Library.Example>
        <Library.Example title="Usage">
          <Next.Usage componentName="Card, Link" />
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Configuring and using legacy components">
        <Library.Example title="Import SASS">
          <Next.Code
            size="sm"
            title="Your project's SASS entry point"
            content={`@use '@hypothesis/frontend-shared/styles';`}
          />
        </Library.Example>
        <Library.Example title="Usage">
          <Next.Usage generation="legacy" componentName="Card, Link" />
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
