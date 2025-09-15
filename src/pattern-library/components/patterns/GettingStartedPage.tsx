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
            reusable UI components, hooks and utilities for Hypothesis front-end
            applications.
          </p>
        </>
      }
    >
      <Library.Section>
        <Library.SectionL2 title="Installation">
          <p>
            Add{' '}
            <Link href="https://tailwindcss.com/" underline="always">
              tailwindcss
            </Link>{' '}
            to your application&apos;s dependencies.
          </p>
          <Library.Code
            content={`$ yarn add tailwindcss @tailwindcss/postcss @hypothesis/frontend-shared`}
          />
          <p>
            Then, in your project&apos;s gulp configuration, pass{' '}
            <code>
              {'{'} tailwind: true {'}'}
            </code>{' '}
            to the <code>buildCSS</code> function:
          </p>
          <Library.Code
            content={`import { buildCSS } from '@hypothesis/frontend-build';

gulp.task('build-tailwind-css', () =>
  buildCSS(['app.css'], {
    tailwind: true,
  }),
);`}
          />
        </Library.SectionL2>
        <Library.SectionL2 title="Configuration">
          <p>
            In your project&apos;s CSS entry point, import the Tailwind theme
            from this package:
          </p>
          <Library.Code
            size="sm"
            title="Your project's tailwind config"
            lang="css"
            content={`@import 'tailwindcss' @source(none);

/* Scan the frontend-shared package for used classes. The path is relative to
   the location of the CSS file. */
@source 'node_modules/@hypothesis/frontend-shared/lib/**/*.js';

/* Enable the Tailwind theme and additional utilities. */
@import '@hypothesis/frontend-shared/tailwind-config.css';
  `}
          />
          <p>
            See the{' '}
            <a href="https://tailwindcss.com/docs/functions-and-directives">
              Tailwind documentation
            </a>{' '}
            for more details on configuration at-rules.
          </p>
        </Library.SectionL2>
        <Library.SectionL2 title="Usage">
          <Library.Usage componentName="Card, Link" />
        </Library.SectionL2>
      </Library.Section>
    </Library.Page>
  );
}
