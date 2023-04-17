import { Link } from '../../../';
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
          <Library.Usage componentName="Card, Link" />
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
