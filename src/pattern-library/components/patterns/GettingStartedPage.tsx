import { Link } from '../../../next';
import Library from '../Library';

export default function GettingStartedPage() {
  return (
    <Library.Page
      title="Getting started"
      intro={
        <>
          <p>
            The <code>@hypothesis/frontend-shared</code> package provides
            reusable UI components for Hypothesis front-end applications.
          </p>
          <p>This package provides two sets of components:</p>
          <ul>
            <li>
              <strong>Updated components</strong>. These components require{' '}
              <code>tailwindcss</code>. Use of these components is preferred.
            </li>
            <li>
              <strong>Legacy components</strong> with external assets (SASS and
              SVG source, e.g.). These are being deprecated as their updated
              counterparts are implemented, and are slated for removal in v6.0
              of this package.
            </li>
          </ul>
        </>
      }
    >
      <Library.Section title="Updated components">
        <Library.Pattern title="Installation">
          <p>
            Your application needs to install{' '}
            <Link href="https://tailwindcss.com/" underline="always">
              tailwindcss
            </Link>{' '}
            to use this {"package's"} updated components.
          </p>
          <Library.Code
            content={`$ yarn add tailwindcss @hypothesis/frontend-shared`}
          />
        </Library.Pattern>
        <Library.Pattern title="Configuration">
          <Library.Example title="Configure tailwindcss">
            <p>Configure your {"project's"} tailwind configuration object:</p>
            <ul>
              <li>Use this {"package's"} tailwind preset</li>
              <li>
                Add this {"package's"} source to the {"configuration's"}{' '}
                <code>content</code> globs
              </li>
            </ul>
            <Library.Code
              size="sm"
              title="Your project's tailwind config"
              content={`import tailwindConfig from '@hypothesis/frontend-shared/lib/tailwind.preset.js';

export default {
  presets: [tailwindConfig],
  content: [
    './node_modules/@hypothesis/frontend-shared/lib/**/*.{js,ts,tsx}',
    // ...
  ],
  // ...`}
            />
          </Library.Example>
        </Library.Pattern>
        <Library.Pattern title="Usage">
          <p>
            Note that component modules are imported from an entrypoint at{' '}
            <code>lib/next</code>.
          </p>
          <Library.Usage componentName="Card, Link" />
        </Library.Pattern>
      </Library.Section>

      <Library.Section title="Legacy components">
        <Library.Pattern title="Configuration">
          <Library.Example title="Import SASS styles">
            <Library.Code
              size="sm"
              title="Your project's SASS entry point"
              content={`@use '@hypothesis/frontend-shared/styles';`}
            />
          </Library.Example>
        </Library.Pattern>
        <Library.Pattern title="Usage">
          <Library.Usage generation="legacy" componentName="Card, Link" />
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
