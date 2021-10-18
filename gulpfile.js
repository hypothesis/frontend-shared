/* eslint-env node */
'use strict';

const fs = require('fs');
const path = require('path');

const commander = require('commander');
const log = require('fancy-log');
const glob = require('glob');
const gulp = require('gulp');
const rollup = require('rollup');
const sass = require('sass');

const createStyleBundle = require('./scripts/gulp/create-style-bundle');
const servePatternLibrary = require('./scripts/serve-pattern-library');

const IS_PRODUCTION_BUILD = process.env.NODE_ENV === 'production';
const STYLE_DIR = 'build/styles';

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

/** @param {import('rollup').RollupWarning} */
function logRollupWarning(warning) {
  log.info(`Rollup warning: ${warning} (${warning.url})`);
}

async function readConfig(path) {
  const { default: config } = await import(path);
  return Array.isArray(config) ? config : [config];
}

async function buildJS(rollupConfig) {
  const configs = await readConfig(rollupConfig);

  await Promise.all(
    configs.map(async config => {
      const bundle = await rollup.rollup({
        ...config,
        onwarn: logRollupWarning,
      });
      await bundle.write(config.output);
    })
  );
}

async function watchJS(rollupConfig) {
  const configs = await readConfig(rollupConfig);

  const watcher = rollup.watch(
    configs.map(config => ({
      ...config,
      onwarn: logRollupWarning,
    }))
  );

  return new Promise(resolve => {
    watcher.on('event', event => {
      switch (event.code) {
        case 'START':
          log.info('JS build starting...');
          break;
        case 'BUNDLE_END':
          event.result.close();
          break;
        case 'ERROR':
          log.info('JS build error', event.error);
          break;
        case 'END':
          log.info('JS build completed.');
          resolve(); // Resolve once the initial build completes.
          break;
      }
    });
  });
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

gulp.task('serve-pattern-library', () => {
  servePatternLibrary();
});

// The following tasks bundle assets for the pattern library for use locally
// during development. Bundled JS and CSS are not published with the package.

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
gulp.task('build-test-css', done => {
  fs.mkdirSync('build', { recursive: true });
  const result = sass.renderSync({
    file: 'styles/index.scss',
    outFile: 'build/styles.css',
    sourceMap: true,
  });

  fs.writeFileSync('build/styles.css', result.css);
  fs.writeFileSync('build/styles.css.map', result.map);
  done();
});

async function buildAndRunTests() {
  const { grep, singleRun } = karmaOptions;

  // Generate an entry file for the test bundle. This imports all the test
  // modules, filtered by the pattern specified by the `--grep` CLI option.
  const testFiles = [
    'test/bootstrap.js',
    ...glob
      .sync('src/**/*-test.js')
      .filter(path => (grep ? path.match(grep) : true)),
  ];

  const testSource = testFiles
    .map(path => `import "../../${path}";`)
    .join('\n');

  fs.mkdirSync('build/scripts', { recursive: true });
  fs.writeFileSync('build/scripts/test-inputs.js', testSource);

  // Build the test bundle.
  log.info(`Building test bundle... (${testFiles.length} files)`);
  if (singleRun) {
    await buildJS('./rollup-tests.config.mjs');
  } else {
    await watchJS('./rollup-tests.config.mjs');
  }

  // Run the tests.
  log.info('Starting Karma...');
  return new Promise(resolve => {
    const karma = require('karma');
    new karma.Server(
      karma.config.parseConfig(
        path.resolve(__dirname, './src/karma.config.js'),
        { singleRun }
      ),
      resolve
    ).start();

    process.on('SIGINT', () => {
      // Give Karma a chance to handle SIGINT and cleanup, but forcibly
      // exit if it takes too long.
      setTimeout(() => {
        resolve();
        process.exit(1);
      }, 5000);
    });
  });
}

// Some (eg. a11y) tests rely on CSS bundles. We assume that JS will always take
// longer to build than CSS, so build in parallel.
gulp.task('test', gulp.parallel('build-test-css', buildAndRunTests));
