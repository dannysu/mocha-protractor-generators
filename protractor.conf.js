'use strict';

exports.config = {
    specs: [
        'test/*.js'
    ],
    framework: 'mocha',
    mochaOpts: {
        timeout: 30000,
        reporter: 'spec'
    }
};
