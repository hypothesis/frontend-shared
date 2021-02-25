/* eslint-env node */

'use strict';

const fs = require('fs');
const gulp = require('gulp');
const sass = require('sass');

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

function runKarma({ singleRun }, done) {
  const karma = require('karma');
  new karma.Server(
    {
      configFile: `${__dirname}/src/karma.config.js`,
      singleRun,
    },
    done
  ).start();
}

// Unit and integration testing tasks.
gulp.task(
  'test',
  gulp.series('build-css', done => runKarma({ singleRun: true }, done))
);
