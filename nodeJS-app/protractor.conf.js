var Jasmine2HtmlReporter = require("protractor-jasmine2-html-reporter");
var TestUtils = require("eing-e2e-library").TestUtils;
var appConfig = require("./e2e-resources/application.json");
var headerInfo = require("./e2e-resources/info/header.json");
var JSONReporter = require("jasmine-json-test-reporter");

var testUtils = new TestUtils(appConfig);
testUtils.setComponentPath("e2e/components");

exports.config = {
    // list of files / patterns to load in the browser
    files: [
        {
            pattern: "node_modules/reflect-metadata/*.js",
            included: true,
            watched: true
        }
    ],

    /**
   * Path to your E2E test files, relative to the location of this configuration file.
   */
    specs: ["./e2e/components/**/*.ts"],

    // To run functional tests on specific page section using test suits
    // e.g. protractor protractor.conf.js --suite all
    // e.g. protractor protractor.conf.js --suite app,base
    suites: {
        all: testUtils.getSpecSuite(headerInfo, "all", "all", "all", "all"),
        app: testUtils.getSpecSuite(headerInfo, "all", "app", "all", "all"),
        base: testUtils.getSpecSuite(headerInfo, "header", "base", "all", "all"),
        critical: testUtils.getSpecSuite(headerInfo, "header", "all", "critical", "all"),
        medium: testUtils.getSpecSuite(headerInfo, "header", "all", "medium", "all"),
        sso: "./e2e/components/app/sso-login.spec.ts"
    },

    /**
   * Properties passed to Selenium -- see https://code.google.com/p/selenium/wiki/DesiredCapabilities for more info.
   */
    capabilities: {
        browserName: "chrome"
    },

    framework: "jasmine",
    //directConnect: true,
    useAllAngular2AppRoots: true,
    allScriptsTimeout: 36000,
    getPageTimeout: 36000,
    plugins: [],

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 36000
    },

    beforeLaunch: function() {
        require("ts-node").register({
            project: "./e2e/"
        });
    },

    onPrepare: function() {
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: "protractorReports/",
                screenshotsFolder: "/images",
                takeScreenshots: true,
                showPassed: true,
                fileName: "Header",
                cleanDestination: false
            })
        );
        jasmine.getEnv().addReporter(
            new JSONReporter({
                file: "jasmine-test-results.json",
                beautify: true,
                indentationLevel: 4
            })
        );
    }
};
