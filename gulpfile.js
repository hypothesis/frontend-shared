/* eslint-env node */

'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const { run } = require('./src/scripts/gulp/run');

const buildJs = () => {
  // There does not appear to be a simple way of forcing gulp-babel to use a config
  // file. Load it up and pass it in manually.
  const babelConfig = require('./.babelrc.cjs');

  return (
    gulp
      .src(['./src/**/*.js', '!**/test/*.js'])
      // Transpile the js source files and write the output in the frontend-shared/lib dir.
      // Additionally, add the sourcemaps into the same dir.
      .pipe(sourcemaps.init())
      .pipe(babel(babelConfig))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./lib'))
  );
};

const buildTypes = async () => {
  // nb. If the options get significantly more complex, they should be moved to
  // a `tsconfig.json` file.
  await run('node_modules/.bin/tsc', [
    '--allowJs',
    '--declaration',
    '--emitDeclarationOnly',
    '--outDir',
    'lib',
    'src/index.js',
  ]);
};

gulp.task('build-js', gulp.parallel(buildJs, buildTypes));

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
