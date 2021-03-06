/* eslint-env node */

'use strict';

const commander = require('commander');
const fs = require('fs');
const gulp = require('gulp');
const sass = require('sass');

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

/**
 * Task to build a CSS bundle.
 *
 * nb. This is only used for unit tests that need CSS to verify accessibility requirements.
 */
gulp.task('build-css', done => {
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

gulp.task(
  'test',
  gulp.series('build-css', done => runKarma(done))
);
