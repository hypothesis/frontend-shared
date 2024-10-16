/* eslint-env node */
/* global module __dirname */

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'source-map-support'],

    // list of files / patterns to load in the browser
    files: [
      // Test bundles.
      { pattern: '../build/scripts/tests.bundle.js', type: 'module' },

      // Sourcemaps for test bundles.
      { pattern: '../build/scripts/*.js.map', included: false },

      // CSS bundle relied upon by accessibility tests (eg. for color-contrast
      // checks).
      {
        pattern: '../build/styles/test.css',
        watched: false,
      },
    ],

    // list of files to exclude
    exclude: [],

    mochaReporter: {
      // Display a helpful diff when comparing complex objects
      // See https://www.npmjs.com/package/karma-mocha-reporter#showdiff
      showDiff: true,
      // Output only summary and errors in development to make output easier to parse.
      output: 'minimal',
    },

    coverageIstanbulReporter: {
      dir: `${__dirname}/../coverage`,
      reports: ['json', 'html'],
    },

    // Use https://www.npmjs.com/package/karma-mocha-reporter
    // for more helpful rendering of test failures
    reporters: ['progress', 'mocha', 'coverage-istanbul'],

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

    browsers: ['ChromeHeadless'],

    browserNoActivityTimeout: 20000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Log slow tests so we can fix them before they timeout
    reportSlowerThan: 500,
  });
};
