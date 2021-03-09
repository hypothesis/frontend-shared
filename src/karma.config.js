/* eslint-env node */

const glob = require('glob');

let chromeFlags = [];

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  let testFiles = ['**/test/*-test.js'];

  if (config.grep) {
    const allFiles = testFiles
      .map(pattern => glob.sync(pattern, { cwd: __dirname }))
      .flat();
    testFiles = allFiles.filter(path => path.match(config.grep));

    // eslint-disable-next-line no-console
    console.log(`Running tests matching pattern "${config.grep}": `, testFiles);
  }

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      // Test setup
      '../test/bootstrap.js',

      // Test modules.
      ...testFiles.map(pattern => ({
        pattern,

        // Disable watching because karma-browserify handles this.
        watched: false,

        type: 'js',
      })),

      // CSS bundle relied upon by accessibility tests (eg. for color-contrast
      // checks).
      {
        pattern: '../build/styles.css',
        watched: false,
      },
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../test/bootstrap.js': ['browserify'],
      '**/*-test.js': ['browserify'],
    },

    browserify: {
      debug: true,
      transform: [
        [
          'babelify',
          {
            // The existence of this preset option is due to a config issue with where jsx modules
            // are not transpiled to js.
            // See https://github.com/hypothesis/client/issues/2929
            presets: require('../.babelrc.cjs').presets,
            extensions: ['.js'],
          },
        ],
      ],
    },

    mochaReporter: {
      // Display a helpful diff when comparing complex objects
      // See https://www.npmjs.com/package/karma-mocha-reporter#showdiff
      showDiff: true,
      // Output only summary and errors in development to make output easier to parse.
      output: 'minimal',
    },

    // Use https://www.npmjs.com/package/karma-mocha-reporter
    // for more helpful rendering of test failures
    reporters: ['progress', 'mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true,
    },

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless_Custom'],
    browserNoActivityTimeout: 20000,

    customLaunchers: {
      ChromeHeadless_Custom: {
        base: 'ChromeHeadless',
        flags: chromeFlags,
      },
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Log slow tests so we can fix them before they timeout
    reportSlowerThan: 500,
  });
};
