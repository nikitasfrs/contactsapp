// Karma configuration
// Generated on Tue Jul 28 2015 06:23:37 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
        
        // this solves the double-testing bug
        // The problem appears to be because some files 
        // are watched by both karma and watchify 
        // karma-browserify uses watchify
        // ref: https://github.com/nikku/karma-browserify/issues/67
        {pattern: 'specs/helpers/config.js', watched: false, included: true, served: true},
        {pattern: 'specs/**/*spec.js', watched: false, included: true, served: true}
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors : {
        'specs/helpers/config.js': ['browserify'],
        'specs/**/*spec.js': ['browserify']
    },
    
    // list of files to exclude
    exclude: [],

    browserify: {
        debug: true,
        transform: ['brfs'],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

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
    browsers: ['PhantomJS'],

    //autoWatchBatchDelay: 1000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false

  })
}
