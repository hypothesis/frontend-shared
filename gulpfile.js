/* eslint-env node */

'use strict';

const gulp = require('gulp');

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
gulp.task('test', done => {
  runKarma({ singleRun: true });
  done();
});
