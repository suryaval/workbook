// Karma configuration

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "",

        karmaTypescriptConfig: {
            bundlerOptions: {
                transforms: [require("karma-typescript-es6-transform")()]
            }
        },
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["jasmine", "karma-typescript"],

        // list of files / patterns to load in the browser
        files: [
            // Polyfills
            "node_modules/core-js/client/shim.js",
            "node_modules/core-js/client/core.js",

            // zone.js
            "node_modules/zone.js/dist/zone.js",
            "node_modules/zone.js/dist/long-stack-trace-zone.js",
            "node_modules/zone.js/dist/async-test.js",
            "node_modules/zone.js/dist/fake-async-test.js",
            "node_modules/zone.js/dist/sync-test.js",
            "node_modules/zone.js/dist/proxy.js",
            "node_modules/zone.js/dist/jasmine-patch.js",

            { pattern: "node_modules/reflect-metadata/*.js", included: true, watched: true },
            // RxJs.
            { pattern: "node_modules/rxjs/**/*.js", included: false, watched: false },
            { pattern: "node_modules/rxjs/**/*.js.map", included: false, watched: false },

            //project code
            "./src/**/*.ts"
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "./src/**/*.ts": ["karma-typescript", "coverage"]
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["progress", "karma-typescript", "coverage", "html"],

        coverageReporter: {
            type: "html",
            dir: "coverage/",
            check: {
                global: {
                    statements: 83.6,
                    lines: 84.5,
                    functions: 84.5,
                    branches: 45.0
                }
            }
        },

        htmlReporter: {
            outputFile: "karmaUnitTestReport/report.html",
            // Optional
            pageTitle: "Unit Test Report",
            subPageTitle: "Header Module",
            groupSuites: true,
            useCompactStyle: true,
            useLegacyStyle: true
        },
        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ["PhantomJS"],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
