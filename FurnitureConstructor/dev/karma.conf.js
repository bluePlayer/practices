// Karma configuration
// Generated on Tue Oct 25 2016 13:03:04 GMT+0200 (CEST)
module.exports = function(config) {
    'use strict';

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['qunit'],


        // list of files / patterns to load in the browser
        files: [
            'js/jquery.min.js',
            'js/phaser.min.js',
            'Testing/unit_tests/js/qunit-parameterize.js',
            'Testing/unit_tests/js/tests/FrnConstrMock.js',
            'js/utils/Utility.js',
            'js/utils/Constants.js',
            'js/utils/InnerSlotMatrixUtility.js',
            'js/utils/GraphicsUtility.js',
            'js/utils/ProcessDataUtility.js',
            'js/utils/FrnConstrErrors.js',
            'js/utils/FrnConstrMessages.js',
            'js/State.js',
            'js/Screens/Boot.js',
            'js/UI/FrnConstrButton.js',
            'js/UI/GoToScreen.js',
            'js/UI/GoToUrl.js',
            'js/Screens/Screen.js',
            'js/Screens/Preloader.js',
            'js/Screens/EnteriorScreen.js',
            'js/Screens/ExteriorScreen.js',
            'js/Screens/SendApplicationScreen.js',
            'js/Screens/TestScreen.js',
            'js/InitFrnConstrForm.js',
            'Testing/unit_tests/js/tests/stubs/**/*.js',
            'Testing/unit_tests/js/tests/*.js'
        ],


        // list of files to exclude
        exclude: [
            '**/*.html',
            'Testing/unit_tests/js/tests/**/FrnConstrStub.js',
            'Testing/unit_tests/js/tests/FrnConstrTests.js',
            'Testing/unit_tests/js/tests/InitFrnConstrFormTests.js',
            'Testing/unit_tests/js/tests/QUnitParameterizeMetaTests.js',
            'Testing/unit_tests/js/tests/JQueryScriptTests.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'Testing/unit_tests/js/**/*.js': ['coverage'],
            'js/**/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'junit' , 'coverage'],

        // the default configuration
        junitReporter: {
            outputDir: 'test-reports', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'test-results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: true, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {} // key value pair of properties to add to the <properties> section of the report
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
        browsers: [/*'Chrome', 'Firefox',*/ 'PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // client configuration
        client: {
            clearContext: false,
            qunit: {
                showUI: true,
                testTimeout: 5000,
                filter: ''
                //fixture: htmlFixture
            }
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }
    });
};