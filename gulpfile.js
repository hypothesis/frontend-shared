import { buildCSS, runTests, watchJS } from '@hypothesis/frontend-build';
import * as fs from 'fs';
import gulp from 'gulp';

import { servePatternLibrary } from './scripts/serve-pattern-library.js';
import tailwindConfig from './tailwind.config.js';

gulp.task('serve-pattern-library', () => {
  servePatternLibrary();
});

// The following tasks bundle assets for the pattern library for use locally
// during development. Bundled JS and CSS are not published with the package.

gulp.task('bundle-css', () =>
  buildCSS(['./styles/pattern-library.scss'], { tailwindConfig })
);

gulp.task(
  'watch-css',
  gulp.series('bundle-css', () =>
    gulp.watch(
      [
        './styles/**/*.scss',
        './src/components/**/*.js',
        './src/components/**/*.ts*',
        './src/pattern-library/**/*.js',
        './src/pattern-library/**/*.ts*',
      ],
      gulp.task('bundle-css')
    )
  )
);

gulp.task('watch-js', () => watchJS('./rollup.config.js'));

gulp.task(
  'watch',
  gulp.parallel('serve-pattern-library', 'watch-css', 'watch-js')
);

/**
 * Task to build a CSS bundle.
 *
 * nb. This is only used for unit tests that need CSS to verify accessibility requirements.
 */
gulp.task('build-test-css', () =>
  buildCSS(['styles/test.scss'], { tailwindConfig })
);

// Some (eg. a11y) tests rely on CSS bundles. We assume that JS will always take
// longer to build than CSS, so build in parallel.
gulp.task(
  'test',
  gulp.parallel('build-test-css', () =>
    runTests({
      bootstrapFile: 'test/bootstrap.js',
      rollupConfig: 'rollup-tests.config.js',
      karmaConfig: 'src/karma.config.cjs',
      testsPattern: 'src/**/*-test.js',
    })
  )
);

gulp.task('update-patterns-index', async () => {
  // Determine the name of the JS/CSS bundles (in prod they could contain a hash)
  const jsBundleName = fs
    .readdirSync('build/scripts')
    .find(file => file.startsWith('pattern-library'));
  const cssBundleName = fs
    .readdirSync('build/styles')
    .find(file => file.startsWith('pattern-library'));

  if (!jsBundleName || !cssBundleName) {
    throw new Error(
      'JS and/or CSS bundles missing. Make sure bundles are generated first'
    );
  }

  // Replace references to the generic bundle names with the resolved ones
  const indexContent = fs
    .readFileSync('templates/index.html')
    .toString()
    .replace('pattern-library.bundle.js', jsBundleName)
    .replace('pattern-library.css', cssBundleName);

  // eslint-disable-next-line no-undef
  fs.writeFileSync('templates/index.html', Buffer.from(indexContent));
});
