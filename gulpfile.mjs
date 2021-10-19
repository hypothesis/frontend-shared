import { buildCSS, run, runTests, watchJS } from '@hypothesis/frontend-build';
import gulp from 'gulp';

import servePatternLibrary from './scripts/serve-pattern-library.js';

/**
 * Task to output a draft changelog to be appended to CHANGELOG.md at the
 * top of the file.
 *
 * See docs/releases.md
 */

gulp.task('changelog', async () => {
  const tag = await run('git', ['describe', '--abbrev=0', '--tags']);
  const changelog = await run('yarn', [
    'auto-changelog',
    `--starting-version`,
    tag.trim(),
    '--stdout',
    '--template',
    'changelog-template.hbs',
  ]);
  // Copy and paste the result to CHANGELOG.md, then edit as needed.
  // eslint-disable-next-line no-console
  console.log(changelog.toString());
});

gulp.task('serve-pattern-library', () => {
  servePatternLibrary();
});

// The following tasks bundle assets for the pattern library for use locally
// during development. Bundled JS and CSS are not published with the package.

gulp.task('bundle-css', () => buildCSS(['./styles/pattern-library.scss']));

gulp.task(
  'watch-css',
  gulp.series('bundle-css', () =>
    gulp.watch('./styles/**/*.scss', gulp.task('bundle-css'))
  )
);

gulp.task('watch-js', () => watchJS('./rollup.config.mjs'));

gulp.task(
  'watch',
  gulp.parallel('serve-pattern-library', 'watch-css', 'watch-js')
);

/**
 * Task to build a CSS bundle.
 *
 * nb. This is only used for unit tests that need CSS to verify accessibility requirements.
 */
gulp.task('build-test-css', () => buildCSS(['styles/index.scss']));

// Some (eg. a11y) tests rely on CSS bundles. We assume that JS will always take
// longer to build than CSS, so build in parallel.
gulp.task(
  'test',
  gulp.parallel('build-test-css', () =>
    runTests({
      bootstrapFile: 'test/bootstrap.js',
      rollupConfig: 'rollup-tests.config.mjs',
      karmaConfig: 'src/karma.config.js',
      testsPattern: 'src/**/*-test.js',
    })
  )
);
