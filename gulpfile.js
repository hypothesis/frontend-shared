/* eslint-env node */
('use strict');

const fs = require('fs');
const path = require('path');

const commander = require('commander');
const gulp = require('gulp');
const sass = require('sass');

const createBundle = require('./scripts/gulp/create-bundle');
const createStyleBundle = require('./scripts/gulp/create-style-bundle');
const servePatternLibrary = require('./scripts/serve-pattern-library');

const IS_PRODUCTION_BUILD = process.env.NODE_ENV === 'production';

const SCRIPT_DIR = 'build/scripts';
const STYLE_DIR = 'build/styles';

const appBundles = [
  {
    // A web app to assist with testing UI components.
    name: 'pattern-library',
    entry: './scripts/pattern-library',
    path: SCRIPT_DIR,
    transforms: ['babel'],
  },
];

const cssBundles = ['./styles/pattern-library.scss'];

function parseCommandLine() {
  commander
    .option(
      '--grep <pattern>',
      'Run only tests where filename matches a regex pattern'
    )
    .option('--watch', 'Continuously run tests (default: false)', false)
    .option('--browser <browser>', 'Run tests in browser of choice.')
    .option(
      '--no-browser',
      "Don't launch default browser. Instead, navigate to http://localhost:9876/ to run the tests."
    )
    .parse(process.argv);

  const { grep, watch, browser } = commander.opts();
  const karmaOptions = {
    grep: grep,
    singleRun: !watch,
  };

  // browser option can be either false | undefined | string
  if (browser === false) {
    karmaOptions.browsers = null;
  } else if (browser) {
    karmaOptions.browsers = [browser];
  }

  return karmaOptions;
}

const karmaOptions = parseCommandLine();
const { run } = require('./scripts/gulp/run');

function runKarma(done) {
  const karma = require('karma');
  new karma.Server(
    {
      configFile: `${__dirname}/src/karma.config.js`,
      ...karmaOptions,
    },
    done
  ).start();
}

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

/**
 * Task to build a CSS bundle.
 *
 * nb. This is only used for unit tests that need CSS to verify accessibility requirements.
 */
gulp.task('build-test-css', done => {
  fs.mkdirSync('build', { recursive: true });
  const result = sass.renderSync({
    file: 'styles/_index.scss',
    outFile: 'build/styles.css',
    sourceMap: true,
  });

  fs.writeFileSync('build/styles.css', result.css);
  fs.writeFileSync('build/styles.css.map', result.map);
  done();
});

gulp.task(
  'test',
  gulp.series('build-test-css', done => runKarma(done))
);

gulp.task('serve-pattern-library', () => {
  servePatternLibrary();
});

// The following tasks bundle assets for the pattern library for use locally
// during development. Bundled JS and CSS are not published with the package.

// Bundle JS into local `build` folder
gulp.task('bundle-js', () => {
  return Promise.all(appBundles.map(config => createBundle(config)));
});

// Bundle SASS into local `build` folder
gulp.task('bundle-css', function () {
  fs.mkdirSync(STYLE_DIR, { recursive: true });
  const bundles = cssBundles.map(entry =>
    createStyleBundle({
      input: entry,
      output: `${STYLE_DIR}/${path.basename(entry, path.extname(entry))}.css`,
      minify: IS_PRODUCTION_BUILD,
    })
  );
  return Promise.all(bundles);
});

gulp.task(
  'watch-css',
  gulp.series('bundle-css', () =>
    gulp.watch('./styles/**/*.scss', gulp.task('bundle-css'))
  )
);

gulp.task('watch-js', () =>
  Promise.all(appBundles.map(config => createBundle(config, { watch: true })))
);

gulp.task(
  'watch',
  gulp.parallel('serve-pattern-library', 'watch-css', 'watch-js')
);
